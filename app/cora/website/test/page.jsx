"use client";
import { useState, useEffect } from "react";
import LocalHeader from "./Topbar";
import DeleteContent from "./delete/page";

export default function ContentList() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/contents?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          setContent(data.data);
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

  const handleDelete = (documentId) => {
    console.log("Deleting documentId:", documentId);
    setContent((prevContent) =>
      prevContent.filter((item) => item.documentId !== documentId)
    );
  };

  const handleUpdateClick = (item) => {
    setSelectedContent(item);
    setIsDialogOpen(true);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    // Exclude fields like documentId, createdAt, updatedAt, publishedAt, and id
    const { documentId, createdAt, updatedAt, publishedAt, id, ...updateData } =
      selectedContent;

    try {
      const response = await fetch(
        `http://localhost:1337/api/contents/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: updateData, // Send only the fields that need to be updated
          }),
        }
      );

      const responseData = await response.json();
      console.log("Update Response:", responseData);

      if (response.ok) {
        // Update the local state with updated data
        setContent((prevContent) =>
          prevContent.map((item) =>
            item.documentId === documentId
              ? { ...item, ...responseData.data }
              : item
          )
        );
        setSuccess("Content updated successfully!");
      } else {
        setError(
          `Update failed: ${responseData?.error?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
      console.error("Update Error:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedContent({ ...selectedContent, [name]: value });
  };

  if (loading)
    return (
      <div className="text-center mt-8 text-lg font-medium">Loading...</div>
    );
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="w-full flex flex-col items-center">
      <LocalHeader />
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Content List
      </h1>
      {content.length === 0 ? (
        <p className="text-gray-500 text-lg mt-4">No content available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          {content.map((item) => (
            <div
              key={item.documentId}
              className="border rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col space-y-4 bg-white"
            >
              <h2 className="text-2xl font-bold text-gray-700">{item.Title}</h2>
              <p className="text-gray-600 line-clamp-3">{item.Body}</p>
              <p className="text-sm text-gray-400">
                {new Date(item.Date).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => handleUpdateClick(item)}
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  Update
                </button>
                <DeleteContent
                  documentId={item.documentId}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Dialog */}
      {isDialogOpen && selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Update Content</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Dynamically render fields */}
              {Object.keys(selectedContent).map((field) => {
                if (
                  field !== "documentId" &&
                  field !== "id" &&
                  field !== "createdAt" &&
                  field !== "updatedAt" &&
                  field !== "publishedAt"
                ) {
                  return (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-gray-700 font-medium"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "Date" ? "date" : "text"}
                        id={field}
                        name={field}
                        value={selectedContent[field]}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  );
                }
                return null;
              })}

              <div className="flex justify-between items-center mt-4">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="text-red-600 hover:text-red-700"
                >
                  Cancel
                </button>
              </div>

              {success && (
                <p className="text-green-500 mt-4 text-sm">{success}</p>
              )}
              {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
