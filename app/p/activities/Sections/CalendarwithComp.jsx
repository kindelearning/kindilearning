"use client";

import React, { useState, useEffect, useRef } from "react";

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
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange(-1)}
          className="text-lg font-semibold text-gray-700 hover:text-gray-900"
        >
          &lt;
        </button>
        <div className="text-[24px] font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {selectedYear}
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
          value={selectedMonth}
          onChange={handleMonthSelection}
          className="p-2 border border-gray-300 rounded-md"
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
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Go
        </button>
      </div>
    </div>
  );
}

function EventCard({ event, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, event)}
      className="bg-blue-100 p-1 mb-1 rounded-md"
    >
      <h5 className="font-semibold text-sm truncate">{event.title}</h5>
      <p className="text-xs text-gray-600 truncate">{event.description}</p>
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
    <div className="flex flex-col lg:grid lg:grid-cols-7 gap-2 text-center">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
        <div
          key={index}
          className="hidden lg:block font-semibold text-gray-600"
        >
          {day}
        </div>
      ))}

      {calendarDays.map((day, index) => {
        const dayEvents = getEventsForDay(day.day);
        const displayedEvents = dayEvents.slice(0, 2);
        const extraEventCount = dayEvents.length - 2;

        return (
          <div
            key={index}
            className={`relative py-2 rounded-md overflow-clip cursor-pointer h-[120px] ${
              day.isPast
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#eaeaf5] text-gray-700 hover:bg-gray-200"
            }`}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, day.day)}
            onClick={() => !day.isPast && onDayClick(day.day)}
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
  const [events, setEvents] = useState([
    {
      id: 1,
      date: 5,
      title: "Meeting with John",
      description: "Discuss project",
    },
    {
      id: 2,
      date: 8,
      title: "Doctor's Appointment",
      description: "Annual checkup",
    },
    {
      id: 3,
      date: 15,
      title: "Team Workshop",
      description: "Design brainstorming session",
    },
    {
      id: 4,
      date: 22,
      title: "Birthday Party",
      description: "Celebrate Mike's birthday",
    },
    {
      id: 5,
      date: 25,
      title: "Birthday Party",
      description: "Celebrate Mike's birthday",
    },
  ]);

  const draggedEventRef = useRef(null); // To store the dragged event reference

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

    const prevMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const prevMonthDaysToDisplay = firstDay === 0 ? 6 : firstDay - 1;

    let days = [];
    for (let i = prevMonthDays - prevMonthDaysToDisplay; i <= prevMonthDays; i++) {
      days.push({ day: i, isCurrentMonth: false, isPast: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isPast = new Date(date.getFullYear(), date.getMonth(), i) < new Date();
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
    // For touch events, we don't use dataTransfer, so we store the data manually
    e.dataTransfer.setData("eventId", event.id); // For desktop
  };

  const handleTouchStart = (e, event) => {
    // Handle touchstart by storing the event in the ref
    draggedEventRef.current = event;
  };

  const handleDrop = (e, day) => {
    e.preventDefault();

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get the target drop date
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    // Prevent dropping on past dates
    if (targetDate < today) {
      alert("You cannot drop events on past dates.");
      return;
    }

    if (draggedEventRef.current) {
      const eventId = draggedEventRef.current.id;
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === eventId ? { ...e, date: day } : e))
      );
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

  return (
    <div className="w-full mx-auto p-4 font-fredoka bg-[#ffffff] shadow-lg rounded-xl">
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
        getEventsForDay={(day) => events.filter((event) => event.date === day)}
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
