"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { fetchUserDetails } from "../../api";

// export  function MilestoneCompleteButton({ userId, milestoneId }) {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleMilestoneCompletion = async () => {
//     setLoading(true);

//     try {
//       const response = await fetch("/api/mark-milestone-completed", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId, milestoneId }),
//       });

//       if (response.ok) {
//         setSuccess(true);
//       }
//     } catch (error) {
//       console.error("Error completing milestone:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button
//       className={`rounded-2xl font-fredoka text-white shadow border-2 border-white ${
//         loading
//           ? "opacity-50 cursor-not-allowed bg-red"
//           : success
//           ? "bg-purple hover:bg-purple"
//           : "bg-red hover:bg-red-600"
//       }`}
//       onClick={handleMilestoneCompletion}
//       disabled={loading || success}
//     >
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
//         "Milestone Completed"
//       ) : (
//         "Mark as Completed"
//       )}
//     </Button>
//   );
// }
 
export default function MarkMilestoneCompleteForm({ passmilestoneId }) {
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
              Mark Milestone as Complete
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Select the Kid</DialogTitle>
              <DialogDescription>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.myKids && userData.myKids.length > 0 ? (
                      userData.myKids.filter((_, index) => index % 2 === 0).map((kid, index) => (
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
                          <MilestoneCOmpletedButton
                            kidDocumentId={kid.documentId} // Pass the kid's documentId
                            milestoneId={passmilestoneId} // Pass the activity ID to associate with the kid
                            parentId={userData.id} // Pass the parent's ID
                          />
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

const MilestoneCOmpletedButton = ({ kidDocumentId, milestoneId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidDocumentId}?populate=*`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              myMilestones: [
                {
                  id: milestoneId,
                },
              ],
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update milestones's data.");
      }
      
      const data = await response.json();
      console.log('Payload sent', data)
      // On success, set success state to true
      setSuccess(true);
      console.log("milestones's data updated successfully:", data);
    } catch (error) {
      setError(error.message || "An error occurred while updating the data.");
      console.error("Error updating milestones's data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Updating..." : "Update Kid's Activity"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">
          Milestone marked as completed
        </p>
      )}
    </div>
  );
};
