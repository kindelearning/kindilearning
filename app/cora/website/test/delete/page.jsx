"use client";
import { useState, useEffect } from "react";
import LocalHeader from "../Topbar";

const DeleteContent = ({ documentId, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:1337/api/contents/${documentId}`, {
        method: 'DELETE',
      });

      // Check if the response was successful
      if (response.ok) {
        onDelete(documentId); // Notify the parent to remove the item from the list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete content");
      }
    } catch (err) {
      setError(err.message || "Error occurred while deleting");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="text-red-600 hover:text-red-700 font-medium"
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteContent;
