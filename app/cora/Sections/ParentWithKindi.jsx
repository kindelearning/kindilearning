"use client";

import { useEffect, useState } from "react";

export default function ParentWithKindi() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/our-mission?populate[Parentwithkindi][populate]=Media"
          // http://localhost:1337/api/how-it-works?populate[Hero][populate]=Media&populate[AgeGroup]=*&populate[Content]=*&populate[AreaOflearningCards][populate]=*&populate[KindiSkillsCategoriesCards][populate]=*
        );
        const data = await response.json();
        console.log("Fetched Parentwithkindi data:", data); // Log the response structure
        if (data?.data?.Parentwithkindi) {
          setContent(data.data.Parentwithkindi); // Set the Parentwithkindi content
        } else {
          setError("No content found for 'Parent with Kindi'.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">No content available.</div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {content.featuredText} {content.Title}
            </h2>

            <div className="text-lg text-gray-700 space-y-6 leading-relaxed">
              {content.Body.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
