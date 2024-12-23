"use client";

import { useEffect, useState } from "react";

export default function OurStory() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/our-mission?populate[OurStory][populate]=Media"
        );
        const data = await response.json();
        console.log("HIW Data", data);
        if (data?.data) {
          setContent(data.data);
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

  if (loading) return <div className="text-gray-500">Loading content...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!content) return <div>No content available.</div>;

  const { OurStory } = content;

  return (
    <>
      <section className="max-w-[1000px] min-h-screen h-full md:h-full lg:h-full flex flex-col items-center bg-[#ffffff] w-full gap-4 py-8">
      {/* Media Section */}
         <div className="w-full flex justify-center items-center mt-8">
          {OurStory?.Media?.[0]?.url ? (
            <video
              autoPlay
              controls
              src={`http://localhost:1337${OurStory.Media[0].url}`}
              className="w-full max-w-[800px] h-auto border-2 border-[#ddd] shadow-lg rounded-lg overflow-hidden"
            />
          ) : (
            <p className="text-gray-600 text-center text-lg md:text-xl">
              No media available.
            </p>
          )}
        </div>
        <div className="w-full flex flex-col justify-start items-center animate-fadeIn animate-delay-500">
          {/* Featured Text */}
          {OurStory?.featuredText && (
            <p className="text-[#1d1d1d] clarascript text-lg md:text-xl lg:text-2xl font-semibold animate-slideInLeft animate-delay-1000">
              {OurStory.featuredText}
            </p>
          )}

          {/* Title */}
          {OurStory?.Title && (
            <div className="flex flex-wrap justify-center items-center text-[#1d1d1d] claraheading text-3xl md:text-4xl lg:text-5xl font-bold text-center animate-slideInLeft animate-delay-1500">
              <span className="mx-1">
                {OurStory.Title.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="mx-1">
                {OurStory.Title.split(" ").slice(2, 3).join(" ")}
              </span>
            </div>
          )}

          {/* Body */}
          {OurStory?.Body && (
            <p className="text-center text-[#696969] text-base md:text-lg lg:text-xl mt-4 leading-relaxed animate-fadeIn animate-delay-2000">
              {OurStory.Body}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
