"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { KindiHeart, ThemeThumb } from "@/public/Images";
import Image from "next/image";
import { getIconForSkill } from "./ActivityCard";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css";

function CalendarNavigation({ currentDate, onPrevMonth, onNextMonth }) {
  const formattedDate = format(currentDate, "MMMM yyyy");
  return (
    <div className="flex font-fredoka items-center justify-center gap-2 mb-4">
      <button
        className="text-xl font-extrabold p-1 text-red border-red border-2 hover:scale-110 duration-200  rounded-md transition"
        onClick={onPrevMonth}
      >
        <ChevronLeft />
      </button>
      <span className="text-2xl text-purple  font-semibold">
        {formattedDate}
      </span>
      <button
        className="text-xl font-extrabold p-1 text-red border-red border-2 hover:scale-110 duration-200  rounded-md transition"
        onClick={onNextMonth}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

function YearMonthSelector({
  currentDate,
  availableYears,
  onYearChange,
  onMonthChange,
}) {
  return (
    <div className="flex items-center justify-end gap-2 mb-4">
      <select
        className="p-2 rounded-full"
        value={currentDate.getFullYear()}
        onChange={onYearChange}
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        className="p-2 rounded-full"
        value={currentDate.getMonth()}
        onChange={onMonthChange}
      >
        {[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}

function Weekdays() {
  return (
    <div className=" grid-cols-7 gap-2  w-full justify-between items-center px-16 pt-4 hidden uppercase lg:flex font-fredoka text-[#3F3A64] text-center font-semibold mb-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="py-2">
          {day}
        </div>
      ))}
    </div>
  );
}

function ActivityCard({ activityData }) {
  if (!activityData) return <p>No activity data available</p>;
  // const { FocusAge, SetUpTime, Skills, Theme } = activityData?.myActivity;

  return (
    <>
      <div className="flex flex-col p-2 bg-white rounded-md w-full gap-1 justify-between items-start">
        <div className="flex w-full justify-between gap-1 lg:gap-0 items-start">
          <div className="flex w-full py-1 flex-col justify-start items-start">
            <p className="font-semibold text-black text-[14px] leading-[16px] lg:text-[12px] lg:leading-[12px] text-start">
              {activityData?.myActivity?.Title || "Unknown Activity"}
            </p>
          </div>
          {/* Drag icon */}
          <div className="cursor-grab text-gray-500 items-start">
            <span className="text-xl flex items-start">⋮⋮</span>{" "}
          </div>
        </div>

        <div className="flex w-full gap-2 h-fit justify-between items-end">
          <div className="flex w-full  rounded-[4px]  max-w-[32px] object-cover h-[32px] overflow-clip">
            <Image
              //   src={event.Gallery[0].url} // Make sure this matches the actual property name
              src={ThemeThumb} // Make sure this matches the actual property name
              alt="ScheduleEvent"
              className="min-w-[32px] min-h-[32px] rounded-[4px] object-cover h-[32px]"
              width={32}
              height={32}
            />
          </div>

          <div className="flex w-full justify-between flex-col items-start">
            <div className="flex gap-1 items-center ">
              <div className="text-[#0a1932] text-start text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                {activityData?.myActivity?.FocusAge || "Toddles"}
              </div>
              <span className="flex items-center">•</span>
              <div className="text-[#0a1932] text-start text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                {activityData?.myActivity?.Theme || "Winter"}
              </div>
              <span className="flex items-center">•</span>
              <div className="text-[#0a1932] text-start lg:hidden text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                {activityData?.myActivity?.SetUpTime || "5 min"}
              </div>
            </div>
            <div className="grid grid-cols-4 overflow-x-scroll gap-1 justify-between items-center  scrollbar-hidden">
              {Array.isArray(activityData?.myActivity?.LearningAreaIcons) &&
                activityData?.myActivity?.LearningAreaIcons.map(
                  (skill, index) => {
                    // Extract the skill title
                    const skillTitle = skill.children[0]?.text;
                    const icon = getIconForSkill(skillTitle); // Get the icon URL dynamically

                    // console.log("Icon fetched ", icon); // You can remove this in production
                    return (
                      <Image
                        key={index}
                        src={icon || KindiHeart} // Using the icon image URL here
                        alt={skillTitle}
                        width={20}
                        title={skillTitle}
                        height={20}
                        className="w-5 h-5 cursor-pointer text-opacity-50 hover:opacity-100 duration-150 ease-out" // Set the size for the image
                      />
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CalendarDay({
  date,
  currentDate,
  activitiesForThisDate,
  handleDrop,
  handleDragStart,
  handleDragOver,
  isValidDate, // New prop to indicate if the date is valid for dropping
}) {
  return (
    <div
      key={date}
      className={`flex flex-col justify-between items-center p-2 relative py-2 bg-[#EaEaf5] border-[1.2px] border-[white] w-full rounded-md overflow-clip cursor-pointer h-[140px] ${
        isSameMonth(date, currentDate)
          ? "bg-[#eaeaf5] text-gray-700 hover:bg-gray-200"
          : "bg-[#EaEaf5] text-[#8C8C8C] cursor-not-allowed"
      } ${isValidDate ? "hover:bg-[#C8E6C9]" : "bg-[#f1f1f1]"}`} // Highlight valid dates
      data-date={format(date, "yyyy-MM-dd")}
      onDrop={(event) => handleDrop(event, date)}
      onDragOver={handleDragOver}
    >
      <span className="flex w-full text-[#000000] justify-between left-0 right-0 text-xs font-semibold p-1 rounded-t-md">
        {format(date, "d")}
      </span>

      {activitiesForThisDate.map((activity) => (
        <div
          key={activity.id}
          draggable
          onDragStart={(event) => handleDragStart(event, activity)}
          className="max-w-full text-white h-full w-full rounded-md cursor-pointer"
        >
          <ActivityCard activityData={activity} />
        </div>
      ))}
    </div>
  );
}

export default function NewCalendar({ activities }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [updatedActivities, setUpdatedActivities] = useState(activities);
  const [draggedActivity, setDraggedActivity] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [scrolling, setScrolling] = useState(false); // Track if scrolling is active
  const [scrollDirection, setScrollDirection] = useState(null); // Track the scroll direction
  const scrollContainerRef = useRef(null); // Ref to the scrollable container

  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: 8 },
    (_, index) => currentYear - 2 + index
  );

  const getCalendarDays = (date) => {
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    const startOfCalendar = startOfWeek(startOfMonthDate);
    const endOfCalendar = endOfWeek(endOfMonthDate);

    return eachDayOfInterval({
      start: startOfCalendar,
      end: endOfCalendar,
    });
  };

  // Check if the drop target is a valid date (today or in the future)
  const isValidDropDate = (date) => {
    const today = new Date();
    return date >= today; // Only allow dropping on today or future dates
  };

  const handleDrop = async (event, date) => {
    event.preventDefault();
    const activityId = event.dataTransfer.getData("activityId");

    // Ensure the dragged activity exists
    if (!draggedActivity) return;

    // Validate the drop date (it must be today or in the future)
    if (!isValidDropDate(date)) {
      toast.error(
        "You cannot drop on a past date! Please select a valid date."
      );
      return; // Don't proceed if the date is invalid
    }

    // Update the activities list with the new date for the dragged activity
    const updatedActivitiesList = updatedActivities.map((activity) => {
      if (
        activity.id === parseInt(activityId) ||
        activity.id === draggedActivity.id
      ) {
        return { ...activity, newDate: format(date, "yyyy-MM-dd") }; // Update the activity with the new date
      }
      return activity; // Return activity unchanged if it doesn't match the ID
    });

    setUpdatedActivities(updatedActivitiesList); // Update the state

    // Get the updated event that was dropped (based on either the dataTransfer activityId or draggedActivity)
    const updatedEvent = updatedActivitiesList.find(
      (activity) =>
        activity.id === parseInt(activityId) ||
        activity.id === draggedActivity.id
    );

    // Check if documentId exists for the event, then make the PUT request
    if (updatedEvent && updatedEvent.documentId) {
      const payload = {
        data: {
          newDate: format(date, "yyyy-MM-dd"), // The new date to be sent
        },
      };

      console.log("Payload to send:", payload);

      try {
        // Send the PUT request to the server with the updated event
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/rescheduled-events/${updatedEvent.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        // Handle server response
        if (response.ok) {
          console.log("Event updated successfully!");
        } else {
          const data = await response.json();
          console.error("Error updating event:", data);
        }
      } catch (error) {
        console.error("Error during API request:", error);
      }
    } else {
      console.error("No documentId found for the event.");
    }

    // Stop the dragging and scrolling state after the drop
    setDragging(false);
    setScrolling(false);
  };

  // Handle the drag start event
  const handleDragStart = (event, activity) => {
    event.dataTransfer.setData("activityId", activity.id);
    setDraggedActivity(activity);
    setDragging(true);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedActivity(null);
    setDragging(false);
  };

  // Handle drag over to allow dropping
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // For Mobile Touch Events
  let touchStartPosition = null;
  let scrollTimeout = null; // To handle the scroll interval for continuous scrolling

  const handleTouchStart = (event, date) => {
    const touch = event.touches[0];
    touchStartPosition = { x: touch.clientX, y: touch.clientY };
    setScrollDirection(null); // Reset scroll direction on touch start
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const dragElement = event.target;
    const dx = touch.clientX - touchStartPosition.x;
    const dy = touch.clientY - touchStartPosition.y;

    // Move the event while dragging
    dragElement.style.transform = `translate(${dx}px, ${dy}px)`;

    // Start auto-scrolling when the user is near the bottom or top
    if (dy > 100 && !scrolling) {
      // Scroll down when near the bottom
      setScrollDirection("down");
      setScrolling(true);
      startAutoScroll();
    } else if (dy < -100 && !scrolling) {
      // Scroll up when near the top
      setScrollDirection("up");
      setScrolling(true);
      startAutoScroll();
    }
  };

  const handleTouchEnd = (event, date) => {
    const touch = event.changedTouches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const calendarDay = elements.find((el) =>
      el.classList.contains("calendar-day")
    );

    if (!calendarDay || !draggedActivity) return;

    const newDate = calendarDay.getAttribute("data-date");

    if (!isValidDropDate(newDate)) {
      toast.error(
        "You cannot drop on a past date! Please select a valid date."
      );
      return; // Don't update if the date is in the past
    }

    const updatedActivitiesList = updatedActivities.map((activity) =>
      activity.id === draggedActivity.id ? { ...activity, newDate } : activity
    );
    setUpdatedActivities(updatedActivitiesList);
    setDragging(false);
    setScrolling(false); // Stop scrolling when dropped
    clearTimeout(scrollTimeout); // Clear auto-scroll timeout
  };

  // Function to handle the automatic scrolling
  const startAutoScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout); // Clear any existing timeout
    scrollTimeout = setTimeout(() => {
      if (scrollContainerRef.current) {
        const scrollContainer = scrollContainerRef.current;
        if (scrollDirection === "down") {
          scrollContainer.scrollTop += 5; // Increase scroll speed if needed
        } else if (scrollDirection === "up") {
          scrollContainer.scrollTop -= 5;
        }
        startAutoScroll(); // Continue scrolling until the user stops
      }
    }, 10); // Adjust the interval for scrolling speed
  };

  const calendarDays = getCalendarDays(currentDate);

  return (
    <div className="w-full max-w-full mx-auto my-6">
      <CalendarNavigation
        currentDate={currentDate}
        onPrevMonth={() => setCurrentDate(subMonths(currentDate, 1))}
        onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
      />

      <div className="flex w-full bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] flex-col">
        <Weekdays />
        <div
          ref={scrollContainerRef}
          className="flex-col flex lg:grid grid-cols-7 font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full gap-0 text-center"
        >
          {calendarDays.map((date) => {
            const activitiesForThisDate = updatedActivities.filter(
              (activity) =>
                format(parseISO(activity.newDate), "yyyy-MM-dd") ===
                format(date, "yyyy-MM-dd")
            );

            return (
              <CalendarDay
                key={date}
                date={date}
                currentDate={currentDate}
                activitiesForThisDate={activitiesForThisDate}
                handleDrop={handleDrop}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleDragOver={handleDragOver}
                isValidDate={isValidDropDate(date)} // Pass whether the date is valid
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
              />
            );
          })}
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export function NewCalendar2({ activities }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [updatedActivities, setUpdatedActivities] = useState(activities);

  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: 8 },
    (_, index) => currentYear - 2 + index
  );

  const getCalendarDays = (date) => {
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    const startOfCalendar = startOfWeek(startOfMonthDate);
    const endOfCalendar = endOfWeek(endOfMonthDate);

    return eachDayOfInterval({
      start: startOfCalendar,
      end: endOfCalendar,
    });
  };

  const getActivitiesForDate = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return updatedActivities.filter((activity) => {
      return format(parseISO(activity.newDate), "yyyy-MM-dd") === dateString;
    });
  };

  const handleDragStart = (event, activity) => {
    event.dataTransfer.setData("activityId", activity.id);
    event.target.style.opacity = 0.5;
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = 1;
  };

  // Handle the drop event
  // const handleDrop = async (event, date) => {
  //   event.preventDefault();
  //   if (!draggedActivity) return;

  //   if (!isValidDropDate(date)) {
  //     toast.error(
  //       "You cannot drop on a past date! Please select a valid date."
  //     );
  //     return; // Don't update if the date is in the past
  //   }

  //   const updatedActivitiesList = updatedActivities.map((activity) =>
  //     activity.id === draggedActivity.id
  //       ? { ...activity, newDate: format(date, "yyyy-MM-dd") }
  //       : activity
  //   );
  //   setUpdatedActivities(updatedActivitiesList);
  //   setDragging(false);
  //   setScrolling(false); // Stop scrolling when dropped
  // };
  const handleDrop = async (event, date) => {
    event.preventDefault();
    const activityId = event.dataTransfer.getData("activityId");

    // Log the dropped date to the console
    console.log("Dropped on date: ", format(date, "yyyy-MM-dd"));

    // Find the activity that was dragged and update its date
    const updatedActivitiesList = updatedActivities.map((activity) =>
      activity.id === parseInt(activityId)
        ? { ...activity, newDate: format(date, "yyyy-MM-dd") }
        : activity
    );

    setUpdatedActivities(updatedActivitiesList);

    // Get the updated event with the documentId
    const updatedEvent = updatedActivitiesList.find(
      (activity) => activity.id === parseInt(activityId)
    );

    // Check if documentId exists
    if (updatedEvent.documentId) {
      const payload = {
        data: {
          newDate: format(date, "yyyy-MM-dd"),
        },
      };

      // Log the payload to check if it's in the right format
      console.log("Payload to send:", payload);

      try {
        // Send the PUT request using the documentId
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/rescheduled-events/${updatedEvent.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        // Check for successful response
        if (response.ok) {
          console.log("Event updated successfully!");
        } else {
          // Log response if there's an error
          const data = await response.json();
          console.error("Error updating event:", data);
        }
      } catch (error) {
        console.error("Error during API request:", error);
      }
    } else {
      console.error("No documentId found for the event.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const calendarDays = getCalendarDays(currentDate);

  return (
    <div className="w-full max-w-full mx-auto my-6">
      <CalendarNavigation
        currentDate={currentDate}
        onPrevMonth={() => setCurrentDate(subMonths(currentDate, 1))}
        onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
      />

      <YearMonthSelector
        currentDate={currentDate}
        availableYears={availableYears}
        onYearChange={(e) =>
          setCurrentDate(new Date(e.target.value, currentDate.getMonth()))
        }
        onMonthChange={(e) =>
          setCurrentDate(new Date(currentDate.getFullYear(), e.target.value))
        }
      />

      <div className="flex w-full  bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] flex-col">
        <Weekdays />
        <div className="flex-col flex lg:grid grid-cols-7 font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full  gap-0 text-center">
          {calendarDays.map((date) => {
            const activitiesForThisDate = getActivitiesForDate(date);
            return (
              <CalendarDay
                key={date}
                date={date}
                currentDate={currentDate}
                activitiesForThisDate={activitiesForThisDate}
                handleDrop={handleDrop}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleDragOver={handleDragOver}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
