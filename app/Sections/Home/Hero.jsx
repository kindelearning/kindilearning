"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/homepage-hero-section?populate=Image"
        );
        const result = await response.json();
        console.log("Hero section", result);

        if (result.data) {
          setData(result.data);
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

  const getFirstThreeWords = (text) => {
    return text ? text.split(" ").slice(0, 3).join(" ") : "No Text";
  };
  const getLastThreeWords = (text) => {
    return text ? text.split(" ").slice(3).join(" ") : "No Text";
  };

  return (
    <>
      <section
        style={{
          backgroundColor: data.bgColor || "#4A4096", // Default to a light gray if bgColor is not provided
        }}
        className="w-full min-h-screen h-full md:min-h-[600px] md:h-full lg:h-full pt-4 pb-12 md:py-24 lg:py-28 items-start md:items-center justify-center flex flex-col md:flex-row gap-[20px]"
      >
        <div
          style={{
            backgroundColor: data.bgColor || "#4A4096", // Default to a light gray if bgColor is not provided
          }}
          className="claracontainer w-full flex flex-col-reverse justify-between md:items-center lg:flex-row px-0 md:px-2 lg:px-0 xl:px-0  xl:flex-row gap-4 md:gap-0 lg:gap-4"
        >
          <div className="h-auto w-full lg:max-w-[60%] md:min-w-[50%] md:w-[100%] lg:w-full flex-col px-4 md:px-0 lg:px-4 justify-center items-start gap-6 md:gap-7 lg:gap-8 xl:gap-10 inline-flex">
            <div className="w-full flex flex-col justify-start items-start h-auto gap-6 md:gap-2 lg:gap-4 xl:gap-4">
              <div className="text-white animate-text-reveal clarascript">
                {data.featuredText || "No Featured Text available"}
              </div>
              <div className="flex flex-col flex-wrap w-full justify-start items-start gap-3 lg:gap-6 animate-fade-in">
                <div className="w-full lg:w-[max-content]">
                  <span className="text-white claraheading lg:text-[50px] lg:leading-[56px] font-bold font-fredoka capitalize animate-fade-in">
                    {getFirstThreeWords(data.HeroTitle) || "Kindi Learning"}
                  </span>
                  <br />
                  <span className="text-light-purple-100 claraheading md:text-[24px] md:leading-[26px] font-normal font-fredoka capitalize animate-fade-in"></span>
                  <span className="text-red claraheading lg:text-[50px] lg:leading-[56px] animate-fade-in">
                    {getLastThreeWords(data.HeroTitle) || "For 0-5 Year kids"}
                  </span>
                </div>
                {data.BodyDescription ? (
                  <p
                    className="prose text-start w-full h-auto text-white clarabody animate-fade-in] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
                    dangerouslySetInnerHTML={{
                      __html: data.BodyDescription,
                    }}
                  />
                ) : (
                  <p className="prose text-start w-full h-auto text-white clarabody animate-fade-in] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000">
                    New Featured Text for Hero Section shravya shsNew Featured
                    Text for Hero Section shravya shsNew Featured Text for Hero
                    Section shravya shsNew Featured Text for Hero Section
                    shravya shsNew Featured Text for Hero Section shravya shsNew
                    Featured Text for Hero Section shravya shs
                  </p>
                )}
              </div>
            </div>
            <Link
              href="/profile"
              target="_blank"
              className="w-auto animate-fade-in"
            >
              <Button className="bg-red hover:bg-[#eaeaf5] hover:text-red clarabutton">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="w-full flex md:min-w-[300px] items-start justify-center h-fit min-h-[400px] md:w-[300px] lg:w-full">
            <div className="w-full h-fit md:h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
            {/* poster="favicon-48x48.png" */}
              {data?.Image?.url ? (
                <video autoPlay playsInline loop muted >
                  <source
                    src={`https://lionfish-app-98urn.ondigitalocean.app${data.Image?.url}`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                // heroMediaUrl.endsWith(".mp4") ? (
                //   <video autoPlay loop muted>
                //     <source src={`https://lionfish-app-98urn.ondigitalocean.app${heroMediaUrl}`} type="video/mp4" />
                //     Your browser does not support the video.
                //   </video>
                // )
                // : (
                //   <Image src={`https://lionfish-app-98urn.ondigitalocean.app${heroMediaUrl}`} alt="Hero" />
                // )
                <video autoPlay loop muted>
                  <source src="/preloader.mp4" type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
