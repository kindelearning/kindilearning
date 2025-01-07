"use client";

import { fetchChildDevelopmentUnlock } from "@/app/data/p/Home";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function PromotionalSection() {
  const [content, setContent] = useState(null);

  // Fetch content when the component mounts
  useEffect(() => {
    async function loadContent() {
      const fetchedContent = await fetchChildDevelopmentUnlock();
      setContent(fetchedContent);
    }

    loadContent();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  if (!content) {
    return <p>No content...</p>; // Show loading state while fetching
  }

  const mediaUrl = content.media;

  return (
    <>
      <section className="w-full h-auto bg-[#029871] items-center justify-center py-8 flex flex-col md:flex-row gap-[20px] transition-all duration-300 animate-fade-in">
        <div className="claracontainer py-4 px-4 md:px-2 lg:px-0 md:py-6 lg:py-12 w-full flex flex-col-reverse md:justify-center md:items-center lg:flex-row xl:flex-row overflow-hidden gap-8 animate-slide-up">
          {/* Text Content */}
          <div className="w-full flex lg:min-w-[54%] lg:w-[50%] px-0 lg:px-4 flex-col button justify-start items-start h-auto transition-all duration-300 animate-expand">
            <div className="w-full flex flex-col justify-start items-start h-auto gap-6 md:gap-6 script">
              {/* Featured Text */}
              <div className="text-white clarascript animate-fade-in">
                {content.featuredText}
              </div>

              {/* Title and Body */}
              <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                <span className="text-white claraheading capitalize animate-fade-in">
                  {content.title || "No Title Available"}
                </span>
                <span className="w-full h-auto text-white clarabodyTwo animate-fade-in">
                  {/* Render HTML content */}
                  <div dangerouslySetInnerHTML={{ __html: content.Body }} />
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="w-auto hover:pl-[4px] duration-200 h-auto animate-fade-in">
              <Button className="bg-[#ffffff] hover:bg-red hover:text-white text-[#029871] clarabutton">
                Get Started
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full px-4 md:px-8 xl:px-12 md:w-[50%] flex justify-center items-center h-auto animate-fade-in">
            <div className="w-[400px] h-auto">
              {/* Check if media URL exists and render the image */}
              {mediaUrl ? (
                <img
                  src={mediaUrl}
                  alt="Child Development"
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
