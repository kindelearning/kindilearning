"use client";

import { useEffect, useState } from "react";
const fetchThemesData = async () => {
  const response = await fetch("https://kindiadmin.up.railway.app/api/our-themes");
  const data = await response.json();

  // Sort the themes based on LaunchTime in ascending order
  const sortedThemes = data.data.sort(
    (a, b) => new Date(a.LaunchTime) - new Date(b.LaunchTime)
  );

  // Get the nearest theme (first entry after sorting)
  const nearestTheme = sortedThemes[0];

  // Get the total count of themes
  const totalThemesCount = sortedThemes.length;

  return { nearestTheme, totalThemesCount };
};

const ThemeCard = ({ theme }) => {
  const { Title, LaunchTime, FocusAge, ThemeType, LaunchDescription } = theme;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{Title}</h3>
        <div className="text-sm text-gray-600 mb-3">
          <p className="mb-1">
            Launch Time:{" "}
            <span className="font-medium text-gray-800">
              {new Date(LaunchTime).toLocaleDateString()}
            </span>
          </p>
          <p className="mb-1">
            Focus Age:{" "}
            <span className="font-medium text-gray-800">{FocusAge}</span>
          </p>
          <p className="mb-1">
            Theme Type:{" "}
            <span className="font-medium text-gray-800">{ThemeType}</span>
          </p>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          <p className="mb-1">
            Launch Description:{" "}
            <span className="font-medium text-gray-800">
              {LaunchDescription}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-500">
            {new Date(LaunchTime).toLocaleString()}
          </p>
          <a
            target="_blank"
            href={`/p/our-themes/${theme.documentId}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors"
          >
            View Details →
          </a>
        </div>
      </div>
    </div>
  );
};

export default function ThemeWidgets() {
  const [themes, setThemes] = useState([]);
  const [stats, setStats] = useState({
    totalThemes: 0,
    nearestLaunch: null,
  });

  // Fetch theme data from the server on mount
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await fetch("https://kindiadmin.up.railway.app/api/our-themes");
        const result = await response.json();
        const data = result.data; // Extracting data array from the response

        setThemes(data); // Store the full list of themes

        // Find the nearest theme based on LaunchTime
        const sortedThemes = data.sort(
          (a, b) => new Date(a.LaunchTime) - new Date(b.LaunchTime)
        );
        const nearestLaunch = sortedThemes[0]; // The first entry is the nearest theme

        setStats({
          totalThemes: data.length,
          nearestLaunch,
        });
      } catch (error) {
        console.error("Error fetching theme data:", error);
      }
    };

    fetchThemes();
  }, []);

  // Check if the data is still loading
  if (themes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Themes Card */}
      <div className="p-4 bg-white shadow-md max-h-[200px] h-full rounded-lg">
        <h3 className="text-2xl font-semibold">Total Themes</h3>
        <p className="text-xl font-bold">{stats.totalThemes}</p>
      </div>

      {/* Nearest Launch Theme Card */}
      <div className="p-4 bg-white shadow-md max-h-[200px] h-full rounded-lg">
        <h3 className="text-2xl font-semibold">Next Theme Launch</h3>
        {stats.nearestLaunch ? (
          <div>
            <p className="text-lg font-semibold">{stats.nearestLaunch.Title}</p>
            <p>
              <strong>Launch Time:</strong>{" "}
              {new Date(stats.nearestLaunch.LaunchTime).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>No upcoming themes found.</p>
        )}
      </div>

      {/* Themes List Card */}
      <div className="p-4 bg-white shadow-md max-h-[200px] overflow-clip overflow-y-scroll scrollbar-hidden rounded-lg">
        <h3 className="text-2xl sticky bg-white p-1/2 font-semibold">Themes</h3>
        <ul>
          {themes.map((theme) => (
            <li key={theme.documentId} className="flex justify-between">
              <span>{theme.Title}</span>
              <span>{new Date(theme.LaunchTime).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RecentThemes() {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await fetch("https://kindiadmin.up.railway.app/api/our-themes");
        const result = await response.json();
        const data = result.data;

        // Sort the themes by LaunchTime in descending order and take the 5 most recent
        const sortedThemes = data.sort(
          (a, b) => new Date(b.LaunchTime) - new Date(a.LaunchTime)
        );

        setThemes(sortedThemes.slice(0, 5)); // Take only the top 5
      } catch (error) {
        console.error("Error fetching theme data:", error);
      }
    };

    fetchThemes();
  }, []);

  if (themes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {themes.map((theme) => (
        <ThemeCard key={theme.documentId} theme={theme} />
      ))}
    </div>
  );
}
