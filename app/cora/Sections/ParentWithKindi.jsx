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
import ClaraMarkdownRichEditor from "./TextEditor/ClaraMarkdownRichEditor";
import MediaSelector, {
  MultiMediaSelector,
} from "../website/media/Section/MediaSelector";

export default function ParentWithKindi() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/our-mission?populate[Parentwithkindi][populate]=Media"
          // https://upbeat-life-04fe8098b1.strapiapp.com/api/how-it-works?populate[Hero][populate]=Media&populate[AgeGroup]=*&populate[Content]=*&populate[AreaOflearningCards][populate]=*&populate[KindiSkillsCategoriesCards][populate]=*
        );
        const data = await response.json();
        console.log("Fetched Parentwithkindi data:", data); // Log the response structure
        if (data?.data?.Parentwithkindi) {
          setContent(data.data.Parentwithkindi); // Set the Parentwithkindi content
        } else {
          setError("No content found for 'Parent with Kindi'.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("PWK Content on PWK Popup", content);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">No content available.</div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-8 md:p-12 gap-4 lg:p-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {content.featuredText} {content.Title}
            </h2>

            <div className="text-lg text-gray-700 space-y-6 leading-relaxed">
              {content.Body?(

                <p
                  className="prose w-full px-0 text-start clarabodyTwo  font-medium font-fredoka"
                  dangerouslySetInnerHTML={{
                    __html: content.Body,
                  }}
                />
              ):(
                <p> content not available</p>
              )}
            </div>

            {content?.Media ? (
              <div className="grid grid-cols-3 gap-2 justify-between items-center w-full">
                {content?.Media?.map((img, index) => (
                  <div key={index}>
                    <img className="w-[200px] h-[200px]" src={img.url} alt="text" />
                  </div>
                ))}
              </div>
            ) : (
              <p> Media NOt available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function UpdateParentWithKindiSection2() {
  const [content, setContent] = useState({
    Parentwithkindi: {
      Body: "",
      featuredText: "",
      Title: "",
      Media: null, // Handle media if required
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch initial data for the Parentwithkindi section
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/our-mission?populate[Parentwithkindi][populate]=Media"
        );
        const data = await response.json();
        setContent({
          Parentwithkindi: data.data.Parentwithkindi || {},
        });
      } catch (err) {
        setError("Error fetching content");
      }
    };

    fetchContent();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data for submission
    const updatedContent = {
      data: {
        Parentwithkindi: {
          Body: content.Parentwithkindi.Body,
          featuredText: content.Parentwithkindi.featuredText,
          Title: content.Parentwithkindi.Title,
          Media: content.Parentwithkindi.Media, // If you want to handle media as well
        },
      },
    };

    try {
      const response = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/our-mission", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContent),
      });

      const result = await response.json();
      if (response.ok) {
        setDialogMessage("Parent With Kindi section updated successfully!");
      } else {
        setDialogMessage(
          `Error updating content: ${result.message || response.statusText}`
        );
      }
    } catch (err) {
      setDialogMessage(`Error updating content: ${err.message}`);
    } finally {
      setIsDialogOpen(true);
      setLoading(false);
    }
  };

  // Handle input change for the Parentwithkindi fields
  const handleChange = (field, value) => {
    setContent((prevContent) => ({
      ...prevContent,
      Parentwithkindi: {
        ...prevContent.Parentwithkindi,
        [field]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Edit Parent With Kindi Section
      </h2>

      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Text Red
          </label>
          <input
            type="text"
            value={content.Parentwithkindi.featuredText}
            onChange={(e) => handleChange("featuredText", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Text White
          </label>
          <input
            type="text"
            value={content.Parentwithkindi.Title}
            onChange={(e) => handleChange("Title", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>

          <ClaraMarkdownRichEditor
            name="Body"
            value={content.Parentwithkindi.Body}
            onChange={(value) =>
              setContent({
                ...content,
                Parentwithkindi: { ...content.Parentwithkindi, Body: value },
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Media (optional)
          </label>
          <input
            type="file"
            onChange={(e) => handleChange("Media", e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Parent With Kindi Section"}
          </button>
        </div>
      </form>

      {/* Shadcn Dialog for Success/Error Message */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogClose
            onClick={() => setIsDialogOpen(false)}
            className="bg-red text-white rounded-md px-4 py-2"
          >
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function UpdateParentWithKindiSection() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [featuredText, setFeaturedText] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data for MonthlyTheme content
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/our-mission?populate[Parentwithkindi][populate]=Media"
        );
        const data = await res.json();

        const content = data.data;
        if (content) {
          setTitle(content.Parentwithkindi?.Title || ""); // Set default values if not found
          setBody(content.Parentwithkindi?.Body || "");
          setFeaturedText(content.Parentwithkindi?.featuredText || "");
          setMedia(content.Parentwithkindi?.Media?.id || null); // Set the media ID or null if no media is selected
          setMedia(
            content.Parentwithkindi?.Media?.map((media) => ({
              id: media.id,
            })) || []
          );
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
    const formattedGallery = media.map((id) => ({ id }));

    const payload = {
      data: {
        Parentwithkindi: {
          Title: title,
          Body: body,
          featuredText: featuredText,
          Media: formattedGallery, // Use media ID if selected
        },
      },
    };
    console.log("Payload Created for Parentwithkindi", payload);

    try {
      const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/our-mission", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Updated our-mission Content:", data);
      setOpenDialog(true); // Show success dialog
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Error updating content.");
    }
  };

  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia); // Store the selected media object
  };

  const handleGallerySelect = (selectedMediaIds) => {
    console.log("Selected Media IDs:", selectedMediaIds);

    // Filter out invalid IDs (e.g., undefined or null)

    const formattedGallery = selectedMediaIds.map((id) => ({ id }));
    // Update the gallery state with the new array of valid IDs
    setMedia(selectedMediaIds);

    // console.log("Updated Gallery State:", formattedGallery);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Parentwithkindi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
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

        {/* Body Description Field */}
        <div>
          <label htmlFor="BodyDescription" className="block">
            Body Description (Markdown)
          </label>
          <textarea
            id="BodyDescription"
            name="BodyDescription"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border p-2 w-full"
            rows="5"
          />
        </div>

        {/* Featured Text Field */}
        <div>
          <label htmlFor="FeaturedText" className="block">
            Featured Text
          </label>
          <input
            type="text"
            id="FeaturedText"
            name="FeaturedText"
            value={featuredText}
            onChange={(e) => setFeaturedText(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Media Field */}
        <div>
          <label>Gallery:</label>
          <MultiMediaSelector onMediaSelect={handleGallerySelect} />{" "}
        </div>
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Update Content
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
