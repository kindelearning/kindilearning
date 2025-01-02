// "use client";

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogText,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import ReactQuill from "react-quill";
// import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";
 
// export default function EditActivityForm({ documentId }) {
//   const [title, setTitle] = useState("");
//   const [theme, setTheme] = useState("");
//   const [focusAge, setFocusAge] = useState("");
//   const [learningArea, setLearningArea] = useState(""); // New field
//   const [activityDate, setActivityDate] = useState("");
//   const [setUpTime, setSetUpTime] = useState("");
//   const [existingData, setExistingData] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false); // State
//   const [accordions, setAccordions] = useState([]);

//   // Fetch existing activity data based on documentId
//   useEffect(() => {
//     const fetchActivityData = async () => {
//       try {
//         const res = await fetch(
//           `https://proper-fun-404805c7d9.strapiapp.com/api/activities/${documentId}?populate=*`
//         );
//         const data = await res.json();
//         setExistingData(data.data);
//         setTitle(data.data.Title || "");
//         setTheme(data.data.Theme || "");
//         setFocusAge(data.data.FocusAge || "");
//         setAccordions(data.data.Accordions || []); // Assuming Accordions is the field name in your Strapi model
//         setActivityDate(data.data.ActivityDate || "");
//         setSetUpTime(data.data.SetUpTime || "");
//         setLearningArea(data.data.LearningArea || ""); // Initialize with fetched data
//       } catch (err) {
//         console.error("Error fetching activity data:", err);
//       }
//     };

//     fetchActivityData();
//   }, [documentId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       data: {
//         Title: title,
//         Theme: theme,
//         FocusAge: focusAge,
//         ActivityDate: activityDate,
//         SetUpTime: setUpTime,
//         LearningArea: learningArea,
//         Accordions: accordions, // Directly add the accordions array
//       },
//     };

//     try {
//       const res = await fetch(
//         `https://proper-fun-404805c7d9.strapiapp.com/api/activities/${documentId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json", // Ensure the server expects JSON
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await res.json();
//       console.log("Updated Activity:", data);
//       setOpenDialog(true); // Show the success dialog
//     } catch (error) {
//       console.error("Error updating activity:", error);
//       alert("Error updating activity.");
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Edit Activity</h1>
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
//                 onChange={(e) => {
//                   const updatedAccordions = [...accordions];
//                   updatedAccordions[index].Question = e.target.value;
//                   setAccordions(updatedAccordions);
//                 }}
//                 className="border p-2 w-full mb-2"
//               />
//               <label className="block mb-1">Answer</label>
//               <textarea
//                 value={accordion.Answer}
//                 onChange={(e) => {
//                   const updatedAccordions = [...accordions];
//                   updatedAccordions[index].Answer = e.target.value;
//                   setAccordions(updatedAccordions);
//                 }}
//                 className="border p-2 w-full"
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

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Update Activity
//         </button>
//       </form>

//       {/* Custom Success Dialog */}
//       <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Success!</DialogTitle>
//           </DialogHeader>
//           <DialogDescription>
//             Your activity has been successfully updated.
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
