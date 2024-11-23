import NotFound from "@/app/not-found";
import { Button } from "@/components/ui/button";
import { getHomeData } from "@/lib/hygraph";
import { Curve, CurveTwo } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function HowItWorks() {
  const homeData = await getHomeData();
  // console.log("Home Page Data (in component):", homeData);
  if (!homeData || !homeData[0]?.howItWorks) {
    return (
      <p>
        <NotFound />
      </p>
    );
  }

  return (
    <>
      <section className="w-full h-auto bg-[#4e2f71] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px] duration-300 animate-fade-in">
        <div className="claracontainer w-full px-4 md:px-2 lg:px-4 pb-6 pt-20 flex-col justify-start items-center gap-7 inline-flex">
          <div className="w-auto claracontainer flex-col justify-start items-start md:items-center gap-6 inline-flex">
            <div className="w-full text-start md:text-center">
              <span className="text-white claraheading animate-fade-in">
                How It{" "}
              </span>
              <span className="text-red text-start md:text-center claraheading animate-fade-in">
                Works
              </span>
            </div>
            <div className="w-full md:w-[500px] xl:w-[800px] text-start md:text-center animate-fade-in text-white clarabodyTwo">
              <p>{homeData[0].howItWorks}</p>
            </div>
          </div>

          <div className="flex w-full justify-center items-center flex-col gap-12">
            {/* Section One */}
            <div className="flex flex-col-reverse lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4">
              <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                <div className="text-white text-6xl md:text-[50px] p-0 animate-fade-in font-semibold font-fredoka uppercase leading-10">
                  01
                </div>
                <div className="flex-col flex justify-start items-start gap-6">
                  <div className="flex-col w-full justify-start items-start gap-5 flex">
                    <div className="w-full gap-3">
                      <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                        Select Your Preferred <br />
                      </span>
                      <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                        Educational Activities
                      </span>
                    </div>
                    <div className="w-full text-white animate-fade-in clarabodyTwo">
                      <p>{homeData[0].howItWorksOne}</p>
                    </div>
                  </div>
                  <Link
                    href="/p/how-it-works#video"
                  
                    rel="noopener noreferrer"
                    className="w-full h-12 "
                  >
                    <Link href="/p/how-it-works" className="absolute text-center py-2 animate-fade-in hover:bg-red bg-white hover:text-white text-red shadow border-2 border-white clarabutton">
                        SHOW ME
                     
                    </Link>
                  </Link>
                </div>
              </div>
              <div className="w-full h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
                <Image
                  alt="Kindi"
                  width={100}
                  height={100}
                  src={homeData[0]?.hiwOne?.url}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <Image
              alt="Kindi"
              src={Curve}
              className="hidden md:hidden lg:flex w-[50%] -mb-[60px] -mt-[140px]"
            />

            {/* Section Two */}
            <div className="flex flex-col lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4">
              <div className="w-full h-[460px] md:max-w-[500px] flex items-end justify-end">
                <Image
                  alt="Kindi"
                  src={homeData[0]?.hiwTwo?.url}
                  width={100}
                  height={100}
                  className="w-full h-full animate-fade-in object-contain"
                />
              </div>
              <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                <div className="text-white text-6xl md:text-[50px] p-0 font-semibold font-fredoka uppercase leading-10">
                  02
                </div>
                <div className="flex-col flex justify-start items-start gap-6">
                  <div className="flex-col w-full justify-start items-start gap-5 flex">
                    <div className="w-full gap-3">
                      <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                        Guide Your Child{" "}
                      </span>
                      <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                        Through the Learning Process{" "}
                      </span>
                    </div>
                    <div className="w-full text-white animate-fade-in clarabodyTwo">
                      <p>{homeData[0].howItWorksTwo}</p>
                    </div>
                  </div>
                  <Link
                    href="/p/how-it-works#video"
                 
                    rel="noopener noreferrer"
                    className="w-full h-12 relative"
                  >
                    <Link href="/p/how-it-works" className="absolute text-center py-2 animate-fade-in hover:bg-red bg-white hover:text-white text-red shadow border-2 border-white clarabutton">
                        SHOW ME
                     
                    </Link>
                  </Link>
                </div>
              </div>
            </div>

            <Image
              alt="Kindi"
              src={CurveTwo}
              className="transform hidden md:hidden lg:flex -rotate-180 w-[56%] -mt-[130px] -mb-[20px]"
            />

            {/* Section Three */}
            <div className="flex flex-col-reverse lg:flex-row xl:flex-row w-full items-center justify-between py-0 md:py-8 gap-6">
              <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                <div className="text-white text-6xl md:text-[50px] lg:text-[50px] p-0  font-semibold font-fredoka uppercase leading-10">
                  03
                </div>
                <div className="flex-col flex justify-start items-start gap-6">
                  <div className="flex-col w-full justify-start items-start gap-5 flex">
                    <div className="w-full gap-3">
                      <span className="text-white claraheading animate-fade-in lg:text-[44px]">
                        Enjoy{" "}
                      </span>
                      <span className="text-red w-[max-content] animate-fade-in claraheading lg:text-[44px]">
                        Precious Time{" "}
                      </span>
                    </div>
                    <div className="w-full text-white clarabodyTwo animate-fade-in">
                      <p>{homeData[0].howItWorksThree}</p>
                    </div>
                  </div>
                  <Link
                    href="/p/how-it-works#video"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 relative"
                  >
                    <Link href="/p/how-it-works" className="absolute text-center py-2 animate-fade-in hover:bg-red bg-white hover:text-white text-red shadow border-2 border-white clarabutton">
                        SHOW ME
                     
                    </Link>
                  </Link>
                </div>
              </div>
              <div className="w-full h-full md:max-w-[500px] animate-fade-in flex items-end justify-end lg:justify-start lg:items-start">
                <Image
                  alt="Kindi"
                  width={100}
                  height={100}
                  src={homeData[0]?.hiwThree?.url}
                  className="w-full -mt-[50px] h-[400px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
