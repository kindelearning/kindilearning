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

    console.log("Updating content:", selectedContent);

    // Filter out default fields like 'id', 'createdAt', 'updatedAt'
    const { id, createdAt, updatedAt, ...updateData } = selectedContent;

    // Log the updateData to ensure it's correctly structured
    console.log("Update Data:", updateData);

    try {
      // Make the request to the Strapi endpoint with the content ID
      const response = await fetch(
        `http://localhost:1337/api/contents/${selectedContent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: updateData, // Wrap the custom fields in the 'data' object
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        // Update content in state
        setContent((prevContent) =>
          prevContent.map((item) =>
            item.documentId === selectedContent.documentId
              ? { ...item, ...data.data }
              : item
          )
        );
      
        setSuccess("Content updated successfully!");
      } else {
        setError(
          `Failed to update content: ${data?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      setError(`Error occurred: ${err.message}`);
      console.error("Error occurred:", err);
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
                  field !== "updatedAt"
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

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className={`py-2 px-4 text-white rounded-lg ${
                    updateLoading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
            {success && <div className="text-green-500 mt-4">{success}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
