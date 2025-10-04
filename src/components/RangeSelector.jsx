// src/components/RangeSelector.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/solid";

const RangeSelector = ({ cargarHistorico }) => {
  const [customRange, setCustomRange] = useState({ startDate: null, endDate: null });

  const handleApply = () => {
    const { startDate, endDate } = customRange;

    if (!startDate || !endDate) {
      alert("Seleccione fecha y hora de inicio y fin.");
      return;
    }
    if (startDate >= endDate) {
      alert("Fecha de inicio debe ser menor que la fecha de fin.");
      return;
    }

    if (typeof cargarHistorico === "function") {
      cargarHistorico(startDate, endDate);
    } else {
      console.warn("cargarHistorico no es una función");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto p-2 bg-white rounded-3xl shadow-lg">
      {/* Fecha de inicio */}
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-gray-500" />
        <DatePicker
          selected={customRange.startDate}
          onChange={(date) => setCustomRange((prev) => ({ ...prev, startDate: date }))}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Fecha y hora inicio"
          className="px-3 py-1 rounded-lg border shadow-sm w-48"
        />
      </div>

      {/* Fecha de fin */}
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-gray-500" />
        <DatePicker
          selected={customRange.endDate}
          onChange={(date) => setCustomRange((prev) => ({ ...prev, endDate: date }))}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="Fecha y hora fin"
          className="px-3 py-1 rounded-lg border shadow-sm w-48"
        />
      </div>

      {/* Botón aplicar */}
      <button
        onClick={handleApply}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow transition-transform transform hover:scale-[1.03]"
      >
        Aplicar
      </button>
    </div>
  );
};

export default RangeSelector;
