"use client";
import { useEffect, useState } from "react";

import React from "react";
import Link from "next/link";

import ThemeCard from "@/app/Widgets/Card/ThemeCard";

export default function ThemeGrid() {
  const [error, setError] = useState(null);
  const [popularActivities, setPopularActivities] = useState([]); // Popular activities state

  // Fetch activities data
  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/our-themes?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          setPopularActivities(data.data);
        } else {
          setError("Error fetching activities data");
        }
      } catch (error) {
        setError("Error fetching activities data");
      }
    };

    fetchActivitiesData();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="w-full flex items-center justify-center claracontainer ">
        <div className="lg:grid claracontainer w-full flex flex-row overflow-x-scroll scrollbar-hidden px-2 py-4 hover:px-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
          {popularActivities.slice(0, 4).map((theme) => (
            <Link
              target="_blank"
              href={`/p/our-themes/${theme.documentId}`}
              key={theme.id}
            >
              <ThemeCard
                key={theme.id}
                image={
                  theme?.Thumbnail
                    ? `https://lionfish-app-98urn.ondigitalocean.app${theme?.Thumbnail[0]?.url}`
                    : "/Images/ThemeDummy.png"
                } // Fallback to default image if URL is missing
                theTime={theme?.LaunchTime || "No launch time specified"} // Fallback if LaunchTime is missing
                metaDesc={
                  theme?.metaDesc
                    ? theme.metaDesc.slice(0, 100)
                    : "No description available"
                } // Fallback if metaDesc is missing
                title={theme?.Title || "Untitled"} // Fallback if Title is missing
              />
            </Link>
          ))}
        </div>
        {popularActivities.length > 4 ? (
          <div className="w-full flex-col justify-center items-center px-4 heading inline-flex">
            <Link
              target="_blank"
              href="/p/our-themes"
              className="clarabutton text-white py-2 min-w-[200px] lg:w-[240px] text-center px-8 lg:px-4  bg-red hover:bg-purple"
            >
              View More
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}
