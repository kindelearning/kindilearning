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
import ClaraMarkdownRichEditor from "../../Sections/TextEditor/ClaraMarkdownRichEditor";
import { MultiMediaSelector } from "../media/Section/MediaSelector";
import { Button } from "@/components/ui/button";

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
  const [resourceMedia, setResourceMedia] = useState(null);
  const [resource, setResource] = useState([]); // Store selected media
  const [media, setMedia] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  useEffect(() => {
    // Fetching users from the provided endpoint
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/users?populate=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();
        setUserList(data); // Save the list of users
        // Set the default value for relatedUsers to include all user IDs
        const allUserIds = data.map((user) => user.id);
        setRelatedUsers(allUserIds);
      } catch (error) {
        console.error("Error fetching users:", error);
        setDialogMessage("Error fetching users. Please try again later.");
        setDialogType("error");
        setIsDialogOpen(true); //
      }
    };

    fetchUsers();
  }, []);

  const prepareAccordionsPayload = () => {
    // Map over the accordions and exclude the 'id' field
    return accordions.map(({ id, ...rest }) => rest);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !theme || !activityDate) {
      setDialogMessage("Please fill in all required fields.");
      setDialogType("error");
      setIsDialogOpen(true);
      return;
    }
    const formattedGallery = media.map((id) => ({ id }));
    const formattedResources = resource.map((id) => ({ id }));

    const newActivity = {
      Title: title,
      Theme: theme,
      FocusAge: focusAge,
      ActivityDate: activityDate,
      // Skills: skills,
      SetUpTime: setUpTime,
      LearningArea: learningArea,
      Gallery: formattedGallery,
      Resources: formattedResources,
      Accordions: prepareAccordionsPayload(),
      SkillCategory: skillCategory,
      relatedUsers: relatedUsers.map((id) => ({ id })),
    };

    console.log("New Activity data", newActivity);

    try {
      const response = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newActivity }),
      });

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
        // setResourceMedia(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Skills") {
      // Split the value by new lines and structure each line into the required format
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

      setSkills(processedSkills); // Set the skills in the required format
    } else {
      setSkills(value); // For other fields, update the value normally
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
      <head>
        <title>Create New Activity - KindiLearning</title>
      </head>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <MultiMediaSelector onMediaSelect={handleResourcesSelect} />{" "}
            {/* If no media selected, show a placeholder */}
            {Array.isArray(resource) && resource.length === 0 && (
              <p className="mt-4 text-gray-500 text-center">
                No items selected yet.
              </p>
            )}
          </div>
        </div>
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
            value={
              Array.isArray(skills) && skills.length > 0
                ? skills
                    .map((skillObj) =>
                      skillObj.children.map((child) => child.text).join("\n")
                    )
                    .join("\n")
                : ""
            }
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Enter skills or descriptions here... (separate each skill with a new line)"
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

        {/* <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Activity
        </button> */}
        <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-center py-4 flex flex-row">
          <div className="claracontainer flex flex-row  justify-between w-full items-center gap-4 px-4">
            <Button type="submit">Create Activity</Button>
          </div>
        </section>
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
