import React from "react";

const Card = ({
  icon,
  title,
  description,
  status,
  buttonText = "Ver",
  onButtonClick,
  showButton = true,
  className = "",
}) => {
  const statusColors = {
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    red: "bg-red-500",
  };

  return (
    <div
      className={`bg-gradient-to-br from-white to-gray-100 shadow-md rounded-2xl p-3 flex flex-col items-center text-center relative hover:shadow-xl transition-transform transform hover:-translate-y-1 w-auto max-w-xs ${className}`}
    >
      {status && (
        <div
          className={`h-3 w-3 rounded-full absolute top-3 right-3 ${statusColors[status]} border border-white shadow-sm`}
        ></div>
      )}

      {icon && (
        <div className="mb-2 p-2 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shadow-sm">
          {icon}
        </div>
      )}

      <h2 className="text-base md:text-lg font-bold mb-1">{title}</h2>

      {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}

      {showButton && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="mt-2 bg-blue-600 hover:bg-blue-500/90 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Card;
