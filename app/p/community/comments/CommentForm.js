"use client";


import { useState } from "react";
const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, blogId }),
    });

    if (response.ok) {
      // Clear the comment input or handle success
      setComment("");
    } else {
      // Handle error
      console.error("Failed to submit comment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        required
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
