"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { VerifiedIcon, ProfileDP } from "@/public/Images";
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

/**
 *
 * @param {MyActivity completed by User} param0
 * @returns
 */
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
      </div>
      <div className="flex w-full gap-1 items-center">
        <div
          className="progress-bar-container"
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
            // marginTop: "10px",
            // color:'#f15c57'
          }}
        >
          <div
            className="progress-bar"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: "#f15c57",
              height: "10px",
              borderRadius: "5px",
              // color:'#f15c57'
            }}
          ></div>
        </div>
        <p className="clarabodyTwo w-[max-content] min-w-[120px]">
          Activities: {activities.length}
        </p>
      </div>
      {/* <p style={{ marginTop: "5px", color: "#555" }}>
        {Math.round(progressPercentage)}% completed
      </p> */}
    </div>
  );
};

/**
 *
 * @returns Badge Data
 */

const badges = [
  {
    name: "Five-day Stretch",
    description:
      "Looks like someone has been busy. You’ve completed at least 7 activities in over 5 days. Look at you go!",
    condition: (activities) => {
      const daysCount = new Set(
        activities.map((activity) => activity.date.split("T")[0])
      ); // Assuming activity has a date property
      const completedActivities = activities.filter(
        (activity) => activity.completed
      );
      return completedActivities.length >= 7 && daysCount.size > 5;
    },
  },
  {
    name: "Witching Hour Hero",
    description:
      "Phew! Those hours of twilight before bedtime can be tough. Keep going. You’ve completed at least 3 activities between 5pm and 7pm. What a hero!",
    condition: (activities) => {
      const eveningActivities = activities.filter((activity) => {
        const hour = new Date(activity.date).getHours();
        return hour >= 17 && hour < 19 && activity.completed; // Assuming activity has a completed property
      });
      return eveningActivities.length >= 3;
    },
  },
  {
    name: "Sleep Thief Warrior",
    description:
      "Sleep is overrated anyway! You have completed at least 5 activities in the dead of night. You growth gladiator!",
    condition: (activities) => {
      const nightActivities = activities.filter((activity) => {
        const hour = new Date(activity.date).getHours();
        return hour >= 0 && hour < 6 && activity.completed; // Assuming activity has a completed property
      });
      return nightActivities.length >= 5;
    },
  },
  // Add other badges in a similar way...
];

const BadgeDisplay = ({ userID }) => {
  const [activities, setActivities] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);

  const fetchActivities = async () => {
    // Your existing fetch logic to get user activities...
  };

  useEffect(() => {
    fetchActivities();
  }, [userID]);

  useEffect(() => {
    if (activities.length) {
      const badges = getEarnedBadges(activities);
      setEarnedBadges(badges);
    }
  }, [activities]);

  return (
    <div>
      <h2>Earned Badges</h2>
      <div>
        {earnedBadges.length ? (
          earnedBadges.map((badge) => (
            <div key={badge.name}>
              <h3>{badge.name}</h3>
              <p>{badge.description}</p>
            </div>
          ))
        ) : (
          <p>No badges earned yet!</p>
        )}
      </div>
    </div>
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
                        src={profileData.profilePicture?.url}
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
                <div className="flex flex-row w-full justify-start items-center gap-2">
                  {/* Trigger for the Level Popup */}
                  {profileData ? <MyLevel userID={profileData.id} /> : null}
                  <Link
                    href="/profile/update"
                    className="flex lg:hidden"
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
              </div>
            </div>
          </div>
          {profileData ? (
            <BadgeDisplay userID={profileData.id} />
          ) : (
            <p className="clarabodyTwo">not found</p>
          )}

          {/* AcheievemnetData Section */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-2">
              <div className="text-[#0a1932] text-2xl lg:text-4xl font-medium font-fredoka w-full">
                Your acievements
              </div>
              <div className="flex w-full overflow-x-scroll scrollbar-hidden gap-1">
                {AcheievemnetData.map((achievement, index) => (
                  <AchievementBadge
                    key={index}
                    image={achievement.image}
                    title={achievement.title}
                    level={achievement.level}
                    backgroundColor={achievement.backgroundColor}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="text-[#0a1932] text-2xl lg:text-4xl font-medium font-fredoka w-full">
                To Be Completed
              </div>
              <div className="flex w-full overflow-x-scroll scrollbar-hidden gap-1">
                {AcheievemnetData.map((achievement, index) => (
                  <AchievementBadge
                    key={index}
                    image={achievement.image}
                    title={achievement.title}
                    level={achievement.level}
                    backgroundColor={achievement.backgroundColor}
                  />
                ))}
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
