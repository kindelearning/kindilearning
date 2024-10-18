"use client";

import React, { useEffect, useState } from "react";
import {
  DiscoveringOurWorldActivity,
  ExperimentsMathActivity,
  ReadingWritingActivity,
  SpeechLanguageActivity,
} from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { getAllActivities } from "@/lib/hygraph";
import Head from "next/head";
import Loading from "@/app/loading";

const Days = [
  { value: 1, label: "Sunday" },
  { value: 2, label: "Monday" },
  { value: 3, label: "Tuesday" },
  { value: 4, label: "Wednesday" },
  { value: 5, label: "Thursday" },
  { value: 6, label: "Friday" },
  { value: 7, label: "Saturday" },
];

const filters = [
  {
    label: "Select Learning Area",
    options: [
      "Emotional & Social Strength",
      "Confidence & Independence",
      "Speech & Language",
      "Physical Agility",
      "Reading & Writing",
      "Discovering Our World",
      "Creativity & Imagination",
      "Experiments & Math",
    ],
  },
  {
    label: "Select Skill Category",
    options: [
      "Sensory Development",
      "Mastering Feelings",
      "Listening & Talking",
      "Problem-solving & Independence",
      "Social Play",
      "Fine Motor",
      "GROSS MOTOR",
      "Pretend Play",
      "Crafts",
      "Exploring the Seasons",
      "Outdoors & Nature",
      "Rainy Day Play",
    ],
  },
  {
    label: "Select Theme",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    label: "Select Age Focus",
    options: ["BABY", "TODDLER", "PRE-SCHOOLER", "KINDI"],
  },
  {
    label: "Select Prep Time",
    options: ["5 Minutes", "10 Minutes", "10+ Minutes"],
  },
];

const developmentAreas = [
  "Emotional & Social Strength",
  "Physical Agility",
  "Creativity & Imagination",
  "Confidence & Independence",
  "Reading & Writing",
  "Speech & Language",
  "Discovering our world",
  "Experiments & Math",
];

