"use client";

import { Download, FileText, Play } from "lucide-react";
import React from "react";

const AudioCard = ({ resource }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* Audio Play Button */}
        <button
          className="bg-blue-500 text-white p-4 rounded-full flex items-center justify-center mb-3 hover:bg-blue-600"
          onClick={() => document.getElementById(resource.id).play()}
        >
          <Play size={20} />
        </button>
        {/* Audio File Name */}
        <p className="mt-2 text-center text-gray-700 font-semibold">
          {resource.name || "Untitled Audio"}
        </p>
        {/* Audio Player */}
        <audio
          id={resource.id}
          className="w-full mt-3 rounded-lg"
          src={`https://lionfish-app-98urn.ondigitalocean.app${resource.url}`}
          controls
        >
          Your browser does not support the audio element.
        </audio>
        {/* Download Button */}
        <a
          href={`https://lionfish-app-98urn.ondigitalocean.app${resource.url}`}
          download
          target="_blank"
          className="mt-3 text-blue-500 hover:text-blue-700 flex items-center gap-2"
          title="Download Audio"
        >
          <Download size={20} />
          <span className="text-sm font-medium">Download</span>
        </a>
      </div>
    </>
  );
};
const PDFCard = ({ resource }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* PDF Icon */}
        <FileText size={50} className="text-red-500" />
        {/* PDF Name */}
        <p className="mt-2 text-center text-gray-700 font-semibold">
          {resource.name || "Untitled PDF"}
        </p>
        {/* Download Button */}
        <a
          href={`https://lionfish-app-98urn.ondigitalocean.app${resource.url}`}
          download
          className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-2"
          title="Download PDF"
        >
          <Download size={20} />
          <span className="text-sm font-medium">Download</span>
        </a>
      </div>
    </>
  );
};
export default function ResourceCard({ resource }) {
  const fileExtension = resource.url.split(".").pop().toLowerCase();
  const isVideo = fileExtension === "mp4";
  const isAudio = fileExtension === "mp3";
  const isPDF = fileExtension === "pdf";

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105">
      {isVideo ? (
        <video
          controls
          className="w-full h-40 rounded-lg"
          src={`https://lionfish-app-98urn.ondigitalocean.app${resource.url}`}
        />
      ) : isAudio ? (
        <AudioCard resource={resource} />
      ) : isPDF ? (
        <PDFCard resource={resource} />
      ) : (
        <img
          src={`https://lionfish-app-98urn.ondigitalocean.app${resource.url}`}
          alt={resource.name || "Resource"}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      {/* <div className="flex w-full justify-between items-center">
        <p className="mt-2 text-center text-gray-600 text-sm">
          {resource.name || "Unnamed Resource"}
        </p>
        <a
          href={`https://lionfish-app-98urn.ondigitalocean.app${resource.url}`}
          download
          target="_blank"
          className="mt-2 text-red-500 hover:text-red-700"
          title="Download Resource"
        >
          <Download className="text-red" size={20} />
        </a>
      </div> */}
    </div>
  );
}

// export function ResourcesGrid({ resources }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const resourcesPerPage = 6; // Number of items per page

//   const indexOfLastResource = currentPage * resourcesPerPage;
//   const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
//   const currentResources = resources.slice(
//     indexOfFirstResource,
//     indexOfLastResource
//   );

//   return (
//     <div>
//       {/* Grid for displaying resource cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//         {currentResources.map((resource) => (
//           <ResourceCard key={resource.id} resource={resource} />
//         ))}
//       </div>

//       {/* Pagination controls */}
//       {resources.length > resourcesPerPage && (
//         <div className="flex justify-center items-center mt-6">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 mx-1 rounded-lg border ${
//               currentPage === 1
//                 ? "bg-gray-200 text-gray-500"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 mx-1 text-gray-700">
//             Page {currentPage} of{" "}
//             {Math.ceil(resources.length / resourcesPerPage)}
//           </span>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) =>
//                 Math.min(
//                   prev + 1,
//                   Math.ceil(resources.length / resourcesPerPage)
//                 )
//               )
//             }
//             disabled={
//               currentPage === Math.ceil(resources.length / resourcesPerPage)
//             }
//             className={`px-4 py-2 mx-1 rounded-lg border ${
//               currentPage === Math.ceil(resources.length / resourcesPerPage)
//                 ? "bg-gray-200 text-gray-500"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
