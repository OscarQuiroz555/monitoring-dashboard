import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { escucharRegistros } from "../services/firebaseData";

// --- Parámetros “actuales” (tarjetas + serie) ---
const PARAM_ACTUALES = [
  "corriente_promedio",
  "voltaje_promedio",
  "frecuencia_promedio",
  "potencia_promedio",
  "potencia_aparente_promedio",
  "potencia_reactiva_promedio",
  "factor_potencia_promedio",
];

// --- Máximos del día (solo si llega > mostrado) ---
const PARAM_MAX = [
  "corriente_maxima",
  "voltaje_maximo",
  "frecuencia_maxima",
  "potencia_maxima",
  "potencia_aparente_maxima",
  "potencia_reactiva_maxima",
  "factor_potencia_maximo",
];

// --- Mínimos del día (llegan desde Firebase y se muestran tal cual) ---
const PARAM_MIN = [
  "corriente_minima",
  "voltaje_minimo",
  "frecuencia_minima",
  "potencia_minima",
  "potencia_aparente_minima",
  "potencia_reactiva_minima",
  "factor_potencia_minimo",
];

// Helpers
const num = (v) => (v == null ? null : Number(v));
const zerosObj = (keys) => keys.reduce((a, k) => ((a[k] = 0), a), {});
const toMillis = (row) => {
  // Prioriza cierre de minuto si existe (segundos -> ms)
  if (row?.minuteEndTs != null && Number.isFinite(Number(row.minuteEndTs))) {
    return Number(row.minuteEndTs) * 1000;
  }
  const t = row?.timestamp;
  const fs = t?.toMillis?.();
  if (Number.isFinite(fs)) return fs;
  if (t instanceof Date) return t.getTime();
  const asNum = Number(t);
  if (Number.isFinite(asNum)) return asNum;
  return Date.now();
};

const calcularEstado = (actuales, tsDate) => {
  if (!tsDate) return "desconectado";
  const diffMin = (Date.now() - tsDate.getTime()) / 1000 / 60;
  if (diffMin > 5) return "desconectado";
  if (Object.values(actuales).some((v) => v == null)) return "datos_parciales";
  return "conectado";
};

export const useRegistrosActuales = (maxHistorico = 180) => {
  // Estados
  const [datosActuales, setDatosActuales] = useState(zerosObj(PARAM_ACTUALES));
  const [datosMaximos, setDatosMaximos] = useState(zerosObj(PARAM_MAX));
  const [datosMinimos, setDatosMinimos] = useState(zerosObj(PARAM_MIN)); // se sobrescriben tal cual llegan
  const [timestamp, setTimestamp] = useState(null); // Date
  const [historico, setHistorico] = useState([]);   // todos los puntos (actual/min/max)

  // Para reset diario
  const ultimoDiaRef = useRef(null);

  const resetDia = useCallback(() => {
    setDatosActuales(zerosObj(PARAM_ACTUALES));
    setDatosMaximos(zerosObj(PARAM_MAX));
    setDatosMinimos(zerosObj(PARAM_MIN));
    setTimestamp(null);
    setHistorico([]);
  }, []);

  const procesarRegistro = useCallback((registro) => {
    if (!registro) return;

    // 1) Timestamp robusto
    const tsMs = toMillis(registro);
    const ts = new Date(tsMs);

    // ✅ Guard anti-backlog: ignora documentos anteriores a HOY
    const startToday = new Date();
    startToday.setHours(0, 0, 0, 0); // 00:00 local
    if (ts < startToday) return;

    // 2) Reset si cambia el día (empieza en 0)
    const dia = ts.toISOString().slice(0, 10); // YYYY-MM-DD
    if (ultimoDiaRef.current && ultimoDiaRef.current !== dia) {
      resetDia();
    }
    ultimoDiaRef.current = dia;

    // 3) ACTUALES (se muestran tal cual llegan)
    const actuales = PARAM_ACTUALES.reduce((acc, p) => {
      acc[p] = num(registro[p]);
      return acc;
    }, {});
    setDatosActuales(() => actuales); // siempre el último
    setTimestamp(ts);

    // 4) MÁXIMOS (solo si llega MAYOR)
    setDatosMaximos((prev) => {
      const nuevos = { ...prev };
      PARAM_MAX.forEach((p) => {
        const nuevo = num(registro[p]);
        const anterior = prev[p] ?? 0; // arranca en 0 cada día
        if (nuevo != null && nuevo > anterior) {
          nuevos[p] = nuevo;
        }
      });
      return nuevos;
    });

    // 5) MÍNIMOS (llegan de Firebase y se muestran TAL CUAL)
    setDatosMinimos(() => {
      const nuevos = {};
      PARAM_MIN.forEach((p) => {
        nuevos[p] = num(registro[p]); // sin cálculo local
      });
      return nuevos;
    });

    // 6) HISTÓRICO (gráfica: guarda TODO lo que llega)
    setHistorico((prev) => {
      const fila = {
        timestamp: ts,
        fecha: ts.toLocaleDateString(),
        hora: ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),

        // actuales
        ...actuales,

        // máximos y mínimos tal cual vengan
        ...PARAM_MAX.reduce((a, p) => ((a[p] = num(registro[p])), a), {}),
        ...PARAM_MIN.reduce((a, p) => ((a[p] = num(registro[p])), a), {}),
      };

      const nuevo = [...prev, fila];
      return nuevo.length > maxHistorico ? nuevo.slice(-maxHistorico) : nuevo;
    });
  }, [resetDia, maxHistorico]);

  useEffect(() => {
    const unsubscribe = escucharRegistros(procesarRegistro);
    return () => unsubscribe();
  }, [procesarRegistro]);

  const estado = useMemo(
    () => calcularEstado(datosActuales, timestamp),
    [datosActuales, timestamp]
  );

  return {
    datosActuales,   // tarjetas “actual”
    datosMaximos,    // tarjetas “máximos” (solo suben)
    datosMinimos,    // tarjetas “mínimos” (tal como llegan)
    timestamp,
    estado,
    historico,       // para la gráfica: incluye actuales, máximos y mínimos
  };
};
