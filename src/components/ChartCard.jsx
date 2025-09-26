// src/components/ChartCard.jsx
import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartCard = ({ title, data, dataKey, color = "#3b82f6", unit = "" }) => {
  const totalPoints = data.length;
  const isMobile = window.innerWidth < 640;

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: true,
        tools: {
          download: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: { enabled: true },
      animations: { enabled: true, easing: "easeinout", speed: 500 },
    },
    stroke: { curve: "smooth", width: 3 },
    colors: [color],
    xaxis: {
      categories: data.map((d) => d.name),
      range: isMobile ? 5 : totalPoints,
      tickAmount: isMobile ? 5 : 10,
      labels: { style: { colors: "#6b7280" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#6b7280" },
        formatter: (val) => `${val} ${unit}`,
      },
    },
    tooltip: { y: { formatter: (val) => `${val} ${unit}` } },
    grid: { borderColor: "#e5e7eb" },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0, stops: [0, 100] },
    },
    dataLabels: { enabled: false },
  };

  const chartSeries = [{ name: title, data: data.map((d) => d[dataKey]) }];

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl p-4 sm:p-6 w-full hover:scale-[1.02] transition-transform">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>

      {/* Gráfica */}
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={260}
        width="100%"
      />
    </div>
  );
};

export default ChartCard;
