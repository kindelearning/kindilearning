"use client";

import React, { useState } from "react";
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
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";
import MediaSelector from "../../media/Section/MediaSelector";
import { AccordionSection, InputField, SelectField } from "../page";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles

// export function CreateActivityForm2() {
//   const [formData, setFormData] = useState({
//     Title: "",
//     Theme: "",
//     FocusAge: "",
//     ActivityDate: "",
//     SetUpTime: "",
//     SkillCategory: "",
//     Skills: "",
//     LearningArea: "", // Add LearningArea to form data state
//     Accordions: [{ Question: "", Answer: "" }],
//   });

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [dialogType, setDialogType] = useState("success");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAccordionChange = (index, e) => {
//     const updatedAccordions = formData.Accordions.map((accordion, i) =>
//       i === index
//         ? { ...accordion, [e.target.name]: e.target.value }
//         : accordion
//     );
//     setFormData({ ...formData, Accordions: updatedAccordions });
//   };

//   const addAccordion = () => {
//     setFormData({
//       ...formData,
//       Accordions: [...formData.Accordions, { Question: "", Answer: "" }],
//     });
//   };

//   const removeAccordion = (index) => {
//     setFormData({
//       ...formData,
//       Accordions: formData.Accordions.filter((_, i) => i !== index),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/activities", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: formData }),
//       });

//       if (!response.ok) throw new Error("Failed to create activity");

//       const result = await response.json();
//       setDialogMessage("Activity created successfully!");
//       setDialogType("success");
//       setIsDialogOpen(true);
//       console.log(result);
//     } catch (error) {
//       setDialogMessage("Error: " + error.message);
//       setDialogType("error");
//       setIsDialogOpen(true);
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="p-6 space-y-6 mx-auto bg-white shadow-lg rounded-lg"
//       >
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Create New Activity
//         </h2>

//         {/* Title & Theme in 2-column grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-600">Title:</label>
//             <input
//               type="text"
//               name="Title"
//               value={formData.Title}
//               onChange={handleChange}
//               className="border p-3 w-full rounded-md shadow-sm"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600">Theme:</label>
//             <input
//               type="text"
//               name="Theme"
//               value={formData.Theme}
//               onChange={handleChange}
//               className="border p-3 w-full rounded-md shadow-sm"
//               required
//             />
//           </div>
//         </div>

//         {/* Learning Area */}
//         <div>
//           <label className="block text-gray-600">Learning Area:</label>
//           <select
//             name="LearningArea"
//             value={formData.LearningArea}
//             onChange={handleChange}
//             className="border p-3 w-full rounded-md shadow-sm"
//             required
//           >
//             <option value="" disabled>
//               Select Learning Area
//             </option>
//             <option value="Emotional & Social Strength">
//               Emotional & Social Strength
//             </option>
//             <option value="Confidence & Independence">
//               Confidence & Independence
//             </option>
//             <option value="Speech & Language">Speech & Language</option>
//             <option value="Physical Agility">Physical Agility</option>
//             <option value="Reading & Writing">Reading & Writing</option>
//             <option value="Discovering Our World">Discovering Our World</option>
//             <option value="Creativity & Imagination">
//               Creativity & Imagination
//             </option>
//             <option value="Experiments & Math">Experiments & Math</option>
//           </select>
//         </div>

//         {/* Focus Age & Activity Date in 2-column grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-600">Focus Age:</label>
//             <input
//               type="text"
//               name="FocusAge"
//               value={formData.FocusAge}
//               onChange={handleChange}
//               className="border p-3 w-full rounded-md shadow-sm"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600">Activity Date:</label>
//             <input
//               type="date"
//               name="ActivityDate"
//               value={formData.ActivityDate}
//               onChange={handleChange}
//               className="border p-3 w-full rounded-md shadow-sm"
//               required
//             />
//           </div>
//         </div>

//         {/* Set Up Time & Skill Category in 2-column grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-600">Set Up Time:</label>
//             <input
//               type="text"
//               name="SetUpTime"
//               value={formData.SetUpTime}
//               onChange={handleChange}
//               className="border p-3 w-full rounded-md shadow-sm"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600">Skill Category:</label>
//             <input
//               type="text"
//               name="SkillCategory"
//               value={formData.SkillCategory}
//               onChange={handleChange}
//               className="border p-3 w-full rounded-md shadow-sm"
//               required
//             />
//           </div>
//         </div>

//         {/* Skills (Textarea) */}
//         <div>
//           <label className="block text-gray-600">Skills:</label>
//           <textarea
//             name="Skills"
//             value={formData.Skills}
//             onChange={handleChange}
//             className="border p-3 w-full rounded-md shadow-sm"
//             required
//           ></textarea>
//         </div>

//         {/* Accordions Section */}
//         <div>
//           <label className="block text-gray-600">Accordions:</label>
//           {formData.Accordions.map((accordion, index) => (
//             <div key={index} className="space-y-4 mt-4">
//               <div className="space-y-2">
//                 <input
//                   type="text"
//                   name="Question"
//                   placeholder="Question"
//                   value={accordion.Question}
//                   onChange={(e) => handleAccordionChange(index, e)}
//                   className="border p-3 w-full rounded-md shadow-sm"
//                 />
//                 <textarea
//                   name="Answer"
//                   placeholder="Answer"
//                   value={accordion.Answer}
//                   onChange={(e) => handleAccordionChange(index, e)}
//                   className="border p-3 w-full rounded-md shadow-sm"
//                 ></textarea>
//                 <button
//                   type="button"
//                   onClick={() => removeAccordion(index)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Remove Accordion
//                 </button>
//               </div>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addAccordion}
//             className="text-blue-500 hover:text-blue-700 mt-4"
//           >
//             Add Accordion
//           </button>
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
//           >
//             Submit Activity
//           </button>
//         </div>
//       </form>

//       {/* Custom Dialog Box for Success/Error */}
//       <Dialog isOpen={isDialogOpen} onDismiss={() => setIsDialogOpen(false)}>
//         <DialogContent className="bg-white p-6 rounded-lg shadow-xl">
//           <DialogHeader>
//             <DialogTitle
//               className={`text-xl font-semibold ${
//                 dialogType === "success" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {dialogType === "success" ? "Success!" : "Error!"}
//             </DialogTitle>
//             <DialogDescription className="text-gray-600">
//               {dialogMessage}
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

export default function CreateActivityForm() {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [focusAge, setFocusAge] = useState("");
  const [learningArea, setLearningArea] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [setUpTime, setSetUpTime] = useState("");
  const [resourceMedia, setResourceMedia] = useState(null);
  const [accordions, setAccordions] = useState([]);
  const [media, setMedia] = useState(null); // Media state
  const [skills, setSkills] = useState(""); // Skills Rich Text Editor state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !theme || !activityDate) {
      setDialogMessage("Please fill in all required fields.");
      setDialogType("error");
      setIsDialogOpen(true);
      return;
    }

    const newActivity = {
      Title: title, // Text
      Theme: theme, // Text
      FocusAge: focusAge, // Text
      ActivityDate: activityDate, // Date in 'YYYY-MM-DD' format
      LearningArea: learningArea, // Enumeration
      Gallery: media ? [{ id: media.id }] : [], // Media array (ensure it's an array of objects with `id`)
      Resources: resourceMedia ? [{ id: resourceMedia.id }] : [], // Media array
      Skills: skills, // Rich Text (JSON or string)
      Accordions: accordions.map((accordion) => ({
        Question: accordion.question, // Text
        Answer: accordion.answer, // Rich text (Markdown)
      })), // Repeatable Component
      SetUpTime: setUpTime, // Text
      SkillCategory: skillCategory, // Text
    };

    console.log("New Activity data", newActivity);

    try {
      const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newActivity }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setDialogMessage("Activity created successfully!");
        setDialogType("success");
        setTitle("");
        setTheme("");
        setFocusAge("");
        setActivityDate("");
        setSetUpTime("");
        setSkillCategory("");
        setResourceMedia(null);
        setLearningArea("");
        setMedia(null);
        setAccordions([]);
        setSkills(""); // Reset Skills
      } else {
        setDialogMessage(
          "Failed to create activity. Please check the input and try again."
        );
        setDialogType("error");
        throw new Error("Failed to create activity");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setDialogMessage(error.message);
      setDialogType("error");
    }

    setIsDialogOpen(true); // Open dialog after submit
  };

  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia); // Store the selected media object
  };

  const handleResourceMediaSelect = (selectedMedia) => {
    setResourceMedia(selectedMedia);
  };

  return (
    <div className="p-8 font-fredoka">
      <head>
        <title>Create New Activity - KindiLearning</title>
      </head>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="Theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
        <InputField
          label="Focus Age"
          value={focusAge}
          onChange={(e) => setFocusAge(e.target.value)}
        />
        <SelectField
          label="Learning Area"
          value={learningArea}
          options={[
            "Emotional & Social Strength",
            "Confidence & Independence",
            "Speech & Language",
            "Physical Agility",
            "Reading & Writing",
            "Discovering Our World",
            "Creativity & Imagination",
            "Experiments & Math",
          ]}
          onChange={(e) => setLearningArea(e.target.value)}
        />
        <InputField
          type="date"
          label="Activity Date"
          value={activityDate}
          onChange={(e) => setActivityDate(e.target.value)}
        />
        <InputField
          label="SetUp Time"
          value={setUpTime}
          onChange={(e) => setSetUpTime(e.target.value)}
        />
        <InputField
          label="Skill Category"
          value={skillCategory}
          onChange={(e) => setSkillCategory(e.target.value)}
        />

        <MediaPreview
          media={media}
          onMediaSelect={handleMediaSelect}
          label="Gallery Media"
        />
        <MediaPreview
          media={resourceMedia}
          onMediaSelect={handleResourceMediaSelect}
          label="Resource Media"
        />

        {/* Skills Rich Text Editor */}
        <div>
          <label>Skills:</label>
          <textarea
            value={skills}
            onChange={setSkills}
            placeholder="Enter the skills description..."
          />
        </div>

        {/* Accordion Section */}
        <AccordionSection
          accordions={accordions}
          setAccordions={setAccordions}
        />

        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Create Activity
        </button>
      </form>

      {/* Dialog for showing success/error messages */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="hidden">Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage}</DialogTitle>
            <DialogDescription>
              {dialogType === "success"
                ? "The activity was created successfully."
                : "Something went wrong. Please review your form."}
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <button className="px-4 py-2 bg-black text-white rounded">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Reusable MediaPreview Component
export function MediaPreview({ media, onMediaSelect, label }) {
  return (
    <div>
      <label>{label}:</label>
      {media ? (
        <div className="mt-4">
          <img
            src={`https://proper-fun-404805c7d9.strapiapp.com${media.url}`}
            className="w-32 h-32 object-cover"
          />
          <p>{media.name}</p>
        </div>
      ) : (
        <p>Not selected anything</p>
      )}
      <MediaSelector onMediaSelect={onMediaSelect} />
    </div>
  );
}
