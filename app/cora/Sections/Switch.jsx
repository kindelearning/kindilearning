import React from "react";

const Switch = ({ checked, onChange, disabled, label }) => {
  return (
    <div className="flex items-center space-x-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div
        className={`relative inline-block w-10 h-6 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`block w-10 h-6 rounded-full transition-colors duration-300 
            ${checked ? "bg-blue-600" : "bg-gray-400"} 
            ${disabled ? "bg-gray-300" : ""}
          `}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 
            ${checked ? "transform translate-x-4" : ""}
            ${disabled ? "bg-gray-200" : ""}`}
        ></div>
      </div>
    </div>
  );
};

export default Switch;
