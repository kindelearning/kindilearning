"use client";

import { Button } from "@/components/ui/button";
import { CompletedMark } from "@/public/Images";
import Image from "next/image";
import { useState } from "react";

// const ActivityCompleteButton = ({ activityId, userId }) => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleActivityCompletion = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/mark-activity-completed", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId, activityId }),
//       });

//       console.log("esponse: ", response);
//       if (response.ok) {
//         setSuccess(true);
//       } else {
//         console.error("Failed to mark activity as complete");
//       }
//     } catch (error) {
//       console.error("Error completing activity:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Button
//       className={`rounded-2xl w-full flex flex-row gap-1 font-fredoka text-white shadow border-2 border-white ${
//         loading
//           ? "opacity-50 cursor-not-allowed bg-red"
//           : success
//           ? "bg-purple hover:bg-purple"
//           : "bg-red hover:bg-red-600"
//       }`}
//       onClick={handleActivityCompletion}
//       disabled={loading || success}
//     >
//       <Image alt="Kindi" className="flex lg:hidden" src={CompletedMark} />

//       {loading ? (
//         <span className="flex items-center">
//           <svg
//             className="animate-spin h-5 w-5 mr-2 text-white"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
//             />
//           </svg>
//           Loading...
//         </span>
//       ) : success ? (
//         "Activity Completed"
//       ) : (
//         "Mark as Completed"
//       )}
//     </Button>
//   );
// };

// export default ActivityCompleteButton;

export default function MarkActivityCompleteForm({ activityId, kidId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // Update the activity status in the kid's data
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/kids/${kidId}?populate=*`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              myActivities: [
                {
                  id: activityId,
                },
              ],
            },
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Activity marked as complete!");
      } else {
        setError(data.error?.message || "Error marking activity as complete.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <button type="submit" disabled={isSubmitting} className="btn">
        {isSubmitting ? "Submitting..." : "Mark Activity as Complete"}
      </button>
    </form>
  );
}
