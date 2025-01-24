"use client";
import { fetchEarlyLearningExpert } from "@/app/data/p/Home";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// const PromotionalSectionTwo = async () => {
export default function PromotionalSectionTwo() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const content = await fetchEarlyLearningExpert();

  // if (!content) {
  //   return <p>No data available</p>;
  // }

  // const { featuredText, title, BodyDescription, Media } = content;
  // const mediaUrl = Media?.url ? Media.url : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/early-learning-expert?populate=Content.Media"
        );
        const data = await response.json();
        // console.log("Monthlytheme Database", data);
        if (data?.data) {
          setContent(data.data.Content); // Set the fetched data
        } else {
          setError("No data found.");
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
  return (
    <section className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-4 flex flex-col md:flex-row gap-4 transition-all duration-300 animate-fade-in">
      <div className="claracontainer p-4 py-8 md:px-2 md:py-12 lg:py-20 w-full flex flex-col md:justify-center md:items-center lg:flex-row xl:flex-row overflow-hidden gap-9 animate-slide-up">
        <div className="w-full md:w-[100%] lg:w-[540px] flex justify-start items-start h-auto animate-fade-in">
          <div className="w-full md:w-full flex items-start justify-start flex-col lg:w-[540px] h-auto">
            {content?.Media ? (
              content?.Media.url.endsWith(".mp4") ? (
                <video
                  controls
                  autoPlay
                  src={`https://lionfish-app-98urn.ondigitalocean.app${content.Media.url}`}
                  loop
                  muted
                  className="object-cover max-h-[260px] md:min-h-[400px] md:h-[400px] lg:h-[360px] lg:max-h-[400px] rounded-[24px] w-full md:w-full lg:w-[540px] h-full"
                />
              ) : (
                <img
                  src={`https://lionfish-app-98urn.ondigitalocean.app${content.Media.url}`}
                  alt="Hero"
                  width={540}
                  height={360}
                />
              )
            ) : (
              <video
                controls
                autoPlay
                loop
                muted
                className="object-cover max-h-[260px] md:min-h-[400px] md:h-[400px] lg:h-[360px] lg:max-h-[400px] rounded-[24px] w-full md:w-full lg:w-[540px] h-full"
              >
                <source src="/preloader.mp4" type="video/mp4" />
              </video>
            )}
          </div>
        </div>
        <div className="w-full flex-col justify-center items-start gap-6 flex md:gap-8 xl:gap-10 animate-fade-in">
          <div className="w-full h-auto gap-6 flex flex-col justify-start items-start">
            <div className="text-red clarascript animate-fade-in">
              {content?.featuredText}
            </div>
            <div className="flex w-full justify-start items-start gap-4 flex-col">
              <div className="w-full claraheading animate-fade-in">
                <span className="text-red claraheading ">
                  {content?.title.length > 2
                    ? content?.title.split(" ").slice(0, 2).join(" ")
                    : content?.title || "Early Learning"}
                </span>{" "}
                <span className="text-purple claraheading">
                  {content?.title.length > 2
                    ? content?.title.split(" ").slice(2, 12).join(" ")
                    : content?.title || "Experts"}
                </span>
              </div>
              {content?.BodyDescription &&
              content?.BodyDescription.length > 0 ? (
                <p
                  className="prose w-full text-start text-[#696969] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
                  dangerouslySetInnerHTML={{ __html: content?.BodyDescription }}
                />
              ) : (
                <p>
                  Scientists have recently determined that it takes
                  approximately 400 repetitions to create a new synapse in the
                  brain- unless it is done with play, in which case, it takes
                  between 10-20 repetitions.”- Dr. Karyn Purvis Institute of
                  Child Development.Play matters! It&apos;s the vital
                  developmental process that shapes the adults we&apos;re
                  destined to become. And we are in a rush, as essential life
                  skills become more challenging to master as children
                  age....&nbsp;
                </p>
              )}
            </div>
          </div>
          <Link
            href="/profile"
            target="_blank"
            className="w-full h-auto animate-fade-in"
          >
            <Button className="bg-red hover:bg-purple px-4 md:px-8 xl:px-12 border-2 clarabutton rounded-[16px]">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
