"use client";

import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { useEffect, useState } from "react";

export default function TeamSection() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/our-mission?populate[Hero][populate]=Media&populate[Parentwithkindi][populate]=Media&populate[OurStory][populate]=Media&populate[OurTeam][populate]=*"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Log the response structure
        if (data?.data) {
          setContent(data.data); // Set the fetched data
        } else {
          setError("No data found.");
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
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  console.log("Content:", content); // Log content before rendering

  // Check if content is null or undefined
  if (!content) {
    return <div>No content available.</div>;
  }

  return (
    <div className="container mx-auto flex flex-col space-y-12 px-8 py-12">
      {/* Our Team Section */}
        <h2 className="text-4xl font-bold mb-6">Our Team</h2>
      <div className="flex flex-row ">
        {/* Check if OurTeam is an array before using .map() */}
        {Array.isArray(content?.OurTeam) && content?.OurTeam?.length > 0 ? (
          content.OurTeam.map((teamMember) => (
            <div key={teamMember.id} className="mb-8">
              <h3 className="text-2xl font-bold">{teamMember.Name}</h3>
              <p className="text-xl font-medium">{teamMember.Degree}</p>
              <div className="prose">{teamMember.About}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No team members found</p>
        )}
      </div>
    </div>
  );
}
