"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { LevelTwo, LevelOne, LevelThree } from "@/public/Images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReferralCard from "@/app/Sections/Profile/ReferralCard";
import Link from "next/link";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import LevelList from "@/app/Sections/Profile/LevelList";
import { fetchKidDetails, fetchUserDetails } from "../api";
import TopProfileCard from "../Sections/TopProfileCard";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const badgeLevels = [
  {
    image: LevelOne,
    condition: (level) => level === 1,
  },
  {
    image: LevelTwo,
    condition: (level) => level === 2,
  },
  {
    image: LevelThree,
    condition: (level) => level >= 3,
  },
];

const BadgesDisplay = ({ userID }) => {
  console.log("Received this UserID as Property: " + userID);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the badges for the user
    const fetchBadges = async () => {
      try {
        const response = await fetchKidDetails();
        const data = await response.json();

        const filteredData = data.data.filter((user) => user.id === userID);

        if (data > 0) {
          setBadges(data); // Assuming you are getting only one matching user
        } else {
          setError("User not found");
        }
      } catch (error) {
        setError("Failed to load badges");
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [userID]);

  console.log("Filtered badge Data from BadgesDisplay Fucntion: ", badges);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <div className="flex w-full overflow-x-scroll scrollbar-hidden gap-2">
        {badges.map((badge) => {
          // Select a random badge level based on your badgeLevels array
          const randomLevelIndex = Math.floor(
            Math.random() * badgeLevels.length
          );
          const selectedBadgeLevel = badgeLevels[randomLevelIndex];

          return (
            <div
              key={badge.id}
              className="flex flex-col justify-start items-center w-fit max-w-[100px] min-w-[80px] gap-0 cursor-pointer"
            >
              {badge.icon && (
                <img
                  src={badge.icon.url}
                  alt={badge.name}
                  className="min-w-[80px] max-w-[80px] max-h-[80px] min-h-[80px] object-cover"
                />
              )}

              {selectedBadgeLevel && (
                <div className="flex w-full justify-end items-end">
                  <Image
                    src={selectedBadgeLevel?.image}
                    alt={`Badge Level ${randomLevelIndex + 1}`}
                    className="-mt-[20px] lg:-mt-[22px] w-[24px] h-[24px] md:w-[32px] md:h-[32px] mr-0 lg:mr-[10px]"
                  />
                </div>
              )}
              <h2 className="w-full text-center text-sm text-[#000000] font-normal font-fredoka leading-tight">
                {badge.name.length > 16
                  ? badge.name.slice(0, 16) + "..."
                  : badge.name}
              </h2>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

const DisplayAllBadges = () => {
  const [allBadges, setAllBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/badges?populate=*"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllBadges(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchBadges();
  }, []);

  // console.log("Badges received", allBadges);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!allBadges || allBadges.length === 0) {
    return <div>No Badges found!</div>;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-1">
        <Dialog>
          <DialogTrigger>
            <div className="grid w-full overflow-hidden md:grid-cols-6 justify-between lg:grid-cols-9 grid-cols-3 gap-2">
              {allBadges.map((badge) => {
                const randomWidth = Math.floor(Math.random() * 46) + 10; // Random number between 10 and 100
                return (
                  <div
                    className="flex cursor-pointer flex-col justify-start items-center w-fit max-w-[160px] min-w-[120px] gap-2"
                    key={badge.id}
                  >
                    <img
                      width={80}
                      height={80}
                      className="min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] object-cover"
                      src={badge.Thumbnail?.url}
                      alt={badge.Name}
                    />
                    {/* Progress Bar */}
                    <div className="w-full max-w-[80px] h-1 bg-[#bfbfbf] rounded">
                      <div
                        className="h-full bg-red rounded"
                        style={{ width: `${randomWidth}%` }} // Set random width
                      />
                    </div>
                    <h2 className="w-full text-center text-sm text-[#000000] font-normal font-fredoka leading-tight">
                      {badge.Name.length > 16
                        ? badge.Name.slice(0, 16) + "..."
                        : badge.Name}
                    </h2>
                  </div>
                );
              })}
            </div>
          </DialogTrigger>
          <DialogContent className="bg-[#EAEAF5] max-w-[96%] lg:max-w-[800px] items-start max-h-[70%] scrollbar-hidden overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
            <DialogHeader className="p-4">
              <DialogTitle>
                <div className="text-center">
                  <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    How{" "}
                  </span>
                  <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    to Earn
                  </span>
                </div>
              </DialogTitle>
              <DialogDescription className="flex w-full px-4 claracontainer gap-4 flex-col justify-center items-start">
                {/* Render badge descriptions dynamically */}
                {allBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="w-full prose text-[#575757] text-[20px] font-medium font-fredoka leading-[24px]"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: badge.Description }}
                    />
                  </div>
                ))}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default function Achievement() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null); // For error handling
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setError("No token found");
        setLoading(false); // Set loading to false even if token is not found
        return;
      }

      try {
        const data = await fetchUserDetails(token); // Assuming this function works properly
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  console.log("User Data on Achievement page", userData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        {/* Topbar */}
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Profile
          </div>
        </div>
        {userData ? (
          <div className="claracontainer bg-[#F5F5F5] md:bg-[#EAEAF5] -mt-4 rounded-t-[12px] z-2 lg:m-12 px-4 py-6 rounded-xl md:px-2 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
            <TopProfileCard userData={userData} />
            <div className="flex flex-col w-full gap-12">
              <div className="flex flex-col w-full gap-2">
                <div className="text-[#0a1932] text-2xl font-medium font-fredoka w-full">
                  Your acievements
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <div className="text-[#0a1932] text-2xl font-medium font-fredoka w-full">
                  To Be Completed
                </div>
                <div className="flex flex-wrap gap-1">
                  <DisplayAllBadges />
                </div>
              </div>
            </div>
            {/* Reffereal Card Section */}
            <div className="claracontainer px-0 w-full flex flex-col justify-start items-start overflow-hidden gap-8">
              <ReferralCard />
            </div>
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
      </section>
    </>
  );
}
