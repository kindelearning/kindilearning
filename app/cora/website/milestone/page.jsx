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
import MediaSelector from "../media/Section/MediaSelector";
import ClaraMarkdownRichEditor from "../../Sections/TextEditor/ClaraMarkdownRichEditor";

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
          `https://upbeat-life-04fe8098b1.strapiapp.com/api/milestones?populate=*&_limit=${itemsPerPage}&_start=${
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
        `https://upbeat-life-04fe8098b1.strapiapp.com/api/milestones/${milestoneToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Update the milestones list to remove the deleted milestone
        setMilestones(
          milestones.filter(
            (milestone) => milestone.documentId !== milestoneToDelete
          )
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
      <head>
        <title>Manage Milestone</title>
      </head>
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
                        src={milestone.Thumbnail.url}
                        // src={`https://upbeat-life-04fe8098b1.strapiapp.com${milestone.Thumbnail.url}`}
                        alt={milestone.Title}
                      />
                    )}
                  </TableCell>
                  <TableCell>{milestone.Title}</TableCell>
                  <TableCell>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: milestone.Description.slice(0, 52),
                      }}
                    />
                    ...
                  </TableCell>
                  <TableCell>{milestone.Category}</TableCell>
                  <TableCell>{milestone.SubCategory}</TableCell>
                  <TableCell>
                    {new Date(milestone.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(milestone.updatedAt).toLocaleString()}
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

// export function UpdateMilestoneData2({ documentId }) {
//   const [formData, setFormData] = useState({
//     Description: "",
//     Title: "",
//     SubCategory: "",
//     Category: "",
//   });
//   useEffect(() => {
//     // Fetch activity data using the documentId
//     async function fetchData() {
//       const res = await fetch(
//         `https://upbeat-life-04fe8098b1.strapiapp.com/api/milestones/${documentId}?populate=*`
//       );
//       const data = await res.json();
//       const milestone = data.data;
//       if (milestone) {
//         setFormData({
//           Title: milestone.Title,
//           Description: milestone.Description,
//           SubCategory: milestone.SubCategory,
//           Category: milestone.Category,
//         });
//       }
//     }

//     fetchData();
//   }, [documentId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedMilestone = {
//       ...formData,
//     };

//     try {
//       const response = await fetch(
//         `https://upbeat-life-04fe8098b1.strapiapp.com/api/milestones/${documentId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ data: updatedMilestone }),
//         }
//       );

//       if (response.ok) {
//         alert("Milestone updated successfully!");
//       } else {
//         throw new Error("Failed to update the activity.");
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };
//   return (
//     <div className="p-8">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="Title" className="block">
//             Title
//           </label>
//           <input
//             type="text"
//             id="Title"
//             name="Title"
//             value={formData.Title}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <label htmlFor="Name" className="block">
//             SubCategory
//           </label>
//           <input
//             type="text"
//             id="SubCategory"
//             name="SubCategory"
//             value={formData.SubCategory}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <label htmlFor="Name" className="block">
//             Category
//           </label>
//           <input
//             type="text"
//             id="Category"
//             name="Category"
//             value={formData.Category}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label htmlFor="Description" className="block">
//             Description
//           </label>
//           <input
//             type="text"
//             id="Description"
//             name="Description"
//             value={formData.Description}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <button type="submit" className="px-4 py-2 bg-red text-white rounded">
//           Update Milestone
//         </button>
//       </form>
//     </div>
//   );
// }

