"use client";

import { useAuth } from "@/app/lib/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserDataByEmail } from "@/lib/hygraph";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MilestoneCompleteButton from "./MilestoneCompleteButton";
import { getPublishedMileStone } from "@/lib/hygraph";
import Link from "next/link";
import { activityIcons } from "@/app/constant/menu";
import Image from "next/image";

export function CurvePath({ milestones = [], currentUserId }) {
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
            <button className="transition duration-300 ease-in-out hover:scale-[1.03] font-fredoka tracking-wider font-bold text-[10px] md:text-[16px] hover:bg-purple hover:border-2 hover:border-[#ffffff] border-transparent md:px-6 border-2 rounded-[12px] bg-red px-4 py-2 hover:shadow text-white">
              {milestone.title}
            </button>
          </DialogTrigger>
          <DialogContent className="w-full bg-[#eaeaf5] p-0 lg:min-w-[800px] ">
            <DialogHeader className="p-4">
              <DialogTitle></DialogTitle>
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
                      // userId={hygraphUser.id}
                      userId={currentUserId}
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
}

export const TrigSnakeCurve = ({
  amplitude = 6,
  mileStoneCustomData = [],
  step = 0.1,
  currentUserId,
}) => {
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");
  const numButtons = mileStoneCustomData.length;
  const maxY = numButtons * Math.PI * 2;

  // Getting Hygraph User for Auth
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

  if (!mileStoneCustomData || mileStoneCustomData.length === 0) {
    return <div>No data available</div>;
  }

  const sinePoints = [];
  for (let y = 0; y < maxY; y += step) {
    const xSine = amplitude * Math.sin(y);
    sinePoints.push({ x: xSine, y: -y });
  }

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
              <button className="text-[12px] min-w-[60px] max-w-[80px] w-full rounded-sm px-2 bg-red text-white">
                {mileStoneCustomData[index]?.title || "Action"}
              </button>
            </DialogTrigger>
            <DialogContent className="w-full bg-[#eaeaf5] p-0 lg:min-w-[800px]">
              <DialogHeader className="p-4">
                <DialogTitle></DialogTitle>
                <DialogDescription className="w-full p-4 flex flex-col gap-4 justify-start items-start">
                  <div className="text-[#0a1932] claraheading">
                    {mileStoneCustomData[index]?.title}
                  </div>
                  <div className="w-full text-start text-[#4a4a4a] clarabodyTwo justify-center items-center">
                    {mileStoneCustomData[index]?.description ||
                      "Description not found"}
                  </div>
                  <div className="w-full p-2 flex flex-col gap-2 bg-white rounded-lg shadow">
                    <div className="text-[#757575] clarabodyTwo">
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
                        userId={currentUserId}
                        // userId={hygraphUser.id}
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

const OptionSlider = ({
  options,
  selectedOption,
  onSelect,
  visibleCount = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? options.length - visibleCount : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === options.length - visibleCount ? 0 : prevIndex + 1
    );
  };

  // Automatically select the option when it becomes visible
  useEffect(() => {
    const currentOption = options[currentIndex];
    if (currentOption && currentOption.title !== selectedOption) {
      onSelect(currentOption.title);
    }
  }, [currentIndex, options, selectedOption, onSelect]);

  return (
    <div className="flex items-center w-full justify-between gap-1">
      <button
        onClick={handlePrev}
        className="w-[32px] h-[32px] flex justify-center items-center left-0 top-1/2 transform bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
      >
        <ChevronLeft />
      </button>
      <div className="flex w-full justify-center">
        {options
          .slice(currentIndex, currentIndex + visibleCount)
          .map(({ title, icon }, index) => (
            <div
              key={index}
              className={`px-4 py-2 w-full max-w-[260px] rounded-full gap-2 bg-white transition duration-200 flex items-center ${
                title === selectedOption ? "text-gray-800" : "text-gray-500"
              }`}
            >
              <Image className="w-[24px] h-[24px]" src={icon} />
              <span className="font-fredoka min-w-[max-content] font-semibold">
                {title}
              </span>
            </div>
          ))}
      </div>
      <button
        onClick={handleNext}
        className="w-[32px] h-[32px] flex justify-center items-center right-0 top-1/2 transform bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default function DisplayAllMileStone({ passThecurrentUserId }) {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

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

  // Adding Filters for milestone based on Category and subcategory
  const categories = [
    "All",
    ...new Set(milestones.map((m) => m.category || "Uncategorized")),
  ];

  // Extract unique subcategories for the selected category
  const subCategories =
    selectedCategory === "All"
      ? ["All"]
      : [
          "All",
          ...new Set(
            milestones
              .filter((m) => m.category === selectedCategory)
              .map((m) => m.subCategory || "Unspecified")
          ),
        ];

  // Filter milestones based on selected category and subcategory
  const filteredMilestones = milestones.filter((milestone) => {
    const matchesCategory =
      selectedCategory === "All" || milestone.category === selectedCategory;
    const matchesSubCategory =
      selectedSubCategory === "All" ||
      milestone.subCategory === selectedSubCategory;
    return matchesCategory && matchesSubCategory;
  });

  if (!Array.isArray(milestones)) {
    return <p>Error: Expected milestones to be an array.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section className="w-full pb-24 h-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col gap-[20px]">
        <div className="flex w-full lg:max-w-[340px] rounded-[12px] px-2 py-2 bg-white max-w-full  flex-col items-start">
          <OptionSlider
            options={activityIcons}
            selectedOption={selectedCategory}
            onSelect={(value) => {
              setSelectedCategory(value);
              setSelectedSubCategory("All"); // Reset subcategory selection when category changes
            }}
          />
        </div>

        {/* Subcategory Filter as Badge/Chip (conditionally rendered) */}
        {selectedCategory !== "All" && (
          <div className="subcategory-filter mt-4">
            <div className="flex overflow-x-scroll scrollbar-hidden flex-wrap gap-2">
              {subCategories.map((subCategory) => (
                <span
                  key={subCategory}
                  onClick={() => setSelectedSubCategory(subCategory)}
                  className={`cursor-pointer border-white border-2 duration-200 px-4 py-1 rounded-full ${
                    selectedSubCategory === subCategory
                      ? "bg-red text-white"
                      : "bg-gray-200 text-gray-800"
                  } hover:bg-red hover:text-white`}
                  style={{ display: "inline-block", margin: "0.2rem" }}
                >
                  {subCategory}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
      <TrigSnakeCurve
        amplitude={6}
        mileStoneCustomData={filteredMilestones}
        currentUserId={passThecurrentUserId}
      />
      <CurvePath
        milestones={filteredMilestones}
        currentUserId={passThecurrentUserId}
      />
    </>
  );
}
