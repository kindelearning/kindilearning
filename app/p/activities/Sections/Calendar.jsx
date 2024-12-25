"use client";

import React, { useState, useEffect } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const events = [
    { date: 5, title: "Meeting with John", description: "Discuss project" },
    { date: 8, title: "Doctor's Appointment", description: "Annual checkup" },
    { date: 8, title: "Doctor's Appointment", description: "Annual checkup" },
    { date: 8, title: "Doctor's Appointment", description: "Annual checkup" },
    { date: 8, title: "Doctor's Appointment", description: "Annual checkup" },
    {
      date: 15,
      title: "Team Workshop",
      description: "Design brainstorming session",
    },
    {
      date: 22,
      title: "Birthday Party",
      description: "Celebrate Mike's birthday",
    },
  ];

  // Get the first day of the current month
  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  // Get total days in the current month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Generate the full calendar grid
  const generateCalendarGrid = (date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);

    // Calculate previous month's days to fill the first row
    const prevMonthDays = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    const prevMonthDaysToDisplay = firstDay === 0 ? 6 : firstDay - 1;

    let days = [];

    // Add previous month's days
    for (
      let i = prevMonthDays - prevMonthDaysToDisplay;
      i <= prevMonthDays;
      i++
    ) {
      days.push({ day: i, isCurrentMonth: false, isPast: true });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const isPast =
        new Date(date.getFullYear(), date.getMonth(), i) < new Date();
      days.push({ day: i, isCurrentMonth: true, isPast });
    }

    // Fill next month's days to complete the grid
    const remainingDays = 42 - days.length; // We want 6 rows (7 days each)
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false, isPast: false });
    }

    return days;
  };

  // Change the month
  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedMonth(newDate.getMonth());
  };

  // Handle jumping to specific month and year
  const handleSpecificMonthYear = () => {
    const newDate = new Date(selectedYear, selectedMonth);
    setCurrentDate(newDate);
  };

  // Handle year selection from the dropdown
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Handle month selection from the dropdown
  const handleMonthSelection = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  // Generate the grid for the current month
  const calendarDays = generateCalendarGrid(currentDate);

  const years = [];
  for (let i = selectedYear - 5; i <= selectedYear + 5; i++) {
    years.push(i);
  }

  const getEventsForDay = (day) => {
    return events.filter((event) => event.date === day);
  };

  return (
    <div className="w-full mx-auto p-4 font-fredoka bg-[#ffffff] shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange(-1)}
          className="text-lg font-semibold text-gray-700 hover:text-gray-900"
        >
          &lt;
        </button>
        <div className="text-[24px] font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
        <button
          onClick={() => handleMonthChange(1)}
          className="text-lg font-semibold text-gray-700 hover:text-gray-900"
        >
          &gt;
        </button>
      </div>

      {/* Month and Year Selector */}
      <div className="flex space-x-4 mb-4">
        <select
          id="specificMonth"
          value={selectedMonth}
          onChange={handleMonthSelection}
          className="p-2 border ] border-gray-300 rounded-md"
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
          id="specificYear"
          value={selectedYear}
          onChange={handleYearChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={handleSpecificMonthYear}
          className="text-red border-red px-4 py-2 rounded-md"
        >
          Go
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className=" hidden lg:block font-semibold text-gray-600">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDay(day.day); // Fetch events for the day
          const displayedEvents = dayEvents.slice(0, 2); // Only show the first two events
          const extraEventCount = dayEvents.length - 2; // Calculate the number of additional events

          return (
            <div
              key={index}
              className={`relative py-2 rounded-md overflow-clip cursor-pointer h-[120px] ${
                day.isPast
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#eaeaf5] text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                if (!day.isPast) {
                  alert(`Selected day: ${day.day}`);
                }
              }}
            >
              <div className="absolute top-0 flex w-full justify-between left-0 right-0 text-xs font-semibold p-1 bg-gray-200 rounded-t-md">
                {day.day}
                {extraEventCount > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    +{extraEventCount} more
                  </div>
                )}
              </div>

              <div className="mt-4 p-2 overflow-clip">
                {displayedEvents.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="bg-blue-100 p-1 mb-1 rounded-md"
                  >
                    <h5 className="font-semibold text-sm truncate">
                      {event.title}
                    </h5>
                    <p className="text-xs text-gray-600 truncate">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
