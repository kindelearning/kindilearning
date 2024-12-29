"use client";

import { useEffect, useState } from "react";
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
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MilestoneData() {
  const [milestones, setMilestones] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("Title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [milestoneToDelete, setMilestoneToDelete] = useState(null);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/milestones?populate=*&_limit=${itemsPerPage}&_start=${
            (currentPage - 1) * itemsPerPage
          }`
        );
        const data = await response.json();

        setMilestones(data.data);
        setTotalPages(Math.ceil(data.meta.pagination.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchMilestones();
  }, [currentPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedMilestones = milestones
    .filter((milestone) =>
      milestone.Title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortColumn === "Title") {
        return sortOrder === "asc"
          ? a.Title.localeCompare(b.Title)
          : b.Title.localeCompare(a.Title);
      }
      if (sortColumn === "Category") {
        return sortOrder === "asc"
          ? a.Category.localeCompare(b.Category)
          : b.Category.localeCompare(a.Category);
      }
      if (sortColumn === "Created At") {
        return sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortColumn === "Updated At") {
        return sortOrder === "asc"
          ? new Date(a.updatedAt) - new Date(b.updatedAt)
          : new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return 0;
    });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const truncateDescription = (description, length = 50) => {
    if (!description) return "";
    return description.length > length
      ? description.substring(0, length) + "..."
      : description;
  };

  // Open confirmation dialog
  const handleDeleteClick = (id) => {
    setMilestoneToDelete(id);
    setIsDialogOpen(true);
  };

  // Function to handle the deletion of a milestone
  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/milestones/${milestoneToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Update the milestones list to remove the deleted milestone
        setMilestones(
          milestones.filter((milestone) => milestone.id !== milestoneToDelete)
        );
        setIsDialogOpen(false); // Close dialog
      } else {
        console.error("Failed to delete milestone");
      }
    } catch (error) {
      console.error("Error deleting milestone:", error);
    }
  };

  return (
    <section className="w-full min-h-screen h-full md:h-full lg:h-full flex flex-col items-center gap-4 py-8">
      <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-xl font-semibold mb-4">Milestone</h1>

          <Dialog>
            <DialogTrigger>Create New Milestone</DialogTrigger>
            <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Create new Milestone</DialogTitle>
                <DialogDescription>
                  <CreateMilestoneForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Milestones"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 mb-4 border rounded w-full"
        />

        {/* Table */}
        <div className="overflow-x-scroll max-w-[1200px] ">
          <Table className="overflow-x-scroll">
            <TableCaption>A list of your recent milestones.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[100px] cursor-pointer"
                  onClick={() => handleSort("Serial Number")}
                >
                  Sr No
                  {sortColumn === "Serial Number" &&
                    (sortOrder === "asc" ? " ↑" : " ↓")}
                </TableHead>
                <TableHead className="w-[100px]">Thumbnail</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("Title")}
                >
                  Title
                  {sortColumn === "Title" &&
                    (sortOrder === "asc" ? " ↑" : " ↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("Description")}
                >
                  Description
                  {sortColumn === "Description" &&
                    (sortOrder === "asc" ? " ↑" : " ↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("Category")}
                >
                  Category
                  {sortColumn === "Category" &&
                    (sortOrder === "asc" ? " ↑" : " ↓")}
                </TableHead>
                <TableHead>SubCategory</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("Created At")}
                >
                  Created At
                  {sortColumn === "Created At" &&
                    (sortOrder === "asc" ? " ↑" : " ↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("Updated At")}
                >
                  Updated At
                  {sortColumn === "Updated At" &&
                    (sortOrder === "asc" ? " ↑" : " ↓")}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMilestones.map((milestone, index) => (
                <TableRow key={milestone.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="w-[60px] h-[60px]">
                    {milestone.Thumbnail && (
                      <img
                        src={`http://localhost:1337${milestone.Thumbnail.url}`}
                        alt={milestone.Title}
                      />
                    )}
                  </TableCell>
                  <TableCell>{milestone.Title}</TableCell>
                  <TableCell>{milestone.Description}</TableCell>
                  <TableCell>{milestone.Category}</TableCell>
                  <TableCell>{milestone.SubCategory}</TableCell>
                  <TableCell>
                    {truncateDescription(milestone.Description)}
                  </TableCell>
                  <TableCell>
                    {new Date(milestone.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(milestone.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {/* Update */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="primary"
                          className="hover:bg-transparent bg-transparent"
                        >
                          <Pencil
                            size={20}
                            className="text-[#949494] w-[24px] h-[24px]"
                          />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
                        <DialogHeader>
                          <DialogTitle>Update {milestone.Name}</DialogTitle>
                          <DialogDescription>
                            <UpdateMilestoneData
                              documentId={milestone.documentId}
                            />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    {/* Delete */}
                    <Button
                      className="hover:bg-transparent bg-transparent "
                      onClick={() => handleDeleteClick(milestone.documentId)}
                    >
                      <Trash className="text-[#949494] w-[24px] h-[24px]" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="hidden">Open</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                milestone and remove its data from the system.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-red rounded-md"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

export function UpdateMilestoneData({ documentId }) {
  const [formData, setFormData] = useState({
    Description: "",
    Title: "",
    SubCategory: "",
    Category: "",
  });
  useEffect(() => {
    // Fetch activity data using the documentId
    async function fetchData() {
      const res = await fetch(
        `http://localhost:1337/api/milestones/${documentId}?populate=*`
      );
      const data = await res.json();
      const milestone = data.data;
      if (milestone) {
        setFormData({
          Title: milestone.Title,
          Description: milestone.Description,
          SubCategory: milestone.SubCategory,
          Category: milestone.Category,
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

    const updatedMilestone = {
      ...formData,
    };

    try {
      const response = await fetch(
        `http://localhost:1337/api/milestones/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: updatedMilestone }),
        }
      );

      if (response.ok) {
        alert("Milestone updated successfully!");
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
          />
        </div>
        <div>
          <label htmlFor="Name" className="block">
            SubCategory
          </label>
          <input
            type="text"
            id="SubCategory"
            name="SubCategory"
            value={formData.SubCategory}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="Name" className="block">
            Category
          </label>
          <input
            type="text"
            id="Category"
            name="Category"
            value={formData.Category}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="Description" className="block">
            Description
          </label>
          <input
            type="text"
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-red text-white rounded">
          Update Milestone
        </button>
      </form>
    </div>
  );
}
export function CreateMilestoneForm() {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Category: "",
    SubCategory: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // To distinguish between success/error messages

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMilestone = {
      Title: formData.Title,
      Description: formData.Description,
      Category: formData.Category,
      SubCategory: formData.SubCategory,
    };

    try {
      const response = await fetch("http://localhost:1337/api/milestones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newMilestone }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setDialogMessage("Milestone created successfully!");
        setDialogType("success");
        setFormData({
          Title: "",
          Description: "",
          Category: "",
          SubCategory: "",
        }); // Reset form after submission
      } else {
        setDialogMessage(
          "Failed to create milestone. Please check the input and try again."
        );
        setDialogType("error");
        throw new Error("Failed to create milestone");
      }
    } catch (error) {
      console.error("Error:", error.message); // Log any error that occurs
      setDialogMessage(error.message);
      setDialogType("error");
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
          <label htmlFor="Description" className="block">
            Description
          </label>
          <textarea
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="Category" className="block">
            Category
          </label>
          <input
            type="text"
            id="Category"
            name="Category"
            value={formData.Category}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="SubCategory" className="block">
            SubCategory
          </label>
          <input
            type="text"
            id="SubCategory"
            name="SubCategory"
            value={formData.SubCategory}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Create Milestone
        </button>
      </form>

      {/* Dialog for showing success/error messages */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="hidden">Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage}</DialogTitle>
            <DialogDescription>
              {dialogType === "success"
                ? "Milestone Created Successfully"
                : "Something went wrong"}
            </DialogDescription>
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
