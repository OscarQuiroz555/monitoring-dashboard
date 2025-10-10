import React from "react";
import Header from "../components/Header";

const DashboardCorrienteRangos = () => {
    const handleBack = () => {
        // Implementa la navegación hacia atrás según tu router
        window.history.back();
    };

    return (
        <div>
            <Header
                title="Dashboard Corriente Rangos"
                description="Visualiza los rangos de corriente en tiempo real"
                showBackButton={true}
                onBack={handleBack}
            />
            {/* Aquí puedes agregar el contenido principal del dashboard */}
            <main className="p-6">
                {/* Ejemplo de contenido */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-bold mb-2">Rangos de Corriente</h2>
                    <p className="text-gray-700">Aquí se mostrarán los datos de los rangos de corriente.</p>
                </div>
            </main>
        </div>
    );
};

export default DashboardCorrienteRangos;