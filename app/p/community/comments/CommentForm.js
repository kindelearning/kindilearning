"use client";
import { Send } from "lucide-react";
import { useState } from "react";

export function CommentForm({ blogId, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setError("Comment text is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:1337/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            Text: commentText,
            blog: blogId, // Assuming you have a relationship between comments and blogs
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Successfully added comment
        setCommentText("");
        onCommentAdded(data.data); // Add new comment to the list
      } else {
        setError("Error adding comment");
      }
    } catch (error) {
      setError("Error adding comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#80808000] font-fredoka w-full rounded-full p-6  mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center bg-white rounded-full border shadow-sm">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              rows="1"
              className="flex-1 p-3 border-none focus:ring-0 focus:outline-none rounded-l-full resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-12 h-12 bg-red text-white rounded-r-full hover:bg-hoverRed disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-t-2 rounded-r-full border-white rounded-full"></div>
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </>
  );
}
