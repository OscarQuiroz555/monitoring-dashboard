// src/components/Header.jsx
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import logo from "../assets/Logo_perlas_explosivas_.png";

const Header = ({ title, description, showBackButton = false, onBack }) => {
  return (
    <header className="header-gradient text-white px-6 py-3 shadow-xl relative flex items-center justify-center">
      
      {/* Botón Volver a la izquierda */}
      {showBackButton && (
        <button
          onClick={onBack}
          className="absolute left-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-500/90 transition-colors text-white font-semibold px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm md:text-base"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Volver
        </button>
      )}

      {/* Logo + Título/Descripción centrados */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {logo && (
          <img
            src={logo}
            alt="Perlas Explosivas"
            className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-full border-2 border-white shadow-md"
          />
        )}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">{title}</h1>
          {description && (
            <p className="text-sm md:text-base text-blue-200 mt-1">{description}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
