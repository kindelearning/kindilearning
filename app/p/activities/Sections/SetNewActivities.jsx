"use client";

import { fetchAllActivities } from "@/app/data/p/Dynamic/Activity";
import { useEffect, useState } from "react";
import { getIconForSkill } from "./ActivityCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { ActivityImage } from "@/public/Images";

export default function SetNewActivities({ kidId }) {
  const [activities, setActivities] = useState(null); // All activities fetched from API
  const [myActivity, setMyActivity] = useState(null);
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetchAllActivities(); // Call API
        console.log("Fetched Activities Response:", response); // Log response
        setActivities(response || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities([]); // Set to empty array on error
      }
    };

    fetchActivities();
  }, []);

  console.log("Fetched Activities:", activities);

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
        <DialogContent className="w-full max-w-[1000px] max-h-[600px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>
              Select Activity you want to assign to the kid, then Schedule
              visually in Scheduler
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label>
                  Select Date:
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                  />
                </label>

                <label>
                  Select Activity:
                  <select
                    value={myActivity}
                    onChange={(e) => setMyActivity(e.target.value)}
                    required
                  >
                    <option value="">Select an activity</option>
                    {activities && activities.length > 0 ? (
                      activities.map((activity) => (
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

function ActivityCard({ activity, activityUrl, icons }) {
  const { Title, Skills, Theme, FocusAge, Gallery, SetUpTime } = activity;

  const imageUrl = Array.isArray(Gallery)
    ? Gallery[0]?.url // If it's an array, use the first image
    : Gallery?.url || ActivityImage;
  return (
    <>
      <Link
        href={activityUrl || "#"}
        target="_blank"
        className="md:w-full md:max-w-full max-w-[196px]  hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4"
      >
        <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
          <div className="w-full max-w-full md:min-w-full lg:max-w-full h-auto">
            <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:min-h-[200px] md:h-full  lg:h-full lg:max-h-[200px] md:max-h-[300px] overflow-clip rounded-t-3xl">
              <Image
                width={280}
                height={250}
                alt={Title}
                className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                src={imageUrl}
              />
            </div>
            <div className="w-full p-2 flex-col justify-start items-start flex gap-2 md:gap-2 lg:gap-2">
              <div className="flex-col w-full gap-[6px] justify-start items-start">
                <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                  {Title.length > 18 ? `${Title.slice(0, 18)}...` : Title}
                </div>
                <div className="justify-start overflow-clip w-full items-center gap-1 lg:gap-2 inline-flex">
                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-4 flex px-0 text-[10px] font-normal font-fredoka list-disc leading-none">
                    {SetUpTime}
                  </div>
                  •
                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 text-[10px] font-normal font-fredoka list-disc leading-none">
                    {Theme}
                  </div>
                  •
                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 text-[10px] font-normal font-fredoka list-disc leading-none">
                    {FocusAge}
                  </div>
                </div>
              </div>
              <div className="items-center h-fit justify-center gap-2 md:gap-4 grid grid-cols-5">
                {Skills?.slice(0, 5).map((skill, index) => {
                  const skillTitle = skill.children?.[0]?.text;
                  const iconUrl = getIconForSkill(skillTitle, icons);
                  return (
                    <div key={index} className="flex h-fit items-center gap-2">
                      {iconUrl && (
                        <img
                          src={iconUrl.src}
                          alt={skillTitle}
                          className="w-6  h-6"
                          width={iconUrl.width}
                          height={iconUrl.height}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
