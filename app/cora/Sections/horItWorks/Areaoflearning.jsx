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

export default function AreaOfLearning() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/how-it-work-page?populate[AreaOflearningCards][populate]=Icon"
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
 
export const UpdateAreaOfLearning = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch existing data
  useEffect(() => {
    fetch(
      "https://proper-fun-404805c7d9.strapiapp.com/api/how-it-work-page?populate[AreaOflearningCards][populate]=Icon"
    )
      .then((res) => res.json())
      .then((data) => {
        setFormData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data");
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      data: {
        AreaoflearningTitle: formData.AreaoflearningTitle,
        ArealearningBody: formData.ArealearningBody,
        AreaOflearningCards: formData.AreaOflearningCards.map((card) => ({
          Title: card.Title,
          Body: card.Body,
          bgcolor: card.bgcolor.replace("#", ""),
        })),
      },
    };
    console.log("Sent Data", payload);

    try {
      const res = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/how-it-work-page", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOpenDialog(true); // Open the success dialog
      } else {
        const errorData = await res.json();
        console.error("Error updating:", errorData);
        alert(`Failed to update: ${errorData.error.message}`);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardChange = (index, key, value) => {
    const updatedCards = [...formData.AreaOflearningCards];
    updatedCards[index][key] = value;
    setFormData((prev) => ({
      ...prev,
      AreaOflearningCards: updatedCards,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        {/* Area of Learning Title */}
        <div className="space-y-2">
          <label
            htmlFor="AreaoflearningTitle"
            className="block text-lg font-semibold"
          >
            Area of Learning Title
          </label>
          <input
            type="text"
            name="AreaoflearningTitle"
            id="AreaoflearningTitle"
            value={formData.AreaoflearningTitle || ""}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Area of Learning Body */}
        <div className="space-y-2">
          <label
            htmlFor="ArealearningBody"
            className="block text-lg font-semibold"
          >
            Area of Learning Body
          </label>
          <textarea
            name="ArealearningBody"
            id="ArealearningBody"
            value={formData.ArealearningBody || ""}
            onChange={handleInputChange}
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Area of Learning Cards */}
        <h3 className="text-xl font-semibold">Area of Learning Cards</h3>
        <div className="grid w-full grid-cols-2 justify-between gap-2">
          {formData.AreaOflearningCards.map((card, index) => (
            <div
              key={card.id}
              className="space-y-4 p-4 border border-gray-300 rounded-lg"
              style={{ backgroundColor: card.bgcolor }}
            >
              <h4 className="text-lg font-medium">Card {index + 1}</h4>

              <div className="space-y-2">
                <label
                  htmlFor={`card-title-${index}`}
                  className="block text-sm font-medium"
                >
                  Title
                </label>
                <input
                  type="text"
                  id={`card-title-${index}`}
                  value={card.Title || ""}
                  onChange={(e) =>
                    handleCardChange(index, "Title", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`card-body-${index}`}
                  className="block text-sm font-medium"
                >
                  Body
                </label>
                {/* <textarea
                  id={`card-body-${index}`}
                  value={card.Body || ""}
                  onChange={(e) =>
                    handleCardChange(index, "Body", e.target.value)
                  }
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                /> */}
                <ClaraMarkdownRichEditor
                  value={card.Body}
                  onChange={(value)=>handleCardChange(index, "Body", value)}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`card-bgcolor-${index}`}
                  className="block text-sm font-medium"
                >
                  Background Color
                </label>
                <input
                  type="color"
                  id={`card-bgcolor-${index}`}
                  value={card.bgcolor || "#000000"}
                  onChange={(e) =>
                    handleCardChange(index, "bgcolor", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Update
        </button>
      </form>
      {/* Dialog for success message */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>
              Your data has been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button className="btn-close">Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
