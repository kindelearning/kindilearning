"use client";
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";
import { useState, useEffect } from "react";
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

function UpdateThemeForm({ documentId }) {
  const [title, setTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [mainContent, setMainContent] = useState("");
  const [launchTime, setLaunchTime] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [existingData, setExistingData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch the existing theme data
  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/our-themes/${documentId}?populate=*`
        );
        const data = await res.json();
        setExistingData(data.data);

        // Set the form fields with existing data
        setTitle(data.data.Title || "");
        setMetaDesc(data.data.metaDesc || "");
        setMainContent(data.data.MainContent || "");
        setLaunchTime(data.data.LaunchTime || "");
      } catch (error) {
        console.error("Error fetching theme data:", error);
      } 
    };
    fetchThemeData();
  }, [documentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data[Title]", title);
    formData.append("data[metaDesc]", metaDesc);
    formData.append("data[MainContent]", mainContent);
    formData.append("data[LaunchTime]", launchTime);

    try {
      const res = await fetch(
        `http://localhost:1337/api/our-themes/${documentId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Updated Theme:", data);
      setOpenDialog(true); // Open the success dialog
    } catch (error) {
      console.error("Error updating theme:", error);
      alert("Error updating theme.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white shadow rounded"
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Theme</h2>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="Title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Meta Description */}
        <div className="mb-4">
          <label htmlFor="metaDesc" className="block font-medium mb-1">
            Meta Description
          </label>
          <textarea
            id="metaDesc"
            name="metaDesc"
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Main Content (Markdown) */}
        <div className="mb-4">
          <label htmlFor="MainContent" className="block font-medium mb-1">
            Main Content
          </label>

          <ClaraMarkdownRichEditor
            onChange={(value) => setMainContent(value)}
            value={mainContent || ""}
          />
        </div>

        {/* Launch Time */}
        <div className="mb-4">
          <label htmlFor="LaunchTime" className="block font-medium mb-1">
            Launch Time
          </label>
          <input
            type="datetime-local"
            id="LaunchTime"
            name="LaunchTime"
            value={
              launchTime ? new Date(launchTime).toISOString().slice(0, 16) : ""
            }
            onChange={(e) => setLaunchTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Thumbnail */}
        {/* <div className="mb-4">
        <label htmlFor="Thumbnail" className="block font-medium mb-1">
          Thumbnail
        </label>
        {thumbnail ? (
          <div>
            <img
              src={`http://localhost:1337${thumbnail.url}`}
              alt="Thumbnail"
              className="w-32 h-32 object-cover mb-2"
            />
            <button
              type="button"
              onClick={() => setThumbnail(null)}
              className="text-red-500"
            >
              Remove Thumbnail
            </button>
          </div>
        ) : (
          <p>No thumbnail selected</p>
        )}
        <input
          type="file"
          id="Thumbnail"
          name="Thumbnail"
          onChange={(e) => setThumbnail(e.target.files[0] || null)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div> */}

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
      {/* Dialog for success message */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>
              Your data has been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button className="btn-close">Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateThemeForm;
