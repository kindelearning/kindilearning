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

import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css";
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";

export default function CreateActivityForm() {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [focusAge, setFocusAge] = useState("");
  const [learningArea, setLearningArea] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [skills, setSkills] = useState("");
  const [setUpTime, setSetUpTime] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [accordions, setAccordions] = useState([]);
  const [isPopular, setIsPopular] = useState(""); // New field for isPopular
  const [relatedUsers, setRelatedUsers] = useState([]); // State for storing selected user IDs
  const [userList, setUserList] = useState([]); // State for storing fetched users
  // const [resourceMedia, setResourceMedia] = useState(null);
  // const [media, setMedia] = useState(null); // Media state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");
  const quillRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/users?populate=*"
        );
        if (!response.ok) throw new Error("Failed to fetch users.");
        const data = await response.json();
        if (isMounted) {
          setUserList(data);
          setRelatedUsers(data.map((user) => user.id));
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching users:", error);
          setDialogMessage("Error fetching users. Please try again later.");
          setDialogType("error");
          setIsDialogOpen(true);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

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

  const prepareAccordionsPayload = () => {
    // Map over the accordions and exclude the 'id' field
    return accordions.map(({ id, ...rest }) => rest);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsData = convertToJSON();
    const filteredSkillsData = skillsData.filter((_, index) => index % 2 === 0);

    console.log("Skill Data after Optimisation", filteredSkillsData);
    // Validation
    if (!title || !theme || !activityDate || !focusAge || !learningArea) {
      setDialogMessage("All fields marked as required must be filled.");
      setDialogType("error");
      setIsDialogOpen(true);
      return;
    }

    const newActivity = {
      Title: title, // Text
      Theme: theme, // Text
      FocusAge: focusAge, // Text
      ActivityDate: activityDate, // Date in 'YYYY-MM-DD' format
      Skills: filteredSkillsData,
      SetUpTime: setUpTime, // Text
      LearningArea: learningArea, // Enumeration
      // Gallery: media ? [{ id: media.id }] : [], // Media array (ensure it's an array of objects with `id`)
      // Resources: resourceMedia ? [{ id: resourceMedia.id }] : [], // Media array
      Accordions: prepareAccordionsPayload(),
      SkillCategory: skillCategory, // Text
      relatedUsers: relatedUsers.map((id) => ({ id })),
    };

    console.log("New Activity data", newActivity);

    try {
      const response = await fetch(
        "https://upbeat-life-04fe8098b1.strapiapp.com/api/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: newActivity }),
        }
      );

      const responseData = await response.json();
      console.log("ResponseData", responseData);

      if (response.ok) {
        setDialogMessage("Activity created successfully!");
        setDialogType("success");
        setTitle("");
        setTheme("");
        setFocusAge("");
        setActivityDate("");
        setSetUpTime("");
        setSkillCategory("");
        setLearningArea("");
        setIsPopular("");
        setAccordions([]);
        setSkills(""); // Reset Skills
        setRelatedUsers([]);
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

  // Handle Accordion Changes
  const handleAccordionChange = (index, field, value) => {
    setAccordions((prevAccordions) => {
      const updatedAccordions = [...prevAccordions];
      updatedAccordions[index][field] = value;
      return updatedAccordions;
    });
  };


  return (
    <div className="p-8 font-fredoka">
      <head>
        <title>Create New Activity - KindiLearning</title>
      </head>
      <form onSubmit={handleSubmit} className="space-y-4">
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

          <ReactQuill
            ref={quillRef}
            value={skills}
            onChange={handleEditorChange}
            modules={{
              toolbar: [[{ list: "ordered" }, { list: "bullet" }]],
            }}
            formats={["list"]}
            className="border p-2 w-full"
          />
        </div>
        {/* isPopular Field (Radio Buttons) */}
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
              {/* <ClaraMarkdownRichEditor
                id={`answer-${accordion.id}`}
                value={accordion.Answer}
                onChange={(value) =>
                  handleAccordionChange(index, "Answer", value)
                } // Update the answer field
              /> */}
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
        {/* Related Users Field (Multi-select Dropdown) */}
        {/* <div>
          <label htmlFor="relatedUsers" className="block">
            Select Related Users
          </label>
          <select
            id="relatedUsers"
            name="relatedUsers"
            value={relatedUsers}
            onChange={handleRelatedUsersChange}
            multiple
            className="border p-2 w-full"
          >
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div> */}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
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


// export default function CreateActivityForm() {
//   const [title, setTitle] = useState("");
//   const [theme, setTheme] = useState("");
//   const [focusAge, setFocusAge] = useState("");
//   const [learningArea, setLearningArea] = useState("");
//   const [activityDate, setActivityDate] = useState("");
//   const [skills, setSkills] = useState("");
//   const [setUpTime, setSetUpTime] = useState("");
//   const [skillCategory, setSkillCategory] = useState("");
//   const [accordions, setAccordions] = useState([]);
//   const [isPopular, setIsPopular] = useState(""); // New field for isPopular
//   const [relatedUsers, setRelatedUsers] = useState([]); // State for storing selected user IDs
//   const [userList, setUserList] = useState([]); // State for storing fetched users
//   const [resourceMedia, setResourceMedia] = useState(null);
//   const [media, setMedia] = useState(null); // Media state
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [dialogType, setDialogType] = useState("success");
//   const quillRef = useRef(null);

//   useEffect(() => {
//     // Fetching users from the provided endpoint
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(
//           "https://upbeat-life-04fe8098b1.strapiapp.com/api/users?populate=*"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch users.");
//         }
//         const data = await response.json();
//         setUserList(data); // Save the list of users
//         // Set the default value for relatedUsers to include all user IDs
//         const allUserIds = data.map((user) => user.id);
//         setRelatedUsers(allUserIds);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setDialogMessage("Error fetching users. Please try again later.");
//         setDialogType("error");
//         setIsDialogOpen(true); //
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Handle change in the editor
//   const handleEditorChange = (value) => {
//     setSkills(value);
//   };

//   // Convert Quill Delta to the desired JSON structure
//   const convertToJSON = () => {
//     const editor = quillRef.current.getEditor();
//     const delta = editor.getContents();

//     // Convert the Delta into the structure you want
//     const formattedSkills = delta.ops
//       .map((op) => {
//         if (op.insert && typeof op.insert === "string") {
//           return {
//             type: "paragraph",
//             children: [
//               {
//                 type: "text",
//                 text: op.insert,
//               },
//             ],
//           };
//         }
//         return null;
//       })
//       .filter((item) => item !== null);

//     return formattedSkills;
//   };

//   const prepareAccordionsPayload = () => {
//     // Map over the accordions and exclude the 'id' field
//     return accordions.map(({ id, ...rest }) => rest);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const skillsData = convertToJSON();
//     const filteredSkillsData = skillsData.filter((_, index) => index % 2 === 0);

//     console.log("Skill Data after Optimisation", filteredSkillsData);
//     // Validation
//     if (!title || !theme || !activityDate) {
//       setDialogMessage("Please fill in all required fields.");
//       setDialogType("error");
//       setIsDialogOpen(true);
//       return;
//     }

//     const newActivity = {
//       Title: title, // Text
//       Theme: theme, // Text
//       FocusAge: focusAge, // Text
//       ActivityDate: activityDate, // Date in 'YYYY-MM-DD' format
//       Skills: filteredSkillsData,
//       SetUpTime: setUpTime, // Text
//       LearningArea: learningArea, // Enumeration
//       // Gallery: media ? [{ id: media.id }] : [], // Media array (ensure it's an array of objects with `id`)
//       // Resources: resourceMedia ? [{ id: resourceMedia.id }] : [], // Media array
//       Accordions: prepareAccordionsPayload(),
//       SkillCategory: skillCategory, // Text
//       relatedUsers: relatedUsers.map((id) => ({ id })),
//     };

//     console.log("New Activity data", newActivity);

//     try {
//       const response = await fetch(
//         "https://upbeat-life-04fe8098b1.strapiapp.com/api/activities",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ data: newActivity }),
//         }
//       );

//       const responseData = await response.json();
//       console.log("ResponseData", responseData);

//       if (response.ok) {
//         setDialogMessage("Activity created successfully!");
//         setDialogType("success");
//         setTitle("");
//         setTheme("");
//         setFocusAge("");
//         setActivityDate("");
//         setSetUpTime("");
//         setSkillCategory("");
//         setLearningArea("");
//         setIsPopular("");
//         setAccordions([]);
//         setSkills(""); // Reset Skills
//         setRelatedUsers([]);
//       } else {
//         setDialogMessage(
//           "Failed to create activity. Please check the input and try again."
//         );
//         setDialogType("error");
//         throw new Error("Failed to create activity");
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//       setDialogMessage(error.message);
//       setDialogType("error");
//     }

//     setIsDialogOpen(true); // Open dialog after submit
//   };

//   // Handle Accordion Changes
//   const handleAccordionChange = (index, field, value) => {
//     setAccordions((prevAccordions) => {
//       const updatedAccordions = [...prevAccordions];
//       updatedAccordions[index][field] = value;
//       return updatedAccordions;
//     });
//   };

//   const handleMediaSelect = (selectedMedia) => {
//     setMedia(selectedMedia); // Store the selected media object
//   };

//   const handleResourceMediaSelect = (selectedMedia) => {
//     setResourceMedia(selectedMedia);
//   };

//   return (
//     <div className="p-8 font-fredoka">
//       <head>
//         <title>Create New Activity - KindiLearning</title>
//       </head>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="Title" className="block">
//             Title
//           </label>
//           <input
//             type="text"
//             id="Title"
//             name="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <label htmlFor="Theme" className="block">
//             Theme
//           </label>
//           <input
//             type="text"
//             id="Theme"
//             name="Theme"
//             value={theme}
//             onChange={(e) => setTheme(e.target.value)}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <label htmlFor="FocusAge" className="block">
//             Focus Age
//           </label>
//           <input
//             type="text"
//             id="FocusAge"
//             name="FocusAge"
//             value={focusAge}
//             onChange={(e) => setFocusAge(e.target.value)}
//             className="border p-2 w-full"
//           />
//         </div>
//         {/* New LearningArea Select Field */}
//         <div>
//           <label htmlFor="LearningArea" className="block">
//             Learning Area
//           </label>
//           <select
//             id="LearningArea"
//             name="LearningArea"
//             value={learningArea}
//             onChange={(e) => setLearningArea(e.target.value)}
//             className="border p-2 w-full"
//           >
//             <option value="" disabled>
//               Select a Learning Area
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
//         {/* Skills (Rich Text Editor with React Quill) */}
//         <div>
//           <label htmlFor="Skills" className="block">
//             Learning Area Icons & Skills (For Activity Detail Page)
//           </label>
//           <label htmlFor="Skills" className="text-[12px] text-red">
//             (Please use List item so that it renders properly) These will be
//             used to show Learning Area Icons on Activity Page
//           </label>

//           <ReactQuill
//             ref={quillRef}
//             value={skills}
//             onChange={handleEditorChange}
//             modules={{
//               toolbar: [[{ list: "ordered" }, { list: "bullet" }]],
//             }}
//             formats={["list"]}
//             className="border p-2 w-full"
//           />
//         </div>
//         {/* isPopular Field (Radio Buttons) */}
//         <div>
//           <label htmlFor="isPopular" className="block">
//             Is this activity popular?
//           </label>
//           <div className="flex space-x-4">
//             <label>
//               <input
//                 type="radio"
//                 name="isPopular"
//                 value="Yes"
//                 checked={isPopular === "Yes"}
//                 onChange={(e) => setIsPopular(e.target.value)}
//               />
//               Yes
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="isPopular"
//                 value="No"
//                 checked={isPopular === "No"}
//                 onChange={(e) => setIsPopular(e.target.value)}
//               />
//               No
//             </label>
//           </div>
//         </div>
//         <div>
//           <label htmlFor="ActivityDate" className="block">
//             Activity Date
//           </label>
//           <input
//             type="date"
//             id="ActivityDate"
//             name="ActivityDate"
//             value={activityDate}
//             onChange={(e) => setActivityDate(e.target.value)}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <label htmlFor="SetUpTime" className="block">
//             SetUp Time
//           </label>
//           <input
//             type="text"
//             id="SetUpTime"
//             name="SetUpTime"
//             value={setUpTime}
//             onChange={(e) => setSetUpTime(e.target.value)}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <h3 className="font-bold mb-2">Accordions</h3>
//           {accordions.map((accordion, index) => (
//             <div key={index} className="mb-4">
//               <label className="block mb-1">Question</label>
//               <input
//                 type="text"
//                 value={accordion.Question}
//                 onChange={(e) =>
//                   handleAccordionChange(index, "Question", e.target.value)
//                 }
//                 className="border p-2 w-full mb-2"
//               />
//               <label className="block mb-1">Answer</label>
//               <ClaraMarkdownRichEditor
//                 id={`answer-${accordion.id}`}
//                 value={accordion.Answer}
//                 onChange={(value) =>
//                   handleAccordionChange(index, "Answer", value)
//                 } // Update the answer field
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   const updatedAccordions = accordions.filter(
//                     (_, i) => i !== index
//                   );
//                   setAccordions(updatedAccordions);
//                 }}
//                 className="text-red-500 mt-2"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           {/* Add New Accordion */}
//           <button
//             type="button"
//             onClick={() =>
//               setAccordions([...accordions, { Question: "", Answer: "" }])
//             }
//             className="text-blue-500 mt-4"
//           >
//             Add New Accordion
//           </button>
//         </div>
//         {/* Related Users Field (Multi-select Dropdown) */}
//         {/* <div>
//           <label htmlFor="relatedUsers" className="block">
//             Select Related Users
//           </label>
//           <select
//             id="relatedUsers"
//             name="relatedUsers"
//             value={relatedUsers}
//             onChange={handleRelatedUsersChange}
//             multiple
//             className="border p-2 w-full"
//           >
//             {userList.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.username}
//               </option>
//             ))}
//           </select>
//         </div> */}

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Create Activity
//         </button>
//       </form>

//       {/* Dialog for showing success/error messages */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogTrigger asChild>
//           <button className="hidden">Open Dialog</button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{dialogMessage}</DialogTitle>
//             <DialogDescription>
//               {dialogType === "success"
//                 ? "The activity was created successfully."
//                 : "Something went wrong. Please review your form."}
//             </DialogDescription>
//           </DialogHeader>
//           <DialogClose asChild>
//             <button className="px-4 py-2 bg-black text-white rounded">
//               Close
//             </button>
//           </DialogClose>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
