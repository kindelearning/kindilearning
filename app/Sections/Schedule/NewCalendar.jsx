"use client";
import { GET_ACCOUNT_BY_EMAIL } from "@/lib/hygraph";
import { Confidence } from "@/public/Icons";
import { GraphQLClient, gql } from "graphql-request";
import { KindiHeart, ScheduleEvent } from "@/public/Images";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";
const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});

const getAllActivities = async () => {
  const query = `
    query {
      activities {
        id
        title
        setUpTime
        themeName
        skills
        focusAge
        activityDate
        content {
          html
        }
        thumbnail {
          url
        }
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();

    if (jsonData.errors) {
      console.error("GraphQL Errors:", jsonData.errors);
      throw new Error("Failed to fetch activities due to GraphQL errors.");
    }

    // Transform the data to match the event format
    const activities = jsonData.data?.activities.map((activity) => ({
      id: activity.id,
      date: new Date(activity.activityDate), // Ensure to parse the date correctly
      title: activity.title,
      description: activity.content.html, // Assuming you want the HTML content
      thumbnail: activity.thumbnail
        ? {
            url: activity.thumbnail.url,
          }
        : null,
    }));
    console.log("Activity Data:", activities);

    return activities || [];
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
};

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingPosition, setDraggingPosition] = useState({ x: 0, y: 0 }); // Track position of dragging
  const [hoveredDate, setHoveredDate] = useState(null); // Track the currently hovered date

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    if (storedEvents.length === 0) {
      const defaultEvents = [
        {
          date: new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            1
          ),
          title: "New Year Celebration",
          description: "Celebrate the New Year with friends and family!",
        },
        {
          date: new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            14
          ),
          title: "Valentine's Day",
          description: "Plan a special dinner for your loved one.",
        },
        {
          date: new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            25
          ),
          title: "Team Meeting",
          description: "Monthly team meeting to discuss progress and plans.",
        },
      ];
      setEvents(defaultEvents);
      localStorage.setItem("events", JSON.stringify(defaultEvents));
    } else {
      setEvents(storedEvents);
    }
  }, [currentMonth]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDay = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(
    currentMonth.getMonth(),
    currentMonth.getFullYear()
  );
  const startDay = getStartDay(
    currentMonth.getMonth(),
    currentMonth.getFullYear()
  );

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(
      <div
        key={`empty-${i}`}
        className="border border-gray-300 w-full h-16"
      ></div>
    );
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateEvents = events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth.getMonth() &&
        event.date.getFullYear() === currentMonth.getFullYear()
    );

    days.push(
      <div key={day} className="flex flex-col">
        <div
          onClick={() => setSelectedDate(day)}
          className={`border w-full border-gray-300 min-h-16 h-fit bg-white rounded-sm flex items-center justify-start px-4 cursor-pointer transition-colors duration-200 ${
            selectedDate === day
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100"
          }`}
        >
          {day}
        </div>
        <div className="ml-4">
          {dateEvents.map((event, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(event)}
              onDragEnd={() => handleDragEnd()}
              onTouchStart={(e) => handleDragStart(event, e)} // Start dragging on touch
              onTouchEnd={() => handleDragEnd()} // End dragging on touch
              onTouchMove={(e) => handleTouchMove(e)} // Handle touch move
              className={`bg-green-200 p-1 rounded mt-1 text-sm cursor-pointer ${
                isDragging ? "opacity-50" : ""
              } ${
                isDragging && draggedEvent?.title === event.title
                  ? "border-2 border-blue-500"
                  : ""
              }`}
              style={
                isDragging
                  ? {
                      transform: `translate(${draggingPosition.x}px, ${draggingPosition.y}px)`,
                    }
                  : {}
              }
            >
              <strong>{event.title}</strong>: {event.description}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (selectedDate && eventTitle) {
      const newEvent = {
        date: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          selectedDate
        ),
        title: eventTitle,
        description: eventDescription,
      };
      setEvents([...events, newEvent]);
      setEventTitle("");
      setEventDescription("");
    }
  };

  const handleDragStart = (event, e) => {
    e.preventDefault(); // Prevent default behavior
    setDraggedEvent(event);
    setIsDragging(true);
    setDraggingPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY }); // Set initial dragging position
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedEvent(null);
    setDraggingPosition({ x: 0, y: 0 }); // Reset dragging position
    setHoveredDate(null); // Reset hovered date
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      setDraggingPosition({ x: touch.clientX - 50, y: touch.clientY - 50 }); // Center the drag position
      e.preventDefault(); // Prevent scrolling while dragging

      // Check which date is being hovered
      const targetElement = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      );
      if (targetElement && targetElement.innerText) {
        const targetDay = parseInt(targetElement.innerText);
        if (!isNaN(targetDay)) {
          setHoveredDate(targetDay); // Set hovered date
        }
      }
    }
  };

  const handleDrop = (day) => {
    if (draggedEvent) {
      const updatedEvent = {
        ...draggedEvent,
        date: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day
        ),
      };
      setEvents(
        events.map((e) =>
          e.title === draggedEvent.title &&
          e.description === draggedEvent.description
            ? updatedEvent
            : e
        )
      );
      handleDragEnd(); // Call handleDragEnd to reset the dragging state
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-1 w-full gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index + 1)}
            onMouseEnter={() =>
              hoveredDate === index + 1 && handleDrop(index + 1)
            } // Check for hovered date
            className={
              hoveredDate === index + 1
                ? "border-2 border-blue-500 bg-blue-100"
                : ""
            }
          >
            {day}
          </div>
        ))}
      </div>
      {selectedDate && (
        <form onSubmit={addEvent} className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Add Event</h3>
          <input
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full mb-2"
          />
          <textarea
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-2"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Event
          </button>
        </form>
      )}
    </div>
  );
}

// export default function Calendar() {
//   const { data: session, status } = useSession();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [events, setEvents] = useState([]);
//   const today = new Date();

//   useEffect(() => {
//     const fetchActivities = async () => {
//       const activitiesFromHygraph = await getAllActivities();
//       console.log(activitiesFromHygraph); // Log the activities
//       setEvents(activitiesFromHygraph);
//     };

//     fetchActivities();
//   }, []);

//   // Fetched User Data
//   useEffect(() => {
//     if (session && session.user) {
//       fetchUserData(session.user.email);
//     }
//   }, [session]);

//   const fetchUserData = async (email) => {
//     try {
//       const data = await client.request(GET_ACCOUNT_BY_EMAIL, { email });
//       setProfileData(data.account);
//       console.log("User Data", data);
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   const handlePrevMonth = () => {
//     const newDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() - 1,
//       1
//     );
//     setCurrentDate(newDate);
//   };

//   const handleNextMonth = () => {
//     const newDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       1
//     );
//     setCurrentDate(newDate);
//   };

//   // Generating the Monthly Calendar Widget
//   const generateCalendar = () => {
//     const startOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       1
//     );
//     const endOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     );
//     const daysInMonth = endOfMonth.getDate();
//     const firstDayOfWeek = startOfMonth.getDay();

//     const totalDaysToShow = firstDayOfWeek + daysInMonth > 35 ? 42 : 35;

//     const totalDays = Array.from({ length: totalDaysToShow }, (_, i) => {
//       if (i < firstDayOfWeek) {
//         // Days from the previous month
//         const prevMonthEnd = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           0
//         ).getDate();
//         return {
//           day: prevMonthEnd - (firstDayOfWeek - 1 - i),
//           isCurrentMonth: false,
//         };
//       } else if (i >= daysInMonth + firstDayOfWeek) {
//         return {
//           day: i - (daysInMonth + firstDayOfWeek) + 1,
//           isCurrentMonth: false,
//         };
//       }
//       return {
//         day: i - firstDayOfWeek + 1,
//         isCurrentMonth: true,
//       };
//     });

//     return totalDays;
//   };

//   const checkEventForDate = (day) => {
//     return events.filter((event) => {
//       return (
//         event.date.getDate() === day &&
//         event.date.getMonth() === currentDate.getMonth() &&
//         event.date.getFullYear() === currentDate.getFullYear()
//       );
//     });
//   };

//   // Handle drag start (store event ID in dataTransfer object)
//   const handleDragStart = (e, eventId) => {
//     e.dataTransfer.setData("eventId", eventId);
//   };

//   // Handle drop (update event date)
//   const handleDrop = (e, dayObj) => {
//     const eventId = e.dataTransfer.getData("eventId");
//     // Prevent dropping on disabled dates or past dates
//     const targetDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       dayObj.day
//     );
//     // Allow drop events in today
//     if (
//       !dayObj.isCurrentMonth ||
//       (targetDate < today && targetDate.getDate() !== today.getDate())
//     ) {
//       return;
//     }

//     setEvents((prevEvents) =>
//       prevEvents.map((event) =>
//         event.id === eventId
//           ? {
//               ...event,
//               date: targetDate,
//             }
//           : event
//       )
//     );
//     console.log(`Event dropped on: ${targetDate}`);
//   };

//   // Allow drag over (necessary to allow dropping)
//   const handleDragOver = (e, dayObj) => {
//     const targetDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       dayObj.day
//     );
//     // Prevent drag over on disabled dates or past dates
//     if (
//       !dayObj.isCurrentMonth ||
//       (targetDate < today && targetDate.getDate() !== today.getDate())
//     ) {
//       e.preventDefault(); // Prevent default action (disallows dragging)
//     } else {
//       e.preventDefault(); // Allows dragging if date is valid
//     }
//   };

//   const days = generateCalendar();

//   return (
//     <div className="max-w-full flex flex-col gap-4 justify-center items-center w-full mx-auto p-0">
//       {/* Calendar Top Navigation */}
//       <div className="flex justify-center gap-4 w-full items-center">
//         <button onClick={handlePrevMonth}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="red"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-square-chevron-left"
//           >
//             <rect width="18" height="18" x="3" y="3" rx="2" />
//             <path d="m14 16-4-4 4-4" />
//           </svg>
//         </button>
//         <h2 className="text-xl flex justify-center items-center text-center font-bold font-fredoka text-purple">
//           {currentDate.toLocaleString("default", { month: "long" })} |{" "}
//           {currentDate.getFullYear()}
//         </h2>
//         <button onClick={handleNextMonth}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="red"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-square-chevron-right"
//           >
//             <rect width="18" height="18" x="3" y="3" rx="2" />
//             <path d="m10 8 4 4-4 4" />
//           </svg>
//         </button>
//       </div>

//       {/* Calendar Top Weekdays  */}
//       <div className="flex-col flex lg:grid font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full grid-cols-7 gap-0 text-center">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <div
//             key={day}
//             className="font-semibold w-full justify-center items-center text-center hidden uppercase lg:flex font-fredoka text-[#3F3A64] py-2 gap-0"
//           >
//             {day}
//           </div>
//         ))}

//         {/* Monthly Calendar Date View  */}
//         {days.map((dayObj, index) => {
//           const isToday =
//             dayObj.isCurrentMonth &&
//             dayObj.day === today.getDate() &&
//             currentDate.getMonth() === today.getMonth() &&
//             currentDate.getFullYear() === today.getFullYear();

//           const eventsForDay = checkEventForDate(dayObj.day);
//           const eventCount = eventsForDay.length;

//           return (
//             <div
//               key={index}
//               onDrop={(e) => handleDrop(e, dayObj)}
//               onDragOver={(e) => handleDragOver(e, dayObj)}
//               className={`p-2 gap-[2px] flex flex-col font-fredoka justify-start items-start border-[1.2px] border-[white] w-full min-h-[40px] h-fit lg:h-[140px] ${
//                 !dayObj.isCurrentMonth
//                   ? "bg-[#EFEFEF] text-[#8C8C8C] cursor-not-allowed"
//                   : isToday
//                   ? "bg-[#ffd9d9] text-[#000000] "
//                   : dayObj.day < today.getDate() &&
//                     currentDate.getMonth() === today.getMonth()
//                   ? "bg-[#DCDCE8] text-[#999] cursor-not-allowed" // Past dates in the current month
//                   : "bg-[#eaeaf5] lg:bg-[#DCDCE8] cursor-pointer"
//               }`}
//             >
//               <div className="flex w-full justify-between">
//                 <span className="text-right">{dayObj.day}</span>
//                 {/* Show +X for additional events - Used for showing Number of event having more than one in same date */}
//                 {eventCount > 1 && (
//                   <div className="mt-1 text-sm text-gray-600">
//                     +{eventCount - 1} more
//                   </div>
//                 )}
//               </div>

//               {/* Show events if they exist */}
//               {eventsForDay.map((event, index) => (
//                 <div
//                   key={event.id}
//                   draggable
//                   className="w-full bg-white shadow-md rounded-lg p-2 text-sm"
//                   onDragStart={(e) => handleDragStart(e, event.id)}
//                 >
//                   {/* Show only the title if there are multiple events, otherwise show title and description */}
//                   {eventCount > 1 ? (
//                     <p className="font-semibold text-[14px] leading-[16px] lg:leading-[12px] lg:text-[12px] text-start">
//                       {event.title}
//                     </p>
//                   ) : (
//                     <>
//                       <div className="flex flex-col w-full gap-1 justify-between items-start">
//                         <div className="flex w-full justify-between gap-1 lg:gap-0 items-start">
//                           <p className="font-semibold  text-[14px] leading-[16px] lg:text-[12px] lg:leading-[12px] text-start">
//                             {event.title}
//                           </p>
//                           {/* Drag icon */}
//                           <div className="cursor-grab text-gray-500 items-start">
//                             <span className="text-xl flex items-start">⋮⋮</span>{" "}
//                           </div>
//                         </div>
//                         <div className="flex w-full gap-2 justify-between items-end">
//                           <div className="flex w-full  rounded-[4px]  max-w-[40px] object-cover h-[40px] overflow-clip">
//                             <Image
//                               src={event.thumbnail.url} // Make sure this matches the actual property name
//                               alt="ScheduleEvent"
//                               className="w-[40px] rounded-[4px] object-cover h-[40px]"
//                               width={40}
//                               height={40}
//                             />
//                           </div>

//                           <div className="flex w-full justify-between flex-col items-start">
//                             <div className="flex gap-1 items-center ">
//                               <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
//                                 {/* {event.focusAge} */}
//                                 Tag 1
//                               </div>
//                               <span className="flex items-center">•</span>
//                               <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
//                                 {/* {event.themeName} */}
//                                 Tag 2
//                               </div>
//                             </div>
//                             <div className="flex flex-row justify-start items-center  w-full gap-[4px]">
//                               {icons.map((iconData, index) => (
//                                 <div
//                                   key={index}
//                                   className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-[4px]`}
//                                   style={{ backgroundColor: iconData.color }}
//                                 >
//                                   <Image
//                                     className="w-4 h-4"
//                                     src={iconData.icon}
//                                     alt={iconData.icon.name}
//                                   />
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
