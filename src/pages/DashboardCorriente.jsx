import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ChartCard from "../components/ChartCard"; // tu ChartCard actual (con xaxis.tooltip disabled)
import { useRegistrosActuales } from "../hooks/useRegistrosActuales";

const DashboardCorriente = () => {
  const { datosActuales, datosMaximos, datosMinimos, estado, historico } = useRegistrosActuales(30);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  // 🧽 KPI formatting (evita "- A")
  const fmt = useMemo(
    () => (v, unit = "") =>
      v == null || isNaN(v) ? "—" : `${Number(v).toFixed(2)}${unit ? ` ${unit}` : ""}`,
    []
  );

  const corrienteActual    = fmt(datosActuales.corriente_promedio, "A");
  const corrienteMaximaDia = fmt(datosMaximos.corriente_maxima, "A");
  const corrienteMinimaDia = fmt(datosMinimos.corriente_minima, "A");

  const statusMap = { conectado: "green", datos_parciales: "yellow", desconectado: "red" };
  const statusColor = statusMap[estado] || "gray";

  // Toggles de la gráfica
  const [showMax, setShowMax] = useState(false);
  const [showMin, setShowMin] = useState(false);

  // ✅ Memo para evitar recalcular en cada render
  const seriesConfig = useMemo(
    () => [
      { name: "Corriente Actual", dataKey: "corriente_promedio", color: "#3b82f6", unit: "A" },
      ...(showMax ? [{ name: "Corriente Máxima", dataKey: "corriente_maxima", color: "#ef4444", unit: "A" }] : []),
      ...(showMin ? [{ name: "Corriente Mínima", dataKey: "corriente_minima", color: "#10b981", unit: "A" }] : []),
    ],
    [showMax, showMin]
  );

  // Tu historico ya incluye lo necesario
  const chartData = useMemo(() => historico, [historico]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        title="Dashboard de Corriente"
        description="Monitoreo de corriente en tiempo real"
        showBackButton
        onBack={handleBack}
      />

      <main className="flex-1 px-4 py-4 flex flex-col gap-4">
        {/* Tarjetas */}
        <section className="flex-1 bg-white shadow-md rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="kpi" title="Corriente Actual"        description={corrienteActual} />
          <Card variant="kpi" title="Corriente Máxima del Día" description={corrienteMaximaDia} />
          <Card variant="kpi" title="Corriente Mínima del Día" description={corrienteMinimaDia} />
          <Card variant="kpi" title="Estado del Equipo"        description={estado} status={statusColor} />
        </section>

        {/* Controles */}
        <section className="flex gap-6 items-center mt-2">
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Corriente Máxima</span>
            <button
              className={`w-12 h-6 rounded-full p-1 flex items-center transition ${
                showMax ? "bg-red-500 justify-end" : "bg-gray-300 justify-start"
              }`}
              onClick={() => setShowMax((v) => !v)}
            >
              <span className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Corriente Mínima</span>
            <button
              className={`w-12 h-6 rounded-full p-1 flex items-center transition ${
                showMin ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
              }`}
              onClick={() => setShowMin((v) => !v)}
            >
              <span className="w-4 h-4 bg-white rounded-full shadow-md" />
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
    // 1 solo tooltip (el principal)
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
          return Number.isFinite(n) ? `${n.toFixed(2)} A` : "";
        },
      },
      min: 0,
      forceNiceScale: true,
    },
    chart: {
      // ✅ Habilita zoom y auto escala en Y al hacer zoom en X
      zoom: {
        enabled: true,
        type: "x",            // zoom horizontal (lo más útil en series temporales)
        autoScaleYaxis: true, // ajusta Y automáticamente al rango seleccionado
      },
      toolbar: {
        show: true,
        tools: {
          // Activa las herramientas visibles en el toolbar
          download: true,
          selection: true, // selección para zoom con arrastre
          zoom: true,      // botón de zoom lupa
          zoomin: true,    // acercar
          zoomout: true,   // alejar
          pan: true,       // mover (mano)
          reset: true,     // reiniciar vista
        },
        autoSelected: "zoom", // opcional: deja el zoom seleccionado por defecto
      },
    },
  }}
/>

        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardCorriente;
