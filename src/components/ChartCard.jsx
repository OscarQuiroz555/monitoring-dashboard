import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

/**
 * ChartCard (versión pro)
 *
 * Objetivo: un wrapper elegante y robusto para ApexCharts que funciona listo para producción.
 *
 * Props principales:
 * - title: string
 * - subtitle?: string
 * - data: Array<{ timestamp: Date, ... }>
 * - seriesConfig: Array<{ name: string, dataKey: string, color?: string, unit?: string }>
 * - curve?: 'smooth' | 'straight' | 'stepline'
 * - height?: number (px)
 * - className?: string
 * - extraOptions?: ApexCharts options (merge superficial)
 * - loading?: boolean (muestra estado de carga)
 * - noDataMessage?: string
 */
const ChartCard = ({
  title,
  subtitle,
  data = [],
  seriesConfig = [],
  curve = "smooth",
  height = 280,
  className = "",
  extraOptions = {},
  loading = false,
  noDataMessage,
}) => {
  // --- Series: pares [epochMs, valor] filtrando nulos/NaN ---
  const chartSeries = useMemo(() => {
    if (!data.length || !seriesConfig.length) return [];
    return seriesConfig.map((s) => ({
      name: s.name,
      data: data
        .filter(
          (row) =>
            row?.timestamp instanceof Date &&
            row[s.dataKey] != null &&
            Number.isFinite(Number(row[s.dataKey]))
        )
        .map((row) => [row.timestamp.getTime(), Number(row[s.dataKey])]),
    }));
  }, [data, seriesConfig]);

  // --- Unidades por serie y unidad común para eje Y (si todas coinciden) ---
  const unitsBySeries = useMemo(
    () => seriesConfig.map((s) => s.unit ?? ""),
    [seriesConfig]
  );
  const yAxisUnit = useMemo(() => {
    const uniques = Array.from(new Set(unitsBySeries.filter(Boolean)));
    return uniques.length === 1 ? uniques[0] : "";
  }, [unitsBySeries]);

  // --- Máximo dinámico (con headroom 10%) para que no se "apriete" la gráfica ---
  const computedMaxY = useMemo(() => {
    let maxVal = 0;
    for (const s of seriesConfig) {
      for (const row of data) {
        const v = Number(row[s.dataKey]);
        if (Number.isFinite(v) && v > maxVal) maxVal = v;
      }
    }
    return maxVal > 0 ? maxVal * 1.1 : undefined;
  }, [data, seriesConfig]);

  const noDataText = useMemo(
    () => noDataMessage || `No hay datos disponibles para ${title}.`,
    [noDataMessage, title]
  );

  // --- Opciones base de ApexCharts ---
  const baseOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        height,
        animations: { enabled: true, easing: "easeinout", speed: 600 },
        toolbar: { show: true, tools: { download: true, zoom: true, reset: true } },
        zoom: { enabled: false },
        foreColor: "#374151",
      },
      stroke: { curve, width: 2.5 },
      colors: seriesConfig.map((s) => s.color).filter(Boolean),
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
        row: { colors: ["#f9fafb", "transparent"], opacity: 0.5 },
      },
      dataLabels: { enabled: false },
      markers: { size: 3 },
      xaxis: {
        type: "datetime",
        tooltip: { enabled: false }, // Solo dejamos el tooltip principal
        crosshairs: { show: false },
        labels: {
          rotate: -45,
          formatter: (val) =>
            new Date(val).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
        },
        title: { text: "Hora", style: { fontSize: "12px", color: "#6b7280" } },
      },
      yaxis: {
        decimalsInFloat: 2,
        labels: {
          formatter: (val) => {
            const n = Number(val);
            return Number.isFinite(n)
              ? `${n.toFixed(2)}${yAxisUnit ? ` ${yAxisUnit}` : ""}`
              : "";
          },
          style: { colors: "#6b7280", fontSize: "12px" },
        },
        min: 0,
        max: computedMaxY,
        forceNiceScale: true,
      },
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          formatter: (val) =>
            new Date(val).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
        },
        y: {
          formatter: (val, { seriesIndex }) => {
            const n = Number(val);
            const unit = unitsBySeries[seriesIndex] ?? "";
            return (Number.isFinite(n) ? n.toFixed(2) : "") + (unit ? ` ${unit}` : "");
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: { shadeIntensity: 0.5, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        fontSize: "12px",
      },
    }),
    [seriesConfig, curve, height, unitsBySeries, yAxisUnit, computedMaxY]
  );

  // --- Merge superficial con extraOptions, preservando sub-objetos comunes ---
  const chartOptions = useMemo(() => ({
    ...baseOptions,
    ...extraOptions,
    xaxis: { ...(baseOptions.xaxis || {}), ...(extraOptions.xaxis || {}) },
    yaxis: { ...(baseOptions.yaxis || {}), ...(extraOptions.yaxis || {}) },
    tooltip: { ...(baseOptions.tooltip || {}), ...(extraOptions.tooltip || {}) },
    chart: { ...(baseOptions.chart || {}), ...(extraOptions.chart || {}) },
  }), [baseOptions, extraOptions]);

  return (
    <div className={`bg-white rounded-3xl shadow-lg p-6 flex flex-col ${className}`} aria-busy={loading}>
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <span className="text-gray-400 animate-pulse">Cargando datos...</span>
        </div>
      ) : chartSeries.length ? (
        <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={height} />
      ) : (
        <p className="text-gray-500 text-center py-12">{noDataText}</p>
      )}
    </div>
  );
};

export default ChartCard;
