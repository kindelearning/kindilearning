"use client";

import { progressData } from "@/app/constant/menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfilePlaceHolderOne } from "@/public/Images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getPublishedMileStone, getUserDataByEmail } from "@/lib/hygraph";
import { useAuth } from "@/app/lib/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StockImages } from "@/app/constant/profile";

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

export const mileStoneCustomData = [
  {
    id: 1,
    title: "Custom Title 01",
  },
  {
    id: 2,
    title: "Custom Title 02",
  },
  {
    id: 3,
    title: "Custom Title 03",
  },
  {
    id: 4,
    title: "Custom Title 04",
  },
  {
    id: 5,
    title: "Custom Title 05",
  },
  {
    id: 6,
    title: "Custom Title 06",
  },
  {
    id: 7,
    title: "Custom Title 05",
  },
  {
    id: 8,
    title: "Custom Title 06",
  },
];
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

const MilestoneCompleteButton = ({ userId, milestoneId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMilestoneCompletion = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/mark-milestone-completed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, milestoneId }),
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error completing milestone:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={`rounded-2xl font-fredoka text-white shadow border-2 border-white ${
        loading
          ? "opacity-50 cursor-not-allowed bg-red"
          : success
          ? "bg-purple hover:bg-purple"
          : "bg-red hover:bg-red-600"
      }`}
      onClick={handleMilestoneCompletion}
      disabled={loading || success}
    >
      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
            />
          </svg>
          Loading...
        </span>
      ) : success ? (
        "Milestone Completed"
      ) : (
        "Mark as Completed"
      )}
    </Button>
  );
};

const DisplayAllMileStone = () => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const data = await getPublishedMileStone();
        console.log("Fetched milestones:", data);
        setMilestones(data);
      } catch (err) {
        setError("Error fetching milestones.");
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);
  console.log("Milestones state:", milestones);

  if (!Array.isArray(milestones)) {
    return <p>Error: Expected milestones to be an array.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <TrigSnakeCurve amplitude={7} mileStoneCustomData={milestones} />
      <CurvePath milestones={milestones} />
    </>
  );
};

