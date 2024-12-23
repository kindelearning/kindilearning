"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
// import { FileInput } from "@/components/ui/file-input"; // This can be a custom component for uploading media files

export default function CreateProductPage() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    discountPrice: "",
    metaDescription: "",
    seoKeywords: "",
    variants: "",
    inStock: false,
    keywords: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle checkbox changes (inStock)
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: checked }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to Strapi API
    const productPayload = {
      data: {
        Name: productData.name,
        Description: productData.description,
        LongDescription: productData.longDescription,
        Price: parseFloat(productData.price),
        DiscountPrice: productData.discountPrice
          ? parseFloat(productData.discountPrice)
          : null,
        MetaDescription: productData.metaDescription,
        SEOKeywords: productData.seoKeywords,
        Variants: productData.variants ? JSON.parse(productData.variants) : {},
        inStock: productData.inStock,
        Keywords: productData.keywords,
      },
    };

    try {
      const res = await fetch("http://localhost:1337/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productPayload),
      });

      if (!res.ok) throw new Error("Failed to create product");

      // Clear the form after successful submission
      setProductData({
        name: "",
        description: "",
        longDescription: "",
        price: "",
        discountPrice: "",
        metaDescription: "",
        seoKeywords: "",
        variants: "",
        inStock: false,
        keywords: "",
      });

      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("There was an error creating the product.");
    }
  };

  return (
    <>
      <section className="p-8 min-h-screen font-fredoka bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">
            Create New Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-600">Description</label>
                <Input
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-600">Long Description</label>
                <Textarea
                  name="longDescription"
                  value={productData.longDescription}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Price</label>
                <Input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-600">Discount Price</label>
                <Input
                  type="number"
                  name="discountPrice"
                  value={productData.discountPrice}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-600">Meta Description</label>
                <Input
                  type="text"
                  name="metaDescription"
                  value={productData.metaDescription}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-gray-600">SEO Keywords</label>
                <Input
                  type="text"
                  name="seoKeywords"
                  value={productData.seoKeywords}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-600">Variants (JSON)</label>
                <Textarea
                  name="variants"
                  value={productData.variants}
                  onChange={handleInputChange}
                  placeholder='{"color": "red", "size": "M"}'
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-fit gap-2 flex">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={productData.inStock}
                  onChange={handleCheckboxChange}
                  className=" w-[max-content] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="block text-gray-600">In Stock</label>
              </div>

              <div>
                <label className="block text-gray-600">
                  Keywords (Rich Text)
                </label>
                <Textarea
                  name="keywords"
                  value={productData.keywords}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button type="submit">Create Product</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
