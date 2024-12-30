"use client";

import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
      {/* Product Image */}
      <img
        src={`http://localhost:1337${product.FeaturedImage}`} // Assuming the product image URL is under 'thumbnail'
        alt={product.Name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      {/* Content */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">{product.Name}</h4>
        <p className="text-xs text-gray-600 line-clamp-2">
          {product.Description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-medium text-gray-900">
            ${product.Price}
          </span>
          {product.inStock ? (
            <span className="text-xs text-red-500">Out of Stock</span>
          ) : (
            <span className="text-xs text-green-500">In Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductWidgets() {
  const [productData, setProductData] = useState(null);

  // Function to fetch product data from the API
  const fetchProductData = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/products"); // Replace with the correct API endpoint for fetching all products
      const data = await response.json();
      setProductData(data.data); // Assuming the response structure has a 'data' field containing an array of products
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProductData();
  }, []);

  if (!productData) {
    return <div>Loading...</div>; // Display loading state while data is being fetched
  }

  // Calculating total counts based on API response
  const totalProducts = productData.length; // Count total products
  const inStockProducts = productData.filter(
    (product) => product.inStock
  ).length; // Count in-stock products
  const skillOptionsCount = new Set(
    productData.map((product) => product.SkillOptions)
  ).size; // Count unique SkillOptions
  const materialOptionsCount = new Set(
    productData.map((product) => product.MaterialOptions)
  ).size; // Count unique MaterialOptions
  const typeOfToyCount = new Set(
    productData.map((product) => product.TypeOfToy)
  ).size; // Count unique TypeOfToy
  const discountTypeCount = new Set(
    productData.map((product) => product.DiscountType)
  ).size; // Count unique DiscountType

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Products Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Total Products</h3>
        <p className="text-3xl font-semibold">{totalProducts}</p>
      </div>

      {/* In Stock Products Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">In Stock Products</h3>
        <p
          className={`text-3xl font-semibold ${
            inStockProducts > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {inStockProducts}
        </p>
      </div>

      {/* Skill Options Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Skill Options</h3>
        <p className="text-2xl font-medium text-[#494949]">
          {skillOptionsCount}
        </p>
      </div>

      {/* Material Options Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Material Options</h3>
        <p className="text-2xl font-medium text-[#494949]">
          {materialOptionsCount}
        </p>
      </div>

      {/* Type of Toy Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Type of Toy</h3>
        <p className="text-2xl font-medium text-[#494949]">{typeOfToyCount}</p>
      </div>

      {/* Discount Type Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Discount Type</h3>
        <p className="text-2xl font-medium text-[#494949]">
          {discountTypeCount}
        </p>
      </div>
    </div>
  );
}

export function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest products data from API
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:1337/api/products?populate=*"
      );
      const data = await response.json();

      const sortedProducts = data.data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) // Sort by updatedAt to get the latest
      );
      console.log("Fetched products data", sortedProducts);

      setProducts(sortedProducts.slice(0, 5)); // Get the latest 5 products
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch product data when the component is mounted
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.documentId} product={product} />
      ))}
    </div>
  );
}
