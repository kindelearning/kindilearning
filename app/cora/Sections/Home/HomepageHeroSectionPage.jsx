"use client";

import { useState, useEffect } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function HomepageHeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState({
    featuredText: "",
    HeroTitle: "",
    BodyDescription: "",
    Image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://kindiadmin.up.railway.app/api/homepage-hero-section?populate=Image"
        );
        const result = await response.json();
        console.log("Hero section", result);

        if (result.data) {
          setData(result.data);
          setUpdateData({
            featuredText: result.data.featuredText || "",
            HeroTitle: result.data.HeroTitle || "",
            BodyDescription: result.data.BodyDescription || "",
            Image: result.data.Image || null,
          });
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

  return (
    <div>
      {/* The Hero Section */}
      <section
        style={{
          backgroundColor: data.bgColor || "#f3f4f6", // Default to a light gray if bgColor is not provided
        }}
        className="homepage-hero-section py-16 px-6 sm:px-12 md:px-16"
      >
        <div className="max-w-6xl flex mx-auto text-center">
          <div className="hero-text max-w-[60%] mb-12">
            <p className="text-lg text-start sm:text-xl text-white mb-2">
              {data.featuredText}
            </p>
            <h1 className="text-3xl text-start text-red claraheading lg:text-[50px] lg:leading-[56px] animate-fade-in font-bold mb-6">
              {data.HeroTitle}
            </h1>

            {/* Render BodyDescription if available */}
            <div className="rich-text text-start prose text-lg sm:text-xl text-white leading-relaxed">
              <p
                className="prose text-start w-full text-white h-auto clarabody animate-fade-in] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
                dangerouslySetInnerHTML={{ __html: data.BodyDescription }}
              />
            </div>
          </div>

          {/* Render media (image or video) based on file extension */}
          {data.Image?.url ? (
            <video autoPlay controls
              // src={data.Image.url}
              src={`https://kindiadmin.up.railway.app${data.Image.url}`}
              width={1200}
              height={800}
              className="w-full max-w-[300px] mx-auto rounded-xl "
            />
          ) : (
            <p className="text-gray-600">No media available</p>
          )}
        </div>
      </section>
    </div>
  );
}
