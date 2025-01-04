"use client";

import { fetchUserDetails } from "@/app/profile/api";
import { Button } from "@/components/ui/button";
import { CompletedMark } from "@/public/Images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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



export default function MarkActivityCompleteForm({ passactivityId }) {
  console.log('Activity Id Received form client', passactivityId);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        return;
      }

      try {
        const data = await fetchUserDetails(token);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);



  return (
    <>
      {userData && (
        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="rounded-2xl w-full flex flex-row gap-1 font-fredoka bg-red hover:bg-red-600 text-white shadow border-2 border-white">
              Mark Activity as Complete
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Select the Kid</DialogTitle>
              <DialogDescription>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.myKids && userData.myKids.length > 0 ? (
                      userData.myKids.map((kid, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg shadow-sm"
                        >
                          <p>
                            <strong>Id:</strong> {kid.id}
                          </p>
                          <p>
                            <strong>documentId:</strong> {kid.documentId}
                          </p>
                          <p>
                            <strong>Name:</strong> {kid.Name}
                          </p>
                          <DynamicButton activityId={passactivityId} kidId={kid.documentId}/>
                        </div>
                      ))
                    ) : (
                      <p>No kids profiles available.</p>
                    )}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export function DynamicButton({ activityId, kidId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!activityId || !kidId) {
      setError("Invalid activity or kid ID.");
      return;
    }
  
    setIsSubmitting(true);
    setError("");
    setSuccess("");
  
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("Authorization token is missing.");
  
      // Send the updated data to the backend
      const updateResponse = await fetch(`https://proper-fun-404805c7d9.strapiapp.com/api/kids/${kidId}?populate=*`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            myActivities: [
              {
                id: activityId, // Use the passed activity ID
              },
            ],
          },
        }),
      });
  
      const responseData = await updateResponse.json();
      console.log('Payload: ' + JSON.stringify(responseData));
  
      if (!updateResponse.ok) {
        console.error("Backend Response:", responseData);
        throw new Error(responseData.error?.message || "Error updating kid data.");
      }
  
      setSuccess("Activity marked as complete!");
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center">
            Submitting...
          </span>
        ) : (
          "Mark Activity as Complete"
        )}
      </Button>
    </form>
  );
}
