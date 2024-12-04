"use client";

import { getAllActivities, getUserDataByEmail } from "@/lib/hygraph";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { icons } from "@/app/constant/standard";

export default function Calendar() {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);

  // Initial loading of events from localStorage
  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem("events");
      return savedEvents ? JSON.parse(savedEvents) : [];
    } catch (error) {
      console.error("Error loading events from localStorage:", error);
      return [];
    }
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    console.log("Current events data:", events);
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Fetch activities from Hygraph only once if localStorage has no events
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesFromHygraph = await getAllActivities();
        console.log(
          "Activities fetch from Hygraph Laptop:",
          activitiesFromHygraph
        );

        if (events.length === 0) {
          // Only set events from Hygraph if local storage is empty
          setEvents(activitiesFromHygraph);
        }
      } catch (error) {
        console.error("Error fetching activities from Hygraph:", error);
      }
    };

    fetchActivities();
  }, []);

  // Fetch user data when session changes
  useEffect(() => {
    if (session && session.user) {
      fetchUserData(session.user.email);
    }
  }, [session]);

  const fetchUserData = async (email) => {
    try {
      const data = await client.request(GET_ACCOUNT_BY_EMAIL, { email });
      console.log("User Data:", data);
      setProfileData(data.account);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

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

  // Generate monthly calendar
  // Generate monthly calendar
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

  const checkEventForDate = (day) => {
    return events.filter((event) => {
      const eventDate = new Date(event.activityDate);

      if (isNaN(eventDate.getTime())) {
        console.error("Invalid event date:", event.activityDate);
        return false; // Skip if invalid
      }

      const currentDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      ).toISOString(); // Convert currentDay to ISO string for comparison

      return eventDate.toISOString().split("T")[0] === currentDay.split("T")[0]; // Compare dates only (ignore time)
    });
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, eventId) => {
    e.dataTransfer.setData("eventId", eventId);
  };

  const handleDrop = (e, day) => {
    e.preventDefault();

    const eventData = JSON.parse(e.dataTransfer.getData("event"));
    console.log("Dropped event data:", eventData);
    console.log("handleDrop called");

    // Update the event's date to the new day
    eventData.activityDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toISOString();

    // Update the event list or state with the new event data
    updateEvent(eventData); // Replace with your actual update logic
  };

  const handleDragOver = (e, dayObj) => {
    console.log(" handleDragOver called");
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayObj.day
    );

    // Prevent drop if invalid (past date or outside current month)
    if (
      !dayObj.isCurrentMonth ||
      (targetDate < today && targetDate.getDate() !== today.getDate())
    ) {
      e.preventDefault(); // Allow drop only on valid days
    } else {
      e.preventDefault(); // Allow drop on valid days
    }
  };

  const days = generateCalendar();

  return (
    <div className="max-w-full flex flex-col gap-4 justify-center items-center w-full mx-auto p-0">
      {/* Calendar Top Navigation */}
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

      {/* Calendar Top Weekdays  */}
      <div className="flex-col flex lg:grid font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full grid-cols-7 gap-0 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="font-semibold w-full justify-center items-center text-center hidden uppercase lg:flex font-fredoka text-[#3F3A64] py-2 gap-0"
          >
            {day}
          </div>
        ))}

        {/* Monthly Calendar Date View  */}
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
              data-day={dayObj.day}
              // onDrop={(e) => handleDrop(e, dayObj)}
              onDrop={(e) => handleDrop(e, dayObj.day)} //
              onDragOver={(e) => handleDragOver(e, dayObj)}
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
                {/* Show +X for additional events - Used for showing Number of event having more than one in same date */}
                {eventCount > 1 && (
                  <div className="mt-1 text-sm text-gray-600">
                    +{eventCount - 1} more
                  </div>
                )}
              </div>

              {/* Show events if they exist */}
              {eventsForDay.map((event) => (
                <Link
                  href={`/p/activities/${event.id}`}
                  target="_blank"
                  key={event.id}
                  draggable
                  className="w-full bg-white shadow-md rounded-lg p-2 text-sm"
                  onDragStart={(e) => handleDragStart(e, event.id)}
                >
                  {/* Show only the title if there are multiple events, otherwise show title and description */}
                  {eventCount > 1 ? (
                    <p className="font-semibold text-[14px] leading-[16px] lg:leading-[12px] lg:text-[12px] text-start">
                      {event.title}
                    </p>
                  ) : (
                    <>
                      <div className="flex flex-col w-full gap-1 justify-between items-start">
                        <div className="flex w-full justify-between gap-1 lg:gap-0 items-start">
                          <p className="font-semibold  text-[14px] leading-[16px] lg:text-[12px] lg:leading-[12px] text-start">
                            {event.title}
                          </p>
                          {/* Drag icon */}
                          <div className="cursor-grab text-gray-500 items-start">
                            <span className="text-xl flex items-start">⋮⋮</span>{" "}
                          </div>
                        </div>
                        <div className="flex w-full gap-2 justify-between items-end">
                          <div className="flex w-full  rounded-[4px]  max-w-[40px] object-cover h-[40px] overflow-clip">
                            <Image
                              src={event.thumbnail.url} // Make sure this matches the actual property name
                              alt="ScheduleEvent"
                              className="w-[40px] rounded-[4px] object-cover h-[40px]"
                              width={40}
                              height={40}
                            />
                          </div>

                          <div className="flex w-full justify-between flex-col items-start">
                            <div className="flex gap-1 items-center ">
                              <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                                {/* {event.focusAge || "Toddles"} */}
                                {event.focusAge.split(" ")[0] || "Toddles"}
                                {/* {(event.focusAge || "Toddles").split(" ")[0]} */}
                              </div>
                              <span className="flex items-center">•</span>
                              <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                                {event.themeName.split(" ")[0] || "Winter"}
                                {/* {(event.themeName || "Winter").split(" ")[0]} */}
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
                      {/* <StatusButton eventId={event.id}/> */}
                    </>
                  )}
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
