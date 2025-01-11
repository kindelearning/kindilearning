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
    featuredImage: null,
    gallery: [],
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

  // Handle file uploads (media fields)
  const handleFileUpload = (fieldName, file) => {
    setProductData((prevData) => ({ ...prevData, [fieldName]: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            Name: productData.name,
            Description: productData.description,
            LongDescription: productData.longDescription,
            Price: productData.price,
            DiscountPrice: productData.discountPrice,
            FeaturedImage: productData.featuredImage,
            Gallery: productData.gallery,
            MetaDescription: productData.metaDescription,
            SEOKeywords: productData.seoKeywords,
            Variants: JSON.parse(productData.variants),
            inStock: productData.inStock,
            Keywords: productData.keywords,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to create product");

      // Clear the form after successful submission
      setProductData({
        name: "",
        description: "",
        longDescription: "",
        price: "",
        discountPrice: "",
        featuredImage: null,
        gallery: [],
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
    <section className="p-8 min-h-screen font-fredoka bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-2xl mb-6">Create New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Name</label>
            <Input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <Input
              type="text"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Long Description</label>
            <Textarea
              name="longDescription"
              value={productData.longDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Price</label>
            <Input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Discount Price</label>
            <Input
              type="number"
              name="discountPrice"
              value={productData.discountPrice}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Featured Image</label>
            {/* <FileInput
              name="featuredImage"
              onChange={(file) => handleFileUpload("featuredImage", file)}
              required
            /> */}
          </div>

          <div>
            <label>Gallery</label>
            {/* <FileInput
              name="gallery"
              onChange={(file) => handleFileUpload("gallery", file)}
              multiple 
            />*/}
          </div>

          <div>
            <label>Meta Description</label>
            <Input
              type="text"
              name="metaDescription"
              value={productData.metaDescription}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>SEO Keywords</label>
            <Input
              type="text"
              name="seoKeywords"
              value={productData.seoKeywords}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Variants (JSON)</label>
            <Textarea
              name="variants"
              value={productData.variants}
              onChange={handleInputChange}
              placeholder='{"color": "red", "size": "M"}'
            />
          </div>

          <div>
            <label>In Stock</label>
            <input
              type="checkbox"
              name="inStock"
              checked={productData.inStock}
              onChange={() =>
                setProductData((prevData) => ({
                  ...prevData,
                  inStock: !prevData.inStock,
                }))
              }
            />
          </div>

          <div>
            <label>Keywords (Rich Text)</label>
            <Textarea
              name="keywords"
              value={productData.keywords}
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit">Create Product</Button>
        </form>
      </div>
    </section>
  );
}
