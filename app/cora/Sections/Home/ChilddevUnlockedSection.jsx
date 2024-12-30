"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";

export default function ChildDevelopmentUnlock() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/childdevelopmentunlock?populate=Content.Media"
        );
        const data = await response.json();
        console.log("child development Database", data);
        if (data?.data) {
          setContent(data.data.Content); // Set the fetched data
        } else {
          setError("No data found.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto flex justify-between font-fredoka px-8 py-12">
      <div className="flex flex-col max-w-[50%]">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">{content?.Title}</h1>

        {/* Featured Text */}
        <p className="text-xl font-medium text-gray-700 mb-6">
          {content?.featuredText}
        </p>

        {/* Body */}
        <div className="prose mb-6">
          {/* Render the markdown content as HTML */}
          {content?.Body && (
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: content?.Body }}
            />
          )}
        </div>
      </div>

      {/* Media */}
      {content?.Media && (
        <div className="max-w-[400px]">
          {content.Media ? (
            <img
              src={content.Media[0].url}
              // src={`https://proper-fun-404805c7d9.strapiapp.com${content.Media[0].url}`}
              alt="Child Development Media"
              className="w-full h-auto"
            />
          ) : (
            <p>No media available.</p>
          )}
        </div>
      )}
    </div>
  );
}
export function UpdateChildDevelopmentContent() {
  const [content, setContent] = useState({
    Title: "",
    Body: "",
    featuredText: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch initial content data to pre-fill the form
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/childdevelopmentunlock?populate=Content.Media"
        );
        const data = await response.json();
        setContent({
          Title: data.data.Content.Title,
          Body: data.data.Content.Body,
          featuredText: data.data.Content.featuredText,
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

    const updatedContent = {
      data: {
        Content: {
          Title: content.Title,
          Body: content.Body,
          featuredText: content.featuredText,
        },
      },
    };

    try {
      const response = await fetch(
        "https://proper-fun-404805c7d9.strapiapp.com/api/childdevelopmentunlock?nxfbah0rlj4nhjo381vg7x8q",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setDialogMessage("Content updated successfully!");
      } else {
        setDialogMessage("Error updating content.");
      }
    } catch (err) {
      setDialogMessage("Error updating content.");
    } finally {
      setIsDialogOpen(true);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Content</h2>

      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={content.Title}
            onChange={(e) => setContent({ ...content, Title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>
          {/* <textarea
            value={content.Body}
            onChange={(e) => setContent({ ...content, Body: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
          /> */}
          <ClaraMarkdownRichEditor
            name="Body"
            value={content.Body || ""} // Ensure the value is always a string
            onChange={(value) => setContent({ ...content, Body: value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Featured Text
          </label>
          <input
            type="text"
            value={content.featuredText}
            onChange={(e) =>
              setContent({ ...content, featuredText: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Content"}
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
