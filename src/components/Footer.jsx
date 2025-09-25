// src/components/Footer.jsx
import React from "react";
import { EnvelopeIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-4 shadow-md mt-6 flex flex-col md:flex-row items-center justify-between gap-2">
      
      {/* Información de la empresa */}
      <p className="text-sm md:text-base text-center md:text-left">
        &copy; {new Date().getFullYear()} Perlas Explosivas S.A. 
      </p>

      {/* Contacto y versión con iconos */}
      <div className="flex items-center gap-4 text-sm md:text-base text-center md:text-right">
        {/* Icono correo */}
        <a
          href="mailto:oscarquiroz118@gmail.com"
          className="flex items-center gap-1 hover:underline"
          title="Enviar correo a soporte"
        >
          <EnvelopeIcon className="h-5 w-5" />
        </a>

        {/* Icono WhatsApp */}
        <a
          href="https://wa.me/573162792228"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 hover:underline"
          title="Contactar soporte por WhatsApp"
        >
          <ChatBubbleLeftIcon className="h-5 w-5" />
        </a>

        {/* Versión del sistema */}
        <span>v1.0.0</span>
      </div>
    </footer>
  );
};

export default Footer;
