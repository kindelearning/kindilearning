"use client";

import { AcheievemnetData } from "@/app/constant/menu";
import { PopupFooter } from "@/app/Sections";
import AchievementBadge from "@/app/Sections/Profile/AchievementBadge";
import LevelCard from "@/app/Sections/Profile/LevelCard";
import ReferralCard from "@/app/Sections/Profile/ReferralCard";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { ProfileDP } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { useSession } from "next-auth/react";

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

const Achievement = async () => {
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
      <section className="w-full h-auto pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          {/* Top Profile Card */}
          <div className="w-full flex bg-[white] rounded-[24px] p-2 md:p-4 justify-start gap-[4px] lg:gap-[12px]  items-center">
            <div className="w-fit lg:max-w-[160px] lg:w-full items-center flex justify-start">
              {profileData ? (
                <>
                  <div className="relative w-36 h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      <Image
                        src={profileData.profilePicture?.url}
                        alt="User DP"
                        width={100}
                        height={100}
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <p>No profile data found</p>
              )}
            </div>
            <div className="w-full gap-4 flex flex-col justify-center">
              <div className="flex flex-row justify-between items-center w-full">
                {profileData ? (
                  <div className="flex flex-col w-full justify-start items-start">
                    <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                      {profileData.name}
                    </h2>
                    <p className="font-fredoka">Email: {profileData.email}</p>
                  </div>
                ) : (
                  <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                    John Doe
                  </h2>
                )}
                {/* Trigger for the Edit Profile Popup */}
                <Link href="/profile/edit">
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
                  <div className="text-[#3f3a64] text-[16px] md:text-[20px] lg:text-[24px] xl:text-[20px] font-medium font-montserrat leading-none">
                    Level 1
                  </div>
                  {/* Trigger for the Level Popup */}
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
                      <DialogFooter className="sticky  rounded-t-[16px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bottom-0 m-0 w-full px-4 bg-[#ffffff]">
                        <PopupFooter PrimaryText="Save and Continue" />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="w-full flex flex-row justify-between items-center gap-2">
                  <Slider
                    defaultValue={[33]}
                    max={100}
                    className="h-[8px] text-[#3a3a89]"
                    step={10}
                  />{" "}
                  Activities
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Section */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-2">
              <div className="text-[#0a1932] text-2xl lg:text-4xl font-medium font-fredoka w-full">
                Your achievements
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

          {/* Referral Card */}
          <div className="claracontainer px-0 w-full flex flex-col justify-start items-start overflow-hidden gap-8">
            <ReferralCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Achievement;
