"use client";
import NotFound from "@/app/not-found";
import { Button } from "@/components/ui/button";
import { getHomeData } from "@/lib/hygraph";
import { PromotionalImage } from "@/public/Images";
import { useSession } from "next-auth/react";
import Image from "next/image";

const PromotionalSection = async () => {
  const { data: session, status } = useSession();

  const homeData = await getHomeData();
  console.log("Home Page Data (in component):", homeData);
  if (!homeData || !homeData[0]?.hero) {
    return <NotFound />;
  }
  return (
    <>
      <section
        className={`w-full h-auto bg-[#029871] items-center justify-center py-8 flex flex-col md:flex-row gap-[20px] transition-all duration-300 animate-fade-in`}
      >
        <div
          className={`claracontainer py-4 px-4 lg:px-0 md:py-6 lg:py-12 w-full flex flex-col-reverse md:justify-center md:items-center lg:flex-row xl:flex-row overflow-hidden gap-8 animate-slide-up`}
        >
          <div
            className={`w-full flex lg:min-w-[54%] lg:w-[50%] flex-col justify-start items-start h-auto gap-6 md:gap-6 lg:gap-4 xl:gap-4 transition-all duration-300 animate-expand`}
          >
            <div
              className={`w-full flex flex-col justify-start items-start h-auto gap-6 md:gap-6 lg:gap-4 xl:gap-4`}
            >
              <div className={`text-white clarascript animate-fade-in`}>
                Play now, learn for life
              </div>
              <div
                className={`flex flex-col w-full justify-start items-start gap-4 md:gap-6 lg:gap-7 xl:gap-8 animate-fade-in`}
              >
                <span
                  className={`text-white claraheading capitalize animate-fade-in`}
                >
                  Child Development Unlocked
                </span>
                {/* Description text */}
                <div
                  className={`w-auto h-auto text-white clarabodyTwo  animate-fade-in`}
                >
                  <p>{homeData[0].childDevelopmentUnlocked}</p>
                </div>
              </div>
            </div>
            <div className="w-auto hover:pl-[4px] duration-200 h-auto animate-fade-in">
              <Button className="bg-[#ffffff] hover:bg-[white] text-[#029871] clarabutton">
                {session ? "Upgrade" : "Get Started"}
                {/* Get Started */}
              </Button>
            </div>
          </div>
          <div
            className={`w-full px-4 md:px-8 xl:px-12 md:w-[50%] flex justify-center items-center h-auto animate-fade-in`}
          >
            <div className="w-[400px] h-auto">
              <Image
                alt="child development unlocked"
                src={PromotionalImage}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PromotionalSection;
