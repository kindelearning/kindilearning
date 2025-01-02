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

export default function MediaSelector({ onMediaSelect }) {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Number of media cards per page
  const [selectedMediaId, setSelectedMediaId] = useState(null); // Track the selected media ID

  // Fetch media files from the API
  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/upload/files");
        if (!response.ok) throw new Error("Failed to fetch media files");
        const data = await response.json();
        setMediaFiles(data);
        setFilteredMedia(data); // Set initial filtered data
      } catch (error) {
        console.error("Error fetching media files:", error);
      }
    };
    fetchMediaFiles();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let filtered = mediaFiles;

    if (filterType !== "all") {
      filtered = filtered.filter((file) =>
        filterType === "images"
          ? file.mime.startsWith("image/")
          : file.mime.startsWith("video/")
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMedia(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, filterType, mediaFiles]);

  // Paginated data
  const paginatedMedia = filteredMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle media selection
  //   const handleMediaSelect = (selectedMedia) => {
  //     onMediaSelect(selectedMedia); // Pass the selected media back to the parent
  //   };

  const handleMediaSelect = (selectedMedia) => {
    setSelectedMediaId(selectedMedia.id); // Highlight the selected image
    onMediaSelect(selectedMedia); // Pass the selected media back to the parent
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Select Media
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[1000px] max-h-[400px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Select Media</DialogTitle>
            <DialogDescription>
              <div className="mb-4 flex justify-between items-center">
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="border px-3 py-1 rounded w-1/3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Filter Options */}
                <select
                  className="border px-3 py-1 rounded"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="images">Images</option>
                  <option value="videos">Videos</option>
                </select>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-3 gap-4">
                {paginatedMedia.map((mediaFile, index) => (
                  <div
                    key={mediaFile.id}
                    className={`cursor-pointer border rounded shadow-sm p-2 relative ${
                      selectedMediaId === mediaFile.id
                        ? "border-blue-500 shadow-lg transform scale-105"
                        : "hover:border-gray-400"
                    }`}
                    onClick={() => handleMediaSelect(mediaFile)}
                  >
                    {mediaFile.url.endsWith(".mp4") ? (
                      <video
                        controls
                        className={`w-full h-32 object-cover rounded transition ${
                          selectedMediaId === mediaFile.id ? "opacity-90" : ""
                        }`}
                        src={`https://proper-fun-404805c7d9.strapiapp.com${mediaFile.url}`}
                      />
                    ) : (
                      <img
                        src={`https://proper-fun-404805c7d9.strapiapp.com${mediaFile.url}`}
                        alt={mediaFile.name}
                        className={`w-full h-32 object-cover rounded transition ${
                          selectedMediaId === mediaFile.id ? "opacity-90" : ""
                        }`}
                      />
                    )}
                    {/* Checkmark Icon for Selected */}
                    {selectedMediaId === mediaFile.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                        ✓
                      </div>
                    )}
                    <div className="mt-2">
                      <p className="text-sm font-semibold">{mediaFile.name}</p>
                      <p className="text-xs text-gray-500">
                        Type: {mediaFile.mime}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {(mediaFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-4">
                <button
                  className="px-3 py-1 border rounded-l bg-gray-200 hover:bg-gray-300"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="px-4 py-1 border-t border-b">
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredMedia.length / itemsPerPage)}
                </span>
                <button
                  className="px-3 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(filteredMedia.length / itemsPerPage)
                      )
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.ceil(filteredMedia.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

// export default function MediaSelector({ onMediaSelect }) {
//   const [mediaFiles, setMediaFiles] = useState([]);

//   // Fetch media files from the API
//   useEffect(() => {
//     const fetchMediaFiles = async () => {
//       try {
//         const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/upload/files");
//         if (!response.ok) throw new Error("Failed to fetch media files");
//         const data = await response.json();
//         setMediaFiles(data);
//       } catch (error) {
//         console.error("Error fetching media files:", error);
//       }
//     };
//     fetchMediaFiles();
//   }, []);

//   // Handle media selection
//   const handleMediaSelect = (selectedMedia) => {
//     onMediaSelect(selectedMedia); // Pass the selected media back to the parent
//     console.log("Selected Media:", selectedMedia);
//   };

//   return (
//     <>
//       <Dialog>
//         <DialogTrigger>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded">
//             Select Media
//           </button>
//         </DialogTrigger>
//         <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
//           <DialogHeader>
//             <DialogTitle>Are you absolutely sure?</DialogTitle>
//             <DialogDescription>
//               <div className="grid grid-cols-3 gap-4">
//                 {mediaFiles.map((mediaFile) => (
//                   <div
//                     key={mediaFile.id}
//                     className="cursor-pointer border hover:border-blue-500"
//                     onClick={() => handleMediaSelect(mediaFile)}
//                   >
//                     <img
//                       src={`https://proper-fun-404805c7d9.strapiapp.com${mediaFile.url}`}
//                       alt={mediaFile.name}
//                       className="w-full h-32 object-cover"
//                     />
//                     <p className="text-center text-sm">{mediaFile.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
