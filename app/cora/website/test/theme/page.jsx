"use client";

import { useState, useEffect } from "react";

const CreateThemePage = () => {
  const [title, setTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [mainContent, setMainContent] = useState("");
  const [launchTime, setLaunchTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    description: "",
  }); // Custom dialog message
  const [documentId, setDocumentId] = useState(null); // Store documentId
  const [themeCreated, setThemeCreated] = useState(false); // Track if theme is created

  // Handle file upload for the thumbnail
  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  // Handle main content (Rich text input)
  const handleMainContentChange = (e) => {
    setMainContent(e.target.value);
  };
  const handleMainContentChange2 = (value) => {
    setMainContent(value); // Update state with the rich text content
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("data[Title]", title);
    formData.append("data[metaDesc]", metaDesc);
    formData.append("data[MainContent]", mainContent);
    formData.append("data[LaunchTime]", launchTime);

    if (thumbnail) {
      formData.append("files[Thumbnail]", thumbnail);
    }

    try {
      const res = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/our-themes", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data && data.data) {
        setDocumentId(data.data.documentId); // Save documentId
        setThemeCreated(true); // Theme is successfully created
        setDialogMessage({
          title: "Theme Created Successfully!",
          description:
            "Your theme has been created. You can preview it on the live website.",
        });
        setOpenDialog(true); // Open custom dialog
        setTitle("");
        setMetaDesc("");
        setThumbnail(null);
        setMainContent("");
        setLaunchTime("");
      } else {
        setDialogMessage({
          title: "Failed to Create Theme",
          description:
            "There was an issue creating the theme. Please try again.",
        });
        setOpenDialog(true); // Open custom dialog
      }
    } catch (error) {
      console.error("Error creating theme:", error);
      setDialogMessage({
        title: "Error Creating Theme",
        description: "An unexpected error occurred. Please try again later.",
      });
      setOpenDialog(true); // Open custom dialog
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Theme</h1>
      <form onSubmit={handleSubmit}>
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
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="metaDesc" className="block font-medium mb-1">
            Meta Description
          </label>
          <textarea
            id="metaDesc"
            name="metaDesc"
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="MainContent" className="block font-medium mb-1">
            Main Content
          </label>
          <textarea
            id="MainContent"
            name="MainContent"
            onChange={handleMainContentChange2}
            value={mainContent}
            className="w-full p-2 border rounded"
            rows="5"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="LaunchTime" className="block font-medium mb-1">
            Launch Time
          </label>
          <input
            type="datetime-local"
            id="LaunchTime"
            name="LaunchTime"
            value={launchTime}
            onChange={(e) => setLaunchTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Creating..." : "Create Theme"}
        </button>
      </form>
    </div>
  );
};

export default CreateThemePage;
