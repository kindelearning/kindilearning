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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllActivities } from "@/lib/hygraph";
import Head from "next/head";
import Loading from "@/app/loading";

export default async function ActivitiesPage() {
  const [date, setDate] = useState(new Date());
  const [activities, setActivities] = useState([]); //Getting all the activities from Hygraph
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]); // State for selected weekdays
  const [selectedFeatures, setSelectedFeatures] = useState([]); // State for selected features
  const [selectedAgeFocus, setSelectedAgeFocus] = useState([]); // State for selected AgeFocus
  const [selectedPrepTime, setSelectedPrepTime] = useState([]); // State for selected PrepTime
  const [selectedTheme, setSelectedTheme] = useState([]); // State for selected Theme
  const [selectedSkilCategory, setSelectedSkilCategory] = useState([]); // State for selected SkillCategory
  const [loading, setLoading] = useState(true);

  // Fetching all the activities form GraphCMS
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

  // List of features options
  const featuresOptions = [
    "Emotional & Social Strength",
    "Confidence & Independence",
    "Speech & Language",
    "Physical Agility",
    "Reading & Writing",
    "Discovering Our World",
    "Creativity & Imagination",
    "Experiments & Math",
  ];
  // Effect to filter activities based on selected features
  useEffect(() => {
    if (selectedFeatures.length > 0) {
      const filtered = activities.filter((activity) =>
        activity.keywords.some((keyword) => selectedFeatures.includes(keyword))
      );
      setFilteredActivities(filtered);
    } else {
      setFilteredActivities([]); // Reset if no features are selected
    }
  }, [selectedFeatures, activities]);

  // Handle feature filter change
  const handleFeatureChange = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  // List of Skill Category options
  const skillCategoryOptions = [
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
  ];

  // Effect to filter activities based on selected Skill Option
  useEffect(() => {
    if (selectedSkilCategory.length > 0) {
      const filtered = activities.filter((activity) =>
        activity.keywords.some((keyword) =>
          selectedSkilCategory.includes(keyword)
        )
      );
      setFilteredActivities(filtered);
    } else {
      setFilteredActivities([]); // Reset if no features are selected
    }
  }, [selectedSkilCategory, activities]);

  // Handle Skill Option filter change
  const handleSkillChange = (skill) => {
    setSelectedSkilCategory((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // List of Select Themes options
  const selectTheme = [
    "Winter Magic",
    "Exploring Harvest",
    "Environmental Care",
    "Farmyard Adventures",
    "Springtime",
  ];
  // Effect to filter activities based on selected Theme Option
  useEffect(() => {
    if (selectedTheme.length > 0) {
      const filtered = activities.filter((activity) =>
        activity.keywords.some((keyword) => selectedTheme.includes(keyword))
      );
      setFilteredActivities(filtered);
    } else {
      setFilteredActivities([]); // Reset if no features are selected
    }
  }, [selectedTheme, activities]);

  // Handle Theme filter change
  const handleThemeChange = (theme) => {
    setSelectedTheme((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  // List of Select Age Focus options
  const selectAgeFocusOptions = ["BABY", "TODDLER", "PRE-SCHOOLER", "KINDI"];
  // Effect to filter activities based on selected Age Focus Option
  useEffect(() => {
    if (selectedAgeFocus.length > 0) {
      const filtered = activities.filter((activity) =>
        activity.keywords.some((keyword) => selectedAgeFocus.includes(keyword))
      );
      setFilteredActivities(filtered);
    } else {
      setFilteredActivities([]); // Reset if no features are selected
    }
  }, [selectedAgeFocus, activities]);

  // Handle Age Focus filter change
  const handleAgeFocusChange = (age) => {
    setSelectedAgeFocus((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  // List of Select Prep Time options
  const selectPrepTime = ["5 Minutes", "10 Minutes", "10+ Minutes"];
  // Effect to filter activities based on selected Prep Time Option
  useEffect(() => {
    if (selectedPrepTime.length > 0) {
      const filtered = activities.filter((activity) =>
        activity.keywords.some((keyword) => selectedPrepTime.includes(keyword))
      );
      setFilteredActivities(filtered);
    } else {
      setFilteredActivities([]); // Reset if no features are selected
    }
  }, [selectedPrepTime, activities]);

  // Handle Prep Time filter change
  const handlePrepTimeChange = (time) => {
    setSelectedPrepTime((prev) =>
      prev.includes(time) ? prev.filter((b) => b !== time) : [...prev, time]
    );
  };

  // Function to handle filter change
  const handleDayChange = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Filter activities based on selected days
  useEffect(() => {
    // Filter by days
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
                <DrawerContent className="w-full justify-center overflow-clip h-fit items-center flex">
                  <DrawerHeader className="w-full h-full md:h-fit">
                    <DrawerDescription className="flex h-full md:h-fit flex-col pb-6 overflow-y-scroll  justify-start items-start w-full gap-2">
                      <div className="text-red text-2xl font-semibold text-start font-fredoka capitalize leading-[28px]">
                        Adjust your Filters
                      </div>
                      <div className="flex flex-col w-full gap-4 justify-start items-center">
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                          <div className="text-purple clarabodyTwo">
                            Learning Areas
                          </div>
                          <select
                            id="feature-select"
                            value={selectedFeatures}
                            onChange={(e) =>
                              handleFeatureChange(e.target.value)
                            }
                            className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                          >
                            <option value="" disabled>
                              Select features
                            </option>
                            {featuresOptions.map((feature) => (
                              <option key={feature} value={feature}>
                                {feature}
                              </option>
                            ))}
                          </select>
                          {/* <div className="grid grid-cols-2 justify-between gap-2 items-center w-full">
                            {featuresOptions.map((feature) => (
                              <>
                                <div
                                  key={feature}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={`feature-${feature}`}
                                    checked={selectedFeatures.includes(feature)}
                                    onChange={() =>
                                      handleFeatureChange(feature)
                                    }
                                    className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
                                  />
                                  <label
                                    htmlFor={`feature-${feature}`}
                                    className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed text-start peer-disabled:opacity-70"
                                  >
                                    {feature}
                                  </label>
                                </div>
                              </>
                            ))}
                          </div> */}
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                          <div className="text-purple clarabodyTwo">
                            Select Skill Options
                          </div>
                          <select
                            id="feature-select"
                            value={selectedSkilCategory}
                            onChange={(e) => handleSkillChange(e.target.value)}
                            className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                          >
                            <option value="" disabled>
                              Select Skills
                            </option>
                            {skillCategoryOptions.map((skill) => (
                              <option key={skill} value={skill}>
                                {skill}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                          <div className="text-purple clarabodyTwo">
                            Select From Themes
                          </div>
                          <select
                            id="feature-select"
                            value={selectedTheme}
                            onChange={(e) => handleThemeChange(e.target.value)}
                            className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                          >
                            <option value="" disabled>
                              Select Themes
                            </option>
                            {selectTheme.map((theme) => (
                              <option key={theme} value={theme}>
                                {theme}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                          <div className="text-purple clarabodyTwo">
                            Select From Age Focus
                          </div>
                          <select
                            id="feature-select"
                            value={selectedAgeFocus}
                            onChange={(e) =>
                              handleAgeFocusChange(e.target.value)
                            }
                            className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                          >
                            <option value="" disabled>
                              Select Skills
                            </option>
                            {selectAgeFocusOptions.map((age) => (
                              <option key={age} value={age}>
                                {age}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2 w-full">
                          <div className="text-purple clarabodyTwo">
                            Select based on Preperation Time
                          </div>
                          <select
                            id="feature-select"
                            value={selectedPrepTime}
                            onChange={(e) =>
                              handlePrepTimeChange(e.target.value)
                            }
                            className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                          >
                            <option value="" disabled>
                              Select Preperation Time
                            </option>
                            {selectPrepTime.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
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
            <div className="flex w-full flex-col gap-6 items-center justify-between">
              {/* Activity grid begin */}
              <div className="flex w-full flex-col gap-2">
                <div className="grid grid-cols-2 w-full gap-2 md:gap-4 justify-between items-start">
                  {/* Render filtered activities first */}
                  {selectedFeatures &&
                  selectedAgeFocus &&
                  selectedPrepTime &&
                  selectedTheme &&
                  selectedSkilCategory &&
                  filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="w-full flex flex-col gap-4 "
                      >
                        <article className="rounded-lg">
                          <Link href={`/p/activities/${activity.id}`}>
                            <div className="md:w-full hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
                              <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
                                <div className="w-full max-w-full md:min-w-full lg:max-w-full h-auto">
                                  <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:min-h-[200px] md:h-full lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-3xl">
                                    <Image
                                      width={280}
                                      height={250}
                                      alt={activity.title}
                                      className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                                      src={activity.thumbnail.url}
                                    />
                                  </div>
                                  <div className="w-full p-2 md:p-4  flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                                    <div className="flex-col w-full gap-[6px] justify-start items-start">
                                      <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                                        {/* {activity.title} */}
                                        {activity.title.length > 20
                                          ? `${activity.title.slice(0, 22)}...`
                                          : activity.title}
                                      </div>
                                      <div className="justify-start overflow-clip w-full items-center gap-1 lg:gap-2 inline-flex">
                                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-4 flex px-0 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                          {activity.setUpTime.slice(0, 10)}
                                        </div>
                                        •
                                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                          {activity.themeName.slice(0, 10)}
                                        </div>
                                        •
                                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                          {activity.focusAge.slice(0, 10)}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                                      <Image
                                        alt="Kindi"
                                        className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                        src={SpeechLanguageActivity}
                                      />
                                      <Image
                                        alt="Kindi"
                                        className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                        src={DiscoveringOurWorldActivity}
                                      />
                                      <Image
                                        alt="Kindi"
                                        className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                        src={ReadingWritingActivity}
                                      />
                                      <Image
                                        alt="Kindi"
                                        className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                        src={ExperimentsMathActivity}
                                      />
                                      <div
                                        className={`w-[20px] lg:w-[48px]  md:w-[36px] md:h-[36px] md:rounded-xl lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
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
                          No activities found for the selected Options.
                          <br />
                          Try Exploring other Options
                        </p>
                        <div className="flex flex-row lg:grid lg:grid-cols-1 overflow-x-scroll scrollbar-hidden w-full gap-2 md:gap-4 justify-between items-start">
                          {activities.map((activity) => (
                            <div key={activity.id}>
                              <article className="rounded-lg ">
                                <Link href={`/p/activities/${activity.id}`}>
                                  <div
                                    className="md:w-full hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4
"
                                  >
                                    <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
                                      <div className="w-full max-w-full md:min-w-full lg:max-w-full h-auto">
                                        <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:min-h-[200px] md:h-full lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-3xl">
                                          <Image
                                            width={280}
                                            height={250}
                                            alt={activity.title}
                                            className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                                            src={activity.thumbnail.url}
                                          />
                                        </div>
                                        <div className="w-full p-2 md:p-4  flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                                          <div className="flex-col w-full gap-[6px] justify-start items-start">
                                            <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                                              {/* {activity.title} */}
                                              {activity.title.length > 20
                                                ? `${activity.title.slice(
                                                    0,
                                                    22
                                                  )}...`
                                                : activity.title}
                                            </div>
                                            <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
                                              <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-4 flex px-0 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                                {activity.setUpTime}
                                              </div>
                                              •
                                              <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                                {activity.themeName.slice(
                                                  0,
                                                  10
                                                )}
                                              </div>
                                              •
                                              <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                                {activity.focusAge.slice(0, 10)}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                                            <Image
                                              alt="Kindi"
                                              className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                              src={SpeechLanguageActivity}
                                            />
                                            <Image
                                              alt="Kindi"
                                              className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                              src={DiscoveringOurWorldActivity}
                                            />
                                            <Image
                                              alt="Kindi"
                                              className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                              src={ReadingWritingActivity}
                                            />
                                            <Image
                                              alt="Kindi"
                                              className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                              src={ExperimentsMathActivity}
                                            />
                                            <div
                                              className={`w-[20px] lg:w-[48px]  md:w-[36px] md:h-[36px] md:rounded-xl lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
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

              {/* Showing all the activites at the bottom */}
              <div className="w-full flex flex-col gap-2 lg:gap-6 lg:pt-6">
                <div className="flex clarabodyTwo text-purple lg:text-[32px]">
                  Discover All Activities
                </div>
                <div className="grid grid-cols-2 w-full gap-2 md:gap-4 justify-between items-start">
                  {activities.map((activity) => (
                    <div key={activity.id}>
                      <article className="rounded-lg ">
                        <Link href={`/p/activities/${activity.id}`}>
                          <div className="md:w-full hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
                            <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
                              <div className="w-full max-w-full md:min-w-full lg:max-w-full h-auto">
                                <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:min-h-[200px] md:h-full lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-3xl">
                                  <Image
                                    width={280}
                                    height={250}
                                    alt={activity.title}
                                    className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                                    src={activity.thumbnail.url}
                                  />
                                </div>
                                <div className="w-full p-2 md:p-4 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                                  <div className="flex-col w-full gap-[6px] justify-start items-start">
                                    <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                                      {/* {activity.title} */}
                                      {activity.title.length > 20
                                        ? `${activity.title.slice(0, 22)}...`
                                        : activity.title}
                                    </div>
                                    <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
                                      <div className="text-[#0a1932] min-w-[max-content] p-0 lg:pl-2 md:text-[18px] md:leading-[22px] font-[500] font-fredoka text-[10px] lg:text-[16px] leading-none">
                                        {activity.setUpTime}
                                      </div>
                                      •
                                      <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                        {activity.themeName.slice(0, 10)}
                                      </div>
                                      •
                                      <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                        {activity.focusAge.slice(0, 10)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                                    <Image
                                      alt="Kindi"
                                      className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                      src={SpeechLanguageActivity}
                                    />
                                    <Image
                                      alt="Kindi"
                                      className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                      src={DiscoveringOurWorldActivity}
                                    />
                                    <Image
                                      alt="Kindi"
                                      className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                      src={ReadingWritingActivity}
                                    />
                                    <Image
                                      alt="Kindi"
                                      className="w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px]"
                                      src={ExperimentsMathActivity}
                                    />
                                    <div
                                      className={`w-[20px] lg:w-[48px]  md:w-[36px] md:h-[36px] md:rounded-xl lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
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
            </div>
            {/* filters column begin */}
            <div className="lg:flex flex-col hidden min-w-[30%] max-w-[36%] gap-8 w-full justify-start items-start">
              <div className="flex w-full justify-center items-start gap-4 flex-col">
                <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]">
                  FILTER ACTIVITIES BY FEATURE
                </div>
                <div className="flex flex-col gap-2 items-center justify-center w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      htmlFor="feature-select"
                      className="text-[#3f3a64] hidden text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]"
                    >
                      FILTER ACTIVITIES BY Features
                    </label>
                    <select
                      id="feature-select"
                      value={selectedFeatures}
                      onChange={(e) => handleFeatureChange(e.target.value)}
                      className="border-2 w-full rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                    >
                      <option value="" disabled>
                        Select Features
                      </option>
                      {featuresOptions.map((feature) => (
                        <option key={feature} value={feature}>
                          {feature}
                        </option>
                      ))}
                    </select>
                    <select
                      id="feature-select"
                      value={selectedSkilCategory}
                      onChange={(e) => handleFeatureChange(e.target.value)}
                      className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                    >
                      <option value="" disabled>
                        Select Skills
                      </option>
                      {skillCategoryOptions.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <select
                      id="feature-select"
                      value={selectedTheme}
                      onChange={(e) => handleThemeChange(e.target.value)}
                      className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                    >
                      <option value="" disabled>
                        Select Themes
                      </option>
                      {selectTheme.map((theme) => (
                        <option key={theme} value={theme}>
                          {theme}
                        </option>
                      ))}
                    </select>
                    <select
                      id="feature-select"
                      value={selectedAgeFocus}
                      onChange={(e) => handleAgeFocusChange(e.target.value)}
                      className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                    >
                      <option value="" disabled>
                        Select Skills
                      </option>
                      {selectAgeFocusOptions.map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                    </select>
                    <select
                      id="feature-select"
                      value={selectedPrepTime}
                      onChange={(e) => handlePrepTimeChange(e.target.value)}
                      className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
                    >
                      <option value="" disabled>
                        Select based on Prep Time
                      </option>
                      {selectPrepTime.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
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
