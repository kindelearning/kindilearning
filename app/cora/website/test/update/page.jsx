"use client";
import { useState, useEffect } from "react";
import LocalHeader from "../Topbar";

export default function UpdateContent({ contentId }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/contents/${contentId}`
        );
        const data = await response.json();
        setContent(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchContent();
  }, [contentId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `http://localhost:1337/api/contents/${contentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Title: content.Title,
              Body: content.Body,
              Date: content.Date,
            },
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Content updated successfully!");
      } else {
        setError("Failed to update content");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div>
            <LocalHeader />
      
      <h1>Update Content</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={content.Title}
            onChange={(e) => setContent({ ...content, Title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            value={content.Body}
            onChange={(e) => setContent({ ...content, Body: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={content.Date}
            onChange={(e) => setContent({ ...content, Date: e.target.value })}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
