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
import MediaSelector from "../media/Section/MediaSelector";

export default function EditActivityForm({ documentId }) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [focusAge, setFocusAge] = useState("");
  const [learningArea, setLearningArea] = useState(""); // New field
  const [activityDate, setActivityDate] = useState("");
  const [skills, setSkills] = useState("");
  const [media, setMedia] = useState([]); // Store selected media
  const [setUpTime, setSetUpTime] = useState("");
  const [existingData, setExistingData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State
  const [accordions, setAccordions] = useState([]);
  const [isPopular, setIsPopular] = useState(""); // New field for isPopular
  const quillRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // To

  // Handle change in the editor
  const handleEditorChange = (value) => {
    setSkills(value);
  };
  // Convert Quill Delta to the desired JSON structure
  const convertToJSON = () => {
    const editor = quillRef.current.getEditor();
    const delta = editor.getContents();

    // Convert the Delta into the structure you want
    const formattedSkills = delta.ops
      .map((op) => {
        if (op.insert && typeof op.insert === "string") {
          return {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: op.insert,
              },
            ],
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    return formattedSkills;
  };

  // Fetch existing activity data based on documentId
  useEffect(() => {
    const fetchActivityData = async () => {
      setIsLoading(true); // Start loading
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
      } finally {
        setIsLoading(false); // End loading
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
    const skillsData = convertToJSON();
    const filteredSkillsData = skillsData.filter((_, index) => index % 2 === 0);

  
    const payload = {
      data: {
        Title: title,
        Theme: theme,
        FocusAge: focusAge,
        ActivityDate: activityDate,
        // Skills: filteredSkillsData,
        SetUpTime: setUpTime,
        LearningArea: learningArea,
        isPopular: isPopular,
        Gallery: media ? media.id : null,
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
  useEffect(() => {
    console.log("Updated Media:", media);
  }, [media]); // This will log the state whenever `media` changes

  // Handle media selection
  const handleMediaChange = (newMedia) => {
    // If the media isn't an array, wrap it into an array
    const selectedMedia = Array.isArray(newMedia) ? newMedia : [newMedia];
    console.log("Before setting media:", newMedia);
    setMedia(newMedia);
    console.log("After setting media:", media);
  };

  // console.log("Selected Media shravya:", media); // Log the selected media

  return (
    <div className="p-8 font-fredoka">
      <h1 className="text-2xl font-bold mb-6">Edit Activity</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}{" "}
        {/* Gallery Media Selector */}
        <div>
          <label htmlFor="Gallery" className="block">
            Gallery
          </label>
          {/* <MediaSelector
            onMediaSelect={handleMediaChange} // Update the state when user selects media
          /> */}
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

          {/* <ReactQuill
            ref={quillRef}
            value={skills}
            onChange={handleEditorChange}
            modules={{
              toolbar: [[{ list: "ordered" }, { list: "bullet" }]],
            }}
            formats={["list"]}
            className="border p-2 w-full"
          /> */}
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
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Activity
        </button>
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
