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
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";

export default function OurStory() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/our-mission?populate[OurStory][populate]=Media"
        );
        const data = await response.json();
        console.log("HIW Data", data);
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

  const { OurStory } = content;

  return (
    <>
      <section className="max-w-[1000px] min-h-screen h-full md:h-full lg:h-full flex flex-col items-center bg-[#ffffff] w-full gap-4 py-8">
        {/* Media Section */}
        <div className="w-full flex justify-center items-center mt-8">
          {OurStory?.Media?.[0]?.url ? (
            <video
              autoPlay
              controls
              src={`http://localhost:1337${OurStory.Media[0].url}`}
              className="w-full max-w-[800px] h-auto border-2 border-[#ddd] shadow-lg rounded-lg overflow-hidden"
            />
          ) : (
            <p className="text-gray-600 text-center text-lg md:text-xl">
              No media available.
            </p>
          )}
        </div>
        <div className="w-full flex flex-col justify-start items-start animate-fadeIn animate-delay-500">
          {/* Featured Text */}
          {OurStory?.featuredText && (
            <p className="text-[#1d1d1d] clarascript text-lg md:text-xl lg:text-2xl font-semibold animate-slideInLeft animate-delay-1000">
              {OurStory.featuredText}
            </p>
          )}

          {/* Title */}
          {OurStory?.Title && (
            <div className="flex flex-wrap justify-center items-center text-[#1d1d1d] claraheading text-3xl md:text-4xl lg:text-5xl font-bold text-center animate-slideInLeft animate-delay-1500">
              <span className="mx-1">
                {OurStory.Title.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="mx-1">
                {OurStory.Title.split(" ").slice(2, 4).join(" ")}
              </span>
            </div>
          )}

          {/* Body */}
          {OurStory?.Body && (
            <p
              className="prose w-full text-start text-[#696969] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
              dangerouslySetInnerHTML={{ __html: OurStory.Body }}
            />
          )}
        </div>
      </section>
    </> 
  );
}

export function UpdateOurStorySection() {
  const [content, setContent] = useState({
    OurStory: {
      Body: "",
      featuredText: "",
      Title: "",
      Media: [{ url: "", mime: "", name: "" }],
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch initial data for the OurStory section
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/our-mission?populate[OurStory][populate]=Media"
        );
        const data = await response.json();
        if (data && data.data) {
          setContent({
            OurStory: data.data.OurStory || {},
          });
        }
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

    // Prepare the data to update, including fields and media reference
    const updatedContent = {
      data: {
        OurStory: {
          Body: content.OurStory.Body,
          featuredText: content.OurStory.featuredText,
          Title: content.OurStory.Title,
          Media: content.OurStory.Media ? content.OurStory.Media : [], // Ensure Media is sent (empty if no change)
        },
      },
    };

    try {
      const response = await fetch(
        "http://localhost:1337/api/our-mission?populate[OurStory][populate]=Media",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setDialogMessage("Our Story content updated successfully!");
      } else {
        const result = await response.json();
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
  const handleChange = (e) => {
    // Check if e.target is undefined or null
    if (!e.target) {
      console.error("e.target is undefined");
      return;
    }
    const { name, value } = e.target;
    setContent((prevState) => ({
      ...prevState,
      OurStory: {
        ...prevState.OurStory,
        [name]: value,
      },
    }));
  };

  // Handle video file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("video")) {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("ref", "our-story");
      formData.append("refId", content.OurStory.id);
      formData.append("field", "Media");

      fetch("http://localhost:1337/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0]) {
            const updatedMedia = [{ ...data[0] }];
            setContent({
              ...content,
              OurStory: {
                ...content.OurStory,
                Media: updatedMedia,
              },
            });
          }
        })
        .catch((err) => setError("Error uploading file"));
    } else {
      setError("Please upload a valid video file.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Our Story Section</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={content.OurStory.Title}
            onChange={(e) =>
              setContent({
                ...content,
                OurStory: { ...content.OurStory, Title: e.target.value },
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Featured Text Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Featured Text
          </label>
          <input
            type="text"
            value={content.OurStory.featuredText}
            onChange={(e) =>
              setContent({
                ...content,
                OurStory: { ...content.OurStory, featuredText: e.target.value },
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Body Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>
          {/* <textarea
            value={content.OurStory.Body}
            onChange={(e) =>
              setContent({
                ...content,
                OurStory: { ...content.OurStory, Body: e.target.value },
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
          /> */}
          <ClaraMarkdownRichEditor
            name="Body"
            value={content.OurStory.Body}
            onChange={(value) =>
              setContent({
                ...content,
                OurStory: { ...content.OurStory, Body: value },
              })
            }
          />
        </div>

        {/* Video Upload Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Video Upload
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Our Story"}
          </button>
        </div>
      </form>

      {/* Success/Failure Dialog (Shadcn UI Dialog) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>
          <DialogDescription>{dialogMessage}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}