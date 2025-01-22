"use client";

import { fetchChildDevelopmentUnlock } from "@/app/data/p/Home";
import { Button } from "@/components/ui/button";
import { PromotionalImage } from "@/public/Images";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PromotionalSection() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content when the component mounts
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://kindiadmin.up.railway.app/api/childdevelopmentunlock?populate=Content.Media"
        );
        const data = await response.json();

        if (response.ok) {
          setContent(data.data.Content); // Assuming the response has the Content property
        } else {
          setError("Error fetching content");
        }
      } catch (error) {
        setError("Error fetching content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []); // Empty dependency array means this effect runs only once when the component mounts
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!content) {
    return <p>No content...</p>; // Show loading state while fetching
  }


  return (
    <>
      <section className="w-full h-auto bg-[#029871] items-center justify-center py-8 flex flex-col md:flex-row gap-[20px] transition-all duration-300 animate-fade-in">
        <div className="claracontainer py-4 px-4 md:px-2 lg:px-0 md:py-6 lg:py-12 w-full flex flex-col-reverse md:justify-center md:items-center lg:flex-row xl:flex-row overflow-hidden gap-8 animate-slide-up">
          {/* Text Content */}
          <div className="w-full flex lg:min-w-[54%] lg:w-[50%] px-0 lg:px-4 flex-col button justify-start items-start h-auto transition-all duration-300 animate-expand">
            <div className="w-full flex flex-col justify-start items-start h-auto gap-6 md:gap-6 script">
              {/* Featured Text */}
              {content && (
                <div className="text-white clarascript animate-fade-in">
                  {content.featuredText || "Play now Learn fo Life 2"}
                </div>
              )}

              {/* Title and Body */}
              <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                <span className="text-white claraheading capitalize animate-fade-in">
                  {content.Title || "Child Development Unlocked"}
                </span>

                {content.Body ? (
                  <span className="w-full text-white h-auto prose clarabodyTwo animate-fade-in">
                    <div dangerouslySetInnerHTML={{ __html: content.Body }} />
                  </span>
                ) : (
                  <span className="w-full h-auto  clarabodyTwo animate-fade-in">
                    Scientists have recently determined that it takes
                    approximately 400 repetitions to create a new synapse in the
                    brain- unless it is done with play, in which case, it takes
                    between 10-20 repetitions.”- Dr. Karyn Purvis Institute of
                    Child Development.Play matters! Its the vital developmental
                    process that shapes the adults were destined to become. And
                    we are in a rush, as essential life skills become more
                    challenging to master as children age....
                  </span>
                )}
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
              {content.Media ? (
                <img
                  // src={content.Media[0]?.url}
                src={`https://kindiadmin.up.railway.app${content.Media[0]?.url}`}

                  alt="Child Development"
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              ) : (
                <Image
                  src={PromotionalImage}
                  alt="Child Development"
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
