"use client";

import { useEffect, useState } from "react";
import LocalHeader from "../../website/test/Topbar";

export default function ContentViewer() {
  const [content, setContent] = useState(null); // To store content data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/childdevelopmentunlock?populate=*"
        );
        const data = await response.json();

        console.log("API Response:", data); // Log the API response

        if (response.ok && data.data) {
          setContent(data.data); // Set the fetched content
        } else {
          setError("Failed to fetch content");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-8 text-lg font-medium">Loading...</div>
    );
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  // Destructure content if it exists
  const { Title, Body, featuredText, Media } = content || {};

  return (
    <div className="w-full flex flex-col items-center">
      <LocalHeader />
          <h2 className="text-2xl font-bold text-gray-700">{Title}</h2>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Content</h1>
      <h2 className="text-2xl font-bold text-gray-700">{Title}</h2>
      h
      {/* Display content */}
      {content && (
        <div className="border rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 w-full max-w-4xl bg-white">
          <h2 className="text-2xl font-bold text-gray-700">{Title}</h2>

          {/* Display Body (Rich Text) */}
          <div
            className="prose mt-4 text-gray-600"
            dangerouslySetInnerHTML={{ __html: Body }} // Render Markdown as HTML
          />

          {/* Display Featured Text */}
          <p className="mt-4 text-lg text-gray-700">{featuredText}</p>

          {/* Display Media */}
          {Media && Media.data && Media.data.attributes.url && (
            <div className="mt-6">
              <img
                src={`http://localhost:1337${Media.data.attributes.url}`}
                alt="Featured Media"
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
