"use client";

import { useEffect, useState } from "react";

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
