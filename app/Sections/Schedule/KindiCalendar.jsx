"use client";
import { Confidence } from "@/public/Icons";
import { KindiHeart, ScheduleEvent } from "@/public/Images";
import Image from "next/image";
import { useState } from "react";
const initialValue = [];

const icons = [
  {
    icon: KindiHeart,
    color: "#c42797",
  },
  {
    icon: Confidence,
    color: "#029871",
  },
  {
    icon: KindiHeart,
    color: "#3f3a64",
  },
  {
    icon: Confidence,
    color: "#ff8e00",
  },
];
const Calendar = ({ backgroundColor }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState(initialValue);
  const [events, setEvents] = useState([
    {
      id: "1",
      date: new Date(2024, 9, 12), // Event on Oct 12, 2024
      title: "Nature meets Imagination: Leaf Hedgehog House Hedgehog House",
      description: "Discuss salon website updates in detail",
    },
    {
      id: "2",
      date: new Date(2024, 9, 20), // Event on Oct 20, 2024
      title: "Marketing Campaign",
      description: "Launch the new holiday campaign",
    },
    {
      id: "3",
      date: new Date(2024, 9, 20), // Another event on Oct 20, 2024
      title: "Team Lunch Two",
      description:
        "Celebrate the successful campaign launch with the team at a nice restaurant",
    },
    {
      id: "4",
      date: new Date(2024, 9, 20), // Another event on Oct 20, 2024
      title: "Team Lunch",
      description:
        "Celebrate the successful campaign launch with the team at a nice restaurant",
    },
  ]);
  const today = new Date();

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  const generateCalendar = () => {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const daysInMonth = endOfMonth.getDate();
    const firstDayOfWeek = startOfMonth.getDay();

    const totalDaysToShow = firstDayOfWeek + daysInMonth > 35 ? 42 : 35; // 5 or 6 rows (35 or 42 days)

    const totalDays = Array.from({ length: totalDaysToShow }, (_, i) => {
      if (i < firstDayOfWeek) {
        // Days from the previous month
        const prevMonthEnd = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate();
        return {
          day: prevMonthEnd - (firstDayOfWeek - 1 - i),
          isCurrentMonth: false,
        };
      } else if (i >= daysInMonth + firstDayOfWeek) {
        return {
          day: i - (daysInMonth + firstDayOfWeek) + 1,
          isCurrentMonth: false,
        };
      }
      return {
        day: i - firstDayOfWeek + 1,
        isCurrentMonth: true,
      };
    });

    return totalDays;
  };

  // Touch event handlers
  const handleTouchStart = (e, eventId) => {
    e.preventDefault();
    handleDragStart(e, eventId); // Use the existing drag start logic
  };

  const handleTouchEnd = (e, dayObj) => {
    e.preventDefault();
    handleDrop(e, dayObj); // Use the existing drop logic
  };
  const checkEventForDate = (day) => {
    return events.filter((event) => {
      return (
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  // Handle drag start (store event ID in dataTransfer object)
  const handleDragStart = (e, eventId) => {
    e.dataTransfer.setData("eventId", eventId);
  };

  // Handle drop (update event date)
  const handleDrop = (e, dayObj) => {
    const eventId = e.dataTransfer.getData("eventId");

    // Prevent dropping on disabled dates or past dates
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayObj.day
    );
    // if (!dayObj.isCurrentMonth || targetDate < today) {
    if (
      !dayObj.isCurrentMonth ||
      (targetDate < today && targetDate.getDate() !== today.getDate())
    ) {
      return; // Do nothing if the date is in the past or not part of the current month
    }

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              date: targetDate,
            }
          : event
      )
    );
    console.log(`Event dropped on: ${targetDate}`);
  };

  // Allow drag over (necessary to allow dropping)
  const handleDragOver = (e, dayObj) => {
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayObj.day
    );
    // Prevent drag over on disabled dates or past dates
    if (
      !dayObj.isCurrentMonth ||
      (targetDate < today && targetDate.getDate() !== today.getDate())
    ) {
      e.preventDefault(); // Prevent default action (disallows dragging)
    } else {
      e.preventDefault(); // Allows dragging if date is valid
    }
  };

  const days = generateCalendar();

  // Utility function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="max-w-full flex flex-col gap-4 justify-center items-center w-full mx-auto p-0">
      <div className="flex justify-center gap-4 w-full items-center">
        <button onClick={handlePrevMonth}>
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
          {currentDate.toLocaleString("default", { month: "long" })} |{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>
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

      <div className="flex-col flex lg:grid font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full grid-cols-7 gap-0 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="font-semibold w-full justify-center items-center text-center hidden uppercase lg:flex font-fredoka text-[#3F3A64] py-2 gap-0"
          >
            {day}
          </div>
        ))}

        {days.map((dayObj, index) => {
          const isToday =
            dayObj.isCurrentMonth &&
            dayObj.day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          const eventsForDay = checkEventForDate(dayObj.day);
          const eventCount = eventsForDay.length;

          return (
            <div
              key={index}
              onDrop={(e) => handleDrop(e, dayObj)}
              onDragOver={(e) => handleDragOver(e, dayObj)}
              onTouchEnd={(e) => handleTouchEnd(e, dayObj)} // Added touch end
              onTouchStart={(e) => handleTouchStart(e, eventsForDay[0]?.id)} // Added touch start
              className={`p-2 gap-[2px] flex flex-col font-fredoka justify-start items-start border-[1.2px] border-[white] w-full min-h-[40px] h-fit lg:h-[140px] ${
                !dayObj.isCurrentMonth
                  ? "bg-[#EFEFEF] text-[#8C8C8C] cursor-not-allowed"
                  : isToday
                  ? "bg-[#ffd9d9] text-[#000000] "
                  : dayObj.day < today.getDate() &&
                    currentDate.getMonth() === today.getMonth()
                  ? "bg-[#DCDCE8] text-[#999] cursor-not-allowed" // Past dates in the current month
                  : "bg-[#eaeaf5] lg:bg-[#DCDCE8] cursor-pointer"
              }`}
            >
              <div className="flex w-full justify-between">
                <span className="text-right">{dayObj.day}</span>
                {/* Show +X for additional events */}
                {eventCount > 1 && (
                  <div className="mt-1 text-sm text-gray-600">
                    +{eventCount - 1} more
                  </div>
                )}
              </div>
              {/* Show events if they exist */}
              {eventsForDay.map((event, index) => (
                <div
                  key={event.id}
                  draggable
                  onTouchStart={(e) => handleTouchStart(e, event.id)} // Added touch start
                  className="w-full bg-white shadow-md rounded-lg p-2 text-sm"
                  onDragStart={(e) => handleDragStart(e, event.id)}
                >
                  {/* <div className="flex">

                  </div> */}

                  {/* Show only the title if there are multiple events, otherwise show title and description */}
                  {eventCount > 1 ? (
                    <p className="font-semibold text-[14px] leading-[16px] lg:leading-[10px] lg:text-[9px] text-start">
                      {/* {truncateText(event.title, 16)}{" "} */}
                      {event.title}

                      {/* Truncate title to 16 chars */}
                    </p>
                  ) : (
                    <>
                      <div className="flex flex-col w-full gap-1 justify-between items-start">
                        <div className="flex w-full justify-between gap-1 lg:gap-0 items-start">
                          <p className="font-semibold  text-[14px] leading-[16px] lg:text-[9px] lg:leading-[10px] text-start">
                            {/* {truncateText(event.title, 16)} */}
                            {event.title}
                            {/* Truncate title to 16 chars */}
                          </p>
                          {/* Drag icon */}
                          <div className="cursor-grab text-gray-500 items-start">
                            <span className="text-xl flex items-start">⋮⋮</span>{" "}
                            {/* Drag handle */}
                          </div>
                        </div>
                        <div className="flex w-full gap-2 justify-between items-start">
                          <div className="flex w-full h-[40px] overflow-clip">
                            <Image
                              src={ScheduleEvent}
                              alt="ScheduleEvent"
                              className="w-[40px] object-cover h-[40px]"
                            />
                          </div>

                          <div className="flex w-full justify-between flex-col items-start">
                            <div className="flex gap-1 items-center ">
                              <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                                Tag 1
                              </div>
                              <span className="flex items-center">•</span>
                              <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                                Tag 2
                              </div>
                              <span className="flex items-center">•</span>

                              <div className="text-[#0a1932] text-[12px] leading-[14px]  lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                                Tag 3
                              </div>
                            </div>
                            <div className="flex flex-row justify-start items-center  w-full gap-[4px]">
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
