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

export default function AgeGroupSection() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/how-it-work-page?populate[AgeGroup][populate]=Content.Icon"
        );
        const data = await response.json();
        console.log("Age Group Data", data);
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

  const { AgeGroup } = content;
  const { featuredText, Title, Body, Content } = AgeGroup;

  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {Title}
        </h2>
        <p className="text-gray-600 mt-4 text-lg">{Body}</p>
      </div>

      {/* Featured Text */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-700">{featuredText}</h3>
      </div>

      {/* Content Blocks for each Age Group */}
      <div className="space-y-8">
        {Content?.map((ageGroup) => (
          <div
            key={ageGroup.id}
            className="p-6 border flex justify-between items-center rounded-lg shadow-lg bg-white"
          >
            {/* Age Group Title */}
            <div className="flex w-full flex-col">
              <h4 className="text-2xl font-semibold text-gray-800">
                {ageGroup.Title}
              </h4>

              {/* Age Group Body */}
              <p className="text-gray-600 mt-4">{ageGroup.Body}</p>
            </div>
            {/* Age Group Icon */}
            {ageGroup.Icon && ageGroup.Icon.url && (
              <div className="text-center mb-4">
                <img
                  src={`http://localhost:1337${ageGroup.Icon.url}`}
                  alt={
                    ageGroup.Icon.alternativeText ||
                    `Icon for ${ageGroup.Title}`
                  }
                  width={ageGroup.Icon.width}
                  height={ageGroup.Icon.height}
                  className="mx-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function UpdateAgeGroupSection() {
  const [content, setContent] = useState({
    AreaoflearningTitle: "",
    ArealearningBody: "",
    KindiSkillsCategoriesTitle: "",
    KindiSkillsCategoriesBody: "",
    AgeGroup: null, // Start with null or an empty object
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
          "http://localhost:1337/api/how-it-work-page?populate[AgeGroup][populate]=Content.Icon"
        );
        const data = await response.json();
        setContent({
          AreaoflearningTitle: data.data.AreaoflearningTitle,
          ArealearningBody: data.data.ArealearningBody,
          KindiSkillsCategoriesTitle: data.data.KindiSkillsCategoriesTitle,
          KindiSkillsCategoriesBody: data.data.KindiSkillsCategoriesBody,
          AgeGroup: data.data.AgeGroup, // Store the AgeGroup object
        });
      } catch (err) {
        setError("Error fetching content");
      }
    };

    fetchContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedContent = {
      data: {
        AreaoflearningTitle: content.AreaoflearningTitle,
        ArealearningBody: content.ArealearningBody,
        KindiSkillsCategoriesTitle: content.KindiSkillsCategoriesTitle,
        KindiSkillsCategoriesBody: content.KindiSkillsCategoriesBody,
        AgeGroup: content.AgeGroup, // Include AgeGroup data
      },
    };

    try {
      const response = await fetch(
        `http://localhost:1337/api/how-it-work-page?populate[AgeGroup][populate]=Content.Icon`, // Correct URL with query parameter for documentId
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
        console.error("Error response:", result);
        setDialogMessage(
          `Error updating content: ${result.message || response.statusText}`
        );
      }
    } catch (err) {
      console.error("Error:", err);
      setDialogMessage(`Error updating content: ${err.message}`);
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
        {/* Area of Learning Title */}
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

        {/* Area of Learning Body */}
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

        {/* Kindi Skills Categories Title */}
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

        {/* Kindi Skills Categories Body */}
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

        {/* Age Group Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Age Group Content
          </label>
          {content.AgeGroup?.Content &&
          Array.isArray(content.AgeGroup.Content) ? (
            content.AgeGroup.Content.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{item.Title}</h3>
                <p>{item.Body}</p>
                <img
                  src={` http://localhost:1337${item.Icon.url} `}
                  alt={item.Title}
                  width={79}
                  height={79}
                />
              </div>
            ))
          ) : (
            <p>No age group content available</p>
          )}
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
