"use client";
import { useState, useEffect } from "react";
import LocalHeader from "../Topbar";

export default function DeleteContent({ contentId, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `http://localhost:1337/api/contents/${contentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSuccess("Content deleted successfully!");
        onDelete(contentId); // Callback to remove content from UI
      } else {
        setError("Failed to delete content");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
            {/* <LocalHeader /> */}
      
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{ backgroundColor: "red", color: "white" }}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
