"use client";

import { useState, useEffect } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function HomepageHeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/homepage-hero-section?populate=*"
        );
        const result = await response.json();

        if (result.data) {
          setData(result.data); // result.data is where the content is located
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  // Destructure the fields from the fetched data
  const { featuredText, HeroTitle, BodyDescription, Image } = data;

  // Check if Image exists in the data and get the media URL
  const heroMediaUrl = Image?.data?.attributes?.url || null;

  // Function to get file extension
  const getFileExtension = (url) => {
    return url ? url.split(".").pop().toLowerCase() : null;
  };

  // Check for media type (image or video)
  const fileExtension = heroMediaUrl ? getFileExtension(heroMediaUrl) : null;
  const isImage =
    fileExtension &&
    ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);
  const isVideo =
    fileExtension && ["mp4", "webm", "ogg"].includes(fileExtension);

  return (
    <section className="homepage-hero-section bg-gray-100 py-16 px-6 sm:px-12 md:px-16">
      <div className="max-w-6xl flex mx-auto text-center">
        <div className="hero-text max-w-[60%] mb-12">
        <p className="text-lg text-start sm:text-xl text-gray-600 mb-2">
            {featuredText}
          </p>
          <h1 className="text-3xl text-start font-bold text-gray-700 mb-6">
            {HeroTitle}
          </h1>

          {/* Render BodyDescription if available */}
          <div className="rich-text text-start prose text-lg sm:text-xl text-gray-700 leading-relaxed">
            {BodyDescription ? (
              <BlocksRenderer content={BodyDescription} />
            ) : (
              <p>No description available</p>
            )}
          </div>
        </div>

        {/* Render media (image or video) based on file extension */}
        {heroMediaUrl ? (
          isVideo ? (
            <video
              autoPlay
              loop
              muted
              className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
            >
              <source
                src={`http://localhost:1337${heroMediaUrl}`}
                type="video/mp4"
              />
              Your browser does not support the video.
            </video>
          ) : isImage ? (
            <Image
              src={`http://localhost:1337${heroMediaUrl}`}
              alt="Hero"
              width={1200} // Specify width for Image component
              height={800} // Specify height
              className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
            />
          ) : (
            <p className="text-gray-600">Unsupported media type</p>
          )
        ) : (
          <p className="text-gray-600">No media available</p>
        )}
      </div>
    </section>
  );
}