export function UpdateMilestoneData({ documentId }) {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data for the "How It Works" section
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await fetch(
          `https://upbeat-life-04fe8098b1.strapiapp.com/api/milestones/${documentId}?populate=*`
        );
        const data = await res.json();

        const content = data.data;
        if (content) {
          setTitle(content.Title || ""); // Set default values if not found
          setCategory(content.Category || ""); // Set default values if not found
          setSubCategory(content.SubCategory || ""); // Set default values if not found
          setDescription(content.Description || "");
          // setMedia(content?.Thumbnail?.id || null); // Set the media ID or null if no media is selected
        }
        console.log("Fetched MileStone Content", content);
      } catch (err) {
        console.error("Error fetching content data:", err);
        setError("Error fetching content");
      }
    };

    fetchContentData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        SubCategory: subCategory,
        Title: title,
        Category: category,
        Description: description,
        // Thumbnail: media?.id || null, // Use media ID if selected
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(
        `https://upbeat-life-04fe8098b1.strapiapp.com/api/milestones/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Updated milestones Content:", data);
      setOpenDialog(true); // Show success dialog
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Error updating content.");
    }
  };

  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia); // Store the selected media object
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit How It Works Section</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Name" className="block">
            Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="subCategory" className="block">
            subCategory
          </label>
          <input
            type="text"
            id="subCategory"
            name="subCategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="Description" className="block">
            Description
          </label>
          <ClaraMarkdownRichEditor
            value={description}
            onChange={(newContent) => setDescription(newContent)}
          />
        </div>

        {/* <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <img
                src={media.url}
                // src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
                className="w-32 h-32 object-cover"
              />
              <p>{media.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleMediaSelect} />
        </div> */}

        <button type="submit" className="px-4 py-2 bg-red text-white rounded">
          Update milestones
        </button>
      </form>

      {/* Success Dialog */}
      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Your content has been successfully updated.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// export function CreateMilestoneForm2() {
//   const [formData, setFormData] = useState({
//     Title: "",
//     Description: "",
//     Category: "",
//     SubCategory: "",
//   });
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [dialogType, setDialogType] = useState("success"); // To distinguish between success/error messages

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newMilestone = {
//       Title: formData.Title,
//       Description: formData.Description,
//       Category: formData.Category,
//       SubCategory: formData.SubCategory,
//     };

//     try {
//       const response = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/milestones", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: newMilestone }),
//       });

//       const responseData = await response.json();

//       if (response.ok) {
//         setDialogMessage("Milestone created successfully!");
//         setDialogType("success");
//         setFormData({
//           Title: "",
//           Description: "",
//           Category: "",
//           SubCategory: "",
//         }); // Reset form after submission
//       } else {
//         setDialogMessage(
//           "Failed to create milestone. Please check the input and try again."
//         );
//         setDialogType("error");
//         throw new Error("Failed to create milestone");
//       }
//     } catch (error) {
//       console.error("Error:", error.message); // Log any error that occurs
//       setDialogMessage(error.message);
//       setDialogType("error");
//     }

//     setIsDialogOpen(true); // Open dialog after submit
//   };

//   return (
//     <div className="p-8 font-fredoka">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="Title" className="block">
//             Title
//           </label>
//           <input
//             type="text"
//             id="Title"
//             name="Title"
//             value={formData.Title}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="Description" className="block">
//             Description
//           </label>
//           <textarea
//             id="Description"
//             name="Description"
//             value={formData.Description}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="Category" className="block">
//             Category
//           </label>
//           <input
//             type="text"
//             id="Category"
//             name="Category"
//             value={formData.Category}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="SubCategory" className="block">
//             SubCategory
//           </label>
//           <input
//             type="text"
//             id="SubCategory"
//             name="SubCategory"
//             value={formData.SubCategory}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//             required
//           />
//         </div>

//         <button type="submit" className="px-4 py-2 bg-black text-white rounded">
//           Create Milestone
//         </button>
//       </form>

//       {/* Dialog for showing success/error messages */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogTrigger asChild>
//           <button className="hidden">Open Dialog</button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{dialogMessage}</DialogTitle>
//             <DialogDescription>
//               {dialogType === "success"
//                 ? "Milestone Created Successfully"
//                 : "Something went wrong"}
//             </DialogDescription>
//           </DialogHeader>
//           <DialogClose asChild>
//             <button className="px-4 py-2 bg-black text-white rounded">
//               Close
//             </button>
//           </DialogClose>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

export function CreateMilestoneForm() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // To distinguish between success/error messages
  const [relatedUsers, setRelatedUsers] = useState([]); // State for storing selected user IDs

  const [userList, setUserList] = useState([]); // State for storing fetched users

  useEffect(() => {
    // Fetching users from the provided endpoint
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/users?populate=*"
        );
        const data = await response.json();
        setUserList(data); // Save the list of users
        // Set the default value for relatedUsers to include all user IDs
        const allUserIds = data.map((user) => user.id);
        setRelatedUsers(allUserIds);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMilestone = {
      Title: title,
      Category: category,
      SubCategory: subCategory,
      Description: description,
      // Thumbnail: media?.id || null, // Use media ID if selected
      users: relatedUsers.map((id) => ({ id })),
    };

    console.log("New milestones data", newMilestone);
    try {
      const response = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/milestones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newMilestone }),
      });

      if (response.ok) {
        setDialogMessage("milestones created successfully!");
        setDialogType("success");

        setTitle("");
        setCategory("");
        setSubCategory("");
        setDescription("");
      } else {
        setDialogMessage(
          "Failed to create Milestone. Please check the input and try again."
        );
        setDialogType("error");
        throw new Error("Failed to create milestones");
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
        {/* <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <img
                src={media.url}
                // src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
                className="w-32 h-32 object-cover"
              />
              <p>{media.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleMediaSelect} />
        </div> */}
        <div>
          <label htmlFor="title" className="block">
            title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block">
            category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="subCategory" className="block">
            subCategory
          </label>
          <input
            type="text"
            id="subCategory"
            name="subCategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="Description" className="block">
            Description
          </label>
          <ClaraMarkdownRichEditor
            value={description}
            onChange={(newContent) => setDescription(newContent)}
            placeholder="Enter a description"
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
                ? "milestones Created Successfully"
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
