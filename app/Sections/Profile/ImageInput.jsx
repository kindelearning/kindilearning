"use client";

import { StockImages } from "@/app/constant/profile";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

export default function ImageInput() {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file change from file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setLoading(false); // Ensure loading is false when selecting a new image

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle stock image selection
  const handleStockImageSelect = (image) => {
    setSelectedImage(image);
    setPreview(image.url);
  };

  // Handle removing selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
  };

  // Handle image update/upload action
  const handleUpdateImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    
    try {
      // Example of uploading to a server or cloud storage
      // Replace this with your actual upload logic
      let formData = new FormData();
      formData.append("image", selectedImage);

      // Simulate an upload request
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

      // Show success message or handle post-upload action
      alert("Image updated successfully!");

    } catch (error) {
      console.error("Error updating image:", error);
      alert("Failed to update image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-col lg:flex-row w-full gap-[16px] lg:gap-8 justify-between items-start">
        <div className="flex flex-col gap-4 p-6 justify-center items-center max-w-[360px] w-full bg-white rounded-[12px] relative">
          {preview ? (
            <div className="relative">
              <Image
                src={preview}
                alt="Profile Image"
                width={128}
                height={128}
                className="w-32 shadow-sm h-32 rounded-full"
              />
              <button
                className="absolute top-0 right-0 bg-red text-white p-1 rounded-full"
                onClick={handleRemoveImage}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <label className="w-32 h-32 rounded-full border-2 border-dashed border-gray-200 flex flex-col justify-center items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="opacity-0 absolute w-full h-full"
              />
              <p className="text-[#0a1932] text-sm font-medium text-center font-fredoka leading-tight">
                Drag and drop or click to upload
              </p>
            </label>
          )}
          {selectedImage ? (
            <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
              You&apos;re looking great!
            </div>
          ) : (
            <>
              <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                Upload Photo
              </div>
              <div className="text-center text-[#757575] text-xs font-normal font-fredoka leading-none">
                OR
              </div>
              <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                Select custom avatar
              </div>
            </>
          )}
        </div>

        <div className="flex w-full flex-col gap-2 justify-between">
          <div className="flex flex-wrap w-full justify-start items-start mt-4">
            {StockImages.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt="Stock Image"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full cursor-pointer m-2"
                onClick={() => handleStockImageSelect(image)}
              />
            ))}
          </div>
          <Button
            className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold font-['Fredoka'] leading-tight w-[200px]"
            type="submit"
            onClick={handleUpdateImage}
            disabled={loading}
          >
            {loading ? "Updating ..." : "Update Image"}
          </Button>
        </div>
      </div>
    </>
  );
}
