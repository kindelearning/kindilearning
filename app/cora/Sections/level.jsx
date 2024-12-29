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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LevelData() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/levels?populate=*"
        );
        const data = await response.json();
        console.log("Level Data", data);
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

  const { Hero } = content;

  return (
    <>
      <section className="max-w-[1000px] min-h-screen h-full md:h-full lg:h-full flex flex-col items-center bg-[#ffffff] w-full gap-4 py-8">
        <div className="levels-page">
          <h1>Levels</h1>
          {levels.length === 0 ? (
            <div>No levels available</div>
          ) : (
            <div className="levels-list">
              {levels.map((level) => (
                <div key={level.id} className="level-item">
                  <h2>{level.Tiitle}</h2>
                  <p>Number of Activities: {level.noOfActivities}</p>
                  <p>
                    Created At: {new Date(level.createdAt).toLocaleString()}
                  </p>
                  <p>
                    Updated At: {new Date(level.updatedAt).toLocaleString()}
                  </p>
                  <p>
                    Published At: {new Date(level.publishedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
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
          "http://localhost:1337/api/how-it-work-page?populate[Hero][populate]=Media"
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
        "http://localhost:1337/api/how-it-work-page?populate[Hero][populate]=Media",
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
