"use client";

// app/admin/media/page.js
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Link, PencilIcon, TrashIcon } from "lucide-react";
import UploadMediaPage from "./upload/page";

export default function MediaPage() {
  const [mediaAssets, setMediaAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [documentIdToDelete, setDocumentIdToDelete] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // New state for edit modal
  const [editTitle, setEditTitle] = useState(""); // State to store the edited title
  const [editAltText, setEditAltText] = useState(""); // State to store the edited alt text
  const [documentIdToEdit, setDocumentIdToEdit] = useState(null); // Store the documentId of the asset being edited
  const itemsPerPage = 20;

  // Fetch media assets from Strapi
  useEffect(() => {
    const fetchMediaAssets = async () => {
      try {
        const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/upload/files");
        const result = await response.json();

        if (Array.isArray(result)) {
          setMediaAssets(result);
          setFilteredAssets(result);
        } else {
          setError("Invalid response format: Expected an array");
        }
      } catch (err) {
        setError("Error fetching media assets");
      } finally {
        setLoading(false);
      }
    };

    fetchMediaAssets();
  }, []);

  // Handle search and filter updates
  useEffect(() => {
    let updatedAssets = mediaAssets;

    if (filterType === "video") {
      updatedAssets = updatedAssets.filter(
        (asset) => asset.mime === "video/mp4"
      );
    } else if (filterType === "image") {
      updatedAssets = updatedAssets.filter((asset) =>
        asset.mime.startsWith("image/")
      );
    }

    if (searchQuery) {
      updatedAssets = updatedAssets.filter((asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAssets(updatedAssets);
    setCurrentPage(1); // Reset to page 1 on filter or search
  }, [searchQuery, filterType, mediaAssets]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Copy to clipboard functionality
  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        setIsDialogOpen(true);
        setTimeout(() => setIsDialogOpen(true), 500);
        alert("URL Copied successfully.");

      },
      () => {
        alert("Failed to copy URL.");
      }
    );
  };

  // Delete media asset functionality
  const deleteMediaAsset = async (documentId) => {
    try {
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/upload/files/${documentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Filter out the deleted asset from the media list
        const updatedAssets = mediaAssets.filter(
          (asset) => asset.id !== documentId
        );
        setMediaAssets(updatedAssets);
        setFilteredAssets(updatedAssets);
      } else {
        alert("Failed to delete the asset.");
      }
    } catch (err) {
      alert("Error deleting asset.");
    }
  };

  // Show confirmation dialog
  const handleDeleteClick = (documentId) => {
    setDocumentIdToDelete(documentId);
    setConfirmDelete(true); // Open confirmation dialog
  };

  // Handle confirmation
  const handleConfirmDelete = () => {
    if (documentIdToDelete) {
      deleteMediaAsset(documentIdToDelete);
      setConfirmDelete(false); // Close the confirmation dialog
      setDocumentIdToDelete(null); // Reset the documentId
    }
  };

  // Handle cancellation
  const handleCancelDelete = () => {
    setConfirmDelete(false); // Close the confirmation dialog
    setDocumentIdToDelete(null); // Reset the documentId
  };

  if (loading) {
    return <div>Loading media...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container font-fredoka mx-auto p-4">
      <h1 className="text-3xl text-[#666666] font-semibold mb-4">
        Kindi Media Assets
      </h1>

      <div className="flex w-full justify-between">
        {/* Search and Filter Section */}
        <div className="flex items-center rounded-lg w-fit justify-between bg-white gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-0"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg px-4 py-2 focus:outline-none focus:ring-0"
          >
            <option value="all">All</option>
            <option value="video">Videos</option>
            <option value="image">Images</option>
          </select>
        </div>

        <Dialog>
          <DialogTrigger>
            <div className="text-red hover:text-black px-4 py-2 rounded-md text-[16px] font-medium duration-200 ease-in-out">
              Upload New
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-scroll">
            <DialogHeader>
              <DialogDescription>
                <UploadMediaPage />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Media Table */}
      <Table>
        <TableCaption>A list of all uploaded media assets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>{" "}
            {/* Serial Number Header */}
            <TableHead className="w-[200px]">Preview</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size (KB)</TableHead>
            <TableHead>Uploaded At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAssets.length > 0 ? (
            paginatedAssets.map((asset, index) => (
              <TableRow key={asset.id}>
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>{" "}
                {/* Serial Number */}
                <TableCell>
                  {asset.mime === "video/mp4" ? (
                    <video
                      controls
                      className="w-24 rounded-[8px] bg-[#a0a0a0] h-16 object-cover"
                      src={asset.url}
                      // src={`https://proper-fun-404805c7d9.strapiapp.com${asset.url}`}
                    />
                  ) : (
                    <img
                      src={asset.url}
                      // src={`https://proper-fun-404805c7d9.strapiapp.com${asset.url}`}
                      alt={asset.name}
                      className="w-24 rounded-[8px] bg-[#a0a0a0] h-16 object-cover"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell>{asset.mime}</TableCell>
                <TableCell>{(asset.size * 1024).toFixed(2)} KB</TableCell>
                <TableCell>
                  {new Date(asset.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(asset.url)
                      }
                      className="text-[#515151] hover:underline"
                    >
                      <Link />
                    </button>

                    <button
                      onClick={() => handleDeleteClick(asset.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No media assets found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDelete} onClose={handleCancelDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this media asset? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-4"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 text-red rounded"
            >
              Confirm
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
