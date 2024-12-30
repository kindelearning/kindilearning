"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";

export default function HeroSectionForm() {
  const [featuredText, setFeaturedText] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [bodyDescription, setBodyDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const [dialogMessage, setDialogMessage] = useState(""); // To control the message in the dialog

  // Fetch the current data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/homepage-hero-section?populate=Image"
        );
        const data = await response.json();

        if (data?.data) {
          setFeaturedText(data.data.featuredText || "");
          setHeroTitle(data.data.HeroTitle || "");
          setBodyDescription(
            data.data.BodyDescription?.[0]?.children?.[0]?.text || ""
          );
        } else {
          setError("Unable to fetch current data.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      data: {
        featuredText,
        HeroTitle: heroTitle,
        BodyDescription: bodyDescription
      },
    };

    try {
      const response = await fetch(
        "https://proper-fun-404805c7d9.strapiapp.com/api/homepage-hero-section?populate=Image",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setDialogMessage("Hero section updated successfully!");
        setDialogOpen(true); // Show success dialog
      } else {
        setDialogMessage(
          "Error updating hero section: " + result?.error?.message
        );
        setDialogOpen(true); // Show error dialog
      }
    } catch (err) {
      setDialogMessage("Error submitting form: " + err.message);
      setDialogOpen(true); // Show error dialog
    }
  };

  // Loading and error states
  if (loading) {
    return <div>Loading current data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto font-fredoka px-8 py-12">
      <h2 className="text-3xl font-medium mb-8">Update Hero Section</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Featured Text</label>
          <input
            type="text"
            value={featuredText}
            onChange={(e) => setFeaturedText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter featured text"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Hero Title</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter hero title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Body Description</label>
          {/* <textarea
            value={bodyDescription}
            onChange={(e) => setBodyDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter body description"
            rows="4"
            required
          /> */}
           <ClaraMarkdownRichEditor
              name="BodyDescription"
              value={bodyDescription || ""} // Ensure the value is always a string
              onChange={(value) =>
                setBodyDescription(value )
              }
            />
        </div>

        <div>
          <button
            type="submit"
            className="bg-red text-white px-6 py-2 rounded-md hover:bg-hoverRed"
          >
            Update Hero Section
          </button>
        </div>
      </form>

      {/* Custom Dialog for Alerts */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMessage.includes("Error") ? "Error" : "Success"}
            </DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setDialogOpen(false)} // Close dialog
              className="bg-red text-white px-4 py-2 rounded-md hover:bg-hoverRed"
            >
              OK
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
