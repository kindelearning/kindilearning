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

export default function AreaOfLearning() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/how-it-work-page?populate[AreaOflearningCards][populate]=Icon"
        );
        const data = await response.json();
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

  const { AreaoflearningTitle, ArealearningBody, AreaOflearningCards } =
    content;

  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {AreaoflearningTitle}
        </h2>
        <p className="text-gray-600 mt-4 text-lg">{ArealearningBody}</p>
      </div>

      {/* Cards Grid */}
      <div className="grid  lg:grid-cols-2 gap-6">
        {AreaOflearningCards?.map((card) => (
          <div
            key={card.id}
            className="p-6 rounded-lg shadow-lg text-white"
            style={{ backgroundColor: `#${card.bgcolor}` }}
          >
            {/* Card Title */}
            <h3 className="text-2xl font-semibold mb-4">{card.Title}</h3>

            {/* Card Body */}
            <ul
              className="space-y-2 list-disc list-inside"
              dangerouslySetInnerHTML={{ __html: card.Body }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function UpdateAreaOfLearning() {
  const [content, setContent] = useState({
    AreaoflearningTitle: "",
    ArealearningBody: "",
    KindiSkillsCategoriesTitle: "",
    KindiSkillsCategoriesBody: "",
    AreaOflearningCards: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch initial data for the "How It Works" page
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/how-it-work-page?populate[AreaOflearningCards][populate]=Icon"
        );
        const data = await response.json();
        if (data && data.data) {
          setContent({
            AreaoflearningTitle: data.data.AreaoflearningTitle || "",
            ArealearningBody: data.data.ArealearningBody || "",
            KindiSkillsCategoriesTitle:
              data.data.KindiSkillsCategoriesTitle || "",
            KindiSkillsCategoriesBody:
              data.data.KindiSkillsCategoriesBody || "",
            AreaOflearningCards: data.data.AreaOflearningCards || [],
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

    const updatedContent = {
      data: {
        AreaoflearningTitle: content.AreaoflearningTitle,
        ArealearningBody: content.ArealearningBody,
        KindiSkillsCategoriesTitle: content.KindiSkillsCategoriesTitle,
        KindiSkillsCategoriesBody: content.KindiSkillsCategoriesBody,
        AreaOflearningCards: content.AreaOflearningCards.map((card) => ({
          id: card.id,
          Title: card.Title,
          Body: card.Body,
          bgcolor: card.bgcolor,
          Icon: card.Icon, // Make sure Icon is sent here for file upload
        })),
      },
    };

    // Use FormData to handle file uploads
    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedContent.data));

    // Append files to FormData (for each card's Icon)
    content.AreaOflearningCards.forEach((card, index) => {
      if (card.Icon) {
        formData.append(`files.icon_${index}`, card.Icon); // Assuming the icon files are in the "Icon" field
      }
    });

    try {
      const response = await fetch(
        "http://localhost:1337/api/how-it-work-page",
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setDialogMessage("Content updated successfully!");
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

  // Handle card updates
  const handleCardChange = (index, field, value) => {
    const updatedCards = [...content.AreaOflearningCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setContent({ ...content, AreaOflearningCards: updatedCards });
  };

  // Handle icon file upload
  const handleIconChange = (index, file) => {
    const updatedCards = [...content.AreaOflearningCards];
    updatedCards[index] = { ...updatedCards[index], Icon: file };
    setContent({ ...content, AreaOflearningCards: updatedCards });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit How It Works Page</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Area of Learning Title
          </label>
          <input
            type="text"
            value={content.AreaoflearningTitle}
            onChange={(e) =>
              setContent({ ...content, AreaoflearningTitle: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Area of Learning Body
          </label>
          <textarea
            value={content.ArealearningBody}
            onChange={(e) =>
              setContent({ ...content, ArealearningBody: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kindi Skills Categories Title
          </label>
          <input
            type="text"
            value={content.KindiSkillsCategoriesTitle}
            onChange={(e) =>
              setContent({
                ...content,
                KindiSkillsCategoriesTitle: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kindi Skills Categories Body
          </label>
          <textarea
            value={content.KindiSkillsCategoriesBody}
            onChange={(e) =>
              setContent({
                ...content,
                KindiSkillsCategoriesBody: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
          />
        </div>

        {/* Area of Learning Cards Section */}
        <h3 className="text-xl font-semibold mt-6 mb-4">
          Area of Learning Cards
        </h3>
        <div className="grid grid-cols-2 gap-3 w-full justify-between">
          {content.AreaOflearningCards.map((card, index) => (
            <div key={card.id} className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Title
                </label>
                <input
                  type="text"
                  value={card.Title}
                  onChange={(e) =>
                    handleCardChange(index, "Title", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Body
                </label>
                <textarea
                  value={card.Body}
                  onChange={(e) =>
                    handleCardChange(index, "Body", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Background Color
                </label>
                <input
                  type="color"
                  value={`#${card.bgcolor}`}
                  onChange={(e) =>
                    handleCardChange(index, "bgcolor", e.target.value.slice(1))
                  }
                  className="w-[40px] p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Icon
                </label>
                <input
                  type="file"
                  onChange={(e) => handleIconChange(index, e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
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

      {/* Success/Failure Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
