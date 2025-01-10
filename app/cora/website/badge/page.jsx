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
import { EditIcon, Pencil, Trash, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClaraMarkdownRichEditor from "../../Sections/TextEditor/ClaraMarkdownRichEditor";
import MediaSelector from "../media/Section/MediaSelector";

export default function BadgesTable() {
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [deleteBadgeId, setDeleteBadgeId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const badgesPerPage = 12; // Number of badges per page

  // Fetch data
  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/badges?populate=*"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBadges(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchBadges();
  }, []);

  // Handle Delete
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/badges/${deleteBadgeId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setBadges((prevBadges) =>
          prevBadges.filter((badge) => badge.id !== deleteBadgeId)
        );
        setIsDialogOpen(false);
      } else {
        throw new Error("Failed to delete the badge.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Search
  const filteredBadges = badges.filter((badge) =>
    badge.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Sorting
  const sortedBadges = [...filteredBadges].sort((a, b) => {
    const nameA = a.Name.toLowerCase();
    const nameB = b.Name.toLowerCase();
    return sortOrder === "asc"
      ? nameA < nameB
        ? -1
        : nameA > nameB
        ? 1
        : 0
      : nameA > nameB
      ? -1
      : nameA < nameB
      ? 1
      : 0;
  });

  // Pagination: Get current badges to display
  const indexOfLastBadge = currentPage * badgesPerPage;
  const indexOfFirstBadge = indexOfLastBadge - badgesPerPage;
  const currentBadges = sortedBadges.slice(indexOfFirstBadge, indexOfLastBadge);

  // Pagination Controls
  const totalPages = Math.ceil(sortedBadges.length / badgesPerPage);

  // Loading or Error
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="font-fredoka min-h-screen h-full md:h-full lg:h-full flex flex-col items-center bg- [#ffffff] w-full gap-4 py-8">
      <head>
        <title>Badge Management - Kindi | Cora</title>
      </head>
      <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-xl font-semibold mb-4">Badge</h1>
          <Dialog>
            <DialogTrigger>Create New Badge</DialogTrigger>
            <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Create new Badge</DialogTitle>
                <DialogDescription>
                  <CreateBadgeForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {/* Search and Sorting */}
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/3"
          />
        </div>

        {/* Table */}
        <Table>
          <TableCaption>A list of all badges.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>DocumentId</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[400px]">Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBadges.map((badge, index) => (
              <TableRow key={badge.id}>
                <TableCell>
                  {index + 1 + (currentPage - 1) * badgesPerPage}
                </TableCell>
                <TableCell>{badge.documentId}</TableCell>
                <TableCell>
                  {badge.Thumbnail?.url ? (
                    <img
                      src={badge.Thumbnail.url}
                      // src={`https://proper-fun-404805c7d9.strapiapp.com${badge.Thumbnail.url}`}
                      alt={badge.Thumbnail?.alternativeText || badge.Name}
                      className="w-10 h-10 rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 flex items-center justify-center text-gray-500">
                      N/A
                    </div>
                  )}
                </TableCell>
                <TableCell>{badge.Name}</TableCell>
                <TableCell className="min-w-[500px] whitespace-pre-wrap prose">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: badge.Description.slice(0, 100),
                    }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(badge.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(badge.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex gap-1">
                  {/* Update */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="primary"
                        className="text-[#6d6d6d] hover:text-[#000000]"
                      >
                        <Pencil size={20} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>Update {badge.Name}</DialogTitle>
                        <DialogDescription>
                          <UpdateBadgesTable documentId={badge.documentId} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  {/* Delete */}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setDeleteBadgeId(badge.documentId);
                          setIsDialogOpen(true);
                        }}
                        className="text-[#6d6d6d] hover:text-[#000000]"
                      >
                        <TrashIcon size={20} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete this badge.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="secondary"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          Yes, delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

// export function UpdateBadgesTable2({ documentId }) {
//   const [formData, setFormData] = useState({
//     Description: "",
//     Name: "",
//   });
//   useEffect(() => {
//     // Fetch activity data using the documentId
//     async function fetchData() {
//       const res = await fetch(
//         `https://proper-fun-404805c7d9.strapiapp.com/api/badges/${documentId}?populate=*`
//       );
//       const data = await res.json();
//       const badge = data.data;
//       if (badge) {
//         setFormData({
//           Name: badge.Name,
//           Description: badge.Description,
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

//     const updatedBadge = {
//       ...formData,
//     };

//     try {
//       const response = await fetch(
//         `https://proper-fun-404805c7d9.strapiapp.com/api/badges/${documentId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ data: updatedBadge }),
//         }
//       );

//       if (response.ok) {
//         alert("badges updated successfully!");
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
//           <label htmlFor="Name" className="block">
//             Name
//           </label>
//           <input
//             type="text"
//             id="Name"
//             name="Name"
//             value={formData.Name}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label htmlFor="Description" className="block">
//             Description
//           </label>

//           <ClaraMarkdownRichEditor
//             onChange={(newContent) =>
//               handleInputChange({
//                 target: { name: "Description", value: newContent },
//               })
//             }
//             value={formData.Description}
//           />
//         </div>

//         <button type="submit" className="px-4 py-2 bg-red text-white rounded">
//           Update Badge
//         </button>
//       </form>
//     </div>
//   );
// }

export function UpdateBadgesTable({ documentId }) {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data for the "How It Works" section
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await fetch(
          `https://proper-fun-404805c7d9.strapiapp.com/api/badges/${documentId}?populate=*`
        );
        const data = await res.json();

        const content = data.data;
        if (content) {
          setName(content.Name || ""); // Set default values if not found
          setDescription(content.Description || "");
          setMedia(content?.Thumbnail?.id || null); // Set the media ID or null if no media is selected
        }
        console.log("Fetched OurStory Content", content);
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
        Name: name,
        Description: description,
        Thumbnail: media?.id || null, // Use media ID if selected
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/badges/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Updated Badge Content:", data);
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
    <div className="p-8 font-fredoka">
      <h1 className="text-2xl font-bold mb-6">Edit Badge Data</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Name" className="block">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <img
                src={media.url}
                // src={`https://proper-fun-404805c7d9.strapiapp.com${media.url}`}
                className="w-32 h-32 object-cover"
              />
              <p>{media.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleMediaSelect} />
        </div>

        <button type="submit" className="px-4 py-2 bg-red text-white rounded">
          Update Badge
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

// export function CreateBadgeForm2() {
//   const [formData, setFormData] = useState({
//     Name: "",
//     Description: "",
//   });
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [dialogType, setDialogType] = useState("success"); // To distinguish between success/error messages

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle description change for the ClaraMarkdownRichEditor
//   const handleDescriptionChange = (newValue) => {
//     setFormData((prev) => ({ ...prev, Description: newValue }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newBadge = {
//       Name: formData.Name,
//       Description: formData.Description,
//     };

//     try {
//       const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/badges", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: newBadge }),
//       });

//       const responseData = await response.json();

//       if (response.ok) {
//         setDialogMessage("Badge created successfully!");
//         setDialogType("success");
//         setFormData({ Name: "", Description: "" }); // Reset form after submission
//       } else {
//         setDialogMessage(
//           "Failed to create badge. Please check the input and try again."
//         );
//         setDialogType("error");
//         throw new Error("Failed to create badge");
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
//           <label htmlFor="Name" className="block">
//             Name
//           </label>
//           <input
//             type="text"
//             id="Name"
//             name="Name"
//             value={formData.Name}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="Description" className="block">
//             Description
//           </label>
//           <ClaraMarkdownRichEditor
//             value={formData.Description}
//             onChange={handleDescriptionChange}
//             placeholder="Enter a description"
//           />
//         </div>

//         <button type="submit" className="px-4 py-2 bg-black text-white rounded">
//           Create Badge
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
//                 ? "Badge Created Successfully"
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

export function CreateBadgeForm() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // To distinguish between success/error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBadge = {
      Name: name,
      Description: description,
      Thumbnail: media?.id || null, // Use media ID if selected
    };

    console.log("New Badge data", newBadge);
    try {
      const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/badges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newBadge }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setDialogMessage("Badge created successfully!");
        setDialogType("success");

        setName("");
        setDescription("");
        setMedia(null);
      } else {
        setDialogMessage(
          "Failed to create badge. Please check the input and try again."
        );
        setDialogType("error");
        throw new Error("Failed to create badge");
      }
    } catch (error) {
      console.error("Error:", error.message); // Log any error that occurs
      setDialogMessage(error.message);
      setDialogType("error");
    }

    setIsDialogOpen(true); // Open dialog after submit
  };
  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia); // Store the selected media object
  };
  return (
    <div className="p-8 font-fredoka">
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label>Select Media First:</label>
          {media ? (
            <div className="mt-4">
              <img
                src={media.url}
                // src={`https://proper-fun-404805c7d9.strapiapp.com${media.url}`}
                className="w-32 h-32 object-cover"
              />
              <p>{media.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleMediaSelect} />
        </div>
        <div>
          <label htmlFor="Name" className="block">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          Create Badge
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
                ? "Badge Created Successfully"
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
