"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MediaSelector = ({ onMediaSelect }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch media files from the API
  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/upload/files");
        if (!response.ok) throw new Error("Failed to fetch media files");
        const data = await response.json();
        setMediaFiles(data);
      } catch (error) {
        console.error("Error fetching media files:", error);
      }
    };
    fetchMediaFiles();
  }, []);

  // Handle media selection
  const handleMediaSelect = (selectedMedia) => {
    onMediaSelect(selectedMedia); // Pass the selected media back to the parent
    console.log("Selected Media:", selectedMedia); 
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setIsDialogOpen(true)}
      >
        Select Media
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4">
            <h2 className="text-lg font-bold mb-4">Select Media</h2>
            <div className="grid grid-cols-3 gap-4">
              {mediaFiles.map((mediaFile) => (
                <div
                  key={mediaFile.id}
                  className="cursor-pointer border hover:border-blue-500"
                  onClick={() => handleMediaSelect(mediaFile)}
                >
                  <img
                    src={`https://proper-fun-404805c7d9.strapiapp.com${mediaFile.url}`}
                    alt={mediaFile.name}
                    className="w-full h-32 object-cover"
                  />
                  <p className="text-center text-sm">{mediaFile.name}</p>
                </div>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSelector;
