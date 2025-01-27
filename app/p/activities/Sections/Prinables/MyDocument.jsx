"use client";

import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { ActivityAttribute, fetchActivityByDocumentId } from "../../[id]/page";
import {
  ActivityBlack,
  KidBlack,
  Print,
  SpeechLanguageActivity,
  Themes,
  TimerBlack,
} from "@/public/Images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getIconForSkill } from "../ActivityCard";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf"; 

export default function PrintDocument({ activityid }) {
    const [activityData, setActivityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [variant, setVariant] = useState("classic"); // Default variant
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedData = await fetchActivityByDocumentId(activityid);
          if (fetchedData) {
            setActivityData(fetchedData);
          } else {
            setError("Activity not found.");
          }
        } catch (err) {
          setError("Failed to load data. Please try again.");
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false); // Stop loading state once fetching is done
        }
      };
  
      if (activityid) {
        setLoading(true); // Start loading when a new ID is provided
        fetchData();
      }
    }, [activityid]); // Add `activityid` as a dependency so it fetches when the ID changes
  
    // If loading, show a loading message
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // If there was an error, show the error message
    if (error) {
      return <div>{error}</div>;
    }
  
    // If there's no activity data, show the fallback message
    if (!activityData) {
      return <div>Failed to load data or activity not found.</div>;
    }
  
    console.log("Activity Data", activityData);
    const SelectedImages = activityData.Gallery?.filter((image) => image?.url);
  
    // PDF download logic
    const handleDownload = () => {
      const element = document.getElementById("contentToDownload");
  
      // Options for html2pdf.js
      const options = {
        margin: 1,
        filename: "myActivity.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
  
      // Trigger the download
      html2pdf().from(element).set(options).save();
    };
  
    return (
      <>
        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="w-full bg-[#3f3a64] gap-[4px] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white">
              Print
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Select the Template</DialogTitle>
              <DialogDescription>
                {/* Variant selector */}
                <VariantSelector setVariant={setVariant} />
  
                {/* Content to be downloaded as PDF */}
                <div id="contentToDownload">
                  <DownloadableContent
                    activityData={activityData}
                    images={SelectedImages}
                    variant={variant} // Pass the selected variant
                  />
                </div>
  
                {/* Print button */}
                <Button variant="outline" onClick={handleDownload}>
                  Print
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    );
  }

const VariantSelector = ({ setVariant }) => {
  return (
    <div className="variant-selector">
      <label htmlFor="variant" className="text-lg font-medium text-gray-700">
        Choose PDF Variant:
      </label>
      <select
        id="variant"
        className="mt-2 p-2 border rounded-md"
        onChange={(e) => setVariant(e.target.value)}
      >
        <option value="classic">Classic View</option>
        <option value="minimal">Minimal View</option>
        <option value="compact">Compact View</option>
        <option value="card">Card Style View</option>
      </select>
    </div>
  );
};

// const VariantSelector = ({ setVariant }) => {
//   return (
//     <div className="variant-selector">
//       <label className="text-lg font-medium text-gray-700">
//         Choose PDF Variant:
//       </label>
//       <div className="flex space-x-4 mt-2">
//         <button
//           className="p-2 bg-gray-200 rounded-md"
//           onClick={() => setVariant('classic')}
//         >
//           Classic View
//         </button>
//         <button
//           className="p-2 bg-gray-200 rounded-md"
//           onClick={() => setVariant('minimal')}
//         >
//           Minimal View
//         </button>
//         <button
//           className="p-2 bg-gray-200 rounded-md"
//           onClick={() => setVariant('compact')}
//         >
//           Compact View
//         </button>
//         <button
//           className="p-2 bg-gray-200 rounded-md"
//           onClick={() => setVariant('card')}
//         >
//           Card Style View
//         </button>
//       </div>
//     </div>
//   );
// };

