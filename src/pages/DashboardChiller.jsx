import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useRegistrosActuales } from "../hooks/useRegistrosActuales";

const DashboardChiller = () => {
  const { datosActuales, timestamp, estado } = useRegistrosActuales(30);
  const navigate = useNavigate();

  const handleCorriente = () => navigate("/Corriente");
  const handleVoltaje = () => navigate("/Voltaje");
  const handleCorrienteRangos = () => navigate("/CorrienteRangos");
  const handleBack = () => navigate(-1);

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
        showBackButton={true}
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
              description={`${datosActuales.factor_potencia_promedio ?? "-"} `}
              className="border-t-4 border-blue-500 hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-xl"
            />
            <Card
              variant="kpi"
              title="Potencia Promedio"
              description={`${datosActuales.potencia_promedio ?? "-"} W`}
              className="border-t-4 border-yellow-400 hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-xl"
            />
            <Card
              variant="kpi"
              title="Frecuencia Promedio"
              description={`${datosActuales.frecuencia_promedio ?? "-"} Hz`}
              className="border-t-4 border-indigo-400 hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-xl"
            />
            <Card
              variant="kpi"
              title="Última actualización"
              description={
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
              }
              className="border-t-4 border-green-400 hover:scale-[1.02] transition-transform duration-200 shadow-lg hover:shadow-xl"
            />
          </div>
        </section>

        {/* === SECCIÓN INFERIOR: DASHBOARDS ESPECÍFICOS === */}
        <section className="bg-gradient-to-br from-white/90 to-blue-50/70 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-100">
          <h1 className="text-2xl font-extrabold text-gray-800 text-center mb-8">
            Dashboards Específicos
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tarjeta Corriente */}
            <div className="group rounded-2xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 p-5 flex flex-col items-center text-center">
              <span className="text-blue-600 text-5xl mb-3 group-hover:scale-110 transition-transform">
                ⚡
              </span>
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Corriente Promedio
              </h3>
              <p className="text-gray-600 text-md mb-4">
                {`${datosActuales.corriente_promedio ?? "-"} A`}
              </p>
              <button
                onClick={handleCorriente}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition-colors"
              >
                Ir al Dashboard
              </button>
            </div>

            {/* Tarjeta Voltaje */}
            <div className="group rounded-2xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 p-5 flex flex-col items-center text-center">
              <span className="text-yellow-500 text-5xl mb-3 group-hover:scale-110 transition-transform">
                🔋
              </span>
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Voltaje Promedio
              </h3>
              <p className="text-gray-600 text-md mb-4">
                {`${datosActuales.voltaje_promedio ?? "-"} V`}
              </p>
              <button
                onClick={handleVoltaje}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition-colors"
              >
                Ir al Dashboard
              </button>
            </div>

            {/* Tarjeta Temperaturas */}
            <div className="rounded-2xl bg-gray-100 p-5 flex flex-col items-center text-center border border-gray-200 opacity-80">
              <span className="text-orange-500 text-5xl mb-3">🌡️</span>
              <h3 className="font-bold text-gray-700 text-lg mb-2">
                Temperaturas
              </h3>
              <p className="text-gray-500 text-md mb-4">(por definir)</p>
              <button
                onClick={handleCorrienteRangos}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition-colors"
              >
                Ir al Dashboard
              </button>
            </div>

            {/* Tarjeta Costeos */}
            <div className="rounded-2xl bg-gray-100 p-5 flex flex-col items-center text-center border border-gray-200 opacity-80">
              <span className="text-green-600 text-5xl mb-3">💰</span>
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
