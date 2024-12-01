"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  KindiHeart,
  ProfilePlaceholder01,
  ProfilePlaceHolderOne,
} from "@/public/Images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReferralCard from "@/app/Sections/Profile/ReferralCard";
import Loading from "@/app/loading";
import { activityIcons, progressData } from "@/app/constant/menu";
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

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

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
        const activities = await getAllActivities();
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
                  href={`/p/activities/${activity.id}`}
                  className="md:w-full hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col gap-4"
                >
                  <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:max-h-[200px] md:h-full lg:h-full lg:max-h-[182px] lg:min-h-[182px] overflow-clip rounded-t-3xl">
                    <Image
                      src={activity.thumbnail.url}
                      alt={activity.title}
                      width={200}
                      height={150}
                      className="w-full max-h-[180px] duration-300 hover:scale-105 lg:h-full lg:max-h-[182px] lg:min-h-[182px] md:max-h-[300px] object-cover rounded-t-3xl"
                    />
                  </div>
                  <div className="w-full overflow-clip p-2 flex-col justify-start items-start flex gap-2 md:gap-2 lg:gap-4">
                    <div className="flex-col w-full gap-[6px] justify-start items-start">
                      <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                        {activity.title.length > 14
                          ? `${activity.title.slice(0, 14)}...`
                          : activity.title}
                      </div>
                      <div className="justify-start pb-1 w-full items-center gap-1 lg:gap-2 inline-flex">
                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                          {activity.themeName.slice(0, 10)}
                        </div>
                        •
                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                          {activity.focusAge.slice(0, 10)}
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

/**
 * @param {MyActivity completed by User} param0
 */

