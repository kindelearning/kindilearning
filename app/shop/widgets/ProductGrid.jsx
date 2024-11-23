"use client";

import { ProductCard } from "..";
import { getProducts } from "@/lib/hygraph";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGrid() {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State for loading status
  const scrollContainerRef = useRef(null);

  // Fetch products using useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once

  // Function to scroll right with smooth animation
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: "smooth", // This adds smooth scrolling
      });
    }
  };

  // Function to scroll left with smooth animation
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: "smooth", // This adds smooth scrolling
      });
    }
  };

  // If products are still loading, show a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!products || products.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <div className="relative w-full flex gap-2">
        {/* Left Arrow */}
        <button
          className="absolute w-[32px] h-[32px] hidden lg:flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
          onClick={scrollLeft}
        >
          <ChevronLeft />
        </button>

        {/* Product Grid */}
        <div
          ref={scrollContainerRef}
          className="w-full flex gap-2 scrollbar-hidden overflow-x-scroll"
        >
          {products.map((product) => (
            <div key={product.id}>
              <Link href={`/shop/${product.id}`}>
                <ProductCard
                  image={product.thumbnail.url}
                  title={product.title.slice(0, 18) + "..."}
                  price={product.salePrice}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute w-[32px] h-[32px] hidden lg:flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
          onClick={scrollRight}
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
}
