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

export default function ParentWithKindi() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/our-mission?populate[Parentwithkindi][populate]=Media"
          // https://proper-fun-404805c7d9.strapiapp.com/api/how-it-works?populate[Hero][populate]=Media&populate[AgeGroup]=*&populate[Content]=*&populate[AreaOflearningCards][populate]=*&populate[KindiSkillsCategoriesCards][populate]=*
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
          <div className="p-8 md:p-12 lg:p-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {content.featuredText} {content.Title}
            </h2>

            <div className="text-lg text-gray-700 space-y-6 leading-relaxed">
             
              <p
                className="prose w-full px-0 text-start clarabodyTwo  font-medium font-fredoka"
                dangerouslySetInnerHTML={{
                  __html: content.Body,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UpdateParentWithKindiSection() {
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
          "https://proper-fun-404805c7d9.strapiapp.com/api/our-mission?populate[Parentwithkindi][populate]=Media"
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
      const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/our-mission", {
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
