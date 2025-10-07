// src/components/Card.jsx
import React from "react";
import { LoaderCard } from "./LoaderCard";

/**
 * Card - Componente flexible y profesional para dashboards
 *
 * Variantes soportadas:
 * - "nav": Tarjeta de navegación → título, descripción, botón
 * - "kpi": Tarjeta KPI → título, valor en tiempo real, estado visual
 * - "kpiAction": Tarjeta KPI + botón → KPI con acción extra
 *
 * @param {string} variant - Tipo de tarjeta ("nav", "kpi", "kpiAction")
 * @param {JSX.Element} icon - Icono opcional
 * @param {string} title - Título de la tarjeta
 * @param {string|JSX.Element} description - Descripción o valor principal
 * @param {string} status - Estado visual ("green", "yellow", "red", "gray")
 * @param {string} label - Texto descriptivo del rango ("Normal", "Crítico")
 * @param {string} buttonText - Texto del botón
 * @param {function} onButtonClick - Callback al hacer clic en el botón
 * @param {boolean} showButton - Forzar mostrar botón
 * @param {boolean} loading - Si está cargando, muestra el loader
 * @param {string} loadingMessage - Mensaje opcional durante la carga
 * @param {string} className - Clases adicionales
 * @param {React.ReactNode} children - Contenido extra opcional
 */
const Card = ({
  variant = "nav",
  icon,
  title,
  description,
  status,
  label,
  buttonText = "Ver",
  onButtonClick,
  showButton = true,
  className = "",
  children,
  loading = false,
  loadingMessage = "Cargando datos...",
}) => {
  const statusColors = {
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    red: "bg-red-500",
    gray: "bg-gray-400",
  };

  return (
    <div
      className={`bg-gradient-to-br from-white to-gray-100 shadow-md rounded-2xl p-4 flex flex-col items-center text-center relative hover:shadow-xl transition-transform transform hover:-translate-y-1 w-full sm:w-60 md:w-72 lg:w-80 ${className}`}
      aria-label={`Tarjeta ${variant}: ${title}`}
    >
      {/* === Loader mientras carga === */}
      {loading ? (
        <LoaderCard mensaje={loadingMessage} />
      ) : (
        <>
          {/* Indicador de estado (solo KPI) */}
          {variant !== "nav" && status && (
            <div
              className={`h-3 w-3 rounded-full absolute top-3 right-3 ${
                statusColors[status] || statusColors.gray
              } border border-white shadow-sm`}
              title={`Estado: ${status}`}
            ></div>
          )}

          {/* Icono */}
          {icon && (
            <div className="mb-2 p-2 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shadow-sm text-xl">
              {icon}
            </div>
          )}

          {/* Título */}
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1">
            {title}
          </h2>

          {/* Descripción o valor */}
          {description && (
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              {description}
            </p>
          )}

          {/* Label del rango (solo KPI) */}
          {variant !== "nav" && label && (
            <p className="text-xs sm:text-sm text-gray-500 italic mt-1">
              {label}
            </p>
          )}

          {/* Contenido extra */}
          {children && <div className="mt-2">{children}</div>}

          {/* Botón: nav o kpiAction */}
          {((variant === "nav" || variant === "kpiAction") &&
            showButton &&
            onButtonClick) && (
            <button
              onClick={onButtonClick}
              className="mt-3 bg-blue-600 hover:bg-blue-500/90 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              {buttonText}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
