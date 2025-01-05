"use client";

import { useRouter } from "next/navigation";
import CalendarwithComp from "../Sections/CalendarwithComp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { fetchUserDetails } from "@/app/profile/api";
import { getRandomImage } from "@/app/profile/milestone/page";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchAllActivities } from "@/app/data/p/Dynamic/Activity";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ActivityCalendar = () => {
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activitiesOnSelectedDate, setActivitiesOnSelectedDate] = useState([]);

  // Fetch activities from the server
  useEffect(() => {
    const getActivities = async () => {
      const fetchedActivities = await fetchAllActivities();
      if (fetchedActivities) {
        setActivities(fetchedActivities);
      }
    };

    getActivities();
  }, []);

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterActivitiesForDate(date);
  };

  // Filter activities for the selected date
  const filterActivitiesForDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const activitiesForDate = activities.filter(
      (activity) => activity.ActivityDate === formattedDate
    );
    setActivitiesOnSelectedDate(activitiesForDate);
  };

  // Handle drag-and-drop
  const handleDragEnd = (result) => {
    const { destination, source } = result;

    // If no destination, activity was dropped outside the droppable area
    if (!destination) {
      console.log("Dropped outside of droppable area");
      return;
    }

    // Get the current date
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0]; // Format today as YYYY-MM-DD

    // Compare destination date with today's date
    const destinationDate = destination.droppableId;

    // If the destination date is before today, prevent the drop
    if (destinationDate < formattedToday) {
      console.log("Cannot drop on past date");
      return; // Prevent drop on past dates
    }

    // If destination is a valid (future or today) date, update the activity date
    if (destination.droppableId !== source.droppableId) {
      const updatedActivities = activities.map((activity) =>
        activity.id.toString() === result.draggableId
          ? { ...activity, ActivityDate: destination.droppableId }
          : activity
      );

      setActivities(updatedActivities);
      filterActivitiesForDate(selectedDate); // Refresh the activities on the selected date
    }
  };

  // Render activities inside each date block
  const renderDayWithActivities = (value) => {
    const formattedDate = value.toISOString().split("T")[0];
    const activitiesForDay = activities.filter(
      (activity) => activity.ActivityDate === formattedDate
    );

    return (
      <Droppable
        droppableId={formattedDate}
        type="activity"
        key={formattedDate}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2 border rounded-lg min-h-[60px] ${
              snapshot.isDraggingOver ? "bg-blue-100" : "bg-white"
            }`}
          >
            <span className="text-sm font-bold">{value.getDate()}</span>
            {activitiesForDay.map((activity, index) => (
              <Draggable
                key={activity.id}
                draggableId={activity.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-blue-500 text-white text-xs p-2 rounded-md mb-1"
                  >
                    {activity.Title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="max-w-full mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Activity Calendar
        </h1>
        <div className="flex justify-center mb-6 w-full">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            locale="en-US"
            tileContent={({ date, view }) =>
              view === "month" ? renderDayWithActivities(date) : null
            }
            className="react-calendar w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Activities for {selectedDate.toDateString()}
          </h2>
          {activitiesOnSelectedDate.length === 0 ? (
            <p className="text-lg text-gray-500">No activities on this day.</p>
          ) : (
            <ul className="space-y-4">
              {activitiesOnSelectedDate.map((activity) => (
                <li
                  key={activity.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold">{activity.Title}</h3>
                  <p className="text-gray-700">{activity.LearningArea}</p>
                  <p className="text-gray-500">{activity.ActivityDate}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default function Schedule() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        return;
      }

      try {
        const data = await fetchUserDetails(token);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] pb-24 items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:px-0 md:py-4 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-2">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                THE KINDI{" "}
              </span>
              <span className="text-red claraheading uppercase">
                ACTI VITY SCHEDULE
              </span>
            </div>
            <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
              Here&apos;s where you&apos;ll discover your daily educational play
              activities. Utilize our drag-and-drop feature to rearrange
              learning, ensuring development seamlessly fits your schedule.
              Additionally, sync your schedule with your child&apos;s nursery
              for a smooth and integrated learning experience.
            </div>
          </div>

          {userData ? (
            <div className="flex w-full py-6 flex-col justify-center items-center">
              {userData.myKids && userData.myKids.length > 0 ? (
                <Tabs
                  defaultValue={userData.myKids[0].id}
                  className="w-full flex-col flex items-center h-fit bg-transparent"
                >
                  <div className="flex w-full max-w-[400px] lg:max-w-full lg:items-center lg:justify-center ">
                    {/* Main Frame: Shows up to 5 tabs */}
                    <TabsList className="flex gap-2 lg:gap-[2px] h-full bg-transparent py-6 overflow-x-scroll justify-center items-center w-full scrollbar-hidden">
                      {userData.myKids
                        .filter((_, index) => index % 2 === 1)
                        .map((kid) => (
                          <TabsTrigger
                            key={kid.id}
                            value={kid.id}
                            className="flex-shrink-0 flex-col data-[state=active]:bg-[#f5f5f500] data-[state=active]:opacity-100 opacity-70  data-[state=active]:z-12 data-[state=active]:scale-125 duration-200 ease-ease-in-out  data-[state=active]:border-red border-2 p-0 rounded-full bg-transparent"
                          >
                            <Image
                              src={getRandomImage()} // Random image for each kid's tab
                              alt={`Profile of ${kid.Name}`}
                              width={48}
                              height={48}
                              title={kid.Name}
                              className={`w-16 h-16 p-0 m-0 rounded-full object-cover transition-all duration-200`}
                            />
                          </TabsTrigger>
                        ))}
                    </TabsList>
                  </div>

                  {/* Dynamically create TabsContent for each kid */}
                  {userData.myKids.map((kid) => (
                    <TabsContent key={kid.id} value={kid.id} className="w-full">
                      <div className="w-full flex flex-col gap-2 lg:gap-4 justify-between items-center">
                        <div className="font-fredoka text-[12px] lg:text-[20px]">
                          Mange Personalised Schedule for{" "}
                          <span className="font-semibold text-[20px] font-fredoka text-red">
                            {kid.Name}
                          </span>
                        </div>
                        <div className="claracontainer md:p-0 p-0 py-4 w-full flex flex-col overflow-hidden gap-8">
                          {/* <ActivityCalendar kidId={kid.id} /> */}
                          <CalendarwithComp />
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <p>No kids profiles available.</p>
              )}
            </div>
          ) : (
            <p>User Not Found</p>
          )}
        </div>
      </section>
    </>
  );
}


// {
//   user && hygraphUser ? (
//     <>
//       {hygraphUser ? (
//         <>
//           <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
//             Welcome, {hygraphUser.name}! <br />
//             {hygraphUser.isVerified ? "Yes" : "No"}!
//             <p className="font-semibold">
//               {hygraphUser.isVerified
//                 ? "You are Verified"
//                 : "You are Not Verified"}
//             </p>
//           </div>
//           {hygraphUser.isVerified ? (
//             <div className="claracontainer md:p-0 p-0 py-4 w-full flex flex-col overflow-hidden gap-8">
//               <NewCalendarTwo />
//             </div>
//           ) : (
//             <div className="claracontainer md:p-0 p-0 py-4 w-full flex flex-col overflow-hidden gap-8">
//               <Link
//                 href="/#pricing_Section"
//                 className="claracontainer gap-2 flex-col h-[50vh] flex justify-center items-center"
//                 title="User Not Subscribed"
//               >
//                 <span className="clarabodyTwo text-purple">
//                   Please upgrade to access the Activity Scheduler
//                 </span>
//                 <Button className="clarabutton bg-red hover:bg-hoverRed">
//                   Click here to Upgrade
//                 </Button>
//                 <p className="font-fredoka w-full justify-center flex items-center">
//                   Curruntly Logged in as: {hygraphUser.email}
//                 </p>
//               </Link>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
//           Please verify your email to access your schedule.
//         </div>
//       )}
//     </>
//   ) : (
//     <>
//       <section className="w-full">
//         <div className="claracontainer h-[500px] flex flex-col gap-6 justify-center items-center">
//           <div className="flex-col gap-4 text-center">
//             <span className="text-[#3f3a64] claraheading uppercase">
//               Access Denied
//             </span>{" "}
//             <br />
//             <span className="text-red claraheading uppercase">
//               Please Login to Access Schedular
//             </span>
//           </div>
//           <div className="flex w-full justify-center items-center gap-4 flex-col lg:flex-row text-white text-center">
//             <Link
//               target="_blank"
//               href="/auth/sign-in"
//               className="clarabutton w-full lg:max-w-[240px] py-2 bg-purple hover:bg-hoverPurple"
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/auth/sign-up"
//               className="clarabutton py-2 w-full lg:max-w-[240px] bg-red hover:bg-hoverRed"
//               target="_blank"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
