"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";
import MediaSelector from "../../website/media/Section/MediaSelector";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://upbeat-life-04fe8098b1.strapiapp.com/api/howitwork?populate=HIWSection.Media"
      );
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <section className="how-it-works py-4 bg-gray-100">
      {/* Main Title */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          {data.MainTitle}
        </h1>
      </div>

      {/* Main Body */}
      <div className="max-w-4xl mx-auto px-4">
        {/* {data.MainBody.map((paragraph, index) => (
          <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">
            {paragraph.children[0].text}
          </p>
        ))} */}
        <p
          className="prose w-full text-start text-[#101010] clarabodyTwo"
          dangerouslySetInnerHTML={{
            __html: data.MainBody,
          }}
        />
      </div>

      {/* How It Works Sections */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4">
        {data.HIWSection.map((section) => (
          <div
            key={section.id}
            className="how-it-works-section bg-white rounded-lg p-8 gap-4 flex items-start"
          >
            {/* Image */}
            {section.Media ? (
              <img
                className="rounded-lg max-w-[300px] h-[300px] w-full object-contain"
                src={section.Media.url}
                // src={`https://upbeat-life-04fe8098b1.strapiapp.com${section.Media.url}`}
                alt={section.Media.name || "How it works image"}
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-300 rounded-lg flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
            <div className="flex flex-col justify-start items-start">
              {/* Title and Featured Text */}
              <span className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {section.title} {section.featuredText}
              </span>

              {/* Body Description */}
              {/* {section.BodyDescription.map((body, index) => (
                <p
                  key={index}
                  className="text-lg text-[gray]  mb-6 text-start leading-relaxed"
                >
                  {body.children[0].text}
                </p>
              ))} */}
              <p
                className="prose w-full text-start text-[#101010] clarabodyTwo"
                dangerouslySetInnerHTML={{
                  __html: section.BodyDescription,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// export function UpdateHowItWorks2() {
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [media, setMedia] = useState(null); // Use `null` for initial media

//   useEffect(() => {
//     fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/howitwork?populate=*")
//       .then((res) => res.json())
//       .then((data) => {
//         setFormData(data.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load data");
//       });
//   }, []);

//   // Handle input change for the form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare the payload
//     const payload = {
//       data: {
//         MainTitle: formData.MainTitle,
//         MainBody: formData.MainBody,
//         HIWSection: formData.HIWSection.map((card) => ({
//           featuredText: card.featuredText,
//           title: card.title,
//           BodyDescription: card.BodyDescription,
//           Media: media.id,
//         })),
//       },
//     };
//     console.log("Sent Data", payload);

//     try {
//       const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/howitwork", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setOpenDialog(true); // Open the success dialog
//       } else {
//         const errorData = await res.json();
//         console.error("Error updating:", errorData);
//         alert(`Failed to update: ${errorData.error.message}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An unexpected error occurred.");
//     }
//   };
//   const handleMediaSelect = (selectedMedia) => {
//     console.log("Selected Media:", selectedMedia); // Log to inspect the structure
//     setMedia(selectedMedia); // Store only the media ID
//   };

//   const handleCardChange = (index, key, value) => {
//     const updatedCards = [...formData.HIWSection];
//     updatedCards[index][key] = value;
//     setFormData((prev) => ({
//       ...prev,
//       HIWSection: updatedCards,
//     }));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">
//         Update How It Works Content
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label
//             htmlFor="MainTitle"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Main Title
//           </label>
//           <input
//             type="text"
//             id="MainTitle"
//             name="MainTitle"
//             value={formData.MainTitle || ""}
//             onChange={handleInputChange}
//             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="MainBody"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Main Body
//           </label>
//           <textarea
//             id="MainBody"
//             name="MainBody"
//             onChange={handleInputChange}
//             value={formData.MainBody || ""}
//             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
//             rows="5"
//             required
//           />
//         </div>

//         <div>
//           <h3 className="text-lg font-medium">HIW Section</h3>
//           {formData.HIWSection.map((card, index) => (
//             <div key={card.id} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor={`HIWSection_${index}_featuredText`}
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Featured Text
//                 </label>
//                 <input
//                   type="text"
//                   id={`HIWSection_${index}_featuredText`}
//                   name="HIWSection"
//                   value={card.featuredText}
//                   onChange={(e) =>
//                     handleCardChange(index, "featuredText", e.target.value)
//                   }
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor={`HIWSection_${index}_title`}
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   id={`HIWSection_${index}_title`}
//                   name="HIWSection"
//                   value={card.title}
//                   onChange={(e) =>
//                     handleCardChange(index, "title", e.target.value)
//                   }
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor={`HIWSection_${index}_BodyDescription`}
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Body Description
//                 </label>

//                 <ClaraMarkdownRichEditor
//                   value={card.BodyDescription}
//                   onChange={(value) =>
//                     handleCardChange(index, "BodyDescription", value)
//                   }
//                 />

//                 <div>
//                   <label>Media:</label>
//                   {media ? (
//                     <div className="mt-4">
//                       <img
//                         src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
//                         className="w-[300px] h-[200px] rounded-lg object-cover"
//                       />
//                       <p>{media.name}</p>
//                     </div>
//                   ) : (
//                     <p> Not selected anything</p>
//                   )}
//                   <MediaSelector onMediaSelect={handleMediaSelect} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Update
//         </button>
//       </form>
//       {/* Dialog for success message */}
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Success!</DialogTitle>
//             <DialogDescription>
//               Your data has been updated successfully.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose asChild>
//               <button className="btn-close">Close</button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

export function UpdateHowItWorks() {
  const [mainTitle, setMainTitle] = useState("");
  const [mainBody, setMainBody] = useState("");
  const [hiwSections, setHiwSections] = useState([]); // Array for repeatable HIWSection
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data for the "How It Works" section
  useEffect(() => {
    const fetchHIWData = async () => {
      try {
        const res = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/howitwork?populate=HIWSection.Media"
        );
        const data = await res.json();

        // Parsing the fetched data
        const hiwData = data.data;

        setMainTitle(hiwData?.MainTitle || "");
        setMainBody(hiwData?.MainBody || "");
        setHiwSections(hiwData?.HIWSection || []); // Set the repeatable sections data
      } catch (err) {
        console.error("Error fetching How It Works data:", err);
        setError("Error fetching content");
      }
    };

    fetchHIWData();
  }, []);

  const handleHIWSectionUpdate = (index, updatedSection) => {
    const updatedHIWSections = [...hiwSections];
    updatedHIWSections[index] = updatedSection; // Update the specific section

    setHiwSections(updatedHIWSections); // Update the state with the new data
  };

  const handleMediaSelect = (selectedMedia, index) => {
    const updatedSection = [...hiwSections];
    updatedSection[index].Media = selectedMedia; // Update the media for the specific section
    setHiwSections(updatedSection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const payload = {
      data: {
        MainTitle: mainTitle,
        MainBody: mainBody,
        HIWSection: hiwSections.map((section) => ({
          title: section.title,
          featuredText: section.featuredText,
          BodyDescription: section.BodyDescription,
          Media: section.Media ? { id: section.Media.id } : null, // Pass Media ID if it exists
        })), // Send the updated HIWSection
      },
    };
    console.log("payload sent", payload);

    try {
      const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/howitwork", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Updated How It Works Data:", data);
      setOpenDialog(true); // Show success dialog
    } catch (error) {
      console.error("Error updating How It Works content:", error);
      alert("Error updating content.");
    }
  };

  const handleEditorChange = (newValue) => {
    setMainBody(newValue); // Update body state with the new value from the editor
  };

  return (
    <div className="p-0">
      <h1 className="text-2xl font-bold mb-6">Edit How It Works Section</h1>

      <form onSubmit={handleSubmit}>
        {/* Main Title Input */}
        <div>
          <label htmlFor="mainTitle">Main Title:</label>
          <input
            type="text"
            id="mainTitle"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Main Body Input */}
        <div>
          <label htmlFor="mainBody">Main Body (Richtext):</label>
          <textarea
            id="mainBody"
            value={mainBody}
            onChange={(e) => setMainBody(e.target.value)}
            className="border p-2 w-full"
            rows="4"
          />
          <ClaraMarkdownRichEditor
            name="mainBody"
            value={mainBody || ""} // Ensure the value is always a string
            onChange={handleEditorChange}
          />
        </div>

        {/* How It Works Sections - Looping through HIWSection */}
        <div>
          <h2>How It Works Sections</h2>
          {hiwSections.map((section, index) => (
            <div key={index} className="border p-4 my-2">
              <h3>Section {index + 1}</h3>

              {/* Title */}
              <div>
                <label htmlFor={`title-${index}`}>Title:</label>
                <input
                  type="text"
                  id={`title-${index}`}
                  value={section.title}
                  onChange={(e) => {
                    const updatedSection = {
                      ...section,
                      title: e.target.value,
                    };
                    handleHIWSectionUpdate(index, updatedSection);
                  }}
                  className="border p-2 w-full"
                />
              </div>

              {/* Featured Text */}
              <div>
                <label htmlFor={`featuredText-${index}`}>Featured Text:</label>
                <input
                  type="text"
                  id={`featuredText-${index}`}
                  value={section.featuredText}
                  onChange={(e) => {
                    const updatedSection = {
                      ...section,
                      featuredText: e.target.value,
                    };
                    handleHIWSectionUpdate(index, updatedSection);
                  }}
                  className="border p-2 w-full"
                />
              </div>

              {/* Body Description */}
              <div>
                <label htmlFor={`bodyDescription-${index}`}>
                  Body Description (Markdown):
                </label>
                <textarea
                  id={`bodyDescription-${index}`}
                  value={section.BodyDescription}
                  onChange={(e) => {
                    const updatedSection = {
                      ...section,
                      BodyDescription: e.target.value,
                    };
                    handleHIWSectionUpdate(index, updatedSection);
                  }}
                  className="border p-2 w-full"
                  rows="4"
                />
              </div>

              {/* Media Selection */}
              <div>
                <label>Media:</label>
                {section.Media ? (
                  <div className="mt-4">
                    <img
                      src={`https://upbeat-life-04fe8098b1.strapiapp.com${section.Media.url}`}
                      alt={section.title}
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                ) : (
                  <p>No media selected</p>
                )}
                <MediaSelector
                  onMediaSelect={(media) => handleMediaSelect(media, index)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Save Changes
        </button> */}
        <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-center py-4 flex flex-row">
          <div className="claracontainer flex flex-row  justify-between w-full items-center gap-4 px-4">
            <Button type="submit">Save Changes</Button>
          </div>
        </section>
      </form>

      {/* Success Dialog */}
      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Your content has been successfully updated.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
