"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

const CommentForm = ({ blogId }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      name,
      content,
      blogId,
    };

    setIsSubmitting(true);
    setMessage(""); // Clear any existing messages

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(
          `Failed to submit comment: ${result.message || "Unknown error"}`
        );
        setIsSubmitting(false);
        return;
      }

      setMessage("Comment submitted successfully!");
      setName("");
      setContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setMessage("Failed to submit comment. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex mt-6 flex-col w-full gap-2">
        <div className="w-full text-[#3f3a64] clarabodyTwo font-fredoka capitalize">
          Add your Comment
        </div>

        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          aria-label="Your Name"
          onChange={(e) => setName(e.target.value)}
          required
          className="border-2 font-fredoka rounded-[8px] focus:border-black focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white border-[#b4b4b4] "
        />
        <Textarea
          placeholder="Your Comment"
          value={content}
          aria-label="Your Comment"
          onChange={(e) => setContent(e.target.value)}
          required
          // className="w-full rounded-[8px] object-cover overflow-clip flex "
          className="border-2 font-fredoka max-h-[200px] h-[50px] rounded-[8px] focus:border-black focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white border-[#b4b4b4] "
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="p-2 bg-red border-transparent hover:bg-hoverRed border-2 duration-200 ease-in-out hover:border-white font-fredoka flex flex-row items-center justify-center gap-2 text-white rounded-md"
        >
          <Send />
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </Button>
        {message && (
          <p
            className={`text-sm ${
              response.ok ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </>
  );
};

export default CommentForm;
