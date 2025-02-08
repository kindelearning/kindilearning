"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation"; // To navigate to All Themes page
import Link from "next/link";
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";
import MediaSelector from "../../media/Section/MediaSelector";

export function CreateTheme2() {
  const [title, setTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [mainContent, setMainContent] = useState("");
  const [additionalField, setAdditionalField] = useState("");
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
    formData.append("data[additionalField]", additionalField);
    formData.append("data[LaunchTime]", launchTime);

    if (thumbnail) {
      formData.append("files[Thumbnail]", thumbnail);
    }

    try {
      const res = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/our-themes",
        {
          method: "POST",
          body: formData,
        }
      );

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
        setAdditionalField("");
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
    <>
      <head>
        <title>Create New Theme | Cora</title>
      </head>
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
              <div>
                <label className="block mb-2">
                  Is this For App?{" "}
                  <span className="text-red">
                    Yes- if you want to display it on App home page
                  </span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="additionalField"
                      value="shop"
                      checked={additionalField === "shop"}
                      onChange={() => setAdditionalField("shop")}
                      className="cursor-pointer"
                    />
                    Yes
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="additionalField"
                      value="notShop"
                      checked={additionalField === "notShop"}
                      onChange={() => setAdditionalField("notShop")}
                      className="cursor-pointer"
                    />
                    No
                  </label>
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

              <ClaraMarkdownRichEditor
                onChange={handleMainContentChange2}
                value={mainContent}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
    </>
  );
}
export default function CreateTheme() {
  const [title, setTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [mainContent, setMainContent] = useState("");
  const [launchTime, setLaunchTime] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // To distinguish between success/error messages
  const [additionalField, setAdditionalField] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBadge = {
      LaunchTime: launchTime,
      Title: title,
      metaDesc: metaDesc,
      additionalField: additionalField,
      MainContent: mainContent,
      Thumbnail: media?.id || null, // Use media ID if selected
    };

    console.log("New Theme data", newBadge);
    try {
      const response = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/our-themes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: newBadge }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setDialogMessage("Theme created successfully!");
        setDialogType("success");

        setMainContent("");
        setMetaDesc("");
        setTitle("");
    setAdditionalField("");
    setLaunchTime("");
        setMedia(null);
      } else {
        setDialogMessage(
          "Failed to create Theme. Please check the input and try again."
        );
        setDialogType("error");
        throw new Error("Failed to create Theme");
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
      <head>
        <title>Create a new Theme | Kindi Learning</title>
      </head>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <img
                // src={media.url}
                src={`https://lionfish-app-98urn.ondigitalocean.app${media.url}`}
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
          <label htmlFor="title" className="block">
            Title
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
          <label htmlFor="Description" className="block">
            MainContent
          </label>
          <ClaraMarkdownRichEditor
            value={mainContent}
            onChange={(newContent) => setMainContent(newContent)}
            placeholder="Enter a description"
          />
        </div>
        <div>
          <label htmlFor="metaDesc" className="block">
            Meta Desc
          </label>
          <input
            type="text"
            id="metaDesc"
            name="metaDesc"
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
            <label className="block mb-2">
              Is this For App?{" "}
              <span className="text-red">
                Yes- if you want to display it on App home page
              </span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="additionalField"
                  value="shop"
                  checked={additionalField === "shop"}
                  onChange={() => setAdditionalField("shop")}
                  className="cursor-pointer"
                />
                Yes
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="additionalField"
                  value="notShop"
                  checked={additionalField === "notShop"}
                  onChange={() => setAdditionalField("notShop")}
                  className="cursor-pointer"
                />
                No
              </label>
            </div>
          </div>
        <div>
          <label htmlFor="subCategory" className="block">
            Launch Time
          </label>
          <input
            type="datetime-local"
            id="lunchTime"
            name="subCategory"
            value={launchTime}
            onChange={(e) => setLaunchTime(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Create Theme
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
                ? "Theme Created Successfully"
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
