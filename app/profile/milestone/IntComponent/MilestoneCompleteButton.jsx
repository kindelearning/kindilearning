"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function MilestoneCompleteButton({ userId, milestoneId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMilestoneCompletion = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/mark-milestone-completed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, milestoneId }),
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error completing milestone:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={`rounded-2xl font-fredoka text-white shadow border-2 border-white ${
        loading
          ? "opacity-50 cursor-not-allowed bg-red"
          : success
          ? "bg-purple hover:bg-purple"
          : "bg-red hover:bg-red-600"
      }`}
      onClick={handleMilestoneCompletion}
      disabled={loading || success}
    >
      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
            />
          </svg>
          Loading...
        </span>
      ) : success ? (
        "Milestone Completed"
      ) : (
        "Mark as Completed"
      )}
    </Button>
  );
}
