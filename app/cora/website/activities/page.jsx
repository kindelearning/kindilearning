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
import EditActivityForm from "./EditActivityForm";

// import CreateActivityForm from "./CreateActivityForm";
// import EditActivityForm from "./EditActivityForm";

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
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/activities?populate=*"
        );
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
        `https://upbeat-life-04fe8098b1.strapiapp.com/api/activities/${documentId}`,
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
        {/* <Dialog>
          <DialogTrigger>Create New Activity</DialogTrigger>
          <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                <CreateActivityForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
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
              <TableHead>isPopular</TableHead>
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
                  Set Up Time
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
                    {activity.Gallery && activity.Gallery.length > 0 ? (
                      activity.Gallery.slice(0, 1).map((image, index) => (
                        <img
                          key={index}
                          src={image?.url}
                          alt={`Gallery ${index}`}
                          className="min-w-16 rounded-md h-16 object-cover"
                        />
                      ))
                    ) : (
                      <img
                        key={index}
                        src="/Images/ThemeDummy.png"
                        alt={`Gallery ${index}`}
                        className="min-w-16 rounded-md h-16 object-cover"
                      />
                    )}
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
                <TableCell>{activity.isPopular}</TableCell>
                <TableCell>
                  {new Date(activity.ActivityDate).toLocaleString()}
                </TableCell>
                <TableCell>{activity.LearningArea}</TableCell>
                <TableCell>{activity.SetUpTime}</TableCell>

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
                        <button
                          variant="outline"
                          onClick={() => console.log("Cancel")}
                        >
                          Cancel
                        </button>
                        <button
                          variant="destructive"
                          onClick={() => handleDelete(activity.documentId)}
                        >
                          Delete
                        </button>
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
                          <EditActivityForm />
                          Loading.....
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
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
