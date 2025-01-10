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

export default function MyLevel({ totalActivities }) {
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/levels?populate=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch levels.");
        }
        const data = await response.json();
        setLevels(data.data);
      } catch (error) {
        setError("Error fetching levels, please try again later.");
        console.error("Error fetching levels:", error);
      }
    };

    fetchLevels();
  }, []);

  useEffect(() => {
    // Find the current level based on the totalActivities.
    if (levels.length > 0) {
      const highestLevel = levels[levels.length - 1]; // Assuming levels are sorted in ascending order
      if (totalActivities > highestLevel.noOfActivities) {
        setCurrentLevel({ ...highestLevel, Tiitle: `${highestLevel.Tiitle}+` });
      } else {
        const level = levels.find(
          (lvl) => totalActivities <= lvl.noOfActivities
        );
        setCurrentLevel(level);
      }
    }
  }, [levels, totalActivities]);

  if (error) return <p>{error}</p>; // Fallback for fetching error
  if (!currentLevel) return <p>Loading level...</p>; // Fallback for no current level found

  const progress =
    currentLevel.noOfActivities === 0
      ? 100
      : (totalActivities / currentLevel.noOfActivities) * 100;

  return (
    <div className="flex w-full font-fredoka flex-col justify-start items-center gap-2">
      <div className="w-full claracontainer flex flex-row gap-2 justify-start items-center">
        <div className="text-[#3f3a64] clarabodyTwo">
          <span className="text-gray-600">{currentLevel.Tiitle}</span>
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

      <div className="flex overflow-clip  w-full gap-1 items-center">
        <div className="flex w-full rounded-full flex-col justify-start items-start">
          <div
            className="progress-bar-container"
            style={{
              width: "100%",
              backgroundColor: "#e0e0e0",
              borderRadius: "5px",
            }}
          >
            <div className="w-full max-w-[100%] rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 animate-water-slide h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="text-sm font-medium text-red mt-2">
            {progress.toFixed(2)}% completed | {totalActivities} /{" "}
            {currentLevel.noOfActivities} Activities
          </div>
        </div>
      </div>
    </div>
  );
}
// export default function MyLevel({ totalActivities = "1501" }) {
//   const [levels, setLevels] = useState([]);
//   const [currentLevel, setCurrentLevel] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLevels = async () => {
//       try {
//         const response = await fetch(
//           "https://proper-fun-404805c7d9.strapiapp.com/api/levels?populate=*"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch levels.");
//         }
//         const data = await response.json();
//         setLevels(data.data);
//       } catch (error) {
//         setError("Error fetching levels, please try again later.");
//         console.error("Error fetching levels:", error);
//       }
//     };

//     fetchLevels();
//   }, []);
//   useEffect(() => {
//     // Find the current level based on the totalActivities.
//     const level = levels.find((lvl) => totalActivities <= lvl.noOfActivities);
//     setCurrentLevel(level);
//   }, [levels, totalActivities]);

//   if (error) return <p>{error}</p>; // Fallback for fetching error
//   if (!currentLevel) return <p>Loading level...</p>; // Fallback for no current level found

//   const progress =
//     currentLevel.noOfActivities === 0
//       ? 0
//       : (totalActivities / currentLevel.noOfActivities) * 100;

//   return (
//     <div className="flex w-full font-fredoka flex-col justify-start items-center gap-2">
//       <div className="w-full claracontainer flex flex-row gap-2 justify-start items-center">
//         <div className="text-[#3f3a64] clarabodyTwo">
//           <span className="text-gray-600">{currentLevel.Tiitle}</span>
//         </div>

//         <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
//           <DialogTrigger asChild>
//             <Badge
//               className="text-[10px] md:text-[16px] cursor-pointer"
//               variant="outline"
//             >
//               Check Now
//             </Badge>
//           </DialogTrigger>
//           <DialogContent className="bg-[#EAEAF5] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[28px] w-full claracontainer">
//             <DialogHeader className="p-4">
//               <div className="flex flex-row justify-center items-center w-full">
//                 <DialogTitle>
//                   <div className="text-center">
//                     <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
//                       My{" "}
//                     </span>
//                     <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
//                       Level
//                     </span>
//                   </div>
//                 </DialogTitle>
//               </div>
//             </DialogHeader>
//             <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
//               <div className="flex flex-col justify-center items-center w-full claracontainer gap-4">
//                 <LevelList />
//               </div>
//             </DialogDescription>
//           </DialogContent>
//         </Dialog>

//         <Link href="/profile/update" className="flex lg:hidden" target="_blank">
//           <Badge
//             className="text-[10px] md:text-[16px] cursor-pointer"
//             variant="outline"
//           >
//             Edit
//           </Badge>
//         </Link>
//       </div>

//       <div className="flex w-full gap-1 items-center">
//         <div className="flex w-full flex-col justify-start items-start">
//           <div
//             className="progress-bar-container"
//             style={{
//               width: "100%",
//               backgroundColor: "#e0e0e0",
//               borderRadius: "5px",
//             }}
//           >
//             <div className="w-full rounded-full h-2.5">
//               <div
//                 className="bg-red h-2.5 rounded-full"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>
//           <div className="text-sm font-medium text-red mt-2">
//             {progress.toFixed(2)}% completed | {totalActivities} /{" "}
//             {currentLevel.noOfActivities} Activities
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
