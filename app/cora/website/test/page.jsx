"use client";
import { useState, useEffect } from "react";
import LocalHeader from "./Topbar";
import DeleteContent from "./delete/page";
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
import ClaraMarkdownRichEditor from "../../Sections/TextEditor/ClaraMarkdownRichEditor";
import MediaSelector from "../media/Section/MediaSelector";

export default function ContentList() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/contents?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          setContent(data.data);
        } else {
          setError("Failed to fetch content");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleDelete = (documentId) => {
    console.log("Deleting documentId:", documentId);
    setContent((prevContent) =>
      prevContent.filter((item) => item.documentId !== documentId)
    );
  };

  const handleUpdateClick = (item) => {
    setSelectedContent(item);
    setIsDialogOpen(true);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    // Exclude fields like documentId, createdAt, updatedAt, publishedAt, and id
    const { documentId, createdAt, updatedAt, publishedAt, id, ...updateData } =
      selectedContent;

    try {
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/contents/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: updateData, // Send only the fields that need to be updated
          }),
        }
      );

      const responseData = await response.json();
      console.log("Update Response:", responseData);

      if (response.ok) {
        // Update the local state with updated data
        setContent((prevContent) =>
          prevContent.map((item) =>
            item.documentId === documentId
              ? { ...item, ...responseData.data }
              : item
          )
        );
        setSuccess("Content updated successfully!");
      } else {
        setError(
          `Update failed: ${responseData?.error?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
      console.error("Update Error:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedContent({ ...selectedContent, [name]: value });
  };

  if (loading)
    return (
      <div className="text-center mt-8 text-lg font-medium">Loading...</div>
    );
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="w-full flex flex-col items-center">
      {/* <LocalHeader /> */}

      {/* <UpdateContentForm /> */}
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Content List
      </h1>
      {content.length === 0 ? (
        <p className="text-gray-500 text-lg mt-4">No content available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          {content.map((item) => (
            <div
              key={item.documentId}
              className="border rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col space-y-4 bg-white"
            >
              <h2 className="text-2xl font-bold text-gray-700">{item.Title}</h2>
              {item.Media ? (
                <img src={item.Media.url} className="w-24 h-24" />
              ) : (
                <p className="text-gray-600">No image available</p>
              )}
              <p className="text-gray-600 line-clamp-3">{item.Body}</p>
              <p className="text-sm text-gray-400">
                {new Date(item.Date).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <Dialog>
                  <DialogTrigger>Update</DialogTrigger>
                  <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        <UpdateContentForm documentId={item.documentId} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <DeleteContent
                  documentId={item.documentId}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Dialog */}
      {isDialogOpen && selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Update Content</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Dynamically render fields */}
              {Object.keys(selectedContent).map((field) => {
                if (
                  field !== "documentId" &&
                  field !== "id" &&
                  field !== "createdAt" &&
                  field !== "updatedAt" &&
                  field !== "publishedAt"
                ) {
                  return (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-gray-700 font-medium"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "Date" ? "date" : "text"}
                        id={field}
                        name={field}
                        value={selectedContent[field]}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  );
                }
                return null;
              })}

              <div className="flex justify-between items-center mt-4">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="text-red-600 hover:text-red-700"
                >
                  Cancel
                </button>
              </div>

              {success && (
                <p className="text-green-500 mt-4 text-sm">{success}</p>
              )}
              {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function UpdateContentForm({ documentId }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [media, setMedia] = useState(null); // Use `null` for initial media
  const [openDialog, setOpenDialog] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]); // Initialize as an empty array
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch existing activity data based on documentId
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await fetch(
          `https://proper-fun-404805c7d9.strapiapp.com/api/contents/${documentId}?populate=Media`
        );
        const data = await res.json();

        const content = data.data;
        if (content) {
          setTitle(content.Title || "");
          setBody(content.Body || "");
          setDate(content.Date || "");
          setMedia(content.Media?.id || null); // Set media ID or null if no media
        }
      } catch (err) {
        console.error("Error fetching activity data:", err);
      }
    };

    fetchActivityData();
  }, [documentId]);

  // Fetch media files
  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/upload/files");
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setMediaFiles(data); // Set the media files directly into state
        }
      } catch (error) {
        console.error("Error fetching media files:", error);
      }
    };
    fetchMediaFiles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        Title: title,
        Body: body,
        Date: date,
        Media: media.id  // Only add media if it's selected
      },
    };

    try {
      const res = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/contents/${documentId}?populate=Media`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Updated Content:", data);
      setOpenDialog(true); // Show the success dialog
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Error updating content.");
    }
  };

  const handleMediaSelect = (selectedMedia) => {
    console.log("Selected Media:", selectedMedia); // Log to inspect the structure
    setMedia(selectedMedia); // Store only the media ID
    setIsDialogOpen(false); // Close the dialog after selection
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Title" className="block">
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="Body" className="block">
            Body
          </label>
          <input
            type="text"
            id="Body"
            name="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="Date" className="block">
            Date
          </label>
          <input
            type="date"
            id="Date"
            name="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="Media" className="block">
            Media
          </label>
          <div>
            {media && (
              <div>
                {media.url ? (
                  <>
                    <img
                      // src={media.url} // Access url directly from the media object
                      src={`https://proper-fun-404805c7d9.strapiapp.com${media.url}`} // Access url directly from the media object
                      alt="Selected Media"
                      className="w-32 h-32 object-cover"
                    />
                    <p>{media.name}</p> {/* Use media name if needed */}
                  </>
                ) : (
                  <p>No URL available for the selected media</p>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="px-4 py-2 border rounded"
            >
              Select Media
            </button>
          </div>
        </div>

        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Update Content
        </button>

        {/* Dialog for media selection */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Select Media</DialogTitle>
              <DialogDescription>
                Click on any image below to select it for the content.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4">
              {mediaFiles && mediaFiles.length > 0 ? (
                mediaFiles.map((mediaFile) => (
                  <div
                    key={mediaFile.id}
                    className="cursor-pointer"
                    onClick={() => handleMediaSelect(mediaFile)}
                  >
                    <img
                      // src={mediaFile.url}
                      src={`https://proper-fun-404805c7d9.strapiapp.com${mediaFile.url}`}
                      alt={mediaFile.name}
                      className="w-full h-32 object-cover"
                    />
                    <p className="text-center">{mediaFile.name}</p>
                  </div>
                ))
              ) : (
                <p>No media available</p>
              )}
            </div>
            <DialogClose asChild>
              <button className="px-4 py-2 bg-black text-white rounded mt-4">
                Close
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </form>

      {/* Custom Success Dialog */}
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
