"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Eye, PencilLine, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EditActivityForm({ documentId }) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [focusAge, setFocusAge] = useState("");
  const [learningArea, setLearningArea] = useState(""); // New field
  const [activityDate, setActivityDate] = useState("");
  const [setUpTime, setSetUpTime] = useState("");
  const [existingData, setExistingData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State
  const [accordions, setAccordions] = useState([]);

  // Fetch existing activity data based on documentId
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await fetch(
          `https://proper-fun-404805c7d9.strapiapp.com/api/activities/${documentId}?populate=*`
        );
        const data = await res.json();
        setExistingData(data.data);
        setTitle(data.data.Title || "");
        setTheme(data.data.Theme || "");
        setFocusAge(data.data.FocusAge || "");
        setAccordions(data.data.Accordions || []); // Assuming Accordions is the field name in your Strapi model
        setActivityDate(data.data.ActivityDate || "");
        setSetUpTime(data.data.SetUpTime || "");
        setLearningArea(data.data.LearningArea || ""); // Initialize with fetched data
      } catch (err) {
        console.error("Error fetching activity data:", err);
      }
    };

    fetchActivityData();
  }, [documentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        Title: title,
        Theme: theme,
        FocusAge: focusAge,
        ActivityDate: activityDate,
        SetUpTime: setUpTime,
        LearningArea: learningArea,
        Accordions: accordions, // Directly add the accordions array
      },
    };

    try {
      const res = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/activities/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Ensure the server expects JSON
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Updated Activity:", data);
      setOpenDialog(true); // Show the success dialog
    } catch (error) {
      console.error("Error updating activity:", error);
      alert("Error updating activity.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Activity</h1>
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
                onChange={(e) => {
                  const updatedAccordions = [...accordions];
                  updatedAccordions[index].Question = e.target.value;
                  setAccordions(updatedAccordions);
                }}
                className="border p-2 w-full mb-2"
              />
              <label className="block mb-1">Answer</label>
              <textarea
                value={accordion.Answer}
                onChange={(e) => {
                  const updatedAccordions = [...accordions];
                  updatedAccordions[index].Answer = e.target.value;
                  setAccordions(updatedAccordions);
                }}
                className="border p-2 w-full"
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
      {/* <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
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
      </Dialog> */}
    </div>
  );
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [themeFilter, setThemeFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [learningAreaFilter, setLearningAreaFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const itemsPerPage = 12;

  // Options for filters
  const [themes, setThemes] = useState([]);
  const [ages, setAges] = useState([]);
  const [learningAreas, setLearningAreas] = useState([]);
  const [skills, setSkills] = useState([]);

  // Fetch data from the Strapi API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(" https://proper-fun-404805c7d9.strapiapp.com/api/activities?populate=*");
        const data = await response.json();
        console.log("Data", data);
        setActivities(data.data);

        // Extract unique values for filters from the fetched data
        const uniqueThemes = Array.from(
          new Set(data.data.map((activity) => activity.Theme))
        );
        const uniqueAges = Array.from(
          new Set(data.data.map((activity) => activity.FocusAge))
        );
        const uniqueLearningAreas = Array.from(
          new Set(data.data.map((activity) => activity.LearningArea))
        );
        const uniqueSkills = Array.from(
          new Set(
            data.data.flatMap((activity) =>
              activity.Skills.map((skill) => skill.children[0].text)
            )
          )
        );

        setThemes(uniqueThemes);
        setAges(uniqueAges);
        setLearningAreas(uniqueLearningAreas);
        setSkills(uniqueSkills);
      } catch (err) {
        setError("Failed to fetch activities.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Filter and sort the activities
  const filteredActivities = activities
    .filter((activity) => {
      const titleMatch = activity.Title.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      const themeMatch = themeFilter ? activity.Theme === themeFilter : true;
      const ageMatch = ageFilter ? activity.FocusAge === ageFilter : true;
      const learningAreaMatch = learningAreaFilter
        ? activity.LearningArea === learningAreaFilter
        : true;
      const skillsMatch = skillsFilter
        ? activity.Skills.some(
            (skill) => skill.children[0].text === skillsFilter
          )
        : true;
      return (
        titleMatch && themeMatch && ageMatch && learningAreaMatch && skillsMatch
      );
    })
    .sort((a, b) => {
      const aDate = new Date(a[sortConfig.key]);
      const bDate = new Date(b[sortConfig.key]);

      if (sortConfig.direction === "asc") {
        return aDate - bDate;
      } else {
        return bDate - aDate;
      }
    });

  // Pagination logic
  const indexOfLastActivity = currentPage * itemsPerPage;
  const indexOfFirstActivity = indexOfLastActivity - itemsPerPage;
  const currentActivities = filteredActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (column) => {
    setSortConfig((prevSortConfig) => {
      const newDirection =
        prevSortConfig.key === column && prevSortConfig.direction === "asc"
          ? "desc"
          : "asc";
      return { key: column, direction: newDirection };
    });
  };

  const handleDelete = async (documentId) => {
    try {
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/activities/${documentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Filter out the deleted activity from the state
        setActivities((prevActivities) =>
          prevActivities.filter(
            (activity) => activity.documentId !== documentId
          )
        );
        // alert("Activity deleted successfully.");
      } else {
        throw new Error("Failed to delete the activity.");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("An error occurred while deleting the activity.");
    }
  };

  console.log("Fetched Activity", activities);

  return (
    <div className="gap-4 font-fredoka flex w-full flex-col p-8">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Activities</h1>
        <Link
          target="_blank"
          href="https://kindilearning.vercel.app/cora/website/activities/create"
          className="text-[#414141] hover:text-black px-4 py-2 rounded-md text-[16px] font-medium duration-200 ease-in-out"
        >
          Create New Activity
        </Link>
      </div>
      {/* Search Bar */}
      <div className="flex w-full justify-between rounded-lg items-center">
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg w-full px-2 py-1  "
        />
      </div>
      <div className="flex w-full gap-4 justify-between">
        {/* Filters */}
        <div className="flex space-x-4">
          <select
            value={themeFilter}
            onChange={(e) => setThemeFilter(e.target.value)}
            className="border p-2 text-[#676b74] rounded-full"
          >
            <option value="">All Themes</option>
            {themes.map((theme, index) => (
              <option key={index} value={theme}>
                {theme}
              </option>
            ))}
          </select>

          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="border p-2 text-[#676b74] rounded-full"
          >
            <option value="">All Focus Ages</option>
            {ages.map((age, index) => (
              <option key={index} value={age}>
                {age}
              </option>
            ))}
          </select>

          <select
            value={learningAreaFilter}
            onChange={(e) => setLearningAreaFilter(e.target.value)}
            className="border p-2 text-[#676b74] rounded-full"
          >
            <option value="">All Learning Areas</option>
            {learningAreas.map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>

          <select
            value={skillsFilter}
            onChange={(e) => setSkillsFilter(e.target.value)}
            className="border p-2 text-[#676b74] rounded-full"
          >
            <option value="">All Skills</option>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table with Horizontal Scroll */}
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>List of Activities</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Serial No.</TableHead>
              <TableHead>Gallery</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Theme</TableHead>
              <TableHead>Focus Age</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("ActivityDate")}
                  className="flex items-center"
                >
                  Activity Date
                  {sortConfig.key === "ActivityDate" &&
                    (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                </button>
              </TableHead>
              <TableHead>Learning Area</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("SetUpTime")}
                  className="flex items-center"
                >
                  SetUp Time
                  {sortConfig.key === "SetUpTime" &&
                    (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                </button>
              </TableHead>
              <TableHead>Accordion Count</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex items-center"
                >
                  Created At
                  {sortConfig.key === "createdAt" &&
                    (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("updatedAt")}
                  className="flex items-center"
                >
                  Last Updated
                  {sortConfig.key === "updatedAt" &&
                    (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                </button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentActivities.map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell>{indexOfFirstActivity + index + 1}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {activity.Gallery && activity.Gallery.length > 0
                      ? activity.Gallery.slice(0, 1).map((image, index) => (
                          <img
                            key={index}
                            src={image.url}
                            alt={`Gallery ${index}`}
                            className="min-w-16 rounded-md h-16 object-cover"
                          />
                        ))
                      : null}

                    {/* {activity.Gallery.slice(0, 1).map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        // src={`https://proper-fun-404805c7d9.strapiapp.com${image.url}`}
                        alt={`Gallery ${index}`}
                        className="min-w-16 rounded-md h-16 object-cover"
                      />
                    ))} */}
                  </div>
                </TableCell>
                <TableCell>{activity.Title}</TableCell>
                <TableCell>
                  <ul>
                    {activity.Skills.slice(0, 1).map((skill, index) => (
                      <li key={index}>{skill.children[0].text}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{activity.Theme}</TableCell>
                <TableCell>{activity.FocusAge}</TableCell>
                <TableCell>
                  {new Date(activity.ActivityDate).toLocaleString()}
                </TableCell>
                <TableCell>{activity.LearningArea}</TableCell>
                <TableCell>
                  {new Date(activity.SetUpTime).toLocaleString()}
                </TableCell>

                <TableCell>{activity.Accordions.length}</TableCell>
                <TableCell>
                  {new Date(activity.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(activity.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell className="flex space-x-2 items-center justify-between">
                  {/* Eye Icon: View link */}
                  <Link
                    target="_blank"
                    href={`/p/activities/${activity.documentId}`}
                  >
                    <Eye className="text-[#717171] w-4 h-4  duration-200 ease-ease-in-out hover:text-black" />
                  </Link>
                  {/* Delete Feature */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Trash className="text-[#717171] w-4 h-4  duration-200 ease-ease-in-out hover:text-black" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this activity? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => console.log("Cancel")}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(activity.documentId)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {/* Update feature */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <PencilLine className="text-[#717171] w-4 h-4  duration-200 ease-ease-in-out hover:text-black" />
                    </DialogTrigger>
                    <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogDescription>
                          <EditActivityForm documentId={activity.documentId} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                {/* <TableCell></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
