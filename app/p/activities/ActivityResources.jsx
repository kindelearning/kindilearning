import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ActivityResources = ({ resources }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 6;

  if (!resources || resources.length === 0) {
    return <div>No resources available for this activity.</div>;
  }

  // Calculate the indices of resources to display on the current page
  const totalPages = Math.ceil(resources.length / resourcesPerPage);
  const startIndex = (currentPage - 1) * resourcesPerPage;
  const endIndex = startIndex + resourcesPerPage;
  const visibleResources = resources.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full  font-fredoka flex flex-col gap-2">
      <div className="w-full p-4 text-center">
        <span className="text-[#3f3a64] claraheading uppercase">Activity </span>
        <span className="text-red claraheading uppercase">Resources</span>
      </div>
      <div className="grid p-4 grid-cols-2 gap-4">
        {visibleResources.map((resource, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start gap-2 p-4 border rounded-lg bg-gray-50 shadow-sm"
          >
            <Image
              src={resource.url}
              alt={resource.fileName}
              width={150}
              height={150}
              className="w-full h-auto object-cover rounded-lg"
            />
            <Link target="_blank" href={resource.url}>
              <p className="text-sm text-gray-700">{resource.fileName}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-center py-4 flex flex-row">
          <div className="claracontainer flex flex-row justify-between w-full items-center gap-4 px-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-2xl font-fredoka text-white shadow border-2 border-white ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple text-white"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-2xl font-fredoka text-white shadow border-2 border-white  ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red text-white"
              }`}
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default ActivityResources;