const RemainingActivities = ({ userID }) => {
  const [totalActivities, setTotalActivities] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(0);
  const [loadingTotal, setLoadingTotal] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);
  const [error, setError] = useState("");

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const fetchTotalActivities = async () => {
      try {
        const activities = await getAllActivities();
        setTotalActivities(activities.length);
      } catch (error) {
        setError("Failed to fetch total activities: " + error.message);
      } finally {
        setLoadingTotal(false);
      }
    };

    fetchTotalActivities();
  }, []);

  useEffect(() => {
    const fetchCompletedActivities = async () => {
      try {
        // Fetch completed activities using the MyActivity component's logic
        const query = `
          query GetUserActivities($relationalFirst: Int, $where: AccountWhereUniqueInput!) {
            values: account(where: $where) {
              id
              username
              myActivity(first: $relationalFirst) {
                id
                title
                thumbnail {
                  url
                }
                skills
                setUpTime
                themeName
                focusAge
                documentInStages(includeCurrent: true) {
                  id
                  stage
                  updatedAt
                  publishedAt
                }
              }
            }
          }
        `;

        const variables = {
          relationalFirst: 100, // Adjust this value based on your needs
          where: { id: userID }, // Replace with the current user's ID
        };

        const response = await fetch(HYGRAPH_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({ query, variables }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        } else {
          setCompletedActivities(result.data.values.myActivity.length);
        }
      } catch (error) {
        setError("Error fetching completed activities: " + error.message);
      } finally {
        setLoadingCompleted(false);
      }
    };

    fetchCompletedActivities();
  }, [userID]);

  if (loadingTotal || loadingCompleted) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const remainingActivities = totalActivities - completedActivities;

  return (
    <>
      <SubBagde
        number={remainingActivities}
        title="Remaining Activities"
        backgroundColor="#f5a623"
        borderColor="#f5d08e"
      />
      {/* <Dialog>
        <DialogTrigger>
        </DialogTrigger>
        <DialogContent className="w-full lg:max-w-[1000px] lg:max-h-[600px] overflow-x-hidden overflow-y-scroll">
          <DialogHeader className="p-4">
            <div className="flex flex-row justify-center items-center w-full">
              <DialogTitle>
                <div className="text-center">
                  <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    Remaining{" "}
                  </span>
                  <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    Activity
                  </span>
                </div>
              </DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

const MyActivity = ({ userID }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 8; // Number of activities per page

  const fetchActivities = async () => {
    setLoading(true);

    const query = `
      query GetUserActivities($relationalFirst: Int, $relationalSkip: Int, $where: AccountWhereUniqueInput!) {
        values: account(where: $where) {
          id
          username
          myActivity(first: $relationalFirst, skip: $relationalSkip) {
            id
            title
            thumbnail {
              url
            }
            skills
            setUpTime
            themeName
            focusAge
            documentInStages(includeCurrent: true) {
              id
              stage
              updatedAt
              publishedAt
            }
          }
        }
        activityCount: account(where: $where) {
          myActivity {
            id
          }
        }
      }
    `;

    const variables = {
      relationalFirst: ITEMS_PER_PAGE,
      relationalSkip: (page - 1) * ITEMS_PER_PAGE,
      where: { id: userID },
    };

    try {
      const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      } else {
        const newActivities = result.data.values.myActivity;
        const totalItems = result.data.activityCount.myActivity.length;

        setActivities(newActivities);
        setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
      }
    } catch (error) {
      setError("Error fetching activities: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [page, userID]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <SubBagde
            number={activities.length}
            title="Complete"
            backgroundColor="#029871"
            borderColor="#a5d2ce"
          />
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
            <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-2 md:gap-4 justify-between items-start">
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  target="_blank"
                  href={`/p/activities/${activity.id}`}
                  className="md:w-full hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col gap-4"
                >
                  <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:max-h-[200px] md:h-full lg:h-full lg:max-h-[182px] lg:min-h-[182px]  overflow-clip rounded-t-3xl">
                    <Image
                      src={activity.thumbnail.url}
                      alt={activity.title}
                      width={200}
                      height={150}
                      className="w-full max-h-[180px] duration-300 hover:scale-105 lg:h-full lg:max-h-[182px] lg:min-h-[182px] md:max-h-[300px] object-cover rounded-t-3xl"
                    />
                  </div>
                  <div className="w-full overflow-clip p-2 flex-col justify-start items-start flex gap-2 md:gap-2 lg:gap-4">
                    <div className="flex-col w-full gap-[6px] justify-start items-start">
                      <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                        {activity.title.length > 14
                          ? `${activity.title.slice(0, 14)}...`
                          : activity.title}
                      </div>
                      <div className="justify-start pb-1 w-full items-center gap-1 lg:gap-2 inline-flex">
                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                          {activity.themeName.slice(0, 10)}
                        </div>
                        •
                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                          {activity.focusAge.slice(0, 10)}
                        </div>
                      </div>
                    </div>
                    {/* <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                      {activityIcons.reduce((acc, item, index) => {
                        // Only render the icon if it matches the activity and we haven't already displayed 4
                        if (activity[item.key] && acc.length < 4) {
                          acc.push(
                            <div
                              key={item.key}
                              className={`w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px] flex justify-center items-center bg-[#${activityIcons.concatbackgroundColor}] rounded-[16px]`}
                            >
                              <Image alt="Kindi" src={item.icon} />
                            </div>
                          );
                        }
                        return acc; // Return accumulated icons
                      }, [])}
                      {activityIcons.length > 4 && (
                        <div
                          className={`w-[20px] lg:w-[48px] md:w-[36px] md:h-[36px] md:rounded-xl lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
                        >
                          <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
                            +{activityIcons.length - 4}
                          </span>
                        </div>
                      )}
                    </div> */}
                  </div>
                </Link>
              ))}
            </div>
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

// const PartnerOne = () => {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [hygraphUser, setHygraphUser] = useState(null);

