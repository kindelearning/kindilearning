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

export default function SliderSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://proper-fun-404805c7d9.strapiapp.com/api/slider?populate=Content.Media"
      );
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <section className="how-it-works py-4 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4">
        {data.Content.map((section) => (
          <div
            key={section.id}
            style={{ backgroundColor: `${section.bgcolor}` }}
            className="how-it-works-section bg-white rounded-lg p-8 gap-4 flex items-start"
          >
            {/* Image */}
            {section.Media ? (
              <img
                className="rounded-lg max-w-[300px] h-[300px] w-full object-contain"
                src={`http://localhost:1337${section.Media.url}`}
                alt={section.Media.name || "How it works image"}
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-300 rounded-lg flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
            <div className="flex flex-col justify-start items-start">
              {/* Title and Featured Text */}
              <span className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {section.Title} {section.featuredText}
              </span>

              {/* Body Description */}
              {/* {section.BodyDescription.map((body, index) => (
                <p
                  key={index}
                  className="text-lg text-[gray]  mb-6 text-start leading-relaxed"
                >
                  {body.children[0].text}
                </p>
              ))} */}
              <p
                className="prose w-full text-start text-[#101010] clarabodyTwo"
                dangerouslySetInnerHTML={{
                  __html: section.Body,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function UpdateSliderSection() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetch("https://proper-fun-404805c7d9.strapiapp.com/api/slider?populate=*")
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
        Content: formData.Content.map((card) => ({
          featuredText: card.featuredText,
          Title: card.Title,
          bgcolor: card.bgcolor,
          Body: card.Body,
        })),
      },
    };
    console.log("Sent Data", payload);

    try {
      const res = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/slider", {
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

  const handleCardChange = (index, key, value) => {
    const updatedCards = [...formData.Content];
    updatedCards[index][key] = value;
    setFormData((prev) => ({
      ...prev,
      Content: updatedCards,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Update How It Works Content
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid w-full grid-cols-2 justify-between gap-2">
          {formData.Content.map((card, index) => (
            <div
              key={card.id}
              className="space-y-4 p-4 border border-gray-300 rounded-lg"
              style={{ backgroundColor: card.bgcolor }}
            >
              <div>
                <label
                  htmlFor={`Content_${index}_featuredText`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Featured Text
                </label>
                <input
                  type="text"
                  id={`Content_${index}_featuredText`}
                  name="Content"
                  value={card.featuredText}
                  onChange={(e) =>
                    handleCardChange(index, "featuredText", e.target.value)
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={`Content_${index}_title`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id={`Content_${index}_Title`}
                  name="Content"
                  value={card.Title}
                  // onChange={(e) => {
                  //   const updatedContent = [...howItWorksData.Content];
                  //   updatedContent[index].title = e.target.value;
                  //   setHowItWorksData((prevData) => ({
                  //     ...prevData,
                  //     Content: updatedContent,
                  //   }));
                  // }}
                  onChange={(e) =>
                    handleCardChange(index, "Title", e.target.value)
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={`Content_${index}_BodyDescription`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Body Description
                </label>
                {/* <textarea
                    id={`Content_${index}_BodyDescription`}
                    name="BodyDescription"
                    value={card.BodyDescription}
                    // onChange={(e) => {
                    //   const updatedContent = [...howItWorksData.Content];
                    //   updatedContent[index].BodyDescription = e.target.value;
                    //   setHowItWorksData((prevData) => ({
                    //     ...prevData,
                    //     Content: updatedContent,
                    //   }));
                    // }}
                    onChange={(e) =>
                      handleCardChange(index, "BodyDescription", e.target.value)
                    }
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    rows="5"
                    required
                  /> */}
                <ClaraMarkdownRichEditor
                  value={card.Body}
                  onChange={(value) => handleCardChange(index, "Body", value)}
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
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
    </div>
  );
}
