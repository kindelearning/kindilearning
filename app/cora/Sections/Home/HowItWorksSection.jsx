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

export default function HowItWorksSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://proper-fun-404805c7d9.strapiapp.com/api/howitwork?populate=HIWSection.Media"
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
      {/* Main Title */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          {data.MainTitle}
        </h1>
      </div>

      {/* Main Body */}
      <div className="max-w-4xl mx-auto px-4">
        {/* {data.MainBody.map((paragraph, index) => (
          <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">
            {paragraph.children[0].text}
          </p>
        ))} */}
        <p
          className="prose w-full text-start text-[#101010] clarabodyTwo"
          dangerouslySetInnerHTML={{
            __html: data.MainBody,
          }}
        />
      </div>

      {/* How It Works Sections */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4">
        {data.HIWSection.map((section) => (
          <div
            key={section.id}
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
                {section.title} {section.featuredText}
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
                  __html: section.BodyDescription,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function UpdateHowItWorks() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    fetch("https://proper-fun-404805c7d9.strapiapp.com/api/howitwork?populate=*")
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

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submitting the form
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://proper-fun-404805c7d9.strapiapp.com/api/howitwork`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            MainTitle: howItWorksData.MainTitle,
            MainBody: howItWorksData.MainBody,
            HIWSection: howItWorksData.HIWSection,
          },
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setHowItWorksData(updatedData.data);
        alert("Data updated successfully!");
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError("Error updating data.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      data: {
        MainTitle: formData.MainTitle,
        MainBody: formData.MainBody,
        HIWSection: formData.HIWSection.map((card) => ({
          featuredText: card.featuredText,
          title: card.title,
          BodyDescription: card.BodyDescription,
        })),
      },
    };
    console.log("Sent Data", payload);

    try {
      const res = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/howitwork", {
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
    const updatedCards = [...formData.HIWSection];
    updatedCards[index][key] = value;
    setFormData((prev) => ({
      ...prev,
      HIWSection: updatedCards,
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
        <div>
          <label
            htmlFor="MainTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Main Title
          </label>
          <input
            type="text"
            id="MainTitle"
            name="MainTitle"
            value={formData.MainTitle || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="MainBody"
            className="block text-sm font-medium text-gray-700"
          >
            Main Body
          </label>
          <textarea
            id="MainBody"
            name="MainBody"
            onChange={handleInputChange}
            value={formData.MainBody || ""}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            rows="5"
            required
          />
          {/* <ClaraMarkdownRichEditor
            value={formData.MainBody || ""}
            onChange={handleInputChange}
          /> */}
        </div>

        <div>
          <h3 className="text-lg font-medium">HIW Section</h3>
          {formData.HIWSection.map((card, index) => (
            <div key={card.id} className="space-y-4">
              <div>
                <label
                  htmlFor={`HIWSection_${index}_featuredText`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Featured Text
                </label>
                <input
                  type="text"
                  id={`HIWSection_${index}_featuredText`}
                  name="HIWSection"
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
                  htmlFor={`HIWSection_${index}_title`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id={`HIWSection_${index}_title`}
                  name="HIWSection"
                  value={card.title}
                  // onChange={(e) => {
                  //   const updatedHIWSection = [...howItWorksData.HIWSection];
                  //   updatedHIWSection[index].title = e.target.value;
                  //   setHowItWorksData((prevData) => ({
                  //     ...prevData,
                  //     HIWSection: updatedHIWSection,
                  //   }));
                  // }}
                  onChange={(e) =>
                    handleCardChange(index, "title", e.target.value)
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={`HIWSection_${index}_BodyDescription`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Body Description
                </label>
                {/* <textarea
                  id={`HIWSection_${index}_BodyDescription`}
                  name="BodyDescription"
                  value={card.BodyDescription}
                  // onChange={(e) => {
                  //   const updatedHIWSection = [...howItWorksData.HIWSection];
                  //   updatedHIWSection[index].BodyDescription = e.target.value;
                  //   setHowItWorksData((prevData) => ({
                  //     ...prevData,
                  //     HIWSection: updatedHIWSection,
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
                  value={card.BodyDescription}
                  onChange={(value) =>
                    handleCardChange(index, "BodyDescription", value)
                  }
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
