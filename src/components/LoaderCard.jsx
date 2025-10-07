// src/components/LoaderCard.jsx
import { Loader2 } from "lucide-react";

export const LoaderCard = ({ mensaje = "Cargando datos..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500">
      <Loader2 className="w-6 h-6 mb-2 animate-spin text-blue-500" />
      <p>{mensaje}</p>
    </div>
  );
};
