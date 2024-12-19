"use client";
import { useState, useEffect } from "react";
import LocalHeader from "./Topbar";
import UpdateContent from "./update/page";
import DeleteContent from "./delete/page";

export default function ContentList() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContentId, setSelectedContentId] = useState(null);

  const handleDelete = (id) => {
    // Remove the deleted content from the UI (for example, by filtering it out from the list)
    setContent((prevContent) => prevContent.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/contents?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          setContent(data.data); // Set the response data to state
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
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <LocalHeader />
      <h1 className="text-3xl font-bold mb-6">Content List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md p-4 flex flex-col space-y-4 bg-white"
          >
            <h2 className="text-xl font-semibold">{item.Title}</h2>
            <p className="text-gray-600">{item.Body}</p>
            <p className="text-sm text-gray-500">{item.Date}</p>
            <div className="flex space-x-4 mt-auto">
              <button
                onClick={() => setSelectedContentId(item.id)}
                className="text-blue-500 hover:underline"
              >
                Update
              </button>
              <DeleteContent
                contentId={item.id}
                onDelete={handleDelete}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
