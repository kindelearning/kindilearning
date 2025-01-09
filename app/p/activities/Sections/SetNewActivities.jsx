"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchUserDetails } from "@/app/profile/api";

export default function SetNewActivities({ kidId }) {
  const [myActivity, setMyActivity] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        // Handle redirection if token doesn't exist
        setLoading(false);
        return;
      }
      try {
        const userResponse = await fetchUserDetails(token);
        setUserData(userResponse.allActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  console.log("Fetched userData on Setactivity pag:", userData);
  const today = new Date().toISOString().split("T")[0]; // Gets today's date in YYYY-MM-DD format

  const filteredActivities = userData.filter((activity) =>
    activity.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        newDate,
        myActivity: myActivity,
        myKid: kidId, // Passed as prop
      },
    };

    console.log("Payload Sent", payload);
    try {
      const response = await fetch(
        "https://proper-fun-404805c7d9.strapiapp.com/api/rescheduled-events?populate=*",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Rescheduled Event created successfully!");
        const responseData = await response.json();
        console.log(responseData);
      } else {
        const errorData = await response.json();
        console.error("Error creating rescheduled event:", errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>Assign More Activities</DialogTrigger>
        <DialogContent className="w-full font-fredoka max-w-[1000px] max-h-[600px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>
              Select Activity you want to assign to the kid, then Schedule
              visually in Scheduler
            </DialogTitle>
            <DialogDescription>
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-4"
              >
                <div className="flex  gap-2 w-full justify-between">
                  <label className="flex flex-col w-full justify-between items-start gap-2">
                    Select Date:
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      required
                      min={today}
                      className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    />
                  </label>

                  <label className="flex flex-col w-full justify-between items-start gap-2">
                    Select Activity:
                    <select
                      value={myActivity}
                      onChange={(e) => setMyActivity(e.target.value)}
                      required
                      className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    >
                      <option value="">Select an activity</option>
                      {filteredActivities && filteredActivities.length > 0 ? (
                        filteredActivities
                          .filter((_, index) => index % 2 === 0)
                          .map((activity) => (
                            <option
                              key={activity?.id || Math.random()}
                              value={activity?.id || ""}
                            >
                              {activity?.Title || "Unknown Activity"}
                            </option>
                          ))
                      ) : (
                        <option value="" disabled>
                          No activities available
                        </option>
                      )}
                    </select>
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create Rescheduled Event
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
