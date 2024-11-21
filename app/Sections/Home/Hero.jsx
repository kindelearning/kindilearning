"use client";

import NotFound from "@/app/not-found";
import { getHomeData } from "@/lib/hygraph";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default async function Hero() {
  const { data: session, status } = useSession();
  const homeData = await getHomeData();
  if (!homeData || !homeData[0]?.hero) {
    return <NotFound />;
  }
  if (!homeData || !homeData[0]?.heroFeaturedVideo) {
    return <NotFound />;
  }
  const videoUrl = homeData[0]?.heroFeaturedVideo?.url;
  return (
    <section className="w-full min-h-screen h-full md:min-h-[600px] md:h-full lg:h-full bg-[#4b4097] py-12 md:py-24 lg:py-28 items-center justify-center flex flex-col md:flex-row gap-[20px]">
      <div className="claracontainer w-full flex flex-col-reverse justify-between md:items-center lg:flex-row px-0 md:px-2 lg:px-0 xl:px-0 bg-[#4b4097] xl:flex-row gap-8 md:gap-0 lg:gap-4 ">
        <div className="h-auto w-full lg:max-w-[60%] md:min-w-[50%] md:w-[100%] lg:w-full flex-col px-4 md:px-0 lg:px-4 justify-center items-start gap-6 md:gap-7 lg:gap-8 xl:gap-10 inline-flex ">
          <div className="w-full flex flex-col justify-start items-start h-auto gap-6 md:gap-2 lg:gap-4 xl:gap-4 ">
            <div className="text-white animate-text-reveal clarascript ">
              Early Learning for a Lifetime of Achievement
            </div>
            <div className="flex flex-col flex-wrap w-full justify-start items-start gap-3 lg:gap-6 animate-fade-in ">
              <div className="w-full lg:w-[max-content]">
                <span className="text-white claraheading lg:text-[50px] lg:leading-[56px]  font-bold font-fredoka capitalize animate-fade-in">
                  Brain Development Activities
                </span>
                <br />
                <span className="text-light-purple-100 claraheading md:text-[24px] md:leading-[26px] font-normal font-fredoka capitalize animate-fade-in">
                  {" "}
                </span>
                <span className="text-red claraheading  lg:text-[50px] lg:leading-[56px]  animate-fade-in">
                  for 0 - 5 Year Olds
                </span>
              </div>
              <div className="w-full h-auto text-white clarabody animate-fade-in">
                <p>{homeData[0].hero}</p>
              </div>
            </div>
          </div>
          <div className="w-auto animate-fade-in">
            <Button
              onClick={() => (window.location.href = "#pricing_Section")}
              className="bg-red hover:bg-[#eaeaf5] hover:text-red clarabutton"
            >
              {session ? "Upgrade" : "Get Started"}
            </Button>
          </div>
        </div>
        <div className="w-full flex md:min-w-[300px] items-start justify-center h-fit min-h-[400px] md:w-[300px] lg:w-full ">
          <div className="w-full h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
            <div className="hero-video-container">
              <video
                autoPlay
                loop
                muted
                className="flex justify-center items-center"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
