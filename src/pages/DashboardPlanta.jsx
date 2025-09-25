// src/pages/DashboardPlanta.jsx
import React from "react"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { BoltIcon } from "@heroicons/react/24/solid"; // icono para la tarjeta

const DashboardPlanta = () => {
  const handleDashboardChiller = () => {
    // Aquí luego puedes usar React Router para navegar
    alert("Ir al Dashboard Chiller");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header
        title="Centro de Monitoreo"
        description="Visualiza y analiza los dashboards de cada equipo"
        showBackButton={false}
      />

      {/* Contenido principal: grid de tarjetas compacta y alineada a la izquierda */}
      <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start items-start">
        <Card
          icon={<BoltIcon className="h-10 w-10 text-yellow-500" />}
          title="Dashboard Chiller"
          description="Monitorea parámetros eléctricos y térmicos en tiempo real."
          buttonText="Ir al Dashboard"
          onButtonClick={handleDashboardChiller}
          showButton={true}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardPlanta;
