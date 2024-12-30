"use client";

import clsx from "clsx";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function FilterSection({
  title,
  options,
  selectedValue,
  setSelectedValue,
  filterType,
  name,
}) {
  return (
    <div className="flex flex-col justify-start items-start gap-2 w-full">
      <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
        {title}
      </div>
      <div className="flex flex-col justify-start gap-4">
        {options.map((option, index) => (
          <label
            key={index}
            className={clsx(
              "block cursor-pointer text-sm font-medium font-fredoka leading-none",
              selectedValue === option ? "text-red" : "text-[#252c32]"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={selectedValue === option}
              onChange={() => setSelectedValue(option)}
              className={clsx(
                "mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                selectedValue === option
                  ? "border-purple text-red"
                  : "border-purple"
              )}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export function Checkbox({ label, checked, onChange }) {
  return (
    <div className="w-full flex">
      <label className="text-sm font-medium cursor-pointer leading-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mr-2 text-sm text-red font-medium font-fredoka leading-none"
        />
        {label}
      </label>
    </div>
  );
}

export function RadioGroup({ label, options, selectedValue, onChange }) {
  return (
    <div className="flex flex-col justify-start items-start gap-2 w-full">
      <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
        {label}
      </div>
      {options.map((option, index) => (
        <label
          key={index}
          className={`block cursor-pointer text-sm font-medium font-fredoka leading-none ${
            selectedValue === option ? "text-red" : "text-[#252c32]"
          }`}
        >
          <input
            type="radio"
            name={label}
            value={option}
            checked={selectedValue === option}
            onChange={() => onChange(option)}
            className={`mr-2 text-sm text-red font-medium font-fredoka leading-none`}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export function ProductsWithPagination({ products }) {
  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjust this to control the number of products per page

  // Calculate the index of the first and last product on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Get the products to display on the current page
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-2 md:gap-4 w-full">
      <div className="flex justify-between items-center px-4 lg:px-0 w-full">
        <span className="w-[max-content] text-[#0A1932] font-fredoka tex-[24px] lg:text-[32px] font-semibold">
          All Products
        </span>
      </div>

      {/* Display products */}
      <div className="w-full lg:grid lg:grid-cols-3 px-4 md:px-0 lg:px-0 grid grid-cols-2 overflow-hidden gap-2">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.documentId}
            productUrl={`/shop/${product.documentId}`}
            image={product?.FeaturedImage?.[0]?.url}
            // image={`https://proper-fun-404805c7d9.strapiapp.com${
            //   product?.FeaturedImage?.[0]?.url || "/uploads/default-image.webp"
            // }`}
            price={product.DiscountPrice || product.Price}
            title={product.Name}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="w-full flex font-fredoka justify-center items-center mt-6">
      {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-transparent text-red py-2 px-4 rounded-lg mr-2"
          >
          Prev
        </button>

        {/* Pagination Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 rounded-lg py-2 ${
              currentPage === index + 1
                ? " text-red"
                : "bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-transparent text-red py-2 px-4 rounded-lg ml-2"
          >
          Next
        </button>
      </div>
    </div>
  );
}
