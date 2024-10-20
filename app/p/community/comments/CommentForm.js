"use client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";

const CommentForm = ({ blogId }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send the form data to your backend to save to Hygraph
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        content,
        blogId,
      }),
    });

    const result = await response.json();
    if (result.success) {
      setMessage("Comment submitted successfully!");
      setName("");
      setContent("");
    } else {
      setMessage("Failed to submit the comment. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex mt-6 flex-col w-full gap-2">
        <div className="clarabodyTwo pb-4 text-purple">Add your Comment</div>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border w-full border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Your Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="p-2 border w-full border-gray-300 rounded-md"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="p-2 bg-red clarabutton flex flex-row items-center justify-center gap-2 text-white rounded-md"
        >
          <Send />
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </Button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default CommentForm;
