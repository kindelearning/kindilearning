"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserDetails } from "./api";
import TopProfileCard from "./Sections/TopProfileCard";
import QuickNavigation from "./Sections/QuickNavigation";

import IndividualTabs from "./Sections/IndividualTabs";
import { LogoutButton } from "../oAuth/Sections/Logout";
import { LevelList } from "./Sections/MyLevel";
import Link from "next/link";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilepic: null,
  });
  const [kidsData, setKidsData] = useState([]);
  const [myLevels, setMyLevels] = useState(null);

  const router = useRouter();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt"); // Get the JWT token from localStorage
      if (!token) {
        router.push("/oAuth/signin"); // Redirect to login if there's an error fetching user data
        return;
      }

      try {
        const data = await fetchUserDetails(token); // Use the helper function to fetch user data
        setUserData(data);
        setFormData({
          username: data.username,
          email: data.email,
          profilepic: data.profilepic?.url || "",
        });

        // Fetch kids data
        const kidsResponse = await fetch(
          "https://kindiadmin.up.railway.app/api/kids?populate=*"
        );
        const kidsData = await kidsResponse.json();
        setKidsData(kidsData.data);

        // Filter kids based on user data's myKids documentIds
        if (data.myKids && data.myKids.length > 0) {
          const kidDocumentIds = data.myKids.map((kid) => kid.documentId);

          // Loop through kidsData and calculate lengths of 'myActivities'
          let totalActivitiesLength = 0;

          kidDocumentIds.forEach((kidId) => {
            const kid = kidsData.data.find((k) => k.documentId === kidId);
            if (kid) {
              const activitiesLength = kid.myActivities.length;
              console.log(
                `Kid ${kid.Name} has ${activitiesLength} activities.`
              );
              totalActivitiesLength += activitiesLength;
            }
          });
          setMyLevels(totalActivitiesLength);

          console.log(`Total Activities Length: ${totalActivitiesLength}`);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        router.push("/oAuth/signin"); // Redirect to login if there's an error fetching user data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  console.log("Fetched User Data", userData);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <head>
        <title>Profile - Kindilearning</title>
        <meta name="description" content="Your profile page on Kindilearning" />
      </head>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        {/* Topbar */}
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Profile
          </div>
        </div>
        {/* Profile Main Body */}
        {userData ? (
          <div className="claracontainer bg-[#F5F5F5] md:bg-[#EAEAF5] -mt-4 rounded-t-[12px] z-2 lg:m-12 px-4 py-6 rounded-xl md:px-2 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
            <TopProfileCard userData={userData} totalactitivuty={myLevels} />
            <QuickNavigation />
            <IndividualTabs userData={userData} />
            <LogoutButton />
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
