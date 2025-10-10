import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ChartCard from "../components/ChartCard";
import { LoaderCard } from "../components/LoaderCard";
import { useRegistrosActuales } from "../hooks/useRegistrosActuales";

const DashboardVoltaje = () => {
  const { loading, datosActuales, datosMaximos, datosMinimos, estado, historico } = useRegistrosActuales(30);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const fmt = useMemo(
    () => (v, unit = "") =>
      v == null || isNaN(v) ? "—" : `${Number(v).toFixed(2)}${unit ? ` ${unit}` : ""}`,
    []
  );

  const voltajeActual    = fmt(datosActuales.voltaje_promedio, "V");
  const voltajeMaximoDia = fmt(datosMaximos.voltaje_maximo, "V");
  const voltajeMinimoDia = fmt(datosMinimos.voltaje_minimo, "V");

  const statusMap = { conectado: "green", datos_parciales: "yellow", desconectado: "red" };
  const statusColor = statusMap[estado] || "gray";

  const [showMax, setShowMax] = useState(false);
  const [showMin, setShowMin] = useState(false);

  const seriesConfig = useMemo(
    () => [
      { name: "Voltaje Actual", dataKey: "voltaje_promedio", color: "#3b82f6", unit: "V" },
      ...(showMax ? [{ name: "Voltaje Máximo", dataKey: "voltaje_maximo", color: "#ef4444", unit: "V" }] : []),
      ...(showMin ? [{ name: "Voltaje Mínimo", dataKey: "voltaje_minimo", color: "#10b981", unit: "V" }] : []),
    ],
    [showMax, showMin]
  );

  const chartData = historico;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        title="Dashboard de Voltaje"
        description="Monitoreo de voltaje en tiempo real"
        showBackButton
        onBack={handleBack}
      />

      <main className="flex-1 px-4 py-4 flex flex-col gap-4">
        {/* Tarjetas */}
        <section className="flex-1 bg-white shadow-md rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="kpi" title="Voltaje Actual"         description={voltajeActual}    loading={loading} />
          <Card variant="kpi" title="Voltaje Máximo del Día"  description={voltajeMaximoDia} loading={loading} />
          <Card variant="kpi" title="Voltaje Mínimo del Día"  description={voltajeMinimoDia} loading={loading} />
          <Card variant="kpi" title="Estado del Equipo"       description={estado} status={statusColor} loading={loading} />
        </section>

        {/* Controles */}
        <section className="flex gap-6 items-center mt-2">
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Voltaje Máximo</span>
            <button
              disabled={loading}
              className={`w-12 h-6 rounded-full p-1 flex items-center transition ${
                showMax ? "bg-red-500 justify-end" : "bg-gray-300 justify-start"
              } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              onClick={() => setShowMax((v) => !v)}
              aria-busy={loading}
            >
              <span className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Voltaje Mínimo</span>
            <button
              disabled={loading}
              className={`w-12 h-6 rounded-full p-1 flex items-center transition ${
                showMin ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
              } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              onClick={() => setShowMin((v) => !v)}
              aria-busy={loading}
            >
              <span className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>
        </section>

 {/* Gráfica */}
<section className="flex-1 bg-white shadow-md rounded-xl p-4 mt-2 min-h-[360px]">
  <div className="w-full h-full flex">
    <div
      className="flex-1 min-h-[360px]
                 [&_.apexcharts-canvas]:!w-full
                 [&_.apexcharts-canvas_svg]:!w-full"
    >
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoaderCard mensaje="Cargando histórico de voltaje..." />
        </div>
      ) : (
        <ChartCard
          title="Histórico de Voltaje"
          data={chartData}
          seriesConfig={seriesConfig}
          curve="smooth"
          height={360} // un poco más alto para respirar
          extraOptions={{
            xaxis: { tooltip: { enabled: false }, crosshairs: { show: false } },
            tooltip: {
              x: {
                formatter: (val) => {
                  const d = new Date(val);
                  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}`;
                },
              },
            },
            yaxis: {
              labels: {
                formatter: (v) => {
                  const n = Number(v);
                  return Number.isFinite(n) ? `${n.toFixed(2)} V` : "";
                },
              },
              min: 0,
              forceNiceScale: true,
            },
            chart: {
              zoom: { enabled: true, type: "x", autoScaleYaxis: true },
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  reset: true,
                },
                autoSelected: "zoom",
              },
              // 🔧 ayuda a Apex a re-medir si el contenedor cambia
              redrawOnParentResize: true,
              parentHeightOffset: 0,
            },
          }}
        />
      )}
    </div>
  </div>
</section>

      </main>

      <Footer />
    </div>
  );
};

export default DashboardVoltaje;
