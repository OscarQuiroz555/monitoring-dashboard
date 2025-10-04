import { useState, useEffect, useCallback, useMemo } from "react";
import { escucharRegistros } from "../services/firebaseData";

// -----------------------------
// Parámetros que se monitorean en tiempo real (tarjetas y gráfico)
// -----------------------------
const PARAMETROS_ACTUALES = [
  "corriente_promedio",
  "voltaje_promedio",
  "frecuencia_promedio",
  "potencia_promedio",
  "potencia_aparente_promedio",
  "potencia_reactiva_promedio",
  "factor_potencia_promedio",
];

// -----------------------------
// Parámetros máximos del día (solo se actualizan si llega un valor mayor)
// -----------------------------
const PARAMETROS_MAXIMOS = [
  "corriente_maxima",
  "voltaje_maximo",
  "frecuencia_maxima",
  "potencia_maxima",
  "potencia_aparente_maxima",
  "potencia_reactiva_maxima",
  "factor_potencia_maximo",
];

// -----------------------------
// Parámetros mínimos del día (solo se actualizan con último registro)
// -----------------------------
const PARAMETROS_MINIMOS = [
  "corriente_minima",
  "voltaje_minimo",
  "frecuencia_minima",
  "potencia_minima",
  "potencia_aparente_minima",
  "potencia_reactiva_minima",
  "factor_potencia_minimo",
];

// -----------------------------
// Función para calcular estado del equipo
// -----------------------------
const calcularEstado = (actuales, ts) => {
  if (!ts) return "desconectado";

  const ahora = new Date();
  const diffMin = (ahora - ts) / 1000 / 60; // diferencia en minutos

  if (diffMin > 5) return "desconectado"; 
  if (Object.values(actuales).some(v => v === null || v === undefined)) return "datos_parciales";

  return "conectado";
};

// -----------------------------
// Hook principal
// -----------------------------
export const useRegistrosActuales = (maxHistorico = 30) => {
  const [datosActuales, setDatosActuales] = useState({});
  const [datosMaximos, setDatosMaximos] = useState({});
  const [datosMinimos, setDatosMinimos] = useState({});
  const [timestamp, setTimestamp] = useState(null);
  const [historico, setHistorico] = useState([]); // últimos registros para la gráfica

  // -----------------------------
  // Procesar cada registro de Firebase
  // -----------------------------
  const procesarRegistro = useCallback((registro) => {
    if (!registro) return;

    const ts = registro.timestamp?.toDate ? registro.timestamp.toDate() : new Date(registro.timestamp);

    // -----------------------------
    // Actualizar datos actuales
    // -----------------------------
    const actuales = PARAMETROS_ACTUALES.reduce((acc, p) => {
      acc[p] = registro[p] ?? null;
      return acc;
    }, {});

    setDatosActuales(actuales);
    setTimestamp(ts);

    // -----------------------------
    // Actualizar máximos del día (solo si llega un valor mayor)
    // -----------------------------
    setDatosMaximos(prev => {
      const nuevosMax = { ...prev };
      PARAMETROS_MAXIMOS.forEach(p => {
        const valorNuevo = registro[p];
        const valorPrev = prev[p] ?? -Infinity;
        if (valorNuevo !== null && valorNuevo !== undefined) {
          nuevosMax[p] = valorNuevo > valorPrev ? valorNuevo : valorPrev;
        }
      });
      return nuevosMax;
    });

    // -----------------------------
    // Actualizar mínimos del día (último registro)
    // -----------------------------
    setDatosMinimos(prev => {
      const nuevosMin = { ...prev };
      PARAMETROS_MINIMOS.forEach(p => {
        const valorNuevo = registro[p];
        if (valorNuevo !== null && valorNuevo !== undefined) {
          nuevosMin[p] = valorNuevo;
        }
      });
      return nuevosMin;
    });

    // -----------------------------
    // Actualizar histórico (para la gráfica)
    // -----------------------------
    setHistorico(prev => {
      const nuevo = [
        ...prev,
        {
          timestamp: ts,
          fecha: ts.toLocaleDateString(),
          hora: ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
          ...actuales,
          voltaje_maximo: registro.voltaje_maximo ?? null,
          voltaje_minimo: registro.voltaje_minimo ?? null,
        }
      ];
      if (nuevo.length > maxHistorico) nuevo.shift(); // mantener solo los últimos registros
      return nuevo;
    });

  }, [maxHistorico]);

  // -----------------------------
  // Escuchar registros de Firebase en tiempo real
  // -----------------------------
  useEffect(() => {
    const unsubscribe = escucharRegistros(procesarRegistro);
    return () => unsubscribe();
  }, [procesarRegistro]);

  // -----------------------------
  // Estado del equipo
  // -----------------------------
  const estado = useMemo(() => calcularEstado(datosActuales, timestamp), [datosActuales, timestamp]);

  return { datosActuales, datosMaximos, datosMinimos, timestamp, estado, historico };
};
