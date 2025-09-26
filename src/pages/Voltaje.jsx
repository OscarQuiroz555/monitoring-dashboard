// src/pages/Voltaje.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Voltaje = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header con botón Volver */}
      <Header
        title="Voltaje"
        description="Monitoreo del voltaje del sistema"
        showBackButton={true}
        onBack={() => navigate(-1)}
      />

      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* Tarjetas de voltaje */}
        <div className="overflow-x-auto py-2 scroll-smooth">
          <div className="flex gap-4 px-4 md:px-12 snap-x snap-mandatory">
            <Card
              icon="⚡"
              title="Voltaje Actual"
              description="0 V"
              showButton={false}
              className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start"
            />
            <Card
              icon="📊"
              title="Media del Día"
              description="NaN V"
              showButton={false}
              className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start"
            />
            <Card
              icon="📈"
              title="Máximo del Día"
              description="NaN V"
              showButton={false}
              className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Voltaje;
