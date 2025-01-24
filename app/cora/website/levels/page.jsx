"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LevelData() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(12); // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/levels?populate=*"
        );
        const data = await response.json();
        if (data?.data) {
          setContent(data.data);
        } else {
          setError("No content found.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-gray-500">Loading content...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!content) return <div>No content available.</div>;

  // Sorting function
  const sortedContent = [...content].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filter content based on search term
  const filteredContent = sortedContent.filter((level) => {
    return (
      level.Tiitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.noOfActivities.toString().includes(searchTerm)
    );
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination Control
  const pageCount = Math.ceil(filteredContent.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle Delete
  const handleDelete = async (documentId) => {
    const updatedContent = filteredContent.filter(
      (level) => level.id !== documentId
    );
    setContent(updatedContent);

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/levels/${documentId}`,
        {
          method: "DELETE",
        }
      );
// Close the dialog after successful deletion
      if (!response.ok) {
        throw new Error("Failed to delete level.");
      }
      // Refresh the page after successful deletion
    window.location.reload();
    } catch (err) {
      setContent(filteredContent); // Restore if failed
      setError("Error deleting level: " + err.message);
    }
  };

  return (
    <section className="w-full font-fredoka min-h-screen h-full md:h-full lg:h-full flex flex-col items-center gap-4 py-8">
       <head>
          <title>Levels - Kindi Learning</title>
        </head>
      <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-xl font-semibold mb-4">Levels</h1>

          <Dialog>
            <DialogTrigger>Create New Level</DialogTrigger>
            <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Create new Level</DialogTitle>
                <DialogDescription>
                  <CreateLevelForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {/* Search Bar */}
        <input
          type="text"
          className="w-full rounded-lg p-2 border border-gray-300"
          placeholder="Search Levels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Table>
          <TableCaption>A list of available levels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("serial")}
                className="cursor-pointer"
              >
                Serial No.
              </TableHead>
              <TableHead
                className="cursor-pointer"
              >
                DocumentId
              </TableHead>
              <TableHead
                onClick={() => handleSort("Tiitle")}
                className="cursor-pointer"
              >
                Title
              </TableHead>
              <TableHead
                onClick={() => handleSort("noOfActivities")}
                className="cursor-pointer"
              >
                Number of Activities
              </TableHead>
              <TableHead
                onClick={() => handleSort("createdAt")}
                className="cursor-pointer"
              >
                Created At
              </TableHead>
              <TableHead
                onClick={() => handleSort("updatedAt")}
                className="cursor-pointer"
              >
                Updated At
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>No levels available</TableCell>
              </TableRow>
            ) : (
              currentItems.map((level, index) => (
                <TableRow key={level.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{level.documentId}</TableCell>
                  <TableCell>{level.Tiitle}</TableCell>
                  <TableCell>{level.noOfActivities}</TableCell>
                  <TableCell>
                    {new Date(level.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(level.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {/* Edit */}
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            variant="primary"
                            className="hover:bg-transparent bg-transparent"
                          >
                            <EditIcon
                              size={20}
                              className="text-[#949494] w-[24px] h-[24px]"
                            />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit {level.Tiitle}</DialogTitle>
                            <DialogDescription>
                              <UpdateLevelData documentId={level.documentId} />
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>

                      {/* Delete */}
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            variant="primary"
                            className="hover:bg-transparent bg-transparent"
                          >
                            <TrashIcon
                              size={20}
                              className="text-[#949494] w-[24px] h-[24px]"
                            />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              onClick={() => handleDelete(level.documentId)}
                              className="text-red bg-white hover:bg-[#ececec] hover:text-red-700 font-medium"
                            >
                              Confirm Delete
                            </Button>
                            <DialogClose>
                              <Button>Cancel</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-4">
          <ul className="flex justify-center space-x-2">
            {Array.from({ length: pageCount }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function UpdateLevelData({ documentId }) {
  const [formData, setFormData] = useState({
    Tiitle: "",
    noOfActivities: "",
  });

  useEffect(() => {
    // Fetch activity data using the documentId
    async function fetchData() {
      const res = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/levels/${documentId}?populate=*`
      );
      const data = await res.json();
      const levels = data.data;
      if (levels) {
        setFormData({
          Tiitle: levels.Tiitle,
          noOfActivities: levels.noOfActivities,
        });
      }
    }

    fetchData();
  }, [documentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedLevels = {
      ...formData,
    };

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/levels/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: updatedLevels }),
        }
      );

      if (response.ok) {
        alert("Levels updated successfully!");
      } else {
        throw new Error("Failed to update the activity.");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Tiitle" className="block">
            Tiitle
          </label>
          <input
            type="text"
            id="Tiitle"
            name="Tiitle"
            value={formData.Tiitle}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="Name" className="block">
            No of Activities
          </label>
          <input
            type="number"
            id="noOfActivities"
            name="noOfActivities"
            value={formData.noOfActivities}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-red text-white rounded">
          Update Level
        </button>
      </form>
    </div>
  );
}

export function CreateLevelForm() {
  const [formData, setFormData] = useState({
    Title: "",
    noOfActivities: 0, // Initialize as a number
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert noOfActivities to a number if it's a number field
    if (name === "noOfActivities") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) })); // Ensure it's a number
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLevel = {
      Tiitle: formData.Title, // Fix key to match the API response
      noOfActivities: formData.noOfActivities, // Ensure it's a number
    };

    // Log the data before sending it
    console.log("Data to be sent:", { data: newLevel });

    try {
      const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/levels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newLevel }), // Ensure the "data" key is included
      });

      // Log the response from the server
      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (response.ok) {
        // alert(`Level created successfully with ID: ${responseData.data.id}`);
        setFormData({ Title: "", noOfActivities: 0 }); // Reset form after submission
      } else {
        console.error("Error creating level:", responseData);
        throw new Error(
          "Failed to create level. Please check the API or request format."
        );
      }
    } catch (error) {
      console.error("Error:", error.message); // Log any error that occurs
      alert(error.message);
    }
    setIsDialogOpen(true); // Open dialog after submit
  };

  return (
    <div className="p-8 font-fredoka">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Title" className="block">
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="noOfActivities" className="block">
            Number of Activities
          </label>
          <input
            type="number"
            id="noOfActivities"
            name="noOfActivities"
            value={formData.noOfActivities}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Create Level
        </button>
      </form>
      {/* Dialog for showing messages */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="hidden">Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage}</DialogTitle>
            <DialogDescription>Level Created Successfully</DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <button className="px-4 py-2 bg-black text-white rounded">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
