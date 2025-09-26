// src/components/ScrollButton.jsx
import React from "react";
import { CalendarIcon } from "@heroicons/react/24/solid";

const ScrollButton = ({ targetId, text = "Ver por rangos de fechas" }) => {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        flex items-center justify-center gap-2
        px-4 sm:px-5 py-2 sm:py-2.5
        rounded-full
        bg-gradient-to-r from-blue-600 to-blue-800
        text-white font-semibold
        text-sm sm:text-base
        shadow-md hover:shadow-lg
        transition-all duration-300
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-400
      "
    >
      <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      {text}
    </button>
  );
};

export default ScrollButton;
