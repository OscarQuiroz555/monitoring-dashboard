import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { LoaderCard } from "../components/LoaderCard";
import { BoltIcon } from "@heroicons/react/24/solid";

import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const DashboardPlanta = () => {
  const navigate = useNavigate();
  const [loadingCard, setLoadingCard] = useState(null); // 'chiller', 'otro', etc.

  const handleDashboardChiller = () => {
    setLoadingCard("chiller");

    const ref = collection(db, "TelemetriaPopping/Chiller/Registros");
    const q = query(ref, orderBy("timestamp", "desc"), limit(3));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("✅ Datos del Chiller cargados.");
      unsubscribe();
      setLoadingCard(null);
      navigate("/Chiller");
    });
  };

  // Solo ejemplo: listener de logs (no afecta el loader)
  useEffect(() => {
    const ref = collection(db, "TelemetriaPopping/Chiller/Registros");
    const q = query(ref, orderBy("timestamp", "desc"), limit(3));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.clear();
      console.log("=== Últimos 3 registros ===");

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const fechaLegible = new Date(data.timestamp.seconds * 1000);
        console.log({
          ...data,
          timestampLegible: fechaLegible.toLocaleString(),
        });
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Centro de Monitoreo"
        description="Visualiza y analiza los dashboards de cada equipo"
        showBackButton={false}
      />

      <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start items-start">
        <div className="relative">
          <Card
            icon={<BoltIcon className="h-10 w-10 text-yellow-500" />}
            title="Dashboard Chiller"
            description="Monitorea parámetros eléctricos y térmicos en tiempo real."
            buttonText="Ir al Dashboard"
            onButtonClick={handleDashboardChiller}
            showButton={true}
          />

          {loadingCard === "chiller" && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl z-10">
              <LoaderCard mensaje="Cargando dashboard..." />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPlanta;
