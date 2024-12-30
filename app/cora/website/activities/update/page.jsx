"use client";

import { useState, useEffect } from "react";

export default function EditActivityForm({ documentId }) {
  const [formData, setFormData] = useState({
    Title: "",
    Theme: "",
    FocusAge: "",
    LearningArea: "",
    Skills: [],
    ActivityDate: "",
    SetUpTime: "",
  });

  useEffect(() => {
    // Fetch activity data using the documentId
    async function fetchData() {
      const res = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/activities/${documentId}?populate=*`
      );
      const data = await res.json();
      const activity = data.data;
      if (activity) {
        setFormData({
          Title: activity.Title,
          Theme: activity.Theme,
          FocusAge: activity.FocusAge,
          LearningArea: activity.LearningArea,
          Skills: activity.Skills.map((skill) => skill.children[0].text),
          ActivityDate: new Date(activity.ActivityDate)
            .toISOString()
            .slice(0, 16),
          SetUpTime: new Date(activity.SetUpTime).toISOString().slice(0, 16),
        });
      }
    }

    fetchData();
  }, [documentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedActivity = {
      ...formData,
      Skills: formData.Skills.map((skill) => ({ children: [{ text: skill }] })),
    };

    try {
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/activities/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: updatedActivity }),
        }
      );

      if (response.ok) {
        alert("Activity updated successfully!");
      } else {
        throw new Error("Failed to update the activity.");
      }
    } catch (error) {
      alert(error.message);
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
            value={formData.Title}
            onChange={handleInputChange}
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
            value={formData.Theme}
            onChange={handleInputChange}
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
            value={formData.FocusAge}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="LearningArea" className="block">
            Learning Area
          </label>
          <input
            type="text"
            id="LearningArea"
            name="LearningArea"
            value={formData.LearningArea}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="Skills" className="block">
            Skills
          </label>
          <input
            type="text"
            id="Skills"
            name="Skills"
            value={formData.Skills.join(", ")}
            onChange={(e) =>
              setFormData({ ...formData, Skills: e.target.value.split(", ") })
            }
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="ActivityDate" className="block">
            Activity Date
          </label>
          <input
            type="datetime-local"
            id="ActivityDate"
            name="ActivityDate"
            value={formData.ActivityDate}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="SetUpTime" className="block">
            SetUp Time
          </label>
          <input
            type="datetime-local"
            id="SetUpTime"
            name="SetUpTime"
            value={formData.SetUpTime}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Activity
        </button>
      </form>
    </div>
  );
}
