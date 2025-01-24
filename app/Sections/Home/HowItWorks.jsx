"use client";
import { useEffect, useState } from "react";
import { fetchHowItWorksData } from "@/app/data/p/Home";
import { Curve, CurveTwo, HIWOne, HIWThree, HIWTwo } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

export default function HowItWorks() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-section?populate=HIWSection.Media"
      );
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }
  // // const content = await fetchHowItWorksData();

  // if (!content) {
  //   return <p>Unable to load content data. Please try again later.</p>;
  // }

  // const { MainTitle, MainBody, HIWSection } = content;
  return (
    <>
      <section className="w-full h-auto bg-[#4e2f71] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px] duration-300 animate-fade-in">
        <div className="claracontainer w-full px-4 md:px-2 lg:px-4 pb-6 pt-20 flex-col justify-start items-center gap-7 inline-flex">
          <div className="w-auto claracontainer flex-col justify-start items-start md:items-center gap-6 inline-flex">
            <div className="w-full text-start md:text-center">
              <span className="text-white claraheading animate-fade-in">
                {data.MainTitle
                  ? data.MainTitle.split(" ").slice(0, 2).join(" ")
                  : "How It"}{" "}
              </span>
              <span className="text-red text-start md:text-center claraheading animate-fade-in">
                {data.MainTitle
                  ? data.MainTitle.split(" ").slice(2, 6).join(" ")
                  : "Works"}{" "}
              </span>
            </div>

            <p
              className="prose w-full md:w-[500px] xl:w-[800px] text-start md:text-center animate-fade-in text-white clarabodyTwo"
              dangerouslySetInnerHTML={{
                __html:
                  data.MainBody ||
                  "Regardless of parenting approaches or the development stage of children, Kindi delivers a wholesome, engaging and beautiful early childhood learning experience.",
              }}
            />
          </div>

          <div className="flex w-full justify-center items-center flex-col gap-12">
            {/* Section One */}
            {data.HIWSection?.slice(0, 1).map((section, index) => (
              <div
                key={index}
                className="flex flex-col-reverse lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4"
              >
                <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                  <div className="text-white text-6xl md:text-[50px] p-0 animate-fade-in font-semibold font-fredoka uppercase leading-10">
                    01
                  </div>
                  <div className="flex-col flex justify-start items-start gap-6">
                    <div className="flex-col w-full justify-start items-start gap-5 flex">
                      <div className="w-full gap-3">
                        <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                          {section.featuredText || "Select Your Preferred "}{" "}
                          <br />
                        </span>
                        <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                          {section.title || "Educational Activities"}
                        </span>
                      </div>

                      {section.BodyDescription ? (
                        <p
                          className="prose w-full text-start text-white clarabodyTwo"
                          dangerouslySetInnerHTML={{
                            __html: section.BodyDescription,
                          }}
                        />
                      ) : (
                        <p>
                          Kindi adds a suggested learning activity to your
                          personalised calendar every day, but you can swap or
                          move them around to suit your schedule. Develop your
                          child&apos;s personal, social, emotional and
                          intellectual traits by choosing from a range of
                          specialised daily activities.&nbsp;Empowering children
                          to fulfil their potential is now as fun as it is
                          convenient.
                        </p>
                      )}
                    </div>
                    <Link
                      href="/p/how-it-works#video"
                      rel="noopener noreferrer"
                      className="w-full h-12 "
                    >
                      <div
                        className="absolute text-center py-2 animate-fade-in hover:bg-red bg-white hover:text-white text-red shadow border-2 border-white clarabutton"
                      >
                        SHOW ME
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="w-full h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
                  {section.Media && section.Media.url ? (
                    <img
                      // src={`https://lionfish-app-98urn.ondigitalocean.app${section.Media.url}`}
                      src={`https://lionfish-app-98urn.ondigitalocean.app${section.Media.url}`}
                      alt="Kindi"
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={HIWOne}
                      alt="Kindi"
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
            ))}
            <Image
              alt="Kindi"
              src={Curve}
              className="hidden md:hidden lg:flex w-[50%] -mb-[60px] -mt-[140px]"
            />

            {/* Section Two */}
            {data.HIWSection?.slice(1, 2).map((section, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4"
              >
                <div className="w-full h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
                  {section.Media && section.Media.url ? (
                    <img
                      src={`https://lionfish-app-98urn.ondigitalocean.app${section.Media.url}`}
                      alt="Kindi"
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={HIWTwo}
                      alt="Kindi"
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                  <div className="text-white text-6xl md:text-[50px] p-0 animate-fade-in font-semibold font-fredoka uppercase leading-10">
                    02
                  </div>
                  <div className="flex-col flex justify-start items-start gap-6">
                    <div className="flex-col w-full justify-start items-start gap-5 flex">
                      <div className="w-full gap-3">
                        <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                          {section.featuredText || "Guide Your Child"}{" "}
                        </span>
                        <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                          {section.title || "Through the Learning Process11"}
                        </span>
                      </div>
                      {section.BodyDescription ? (
                        <p
                          className="prose w-full text-start text-white clarabodyTwo"
                          dangerouslySetInnerHTML={{
                            __html: section.BodyDescription,
                          }}
                        />
                      ) : (
                        <p>
                          With Kindi, all our activities deliver mixed-age
                          outcomes without the need for multiple sessions. As
                          you and your child play, you&apos;ll receive tips and
                          instructions about extended learning. Just like a
                          recipe, each early years activity in this educational
                          teaching and parenting app includes an ingredients
                          list — featuring everyday household items. Simply
                          follow the instructions and enjoy the fun!
                        </p>
                      )}
                    </div>
                    <Link
                      href="/p/how-it-works#video"
                      rel="noopener noreferrer"
                      className="w-full h-12 "
                    >
                      <div
                        className="absolute text-center py-2 animate-fade-in hover:bg-red bg-white hover:text-white text-red shadow border-2 border-white clarabutton"
                      >
                        SHOW ME
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <Image
              alt="Kindi"
              src={CurveTwo}
              className="transform hidden md:hidden lg:flex -rotate-180 w-[56%] -mt-[130px] -mb-[20px]"
            />

            {/* Section Three */}
            {data.HIWSection?.slice(2, 3).map((section, index) => (
              <div
                key={index}
                className="flex flex-col-reverse lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4"
              >
                <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                  <div className="text-white text-6xl md:text-[50px] p-0 animate-fade-in font-semibold font-fredoka uppercase leading-10">
                    03
                  </div>
                  <div className="flex-col flex justify-start items-start gap-6">
                    <div className="flex-col w-full justify-start items-start gap-5 flex">
                      <div className="w-full gap-3">
                        <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                          {section.featuredText || "Enjoy"}{" "}
                        </span>
                        <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                          {section.title || "Precious Time"}
                        </span>
                      </div>
                      {section.BodyDescription ? (
                        <p
                          className="prose w-full text-start text-white clarabodyTwo"
                          dangerouslySetInnerHTML={{
                            __html: section.BodyDescription,
                          }}
                        />
                      ) : (
                        <p>
                          Our guided learning activities are both fun and
                          educational. So whether you&apos;re working one-on-one
                          with your child or taking an entire nursery group
                          through Kindi&apos;s learning activities, playtime fun
                          is always part of the process. Our early years
                          development guide strikes the perfect balance between
                          play and education, so fun is never too far away!
                        </p>
                      )}
                    </div>
                    <Link
                      href="/p/how-it-works#video"
                      rel="noopener noreferrer"
                      className="w-full h-12 "
                    >
                      <span
                        className="absolute text-center py-2 animate-fade-in hover:bg-red bg-white hover:text-white text-red shadow border-2 border-white clarabutton"
                      >
                        SHOW ME
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="w-full h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
                  {section.Media && section.Media.url ? (
                    <img
                      src={`https://lionfish-app-98urn.ondigitalocean.app${section.Media.url}`}
                      alt="Kindi"
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={HIWThree}
                      alt="Kindi"
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  )}
                  {/* <Image
                      alt="Kindi"
                      width={100}
                      height={100}
                      src={homeData[0]?.hiwOne?.url}
                      className="w-full h-full object-contain"
                    /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
