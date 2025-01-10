"use client";

import { useEffect, useState } from "react";

const ActivityCard = ({ activity }) => {
  const {
    Title,
    Skills,
    Theme,
    FocusAge,
    ActivityDate,
    LearningArea,
    SetUpTime,
    SkillCategory,
  } = activity;

  // Extract Skills text
  const skillsText =
    Skills.map((skill) =>
      (skill.children || [])
        .map((child) => child.text || "Unknown") // Fallback to "Unknown" if text is missing
        .join(" ")
    ).join(", ") || "No skills available"; // Fallback to "No skills available" if Skills is empty

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{Title}</h3>
        <div className="text-sm text-gray-600 mb-3">
          <p className="mb-1">
            Theme: <span className="font-medium text-gray-800">{Theme}</span>
          </p>
          <p className="mb-1">
            Focus Age:{" "}
            <span className="font-medium text-gray-800">{FocusAge}</span>
          </p>
          <p className="mb-1">
            Learning Area:{" "}
            <span className="font-medium text-gray-800">{LearningArea}</span>
          </p>
          <p className="mb-1">
            Setup Time:{" "}
            <span className="font-medium text-gray-800">{SetUpTime}</span>
          </p>
          <p className="mb-1">
            Skill Category:{" "}
            <span className="font-medium text-gray-800">{SkillCategory}</span>
          </p>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          <p className="mb-1">
            Skills:{" "}
            <span className="font-medium text-gray-800">{skillsText}</span>
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-500">
            {new Date(ActivityDate).toLocaleDateString()}
          </p>
          <a
            href={`/activity/${activity.documentId}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors"
          >
            View Details →
          </a>
        </div>
      </div>
    </div>
  );
};

export default function ActivityWidgets() {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalActivities: 0,
    skillCategories: {},
    themes: {},
    focusAges: {},
  });

  // Fetch activity data from the server on mount
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/activities");
        const result = await response.json();
        const data = result.data; // Extracting data array from the response

        setActivities(data); // Store the full list of activities

        // Initialize counters for each category
        const skillCategories = {};
        const themes = {};
        const focusAges = {};

        // Iterate through each activity to calculate the statistics
        data.forEach((activity) => {
          // Count SkillCategories
          if (activity.SkillCategory) {
            skillCategories[activity.SkillCategory] =
              (skillCategories[activity.SkillCategory] || 0) + 1;
          }

          // Count Themes
          if (activity.Theme) {
            themes[activity.Theme] = (themes[activity.Theme] || 0) + 1;
          }

          // Count FocusAge
          if (activity.FocusAge) {
            focusAges[activity.FocusAge] =
              (focusAges[activity.FocusAge] || 0) + 1;
          }
        });

        setStats({
          totalActivities: data.length,
          skillCategories,
          themes,
          focusAges,
        });
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    fetchActivities();
  }, []);

  // Check if the data is still loading
  if (activities.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Activities Card */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold">Total Activities</h3>
        <p className="text-xl font-bold">{stats.totalActivities}</p>
      </div>

      {/* Skill Categories Card */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold">Skill Categories</h3>
        <ul>
          {Object.entries(stats.skillCategories).map(([skill, count]) => (
            <li key={skill} className="flex justify-between">
              <span>{skill}</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Themes Card */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold">Themes</h3>
        <ul>
          {Object.entries(stats.themes).map(([theme, count]) => (
            <li key={theme} className="flex justify-between">
              <span>{theme}</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Focus Ages Card */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold">Focus Ages</h3>
        <ul>
          {Object.entries(stats.focusAges).map(([age, count]) => (
            <li key={age} className="flex justify-between">
              <span>{age}</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RecentActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/activities");
        const data = await response.json();

        // Sort by 'publishedAt' and slice the latest 5 activities
        const sortedActivities = data.data.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        const recentActivities = sortedActivities
          .slice(0, 5)
          .map((activity) => ({
            Title: activity.Title,
            Skills: activity.Skills,
            Theme: activity.Theme,
            FocusAge: activity.FocusAge,
            ActivityDate: activity.ActivityDate,
            LearningArea: activity.LearningArea,
            SetUpTime: activity.SetUpTime,
            SkillCategory: activity.SkillCategory,
            documentId: activity.id,
          }));

        setActivities(recentActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="recent-activities">
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.documentId} activity={activity} />
        ))}
      </div>
    </div>
  );
}
