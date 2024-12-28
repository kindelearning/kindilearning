"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
function CalendarHeader({
  currentDate,
  selectedMonth,
  selectedYear,
  years,
  handleMonthChange,
  handleMonthSelection,
  handleYearChange,
  handleSpecificMonthYear,
}) {
  return (
    <div>
      {/* Navigation */}
      <div className="flex justify-center gap-4 w-full items-center">
        <button
          onClick={() => handleMonthChange(-1)}
          // className="text-lg font-semibold text-gray-700 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-chevron-left"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m14 16-4-4 4-4" />
          </svg>
        </button>
        <h2 className="text-xl flex justify-center items-center text-center font-bold font-fredoka text-purple">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {selectedYear}
        </h2>
        <button
          onClick={() => handleMonthChange(1)}
          // className="text-lg font-semibold text-gray-700 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-chevron-right"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m10 8 4 4-4 4" />
          </svg>
        </button>
      </div>

      {/* Month and Year Selector */}
      <div className="flex gap-2 justify-end mb-2 items-center">
        <select
          value={selectedMonth}
          onChange={handleMonthSelection}
          className="border border-gray-300 rounded-full px-4 py-2 text-gray-800 bg-gray-50 focus:ring focus:ring-gray-300 focus:outline-none transition"
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="border border-gray-300 rounded-full px-4 py-2 text-gray-800 bg-gray-50 focus:ring focus:ring-gray-300 focus:outline-none transition"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={handleSpecificMonthYear}
          className="px-4 py-2 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:outline-none transition"
        >
          Go
        </button>
      </div>
    </div>
  );
}

