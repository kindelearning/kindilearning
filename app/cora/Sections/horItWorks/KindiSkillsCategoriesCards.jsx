"use client";

import { useEffect, useState } from "react";

export default function KindiSkillsCategoriesCards() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/how-it-work-page?populate[KindiSkillsCategoriesCards][populate]=Icon"
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

  const {
    KindiSkillsCategoriesTitle,
    KindiSkillsCategoriesBody,
    KindiSkillsCategoriesCards,
  } = content;

  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {KindiSkillsCategoriesTitle}
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          {KindiSkillsCategoriesBody}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid  lg:grid-cols-2 gap-6">
        {KindiSkillsCategoriesCards?.map((card) => (
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
