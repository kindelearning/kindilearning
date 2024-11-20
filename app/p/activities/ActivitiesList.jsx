"use client";
import { activityIcons } from "@/app/constant/activity";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ActivitiesList = ({ activities }) => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the indices for slicing
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Paginated activities
  const paginatedActivities = activities.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 lg:gap-6 lg:pt-6">
      <div className="flex clarabodyTwo text-purple lg:text-[32px]">
        Discover All Activities
      </div>
      <div className="grid grid-cols-2 w-full gap-2 md:gap-4 justify-between items-start">
        {paginatedActivities.map((activity) => (
          <div key={activity.id}>
            <article className="rounded-lg">
              <Link href={`/p/activities/${activity.id}`}>
                <div className="md:w-full hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
                  <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
                    <div className="w-full max-w-full md:min-w-full lg:max-w-full h-auto">
                      <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:min-h-[200px] md:h-full lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-3xl">
                        <Image
                          width={280}
                          height={250}
                          alt={activity.title}
                          className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                          src={activity.thumbnail.url}
                        />
                      </div>
                      <div className="w-full p-2 md:p-4 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                        <div className="flex-col w-full gap-[6px] justify-start items-start">
                          <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                            {activity.title.length > 20
                              ? `${activity.title.slice(0, 22)}...`
                              : activity.title}
                          </div>
                          <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
                            <div className="text-[#0a1932] min-w-[max-content] p-0 lg:pl-2 md:text-[18px] md:leading-[22px] font-[500] font-fredoka text-[10px] lg:text-[16px] leading-none">
                              {activity.setUpTime}
                            </div>
                            •
                            <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                              {activity.themeName.slice(0, 10)}
                            </div>
                            •
                            <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                              {activity.focusAge.slice(0, 10)}
                            </div>
                          </div>
                        </div>
                        <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                          {activityIcons.slice(0, 4).map(
                            (item) =>
                              activity[item.key] && (
                                <div
                                  key={item.key}
                                  className={`w-[20px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px] flex justify-center items-center bg-[#${activityIcons.concatbackgroundColor}] rounded-[16px]`}
                                >
                                  <Image alt="Kindi" src={item.icon} />
                                </div>
                              )
                          )}
                          {activityIcons.length > 4 && (
                            <div
                              className={`w-[20px] lg:w-[48px] md:w-[36px] md:h-[36px] md:rounded-xl lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
                            >
                              <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
                                +{activityIcons.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex font-fredoka justify-center items-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ActivitiesList;
