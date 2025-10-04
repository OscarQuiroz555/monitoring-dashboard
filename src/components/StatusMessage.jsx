// src/components/StatusMessage.jsx
import React, { useMemo } from "react";
import dayjs from "dayjs";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const ESTADO_MAP = {
  conectado: { color: "bg-green-500", Icono: CheckCircleIcon, texto: "Conectado" },
  datos_parciales: { color: "bg-yellow-500", Icono: ExclamationTriangleIcon, texto: "Parcial" },
  desconectado: { color: "bg-red-600", Icono: XCircleIcon, texto: "Desconectado" },
};

const StatusMessage = ({
  tipo = "Parámetro",
  ultimoTimestamp,
  valorActual,
  estado = "desconectado", // "conectado" | "datos_parciales" | "desconectado"
  mostrarValor = true,
}) => {
  const ultimo = ultimoTimestamp ? dayjs(ultimoTimestamp) : null;

  const { color, Icono, texto } = useMemo(() => {
    const key = estado?.toLowerCase();
    return ESTADO_MAP[key] || ESTADO_MAP.desconectado;
  }, [estado]);

  const mensaje = useMemo(() => {
    const fechaHora = ultimo ? ultimo.format("DD/MM/YYYY hh:mm:ss A") : "--";

    if (ultimo) {
      return mostrarValor && valorActual != null
        ? `${texto} | ${tipo}: ${valorActual.toFixed(2)} | Última: ${fechaHora}`
        : `${texto} | Última conexión: ${fechaHora}`;
    } else {
      return `${texto} | Sin datos de ${tipo}`;
    }
  }, [estado, tipo, ultimo, valorActual, mostrarValor, texto]);

  return (
    <div
      className={`${color} text-white px-6 py-4 rounded-3xl shadow-xl w-full md:w-auto flex items-center gap-4 transition-transform transform hover:scale-[1.03]`}
      title={`Estado de ${tipo} - Última actualización: ${
        ultimo ? ultimo.format("DD/MM/YYYY HH:mm:ss") : "N/A"
      }`}
    >
      <Icono className="h-7 w-7 md:h-8 md:w-8 flex-shrink-0" />
      <p className="text-base md:text-lg font-semibold text-right">{mensaje}</p>
    </div>
  );
};

export default StatusMessage;
