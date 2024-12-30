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

export default function HowItWorks() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/how-it-work-page?populate[Hero][populate]=Media"
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

  const {
    Hero,
    AgeGroup,
    Content,
    AreaOflearningCards,
    KindiSkillsCategoriesCards,
  } = content;

  return (
    <>
      <section className="max-w-[1000px] min-h-screen h-full md:h-full lg:h-full flex flex-col items-center bg-[#ffffff] w-full gap-4 py-8">
        {/* Media Section */}
        <div className="w-full flex justify-center items-center mt-8">
          {Hero?.Media?.[0]?.url ? (
            <video
              autoPlay
              controls
              src={`https://proper-fun-404805c7d9.strapiapp.com${Hero.Media[0].url}`}
              className="w-full max-w-[800px] h-auto border-2 border-[#ddd] shadow-lg rounded-lg overflow-hidden"
            />
          ) : (
            <p className="text-gray-600 text-center text-lg md:text-xl">
              No media available.
            </p>
          )}
        </div>

        <div className="w-full flex flex-col justify-start items-center animate-fadeIn animate-delay-500">
          {/* Featured Text */}
          {Hero?.featuredText && (
            <p className="text-[#1d1d1d] clarascript text-lg md:text-xl lg:text-2xl font-semibold animate-slideInLeft animate-delay-1000">
              {Hero.featuredText}
            </p>
          )}

          {/* Title */}
          {Hero?.Title && (
            <div className="flex flex-wrap justify-center items-center text-[#1d1d1d] claraheading text-3xl md:text-4xl lg:text-5xl font-bold text-center animate-slideInLeft animate-delay-1500">
              <span className="mx-1">
                {Hero.Title.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="mx-1">
                {Hero.Title.split(" ").slice(2, 3).join(" ")}
              </span>
            </div>
          )}

          {/* Body */}
          {Hero?.Body && (
            <p className="text-center text-[#696969] text-base md:text-lg lg:text-xl mt-4 leading-relaxed animate-fadeIn animate-delay-2000">
              {Hero.Body}
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export function UpdateHowItWorkSection() {
  const [content, setContent] = useState({
    Hero: {
      Title: "",
      featuredText: "",
      Body: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch initial data for the Hero section
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/how-it-work-page?populate[Hero][populate]=Media"
        );
        const data = await response.json();
        if (data && data.data) {
          setContent({
            Hero: data.data.Hero || {},
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

    // Prepare the data to update
    const updatedContent = {
      data: {
        Hero: {
          Body: content.Hero.Body,
          featuredText: content.Hero.featuredText,
          Title: content.Hero.Title,
        },
      },
    };

    try {
      const response = await fetch(
        "https://proper-fun-404805c7d9.strapiapp.com/api/how-it-work-page?populate[Hero][populate]=Media",
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
        setDialogMessage("Hero content updated successfully!");
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Edit How It Works - Hero Section
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={content.Hero.Title}
            onChange={(e) =>
              setContent({
                ...content,
                Hero: { ...content.Hero, Title: e.target.value },
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
            value={content.Hero.featuredText}
            onChange={(e) =>
              setContent({
                ...content,
                Hero: { ...content.Hero, featuredText: e.target.value },
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
          <textarea
            value={content.Hero.Body}
            onChange={(e) =>
              setContent({
                ...content,
                Hero: { ...content.Hero, Body: e.target.value },
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Hero Section"}
          </button>
        </div>
      </form>

      {/* Success/Failure Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 bg-red-500 text-red rounded-md">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
