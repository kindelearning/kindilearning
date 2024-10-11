"use client";

import React, { useState } from "react";

const QuantityControl = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex w-fit min-w-[124px] items-center border-1 border-gray-200 rounded-full overflow-hidden">
      <button
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200 ease-in-out"
        onClick={handleDecrement}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18 12H6"
          />
        </svg>
      </button>
      <input
        type="text"
        value={quantity}
        className="w-8 py-1 text-center text-gray-600 bg-white focus:outline-none appearance-none"
        readOnly
      />
      <button
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-full text-gray-600 transition duration-200 ease-in-out"
        onClick={handleIncrement}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default QuantityControl;