const DownloadableContent = ({ activityData, images, variant = "classic" }) => {
  // Common content rendering logic
  const commonContent = () => (
    <div className="flex flex-col gap-4 items-center">
      {/* Activity Attributes */}
      <ActivityAttribute
        image={ActivityBlack}
        features={
          new Date(activityData.ActivityDate).toDateString() ||
          "Thu Dec 26 2024"
        }
        title="Date"
      />
      <ActivityAttribute
        image={TimerBlack}
        features={activityData.SetUpTime || "5 Min"}
        title="Set Up Time"
      />
      <ActivityAttribute
        image={Themes}
        className="text-black"
        features={activityData.Theme || "Winter"}
        title="Theme"
      />
      <ActivityAttribute
        image={KidBlack}
        features={activityData.FocusAge || "Toddler"}
        title="Difficulty"
      />
    </div>
  );

  // Classic View
  if (variant === "classic") {
    return (
      <div className="content p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-[#3f3a64]">
          My PDF Document
        </h1>
        <p className="text-lg text-gray-600">
          This is a sample document that will be converted to a PDF file when
          you click the button below.
        </p>

        {/* Title and Details Section */}
        <div className="text-[#3f3a64] text-xl font-medium capitalize">
          <h2>{activityData.Title || "No Title Available"}</h2>
        </div>

        {commonContent()}

        {/* Learning Area Section */}
        <p className="text-lg font-medium text-[#3f3a64]">
          Learning Area: {activityData.LearningArea || "No Learning Area"}
        </p>

        {/* Learning Area Icons */}
        <div className="flex gap-2 overflow-x-auto py-2">
          {activityData.LearningAreaIcons?.length > 0 ? (
            activityData.LearningAreaIcons.map((skill, index) => {
              const skillTitle = skill.children[0]?.text;
              const iconSrc =
                getIconForSkill(skillTitle)?.src || SpeechLanguageActivity;
              return (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={iconSrc}
                    alt={skillTitle}
                    width={40}
                    height={40}
                    className="w-10 h-10 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
              );
            })
          ) : (
            <p>No skills available.</p>
          )}
        </div>

        {/* Display Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {images?.map((image, index) => (
            <div
              key={index}
              className="w-full rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={image?.url}
                alt={image?.name || `Gallery Image ${index}`}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Minimal View
  if (variant === "minimal") {
    return (
      <div className="content p-6 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-[#3f3a64]">
          My PDF Document
        </h1>
        <p className="text-sm text-gray-600">
          A compact version of the document, only showing key details.
        </p>

        {/* Title */}
        <div className="text-[#3f3a64] font-medium capitalize">
          <h2>{activityData.Title || "No Title"}</h2>
        </div>

        {/* Compact Info */}
        <div className="text-sm text-gray-600">
          <p>
            Date:{" "}
            {new Date(activityData.ActivityDate).toDateString() ||
              "Thu Dec 26 2024"}
          </p>
          <p>Setup Time: {activityData.SetUpTime || "5 Min"}</p>
          <p>Theme: {activityData.Theme || "Winter"}</p>
          <p>Difficulty: {activityData.FocusAge || "Toddler"}</p>
        </div>
      </div>
    );
  }

  // Compact View
  if (variant === "compact") {
    return (
      <div className="content p-4 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-[#3f3a64]">
          {activityData.Title || "No Title"}
        </h1>

        {/* Compact Info Section */}
        <div className="flex justify-between items-center gap-4 text-sm text-gray-600">
          <p>
            Date:{" "}
            {new Date(activityData.ActivityDate).toDateString() ||
              "Thu Dec 26 2024"}
          </p>
          <p>Setup Time: {activityData.SetUpTime || "5 Min"}</p>
        </div>

        <div className="flex justify-between items-center gap-4 text-sm text-gray-600">
          <p>Theme: {activityData.Theme || "Winter"}</p>
          <p>Difficulty: {activityData.FocusAge || "Toddler"}</p>
        </div>

        {/* Learning Area */}
        <div className="text-sm text-gray-600 mt-2">
          <p>
            Learning Area: {activityData.LearningArea || "No Learning Area"}
          </p>
        </div>

        {/* Learning Area Icons */}
        <div className="flex gap-2 overflow-x-auto py-2">
          {activityData.LearningAreaIcons?.length > 0 ? (
            activityData.LearningAreaIcons.map((skill, index) => {
              const skillTitle = skill.children[0]?.text;
              const iconSrc =
                getIconForSkill(skillTitle)?.src || SpeechLanguageActivity;
              return (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={iconSrc}
                    alt={skillTitle}
                    width={32}
                    height={32}
                    className="w-8 h-8 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
              );
            })
          ) : (
            <p>No skills available.</p>
          )}
        </div>
      </div>
    );
  }

  // Card Style View
  if (variant === "card") {
    return (
      <div className="content p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-[#3f3a64]">PDF Document</h1>

        {/* Activity Details as Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-[#3f3a64] font-medium">Date</h2>
            <p>
              {new Date(activityData.ActivityDate).toDateString() ||
                "Thu Dec 26 2024"}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-[#3f3a64] font-medium">Setup Time</h2>
            <p>{activityData.SetUpTime || "5 Min"}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-[#3f3a64] font-medium">Theme</h2>
            <p>{activityData.Theme || "Winter"}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-[#3f3a64] font-medium">Difficulty</h2>
            <p>{activityData.FocusAge || "Toddler"}</p>
          </div>
        </div>

        {/* Learning Area Icons as Cards */}
        <div className="flex gap-2 overflow-x-auto py-2">
          {activityData.LearningAreaIcons?.length > 0 ? (
            activityData.LearningAreaIcons.map((skill, index) => {
              const skillTitle = skill.children[0]?.text;
              const iconSrc =
                getIconForSkill(skillTitle)?.src || SpeechLanguageActivity;
              return (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={iconSrc}
                    alt={skillTitle}
                    width={48}
                    height={48}
                    className="w-12 h-12 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
              );
            })
          ) : (
            <p>No skills available.</p>
          )}
        </div>
      </div>
    );
  }

  return null; // Default fallback if no variant matches
};
