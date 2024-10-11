"use client";
import { Confidence } from "@/public/Icons";
import { KindiHeart, ScheduleEvent } from "@/public/Images";
import Image from "next/image";
import { useState } from "react";

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

const NewCalendar = ({ backgroundColor }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const [events, setEvents] = useState([
    {
      id: "1",
      date: new Date(2024, 9, 12),
      title: "Nature meets Imagination: Leaf Hedgehog House",
      description: "Discuss salon website updates in detail",
    },
    {
      id: "2",
      date: new Date(2024, 9, 20),
      title: "Marketing Campaign",
      description: "Launch the new holiday campaign",
    },
    {
      id: "3",
      date: new Date(2024, 9, 20),
      title: "Team Lunch Two",
      description:
        "Celebrate the successful campaign launch with the team at a nice restaurant",
    },
    {
      id: "4",
      date: new Date(2024, 9, 20),
      title: "Team Lunch",
      description:
        "Celebrate the successful campaign launch with the team at a nice restaurant",
    },
  ]);

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

    const totalDaysToShow = firstDayOfWeek + daysInMonth > 35 ? 42 : 35;

    const totalDays = Array.from({ length: totalDaysToShow }, (_, i) => {
      if (i < firstDayOfWeek) {
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

  const checkEventForDate = (day) => {
    return events.filter((event) => {
      return (
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  // Generate calendar days for the current month
  const days = generateCalendar();

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

      <div className="flex-col flex lg:grid font-fredoka p-0 lg:p-4 bg-[#eaeaf5] gap-1 lg:bg-[#DCDCE8] rounded-[20px] w-full grid-cols-7 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="font-semibold w-full justify-center items-center text-center hidden uppercase lg:flex font-fredoka text-[#3F3A64] py-2 gap-0"
          >
            {day}
          </div>
        ))}

        {/* Render all days of the month */}
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
              className={`border rounded-lg flex flex-col p-2 gap-1 relative bg-[#f5f5f5] ${
                isToday ? "border-red-400" : "border-[#dcdce8]"
              } ${dayObj.isCurrentMonth ? "" : "bg-[#DCDCE8]"}`}
            >
              <div
                className={`text-[12px] w-full text-start  font-fredoka flex justify-start items-start ${
                  !dayObj.isCurrentMonth ? "text-[#a1a1a1]" : ""
                }`}
              >
                {dayObj.day}
              </div>
              <div className="flex flex-col justify-start items-start bg-[#eaeaf5]">
                {eventCount > 0 ? (
                  <div className="flex w-full h-full flex-col gap-2 bg-[#f5f5f5]">
                    {eventsForDay.slice(0, 2).map((event, i) => (
                      <div
                        key={event.id}
                        className="flex justify-between p-2 rounded-[4px] bg-[#eaeaf5] w-full items-center gap-2 cursor-grab"
                      >
                        <div className="flex w-full flex-col gap-1">
                          <div className="flex justify-start w-full items-center gap-1">
                            <span className="text-[14px] w-full text-start font-fredoka">
                              {event.title}
                            </span>
                            {/* <div className="flex w-full justify-start gap-1"></div> */}
                            <span className="text-xl">⋮⋮</span>{" "}
                          </div>
                          {/* Drag Icon Next to Event */}
                          <div className="flex w-full justify-between flex-col items-start">
                            <div className="flex gap-1 items-center">
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
                    ))}
                    {eventCount > 2 && (
                      <span className="text-[12px] text-[#6d6d6d] font-fredoka">
                        +{eventCount - 2} more
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-[12px] bg-[#f5f5f5] w-full flex justify-start text-[#6d6d6d] font-fredoka">
                    No Activity Found
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewCalendar;
