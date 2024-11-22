"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileProductCard } from "./page";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductsList = ({ products }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products per page

  // Calculate indexes for slicing
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Get products for the current page
  const currentProducts = products.slice(startIndex, endIndex);

  // Total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      {/* Products Grid */}
      <div className="w-full lg:grid justify-between lg:grid-cols-3 px-4 md:px-0 lg:px-0 grid grid-cols-2 overflow-hidden gap-2">
        {currentProducts.map((product) => (
          <div key={product.id} className="border">
            <Link href={`/shop/${product.id}`}>
              <MobileProductCard
                image={product.thumbnail.url || ProductImage}
                title={product.title}
                price={product.salePrice}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-red rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        ><ChevronLeft />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "text-purple"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-red rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
