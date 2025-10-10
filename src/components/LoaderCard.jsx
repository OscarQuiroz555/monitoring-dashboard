import React from "react";
import { Loader2 } from "lucide-react";

/**
 * LoaderCard - Componente de carga profesional y dinámico.
 *
 * Props:
 *  - mensaje: texto mostrado debajo del spinner
 *  - size: tamaño del ícono (sm | md | lg)
 *  - color: color principal del spinner (blue, indigo, emerald, pink, etc.)
 *  - centered: si true, centra el loader en toda la vista
 */
export const LoaderCard = ({
  mensaje = "Cargando datos...",
  size = "md",
  color = "blue",
  centered = false,
}) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const containerClass = centered
    ? "flex flex-col items-center justify-center min-h-[60vh]"
    : "flex flex-col items-center justify-center h-full";

  return (
    <div
      className={`${containerClass} relative overflow-hidden rounded-2xl p-8
      bg-gradient-to-br from-white/80 via-${color}-50/40 to-${color}-100/30
      backdrop-blur-md shadow-lg border border-${color}-100/50
      text-gray-700 transition-all duration-500 animate-fadeIn`}
    >
      {/* --- Fondo con efecto luminoso --- */}
      <div
        className={`absolute inset-0 opacity-40 blur-2xl bg-gradient-to-br from-${color}-400/40 via-${color}-300/30 to-transparent animate-pulse`}
      />

      {/* --- Contenido principal --- */}
      <div className="relative z-10 flex flex-col items-center">
        <Loader2
          className={`${sizeClasses[size]} mb-4 text-${color}-500 animate-spin drop-shadow-md`}
        />
        <p className="text-base font-semibold tracking-wide animate-pulse">
          {mensaje}
        </p>

        {/* --- Barra de progreso animada --- */}
        <div className="w-40 h-1 mt-4 bg-gray-200/50 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-${color}-400 via-${color}-500 to-${color}-600 animate-[progress_2s_linear_infinite]`}
          />
        </div>
      </div>

      {/* --- Animaciones personalizadas --- */}
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoaderCard;
