"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchLevelDetails } from "../api";
import { fetchAllActivities } from "@/app/data/p/Dynamic/Activity";

export default function MyLevel({ userID }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //   useEffect(() => {
  //     const fetchActivities = async () => {
  //       try {
  //         const response = await fetchAllActivities(); // API call to fetch activities
  //         setActivities(response || []);
  //       } catch (error) {
  //         console.error("Error fetching activities:", error);
  //         setError(error);
  //         setActivities([]);
  //       }
  //     };

  //     fetchActivities();
  //   }, []);

  //   console.log("Fetched Activities during levels Popup", activities);

  // Function to determine the user level
  //   const getUserLevel = (activityCount) => {
  //     if (activityCount >= 0 && activityCount <= 5) return 1;
  //     if (activityCount > 5 && activityCount <= 10) return 2;
  //     if (activityCount > 10 && activityCount <= 15) return 3;
  //     if (activityCount > 15 && activityCount <= 20) return 4;
  //     if (activityCount > 20 && activityCount <= 25) return 5;
  //     return "Max Level"; // More than 25
  //   };

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>{error}</p>;

  //   const userLevel = getUserLevel(activities.length);
  //   const progressPercentage = (activities.length / 25) * 100;

  return (
    <div className="flex w-full flex-col justify-start items-center gap-2">
      <div className="w-full claracontainer flex flex-row gap-2 justify-start items-center">
        <div className="text-[#3f3a64] clarabodyTwo">
          {/* User Level: {userLevel} */}
        </div>

        <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
          <DialogTrigger asChild>
            <Badge
              className="text-[10px] md:text-[16px] cursor-pointer"
              variant="outline"
            >
              Check Now
            </Badge>
          </DialogTrigger>
          <DialogContent className="bg-[#EAEAF5] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[28px] w-full claracontainer">
            <DialogHeader className="p-4">
              <div className="flex flex-row justify-center items-center w-full">
                <DialogTitle>
                  <div className="text-center">
                    <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                      My{" "}
                    </span>
                    <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                      Level
                    </span>
                  </div>
                </DialogTitle>
              </div>
            </DialogHeader>
            <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
              <div className="flex flex-col justify-center items-center w-full claracontainer gap-4">
                <LevelList />
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <Link href="/profile/update" className="flex lg:hidden" target="_blank">
          <Badge
            className="text-[10px] md:text-[16px] cursor-pointer"
            variant="outline"
          >
            Edit
          </Badge>
        </Link>
      </div>

      <div className="flex w-full gap-1 items-center">
        <div
          className="progress-bar-container"
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
          }}
        >
          <div
            className="progress-bar"
            // style={{
            //   width: `${progressPercentage}%`,
            //   backgroundColor: "#f15c57",
            //   height: "10px",
            //   borderRadius: "5px",
            // }}
          ></div>
        </div>
        <p className="clarabodyTwo w-[max-content] min-w-[90px] lg:min-w-[120px]">
          {/* Activities: {activities.length} */}
        </p>
      </div>
    </div>
  );
}

export function LevelList() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchLevelDetails();
      setLevels(data.data);
    }
    fetchData();
  }, []);
  console.log("Levels Data:", levels);

  return (
    <>
      {levels.length > 0 ? (
        levels.map((level) => (
          <>
            <LevelCard
              key={level.id}
              level={level.Tiitle}
              activities={level.noOfActivities}
            />
          </>
        ))
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}
export const LevelCard = ({ level, activities, className }) => {
  return (
    <div
      className={`w-full px-4 py-6 bg-white rounded-xl flex-col justify-start items-start gap-[8px] inline-flex ${className}`}
    >
      <div className="text-[#0a1932] text-[20px] font-semibold font-fredoka leading-normal">
        Level {level}
      </div>
      <div className="text-[#0a1932] clarabodyTwo">{activities} Activities</div>
    </div>
  );
};
