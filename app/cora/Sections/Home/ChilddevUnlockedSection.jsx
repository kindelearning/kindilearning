"use client";

import { useEffect, useState } from "react";

export default function ChildDevelopmentUnlock() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/childdevelopmentunlock?populate=Content.Media"
        );
        const data = await response.json();
        console.log("child development Database", data);
        if (data?.data) {
          setContent(data.data.Content); // Set the fetched data
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

  return (
    <div className="container mx-auto flex justify-between font-fredoka px-8 py-12">
      <div className="flex flex-col max-w-[50%]">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">{content?.Title}</h1>

        {/* Featured Text */}
        <p className="text-xl font-medium text-gray-700 mb-6">
          {content?.featuredText}
        </p>

        {/* Body */}
        <div className="prose mb-6">
          {/* Render the markdown content as HTML */}
          {content?.Body && (
            <div dangerouslySetInnerHTML={{ __html: content?.Body }} />
          )}
        </div>
      </div>

      {/* Media */}
      {content?.Media && (
        <div className="max-w-[400px]">
          {content.Media ? (
            <img
              src={`http://localhost:1337${content.Media[0].url}`}
              alt="Child Development Media"
              className="w-full h-auto"
            />
          ) : (
            <p>No media available.</p>
          )}
        </div>
      )}
    </div>
  );
}
