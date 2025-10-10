// src/pages/DashboardChiller.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { LoaderCard } from "../components/LoaderCard";
import { useRegistrosActuales } from "../hooks/useRegistrosActuales";

// 👇 nuevos iconos elegantes
import { Activity, Gauge, Thermometer, WalletMinimal } from "lucide-react";

const DashboardChiller = () => {
  const { loading, datosActuales, timestamp, estado } = useRegistrosActuales(30);
  const navigate = useNavigate();

  const handleCorriente = () => navigate("/Corriente");
  const handleVoltaje = () => navigate("/Voltaje");
  const handleCorrienteRangos = () => navigate("/CorrienteRangos");
  const handleBack = () => navigate(-1);

  const fmt = useMemo(
    () => (v, unit = "") =>
      v == null || isNaN(v) ? "—" : `${Number(v).toFixed(2)}${unit ? ` ${unit}` : ""}`,
    []
  );

  const ultimaActualizacion = timestamp
    ? new Date(timestamp).toLocaleString()
    : "Sin datos";

  const statusMap = {
    conectado: "green",
    datos_parciales: "yellow",
    desconectado: "red",
  };
  const statusColor = statusMap[estado] || "gray";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header
        title="Dashboard General - Chiller"
        description="Monitoreo en tiempo real del sistema eléctrico y térmico"
        showBackButton
        onBack={handleBack}
      />

      <main className="flex-1 px-6 py-10 flex flex-col gap-10">
        {/* === SECCIÓN SUPERIOR: KPIs === */}
        <section className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-6 border-b border-blue-200 pb-2">
            Indicadores en Tiempo Real
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              variant="kpi"
              title="Factor de Potencia"
              description={fmt(datosActuales.factor_potencia_promedio, "")}
              loading={loading}
              className="border-t-4 border-blue-500 hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-xl"
            />
            <Card
              variant="kpi"
              title="Potencia Promedio"
              description={fmt(datosActuales.potencia_promedio, "W")}
              loading={loading}
              className="border-t-4 border-yellow-400 hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-xl"
            />
            <Card
              variant="kpi"
              title="Frecuencia Promedio"
              description={fmt(datosActuales.frecuencia_promedio, "Hz")}
              loading={loading}
              className="border-t-4 border-indigo-400 hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-xl"
            />
            <Card
              variant="kpi"
              title="Última actualización"
              description={
                loading ? (
                  <span className="text-gray-500">Cargando…</span>
                ) : (
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-gray-700">{ultimaActualizacion}</span>
                    <span
                      className={`font-semibold mt-1 ${
                        estado === "conectado"
                          ? "text-green-600"
                          : estado === "datos_parciales"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      Estado: {estado}
                    </span>
                  </div>
                )
              }
              loading={false}
              className="border-t-4 border-green-400 hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-xl"
            />
          </div>
        </section>

        {/* === SECCIÓN INFERIOR: DASHBOARDS ESPECÍFICOS === */}
        <section className="relative bg-gradient-to-br from-white/90 to-blue-50/70 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-100">
          {loading && (
            <div className="absolute inset-0 rounded-3xl bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
              <LoaderCard mensaje="Cargando datos del chiller..." />
            </div>
          )}

          <h1 className="text-2xl font-extrabold text-gray-800 text-center mb-8">
            Dashboards Específicos
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Corriente */}
            <div className="group rounded-2xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 p-5 flex flex-col items-center text-center">
              <Activity className="w-12 h-12 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Corriente Promedio
              </h3>
              <p className="text-gray-600 text-md mb-4">
                {fmt(datosActuales.corriente_promedio, "A")}
              </p>
              <button
                onClick={handleCorriente}
                disabled={loading}
                aria-busy={loading}
                className={`px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition-colors
                 ${loading ? "bg-blue-300 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              >
                Ir al Dashboard
              </button>
            </div>

            {/* Voltaje */}
            <div className="group rounded-2xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 p-5 flex flex-col items-center text-center">
              <Gauge className="w-12 h-12 text-yellow-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Voltaje Promedio
              </h3>
              <p className="text-gray-600 text-md mb-4">
                {fmt(datosActuales.voltaje_promedio, "V")}
              </p>
              <button
                onClick={handleVoltaje}
                disabled={loading}
                aria-busy={loading}
                className={`px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition-colors
                 ${loading ? "bg-yellow-300 cursor-not-allowed text-white" : "bg-yellow-500 hover:bg-yellow-600 text-white"}`}
              >
                Ir al Dashboard
              </button>
            </div>

            {/* Temperaturas */}
            <div className="rounded-2xl bg-gray-100 p-5 flex flex-col items-center text-center border border-gray-200 opacity-80">
              <Thermometer className="w-12 h-12 text-orange-500 mb-3" />
              <h3 className="font-bold text-gray-700 text-lg mb-2">
                Temperaturas
              </h3>
              <p className="text-gray-500 text-md mb-4">(por definir)</p>
              <button
                onClick={handleCorrienteRangos}
                disabled={loading}
                aria-busy={loading}
                className={`px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition-colors
                 ${loading ? "bg-yellow-300 cursor-not-allowed text-white" : "bg-yellow-500 hover:bg-yellow-600 text-white"}`}
              >
                Ir al Dashboard
              </button>
            </div>

            {/* Costeos */}
            <div className="rounded-2xl bg-gray-100 p-5 flex flex-col items-center text-center border border-gray-200 opacity-80">
              <WalletMinimal className="w-12 h-12 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-700 text-lg mb-2">Costeos</h3>
              <p className="text-gray-500 text-md mb-4">(por definir)</p>
              <button
                disabled
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
              >
                Próximamente
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardChiller;