const CurvePath = ({ milestones = [] }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");

  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
    const savedMessage = localStorage.getItem("milestoneMessage");
    if (savedMessage) {
      setMessage(savedMessage);
    }
  }, []);

  // Dynamically set container height based on the number of nodes
  const nodeSpacing = 200; // Define the desired spacing between nodes
  const containerHeight = (milestones.length - 1) * nodeSpacing + 300; // Increased padding for better layout
  const baseAmplitude = 40; // Double the base amplitude for a larger curve
  const frequency = 0.2; // Frequency of the wave

  // State for container width
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Set the container width after the component mounts
    setContainerWidth(window.innerWidth);

    // Optionally handle resizing
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once after mount

  // Generate nodes and paths
  const nodes = [];
  const paths = [];

  // Loop through milestones data
  for (let i = 0; i < milestones.length; i++) {
    const milestone = milestones[i];

    // Position calculation:
    // - Center the first and last nodes
    // - Alternate the others to the left and right
    const top = i * nodeSpacing;
    const left =
      i === 0 || i === milestones.length - 1
        ? containerWidth / 2 // Center for first and last nodes
        : i % 2 === 0
        ? containerWidth * 0.3 // Left for even
        : containerWidth * 0.7; // Right for odd

    // Calculate button positioning adjustments
    const buttonTop = top + 60; // Adjust top spacing
    const buttonLeft = left - 110; // Adjust left spacing

    // Add node to nodes array
    nodes.push(
      <div
        key={milestone.id}
        style={{
          position: "absolute",
          top: `${buttonTop}px`,
          left: `${buttonLeft}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Dialog className="p-2 lg:p-4">
          <DialogTrigger>
            <button className="transition duration-300 ease-in-out hover:scale-[1.03] font-fredoka tracking-wider md: uppercase font-bold text-[10px] md:text-[16px] hover:border-2 hover:border-[#ffffff] border-transparent md:px-8 xl:px-12 border-2 rounded-[12px] bg-red px-4 py-2 hover:shadow text-white hover:bg-hoverRed">
              {milestone.title}
            </button>
          </DialogTrigger>
          <DialogContent className="w-full bg-[#eaeaf5] p-0 lg:min-w-[800px] ">
            <DialogHeader className="p-4">
              <DialogDescription className="w-full p-4 flex flex-col gap-4 justify-start items-start">
                <div className="text-[#0a1932] claraheading">
                  {milestone.title}
                </div>
                <div className="w-full text-[#4a4a4a] clarabodyTwo justify-center items-center">
                  {milestone.description}
                </div>
                <div className="w-full p-2 flex flex-col gap-2 bg-white rounded-lg shadow">
                  <div className="text-[#757575] clarabodyTwo ">
                    Date of Completion
                  </div>
                  <div className="text-[#0a1932] text-[20px] font-normal font-fredoka leading-[20px]">
                    {currentDate}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-between py-4 flex flex-row">
                <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-[20px] md:text-[24px] font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
                    <ChevronLeft className="w-[24px] h-[24px]" />
                    Back
                  </Button>
                </div>
                <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  {user && hygraphUser ? (
                    <MilestoneCompleteButton
                      milestoneId={milestone.id}
                      userId={hygraphUser.id}
                      // userId="cm25lil0t0zvz07pfuuizj473"
                    />
                  ) : (
                    <Button className="clarabutton">Login First!</Button>
                  )}
                </div>
              </section>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );

    // Add path to paths array, skip the first node
    if (i > 0) {
      const previousTop = (i - 1) * nodeSpacing;
      const previousLeft =
        i - 1 === 0 || i - 1 === milestones.length - 1
          ? containerWidth / 2
          : (i - 1) % 2 === 0
          ? containerWidth * 0.3
          : containerWidth * 0.7; // Alternate positions

      // Control points to make the curve bend at the nodes
      const controlPointX1 =
        previousLeft +
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20);
      const controlPointY1 =
        previousTop + (top - previousTop) / 2 + Math.sin(i * frequency) * 20;
      const controlPointX2 =
        left -
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20);
      const controlPointY2 =
        previousTop + (top - previousTop) / 2 - Math.sin(i * frequency) * 20;

      // Create a cubic Bezier curve using the 'C' command
      const pathD = `M ${previousLeft} ${previousTop} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${left} ${top}`;

      paths.push(
        <path
          key={`path-${milestone.id}`}
          d={pathD}
          fill="none"
          stroke="#f05c5c"
          strokeWidth="4"
          strokeDasharray="5,5" // Dotted line
        />
      );
    }
  }

  return (
    <div
      className="relative w-full hidden md:flex h-full pb-24 bg-gray-100 overflow-hidden"
      style={{ minHeight: `${containerHeight}px` }}
    >
      {/* SVG for drawing paths */}
      <svg
        className="absolute bg-[#eaeaf5] top-0 left-0 w-full h-full"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        preserveAspectRatio="none"
      >
        {paths}
      </svg>
      {nodes}
    </div>
  );
};
const MobileCurvePath = ({ milestones = [] }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");

  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
    const savedMessage = localStorage.getItem("milestoneMessage");
    if (savedMessage) {
      setMessage(savedMessage);
    }
  }, []);

  // Dynamically set container height based on the number of nodes
  const nodeSpacing = 200; // Define the desired spacing between nodes
  const containerHeight = (milestones.length - 1) * nodeSpacing + 300; // Increased padding for better layout
  const baseAmplitude = 40; // Double the base amplitude for a larger curve
  const frequency = 0.2; // Frequency of the wave

  // State for container width
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Set the container width after the component mounts
    setContainerWidth(window.innerWidth);

    // Optionally handle resizing
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once after mount

  // Generate nodes and paths
  const nodes = [];
  const paths = [];

  // Loop through milestones data
  for (let i = 0; i < milestones.length; i++) {
    const milestone = milestones[i];

    // Position calculation:
    // - Center the first and last nodes
    // - Alternate the others to the left and right
    const top = i * nodeSpacing;
    const left =
      i === 0 || i === milestones.length - 1
        ? containerWidth / 2 // Center for first and last nodes
        : i % 2 === 0
        ? containerWidth * 0.3 // Left for even
        : containerWidth * 0.7; // Right for odd

    // Calculate button positioning adjustments
    const buttonTop = top + 60; // Adjust top spacing
    const buttonLeft = left - 110; // Adjust left spacing

    // Add node to nodes array
    nodes.push(
      <div
        key={milestone.id}
        style={{
          position: "absolute",
          top: `${buttonTop}px`,
          left: `${buttonLeft}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Dialog className="p-2 lg:p-4">
          <DialogTrigger>
            <button className="transition duration-300 ease-in-out hover:scale-[1.03] font-fredoka tracking-wider md: uppercase font-bold text-[10px] md:text-[16px] hover:border-2 hover:border-[#ffffff] border-transparent md:px-8 xl:px-12 border-2 rounded-[12px] bg-red px-4 py-2 hover:shadow text-white hover:bg-hoverRed">
              {milestone.title}
            </button>
          </DialogTrigger>
          <DialogContent className="w-full bg-[#eaeaf5] p-0 lg:min-w-[800px] ">
            <DialogHeader className="p-4">
              <DialogDescription className="w-full p-4 flex flex-col gap-4 justify-start items-start">
                <div className="text-[#0a1932] claraheading">
                  {milestone.title}
                </div>
                <div className="w-full text-[#4a4a4a] clarabodyTwo justify-center items-center">
                  {milestone.description}
                </div>
                <div className="w-full p-2 flex flex-col gap-2 bg-white rounded-lg shadow">
                  <div className="text-[#757575] clarabodyTwo ">
                    Date of Completion
                  </div>
                  <div className="text-[#0a1932] text-[20px] font-normal font-fredoka leading-[20px]">
                    {currentDate}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-between py-4 flex flex-row">
                <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-[20px] md:text-[24px] font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
                    <ChevronLeft className="w-[24px] h-[24px]" />
                    Back
                  </Button>
                </div>
                <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  {user && hygraphUser ? (
                    <MilestoneCompleteButton
                      milestoneId={milestone.id}
                      userId={hygraphUser.id}
                      // userId="cm25lil0t0zvz07pfuuizj473"
                    />
                  ) : (
                    <Button className="clarabutton">Login First!</Button>
                  )}
                </div>
              </section>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );

    // Add path to paths array, skip the first node
    if (i > 0) {
      const previousTop = (i - 1) * nodeSpacing;
      const previousLeft =
        i - 1 === 0 || i - 1 === milestones.length - 1
          ? containerWidth / 2
          : (i - 1) % 2 === 0
          ? containerWidth * 0.3
          : containerWidth * 0.7; // Alternate positions

      // Control points to make the curve bend at the nodes
      const controlPointX1 =
        previousLeft +
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20);
      const controlPointY1 =
        previousTop + (top - previousTop) / 2 + Math.sin(i * frequency) * 20;
      const controlPointX2 =
        left -
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20);
      const controlPointY2 =
        previousTop + (top - previousTop) / 2 - Math.sin(i * frequency) * 20;

      // Create a cubic Bezier curve using the 'C' command
      const pathD = `M ${previousLeft} ${previousTop} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${left} ${top}`;

      paths.push(
        <path
          key={`path-${milestone.id}`}
          d={pathD}
          fill="none"
          stroke="#f05c5c"
          strokeWidth="4"
          strokeDasharray="5,5" // Dotted line
        />
      );
    }
  }

  return (
    <div
      className="relative flex md:hidden w-full h-full pb-24 bg-gray-100 overflow-hidden"
      style={{ minHeight: `${containerHeight}px` }}
    >
      {/* SVG for drawing paths */}
      <svg
        className="absolute bg-[#eaeaf5] top-0 left-0 w-full h-full"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        preserveAspectRatio="none"
      >
        {paths}
      </svg>
      {nodes}
    </div>
  );
};

