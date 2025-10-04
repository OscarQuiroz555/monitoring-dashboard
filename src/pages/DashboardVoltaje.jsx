import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ChartCard from "../components/ChartCard";
import { useRegistrosActuales } from "../hooks/useRegistrosActuales";

const DashboardVoltaje = () => {
  const { datosActuales, datosMaximos, datosMinimos, estado, historico } = useRegistrosActuales(30);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const voltajeActual = datosActuales.voltaje_promedio ?? "-";
  const voltajeMaximoDia = datosMaximos.voltaje_maximo ?? "-";
  const voltajeMinimoDia = datosMinimos.voltaje_minimo ?? "-";

  const statusMap = {
    conectado: "green",
    datos_parciales: "yellow",
    desconectado: "red",
  };
  const statusColor = statusMap[estado] || "gray";

  const [showMax, setShowMax] = useState(false);
  const [showMin, setShowMin] = useState(false);

  const seriesConfig = [
    { name: "Voltaje Actual", dataKey: "voltaje_promedio", color: "#3b82f6", unit: "V" },
    showMax && { name: "Voltaje Máximo", dataKey: "voltaje_maximo", color: "#ef4444", unit: "V" },
    showMin && { name: "Voltaje Mínimo", dataKey: "voltaje_minimo", color: "#10b981", unit: "V" },
  ].filter(Boolean);

  const chartData = historico.map(r => ({
    ...r,
    voltaje_maximo: r.voltaje_maximo,
    voltaje_minimo: r.voltaje_minimo,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        title="Dashboard Voltaje"
        description="Monitoreo de voltaje en tiempo real"
        showBackButton
        onBack={handleBack}
      />

      <main className="flex-1 px-4 py-4 flex flex-col gap-4">
        {/* Tarjetas */}
        <section className="flex-1 bg-white shadow-md rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="kpi" title="Voltaje Actual" description={`${voltajeActual} V`} />
          <Card variant="kpi" title="Voltaje Máximo del Día" description={`${voltajeMaximoDia} V`} />
          <Card variant="kpi" title="Voltaje Mínimo del Día" description={`${voltajeMinimoDia} V`} />
          <Card variant="kpi" title="Estado del Equipo" description={estado} status={statusColor} />
        </section>

        {/* Controles de series para la gráfica (toggles modernos) */}
        <section className="flex gap-6 items-center mt-2">
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Voltaje Máximo</span>
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
            <span className="text-gray-700 font-medium">Voltaje Mínimo</span>
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
            title="Histórico de Voltaje"
            data={chartData}
            seriesConfig={seriesConfig}
            curve="smooth"
            height={320}
            extraOptions={{
              tooltip: {
                x: {
                  formatter: val => {
                    const date = new Date(val);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}`;
                  }
                }
              },
              chart: {
                toolbar: { show: true, tools: { download: true, zoom: true, reset: true } }
              },
              yaxis: { labels: { formatter: val => `${val} V` } }
            }}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardVoltaje;
