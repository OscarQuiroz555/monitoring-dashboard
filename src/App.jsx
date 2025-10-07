// src/App.jsx
import "./globals.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPlanta from "./pages/DashboardPlanta";
import DashboardCorriente from "./pages/DashboardCorriente";
import DashboardVoltaje from "./pages/DashboardVoltaje";
import DashboardChiller  from "./pages/DashboardChiller"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPlanta />} />
      <Route path="/Corriente" element={<DashboardCorriente />} />
      <Route path="/Voltaje" element={<DashboardVoltaje />} />
      <Route path="/Chiller" element={<DashboardChiller />} />
    </Routes>
  );
}

export default App;
