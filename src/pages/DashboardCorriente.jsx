import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ChartCard from "../components/ChartCard";
import StatusMessage from "../components/StatusMessage";
import { useRegistrosActuales } from "../hooks/useRegistrosActuales";

const PARAMETROS_DISPLAY = [
  { key: "corriente_promedio", title: "Corriente Actual", unit: "A" },
  { key: "corriente_maxima", title: "Corriente Máxima", unit: "A" },
];

const DashboardCorriente = () => {
  const navigate = useNavigate();
  const { datosActuales, datosMaximos, timestamp, historico, estado } = useRegistrosActuales(30);

  const handleBack = () => navigate(-1);

  const getValor = (key) => {
    if (datosActuales[key] != null) return datosActuales[key];
    if (datosMaximos[key] != null) return datosMaximos[key];
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        title="Dashboard de Corriente"
        description="Monitoreo en tiempo real de la corriente eléctrica"
        showBackButton
        onBack={handleBack}
      />

      <main className="flex-1 flex flex-col gap-6 px-2 sm:px-4 py-4">
        <section className="w-full bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold whitespace-nowrap">Datos del Día Actual</h2>
            <div className="flex gap-4 flex-wrap">
              {PARAMETROS_DISPLAY.map(({ key, title, unit }) => (
                <Card
                  key={key}
                  variant="kpi"
                  title={title}
                  description={
                    getValor(key) != null ? `${getValor(key).toFixed(2)} ${unit}` : "--"
                  }
                  status={
                    estado === "conectado"
                      ? "green"
                      : estado === "datos_parciales"
                      ? "yellow"
                      : "red"
                  }
                />
              ))}
            </div>
          </div>

          <StatusMessage
            tipo="Corriente"
            ultimoTimestamp={timestamp}
            valorActual={datosActuales?.corriente_promedio}
            estado={estado}
          />

          <ChartCard
            title="Corriente en Tiempo Real"
            data={historico}
            seriesConfig={[
              { name: "Promedio", dataKey: "corriente_promedio", color: "#22c55e", unit: "A" },
              { name: "Máxima", dataKey: "corriente_maxima", color: "#ef4444", unit: "A" },
            ]}
            height={300}
          />
        </section>

        <section className="w-full bg-white rounded-xl shadow-md p-6 flex-1">
          <h2 className="text-xl font-bold mb-4">Datos por Rango de Días</h2>
          {/* Aquí más tarjetas y gráficos por rango */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardCorriente;