function EventCard({ event, onDragStart, activityUrl }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, event)}
      className="w-full bg-white shadow-md rounded-lg p-2 text-sm"
    >
      <div className="flex flex-col w-full gap-1 justify-between items-start">
        <div className="flex w-full justify-between gap-1 lg:gap-0 items-start">
          <div className="flex w-full flex-col justify-start items-start">
            <p className="font-semibold  text-[14px] leading-[16px] lg:text-[12px] lg:leading-[12px] text-start">
              {event.title}
            </p>
            <p className="font-medium  text-[10px] leading-[12px]  text-start">
              {event.description}
            </p>
          </div>
          {/* Drag icon */}
          <div className="cursor-grab text-gray-500 items-start">
            <span className="text-xl flex items-start">⋮⋮</span>{" "}
          </div>
        </div>
        <div className="flex w-full gap-2 h-fit justify-between items-start">
          <div className="flex w-full  rounded-[4px]  max-w-[32px] object-cover h-[32px] overflow-clip">
            <img
              src={`http://localhost:1337${event.Gallery[0].url} `} // Make sure this matches the actual property name
              alt="ScheduleEvent"
              className="w-[32px] rounded-[4px] object-cover h-[32px]"
              width={32}
              height={32}
            />
          </div>

          <div className="flex w-full justify-between flex-col items-start">
            <div className="flex gap-1 items-center ">
              <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                {event.focusAge || "Toddles"}
              </div>
              <span className="flex items-center">•</span>
              <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                {event.theme || "Winter"}
              </div>
              <span className="flex items-center">•</span>
              <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                {event.setUpTime || "5 min"}
              </div>
            </div>
            {/* <div className="flex flex-row justify-start items-center  w-full gap-[4px]">
              {icons.map((iconData, index) => (
                <div
                  key={index}
                  className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-[4px]`}
                  style={{ backgroundColor: iconData.color }}
                >
                  <Image
                    className="w-4 h-4"
                    src={iconData.icon}
                    alt={iconData.icon.name}
                  />
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarGrid({
  calendarDays,
  getEventsForDay,
  onDragOver,
  onDrop,
  onDayClick,
  onDragStart,
  onTouchStart,
}) {
  return (
    // <div className="flex flex-col lg:grid lg:grid-cols-7 gap-2 text-center">
    <div className="flex-col flex lg:grid font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full grid-cols-7 gap-0 text-center">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
        <div
          key={index}
          className="font-semibold w-full justify-center items-center text-center hidden uppercase lg:flex font-fredoka text-[#3F3A64] py-2 gap-0"
        >
          {day}
        </div>
      ))}

      {calendarDays.map((day, index) => {
        const dayEvents = getEventsForDay(day.day);
        const displayedEvents = dayEvents.slice(0, 1);
        // const extraEventCount = dayEvents.length - 1;
        const extraEvents = dayEvents.slice(1); // Remaining events
        const extraEventCount = extraEvents.length;

        return (
          <div
            key={index}
            className={`relative py-2 bg-[#EaEaf5] border-[1.2px] border-[white] w-full rounded-md overflow-clip cursor-pointer h-[140px] ${
              day.isPast
                ? "bg-[#EaEaf5] text-[#8C8C8C] cursor-not-allowed"
                : "bg-[#eaeaf5] text-gray-700 hover:bg-gray-200"
            }`}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, day.day)}
            onClick={() => !day.isPast && onDayClick(day.day)}
          >
            <div className="absolute top-0 flex w-full text-[#000000] justify-between left-0 right-0 text-xs font-semibold p-1 bg-gray-200 rounded-t-md">
              {day.day}
              {extraEventCount > 0 && (
                <>
                  <Dialog>
                    <DialogTrigger>
                      <div className="text-xs text-gray-500 mt-1">
                        +{extraEventCount} more
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-[#eaeaf5] max-h-[600px] h-fit overflow-y-scroll p-4 font-fredoka">
                      <DialogTitle>Extra Events on {day.day}</DialogTitle>
                      <DialogHeader>
                        Below are the additional events scheduled for this date:
                      </DialogHeader>
                      <DialogDescription className="w-full grid grid-cols-2 gap-2 justify-between">
                        {extraEvents.map((event, idx) => (
                          <>
                            <EventCard
                              key={idx}
                              event={event}
                              onDragStart={onDragStart}
                              onTouchStart={onTouchStart}
                            />
                          </>
                        ))}
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>

            <div className="mt-4 p-2 overflow-clip">
              {displayedEvents.map((event, eventIndex) => (
                <EventCard
                  key={eventIndex}
                  event={event}
                  onDragStart={onDragStart}
                  onTouchStart={onTouchStart}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CalendarwithComp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [events, setEvents] = useState([]); // Initially empty

  const draggedEventRef = useRef(null); // To store the dragged event reference

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/activities?populate=*"
        );
        const data = await response.json();
        console.log("Fetched activities:", data);

        const formattedEvents = data.data.map((activity) => ({
          id: activity.id,
          documentid: activity.documentId,
          title: activity.Title,
          focusAge: activity.FocusAge,
          setUpTime: activity.SetUpTime,
          theme: activity.Theme,
          learningArea: activity.LearningArea,
          skillCategory: activity.SkillCategory,
          Gallery: activity.Gallery,
          description: activity.LearningArea,
          activityDate: activity.ActivityDate,
        }));
        console.log("Formatted events before setting state:", formattedEvents);

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchData();
  }, []); // Run on component mount

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const generateCalendarGrid = (date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);

    const prevMonthDays = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    const prevMonthDaysToDisplay = firstDay === 0 ? 6 : firstDay - 1;

    let days = [];
    for (
      let i = prevMonthDays - prevMonthDaysToDisplay;
      i <= prevMonthDays;
      i++
    ) {
      days.push({ day: i, isCurrentMonth: false, isPast: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isPast =
        new Date(date.getFullYear(), date.getMonth(), i) < new Date();
      days.push({ day: i, isCurrentMonth: true, isPast });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false, isPast: false });
    }

    return days;
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedMonth(newDate.getMonth());
  };

  const handleSpecificMonthYear = () => {
    const newDate = new Date(selectedYear, selectedMonth);
    setCurrentDate(newDate);
  };

  const handleDragStart = (e, event) => {
    draggedEventRef.current = event; // Store the event that is being dragged
    e.dataTransfer.setData("eventId", event.id);
  };

  const handleTouchStart = (e, event) => {
    // Handle touchstart by storing the event in the ref
    draggedEventRef.current = event;
  };

  const handleDrop = (e, day) => {
    e.preventDefault();

    const today = new Date();
    const targetDate = new Date(
      currentDate.getFullYear(), // Use full year from currentDate
      currentDate.getMonth(), // Use current month
      day // Use the day passed to the drop handler
    );

    // Reset the time to 00:00:00 for both dates to ensure a full date comparison (DD/MM/YYYY)
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    console.log("Today date§", today);
    console.log("targetDate date§", targetDate);

    // Compare full dates (DD/MM/YYYY)
    if (targetDate < today) {
      alert("You cannot drop events on past dates.");
      return;
    }

    // If the dragged event exists, update its date
    if (draggedEventRef.current) {
      const eventId = draggedEventRef.current.id;
      const formattedTargetDate = targetDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? { ...event, activityDate: formattedTargetDate }
            : event
        )
      );

      draggedEventRef.current = null; // Clear reference after drop
    }
  };

  const handleTouchEnd = (e, day) => {
    // Handle touch end event (drop)
    handleDrop(e, day);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const calendarDays = generateCalendarGrid(currentDate);
  const years = [];
  for (let i = selectedYear - 5; i <= selectedYear + 5; i++) {
    years.push(i);
  }
  const getEventsForDay = (day) => {
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const formattedTargetDate = targetDate.toISOString().split("T")[0]; // Format to "YYYY-MM-DD"

    return events.filter((event) => {
      const eventDate = new Date(event.activityDate)
        .toISOString()
        .split("T")[0];
      return eventDate === formattedTargetDate;
    });
  };

  return (
    <div className="w-full mx-auto p-4 font-fredoka bg- [#ffffff] shadow-lg rounded-xl">
      <CalendarHeader
        currentDate={currentDate}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        years={years}
        handleMonthChange={handleMonthChange}
        handleMonthSelection={(e) => setSelectedMonth(parseInt(e.target.value))}
        handleYearChange={(e) => setSelectedYear(parseInt(e.target.value))}
        handleSpecificMonthYear={handleSpecificMonthYear}
      />

      <CalendarGrid
        calendarDays={calendarDays}
        getEventsForDay={getEventsForDay}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDayClick={(day) => alert(`Selected day: ${day}`)}
        onDragStart={handleDragStart}
        onTouchStart={handleTouchStart} // Add touchstart handler
        onTouchEnd={handleTouchEnd} // Add touchend handler
      />
    </div>
  );
}

// {events.map((card, id) => (
//   <>
//     <div key={id} className="mb-4 flex flex-col">
//       {" | "} {card.documentid}
//       {" | "} {card.id}
//       {" | "} {card.title}
//       {" | "} {card.description}
//       {" | "} {card.activityDate}
//       {" | "} {card.focusAge}
//       {" | "} {card.setUpTime}
//       {" | "} {card.theme}
//       {" | "} {card.learningArea}
//       {" | "} {card.skillCategory}
//     </div>
//   </>
// ))}
