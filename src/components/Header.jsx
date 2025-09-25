// src/components/Header.jsx
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import logo from "../assets/Logo_perlas_explosivas_.png"; // tu imagen local

const Header = ({ title, description, showBackButton = false, onBack }) => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 shadow-md flex flex-col md:flex-row md:items-center md:justify-center relative gap-4">
      
      {/* Logo + Título/Descripción */}
      <div className="flex items-center gap-4">
        {logo && (
          <img
            src={logo}
            alt="Perlas Explosivas"
            className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-full border-2 border-white shadow-md"
          />
        )}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">{title}</h1>
          {description && (
            <p className="text-sm md:text-base text-blue-200 mt-1">{description}</p>
          )}
        </div>
      </div>

      {/* Botón Volver opcional */}
      {showBackButton && (
        <div className="absolute top-3 right-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500/90 transition-colors text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Volver
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