//   useEffect(() => {
//     if (user && user.email) {
//       getUserDataByEmail(user.email).then((data) => {
//         setHygraphUser(data);
//       });
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     if (hygraphUser && hygraphUser.partner) {
//       hygraphUser.partner.forEach((partner) => {
//         const partnerAvatarUrl = partner.profileAvatar
//           ? partner.profileAvatar.url
//           : null;

//         // Check if the partner has an avatar in myAvatar field
//         const avatarUrl =
//           partner.myAvatar?.profileAvatar?.url || partnerAvatarUrl;

//         if (avatarUrl) {
//           console.log("Partner Avatar URL:", avatarUrl);
//         } else {
//           console.log("No avatar for this partner.");
//         }
//         console.log("Partner ID:", partner.id);
//         console.log("Partner Name:", partner.email);
//         // console.log("Partner Name:", partner.myAvatar.profileAvatar.url);
//       });
//     }
//   }, [hygraphUser]);
//   return (
//     <div className="relative w-16 h-16  p-0 lg:p-1  rounded-full ">
//       <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
//         {hygraphUser &&
//           hygraphUser.partner &&
//           hygraphUser.partner.slice(0, 1).map((partner) => {
//             const avatarUrl =
//               partner.myAvatar?.profileAvatar?.url ||
//               partner.profileAvatar?.url;

//             return (
//               <div key={partner.id} className="flex justify-center">
//                 {avatarUrl ? (
//                   <Image
//                     width={84}
//                     height={84}
//                     src={avatarUrl}
//                     alt={`Avatar of ${partner.name}`}
//                     className="min-w-16 h-16 cursor-pointer hover:scale-110 ease-in-out duration-200  object-cover overflow-clip rounded-full"
//                   />
//                 ) : (
//                   <div>No avatar</div>
//                 )}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };
// const PartnerTwo = () => {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [hygraphUser, setHygraphUser] = useState(null);

//   useEffect(() => {
//     if (user && user.email) {
//       getUserDataByEmail(user.email).then((data) => {
//         setHygraphUser(data);
//       });
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     if (hygraphUser && hygraphUser.partner) {
//       hygraphUser.partner.forEach((partner) => {
//         const partnerAvatarUrl = partner.profileAvatar
//           ? partner.profileAvatar.url
//           : null;

//         // Check if the partner has an avatar in myAvatar field
//         const avatarUrl =
//           partner.myAvatar?.profileAvatar?.url || partnerAvatarUrl;

//         if (avatarUrl) {
//           console.log("Partner Avatar URL:", avatarUrl);
//         } else {
//           console.log("No avatar for this partner.");
//         }
//         console.log("Partner ID:", partner.id);
//         console.log("Partner Name:", partner.email);
//         // console.log("Partner Name:", partner.myAvatar.profileAvatar.url);
//       });
//     }
//   }, [hygraphUser]);
//   return (
//     <div className="relative w-16 h-16 p-0 lg:p-1 rounded-full ">
//       <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
//         {hygraphUser &&
//           hygraphUser.partner &&
//           hygraphUser.partner.slice(1, 2).map((partner) => {
//             const avatarUrl =
//               partner.myAvatar?.profileAvatar?.url ||
//               partner.profileAvatar?.url;

//             return (
//               <div key={partner.id} className="flex justify-center">
//                 {avatarUrl ? (
//                   <Image
//                     width={84}
//                     height={84}
//                     src={avatarUrl}
//                     alt={`Avatar of ${partner.name}`}
//                     className="min-w-16 h-16 cursor-pointer hover:scale-110 ease-in-out duration-200  object-cover overflow-clip rounded-full"
//                   />
//                 ) : (
//                   <div>No avatar</div>
//                 )}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };
// const PartnerThree = () => {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [hygraphUser, setHygraphUser] = useState(null);

//   useEffect(() => {
//     if (user && user.email) {
//       getUserDataByEmail(user.email).then((data) => {
//         setHygraphUser(data);
//       });
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     if (hygraphUser && hygraphUser.partner) {
//       hygraphUser.partner.forEach((partner) => {
//         const partnerAvatarUrl = partner.profileAvatar
//           ? partner.profileAvatar.url
//           : null;

//         // Check if the partner has an avatar in myAvatar field
//         const avatarUrl =
//           partner.myAvatar?.profileAvatar?.url || partnerAvatarUrl;

//         if (avatarUrl) {
//           console.log("Partner Avatar URL:", avatarUrl);
//         } else {
//           console.log("No avatar for this partner.");
//         }
//         console.log("Partner ID:", partner.id);
//         console.log("Partner Name:", partner.email);
//         // console.log("Partner Name:", partner.myAvatar.profileAvatar.url);
//       });
//     }
//   }, [hygraphUser]);
//   return (
//     <div className="relative w-16 h-16  p-0 lg:p-1  rounded-full ">
//       <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
//         {hygraphUser &&
//           hygraphUser.partner &&
//           hygraphUser.partner.slice(2, 3).map((partner) => {
//             const avatarUrl =
//               partner.myAvatar?.profileAvatar?.url ||
//               partner.profileAvatar?.url;

//             return (
//               <div key={partner.id} className="flex justify-center">
//                 {avatarUrl ? (
//                   <Image
//                     width={84}
//                     height={84}
//                     src={avatarUrl}
//                     alt={`Avatar of ${partner.name}`}
//                     className="min-w-16 h-16  cursor-pointer hover:scale-110 ease-in-out duration-200  object-cover overflow-clip rounded-full"
//                   />
//                 ) : (
//                   <div>No avatar</div>
//                 )}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };
// const PartnerFour = () => {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [hygraphUser, setHygraphUser] = useState(null);

//   useEffect(() => {
//     if (user && user.email) {
//       getUserDataByEmail(user.email).then((data) => {
//         setHygraphUser(data);
//       });
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     if (hygraphUser && hygraphUser.partner) {
//       hygraphUser.partner.forEach((partner) => {
//         const partnerAvatarUrl = partner.profileAvatar
//           ? partner.profileAvatar.url
//           : null;

//         // Check if the partner has an avatar in myAvatar field
//         const avatarUrl =
//           partner.myAvatar?.profileAvatar?.url || partnerAvatarUrl;

//         if (avatarUrl) {
//           console.log("Partner Avatar URL:", avatarUrl);
//         } else {
//           console.log("No avatar for this partner.");
//         }
//         console.log("Partner ID:", partner.id);
//         console.log("Partner Name:", partner.email);
//         // console.log("Partner Name:", partner.myAvatar.profileAvatar.url);
//       });
//     }
//   }, [hygraphUser]);
//   return (
//     <div className="relative w-16 h-16  p-0 lg:p-1  rounded-full ">
//       <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
//         {hygraphUser &&
//           hygraphUser.partner &&
//           hygraphUser.partner.slice(3, 4).map((partner) => {
//             const avatarUrl =
//               partner.myAvatar?.profileAvatar?.url ||
//               partner.profileAvatar?.url;

//             return (
//               <div key={partner.id} className="flex justify-center">
//                 {avatarUrl ? (
//                   <Image
//                     width={84}
//                     height={84}
//                     src={avatarUrl}
//                     alt={`Avatar of ${partner.name}`}
//                     className="min-w-16 h-16 cursor-pointer hover:scale-110 ease-in-out duration-200  object-cover overflow-clip rounded-full"
//                     // className="w-[80px] h-[80px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
//                   />
//                 ) : (
//                   <div>No avatar</div>
//                 )}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

const CurrentUser = () => {
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

  return (
    <>
      {user && hygraphUser ? (
        <div className="relative -mx-[26px] z-20 min-w-20 lg:min-w-36 w-20 h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
            <Image
              src={
                hygraphUser.myAvatar.profileAvatar.url ||
                "https://ap-south-1.graphassets.com/cm1dom2gf0lqw07pi72v8797k/cm3jnqto60fx008o0ctpfoiaq"
              }
              alt="User DP"
              width={100}
              height={100}
              className="w-[72px] cursor-pointer hover:scale-110 ease-in-out duration-200 h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
          <Image
            src={ProfilePlaceholder01}
            alt="Random Profile Placeholder"
            className="cursor-pointer w-16 h-16"
          />
        </div>
      )}
    </>
  );
};

export default async function ProgressSection() {
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

  useEffect(() => {
    if (hygraphUser && hygraphUser.partner) {
      hygraphUser.partner.forEach((partner) => {
        const partnerAvatarUrl = partner.profileAvatar
          ? partner.profileAvatar.url
          : "https://ap-south-1.graphassets.com/cm1dom2gf0lqw07pi72v8797k/cm3jnqto60fx008o0ctpfoiaq";

        // Check if the partner has an avatar in myAvatar field
        const avatarUrl =
          partner.myAvatar?.profileAvatar?.url || partnerAvatarUrl;

        if (avatarUrl) {
          console.log("Partner Avatar URL:", avatarUrl);
        } else {
          console.log("No avatar for this partner.");
        }
        console.log("Partner ID:", partner.id);
        console.log("Partner Name:", partner.email);
      });
    }
  }, [hygraphUser]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <head>
        <title>Progress - Kindilearning</title>
        <meta name="description" content="Your profile page on Kindilearning" />
      </head>
      <section className="w-full h-auto bg-[#F5F5F5] pb-12 pt-6 lg:pt-0 md:bg-[#EAEAF5] items-center justify-center flex flex-col px-0">
        {/* Topbar */}
        <div className="claracontainer py-4 md:p-8 lg:pt-20 w-full flex flex-col overflow-hidden gap-8">
          <Tabs
            defaultValue="CurrentUser"
            className="w-full flex flex-col gap-6 lg:gap-24"
          >
            <TabsList className="lg:bg-[#eaeaf5] bg-[#F5F5F5]">
              {hygraphUser?.partner.slice(2, 3)?.map((partner) => (
                <TabsTrigger
                  className="data-[state=active]:bg-[#f5f5f500] p-0 data-[state=active]:shadow-none"
                  key={partner.id}
                  value={`Partner-${partner.id}`}
                >
                  <Image
                    width={84}
                    height={84}
                    src={
                      partner.myAvatar?.profileAvatar?.url ||
                      "https://ap-south-1.graphassets.com/cm1dom2gf0lqw07pi72v8797k/cm3jnqto60fx008o0ctpfoiaq"
                    }
                    alt={`Avatar of ${partner.name}`}
                    className="min-w-16 max-w-16 h-16 cursor-pointer hover:scale-110 ease-in-out duration-200  object-cover overflow-clip rounded-full"
                  />
                </TabsTrigger>
              ))}
              {hygraphUser?.partner.slice(0, 1)?.map((partner) => (
                <TabsTrigger
                  className="data-[state=active]:bg-[#f5f5f500] p-0 data-[state=active]:shadow-none"
                  key={partner.id}
                  value={`Partner-${partner.id}`}
                >
                  <Image
                    width={84}
                    height={84}
                    src={
                      partner.myAvatar?.profileAvatar?.url ||
                      "https://ap-south-1.graphassets.com/cm1dom2gf0lqw07pi72v8797k/cm3jnqto60fx008o0ctpfoiaq"
                    }
                    alt={`Avatar of ${partner.name}`}
                    className="min-w-16 max-w-16 h-16 cursor-pointer hover:scale-110 ease-in-out duration-200  object-cover overflow-clip rounded-full"
                  />
                </TabsTrigger>
              ))}
              <TabsTrigger
                className="data-[state=active]:bg-[#f5f5f500] p-0 data-[state=active]:shadow-none"
                value="CurrentUser"
              >
                <CurrentUser />
              </TabsTrigger>
              {hygraphUser?.partner.slice(1, 2)?.map((partner) => (
                <TabsTrigger
                  className="data-[state=active]:bg-[#f5f5f500] p-0 data-[state=active]:shadow-none"
                  key={partner.id}
                  value={`Partner-${partner.id}`}
                >
                  <Image
                    width={84}
                    height={84}
                    src={
                      partner.myAvatar?.profileAvatar?.url ||
                      "https://ap-south-1.graphassets.com/cm1dom2gf0lqw07pi72v8797k/cm3jnqto60fx008o0ctpfoiaq"
                    }
                    alt={`Avatar of ${partner.name}`}
                    className="min-w-16 max-w-16 h-16 cursor-pointer hover:scale-110 ease-in-out duration-200 object-cover overflow-clip rounded-full"
                  />
                </TabsTrigger>
              ))}
              {hygraphUser?.partner.slice(3, 4)?.map((partner) => (
                <TabsTrigger
                  className="data-[state=active]:bg-[#f5f5f500] p-0 data-[state=active]:shadow-none"
                  key={partner.id}
                  value={`Partner-${partner.id}`}
                >
                  <Image
                    width={84}
                    height={84}
                    src={
                      partner.myAvatar?.profileAvatar?.url ||
                      "https://ap-south-1.graphassets.com/cm1dom2gf0lqw07pi72v8797k/cm3jnqto60fx008o0ctpfoiaq"
                    }
                    alt={`Avatar of ${partner.name}`}
                    className="min-w-16 max-w-16 h-16 cursor-pointer hover:scale-110 ease-in-out duration-200 object-cover overflow-clip rounded-full"
                  />
                </TabsTrigger>
              ))}
            </TabsList>
            {hygraphUser?.partner?.map((partner) => (
              <TabsContent key={partner.id} value={`Partner-${partner.id}`}>
                {hygraphUser ? (
                  <div className="w-full flex flex-col gap-2 justify-between items-center">
                    <div className="font-fredoka text-[12px] lg:text-[20px]">
                      Email: {partner.email || "Partner"}
                    </div>
                    <div className="flex gap-2 px-4 items-start lg:px-0 overflow-x-scroll scrollbar-hidden w-full">
                      <ActivitiesCount />
                      <RemainingActivities userID={partner.id} />
                      <MyActivity userID={partner.id} />
                    </div>
                  </div>
                ) : null}
              </TabsContent>
            ))}
            <TabsContent value="CurrentUser">
              <>
                {hygraphUser ? (
                  <div className="flex gap-2 px-4 lg:px-0 overflow-x-scroll scrollbar-hidden w-full">
                    <ActivitiesCount />
                    <RemainingActivities userID={hygraphUser.id} />
                    <MyActivity userID={hygraphUser.id} />
                  </div>
                ) : (
                  <div className="flex w-full flex-col justify-center items-center gap-2">
                    <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                      Kindi Learner
                    </h2>
                    <p className="font-fredoka text-[12px] lg:text-[20px]">
                      <Link href="/auth/sign-in" className="text-red">
                        Login&nbsp;
                      </Link>
                      to use more feature
                    </p>
                  </div>
                )}
              </>
            </TabsContent>
          </Tabs>

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
