import React from "react"; 
import { useNavigate } from "react-router-dom"; // ✅ Importa useNavigate
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { BoltIcon } from "@heroicons/react/24/solid";

const DashboardPlanta = () => {
  const navigate = useNavigate(); // ✅ Hook de navegación

  const handleDashboardChiller = () => {
    navigate("/chiller"); // ✅ Redirige al DashboardChiller
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Centro de Monitoreo"
        description="Visualiza y analiza los dashboards de cada equipo"
        showBackButton={false}
      />

      <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start items-start">
        <Card
          icon={<BoltIcon className="h-10 w-10 text-yellow-500" />}
          title="Dashboard Chiller"
          description="Monitorea parámetros eléctricos y térmicos en tiempo real."
          buttonText="Ir al Dashboard"
          onButtonClick={handleDashboardChiller} // ✅ Navega al click
          showButton={true}
        />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPlanta;
