"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import {
  VerifiedIcon,
  ProfileDP,
  LevelTwo,
  LevelOne,
  LevelThree,
  ProfilePlaceHolderOne,
} from "@/public/Images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PopupFooter } from "@/app/Sections";
import ReferralCard from "@/app/Sections/Profile/ReferralCard";
import LevelCard from "@/app/Sections/Profile/LevelCard";
import Link from "next/link";
import { GraphQLClient, gql } from "graphql-request";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import Head from "next/head";
import AchievementBadge from "@/app/Sections/Profile/AchievementBadge";
import { AcheievemnetData } from "@/app/constant/menu";
import { fetchBadges, getPublishedBadge } from "@/lib/hygraph";

/**
 * @Main_account
 */
const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});

const GET_ACCOUNT_BY_EMAIL = gql`
  query GetAccountByEmail($email: String!) {
    account(where: { email: $email }) {
      id
      name
      username
      email
      profilePicture {
        url
      }
      isVerified
    }
  }
`;

const MyLevel = ({ userID }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivities = async () => {
    const query = `
      query GetUserActivities($relationalFirst: Int, $where: AccountWhereUniqueInput!) {
        values: account(where: $where) {
          id
          username
          myActivity(first: $relationalFirst) {
            id
            title
            documentInStages(includeCurrent: true) {
              id
              stage
              updatedAt
              publishedAt
            }
          }
        }
      }
    `;

    const variables = {
      relationalFirst: 10,
      where: { id: userID },
    };

    try {
      const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      } else {
        setActivities(result.data.values.myActivity);
      }
    } catch (error) {
      setError("Error fetching activities: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [userID]);

  const getUserLevel = (activityCount) => {
    if (activityCount >= 0 && activityCount <= 5) {
      return 1; // Level 1
    } else if (activityCount > 5 && activityCount <= 10) {
      return 2; // Level 2
    } else if (activityCount > 10 && activityCount <= 15) {
      return 3; // Level 3
    } else if (activityCount > 15 && activityCount <= 20) {
      return 4; // Level 4
    } else if (activityCount > 20 && activityCount <= 25) {
      return 5; // Level 5
    } else {
      return "Max Level"; // More than 25
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const userLevel = getUserLevel(activities.length);
  const progressPercentage = (activities.length / 25) * 100;

  return (
    <div className="flex w-full flex-col justify-start items-center gap-2">
      <div className="w-full claracontainer flex flex-row gap-2 justify-start items-center">
        <div className="text-[#3f3a64] clarabodyTwo">
          User Level: {userLevel}
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
                    <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                      My{" "}
                    </span>
                    <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                      Level
                    </span>
                  </div>
                </DialogTitle>
              </div>
            </DialogHeader>
            <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
              <div className="flex flex-col justify-center items-center w-full claracontainer gap-4">
                <LevelCard level="Level 1" activities="5" />
                <LevelCard level="Level 2" activities="10" />
                <LevelCard level="Level 3" activities="15" />
                <LevelCard level="Level 4" activities="20" />
                <LevelCard level="Level 5" activities="25" />
              </div>
            </DialogDescription>
            {/* <DialogFooter className="sticky  rounded-t-[16px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bottom-0 m-0 w-full px-4 bg-[#ffffff]">
              <PopupFooter PrimaryText="Save and Continue" />
            </DialogFooter> */}
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
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: "#f15c57",
              height: "10px",
              borderRadius: "5px",
            }}
          ></div>
        </div>
        <p className="clarabodyTwo flex gap-1 w-[max-content] lg:min-w-[120px] ">
          <p className="clarabodyTwo hidden w-[max-content] lg:flex">
            Activities:
          </p>{" "}
          {activities.length}
        </p>
      </div>
      {/* <p style={{ marginTop: "5px", color: "#555" }}>
        {Math.round(progressPercentage)}% completed
      </p> */}
    </div>
  );
};

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

const BadgesDisplay = ({ userId }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch(HYGRAPH_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HYGRAPH_TOKEN}`, // Use your token here
          },
          body: JSON.stringify({
            query: `
              query GetUserWithBadges($userId: ID!) {
                account(where: { id: $userId }) {
                  myBadge {
                    id
                    name
                    description
                    icon {
                      url
                    }
                  }
                }
              }
            `,
            variables: { userId },
          }),
        });

        const { data, errors } = await response.json();

        if (errors) {
          throw new Error(errors[0].message);
        }

        setBadges(data.account.myBadge);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex w-full overflow-x-scroll scrollbar-hidden gap-1">
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
                  className="w-[60px] h-[60px] object-cover flex"
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
      </div>
    </div>
  );
};

const DisplayAllBadges = () => {
  const [allBadges, setAllBadges] = useState([]);
  useEffect(() => {
    const fetchBadges = async () => {
      const data = await getPublishedBadge();
      console.log("allBadges Data", data);
      setAllBadges(data);
    };

    fetchBadges();
  }, []);
  if (!allBadges || allBadges.length === 0) {
    return <div>No Badges found!</div>;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-1">
        {allBadges.length > 0 ? (
          <div className="flex w-full overflow-x-scroll scrollbar-hidden gap-2">
            {allBadges.map((badge) => {
              const randomWidth = Math.floor(Math.random() * 46) + 10; // Random number between 10 and 100
              return (
                <div
                  className="flex cursor-pointer flex-col justify-start items-center w-fit max-w-[160px] min-w-[120px] gap-2"
                  key={badge.id}
                >
                  <Image
                    width={80}
                    height={80}
                    className="min-w-[80px] min-h-[80px] object-cover"
                    src={badge.icon.url}
                    alt={badge.icon.fileName}
                  />
                  {/* Progress Bar */}
                  <div className="w-full max-w-[80px] h-1 bg-[#bfbfbf]  rounded">
                    <div
                      className="h-full bg-red rounded"
                      style={{ width: `${randomWidth}%` }} // Set random width
                    />
                  </div>
                  <h2 className="w-full text-center text-sm text-[#000000] font-normal font-fredoka leading-tight">
                    {badge.name.length > 16
                      ? badge.name.slice(0, 16) + "..."
                      : badge.name}
                  </h2>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No badges found.</p>
        )}
      </div>
    </>
  );
};

export default async function Achievement() {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (session && session.user) {
      fetchUserData(session.user.email);
    }
  }, [session]);

  const fetchUserData = async (email) => {
    try {
      const data = await client.request(GET_ACCOUNT_BY_EMAIL, { email });
      setProfileData(data.account);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Profile - Kindilearning</title>
        <meta name="description" content="Your profile page on Kindilearning" />
        <meta property="og:title" content="Profile - Kindilearning" />
        <meta
          property="og:description"
          content="Your profile page on Kindilearning"
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://kindilearning.com/profile" />
        <meta property="og:site_name" content="Kindilearning" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Profile - Kindilearning" />
        <meta
          name="twitter:description"
          content="Your profile page on Kindilearning"
        />
        <meta name="twitter:image" content="/images/logo.png" />
      </Head>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        {/* Topbar */}
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Profile Acheievemnet
          </div>
        </div>
        <div className="claracontainer bg-[#F5F5F5] md:bg-[#EAEAF5] -mt-4 rounded-t-[12px] z-2 lg:m-12 px-4 py-6 rounded-xl md:px-2 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
          {/* Top Profile Card */}
          <div className="w-full flex bg-[white] rounded-[24px] p-2 md:p-4 justify-start items-start gap-[4px] lg:gap-[12px] lg:items-center">
            <div className="w-fit lg:max-w-[160px] lg:w-full items-center flex justify-start">
              {profileData ? (
                <>
                  <div className="relative w-20 h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                    <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
                      <Image
                        src={profileData.profilePicture?.url || ProfilePlaceHolderOne}
                        alt="User DP"
                        width={100}
                        height={100}
                        className="w-[72px] h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={ProfileDP}
                  alt="Logo"
                  className="rounded-full border-2 lg:w-full lg:h-full border-red w-[48px] h-[48px]"
                />
              )}
            </div>
            <div className="w-full gap-4 flex flex-col justify-center">
              <div className="flex flex-row justify-between items-start w-full">
                {profileData ? (
                  <div className="flex flex-col w-full justify-start items-start">
                    <div className="flex gap-1 items-center w-full justify-start">
                      <h2 className="text-[#029871] text-[20px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold font-fredoka leading-tight">
                        {profileData.name}
                      </h2>
                      {profileData.isVerified && (
                        <span
                          className="ml-2 text-[#255825]"
                          title="Verified User"
                        >
                          <Image
                            src={VerifiedIcon}
                            alt="VerifiedIcon"
                            className="w-[20px] h-[20px] lg:h-[30px] lg:w-[30px]"
                          />
                        </span>
                      )}
                    </div>
                    <p className="font-fredoka text-[12px] lg:text-[20px]">
                      Email: {profileData.email}
                    </p>
                  </div>
                ) : (
                  <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                    John Doe
                  </h2>
                )}
                {/* Trigger for the Edit Profile Popup */}
                <Link
                  href="/profile/update"
                  className="hidden lg:flex"
                  target="_blank"
                >
                  <Badge
                    className="text-[10px] md:text-[16px] cursor-pointer"
                    variant="outline"
                  >
                    Edit
                  </Badge>
                </Link>
              </div>
              <div className="flex flex-col w-full gap-1 items-start justify-start">
                <div className="flex flex-row w-full justify-start items-start gap-2">
                  {/* Trigger for the Level Popup */}
                  {profileData ? <MyLevel userID={profileData.id} /> : null}
                </div>
              </div>
            </div>
          </div>

          {/* AcheievemnetData Section */}
          <div className="flex flex-col w-full gap-12">
            <div className="flex flex-col w-full gap-2">
              <div className="text-[#0a1932] text-2xl font-medium font-fredoka w-full">
                Your acievements
              </div>
              <div className="flex w-full overflow-x-scroll scrollbar-hidden gap-1">
                {profileData ? (
                  <BadgesDisplay userId={profileData.id} />
                ) : (
                  // v
                  <p className="clarabodyTwo">not found</p>
                )}
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
      </section>
    </>
  );
}
