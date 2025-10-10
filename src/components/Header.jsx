// src/components/Header.jsx
import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logoprincipal.jpg"; // Asegúrate de tener un logo en esta ruta o ajusta la ruta

const Header = ({ title, description, showBackButton = false, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // pequeño delay de animación
      onBack(); // ejecuta la función que recibes del padre
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="header-gradient text-white px-6 py-3 shadow-xl relative flex items-center justify-center">
      
      {/* Botón Volver a la izquierda */}
      {showBackButton && (
        <button
          onClick={handleBackClick}
          disabled={isLoading}
          className={`absolute left-6 flex items-center gap-2 
            ${isLoading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-500/90"} 
            transition-colors text-white font-semibold px-3 py-2 rounded-lg shadow-md 
            hover:shadow-lg text-sm md:text-base`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            <>
              <ArrowLeftIcon className="h-5 w-5" />
              Volver
            </>
          )}
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
