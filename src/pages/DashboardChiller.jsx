import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

const DashboardChiller = () => {
  const navigate = useNavigate();
  const goToCorriente = () => {
    navigate("/corriente"); // ✅ Redirige al DashboardCorriente
  };
  const goToVoltaje = () => {
    navigate("/voltaje"); // ✅ Redirige al DashboardVoltaje
  };
  const goToTemperaturas = () => {
    navigate("/temperaturas"); // ✅ Redirige al DashboardTemperaturas
  };
    const goToConsumoCosteo = () => {
      navigate("/consumo-costeo"); // ✅ Redirige al DashboardConsumoCosteo
    };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header
        title="Dashboard Chiller"
        description="Visualización de KPIs y datos en tiempo real"
        showBackButton={true}
        onBack={() => navigate(-1)}
      />

      <main className="flex-1 p-4 sm:p-6 space-y-6">

        {/* Primeras 4 tarjetas informativas */}
        <div className="overflow-x-auto py-2 scroll-smooth">
          <div className="flex gap-4 px-4 md:px-12 snap-x snap-mandatory">
            <Card icon="⚡" title="Factor de Potencia" description="0.10517" showButton={false} className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start" />
            <Card icon="⏱️" title="Frecuencia" description="59.95167" showButton={false} className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start" />
            <Card icon="🔋" title="Potencia Aparente" description="1368.1897" showButton={false} className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start" />
            <Card icon="🕒" title="Última actualización" description="25 de septiembre de 2025, 6:22:35 p.m. UTC-5" showButton={false} className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start" />
          </div>
        </div>

        {/* Siguientes 4 tarjetas con botón */}
        <div className="overflow-x-auto py-2 scroll-smooth">
          <div className="flex gap-4 px-4 md:px-12 snap-x snap-mandatory">
            <Card icon="🔌" title="Corriente" description="6.66543 A" buttonText="Ver Corriente" onButtonClick={goToCorriente} className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start" />
            <Card icon="⚡" title="Voltaje" description="209.80667 V" buttonText="Ver Voltaje" onButtonClick={goToVoltaje} className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start" />
            <Card icon="🌡️" title="Temperaturas NTC" description="NTC1: N/A NTC2: N/A NTC3: N/A NTC4: N/A" buttonText="Ver Temperaturas" onButtonClick={goToTemperaturas} className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start" />
            <Card icon="💰" title="Informe de Costos" description="por definir" buttonText="Ver Informe" onButtonClick={goToConsumoCosteo} className="flex-shrink-0 w-60 sm:w-64 md:w-72 lg:w-80 snap-start" />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default DashboardChiller;
