// src/components/CardRangos.jsx
import React, { useMemo } from "react";

/**
 * Ejemplo de uso:
 * <CardRangos
 *   title="Voltaje (rango seleccionado)"
 *   unit="V"
 *   avg={estadisticas.promedio.voltaje_promedio}
 *   max={estadisticas.maximo.voltaje_maximo}
 *   min={estadisticas.minimo?.voltaje_minimo} // opcional
 *   loading={loading}
 * />
 */
const CardRangos = ({
  title = "Resumen del rango",
  unit = "",
  avg = null,
  max = null,
  min = null,           // opcional
  decimals = 2,
  locales = undefined,  // ej: 'es-CO'
  icon = null,          // opcional: <Icon className="w-5 h-5" />
  loading = false,
  error = null,
}) => {
  const nf = useMemo(() => {
    try {
      return new Intl.NumberFormat(locales, {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
      });
    } catch {
      return { format: (v) => v };
    }
  }, [locales, decimals]);

  const fmt = (v) => (v == null || Number.isNaN(v) ? "—" : nf.format(Number(v)));

  if (error) {
    return (
      <div className="bg-white border border-red-200 text-red-700 rounded-xl p-4">
        <p className="text-sm font-semibold">No se pudieron cargar los datos</p>
        <p className="text-xs mt-1 opacity-80">{String(error.message || error)}</p>
      </div>
    );
  }

  return (
    <div
      className="bg-white shadow-sm rounded-2xl p-4 border border-gray-100"
      role="group"
      aria-label={title}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-500">Promedio, máximo{min != null ? " y mínimo" : ""}</p>
        </div>
        {icon ? <div className="text-gray-400">{icon}</div> : null}
      </div>

      {/* Skeleton de carga */}
      {loading ? (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`rounded-xl p-3 ${i === 2 && min == null ? "hidden md:block" : ""} bg-gray-50`}>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-gray-200 rounded mt-2 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Promedio */}
          <div className="rounded-xl border border-gray-100 p-3">
            <p className="text-xs text-gray-500">Promedio</p>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {fmt(avg)} <span className="text-gray-500 text-sm">{unit}</span>
            </p>
          </div>

          {/* Máximo */}
          <div className="rounded-xl border border-gray-100 p-3">
            <p className="text-xs text-gray-500">Máximo</p>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {fmt(max)} <span className="text-gray-500 text-sm">{unit}</span>
            </p>
          </div>

          {/* Mínimo (opcional) */}
          {min != null ? (
            <div className="rounded-xl border border-gray-100 p-3">
              <p className="text-xs text-gray-500">Mínimo</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">
                {fmt(min)} <span className="text-gray-500 text-sm">{unit}</span>
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CardRangos;
