"use client";

import { getProducts } from "@/lib/hygraph";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchShopProducts } from "@/app/data/p/Dynamic/Shop";
import ProductCard from "../sections/ProductCard";
import { ProductImage } from "@/public/Images";

export default function ProductGrid() {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State for loading status
  const scrollRef = useRef(null); // Create a reference for the scroll container

  // Mouse dragging state and refs
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Fetch products using useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await fetchShopProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once

  // console.log("Products from productGrid COmponent", products);
  // Function to scroll right with smooth animation
  const scrollRight = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: "smooth", // This adds smooth scrolling
      });
    }
  };

  // Function to scroll left with smooth animation
  const scrollmeLeft = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
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
          onClick={scrollmeLeft}
        >
          <ChevronLeft />
        </button>

        {/* Product Grid */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          className="w-full flex gap-2 scrollbar-hidden overflow-x-scroll"
        >
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                productUrl={`/shop/${product.documentId}`}
                image={
                  product?.FeaturedImage
                    ? `https://lionfish-app-98urn.ondigitalocean.app${product?.FeaturedImage[0]?.url}`
                    : "/Images/shop/ProductImage.png"
                }
                // image={`https://lionfish-app-98urn.ondigitalocean.app${product?.FeaturedImage[0]?.url}`}
                price={product.DiscountPrice}
                title={product.Name}
              />
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
