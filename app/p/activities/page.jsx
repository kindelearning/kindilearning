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
        const today = new Date();
        const filtered = response.filter((activity) => {
          const activityDate = new Date(activity.ActivityDate); // Convert ActivityDate to Date object
          return activityDate <= today; // Include only dates that are today or earlier
        });
        setFilteredActivities(filtered || []);

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
                id="learningArea-filter"
                value={selectedLearningArea}
                onChange={setSelectedLearningArea}
                options={learningAreas}
                label="Select based on Learning Areas"
              />
              <SelectFilter
                id="skillCategory-filter"
                value={selectedSkillCategory}
                onChange={setSelectedSkillCategory}
                options={skillCategories}
                label="Select a Skill"
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
                label="Select an age group"
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
                {/* Learning Area Filter */}
                <FilterSelect
                  id="learningArea-filter"
                  label="Learning Areas"
                  value={selectedLearningArea}
                  onChange={setSelectedLearningArea}
                  options={learningAreas}
                />
                {/* Skill Category Filter */}
                <FilterSelect
                  id="skillCategory-filter"
                  label="Skill Categories"
                  value={selectedSkillCategory}
                  onChange={setSelectedSkillCategory}
                  options={skillCategories}
                />
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

                {/* SetUp Time Filter */}
                <FilterSelect
                  id="setupTime-filter"
                  label="Setup Times"
                  value={selectedSetUpTime}
                  onChange={setSelectedSetUpTime}
                  options={setupTimes}
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

// export default function ActivitiesData() {
//   const [activities, setActivities] = useState(null); // All activities fetched from API
//   const [filteredActivities, setFilteredActivities] = useState(null); // Filtered activities
//   const [themes, setThemes] = useState([]);
//   const [focusAges, setFocusAges] = useState([]);
//   const [learningAreas, setLearningAreas] = useState([]);
//   const [setupTimes, setSetUpTimes] = useState([]);
//   const [skillCategories, setSkillCategories] = useState([]);
//   const [selectedTheme, setSelectedTheme] = useState("All");
//   const [selectedFocusAge, setSelectedFocusAge] = useState("All");
//   const [selectedLearningArea, setSelectedLearningArea] = useState("All");
//   const [selectedSetUpTime, setSelectedSetUpTime] = useState("All");
//   const [selectedSkillCategory, setSelectedSkillCategory] = useState("All");

//   // Weekdays state
//   const [selectedWeekdays, setSelectedWeekdays] = useState([]); // Tracks selected weekdays

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1); // Current page
//   const itemsPerPage = 24; // Number of items per page

//   const weekdays = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const response = await fetchAllActivities(); // API call to fetch activities
//         setActivities(response || []);
//         setFilteredActivities(response || []);

//         setThemes([
//           "All",
//           ...new Set(
//             response.map((activity) => activity.Theme).filter(Boolean)
//           ),
//         ]);
//         setFocusAges([
//           "All",
//           ...new Set(
//             response.map((activity) => activity.FocusAge).filter(Boolean)
//           ),
//         ]);
//         setLearningAreas([
//           "All",
//           ...new Set(
//             response.map((activity) => activity.LearningArea).filter(Boolean)
//           ),
//         ]);
//         setSetUpTimes([
//           "All",
//           ...new Set(
//             response.map((activity) => activity.SetUpTime).filter(Boolean)
//           ),
//         ]);
//         setSkillCategories([
//           "All",
//           ...new Set(
//             response.map((activity) => activity.SkillCategory).filter(Boolean)
//           ),
//         ]);
//       } catch (error) {
//         console.error("Error fetching activities:", error);
//         setActivities([]);
//         setFilteredActivities([]);
//       }
//     };

//     fetchActivities();
//   }, []);

//   // console.log("Filtered Activities:", activities);
//   const handleWeekdayChange = (weekday) => {
//     setSelectedWeekdays((prev) =>
//       prev.includes(weekday)
//         ? prev.filter((day) => day !== weekday)
//         : [...prev, weekday]
//     );
//   };

//   const handleFilterChange = () => {
//     let filtered = activities;

//     // Filter by Theme
//     if (selectedTheme !== "All") {
//       filtered = filtered.filter(
//         (activity) => activity.Theme === selectedTheme
//       );
//     }

//     // Filter by FocusAge
//     if (selectedFocusAge !== "All") {
//       filtered = filtered.filter(
//         (activity) => activity.FocusAge === selectedFocusAge
//       );
//     }