const TrigSnakeCurve = ({
  amplitude = 6,
  mileStoneCustomData = [],
  step = 0.1,
}) => {
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");
  const numButtons = mileStoneCustomData.length;
  const maxY = numButtons * Math.PI * 2;

  // Getting hygraph User for Auth
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);

  const sinePoints = [];

  for (let y = 0; y < maxY; y += step) {
    const xSine = amplitude * Math.sin(y);
    sinePoints.push({ x: xSine, y: -y });
  }


  if (!mileStoneCustomData || mileStoneCustomData.length === 0) {
    return <div>No data available</div>;
  }

  

  // Current Date
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
    const savedMessage = localStorage.getItem("milestoneMessage");
    if (savedMessage) {
      setMessage(savedMessage);
    }
  }, []);

  const extremePositions = [];

  for (let i = Math.PI / 2; i < maxY; i += Math.PI) {
    if (extremePositions.length >= numButtons) break;
    const xExtreme = amplitude * Math.sin(i);
    extremePositions.push({ x: xExtreme, y: -i });
  }

  // Assume a scaling factor for SVG to DOM transformation
  const scaleX = 10; // Adjust these scaling factors as necessary for your use case
  const scaleY = 10;

  return (
    <div
      className="h-full flex md:hidden relative"
      style={{ width: "100%", position: "relative" }}
    >
      <svg
        viewBox={`-10 -${maxY / 2} 20 ${maxY}`}
        width="100%"
        className="min-h-[700px]"
        height="100%"
      >
        <path
          d={sinePoints
            .map(
              (point, index) =>
                `${index === 0 ? "M" : "L"} ${point.x},${point.y}`
            )
            .join(" ")}
          stroke="#f05c5c"
          strokeWidth="0.1"
          strokeDasharray="0.2,0.2"
          fill="none"
        />
        {extremePositions.map((pos, index) => (
          <g key={index}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r="0.4"
              className="cursor-pointer"
              fill="#f05c5c"
            />
          </g>
        ))}
      </svg>

      {/* Non-SVG Elements Positioned Based on Extreme Points */}
      {extremePositions.map((pos, index) => (
        <div
          key={`non-svg-${index}`}
          style={{
            position: "absolute",
            left: `calc(50% + ${pos.x * scaleX * 2}px)`, // Adjust position based on SVG-to-DOM conversion
            top: `calc(50% + ${pos.y * scaleY * 2}px)`,
            transform: "translate(-50%, -50%)", // Center the element at the calculated position
          }}
        >
          <Dialog className="p-2 lg:p-4">
            <DialogTrigger>
              <button
                className="text-[12px] min-w-[60px] max-w-[80px] w-full rounded-sm px-2 bg-red text-white" /* className="bg-red px-2 py-1 rounded" */
              >
                {mileStoneCustomData[index]?.title || "Action"}
              </button>
            </DialogTrigger>
            <DialogContent className="w-full bg-[#eaeaf5] p-0 lg:min-w-[800px] ">
              <DialogHeader className="p-4">
                <DialogDescription className="w-full p-4 flex flex-col gap-4 justify-start items-start">
                  <div className="text-[#0a1932] claraheading">
                    {mileStoneCustomData[index]?.title}
                  </div>
                  <div className="w-full text-start text-[#4a4a4a] clarabodyTwo justify-center items-center">
                    {mileStoneCustomData[index]?.description ||
                      "Description not found"}
                  </div>
                  <div className="w-full p-2 flex flex-col gap-2 bg-white rounded-lg shadow">
                    <div className="text-[#757575] clarabodyTwo ">
                      Date of Completion
                    </div>
                    <div className="text-[#0a1932] text-[20px] font-normal font-fredoka leading-[20px]">
                      {currentDate}
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-between py-4 flex flex-row">
                  <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                    <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-[20px] md:text-[24px] font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
                      <ChevronLeft className="w-[24px] h-[24px]" />
                      Back
                    </Button>
                  </div>
                  <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                    {user && hygraphUser ? (
                      <MilestoneCompleteButton
                        milestoneId={mileStoneCustomData[index]?.id}
                        userId={hygraphUser.id}
                        // userId="cm25lil0t0zvz07pfuuizj473"
                      />
                    ) : (
                      <Link href="/auth/sign-up" className="clarabutton">
                        Login First!
                      </Link>
                    )}
                  </div>
                </section>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * StockImages.length);
  return StockImages[randomIndex].url;
};

const RandomImageComponentTwo = () => {
  const randomImage = getRandomImage();

  return (
    <Image
      src={randomImage}
      alt="Random Profile Placeholder"
      className="cursor-pointer w-16 h-16"
    />
  );
};
const RandomImageComponent = () => {
  const randomImage = getRandomImage();

  return (
    <div className="relative w-20 h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
      <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
        <Image
          src={randomImage}
          alt="Logo"
          className="w-[80px] h-[80px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
        />
      </div>
    </div>
  );
};

export default function MileStone() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);

  return (
    <>
      <section className="w-full pb-24 h-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer items-center justify-center p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          {/* <UserImages /> */}
          <div className="flex w-full flex-col justify-center items-center">
            <div className="flex w-full h-[160px] flex-row justify-center gap-0 items-center relative">
              {/* <Image
                alt="Kindi"
                src={progressImage01}
                className="cursor-pointer w-20 object-cover rounded-full border-2 border-white -mr-[32px] h-20"
              /> */}
              <RandomImageComponentTwo />
              {user && hygraphUser ? (
                <div className="relative w-20 -mx-[32px] h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                  <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
                    <Image
                      src={
                        hygraphUser.profilePicture?.url || ProfilePlaceHolderOne
                      }
                      alt="User DP"
                      width={100}
                      height={100}
                      className="w-[72px] h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
                    />
                  </div>
                </div>
              ) : (
                <RandomImageComponent />
              )}
              {/* <Image
                alt="Kindi"
                src={progressImage03}
                className="cursor-pointer w-20 -ml-[32px] h-20"
              /> */}
              <RandomImageComponentTwo />
            </div>
            {hygraphUser ? (
              <div className="w-full text-center text-[#0a1932] text-[40px] font-semibold font-fredoka leading-normal">
                {hygraphUser.name}
              </div>
            ) : (
              <div className="flex w-full flex-col justify-center items-center gap-2">
                <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                  Kindi Learner
                </h2>
                <p className="font-fredoka text-[12px] lg:text-[20px]">
                  <Link href="/auth/sign-in" className="text-red">
                    Login&nbsp;
                  </Link>
                  to use more feature
                </p>
              </div>
            )}
          </div>
          {/* <TrigSnakeCurve amplitude={6} numButtons={12} /> */}
          <ProfileRoute />
          <DisplayAllMileStone />
        </div>
      </section>
    </>
  );
}
