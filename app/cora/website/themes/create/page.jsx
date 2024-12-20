"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation"; // To navigate to All Themes page
import Link from "next/link";

export default function CreateTheme() {
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

  const router = useRouter(); // For navigation to All Themes page

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
      const res = await fetch("http://localhost:1337/api/our-themes", {
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
    <section className="p-8 font-fredoka bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="container mx-auto  bg-white shadow-lg rounded-lg p-8">
        {/* Header with navigation buttons */}
        <div className="flex justify-between mb-6">
          <Button
            onClick={() => router.push("/cora/website/themes")} // Navigate to All Themes page
            className="text-[#282828] bg-transparent hover:bg-transparent hover:scale-105 ease-out duration-150"
          >
            Back to All Themes
          </Button>
          {themeCreated && documentId && (
            <Link
              href={`http://localhost:3000/p/our-themes/${documentId}`}
              target="_blank"
              className="text-purple hover:scale-105 duration-150"
            >
              Preview on Live Website
            </Link>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={themeCreated}
            className="text-green bg-transparent hover:bg-transparent hover:scale-105 ease-out duration-150"
          >
            Create a New Theme
          </Button>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create New Theme
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between gap-2">
            <div className="flex flex-col w-full">
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Title:
                </label>
                <Input
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="metaDesc"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Meta Description:
                </label>
                <Input
                  id="metaDesc"
                  placeholder="Meta Description:"
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6 w-full">
              <label
                htmlFor="thumbnail"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Thumbnail:
              </label>
              <div
                className="flex flex-col w-full justify-start items-center p-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer transition-all hover:border-primary"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="thumbnail"
                  onChange={handleThumbnailChange}
                  className="border w-full rounded-xljustify-start opacity-30"
                />
                {!thumbnail ? (
                  <div className="text-center text-gray-500">
                    <p>
                      Drag and drop an image here, or click to select a file
                    </p>
                  </div>
                ) : (
                  <div className="w-full object-cover h-[300px] bg-gray-200 rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="mainContent"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Main Content:
            </label>
            <Textarea
              placeholder="Main Content:"
              id="mainContent"
              value={mainContent}
              onChange={handleMainContentChange}
              className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="launchTime"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Launch Time:
            </label>
            <Input
              type="datetime-local"
              id="launchTime"
              value={launchTime}
              onChange={(e) => setLaunchTime(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="w-full p-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
          >
            {loading ? "Creating..." : "Create Theme"}
          </Button>
        </form>

        {/* Custom Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogTitle>{dialogMessage.title}</DialogTitle>
            <DialogDescription>{dialogMessage.description}</DialogDescription>
            {/* <Button onClick={() => setOpenDialog(false)}>Close</Button> */}
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