//     // Filter by LearningArea
//     if (selectedLearningArea !== "All") {
//       filtered = filtered.filter(
//         (activity) => activity.LearningArea === selectedLearningArea
//       );
//     }

//     // Filter by SetUpTime
//     if (selectedSetUpTime !== "All") {
//       filtered = filtered.filter(
//         (activity) => activity.SetUpTime === selectedSetUpTime
//       );
//     }

//     // Filter by SkillCategory
//     if (selectedSkillCategory !== "All") {
//       filtered = filtered.filter(
//         (activity) => activity.SkillCategory === selectedSkillCategory
//       );
//     }

//     // Filter by Weekdays
//     if (selectedWeekdays.length > 0) {
//       filtered = filtered.filter((activity) => {
//         const activityDay = new Date(activity.ActivityDate).toLocaleString(
//           "en-US",
//           { weekday: "long" }
//         );
//         return selectedWeekdays.includes(activityDay);
//       });
//     }

//     setFilteredActivities(filtered);
//   };

//   useEffect(() => {
//     handleFilterChange();
//   }, [
//     selectedTheme,
//     selectedFocusAge,
//     selectedLearningArea,
//     selectedSetUpTime,
//     selectedSkillCategory,
//     selectedWeekdays,
//   ]);

//   const handleClearFilters = () => {
//     setSelectedTheme("All");
//     setSelectedFocusAge("All");
//     setSelectedLearningArea("All");
//     setSelectedSetUpTime("All");
//     setSelectedSkillCategory("All");
//     setSelectedWeekdays([]);
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(
//     (filteredActivities?.length || 0) / itemsPerPage
//   );

//   // Ensure filteredActivities is an array before calling .slice()
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentActivities = Array.isArray(filteredActivities)
//     ? filteredActivities.slice(startIndex, startIndex + itemsPerPage)
//     : [];

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   if (!filteredActivities) {
//     return <div>Loading...</div>;
//   }

//   if (filteredActivities.length === 0) {
//     return (
//       <div className="flex font-fredoka flex-col h-screen items-center justify-center mt-10">
//         <p className="text-gray-600 text-lg">No activities found!</p>
//         <button
//           onClick={handleClearFilters}
//           className="mt-4 px-6 py-2 bg-red text-white rounded-lg hover:bg-hoverRed"
//         >
//           Clear Filters
//         </button>
//       </div>
//     );
//   }

//   return (
//     <section className="w-full font-fredoka h-auto pb-32 bg-[#EAEAF5] flex flex-col items-center justify-center py-4">
//       <div className="claracontainer p-4 w-full flex flex-col gap-8">
//         {/* Header Section */}
//         <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-2">
//           <div className="w-full text-center">
//             <span className="text-[#3f3a64] claraheading uppercase">
//               SELECT YOUR{" "}
//             </span>
//             <span className="text-red claraheading uppercase">
//               LEARNING ACTI VITY
//             </span>
//           </div>
//           <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
//             At Kindi, we&apos;re committed to continuous improvement in our
//             pursuit of enjoyable and impactful learning experiences. Each month,
//             we retire play activities to introduce enhanced learning for the
//             upcoming month. Which one will you select to elevate your
//             child&apos;s early-years development?
//           </div>
//         </div>

//         {/* Mobile Filters */}
//         <div className="claracontainer p-0 w-full flex flex-col lg:hidden overflow-hidden gap-2">
//           <div className="flex w-full justify-between items-center gap-1">
//             {/* Sort Drawer */}
//             <FilterDrawer
//               title="Sort"
//               onSubmit={() => console.log("Sort submitted")}
//               onCancel={() => console.log("Sort canceled")}
//             >
//               {weekdays.map((day) => (
//                 <label key={day} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
//                     value={day}
//                     checked={selectedWeekdays.includes(day)}
//                     onChange={() => handleWeekdayChange(day)}
//                   />
//                   <label
//                     htmlFor={`day-${day}`}
//                     className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   >
//                     {day}
//                   </label>
//                 </label>
//               ))}
//             </FilterDrawer>

//             {/* Filter Drawer */}
//             <FilterDrawer
//               title="Filter"
//               onSubmit={() => console.log("Filter submitted")}
//               onCancel={() => console.log("Filter canceled")}
//             >
//               <SelectFilter
//                 id="focusAge-filter"
//                 value={selectedFocusAge}
//                 onChange={setSelectedFocusAge}
//                 options={focusAges}
//                 label="Select an age group"
//               />
//               <SelectFilter
//                 id="setupTime-filter"
//                 value={selectedSetUpTime}
//                 onChange={setSelectedSetUpTime}
//                 options={setupTimes}
//                 label="Select an Setup Times"
//               />
//               <SelectFilter
//                 id="theme-filter"
//                 value={selectedTheme}
//                 onChange={setSelectedTheme}
//                 options={themes}
//                 label="Select a theme"
//               />
//               <SelectFilter
//                 id="focusAge-filter"
//                 value={selectedFocusAge}
//                 onChange={setSelectedFocusAge}
//                 options={focusAges}
//                 label=" Select an age group"
//               />
//               <SelectFilter
//                 id="setupTime-filter"
//                 value={selectedSetUpTime}
//                 onChange={setSelectedSetUpTime}
//                 options={setupTimes}
//                 label="Select an Setup Times"
//               />
//             </FilterDrawer>
//           </div>
//         </div>
//         {/* Main Activities Content */}
//         <div className="flex w-full gap-4">
//           <div className="flex flex-col w-full gap-4 justify-center items-start">
//             {/* Activity grid */}
//             <div className="grid grid-cols-2 gap-6 w-full">
//               {currentActivities.map((activity) => (
//                 <>
//                   <ActivityCard
//                     key={activity.documentId}
//                     activityUrl={`/p/activities/${activity.documentId}`}
//                     activity={activity}
//                   />
//                 </>
//               ))}
//             </div>
//             {/* Pagination Controls */}
//             <div className="flex justify-center mt-6 gap-4">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-200 text-[#3f3a64] rounded-lg"
//               >
//                 Previous
//               </button>
//               {[...Array(totalPages)].map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handlePageChange(index + 1)}
//                   className={`px-4 py-2 rounded-lg ${
//                     currentPage === index + 1
//                       ? "bg-red text-white"
//                       : "bg-gray-200 text-[#3f3a64]"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-200 text-[#3f3a64] rounded-lg"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//           {/* Filter Dropdowns */}
//           <div className="lg:flex flex-col hidden min-w-[30%] max-w-[36%] gap-8 w-full justify-start items-start">
//             <div className="flex w-full flex-col gap-4 items-start justify-start">
//               <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]">
//                 FILTER ACTIVITIES BY FEATURE
//               </div>
//               <div className="flex flex-col gap-2 items-center justify-center w-full">
//                 {/* Theme Filter */}
//                 <FilterSelect
//                   id="theme-filter"
//                   label="Theme"
//                   value={selectedTheme}
//                   onChange={setSelectedTheme}
//                   options={themes}
//                 />

//                 {/* Focus Age Filter */}
//                 <FilterSelect
//                   id="focusAge-filter"
//                   label="Age Group"
//                   value={selectedFocusAge}
//                   onChange={setSelectedFocusAge}
//                   options={focusAges}
//                 />

//                 {/* Learning Area Filter */}
//                 <FilterSelect
//                   id="learningArea-filter"
//                   label="Learning Areas"
//                   value={selectedLearningArea}
//                   onChange={setSelectedLearningArea}
//                   options={learningAreas}
//                 />

//                 {/* SetUp Time Filter */}
//                 <FilterSelect
//                   id="setupTime-filter"
//                   label="Setup Times"
//                   value={selectedSetUpTime}
//                   onChange={setSelectedSetUpTime}
//                   options={setupTimes}
//                 />

//                 {/* Skill Category Filter */}
//                 <FilterSelect
//                   id="skillCategory-filter"
//                   label="Skill Categories"
//                   value={selectedSkillCategory}
//                   onChange={setSelectedSkillCategory}
//                   options={skillCategories}
//                 />
//               </div>
//             </div>

//             <div className="flex w-full flex-col gap-4 items-start justify-start">
//               <div className="text-[#3f3a64] text-2xl font-semibold text-start font-fredoka uppercase leading-[28px]">
//                 FILTER ACTIVITIES BY Days
//               </div>

//               {/* Weekdays Filter */}
//               <div className="grid grid-cols-2 justify-between gap-2 items-center w-full">
//                 {weekdays.map((day) => (
//                   <label key={day} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       className="text-red border-2 bg-[white] border-red w-[24px] h-[24px]"
//                       value={day}
//                       checked={selectedWeekdays.includes(day)}
//                       onChange={() => handleWeekdayChange(day)}
//                     />
//                     <label
//                       htmlFor={`day-${day}`}
//                       className="w-full text-[#3f3a64] text-base font-fredoka leading-[13px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {day}
//                     </label>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
