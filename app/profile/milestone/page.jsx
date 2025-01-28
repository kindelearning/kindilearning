"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfilePlaceholder01 } from "@/public/Images";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getUserDataByEmail } from "@/lib/hygraph";
import { useAuth } from "@/app/lib/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CurrentUser from "./IntComponent/CurrentUser";
import DisplayAllMileStone from "./IntComponent/Milestonepath";
import { fetchKidDetails, fetchUserDetails } from "../api";
import { StockImages } from "@/app/constant/profile";
import { KidsDP } from "../Sections/IndividualTabs";

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * StockImages.length);
  return StockImages[randomIndex].url;
};

export default function MileStone() {
  const [milestoneData, setMilestoneData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
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

  // console.log("Fetched euserData on Milestone page:", userData);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <section className="w-full pb-24 h-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <head>
          <title>Milestone - Clara</title>
        </head>
        <div className="claracontainer items-center justify-center p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          {userData ? (
            <div className="flex w-full py-6 flex-col justify-center items-center">
              {userData.myKids && userData.myKids.length > 0 ? (
                <Tabs
                  defaultValue={userData.myKids[0].id}
                  className="w-full flex-col flex items-center h-fit bg-transparent"
                >
                  <div className="flex w-full max-w-[400px] lg:max-w-full lg:items-center lg:justify-center ">
                    {/* Main Frame: Shows up to 5 tabs */}
                    <TabsList className="flex gap-2 lg:gap-[2px] h-full bg-transparent py-6 overflow-x-scroll justify-center items-center w-full scrollbar-hidden">
                      {userData.myKids
                        .filter((_, index) => index % 2 === 0)
                        .map((kid) => (
                          <TabsTrigger
                            key={kid.id}
                            value={kid.id}
                            className="flex-shrink-0 flex-col data-[state=active]:bg-[#f5f5f500] data-[state=active]:opacity-100 opacity-70  data-[state=active]:z-12 data-[state=active]:scale-125 duration-200 ease-ease-in-out  data-[state=active]:border-red border-2 p-0 rounded-full bg-transparent"
                          >
                            <KidsDP kidId={kid.documentId} />
                          </TabsTrigger>
                        ))}
                    </TabsList>
                  </div>

                  {/* Dynamically create TabsContent for each kid */}
                  {userData.myKids.map((kid) => (
                    <TabsContent key={kid.id} value={kid.id} className="w-full">
                      <div className="w-full flex flex-col gap-2 lg:gap-4 justify-between items-center">
                        <div className="font-fredoka text-[12px] lg:text-[20px]">
                          {kid.Name}
                        </div>
                        {/* <ProfileRoute /> */}
                        <DisplayAllMileStone
                          passThecurrentUserId={kid.documentId}
                        />
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <p>No kids profiles available.</p>
              )}
            </div>
          ) : (
            <section className="w-full font-fredoka">
              <div className="claracontainer h-[500px] flex flex-col gap-6 justify-center items-center">
                <div className="flex-col gap-4 text-center">
                  <span className="text-[#3f3a64] claraheading uppercase">
                    No User Data Found
                  </span>
                  <br />
                  <span className="text-red claraheading uppercase">
                    Please log in to access your profile.
                  </span>
                </div>
                <div className="flex w-full justify-center items-center gap-4 flex-col lg:flex-row text-white text-center">
                  <Link
                    href="/oAuth/signup" // Replace this with your login navigation logic
                    className="bg-red text-white px-4 py-2 rounded shadow"
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}

{
  /* <Image
  src={getRandomImage()} // Random image for each kid's tab
  alt={`Profile of ${kid.Name}`}
  width={48}
  height={48}
  title={kid.Name}
  className={`w-16 h-16 p-0 m-0 rounded-full object-cover transition-all duration-200`}
/>; */
}
