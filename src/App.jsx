// src/App.jsx
import "./globals.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPlanta from "./pages/DashboardPlanta";
import DashboardChiller from "./pages/DashboardChiller";
import Corriente from "./pages/Corriente";
import Voltaje from "./pages/Voltaje";
import Temperaturas from "./pages/Temperaturas";
import ConsumoCosteo from "./pages/ConsumoCosteo"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPlanta />} />
      <Route path="/chiller" element={<DashboardChiller />} />
      <Route path="/corriente" element={<Corriente />} />
      <Route path="/voltaje" element={<Voltaje />} />
      <Route path="/temperaturas" element={<Temperaturas />} />
      <Route path="/consumo-costeo" element={<ConsumoCosteo />} />
    </Routes>
  );
}

export default App;
