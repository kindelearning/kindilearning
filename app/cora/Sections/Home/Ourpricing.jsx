"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Ourpricing() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/ourpricing?populate[MonthlyPlans][populate][0]=Features&populate[MonthlyPlans][populate][1]=Thumbnail&populate[AnnualPlans][populate][0]=Features&populate[AnnualPlans][populate][1]=Thumbnail"
        );
        const data = await response.json();
        console.log("Fetched data: ", data); // Log to inspect the structure
        if (data?.data) {
          setContent(data.data); // Set the fetched data
        } else {
          setError("No content found.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const { SectionTitle, featuredText, SectionBody, MonthlyPlans, AnnualPlans } =
    content || {};

  return (
    <div className="container mx-auto flex flex-col justify-center items-center font-fredoka px-8 py-12">
      <div className="flex flex-col items-center ">
        <h1 className="text-4xl font-bold mb-2">
          {SectionTitle || "Default Title"}
        </h1>
        <p className="text-xl font-medium text-gray-700 mb-2">
          {featuredText || "Default Featured Text"}
        </p>
        <div className="prose mb-6">
          {SectionBody || "Default Body Content"}
        </div>
      </div>
      <div className="flex w-fit justify-between items-center gap-4">
        
      <div className="mt-8">
        <Link href="home/annual"  target="_blank" className="text-red hover:scale-105 duration-200 hover:underline">Annual</Link>
      </div>
      <div className="mt-8">
        <Link href="home/monthly" target="_blank" className="text-red hover:scale-105 duration-200 hover:underline">Monthly</Link>
      </div>
      </div>
    </div>
  );
}
