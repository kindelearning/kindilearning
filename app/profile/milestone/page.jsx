"use client";

import { cardData, options, progressData } from "@/app/constant/menu";
import { Button } from "@/components/ui/button";
import {
  KindiHeart,
  progressImage01,
  progressImage02,
  progressImage03,
} from "@/public/Images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

/**
 * @Main_account_Credentials
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

const ProfileRoute = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index

  // Function to go to the previous item
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? progressData.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next item
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === progressData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { id, icon, title, backgroundColor } = progressData[currentIndex]; // Get current data

  return (
    <div className="w-full lg:max-w-[340px] cursor-pointer px-4 py-3 gap-2 bg-white rounded-[12px] justify-between items-center inline-flex">
      <ChevronLeft
        className="w-[20px] hover:bg-red hover:text-white rounded-full h-[20px] text-red"
        onClick={handlePrevious}
      />
      <div className="flex w-[max-content] items-center gap-[12px]">
        <div
          className="w-[24px] flex justify-center items-center h-[24px] rounded-[4px]"
          style={{ backgroundColor: `#${backgroundColor}` }}
        >
          <Image alt={title} src={icon} className="w-[16px] h-[16px] p-[1px]" />
        </div>
        <div className="text-[#0a1932] w-[max-content] text-[14px] font-semibold font-fredoka leading-tight">
          {title || "Emotional & Social Strength"}
        </div>
      </div>
      <ChevronRight
        className="w-[20px] hover:bg-red hover:text-white rounded-full h-[20px] text-red"
        onClick={handleNext}
      />
    </div>
  );
};

const MNode = ({
  mName = "Name",
  bgColor = "#029871",
  textColor = "#ffffff",
}) => {
  return (
    <>
      <div className="flex items-center">
        <div
          className={`w-4 h-4 rounded-full mr-2`}
          style={{
            backgroundColor: bgColor,
          }}
        />
        <Button
          className={`px-4 py-2 text-${textColor} rounded-lg`}
          style={{
            backgroundColor: bgColor,
          }}
        >
          {mName}
        </Button>
      </div>
    </>
  );
};

const CurvePath = () => {
  // Number of nodes
  const numberOfNodes = 10;
  const containerHeight = 800; // Height of the container
  const nodeSpacing = containerHeight / (numberOfNodes - 1);
  const containerWidth = 100; // Relative width for calculations (percentage)

  // Generate nodes and paths
  const nodes = [];
  const paths = [];

  for (let i = 0; i < numberOfNodes; i++) {
    // First node starts from top center, rest alternate sides
    const top = i * nodeSpacing;
    const left = i === 0 ? 50 : i % 2 === 0 ? 30 : 70; // First node at 50%, rest alternate

    // Add node to nodes array
    nodes.push(
      <MNode
        key={i}
        mName={`Node ${i + 1}`}
        bgColor="pink-500"
        textColor="white"
        borderColor="pink-700"
      />
    );

    // Add path to paths array, skip the first node
    if (i > 0) {
      const previousTop = (i - 1) * nodeSpacing;
      const previousLeft = i === 1 ? 50 : i % 2 === 0 ? 70 : 30; // Opposite side of the current node

      // Control points to make the curve bend at the nodes
      const controlPointX1 = previousLeft; // Control point close to the previous node
      const controlPointY1 = previousTop + (top - previousTop) / 2; // Midway vertically
      const controlPointX2 = left; // Control point close to the current node
      const controlPointY2 = previousTop + (top - previousTop) / 2; // Midway vertically

      // Create a cubic Bezier curve using the 'C' command
      const pathD = `M ${previousLeft} ${previousTop} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${left} ${top}`;

      paths.push(
        <path
          key={`path-${i}`}
          d={pathD}
          fill="none"
          stroke="#f05c5c"
          strokeDasharray="5,5" // Makes the path dotted
        />
      );
    }
  }

  return (
    <div className="relative w-full h-full pb-24 min-h-[1000px] bg-gray-100 overflow-hidden">
      {/* SVG for drawing paths */}
      <svg
        className="absolute bg-[#eaeaf5] top-0 left-0 w-full h-full"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        preserveAspectRatio="none"
      >
        {paths}
      </svg>

      {/* Render nodes */}
      {nodes}
    </div>
  );
};

const GroupChip = ({ options, selectedOption, onChange }) => {
  return (
    <>
      <div className="flex w-full  overflow-x-scroll scrollbar-hidden justify-start items-center space-x-2">
        {options.map((option, index) => (
          <div
            className={`bg-red text-white px-4 py-1 rounded-full min-w-[max-content] cursor-pointer`}
            key={index}
            active={option === selectedOption}
            onClick={() => onChange(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </>
  );
};

export default function MileStone() {
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

  const milestones = [
    {
      name: "Milestone 1",
      bgColor: "green-500",
      textColor: "white",
    },
    {
      name: "Milestone 2",
      bgColor: "blue-500",
      textColor: "white",
    },
    {
      name: "Milestone 3",
      bgColor: "purple-500",
      textColor: "white",
    },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <section className="w-full pb-24 h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer items-center justify-center p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          {/* <UserImages /> */}
          <div className="flex w-full flex-col justify-center items-center">
            <div className="flex w-full h-[160px] flex-row justify-center gap-0 items-center relative">
              <Image
                alt="Kindi"
                src={progressImage01}
                className="cursor-pointer w-20 object-cover rounded-full border-2 border-white -mr-[32px] h-20"
              />
              {profileData ? (
                <Image
                  alt="Kindi"
                  src={profileData.profilePicture?.url}
                  width={100}
                  height={100}
                  className="cursor-pointer w-30 h-30 border-gradient-to-r from-pink-500 to-yellow-500 border-2 border-red rounded-full z-10"
                />
              ) : (
                <Image
                  alt="Kindi"
                  src={progressImage02}
                  width={100}
                  height={100}
                  className="cursor-pointer w-30 rounded-full border-2 border-white z-10 h-30"
                />
              )}
              <Image
                alt="Kindi"
                src={progressImage03}
                className="cursor-pointer w-20 -ml-[32px] h-20"
              />
            </div>
            {profileData ? (
              <div className="w-full text-center text-[#0a1932] text-[40px] font-semibold font-fredoka leading-normal">
                {profileData.name}
              </div>
            ) : (
              <div className="w-full text-center text-[#0a1932] text-[40px] font-semibold font-fredoka leading-normal">
                Jacob
              </div>
            )}
          </div>
          <ProfileRoute />
          <GroupChip
            options={options}
            selectedOption={selectedOption}
            onChange={handleOptionChange}
          />
          {/* Curved Path */}
          <div className="flex flex-col w-full px-4 rounded-md justify-center items-center">
            <CurvePath />
          </div>
        </div>
      </section>
    </>
  );
}
