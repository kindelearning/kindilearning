"use client";

import React, { useEffect, useState } from "react";
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
import Loading from "@/app/loading";
import { fetchAllActivities } from "@/app/data/p/Dynamic/Activity";
import ActivityCard from "./Sections/ActivityCard";
import { activityIcons } from "@/app/constant/menu";
import Image from "next/image";
import MarkActivityCompleteForm from "./ActivityCompleteButton";

// FilterSelect Component
const FilterSelect = ({ id, label, value, onChange, options }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-2 w-full cursor-pointer hover:bg-gray-200 duration-300 ease-ease-out pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
      >
        <option value="All" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
 
const SelectFilter = ({ id, value, onChange, options, label }) => (
  <div className="flex flex-col justify-start items-start gap-2 w-full">
    <div className="text-purple clarabodyTwo">{label}</div>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-2 w-full cursor-pointer hover:bg-gray-200 duration-300 ease-ease-out pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
    >
      <option value="All" disabled>
        Select {label}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FilterDrawer = ({ title, onSubmit, onCancel, children }) => (
  <Drawer className="w-full flex justify-center items-center">
    <DrawerTrigger className="w-full">
      <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
        {title}
      </Button>
    </DrawerTrigger>
    <DrawerContent className="w-full justify-center overflow-clip h-fit items-center flex">
      <DrawerHeader className="w-full h-full md:h-fit">
        <DrawerDescription className="flex h-full md:h-fit flex-col pb-6 overflow-y-scroll justify-start items-start w-full gap-2">
          <div className="text-red text-2xl font-semibold text-start font-fredoka capitalize leading-[28px]">
            {title} based on Preferred Week Days
          </div>
          <div className="flex flex-col justify-start gap-2 items-start w-full">
            {children}
          </div>
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
        <DrawerClose className="flex w-full justify-between items-center gap-2">
          <Button
            onClick={onSubmit}
            className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none"
          >
            Submit
          </Button>
          <Button
            onClick={onCancel}
            className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none"
          >
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export default function ActivitiesData() {
  const [activities, setActivities] = useState(null); // All activities fetched from API
  const [filteredActivities, setFilteredActivities] = useState(null); // Filtered activities
  const [themes, setThemes] = useState([]);
  const [focusAges, setFocusAges] = useState([]);
  const [learningAreas, setLearningAreas] = useState([]);
  const [setupTimes, setSetUpTimes] = useState([]);
  const [skillCategories, setSkillCategories] = useState([]);

  const [selectedTheme, setSelectedTheme] = useState("All");
  const [selectedFocusAge, setSelectedFocusAge] = useState("All");
  const [selectedLearningArea, setSelectedLearningArea] = useState("All");
  const [selectedSetUpTime, setSelectedSetUpTime] = useState("All");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("All");

  // Weekdays state
  const [selectedWeekdays, setSelectedWeekdays] = useState([]); // Tracks selected weekdays

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 24; // Number of items per page

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetchAllActivities(); // API call to fetch activities
        setActivities(response || []);
        setFilteredActivities(response || []);

        setThemes([
          "All",
          ...new Set(
            response.map((activity) => activity.Theme).filter(Boolean)
          ),
        ]);
        setFocusAges([
          "All",
          ...new Set(
            response.map((activity) => activity.FocusAge).filter(Boolean)
          ),
        ]);
        setLearningAreas([
          "All",
          ...new Set(
            response.map((activity) => activity.LearningArea).filter(Boolean)
          ),
        ]);
        setSetUpTimes([
          "All",
          ...new Set(
            response.map((activity) => activity.SetUpTime).filter(Boolean)
          ),
        ]);
        setSkillCategories([
          "All",
          ...new Set(
            response.map((activity) => activity.SkillCategory).filter(Boolean)
          ),
        ]);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities([]);
        setFilteredActivities([]);
      }
    };

    fetchActivities();
  }, []);

  // console.log("Filtered Activities:", activities);
  const handleWeekdayChange = (weekday) => {
    setSelectedWeekdays((prev) =>
      prev.includes(weekday)
        ? prev.filter((day) => day !== weekday)
        : [...prev, weekday]
    );
  };

  const handleFilterChange = () => {
    let filtered = activities;

    // Filter by Theme
    if (selectedTheme !== "All") {
      filtered = filtered.filter(
        (activity) => activity.Theme === selectedTheme
      );
    }

    // Filter by FocusAge
    if (selectedFocusAge !== "All") {
      filtered = filtered.filter(
        (activity) => activity.FocusAge === selectedFocusAge
      );
    }

    // Filter by LearningArea
    if (selectedLearningArea !== "All") {
      filtered = filtered.filter(
        (activity) => activity.LearningArea === selectedLearningArea
      );
    }

    // Filter by SetUpTime
    if (selectedSetUpTime !== "All") {
      filtered = filtered.filter(
        (activity) => activity.SetUpTime === selectedSetUpTime
      );
    }

    // Filter by SkillCategory
    if (selectedSkillCategory !== "All") {
      filtered = filtered.filter(
        (activity) => activity.SkillCategory === selectedSkillCategory
      );
    }

    // Filter by Weekdays
    if (selectedWeekdays.length > 0) {
      filtered = filtered.filter((activity) => {
        const activityDay = new Date(activity.ActivityDate).toLocaleString(
          "en-US",
          { weekday: "long" }
        );
        return selectedWeekdays.includes(activityDay);
      });
    }

    setFilteredActivities(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [
    selectedTheme,
    selectedFocusAge,
    selectedLearningArea,
    selectedSetUpTime,
    selectedSkillCategory,
    selectedWeekdays,
  ]);

  const handleClearFilters = () => {
    setSelectedTheme("All");
    setSelectedFocusAge("All");
    setSelectedLearningArea("All");
    setSelectedSetUpTime("All");
    setSelectedSkillCategory("All");
    setSelectedWeekdays([]);
  };

  // Pagination logic
  const totalPages = Math.ceil(
    (filteredActivities?.length || 0) / itemsPerPage
  );

  // Ensure filteredActivities is an array before calling .slice()
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActivities = Array.isArray(filteredActivities)
    ? filteredActivities.slice(startIndex, startIndex + itemsPerPage)
    : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!filteredActivities) {
    return <div>Loading...</div>;
  }

  if (filteredActivities.length === 0) {
    return (
      <div className="flex font-fredoka flex-col h-screen items-center justify-center mt-10">
        <p className="text-gray-600 text-lg">No activities found!</p>
        <button
          onClick={handleClearFilters}
          className="mt-4 px-6 py-2 bg-red text-white rounded-lg hover:bg-hoverRed"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <section className="w-full font-fredoka h-auto pb-32 bg-[#EAEAF5] flex flex-col items-center justify-center py-4">
      <div className="claracontainer p-4 w-full flex flex-col gap-8">
        {/* Header Section */}
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
            pursuit of enjoyable and impactful learning experiences. Each month,
            we retire play activities to introduce enhanced learning for the
            upcoming month. Which one will you select to elevate your
            child&apos;s early-years development?
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="claracontainer p-0 w-full flex flex-col lg:hidden overflow-hidden gap-2">
          <div className="flex w-full justify-between items-center gap-1">
            {/* Sort Drawer */}
            <FilterDrawer
              title="Sort"
              onSubmit={() => console.log("Sort submitted")}
              onCancel={() => console.log("Sort canceled")}
            >
              {weekdays.map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
                    value={day}
                    checked={selectedWeekdays.includes(day)}
                    onChange={() => handleWeekdayChange(day)}
                  />
                  <label
                    htmlFor={`day-${day}`}
                    className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {day}
                  </label>
                </label>
              ))}
            </FilterDrawer>

            {/* Filter Drawer */}
            <FilterDrawer
              title="Filter"
              onSubmit={() => console.log("Filter submitted")}
              onCancel={() => console.log("Filter canceled")}
            >
              <SelectFilter
                id="focusAge-filter"
                value={selectedFocusAge}
                onChange={setSelectedFocusAge}
                options={focusAges}
                label="Select an age group"
              />
              <SelectFilter
                id="setupTime-filter"
                value={selectedSetUpTime}
                onChange={setSelectedSetUpTime}
                options={setupTimes}
                label="Select an Setup Times"
              />
              <SelectFilter
                id="theme-filter"
                value={selectedTheme}
                onChange={setSelectedTheme}
                options={themes}
                label="Select a theme"
              />
              <SelectFilter
                id="focusAge-filter"
                value={selectedFocusAge}
                onChange={setSelectedFocusAge}
                options={focusAges}
                label=" Select an age group"
              />
              <SelectFilter
                id="setupTime-filter"
                value={selectedSetUpTime}
                onChange={setSelectedSetUpTime}
                options={setupTimes}
                label="Select an Setup Times"
              />
            </FilterDrawer>
          </div>
        </div>
        {/* Main Activities Content */}
        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full gap-4 justify-center items-start">
            {/* Activity grid */}
            <div className="grid grid-cols-2 gap-6 w-full">
              {currentActivities.map((activity) => (
                <>
                  <ActivityCard
                    key={activity.documentId}
                    activityUrl={`/p/activities/${activity.documentId}`}
                    activity={activity}
                  />
                </>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-[#3f3a64] rounded-lg"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-red text-white"
                      : "bg-gray-200 text-[#3f3a64]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-[#3f3a64] rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
          {/* Filter Dropdowns */}
          <div className="lg:flex flex-col hidden min-w-[30%] max-w-[36%] gap-8 w-full justify-start items-start">
            <div className="flex w-full flex-col gap-4 items-start justify-start">
              <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]">
                FILTER ACTIVITIES BY FEATURE
              </div>
              <div className="flex flex-col gap-2 items-center justify-center w-full">
                {/* Theme Filter */}
                <FilterSelect
                  id="theme-filter"
                  label="Theme"
                  value={selectedTheme}
                  onChange={setSelectedTheme}
                  options={themes}
                />

                {/* Focus Age Filter */}
                <FilterSelect
                  id="focusAge-filter"
                  label="Age Group"
                  value={selectedFocusAge}
                  onChange={setSelectedFocusAge}
                  options={focusAges}
                />

                {/* Learning Area Filter */}
                <FilterSelect
                  id="learningArea-filter"
                  label="Learning Areas"
                  value={selectedLearningArea}
                  onChange={setSelectedLearningArea}
                  options={learningAreas}
                />

                {/* SetUp Time Filter */}
                <FilterSelect
                  id="setupTime-filter"
                  label="Setup Times"
                  value={selectedSetUpTime}
                  onChange={setSelectedSetUpTime}
                  options={setupTimes}
                />

                {/* Skill Category Filter */}
                <FilterSelect
                  id="skillCategory-filter"
                  label="Skill Categories"
                  value={selectedSkillCategory}
                  onChange={setSelectedSkillCategory}
                  options={skillCategories}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 items-start justify-start">
              <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]">
                FILTER ACTIVITIES BY Days
              </div>

              {/* Weekdays Filter */}
              <div className="grid grid-cols-2 justify-between gap-2 items-center w-full">
                {weekdays.map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
                      value={day}
                      checked={selectedWeekdays.includes(day)}
                      onChange={() => handleWeekdayChange(day)}
                    />
                    <label
                      htmlFor={`day-${day}`}
                      className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {day}
                    </label>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Activities from Hygraph
// export function ActivitiesPage() {
//   const [date, setDate] = useState(new Date());
//   const [activities, setActivities] = useState([]); //Getting all the activities from Hygraph
//   const [filteredActivities, setFilteredActivities] = useState([]);
//   const [selectedDays, setSelectedDays] = useState([]); // State for selected weekdays
//   const [selectedFeatures, setSelectedFeatures] = useState([]); // State for selected features
//   const [selectedAgeFocus, setSelectedAgeFocus] = useState([]); // State for selected AgeFocus
//   const [selectedPrepTime, setSelectedPrepTime] = useState([]); // State for selected PrepTime
//   const [selectedTheme, setSelectedTheme] = useState([]); // State for selected Theme
//   const [selectedSkilCategory, setSelectedSkilCategory] = useState([]); // State for selected SkillCategory
//   const [loading, setLoading] = useState(true);

//   // Fetching all the activities form GraphCMS
//   useEffect(() => {
//     const fetchActivities = async () => {
//       const data = await getAllActivities();
//       console.log(data); // Log the activities
//       setActivities(data);
//       setFilteredActivities(data); // Initialize filtered activities with all activities
//       setLoading(false);
//     };

//     fetchActivities();
//   }, []);

//   // List of features options
//   const featuresOptions = [
//     "Emotional & Social Strength",
//     "Confidence & Independence",
//     "Speech & Language",
//     "Physical Agility",
//     "Reading & Writing",
//     "Discovering Our World",
//     "Creativity & Imagination",
//     "Experiments & Math",
//   ];
//   // Effect to filter activities based on selected features
//   useEffect(() => {
//     if (selectedFeatures.length > 0) {
//       const filtered = activities.filter((activity) =>
//         activity.keywords.some((keyword) => selectedFeatures.includes(keyword))
//       );
//       setFilteredActivities(filtered);
//     } else {
//       setFilteredActivities([]); // Reset if no features are selected
//     }
//   }, [selectedFeatures, activities]);

//   // Handle feature filter change
//   const handleFeatureChange = (feature) => {
//     setSelectedFeatures((prev) =>
//       prev.includes(feature)
//         ? prev.filter((f) => f !== feature)
//         : [...prev, feature]
//     );
//   };

//   // List of Skill Category options
//   const skillCategoryOptions = [
//     "Sensory Development",
//     "Mastering Feelings",
//     "Listening & Talking",
//     "Problem-solving & Independence",
//     "Social Play",
//     "Fine Motor",
//     "Gross Motor",
//     "Pretend Play",
//     "Crafts",
//     "Exploring the Seasons",
//     "Outdoors & Nature",
//     "Rainy Day Play",
//   ];

//   // Effect to filter activities based on selected Skill Option
//   useEffect(() => {
//     if (selectedSkilCategory.length > 0) {
//       const filtered = activities.filter((activity) =>
//         activity.keywords.some((keyword) =>
//           selectedSkilCategory.includes(keyword)
//         )
//       );
//       setFilteredActivities(filtered);
//     } else {
//       setFilteredActivities([]); // Reset if no features are selected
//     }
//   }, [selectedSkilCategory, activities]);

//   // Handle Skill Option filter change
//   const handleSkillChange = (skill) => {
//     setSelectedSkilCategory((prev) =>
//       prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
//     );
//   };

//   // List of Select Themes options
//   const selectTheme = [
//     "Winter",
//     "Healthy Eating",
//     "Five Senses",
//     "Early Maths",
//     "Shapes",
//     "Colours",
//     "Spring",
//     "Farm Life",
//     "Transport & Travel",
//     "Road Awareness",
//     "Community Helpers",
//     "Insects & Bugs",
//     "Space",
//     "Summer",
//     "Sea Life",
//     "Feelings & Emotions",
//     "Marvellous Me",
//     "Harvest",
//     "Opposites",
//     "Autumn",
//     "Forest & Woodland Animals",
//     "Eco, Recycling & Environment",
//     "World Nursery Rhyme Week",
//     "Festive Season",
//   ];
//   // Effect to filter activities based on selected Theme Option
//   useEffect(() => {
//     if (selectedTheme.length > 0) {
//       const filtered = activities.filter((activity) =>
//         activity.keywords.some((keyword) => selectedTheme.includes(keyword))
//       );
//       setFilteredActivities(filtered);
//     } else {
//       setFilteredActivities([]); // Reset if no features are selected
//     }
//   }, [selectedTheme, activities]);

//   // Handle Theme filter change
//   const handleThemeChange = (theme) => {
//     setSelectedTheme((prev) =>
//       prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
//     );
//   };

//   // List of Select Age Focus options
//   const selectAgeFocusOptions = [
//     "Beginners",
//     "Explorers",
//     "Discoverers",
//     "Adventurers",
//   ];
//   // Effect to filter activities based on selected Age Focus Option
//   useEffect(() => {
//     if (selectedAgeFocus.length > 0) {
//       const filtered = activities.filter((activity) =>
//         activity.keywords.some((keyword) => selectedAgeFocus.includes(keyword))
//       );
//       setFilteredActivities(filtered);
//     } else {
//       setFilteredActivities([]); // Reset if no features are selected
//     }
//   }, [selectedAgeFocus, activities]);

//   // Handle Age Focus filter change
//   const handleAgeFocusChange = (age) => {
//     setSelectedAgeFocus((prev) =>
//       prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
//     );
//   };

//   // List of Select Prep Time options
//   const selectPrepTime = ["5 Minutes", "10 Minutes", "10+ Minutes"];
//   // Effect to filter activities based on selected Prep Time Option
//   useEffect(() => {
//     if (selectedPrepTime.length > 0) {
//       const filtered = activities.filter((activity) =>
//         activity.keywords.some((keyword) => selectedPrepTime.includes(keyword))
//       );
//       setFilteredActivities(filtered);
//     } else {
//       setFilteredActivities([]); // Reset if no features are selected
//     }
//   }, [selectedPrepTime, activities]);

//   // Handle Prep Time filter change
//   const handlePrepTimeChange = (time) => {
//     setSelectedPrepTime((prev) =>
//       prev.includes(time) ? prev.filter((b) => b !== time) : [...prev, time]
//     );
//   };

//   // Function to handle filter change
//   const handleDayChange = (day) => {
//     setSelectedDays((prev) =>
//       prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//     );
//   };

//   // Filter activities based on selected days
//   useEffect(() => {
//     // Filter by days
//     if (selectedDays.length === 0) {
//       setFilteredActivities(activities); // If no filters are selected, show all activities
//     } else {
//       const filtered = activities.filter(
//         (activity) =>
//           Array.isArray(activity.keywords) && // Check if keywords is an array
//           activity.keywords.some((keyword) => selectedDays.includes(keyword))
//       );
//       setFilteredActivities(filtered);
//     }
//   }, [selectedDays, activities]);

//   // Days to filter
//   const weekdays = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   if (loading) {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }

//   if (!activities || activities.length === 0) {
//     return <div>No activities found!</div>;
//   }
//   return (
//     <>
//       <section className="w-full h-auto pb-32 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
//         <div className="claracontainer p-4 md:p-0 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
//           {/* Top Description Section */}
//           <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-2">
//             <div className="w-full text-center">
//               <span className="text-[#3f3a64] claraheading uppercase">
//                 SELECT YOUR{" "}
//               </span>
//               <span className="text-red claraheading uppercase">
//                 LEARNING ACTI VITY
//               </span>
//             </div>
//             <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
//               At Kindi, we&apos;re committed to continuous improvement in our
//               pursuit of enjoyable and impactful learning experiences. Each
//               month, we retire play activities to introduce enhanced learning
//               for the upcoming month. Which one will you select to elevate your
//               child&apos;s early-years development?
//             </div>
//           </div>

//           {/* Mobile Filters Button */}
//           <div className="claracontainer p-0 w-full flex flex-col lg:hidden overflow-hidden gap-2">
//             <div className="flex w-full justify-between items-center gap-1">
//               {/* Sort Weekdays */}
//               <Drawer className="w-full flex justify-center items-center">
//                 <DrawerTrigger className="w-full">
//                   <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
//                     Sort
//                   </Button>
//                 </DrawerTrigger>
//                 <DrawerContent className="w-full justify-center overflow-clip h-fit items-center flex">
//                   <DrawerHeader className="w-full h-full md:h-fit">
//                     <DrawerDescription className="flex h-full md:h-fit flex-col pb-6 overflow-y-scroll  justify-start items-start w-full gap-2">
//                       <div className="text-red text-2xl font-semibold text-start font-fredoka capitalize leading-[28px]">
//                         Sort based on Preferred Week Days
//                       </div>
//                       <div className="flex flex-col justify-start gap-2 items-start w-full">
//                         {weekdays.map((day) => (
//                           <div
//                             key={day}
//                             className="flex items-center space-x-2"
//                           >
//                             <input
//                               type="Checkbox"
//                               id={`day-${day}`}
//                               checked={selectedDays.includes(day)}
//                               onChange={() => handleDayChange(day)}
//                               className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
//                             />
//                             <label
//                               htmlFor={`day-${day}`}
//                               className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                             >
//                               {day}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </DrawerDescription>
//                   </DrawerHeader>
//                   <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
//                     <DrawerClose className="flex w-full justify-between items-center gap-2">
//                       <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
//                         Submit
//                       </Button>
//                       <Button
//                         // onClick={() => window.location.reload()}
//                         className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none"
//                       >
//                         Cancel
//                       </Button>
//                     </DrawerClose>
//                   </DrawerFooter>
//                 </DrawerContent>
//               </Drawer>
//               {/* filter */}
//               <Drawer className="w-full flex justify-center items-center">
//                 <DrawerTrigger className="w-full">
//                   <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
//                     Filter
//                   </Button>
//                 </DrawerTrigger>
//                 <DrawerContent className="w-full justify-center overflow-clip h-fit items-center flex">
//                   <DrawerHeader className="w-full h-full md:h-fit">
//                     <DrawerDescription className="flex h-full md:h-fit flex-col pb-6 overflow-y-scroll  justify-start items-start w-full gap-2">
//                       <div className="text-red text-2xl font-semibold text-start font-fredoka capitalize leading-[28px]">
//                         Adjust your Filters
//                       </div>
//                       <div className="flex flex-col w-full gap-4 justify-start items-center">
//                         <div className="flex flex-col justify-start items-start gap-2 w-full">
//                           <div className="text-purple clarabodyTwo">
//                             Select Area of Learning
//                           </div>
//                           <select
//                             id="feature-select"
//                             value={selectedFeatures}
//                             onChange={(e) =>
//                               handleFeatureChange(e.target.value)
//                             }
//                             className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                           >
//                             <option value="" disabled>
//                               Select Area of Learning
//                             </option>
//                             {featuresOptions.map((feature) => (
//                               <option key={feature} value={feature}>
//                                 {feature}
//                               </option>
//                             ))}
//                           </select>
//                           {/* <div className="grid grid-cols-2 justify-between gap-2 items-center w-full">
//                             {featuresOptions.map((feature) => (
//                               <>
//                                 <div
//                                   key={feature}
//                                   className="flex items-center space-x-2"
//                                 >
//                                   <input
//                                     type="checkbox"
//                                     id={`feature-${feature}`}
//                                     checked={selectedFeatures.includes(feature)}
//                                     onChange={() =>
//                                       handleFeatureChange(feature)
//                                     }
//                                     className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
//                                   />
//                                   <label
//                                     htmlFor={`feature-${feature}`}
//                                     className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed text-start peer-disabled:opacity-70"
//                                   >
//                                     {feature}
//                                   </label>
//                                 </div>
//                               </>
//                             ))}
//                           </div> */}
//                         </div>
//                         <div className="flex flex-col justify-start items-start gap-2 w-full">
//                           <div className="text-purple clarabodyTwo">
//                             Select From Skill Options
//                           </div>
//                           <select
//                             id="feature-select"
//                             value={selectedSkilCategory}
//                             onChange={(e) => handleSkillChange(e.target.value)}
//                             className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                           >
//                             <option value="" disabled>
//                               Select Skills
//                             </option>
//                             {skillCategoryOptions.map((skill) => (
//                               <option key={skill} value={skill}>
//                                 {skill}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="flex flex-col justify-start items-start gap-2 w-full">
//                           <div className="text-purple clarabodyTwo">
//                             Select From Themes
//                           </div>
//                           <select
//                             id="feature-select"
//                             value={selectedTheme}
//                             onChange={(e) => handleThemeChange(e.target.value)}
//                             className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                           >
//                             <option value="" disabled>
//                               Select Themes
//                             </option>
//                             {selectTheme.map((theme) => (
//                               <option key={theme} value={theme}>
//                                 {theme}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="flex flex-col justify-start items-start gap-2 w-full">
//                           <div className="text-purple clarabodyTwo">
//                             Select From Age Focus
//                           </div>
//                           <select
//                             id="feature-select"
//                             value={selectedAgeFocus}
//                             onChange={(e) =>
//                               handleAgeFocusChange(e.target.value)
//                             }
//                             className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                           >
//                             <option value="" disabled>
//                               Select Difficulty
//                             </option>
//                             {selectAgeFocusOptions.map((age) => (
//                               <option key={age} value={age}>
//                                 {age}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="flex flex-col justify-start items-start gap-2 w-full">
//                           <div className="text-purple clarabodyTwo">
//                             Select Based on Prep Time
//                           </div>
//                           <select
//                             id="feature-select"
//                             value={selectedPrepTime}
//                             onChange={(e) =>
//                               handlePrepTimeChange(e.target.value)
//                             }
//                             className="border-2 w-full pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                           >
//                             <option value="" disabled>
//                               Select Based on Prep Time
//                             </option>
//                             {selectPrepTime.map((time) => (
//                               <option key={time} value={time}>
//                                 {time}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                       </div>
//                     </DrawerDescription>
//                   </DrawerHeader>
//                   <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
//                     <DrawerClose className="flex w-full justify-between items-center gap-2">
//                       <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
//                         Submit
//                       </Button>
//                       <Button className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
//                         Cancel
//                       </Button>
//                     </DrawerClose>
//                   </DrawerFooter>
//                 </DrawerContent>
//               </Drawer>
//             </div>
//           </div>

//           {/* The Activity & Filters Section */}
//           <div className="claracontainer w-full flex flex-row overflow-hidden gap-8">
//             <div className="flex w-full flex-col gap-6 items-center justify-between">
//               {/* Activity grid begin */}
//               <div className="grid grid-cols-2 w-full  gap-2">
//                 {/* Render filtered activities first */}
//                 {selectedFeatures &&
//                 selectedAgeFocus &&
//                 selectedPrepTime &&
//                 selectedTheme &&
//                 selectedSkilCategory &&
//                 filteredActivities.length > 0 ? (
//                   filteredActivities.map((activity) => (
//                     <div
//                       key={activity.id}
//                       className="flex w-full gap-2 md:gap-4 justify-between items-start"
//                     >
//                       <div
//                         key={activity.id}
//                         className="w-full flex flex-col gap-4 "
//                       >
//                         <article className="rounded-lg overflow-clip">
//                           <Link href={`/p/activities/${activity.id}`}>
//                             <div className="md:w-full md:max-w-full max-w-[196px]  hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
//                               <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
//                                 <div className="w-full max-w-full md:min-w-full lg:max-w-full h-auto">
//                                   <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:min-h-[200px] md:h-full lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-3xl">
//                                     <Image
//                                       width={280}
//                                       height={250}
//                                       alt={activity.title}
//                                       className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
//                                       src={activity.thumbnail.url}
//                                     />
//                                   </div>
//                                   <div className="w-full p-2 md:p-4  flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
//                                     <div className="flex-col w-full gap-[6px] justify-start items-start">
//                                       <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
//                                         {/* {activity.title} */}
//                                         {activity.title.length > 18
//                                           ? `${activity.title.slice(0, 18)}...`
//                                           : activity.title}
//                                       </div>
//                                       <div className="justify-start overflow-clip w-full items-center gap-1 lg:gap-2 inline-flex">
//                                         <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-4 flex px-0 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
//                                           {activity.setUpTime.slice(0, 10)}
//                                         </div>
//                                         •
//                                         <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
//                                           {activity.themeName.slice(0, 10)}
//                                         </div>
//                                         •
//                                         <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
//                                           {activity.focusAge.slice(0, 10)}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
//                                       {/* {activityIcons.map(
//                                         (item) =>
//                                           activity[item.key] && (
//                                             <div
//                                               key={item.key}
//                                               className={`w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px] flex justify-center items-center bg-[#${activityIcons.concatbackgroundColor}] rounded-[16px]`}
//                                             >
//                                               <Image
//                                                 alt="Kindi"
//                                                 src={item.icon}
//                                               />
//                                             </div>
//                                           )
//                                       )} */}
//                                       {activityIcons.map((item, index) => {
//                                         if (activity[item.key] && index < 4) {
//                                           return (
//                                             <div
//                                               key={item.key}
//                                               className={`w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px] flex justify-center items-center bg-[#${activityIcons.concatbackgroundColor}] rounded-[16px]`}
//                                             >
//                                               <Image
//                                                 alt="Kindi"
//                                                 src={item.icon}
//                                               />
//                                             </div>
//                                           );
//                                         }
//                                         return null; // Skip rendering if the condition is not met
//                                       })}
//                                       {activityIcons.slice(4, 5).map(
//                                         (item) =>
//                                           activity[item.key] && (
//                                             <div
//                                               key={item.key}
//                                               className={`w-[20px] lg:w-[48px] md:w-[36px] md:h-[36px] md:rounded-xl lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
//                                             >
//                                               <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
//                                                 +1
//                                               </span>
//                                             </div>
//                                           )
//                                       )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </Link>
//                         </article>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <>
//                     <div className="grid grid-cols-2 md:gap-4 justify-between col-span-2 w-full gap-2">
//                       <p className="text-red w-full col-span-2">
//                         No activities found for the selected Options.
//                         <br />
//                         Try Exploring other Options
//                       </p>
//                       {activities.map((activity) => (
//                         <div
//                           key={activity.id}
//                           className="w-full flex col-span-1"
//                         >
//                           <article className="rounded-lg overflow-clip">
//                             <Link href={`/p/activities/${activity.id}`}>
//                               <div className="md:w-full md:max-w-full max-w-[196px] hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
//                                 <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
//                                   <div className="w-full max-w-full md:min-w-full lg:max-w-full h-auto">
//                                     <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:min-h-[200px] md:h-full lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-3xl">
//                                       <Image
//                                         width={280}
//                                         height={250}
//                                         alt={activity.title}
//                                         className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
//                                         src={activity.thumbnail.url}
//                                       />
//                                     </div>
//                                     <div className="w-full p-2 md:p-4  flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
//                                       <div className="flex-col w-full gap-[6px] justify-start items-start">
//                                         <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
//                                           {/* {activity.title} */}
//                                           {activity.title.length > 18
//                                             ? `${activity.title.slice(
//                                                 0,
//                                                 18
//                                               )}...`
//                                             : activity.title}
//                                         </div>
//                                         <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
//                                           <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-4 flex px-0 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
//                                             {activity.setUpTime}
//                                           </div>
//                                           •
//                                           <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
//                                             {activity.themeName.slice(0, 10)}
//                                           </div>
//                                           •
//                                           <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
//                                             {activity.focusAge.slice(0, 10)}
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
//                                         {/* {activityIcons.slice(0, 4).map(
//                                           (item) =>
//                                             activity[item.key] && (
//                                               <div
//                                                 key={item.key}
//                                                 className={`w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px] flex justify-center items-center bg-[#${activityIcons.concatbackgroundColor}] rounded-[16px]`}
//                                               >
//                                                 <Image
//                                                   alt="Kindi"
//                                                   src={item.icon}
//                                                 />
//                                               </div>
//                                             )
//                                         )} */}
//                                         {activityIcons.map((item, index) => {
//                                           // Ensure you only render icons that are available in the activity and limit to 4 items
//                                           if (activity[item.key] && index < 4) {
//                                             return (
//                                               <div
//                                                 key={item.key}
//                                                 className={`w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px] flex justify-center items-center bg-[#${activityIcons.concatbackgroundColor}] rounded-[16px]`}
//                                               >
//                                                 <Image
//                                                   alt="Kindi"
//                                                   src={item.icon}
//                                                 />
//                                               </div>
//                                             );
//                                           }
//                                           return null; // Skip rendering if the condition is not met
//                                         })}

//                                         {activityIcons.slice(4, 5).map(
//                                           (item) =>
//                                             activity[item.key] && (
//                                               <div
//                                                 key={item.key}
//                                                 className={`w-[20px] lg:w-[48px] md:w-[36px] md:h-[36px] md:rounded-xl lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
//                                               >
//                                                 <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
//                                                   +1
//                                                 </span>
//                                               </div>
//                                             )
//                                         )}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </Link>
//                           </article>
//                         </div>
//                       ))}
//                       <div className="flex flex-row lg:grid lg:grid-cols-1 overflow-x-scroll scrollbar-hidden w-full gap-2 md:gap-4 justify-between items-start"></div>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Showing all the activites at the bottom */}
//               {/* <ActivitiesList activities={activities} /> */}
//             </div>
//             {/* filters column begin */}
//             <div className="lg:flex flex-col hidden min-w-[30%] max-w-[36%] gap-8 w-full justify-start items-start">
//               <div className="flex w-full justify-center items-start gap-4 flex-col">
//                 <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]">
//                   FILTER ACTI VITIES BY FEATURE
//                 </div>
//                 <div className="flex flex-col gap-2 items-center justify-center w-full">
//                   <div className="flex flex-col gap-2 w-full">
//                     <label
//                       htmlFor="feature-select"
//                       className="text-[#3f3a64] hidden text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]"
//                     >
//                       FILTER ACTIVITIES BY Features
//                     </label>
//                     <select
//                       id="feature-select"
//                       value={selectedFeatures}
//                       onChange={(e) => handleFeatureChange(e.target.value)}
//                       className="border-2 w-full cursor-pointer hover:bg-gray-200 duration-300 ease-ease-out rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                     >
//                       <option value="">Select Area of Learning</option>
//                       {featuresOptions.map((feature) => (
//                         <option key={feature} value={feature}>
//                           {feature}
//                         </option>
//                       ))}
//                     </select>
//                     <select
//                       id="feature-select"
//                       value={selectedSkilCategory}
//                       onChange={(e) => handleFeatureChange(e.target.value)}
//                       className="border-2 w-full cursor-pointer  hover:bg-gray-200 duration-300 ease-ease-out pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                     >
//                       <option value="">Select Skills</option>
//                       {skillCategoryOptions.map((skill) => (
//                         <option key={skill} value={skill}>
//                           {skill}
//                         </option>
//                       ))}
//                     </select>
//                     <select
//                       id="feature-select"
//                       value={selectedTheme}
//                       onChange={(e) => handleThemeChange(e.target.value)}
//                       className="border-2 w-full cursor-pointer  hover:bg-gray-200 duration-300 ease-ease-out  pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                     >
//                       <option value="">Select Themes</option>
//                       {selectTheme.map((theme) => (
//                         <option key={theme} value={theme}>
//                           {theme}
//                         </option>
//                       ))}
//                     </select>
//                     <select
//                       id="feature-select"
//                       value={selectedAgeFocus}
//                       onChange={(e) => handleAgeFocusChange(e.target.value)}
//                       className="border-2 w-full cursor-pointer  hover:bg-gray-200 duration-300 ease-ease-out  pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                     >
//                       <option value="">Select Difficulty</option>
//                       {selectAgeFocusOptions.map((age) => (
//                         <option key={age} value={age}>
//                           {age}
//                         </option>
//                       ))}
//                     </select>
//                     <select
//                       id="feature-select"
//                       value={selectedPrepTime}
//                       onChange={(e) => handlePrepTimeChange(e.target.value)}
//                       className="border-2 w-full cursor-pointer  hover:bg-gray-200 duration-300 ease-ease-out  pr-2 rounded-full border-[#3f3a64] text-[#3f3a64] bg-white text-base font-fredoka leading-[13px] font-medium p-2"
//                     >
//                       <option value="">Select Based on Prep Time</option>
//                       {selectPrepTime.map((time) => (
//                         <option key={time} value={time}>
//                           {time}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               {/* Filter Activity by Days */}
//               <div className="flex w-full justify-center items-start gap-4 flex-col">
//                 <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]">
//                   FILTER ACTI VITIES BY Days
//                 </div>
//                 <div className="grid grid-cols-2 justify-between gap-2 items-center w-full">
//                   {weekdays.map((day) => (
//                     <div key={day} className="flex items-center space-x-2">
//                       <input
//                         type="Checkbox"
//                         id={`day-${day}`}
//                         checked={selectedDays.includes(day)}
//                         onChange={() => handleDayChange(day)}
//                         className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
//                       />
//                       <label
//                         htmlFor={`day-${day}`}
//                         className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         {day}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
