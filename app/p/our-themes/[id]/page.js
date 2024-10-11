import NotFound from "@/app/not-found";
import { getThemeById } from "@/lib/hygraph";
import Image from "next/image";
import React from "react";

export default async function ThemeDetailPage({ params }) {
  const { id } = params;
  const theme = await getThemeById(id);

  if (!theme) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <>
      <section className="w-full h-fit pb-24 bg-[#EAEAF5] items-center justify-center flex flex-col gap-[30px] md:gap-[60px] lg:gap-[80px]">
        <div className="relative w-full h-full ">
          <Image
            width={400}
            height={300}
            src={theme.thumbnail.url}
            alt={theme.title}
            className="h-[200px] md:h-[300px] lg:h-[400px] w-full"
          />
          {/* {formattedLaunchTime} */}
        </div>
        <div className="claracontainer flex flex-col gap-8 mx-auto px-4">
          <div className="text-center flex flex-col gap-2 lg:gap-4 justify-start items-start">
            <h2 className="text-[#3f3a64]  claraheading text-start">
              {theme.title}
            </h2>
            <p className=" text-[#0a1932] text-justify clarabodyTwo">
              {/* <div dangerouslySetInnerHTML={{ __html: theme.content.html }} /> */}
              {theme.metaDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col w-full gap-[12px]">
              <h3 className="text-2xl md:text-3xl font-medium font-fredoka">
                About the theme
              </h3>
              <span className="text-justify text-[#0a1932] clarabodyTwo">
                <div
                  dangerouslySetInnerHTML={{ __html: theme.aboutContent.html }}
                />
              </span>
            </div>
            <div className="flex flex-col w-full gap-[12px]">
              <h3 className="text-2xl md:text-3xl  font-medium font-fredoka">
                What to Expect
              </h3>
              <span className=" text-justify text-[#0a1932] clarabodyTwo">
                {/* <div dangerouslySetInnerHTML={{ __html: theme.expectContent.html }} /> */}
                {theme.expectContent && theme.expectContent.html ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: theme.expectContent.html,
                    }}
                  />
                ) : (
                  <p>No content available</p> // Fallback content or handling if `expectContent.html` is null
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
