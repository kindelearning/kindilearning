"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HomepageHeroSectionPageUpdate from "./HomepageHeroSectionPageUpdate";

export default function HomepageHeroSectionPage() {
  const [heroSection, setHeroSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the HomepageHeroSection data
  useEffect(() => {
    const fetchHeroSectionData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/homepage-hero-section?populate=*"
        );
        const data = await response.json();

        if (data?.data) {
          setHeroSection(data.data); // Set the fetched data
        } else {
          setError("No hero section data found.");
        }
      } catch (err) {
        setError("Error fetching hero section data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSectionData();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl">
        Loading homepage hero section...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Extract BodyDescription text
  const bodyDescription = heroSection?.BodyDescription?.map((block) =>
    block?.children?.map((child) => child?.text).join(" ")
  ).join("\n");

  return (
    <div className="container mx-auto px-6 py-16 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-start">
          Homepage Hero Section
        </h2>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger>
              <div className="border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 rounded-lg px-6 py-2">
                Edit
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  <HomepageHeroSectionPageUpdate />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-start space-y-8 md:space-y-0">
        <div className="flex flex-col w-full gap-0 space-y-6 md:w-1/2">
          {/* Featured Text */}
          <div className="bg-white p-6 rounded-lg  ">
            <h3 className="text-xl font-semibold text-gray-700">
              Featured Text
            </h3>
            <p className="text-gray-600 text-lg mt-2">
              {heroSection?.featuredText || "No featured text available"}
            </p>
          </div>

          {/* Hero Title */}
          <div className="bg-white p-6 rounded-lg  ">
            <h3 className="text-xl font-semibold text-gray-700">Hero Title</h3>
            <p className="text-gray-600 text-lg mt-2">
              {heroSection?.HeroTitle || "No hero title available"}
            </p>
          </div>

          {/* Body Description */}
          <div className="bg-white p-6 rounded-lg  ">
            <h3 className="text-xl font-semibold text-gray-700">
              Body Description
            </h3>
            <div className="prose mt-4">
              {/* Render the BodyDescription content */}
              <p className="text-gray-600">
                {bodyDescription || "No body description available"}
              </p>
            </div>
          </div>
        </div>

        {/* Image or Video */}
        <div className="md:w-1/2">
          <div className="bg-white p-6 rounded-lg  ">
            {/* <h3 className="text-xl font-semibold text-gray-700">Hero Media</h3> */}
            <div className="mt-4">
              {heroSection?.Image?.mime?.includes("video") ? (
                <video
                  controls
                  className="w-full rounded-lg shadow-lg"
                  src={`http://localhost:1337${heroSection?.Image?.url}`}
                  alt="Hero Section Video"
                />
              ) : (
                <img
                  src={`http://localhost:1337${heroSection?.Image?.url}`}
                  alt="Hero Section Image"
                  className="w-full rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
