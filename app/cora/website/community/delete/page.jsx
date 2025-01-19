"use client";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function DeleteContent({ documentId, onDelete }) {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setError(null);

    try {
      const response = await fetch(
        `https://kindiadmin.up.railway.app/api/blogs/${documentId}`,
        {
          method: "DELETE",
        }
      );

      // Check if the response was successful
      if (response.ok) {
        onDelete(documentId); // Notify the parent to remove the item from the list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete content");
      }
    } catch (err) {
      setError(err.message || "Error occurred while deleting");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-700 font-medium"
    >
      <Trash2 className="text-[#7f7f7f] duration-300 w-5 h-5 ease-in-out hover:text-black" />
    </button>
  );
}
