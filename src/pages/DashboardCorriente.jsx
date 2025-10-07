import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ChartCard from "../components/ChartCard";
import { useRegistrosActuales } from "../hooks/useRegistrosActuales";

const DashboardCorriente = () => {
  const { datosActuales, datosMaximos, datosMinimos, estado, historico } = useRegistrosActuales(30);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  // Extraer valores actuales desde el hook
  const corrienteActual = datosActuales.corriente_promedio ?? "-";
  const corrienteMaximaDia = datosMaximos.corriente_maxima ?? "-";
  const corrienteMinimaDia = datosMinimos.corriente_minima ?? "-";

  const statusMap = {
    conectado: "green",
    datos_parciales: "yellow",
    desconectado: "red",
  };
  const statusColor = statusMap[estado] || "gray";

  // Control de visualización en la gráfica
  const [showMax, setShowMax] = useState(false);
  const [showMin, setShowMin] = useState(false);

  // Configuración de series de la gráfica
  const seriesConfig = [
    { name: "Corriente Actual", dataKey: "corriente_promedio", color: "#3b82f6", unit: "A" },
    showMax && { name: "Corriente Máxima", dataKey: "corriente_maxima", color: "#ef4444", unit: "A" },
    showMin && { name: "Corriente Mínima", dataKey: "corriente_minima", color: "#10b981", unit: "A" },
  ].filter(Boolean);

  const chartData = historico.map(r => ({
    ...r,
    corriente_maxima: r.corriente_maxima,
    corriente_minima: r.corriente_minima,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        title="Dashboard Corriente"
        description="Monitoreo de corriente en tiempo real"
        showBackButton
        onBack={handleBack}
      />

      <main className="flex-1 px-4 py-4 flex flex-col gap-4">
        {/* Tarjetas de información */}
        <section className="flex-1 bg-white shadow-md rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="kpi" title="Corriente Actual" description={`${corrienteActual} A`} />
          <Card variant="kpi" title="Corriente Máxima del Día" description={`${corrienteMaximaDia} A`} />
          <Card variant="kpi" title="Corriente Mínima del Día" description={`${corrienteMinimaDia} A`} />
          <Card variant="kpi" title="Estado del Equipo" description={estado} status={statusColor} />
        </section>

        {/* Controles para mostrar/ocultar series */}
        <section className="flex gap-6 items-center mt-2">
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Corriente Máxima</span>
            <button
              className={`w-12 h-6 rounded-full p-1 flex items-center transition ${
                showMax ? "bg-red-500 justify-end" : "bg-gray-300 justify-start"
              }`}
              onClick={() => setShowMax(!showMax)}
            >
              <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Corriente Mínima</span>
            <button
              className={`w-12 h-6 rounded-full p-1 flex items-center transition ${
                showMin ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
              }`}
              onClick={() => setShowMin(!showMin)}
            >
              <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
            </button>
          </div>
        </section>

        {/* Gráfica */}
        <section className="flex-1 bg-white shadow-md rounded-xl p-4 mt-2">
          <ChartCard
            title="Histórico de Corriente"
            data={chartData}
            seriesConfig={seriesConfig}
            curve="smooth"
            height={320}
            extraOptions={{
              tooltip: {
                x: {
                  formatter: val => {
                    const date = new Date(val);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}`;
                  },
                },
              },
              chart: {
                toolbar: { show: true, tools: { download: true, zoom: true, reset: true } },
              },
              yaxis: { labels: { formatter: val => `${val} A` } },
            }}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardCorriente;
