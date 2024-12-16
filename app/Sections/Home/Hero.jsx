"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HomeHeroGif } from "@/public/Images";
import { fetchHeroSection } from "../../data/p/Home";
import { useEffect, useState } from "react";

export default async function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHeroSection();
        console.log("HeroData loaded", data); // Debug log to check the data
        setHeroData(data); // Set fetched data
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchData(); // Invoke the fetchData function
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!heroData) {
    return <p>No Hero Section data found.</p>;
  }
  const { featuredText, HeroTitle, BodyDescription, image } = heroData;
  return (
    <section className="w-full min-h-screen h-full md:min-h-[600px] md:h-full lg:h-full bg-[#5449A1] pt-4 pb-12 md:py-24 lg:py-28 items-start md:items-center justify-center flex flex-col md:flex-row gap-[20px]">
      <section>
        {/* Render Hero Title and Featured Text */}
        <h1>{HeroTitle}</h1>
        <p>{featuredText}</p>

        {/* Render Hero Image if available */}
        {image ? (
          <img
            src={`http://localhost:1337${image.url}`} // Adjust based on your Strapi image field
            alt="Hero"
          />
        ) : (
          <p>No image available</p>
        )}

        {/* Render Body Description */}
        <div>
          {BodyDescription && BodyDescription.length > 0 ? (
            BodyDescription.map((paragraph, index) => (
              <p key={index}>{paragraph.children[0]?.text}</p>
            ))
          ) : (
            <p>No body description available</p>
          )}
        </div>
      </section>
      <div className="claracontainer w-full flex flex-col-reverse justify-between md:items-center lg:flex-row px-0 md:px-2 lg:px-0 xl:px-0 bg-[#5449A1] xl:flex-row gap-4 md:gap-0 lg:gap-4 ">
        <div className="h-auto w-full lg:max-w-[60%] md:min-w-[50%] md:w-[100%] lg:w-full flex-col px-4 md:px-0 lg:px-4 justify-center items-start gap-6 md:gap-7 lg:gap-8 xl:gap-10 inline-flex ">
          <div className="w-full flex flex-col justify-start items-start h-auto gap-6 md:gap-2 lg:gap-4 xl:gap-4 ">
            <div className="text-white animate-text-reveal clarascript ">
              {/* Early Learning for a Lifetime of Achievement */}
              {/* {heroSection.featuredText} */}
            </div>
            <div className="flex flex-col flex-wrap w-full justify-start items-start gap-3 lg:gap-6 animate-fade-in ">
              <div className="w-full lg:w-[max-content]">
                <span className="text-white claraheading lg:text-[50px] lg:leading-[56px]  font-bold font-fredoka capitalize animate-fade-in">
                  {heroData.heroTitle}
                </span>
                <br />
                <span className="text-light-purple-100 claraheading md:text-[24px] md:leading-[26px] font-normal font-fredoka capitalize animate-fade-in">
                  {" "}
                </span>
                <span className="text-red claraheading  lg:text-[50px] lg:leading-[56px]  animate-fade-in">
                  {heroData.heroTitle}
                </span>
              </div>
              <div className="w-full h-auto text-white clarabody animate-fade-in">
                {/* <p>{heroSection.BodyDescription}</p> */}
              </div>
              {/* {heroSection.featuredText && (
                <div className="w-full h-auto text-white clarabody animate-fade-in">
                  {heroSection.featuredText}
                </div>
              )} */}
            </div>
          </div>
          <div className="w-auto animate-fade-in">
            <Button className="bg-red hover:bg-[#eaeaf5] hover:text-red clarabutton">
              Get Started
              {/* {session ? "Upgrade" : "Get Started"} */}
            </Button>
          </div>
        </div>
        <div className="w-full flex md:min-w-[300px] items-start justify-center h-fit min-h-[400px] md:w-[300px] lg:w-full ">
          <div className="w-full h-fit md:h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
            <div className="hero-video-container">
              {/* <img src="/Images/HomeHero.gif" alt="home gif"/> */}
              <video
                autoPlay
                loop
                muted
                className="flex lg:scale-125 justify-center items-center"
              >
                <source src="/Images/HomeHero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
