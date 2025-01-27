"use client";

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
import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import * as html2canvas from "html2canvas";

import { getIconForSkill } from "../ActivityCard";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { Eye, EyeOff } from "lucide-react";

// export default function PrintDocument({ activityid }) {
//   const [activityData, setActivityData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [password, setPassword] = useState(""); // Password entered by the user
//   const [variant, setVariant] = useState("classic");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedData = await fetchActivityByDocumentId(activityid);
//         if (fetchedData) {
//           setActivityData(fetchedData);
//         } else {
//           setError("Activity not found.");
//         }
//       } catch (err) {
//         setError("Failed to load data. Please try again.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (activityid) {
//       setLoading(true);
//       fetchData();
//     }
//   }, [activityid]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!activityData) {
//     return <div>Failed to load data or activity not found.</div>;
//   }

//   const SelectedImages = activityData.Gallery?.filter((image) => image?.url);

//   // Handle the PDF generation
//   const handleGeneratePDF = async () => {
//     console.log("Starting PDF generation...");

//     const element = document.getElementById("contentToDownload");

//     if (!element) {
//       console.error("Content element not found");
//       return;
//     }

//     try {
//       // Request user input for password
//       const password = prompt("Enter a password to protect this PDF");
//       if (!password) {
//         console.log(
//           "No password entered. PDF will be generated without protection."
//         );
//       } else {
//         console.log("Password entered, preparing for protection...");
//       }

//       // Set up the options for html2pdf
//       const options = {
//         filename: "protectedActivity.pdf",
//         html2canvas: { scale: 2 }, // Increase the scale for better quality
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       };

//       if (password) {
//         options.jsPDF = {
//           ...options.jsPDF,
//           encryption: {
//             userPassword: password, // Password protection
//           },
//         };
//       }

//       // Generate the PDF and trigger the download
//       html2pdf().from(element).set(options).save();

//       console.log("PDF download initiated.");
//     } catch (err) {
//       console.error("Error generating PDF", err);
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger className="w-full">
//         <Button className="w-full bg-[#3f3a64] gap-[4px] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white">
//           <Image alt="Kindi" src={Print} />
//           Print
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-scroll">
//         <DialogHeader>
//           <DialogTitle>Select the Template</DialogTitle>
//           <DialogDescription>
//             <VariantSelector setVariant={setVariant} />

//             <div id="contentToDownload">
//               <DownloadableContent
//                 activityData={activityData}
//                 images={SelectedImages}
//                 variant={variant}
//               />
//             </div>

//             <Button variant="outline" onClick={handleGeneratePDF}>
//               Download PDF with Password Protection
//             </Button>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }

export default function PrintDocument({ activityid }) {
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(""); // Store the entered password
  const [showPasswordModal, setShowPasswordModal] = useState(false); // To control modal visibility
  const [variant, setVariant] = useState("classic");
  const [passwordVisible, setPasswordVisible] = useState(false); // To control password visibility

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
        setLoading(false);
      }
    };

    if (activityid) {
      setLoading(true);
      fetchData();
    }
  }, [activityid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!activityData) {
    return <div>Failed to load data or activity not found.</div>;
  }

  const SelectedImages = activityData.Gallery?.filter((image) => image?.url);

  // Handle the PDF generation
  const handleGeneratePDF = async () => {
    console.log("Starting PDF generation...");

    const element = document.getElementById("contentToDownload");

    if (!element) {
      console.error("Content element not found");
      return;
    }

    try {
      // Check if a password is entered and handle accordingly
      if (!password) {
        setShowPasswordModal(true); // Show password modal if no password entered
        return;
      }

      console.log("Password entered, preparing for protection...");

      // Set up the options for html2pdf
      const options = {
        filename: "protectedActivity.pdf",
        html2canvas: { scale: 2 }, // Increase the scale for better quality
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      if (password) {
        options.jsPDF = {
          ...options.jsPDF,
          encryption: {
            userPassword: password, // Password protection
          },
        };
      }

      // Generate the PDF and trigger the download
      html2pdf().from(element).set(options).save();

      console.log("PDF download initiated.");
    } catch (err) {
      console.error("Error generating PDF", err);
    }
  };

  // Handle password submit from modal
  const handlePasswordSubmit = () => {
    if (password) {
      setShowPasswordModal(false); // Close the modal
      handleGeneratePDF(); // Proceed with the PDF generation
    } else {
      alert("Please enter a valid password.");
    }
  };

  // Handle the print functionality
  const handlePrint = () => {
    const content = document.getElementById("contentToDownload");

    if (content) {
      const printWindow = window.open("", "", "height=800,width=1200");
      printWindow.document.write("<html><head><title>Print Document</title>");
      printWindow.document.write("</head><body>");
      printWindow.document.write(content.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close(); // Close the document and trigger the print dialog
      printWindow.print(); // Trigger the print dialog
    } else {
      alert("Content not found for printing.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full bg-[#3f3a64] gap-[4px] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white">
          <Image alt="Kindi" src={Print} />
          Print
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Select the Template</DialogTitle>
          <DialogDescription>
            <VariantSelector setVariant={setVariant} />

            <div id="contentToDownload">
              <DownloadableContent
                activityData={activityData}
                images={SelectedImages}
                variant={variant}
              />
            </div>

            <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-[16px] items-center justify-center py-4 flex flex-row">
              <div className="claracontainer flex flex-row  justify-between w-full items-center gap-4 px-4">
                <Button
                  variant="success"
                  className="my-2 bg-red text-white"
                  onClick={handleGeneratePDF}
                >
                  Download PDF with Password Protection
                </Button>
                {/* Add Print Button */}
                <Button
                  variant="success" 
                  className="my-2 bg-blue text-red"
                  onClick={handlePrint} // Trigger the print functionality
                >
                  Print Document
                </Button>
              </div>
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>

      {/* Custom Password Modal */}
      {showPasswordModal && (
        <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Password to Protect PDF</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="relative w-full">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle input type based on password visibility
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-2 border rounded-md"
                />
                <div
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                >
                  {passwordVisible ? <EyeOff /> : <Eye />} {/* Eye icon */}
                </div>
              </div>
            </DialogDescription>
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handlePasswordSubmit}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
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
                // src={image?.url}
                src={`https://lionfish-app-98urn.ondigitalocean.app${image?.url}`}
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
