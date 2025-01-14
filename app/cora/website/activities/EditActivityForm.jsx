"use client";

import { useEffect, useRef, useState } from "react";
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
// import ReactQuill from "react-quill"; // Import React Quill
// import "react-quill/dist/quill.snow.css";
import ClaraMarkdownRichEditor from "../../Sections/TextEditor/ClaraMarkdownRichEditor";
import MediaSelector, {
  MultiMediaSelector,
} from "../media/Section/MediaSelector";
import { Button } from "@/components/ui/button";

export default function EditActivityForm({ documentId }) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [focusAge, setFocusAge] = useState("");
  const [learningArea, setLearningArea] = useState(""); // New field
  const [activityDate, setActivityDate] = useState("");
  const [skills, setSkills] = useState("");
  const [formattedSkills, setFormattedSkills] = useState([]); // For holding structured skill data

  const [resource, setResource] = useState([]); // Store selected media
  const [media, setMedia] = useState([]); // Store selected media
  const [setUpTime, setSetUpTime] = useState("");
  const [existingData, setExistingData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State
  const [accordions, setAccordions] = useState([]);
  const [isPopular, setIsPopular] = useState(""); // New field for isPopular
  const [error, setError] = useState(null); // To

  // Fetch existing activity data based on documentId
  useEffect(() => {
    const fetchActivityData = async () => {
      setError(null);
      try {
        const res = await fetch(
          `https://upbeat-life-04fe8098b1.strapiapp.com/api/activities/${documentId}?populate=*`
        );
        if (!res.ok) throw new Error("Failed to fetch activity data.");

        const data = await res.json();
        setExistingData(data.data);
        setTitle(data.data.Title || "");
        setTheme(data.data.Theme || "");
        setFocusAge(data.data.FocusAge || "");
        setSkills(data.data.Skills || "");
        setAccordions(data.data.Accordions || []); // Assuming Accordions is the field name in your Strapi model
        setActivityDate(data.data.ActivityDate || "");
        setMedia(data.data.Gallery || []);
        setSetUpTime(data.data.SetUpTime || "");
        setLearningArea(data.data.LearningArea || ""); // Initialize with fetched data
        setIsPopular(data.data.isPopular || ""); // Initialize with fetched data
      } catch (err) {
        setError("Error fetching activity data. Please try again.");
        console.error("Error fetching activity data:", err);
      }
    };

    fetchActivityData();
  }, [documentId]);
  const prepareAccordionsPayload = () => {
    // Map over the accordions and exclude the 'id' field
    return accordions.map(({ id, ...rest }) => rest);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedGallery = media.map((id) => ({ id }));
    const formattedResources = resource.map((id) => ({ id }));

    const payload = {
      data: {
        Title: title,
        Theme: theme,
        FocusAge: focusAge,
        ActivityDate: activityDate,
        Skills: formattedSkills,
        SetUpTime: setUpTime,
        LearningArea: learningArea,
        isPopular: isPopular,
        Gallery: formattedGallery,
        Resources: formattedResources,
        Accordions: prepareAccordionsPayload(),
      },
    };

    console.log("Payload Send", payload);

    try {
      const res = await fetch(
        `https://upbeat-life-04fe8098b1.strapiapp.com/api/activities/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Ensure the server expects JSON
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Error updating activity.");

      const data = await res.json();
      // console.log("Updated Activity:", data);
      setOpenDialog(true); // Show the success dialog
    } catch (error) {
      console.error("Error updating activity:", error);
      setError(error.message || "Error updating activity.");
      alert("Error updating activity.");
    }
  };

  // Handle Accordion Changes
  const handleAccordionChange = (index, field, value) => {
    setAccordions((prevAccordions) => {
      const updatedAccordions = [...prevAccordions];
      updatedAccordions[index][field] = value;
      return updatedAccordions;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Skills") {
      // Update the raw skills text
      setSkills(value);

      // Process the value for the structured format (for sending to the server)
      const processedSkills = value
        .split("\n")
        .map((line) => ({
          type: "paragraph",
          children: [
            {
              text: line.trim(),
              type: "text", // Add the text as per the required format
            },
          ],
        }))
        .filter((item) => item.children[0].text); // Remove empty lines

      setFormattedSkills(processedSkills); // Update the structured data
    }
  };

  // When you get data from the server, transform it into a string for the textarea
  useEffect(() => {
    if (formattedSkills.length > 0) {
      const skillsString = formattedSkills
        .map((skillObj) =>
          skillObj.children.map((child) => child.text).join("\n")
        )
        .join("\n");
      setSkills(skillsString); // Set the textarea value as a string
    }
  }, [formattedSkills]);

  const handleGallerySelect = (selectedMediaIds) => {
    console.log("Selected Media IDs:", selectedMediaIds);

    setMedia(selectedMediaIds);
  };
  const handleResourcesSelect = (selectedMediaIds) => {
    console.log("Selected Media IDs:", selectedMediaIds);

    setResource(selectedMediaIds);
  };

  return (
    <div className="p-0 font-fredoka">
      <h1 className="text-2xl font-bold mb-6">Edit Activity</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}{" "}
        <div className="flex w-full justify-between items-center gap-2">
          {/* Gallery Media Selector */}
          <div className="w-full p-2 bg-[#e4e1e1a8] rounded-lg">
            <label htmlFor="Gallery" className="block">
              Gallery
            </label>
            <div className="flex max-w-full justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Gallery</h1>

              {/* Minimal count display */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-500 text-white text-lg font-semibold transition-colors duration-300 hover:bg-indigo-600">
                  {Array.isArray(media) && <>{media.length}</>}
                </div>
                <span className="text-gray-600 text-sm">Items Selected</span>
              </div>
            </div>
            <MultiMediaSelector onMediaSelect={handleGallerySelect} />{" "}
            {/* If no media selected, show a placeholder */}
            {Array.isArray(media) && media.length === 0 && (
              <p className="mt-4 text-gray-500 text-center">
                No items selected yet.
              </p>
            )}
          </div>

          {/* Resource */}
          <div className="w-full p-2 bg-[#e4e1e1a8] rounded-lg">
            <label htmlFor="Resources" className="block">
              Resources
            </label>
            <div className="flex max-w-full justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Resources
              </h1>

              {/* Minimal count display */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-500 text-white text-lg font-semibold transition-colors duration-300 hover:bg-indigo-600">
                  {Array.isArray(resource) && <>{resource.length}</>}
                </div>
                <span className="text-gray-600 text-sm">Items Selected</span>
              </div>
            </div>
            <MultiMediaSelector onMediaSelect={handleResourcesSelect} />
            {/* If no media selected, show a placeholder */}
            {Array.isArray(resource) && resource.length === 0 && (
              <p className="mt-4 text-gray-500 text-center">
                No items selected yet.
              </p>
            )}
          </div>
        </div>
        {/* Error message */}
        <div>
          <label htmlFor="Title" className="block">
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="Theme" className="block">
            Theme
          </label>
          <input
            type="text"
            id="Theme"
            name="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="FocusAge" className="block">
            Focus Age
          </label>
          <input
            type="text"
            id="FocusAge"
            name="FocusAge"
            value={focusAge}
            onChange={(e) => setFocusAge(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        {/* New LearningArea Select Field */}
        <div>
          <label htmlFor="LearningArea" className="block">
            Learning Area
          </label>
          <select
            id="LearningArea"
            name="LearningArea"
            value={learningArea}
            onChange={(e) => setLearningArea(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="" disabled>
              Select a Learning Area
            </option>
            <option value="Emotional & Social Strength">
              Emotional & Social Strength
            </option>
            <option value="Confidence & Independence">
              Confidence & Independence
            </option>
            <option value="Speech & Language">Speech & Language</option>
            <option value="Physical Agility">Physical Agility</option>
            <option value="Reading & Writing">Reading & Writing</option>
            <option value="Discovering Our World">Discovering Our World</option>
            <option value="Creativity & Imagination">
              Creativity & Imagination
            </option>
            <option value="Experiments & Math">Experiments & Math</option>
          </select>
        </div>
        {/* Skills (Rich Text Editor with React Quill) */}
        <div>
          <label htmlFor="Skills" className="block">
            Learning Area Icons & Skills (For Activity Detail Page)
          </label>
          <label htmlFor="Skills" className="text-[12px] text-red">
            (Please use List item so that it renders properly) These will be
            used to show Learning Area Icons on Activity Page
          </label>

          <textarea
            name="Skills"
            value={skills} // Display the string value for the textarea
            onChange={handleChange} // Handle changes and format as you type
            className="border p-2 w-full"
            placeholder="Enter skills or descriptions here... (separate each skill with a new line)"
          />
        </div>
        <div>
          <label htmlFor="isPopular" className="block">
            Is this activity popular?
          </label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="isPopular"
                value="Yes"
                checked={isPopular === "Yes"}
                onChange={(e) => setIsPopular(e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isPopular"
                value="No"
                checked={isPopular === "No"}
                onChange={(e) => setIsPopular(e.target.value)}
              />
              No
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="ActivityDate" className="block">
            Activity Date
          </label>
          <input
            type="date"
            id="ActivityDate"
            name="ActivityDate"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="SetUpTime" className="block">
            SetUp Time
          </label>
          <input
            type="text"
            id="SetUpTime"
            name="SetUpTime"
            value={setUpTime}
            onChange={(e) => setSetUpTime(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <h3 className="font-bold mb-2">Accordions</h3>
          {accordions.map((accordion, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-1">Question</label>
              <input
                type="text"
                value={accordion.Question}
                onChange={(e) =>
                  handleAccordionChange(index, "Question", e.target.value)
                }
                className="border p-2 w-full mb-2"
              />
              <label className="block mb-1">Answer</label>
              <ClaraMarkdownRichEditor
                id={`answer-${accordion.id}`}
                value={accordion.Answer}
                onChange={(value) =>
                  handleAccordionChange(index, "Answer", value)
                } // Update the answer field
              />
              <button
                type="button"
                onClick={() => {
                  const updatedAccordions = accordions.filter(
                    (_, i) => i !== index
                  );
                  setAccordions(updatedAccordions);
                }}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add New Accordion */}
          <button
            type="button"
            onClick={() =>
              setAccordions([...accordions, { Question: "", Answer: "" }])
            }
            className="text-blue-500 mt-4"
          >
            Add New Accordion
          </button>
        </div>
        {/* <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Activity
        </button> */}
        <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-center py-4 flex flex-row">
          <div className="claracontainer flex flex-row  justify-between w-full items-center gap-4 px-4">
            <Button type="submit">Update Activity</Button>
          </div>
        </section>
      </form>

      {/* Custom Success Dialog */}
      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Your activity has been successfully updated.
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

// export function EditActivityForm2({ documentId }) {
//   const [title, setTitle] = useState("");
//   const [theme, setTheme] = useState("");
//   const [focusAge, setFocusAge] = useState("");
//   const [learningArea, setLearningArea] = useState("");
//   const [activityDate, setActivityDate] = useState("");
//   const [skillCategory, setSkillCategory] = useState("");
//   const [setUpTime, setSetUpTime] = useState("");
//   const [media, setMedia] = useState(null);
//   const [resourceMedia, setResourceMedia] = useState(null);
//   const [accordions, setAccordions] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   console.log("Accordions Data", accordions);
//   // Fetch existing data
//   useEffect(() => {
//     let isMounted = true;
//     setLoading(true);
//     const fetchContentData = async () => {
//       try {
//         const res = await fetch(
//           `https://upbeat-life-04fe8098b1.strapiapp.com/api/activities/${documentId}?populate=*`
//         );
//         const data = await res.json();

//         if (isMounted) {
//           const content = data.data;
//           setTitle(content?.Title || "");
//           setTheme(content?.Theme || "");
//           setFocusAge(content?.FocusAge || "");
//           setActivityDate(content?.ActivityDate || "");
//           setLearningArea(content?.LearningArea || "");
//           setSetUpTime(content?.SetUpTime || "");
//           setSkillCategory(content?.SkillCategory || "");
//           setAccordions(content?.Accordions || []);
//           setMedia(
//             content?.Gallery?.id
//               ? {
//                   id: content.Gallery.id,
//                   url: content.Gallery.url,
//                   name: content.Gallery.name,
//                 }
//               : null
//           );
//           setResourceMedia(
//             content?.Resources?.id
//               ? {
//                   id: content.Resources.id,
//                   url: content.Resources.url,
//                   name: content.Resources.name,
//                 }
//               : null
//           );
//         }
//       } catch (err) {
//         console.error("Error fetching content data:", err);
//         if (isMounted) setError("Error fetching content");
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchContentData();
//     return () => {
//       isMounted = false;
//     };
//   }, [documentId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       data: {
//         Title: title, // Text
//         Theme: theme, // Text
//         FocusAge: focusAge, // Text
//         ActivityDate: activityDate, // Date in 'YYYY-MM-DD' format
//         LearningArea: learningArea, // Enumeration (ensure the value matches allowed options in Strapi)
//         Gallery: media ? [{ id: media.id }] : [], // Media array (ensure it's an array of objects with `id`)
//         Resources: resourceMedia ? [{ id: resourceMedia.id }] : [], // Media array (ensure it's an array of objects with `id`)
//         Accordions: accordions.map((accordion) => ({
//           Question: accordion.question,
//           Answer: accordion.answer,
//         })),
//         SetUpTime: setUpTime, // Text
//         SkillCategory: skillCategory, // Text
//       },
//     };

//     console.log("Payload created", payload);
//     try {
//       const res = await fetch(
//         `https://upbeat-life-04fe8098b1.strapiapp.com/api/activities/${documentId}?populate=*`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to update content.");
//       }

//       const data = await res.json();
//       console.log("Updated activities Content:", data);
//       setOpenDialog(true);
//     } catch (err) {
//       console.error("Error updating content:", err);
//       setError("Error updating content.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMediaSelect = (selectedMedia) => {
//     setMedia(selectedMedia);
//   };
//   const handleResourceMediaSelect = (selectedMedia) => {
//     setResourceMedia(selectedMedia);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Edit Activity</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Form Fields */}
//         <InputField
//           label="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <InputField
//           label="Theme"
//           value={theme}
//           onChange={(e) => setTheme(e.target.value)}
//         />
//         <InputField
//           label="Focus Age"
//           value={focusAge}
//           onChange={(e) => setFocusAge(e.target.value)}
//         />
//         <SelectField
//           label="Learning Area"
//           value={learningArea}
//           options={[
//             "Emotional & Social Strength",
//             "Confidence & Independence",
//             "Speech & Language",
//             "Physical Agility",
//             "Reading & Writing",
//             "Discovering Our World",
//             "Creativity & Imagination",
//             "Experiments & Math",
//           ]}
//           onChange={(e) => setLearningArea(e.target.value)}
//         />
//         <InputField
//           type="date"
//           label="Activity Date"
//           value={activityDate}
//           onChange={(e) => setActivityDate(e.target.value)}
//         />
//         <InputField
//           label="SetUp Time"
//           value={setSetUpTime}
//           onChange={(e) => setSetUpTime(e.target.value)}
//         />
//         <InputField
//           label="Skill Category"
//           value={skillCategory}
//           onChange={(e) => setSkillCategory(e.target.value)}
//         />

//         {/* Media Selector */}
//         <div>
//           <label>Media:</label>
//           {media ? (
//             <div className="mt-4">
//               <img src={media.url} className="w-32 h-32 object-cover" />
//               <p>{media.name}</p>
//             </div>
//           ) : (
//             <p>Not selected</p>
//           )}
//           <MediaSelector onMediaSelect={handleMediaSelect} />
//         </div>
//         {/* Resource Selector */}
//         <div>
//           <label>Resource Selector:</label>
//           {resourceMedia ? (
//             <div className="mt-4">
//               <img src={resourceMedia.url} className="w-32 h-32 object-cover" />
//               <p>{resourceMedia.name}</p>
//             </div>
//           ) : (
//             <p>Not selected</p>
//           )}
//           <MediaSelector onMediaSelect={handleResourceMediaSelect} />
//         </div>

//         {/* Accordion Section */}
//         <AccordionSection
//           accordions={accordions}
//           setAccordions={setAccordions}
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="px-4 py-2 bg-red text-white rounded"
//         >
//           Update Activity
//         </button>
//       </form>

//       {/* Success Dialog */}
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Success!</DialogTitle>
//           </DialogHeader>
//           <DialogDescription>
//             Your content has been successfully updated.
//           </DialogDescription>
//           <DialogFooter>
//             <DialogClose asChild>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//                 Close
//               </button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// const InputField = ({ label, type = "text", value, onChange }) => (
//   <div>
//     <label className="block">{label}</label>
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       className="border p-2 w-full"
//     />
//   </div>
// );

// const SelectField = ({ label, value, options, onChange }) => (
//   <div>
//     <label className="block">{label}</label>
//     <select value={value} onChange={onChange} className="border p-2 w-full">
//       <option value="" disabled>
//         Select {label}
//       </option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const AccordionSection = ({ accordions, setAccordions }) => (
//   <div>
//     <h3 className="font-bold mb-2">Accordions</h3>
//     {accordions.map((accordion, index) => (
//       <div key={index} className="mb-4">
//         <InputField
//           label="Question"
//           value={accordion.Question}
//           onChange={(e) => {
//             const updated = [...accordions];
//             updated[index].Question = e.target.value;
//             setAccordions(updated);
//           }}
//         />
//         <InputField
//           label="Answer"
//           type="textarea"
//           value={accordion.Answer}
//           onChange={(e) => {
//             const updated = [...accordions];
//             updated[index].Answer = e.target.value;
//             setAccordions(updated);
//           }}
//         />
//         <button
//           type="button"
//           onClick={() =>
//             setAccordions(accordions.filter((_, i) => i !== index))
//           }
//           className="text-red-500 mt-2"
//         >
//           Remove
//         </button>
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={() =>
//         setAccordions([...accordions, { Question: "", Answer: "" }])
//       }
//       className="text-blue-500 mt-4"
//     >
//       Add New Accordion
//     </button>
//   </div>
// );

// function MediaPreview({ media, onMediaSelect, label }) {
//   return (
//     <div>
//       <label>{label}:</label>
//       {media ? (
//         <div className="mt-4">
//           <img
//             // src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
//             src={media.url}
//             className="w-32 h-32 object-cover"
//           />
//           <p>{media.name}</p>
//         </div>
//       ) : (
//         <p>Not selected anything</p>
//       )}
//       <MediaSelector onMediaSelect={onMediaSelect} />
//     </div>
//   );
// }
