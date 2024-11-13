import NotFound from "@/app/not-found";
import { getThemeById } from "@/lib/hygraph";
import Head from "next/head";
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
      <Head>
        <title>{theme.title}</title>
        <meta name="description" content={theme.metaDesc} />
        <meta property="og:title" content={theme.title} />
        <meta property="og:description" content={theme.metaDesc} />
        <meta property="og:image" content={theme.thumbnail.url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kindlearning" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={theme.title} />
        <meta name="twitter:description" content={theme.metaDesc} />
      </Head>
      <section className="w-full h-auto py-0 lg:py-12 bg-[#EAEAF5] items-center justify-center pb-24 flex flex-col gap-[20px]">
        <div className="flex overflow-clip lg:rounded-xl lg:max-w-[960px] w-full">
          <Image
            width={400}
            height={300}
            src={theme.thumbnail.url}
            alt={theme.title}
            className="w-full hover:scale-105 duration-300 lg:max-w-[960px] lg:rounded-xl h-60 md:h-[400px] lg:h-[400px] object-cover"
          />
        </div>
        <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
        <div className="w-full mx-auto flex flex-col gap-4 justify-center items-center">
        <h2 className="text-[#3f3a64] w-full claraheading text-start">
              {theme.title}
            </h2>
            <p className=" text-[#0a1932] text-justify clarabodyTwo">
              {theme.metaDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 pb-12 gap-8">
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
                {theme.expectContent && theme.expectContent.html ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: theme.expectContent.html,
                    }}
                  />
                ) : (
                  <p>No content available</p>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
