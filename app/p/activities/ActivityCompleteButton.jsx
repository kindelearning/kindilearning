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

export default function MarkActivityCompleteForm({ passactivityId }) {
  // console.log("Activity Id Received form client", passactivityId);
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
                      userData.myKids.filter((kid, index) => index % 2 === 0).map((kid, index) => (
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
                          {/* <DynamicButton activityId={passactivityId} kidId={kid.documentId}/> */}
                          <UpdateKidButton
                            kidDocumentId={kid.documentId} // Pass the kid's documentId
                            activityId={passactivityId} // Pass the activity ID to associate with the kid
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

const UpdateKidButton = ({ kidDocumentId, activityId }) => {
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
            // Assuming token is stored in localStorage
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

      if (!response.ok) {
        throw new Error("Failed to update kid's data.");
      }

      const data = await response.json();
      // On success, set success state to true
      setSuccess(true);
      console.log("Kid's data updated successfully:", data);
    } catch (error) {
      setError(error.message || "An error occurred while updating the data.");
      console.error("Error updating kid's data:", error);
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
          Kid&apos;s activity updated successfully!
        </p>
      )}
    </div>
  );
};

function DynamicButton({ activityId, kidId }) {
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
      const updateResponse = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}?populate=*`,
        {
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
        }
      );

      const responseData = await updateResponse.json();
      console.log("Payload: " + JSON.stringify(responseData));

      if (!updateResponse.ok) {
        console.error("Backend Response:", responseData);
        throw new Error(
          responseData.error?.message || "Error updating kid data."
        );
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
          <span className="flex items-center">Submitting...</span>
        ) : (
          "Mark Activity as Complete"
        )}
      </Button>
    </form>
  );
}
