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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Link } from "lucide-react";

export default function MediaPage() {
  const [mediaAssets, setMediaAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, video, image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog state
  const itemsPerPage = 20;

  // Fetch media assets from Strapi
  useEffect(() => {
    const fetchMediaAssets = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/upload/files");
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

    // Filter by type
    if (filterType === "video") {
      updatedAssets = updatedAssets.filter(
        (asset) => asset.mime === "video/mp4"
      );
    } else if (filterType === "image") {
      updatedAssets = updatedAssets.filter((asset) =>
        asset.mime.startsWith("image/")
      );
    }

    // Search by name
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
        setIsDialogOpen(true); // Open custom dialog on success
        setTimeout(() => setIsDialogOpen(false), 500); // Auto-close dialog after 2 seconds
      },
      () => {
        alert("Failed to copy URL.");
      }
    );
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

      {/* Media Table */}
      <Table>
        <TableCaption>A list of all uploaded media assets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Preview</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size (KB)</TableHead>
            <TableHead>Uploaded At</TableHead>
            <TableHead>Copy URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAssets.length > 0 ? (
            paginatedAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>
                  {asset.mime === "video/mp4" ? (
                    <video
                      controls
                      className="w-24 rounded-[8px] bg-[#a0a0a0] h-16 object-cover"
                      src={`http://localhost:1337${asset.url}`}
                    />
                  ) : (
                    <img
                      src={`http://localhost:1337${asset.url}`}
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
                  <button
                    onClick={() =>
                      copyToClipboard(`http://localhost:1337${asset.url}`)
                    }
                    className="text-[#515151] hover:underline"
                  >
                    <Link />
                  </button>
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

      {/* Custom Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Copied!</DialogTitle>
            <DialogDescription>
              The media URL has been successfully copied to your clipboard.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
