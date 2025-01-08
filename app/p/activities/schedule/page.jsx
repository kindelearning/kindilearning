"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { fetchUserDetails } from "@/app/profile/api";
import { getRandomImage } from "@/app/profile/milestone/page";
import Image from "next/image";
import "react-calendar/dist/Calendar.css";
import NewCalendar from "../Sections/NewCalendar";

export default function Schedule() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ActvitiesData
  const [kids, setKids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch activities
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/kids?populate[myRescheduledActivities][populate]=*"
        );
        const data = await response.json();
        const rescheduledActivities = data.data;
        setKids(rescheduledActivities);
        console.log(
          "Fethced Data from Kids API in rescheduledActivities",
          rescheduledActivities
        );

        // Fetch user data
        const token = localStorage.getItem("jwt");
        if (!token) {
          // Handle redirection if token doesn't exist
          setLoading(false);
          return;
        }

        const userResponse = await fetchUserDetails(token);
        setUserData(userResponse);
      } catch (error) {
        console.error("Error fetching data", error);
        setUserData(null); // Optionally handle the error state here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  console.log("User Fetched from Server", userData);
  // getActivityForKid function
  const getActivityForKid = (kidId) => {
    const selectedKid = kids.find((kid) => kid.documentId === kidId);

    if (!selectedKid) {
      return []; // If no kid is found, return an empty array
    }

    return selectedKid.myRescheduledActivities || [];
  };
  console.log("Kids data:", kids);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] pb-24 items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:px-0 md:py-4 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-2">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                THE KINDI{" "}
              </span>
              <span className="text-red claraheading uppercase">
                ACTI VITY SCHEDULE
              </span>
            </div>
            <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
              Here&apos;s where you&apos;ll discover your daily educational play
              activities. Utilize our drag-and-drop feature to rearrange
              learning, ensuring development seamlessly fits your schedule.
              Additionally, sync your schedule with your child&apos;s nursery
              for a smooth and integrated learning experience.
            </div>
          </div>

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
                      {userData.myKids.map((kid) => (
                        <TabsTrigger
                          key={kid.id}
                          value={kid.id}
                          className="flex-shrink-0 flex-col data-[state=active]:bg-[#f5f5f500] data-[state=active]:opacity-100 opacity-70  data-[state=active]:z-12 data-[state=active]:scale-125 duration-200 ease-ease-in-out  data-[state=active]:border-red border-2 p-0 rounded-full bg-transparent"
                        >
                          <Image
                            src={getRandomImage()} // Random image for each kid's tab
                            alt={`Profile of ${kid.Name}`}
                            width={48}
                            height={48}
                            title={kid.Name}
                            className={`w-16 h-16 p-0 m-0 rounded-full object-cover transition-all duration-200`}
                          />
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {/* Dynamically create TabsContent for each kid */}
                  {userData.myKids.map((kid) => (
                    <TabsContent key={kid.id} value={kid.id} className="w-full">
                      <div className="w-full flex flex-col gap-2 lg:gap-4 justify-between items-center">
                        <div className="font-fredoka text-[12px] lg:text-[20px]">
                          Manage Personalized Schedule for{" "}
                          <span className="font-semibold text-[20px] font-fredoka text-red">
                            {kid.Name}
                          </span>
                        </div>
                        <div className="claracontainer md:p-0 p-0 py-4 w-full flex flex-col overflow-hidden gap-8">
                          <NewCalendar
                            activities={getActivityForKid(kid.documentId)}
                          />{" "}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <p>No kids profiles available.</p>
              )}
            </div>
          ) : (
            <p>User Not Found</p>
          )}
        </div>
      </section>
    </>
  );
}
