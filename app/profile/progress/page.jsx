"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { KindiHeart, ProfilePlaceholder01 } from "@/public/Images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReferralCard from "@/app/Sections/Profile/ReferralCard";
import { progressData } from "@/app/constant/menu";
import { getAllActivities, getUserDataByEmail } from "@/lib/hygraph";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/useAuth";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchKidDetails, fetchUserDetails } from "../api";
import { getRandomImage } from "../milestone/page";
import { fetchAllActivities } from "@/app/data/p/Dynamic/Activity";
import { KidsDP } from "../Sections/IndividualTabs";

const ActivitiesCount = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 8; // Number of items per page
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activities = await fetchAllActivities();
        setActivities(activities); // Set the fetched activities
        console.log("All activities: ", activities);
      } catch (error) {
        setError("Failed to fetch activities: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Paginated activities for the current page
  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <SubBagde
            number={activities.length}
            title="Total Activities"
            backgroundColor="#019acf"
            borderColor="#a4d2ea"
          />
        </DialogTrigger>
        <DialogContent className="w-full lg:max-w-[1000px] lg:max-h-[600px] overflow-x-hidden overflow-y-scroll">
          <DialogHeader className="p-4">
            <div className="flex flex-row justify-center items-center w-full">
              <DialogTitle>
                <div className="text-center">
                  <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    All{" "}
                  </span>
                  <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    Activities
                  </span>
                </div>
              </DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription>
            <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-2 md:gap-4 justify-between items-start">
              {paginatedActivities.map((activity) => (
                <Link
                  key={activity.id}
                  target="_blank"
                  href={`/p/activities/${activity.documentId}`}
                  className="md:w-full hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col gap-4"
                >
                  <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:max-h-[200px] md:h-full lg:h-full lg:max-h-[182px] lg:min-h-[182px] overflow-clip rounded-t-3xl">
                    {activity.Gallery ? (
                      <img
                        src={activity.Gallery[0]?.url}
                        alt={activity.Title}
                        width={200}
                        height={150}
                        className="w-full max-h-[180px] duration-300 hover:scale-105 lg:h-full lg:max-h-[182px] lg:min-h-[182px] md:max-h-[300px] object-cover rounded-t-3xl"
                      />
                    ) : null}
                  </div>
                  <div className="w-full overflow-clip p-2 flex-col justify-start items-start flex gap-2 md:gap-2 lg:gap-4">
                    <div className="flex-col w-full gap-[6px] justify-start items-start">
                      <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                        {activity.Title.length > 14
                          ? `${activity.Title.slice(0, 14)}...`
                          : activity.Title}
                      </div>
                      <div className="justify-start pb-1 w-full items-center gap-1 lg:gap-2 inline-flex">
                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                          {activity.Theme}
                        </div>
                        •
                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                          {activity.FocusAge}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {paginatedActivities.length === 0 && (
              <p>No activities available.</p>
            )}
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-red text-white"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-red text-white"
                }`}
              >
                Next
              </button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SubBagde = ({
  title = "title",
  number = "120",
  backgroundColor,
  borderColor,
}) => {
  return (
    <div
      className={`flex w-full h-full flex-col md:flex-col lg:flex-row max-w-[240px] px-6 items-center gap-2  cursor-pointer  border-4 py-4 border-[${borderColor}] rounded-[12px] text-white`}
      style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
    >
      <div className="text-center text-white text-[56px] font-semibold font-fredoka leading-[60px]">
        {number}
      </div>
      <span className="w-full overflow-clip font-medium text-center text-white text-[16px] md:text-[20px] lg:text-[24px] leading-[18px] lg:leading-[26px] font-fredoka">
        {title}
      </span>
    </div>
  );
};

const SubProfileRoutes = ({
  title = "My Activities",
  image,
  iconBackgroundColor = "#f05c5c",
}) => {
  return (
    <div className="w-full min-w-[120px]  lg:min-w-[180px] lg:min-h-[136px] lg:h-full rounded-[8px] h-full justify-start gap-1 max-w-full lg:max-w-[180px] min-h-[120px] cursor-pointer p-4 bg-white items-start inline-flex">
      <div className="justify-start items-center w-full gap-[20px] flex flex-col">
        <div
          className="w-[42px] flex justify-center p-2 items-center h-[42px] rounded-[12px]"
          style={{ backgroundColor: `#${iconBackgroundColor}` }}
        >
          <Image
            alt="Kindi"
            src={image || KindiHeart}
            className="w-[28px] h-[28px]"
          />
        </div>
        <div className="text-[#0a1932] text-center text-sm font-normal leading-tight font-fredoka">
          {title}
        </div>
      </div>
    </div>
  );
};

const RemainingActivities = ({ userID }) => {
  const [totalActivities, setTotalActivities] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(0);
  const [loadingTotal, setLoadingTotal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotalActivities = async () => {
      try {
        const activities = await fetchAllActivities();
        setTotalActivities(activities.length);
      } catch (error) {
        setError("Failed to fetch total activities: " + error.message);
      } finally {
        setLoadingTotal(false);
      }
    };

    fetchTotalActivities();
  }, []);

  console.log(
    "Total Activities from Remaining Activities function",
    totalActivities
  );

  useEffect(() => {
    const fetchKid = async () => {
      setLoading(true); // Start loading when data fetching begins
      try {
        const data = await fetchKidDetails();
        const filteredData = data.data.filter(
          (user) => user.documentId === userID
        );

        if (filteredData.length > 0) {
          const user = filteredData[0];
          setCompletedActivities(user.myActivities.length); // Store the length of completed activities
        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false); // End loading once data is fetched
      }
    };

    fetchKid();
  }, [userID]);

  console.log(
    "Completed Activities from RemainingActivities function",
    completedActivities
  );

  if (error) {
    return <p>{error}</p>;
  }

  // Calculate remaining activities
  const remainingActivities = totalActivities - completedActivities;
  console.log("Finally Remaining:", remainingActivities);

  return (
    <>
      <SubBagde
        number={remainingActivities}
        title="Remaining Activities"
        backgroundColor="#f5a623"
        borderColor="#f5d08e"
      />
    </>
  );
};

const MyActivity = ({ userID }) => {
  console.log("Received this UserID as Property: " + userID);
  const [activities, setActivities] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 8; // Number of activities per page

  useEffect(() => {
    const fetchKid = async () => {
      setLoading(true); // Start loading when data fetching begins
      try {
        const data = await fetchKidDetails();
        // Filter user data based on userID passed as a prop
        const filteredData = data.data.filter(
          (user) => user.documentId === userID
        );

        if (filteredData.length > 0) {
          setUserData(filteredData[0]); // Assuming you are getting only one matching user
        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false); // End loading once data is fetched
      }
    };

    fetchKid();
  }, [userID]); // Dependency on userID so data updates when it changes

  console.log("Filtered Kids Data from Progress Page: ", userData);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (error) return <p>{error}</p>;

  // Handle the activities for the current user
  const activitiesToDisplay = userData
    ? userData.myActivities.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
      )
    : [];

  return (
    <>
      <Dialog>
        <DialogTrigger>
          {userData ? (
            <SubBagde
              number={userData.myActivities.length}
              title="Complete"
              backgroundColor="#029871"
              borderColor="#a5d2ce"
            />
          ) : null}
        </DialogTrigger>
        <DialogContent className="w-full lg:max-w-[1000px] lg:max-h-[600px] overflow-x-hidden overflow-y-scroll">
          <DialogHeader className="p-4">
            <div className="flex flex-row justify-center items-center w-full">
              <DialogTitle>
                <div className="text-center">
                  <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    Completed{" "}
                  </span>
                  <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    Activity
                  </span>
                </div>
              </DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription>
            {userData ? (
              <div className="flex">
                {userData.myActivities.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-2 md:gap-4 justify-between items-start">
                    {activitiesToDisplay.map((activity) => (
                      <div className="flex" key={activity.id}>
                        <Link
                          key={activity.id}
                          target="_blank"
                          href={`/p/activities/${activity.documentId}`}
                          className="md:w-full hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col gap-4"
                        >
                          <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:max-h-[200px] md:h-full lg:h-full lg:max-h-[182px] lg:min-h-[182px]  overflow-clip rounded-t-3xl">
                            {/* Image Placeholder */}
                          </div>
                          <div className="w-full overflow-clip p-2 flex-col justify-start items-start flex gap-2 md:gap-2 lg:gap-4">
                            <div className="flex-col w-full gap-[6px] justify-start items-start">
                              <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                                {activity.Title.length > 14
                                  ? `${activity.Title.slice(0, 14)}...`
                                  : activity.Title}
                              </div>
                              <div className="justify-start pb-1 w-full items-center gap-1 lg:gap-2 inline-flex">
                                <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                  {activity.Theme}
                                </div>
                                •
                                <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                  {activity.FocusAge}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No activities Found</p>
                )}
              </div>
            ) : null}
            {loading && <p>Loading...</p>}

            {/* Pagination Controls */}

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg ${
                  page === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-red text-white"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-red text-white"
                }`}
              >
                Next
              </button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function ProgressSection() {
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
      <section className="w-full pb-24 h-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <head>
          <title>Kid Progress</title>
        </head>
        <div className="claracontainer items-center justify-center p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
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
                        .filter((_, index) => index % 2 === 0)
                        .map((kid) => (
                          <TabsTrigger
                            key={kid.id}
                            value={kid.id}
                            className="flex-shrink-0 flex-col data-[state=active]:bg-[#f5f5f500] data-[state=active]:opacity-100 opacity-70  data-[state=active]:z-12 data-[state=active]:scale-125 duration-200 ease-ease-in-out  data-[state=active]:border-red border-2 p-0 rounded-full bg-transparent"
                          >
                            {/* <Image
                              src={getRandomImage()} // Random image for each kid's tab
                              alt={`Profile of ${kid.Name}`}
                              width={48}
                              height={48}
                              title={kid.Name}
                              className={`w-16 h-16 p-0 m-0 rounded-full object-cover transition-all duration-200`}
                            /> */}
                            <KidsDP kidId={kid.documentId} />
                          </TabsTrigger>
                        ))}
                    </TabsList>
                  </div>

                  {/* Dynamically create TabsContent for each kid */}
                  {userData.myKids.map((kid) => (
                    <TabsContent key={kid.id} value={kid.id} className="w-full">
                      <div className="w-full flex flex-col gap-2 lg:gap-4 justify-between items-center">
                        <div className="font-fredoka text-[12px] lg:text-[20px]">
                          Track Progress for: {kid.Name}
                        </div>

                        <div className="flex gap-2 px-4 items-start lg:px-0 overflow-x-scroll scrollbar-hidden w-full">
                          <ActivitiesCount />
                          <RemainingActivities userID={kid.documentId} />
                          <MyActivity userID={kid.documentId} />
                        </div>
                        <div className="w-full flex flex-col gap-2 justify-between items-center">
                          <div className="font-fredoka text-[12px] lg:text-[20px]"></div>
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
            <section className="w-full font-fredoka">
              <div className="claracontainer h-[500px] flex flex-col gap-6 justify-center items-center">
                <div className="flex-col gap-4 text-center">
                  <span className="text-[#3f3a64] claraheading uppercase">
                    No User Data Found
                  </span>
                  <br />
                  <span className="text-red claraheading uppercase">
                    Please log in to access your profile.
                  </span>
                </div>
                <div className="flex w-full justify-center items-center gap-4 flex-col lg:flex-row text-white text-center">
                  <Link
                    href="/oAuth/signup" // Replace this with your login navigation logic
                    className="bg-red text-white px-4 py-2 rounded shadow"
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 md:flex w-full px-2 lg:px-0 justify-start items-center gap-2 flex-wrap">
            {progressData.map((card, index) => (
              <SubProfileRoutes
                key={card.id}
                image={card.icon}
                iconBackgroundColor={card.backgroundColor}
                title={card.title}
              />
            ))}
          </div>
          <div className="claracontainer px-4 lg:px-0 w-full flex flex-col justify-start items-start overflow-hidden gap-8">
            <ReferralCard />
          </div>
        </div>
      </section>
    </>
  );
}
