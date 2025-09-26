// src/pages/Corriente.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ChartCard from "../components/ChartCard";
import ScrollButton from "../components/ScrollButton";

const Corriente = () => {
  const navigate = useNavigate();

  // 🔥 20 datos de ejemplo
  const sampleData = Array.from({ length: 20 }, (_, i) => ({
    name: `${(i + 1).toString().padStart(2, "0")}:00`,
    corriente: Math.floor(Math.random() * 10) + 5,
  }));

  // KPIs
  const values = sampleData.map((d) => d.corriente);
  const lastValue = values.at(-1);
  const mean = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  const max = Math.max(...values);
  const min = Math.min(...values);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header
        title="Corriente"
        description="Monitoreo de la corriente del sistema"
        showBackButton={true}
        onBack={() => navigate(-1)}
      />

      <main className="flex-1 p-2 sm:p-4 space-y-6">
        {/* KPIs */}
        <div className="px-4 md:px-12">
          {/* En móviles → scroll, en desktop → flex normal */}
          <div className="flex gap-3 overflow-x-auto sm:overflow-x-visible no-scrollbar">
            <Card
              title="Actual"
              description={`${lastValue} A`}
              className="w-[90px] px-2 py-2 text-xs border border-blue-200 rounded-xl 
                         bg-gradient-to-r from-white to-blue-50 shadow-sm flex-shrink-0"
            />
            <Card
              title="Media"
              description={`${mean} A`}
              className="w-[90px] px-2 py-2 text-xs border border-blue-200 rounded-xl 
                         bg-gradient-to-r from-white to-blue-50 shadow-sm flex-shrink-0"
            />
            <Card
              title="Máximo"
              description={`${max} A`}
              className="w-[90px] px-2 py-2 text-xs border border-blue-200 rounded-xl 
                         bg-gradient-to-r from-white to-blue-50 shadow-sm flex-shrink-0"
            />
            <Card
              title="Mínimo"
              description={`${min} A`}
              className="w-[90px] px-2 py-2 text-xs border border-blue-200 rounded-xl 
                         bg-gradient-to-r from-white to-blue-50 shadow-sm flex-shrink-0"
            />
          </div>

          {/* 🚀 Botón elegante debajo */}
          <div className="mt-3">
            <ScrollButton targetId="rango-fechas" text="Ver por rangos" />
          </div>
        </div>

        {/* Gráfica */}
        <div className="px-4 md:px-12">
          <ChartCard
            title="Corriente del Día"
            data={sampleData}
            dataKey="corriente"
            color="#f97316"
            unit="A"
          />
        </div>

        {/* Sección de rangos de fechas */}
        <section id="rango-fechas" className="px-4 md:px-12 py-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            📅 Corriente por rangos de fechas
          </h3>
          <p className="text-gray-600">
            Aquí irá el selector de fechas y la gráfica filtrada.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Corriente;
