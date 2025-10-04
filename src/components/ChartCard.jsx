import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const ChartCard = ({
  title,
  data = [],
  seriesConfig = [], // [{ name, dataKey, color, unit }]
  curve = "smooth",
  height = 280,
  extraOptions = {},
}) => {
  // --------------------
  // Preparar series
  // --------------------
  const chartSeries = useMemo(() => {
    if (!data.length || !seriesConfig.length) return [];
    return seriesConfig.map((s) => ({
      name: s.name,
      data: data.map((d) => [new Date(d.timestamp).getTime(), d[s.dataKey] ?? 0]),
    }));
  }, [data, seriesConfig]);

  // --------------------
  // Opciones ApexCharts
  // --------------------
  const chartOptions = useMemo(() => ({
    chart: {
      type: "area",
      height,
      animations: { enabled: true, easing: "easeinout", speed: 600 },
      toolbar: { show: true, tools: { download: true, zoom: true, reset: true } },
      zoom: { enabled: false },
      foreColor: "#374151",
    },
    stroke: { curve, width: 2.5 },
    colors: seriesConfig.map((s) => s.color),
    grid: { borderColor: "#e5e7eb", strokeDashArray: 4, row: { colors: ["#f9fafb", "transparent"], opacity: 0.5 } },
    dataLabels: { enabled: false },
    markers: { size: 4 },
    xaxis: {
      type: "datetime",
      labels: {
        rotate: -45,
        formatter: (val) => new Date(val).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
      },
      title: { text: "Hora", style: { fontSize: "12px", color: "#6b7280" } },
      tooltip: { enabled: false },
    },
    yaxis: {
      decimalsInFloat: 2,
      labels: {
        formatter: (val, idx) => `${val.toFixed(2)} ${seriesConfig[idx]?.unit ?? ""}`,
        style: { colors: "#6b7280", fontSize: "12px" },
      },
      min: 0,
      forceNiceScale: true,
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: { formatter: (val) => new Date(val).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }) },
      y: { formatter: (val, { seriesIndex }) => `${val.toFixed(2)} ${seriesConfig[seriesIndex]?.unit ?? ""}` },
    },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.5, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center", // 🔹 ahora centrada
      fontSize: "12px",
    },
    ...extraOptions,
  }), [seriesConfig, curve, height, extraOptions]);

  // --------------------
  // Render
  // --------------------
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {chartSeries.length ? (
        <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={height} />
      ) : (
        <p className="text-gray-500 text-center py-12">
          No hay datos disponibles para {title}.
        </p>
      )}
    </div>
  );
};

export default ChartCard;