export default async function ActivitiesPage() {
  const [date, setDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]); // State for selected weekdays
  const [loading, setLoading] = useState(true);

  // Fetch activities on component mount
  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getAllActivities();
      console.log(data); // Log the activities
      setActivities(data);
      setFilteredActivities(data); // Initialize filtered activities with all activities
      setLoading(false);
    };

    fetchActivities();
  }, []);

  // Function to handle filter change
  const handleDayChange = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Filter activities based on selected days
  useEffect(() => {
    if (selectedDays.length === 0) {
      setFilteredActivities(activities); // If no filters are selected, show all activities
    } else {
      const filtered = activities.filter(
        (activity) =>
          Array.isArray(activity.keywords) && // Check if keywords is an array
          activity.keywords.some((keyword) => selectedDays.includes(keyword))
      );
      setFilteredActivities(filtered);
    }
  }, [selectedDays, activities]);

  // Days to filter
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return <div>No activities found!</div>;
  }
  return (
    <>
      <section className="w-full h-auto pb-32 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-0 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          {/* Top Description Section */}
          <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-2">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                SELECT YOUR{" "}
              </span>
              <span className="text-red claraheading uppercase">
                LEARNING ACTI VITY
              </span>
            </div>
            <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
              At Kindi, we&apos;re committed to continuous improvement in our
              pursuit of enjoyable and impactful learning experiences. Each
              month, we retire play activities to introduce enhanced learning
              for the upcoming month. Which one will you select to elevate your
              child&apos;s early-years development?
            </div>
          </div>

          {/* Mobile Filters Button */}
          <div className="claracontainer p-0 w-full flex flex-col lg:hidden overflow-hidden gap-2">
            <div className="flex w-full justify-between items-center gap-1">
              {/* Sort Weekdays */}
              <Drawer className="w-full flex justify-center items-center">
                <DrawerTrigger className="w-full">
                  <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
                    Sort
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="w-full justify-center overflow-clip h-fit items-center flex">
                  <DrawerHeader className="w-full h-full md:h-fit">
                    <DrawerDescription className="flex h-full md:h-fit flex-col pb-6 overflow-y-scroll  justify-start items-start w-full gap-2">
                      <div className="text-red text-2xl font-semibold text-start font-fredoka capitalize leading-[28px]">
                        Sort based on Preferred Week Days
                      </div>
                      <div className="flex flex-col justify-start gap-2 items-start w-full">
                        {weekdays.map((day) => (
                          <div
                            key={day}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="Checkbox"
                              id={`day-${day}`}
                              checked={selectedDays.includes(day)}
                              onChange={() => handleDayChange(day)}
                              className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
                            />
                            <label
                              htmlFor={`day-${day}`}
                              className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {day}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
                    <DrawerClose className="flex w-full justify-between items-center gap-2">
                      <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                        Submit
                      </Button>
                      <Button
                        // onClick={() => window.location.reload()}
                        className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none"
                      >
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              {/* filter */}
              <Drawer className="w-full flex justify-center items-center">
                <DrawerTrigger className="w-full">
                  <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
                    Filter
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="w-full justify-center overflow-clip h-[90vh] md:h-[60vh] items-center flex">
                  <DrawerHeader className="w-full h-full md:h-fit">
                    <DrawerDescription className="flex h-full md:h-fit flex-col py-6 overflow-y-scroll  justify-start items-start w-full gap-2">
                      <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka capitalize leading-[28px]">
                        Adjust your Filters
                      </div>
                      <div className="flex flex-col gap-4 justify-start items-center">
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                          <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                            Learning Areas
                          </div>
                          {/* Badge */}
                          <div className="flex gap-2 flex-wrap">
                            {developmentAreas.map((area, index) => (
                              <Badge
                                key={index}
                                variant={index === 0 ? "filled" : "outline"}
                                className={`text-sm font-normal font-fredoka leading-tight ${
                                  index === 0 ? "bg-[#3f3a64] text-white" : ""
                                }`}
                              >
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                          <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                            Type of Toy
                          </div>
                          {/* Badge */}
                          <div className="flex gap-2 flex-wrap">
                            {developmentAreas.map((area, index) => (
                              <Badge
                                key={index}
                                variant={index === 0 ? "filled" : "outline"}
                                className={`text-sm font-normal font-fredoka leading-tight ${
                                  index === 0 ? "bg-[#3f3a64] text-white" : ""
                                }`}
                              >
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                          <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                            Skills
                          </div>
                          {/* Badge */}
                          <div className="flex gap-2 flex-wrap">
                            {developmentAreas.map((area, index) => (
                              <Badge
                                key={index}
                                variant={index === 0 ? "filled" : "outline"}
                                className={`text-sm font-normal font-fredoka leading-tight ${
                                  index === 0 ? "bg-[#3f3a64] text-white" : ""
                                }`}
                              >
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                          <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
                            Learning Areas
                          </div>
                          {/* Badge */}
                          <div className="flex gap-2 flex-wrap">
                            {developmentAreas.map((area, index) => (
                              <Badge
                                key={index}
                                variant={index === 0 ? "filled" : "outline"}
                                className={`text-sm font-normal font-fredoka leading-tight ${
                                  index === 0 ? "bg-[#3f3a64] text-white" : ""
                                }`}
                              >
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
                    <DrawerClose className="flex w-full justify-between items-center gap-2">
                      <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                        Submit
                      </Button>
                      <Button className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          {/* The Activity & Filters Section */}
          <div className="claracontainer w-full flex flex-row overflow-hidden gap-8">
            {/* Activity grid begin */}
            <div className="flex w-full flex-col gap-2">
              <div className="grid grid-cols-2 w-full gap-2 md:gap-4 justify-between items-start">
                {/* Render filtered activities first */}
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <div key={activity.id}>
                      <article className="rounded-lg ">
                        <Link
                          target="_blank"
                          href={`/p/activities/${activity.id}`}
                        >
                          <div className="md:w-full hover:shadow-md duration-200 min-w-[180px] w-[180px] min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
                            <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
                              <div className="w-full max-w-[180px] lg:max-w-full h-auto">
                                <div className="flex max-h-[180px] min-h-[150px] h-[150px] lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-3xl">
                                  <Image
                                    width={280}
                                    height={250}
                                    alt={activity.title}
                                    className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                                    src={activity.thumbnail.url}
                                  />
                                </div>
                                <div className="w-full p-2 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                                  <div className="flex-col w-full gap-[6px] justify-start items-start">
                                    <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                                      {activity.title}
                                    </div>
                                    <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
                                      <div className="text-[#0a1932] min-w-[max-content] p-0 lg:pl-2 md:text-[18px] md:leading-[22px] font-[500] font-fredoka text-[10px] lg:text-[16px] leading-none">
                                        {activity.setUpTime}
                                      </div>
                                      <ul className="text-[#0a1932] justify-between items-center gap-6 flex px-4 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                        {activity.skills
                                          .slice(0, 2)
                                          .map((skill, index) => (
                                            <li key={index}>
                                              {skill.slice(0, 8)}
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                                    <Image
                                      className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                      src={SpeechLanguageActivity}
                                    />
                                    <Image
                                      className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                      src={DiscoveringOurWorldActivity}
                                    />
                                    <Image
                                      className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                      src={ReadingWritingActivity}
                                    />
                                    <Image
                                      className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                      src={ExperimentsMathActivity}
                                    />
                                    <div
                                      className={`w-[20px] lg:w-[48px] lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
                                    >
                                      <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
                                        +1
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </article>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex flex-col w-full gap-2">
                      <p className="text-red">
                        No activities found for the selected days.
                      </p>
                      <div className="grid grid-cols-2 lg:grid-cols-1 w-full gap-2 md:gap-4 justify-between items-start">
                        {activities.map((activity) => (
                          <div key={activity.id}>
                            <article className="rounded-lg ">
                              <Link
                                target="_blank"
                                href={`/p/activities/${activity.id}`}
                              >
                                <div className="md:w-full hover:shadow-md duration-200 min-w-[180px] w-[180px] min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
                                  <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
                                    <div className="w-full max-w-[180px] lg:max-w-full h-auto  ">
                                      <div className="flex max-h-[180px] min-h-[150px] h-[150px] lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-3xl ">
                                        <Image
                                          width={280}
                                          height={250}
                                          alt={activity.title}
                                          className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl "
                                          src={activity.thumbnail.url}
                                        />
                                      </div>
                                      <div className="w-full p-2 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                                        <div className="flex-col w-full gap-[6px] justify-start items-start">
                                          <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                                            {activity.title}
                                          </div>
                                          <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
                                            <div className="text-[#0a1932] min-w-[max-content] p-0 lg:pl-2 md:text-[18px] md:leading-[22px] font-[500] font-fredoka text-[10px] lg:text-[16px] leading-none">
                                              {activity.setUpTime}
                                            </div>
                                            <ul className="text-[#0a1932] justify-between items-center gap-6 flex px-4 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                              {activity.skills
                                                .slice(0, 2)
                                                .map((skill, index) => (
                                                  <li key={index}>
                                                    {skill.slice(0, 8)}
                                                  </li>
                                                ))}
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                                          <Image
                                            className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                            src={SpeechLanguageActivity}
                                          />
                                          <Image
                                            className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                            src={DiscoveringOurWorldActivity}
                                          />
                                          <Image
                                            className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                            src={ReadingWritingActivity}
                                          />
                                          <Image
                                            className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                            src={ExperimentsMathActivity}
                                          />
                                          <div
                                            className={`w-[20px] lg:w-[48px] lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
                                          >
                                            <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
                                              +1
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </article>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* filters column begin */}
            <div className="lg:flex flex-col hidden min-w-[30%] max-w-[36%] gap-8 w-full justify-start items-start">
              {/* Filter Activity by Days */}
              <div className="flex w-full justify-center items-start gap-4 flex-col">
                <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]">
                  FILTER ACTIVITIES BY Days
                </div>
                <div className="grid grid-cols-2 justify-between gap-2 items-center w-full">
                  {weekdays.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <input
                        type="Checkbox"
                        id={`day-${day}`}
                        checked={selectedDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                        className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
                      />
                      <label
                        htmlFor={`day-${day}`}
                        className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


// Mobile FIlters Still to be added

{
  /** @Filters COde */
}
// const FilterByFeature = () => {
//   return (
//     <>
//       {/* FILTER ACTIVITIES BY FEATURE */}
//       <div className="flex w-full justify-center items-start gap-4 flex-col">
//         <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]">
//           FILTER ACTIVITIES BY FEATURE
//         </div>
//         <div className="flex flex-col gap-2 items-center justify-center w-full">
//           {filters.map((filter, index) => (
//             <Select key={index} className="w-full rounded-lg">
//               <SelectTrigger className="w-full rounded-[32px]">
//                 <SelectValue placeholder={filter.label} />
//               </SelectTrigger>
//               <SelectContent>
//                 {filter.options.map((option, index) => (
//                   <SelectItem key={index} value={option}>
//                     {option}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
