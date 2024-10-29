"use client";

import NotFound from "@/app/not-found";
import { Button } from "@/components/ui/button";
import { getStandardPagesContent, getStoryData } from "@/lib/hygraph";
import { useSession } from "next-auth/react";

const OurStory = async () => {
  const { data: session, status } = useSession();

  const standardPages = await getStandardPagesContent();
  // console.log("Standard Pages Content: ", standardPages);

  if (
    !standardPages ||
    !standardPages.featuredVideo ||
    standardPages.featuredVideo.length === 0
  ) {
    return <NotFound />;
  }

  const stories = await getStoryData();
  console.log("Story Page Data (in component):", stories);
  if (!stories || !stories[0]?.ourStory) {
    console.error("Error: Stories data is missing or incomplete.");
    return <NotFound />;
  }
  const videoUrl = standardPages.featuredVideo[0].url;

  return (
    <>
      <section className="w-full h-auto bg-[#EEBA00] items-center justify-center py-4 flex flex-col gap-[20px] md:flex-row">
        <div className="claracontainer px-4 md:px-0 lg:px-4 py-8 md:py-8 xl:py-12 w-full flex flex-col md:flex-col lg:flex-row xl:flex-row overflow-hidden gap-8">
          <div className="w-full flex justify-center items-start h-auto">
            <div className="w-full lg:w-[400px] xl:w-[500px] h-auto animate-fadeIn animate-delay-500">
              {/* <Image alt="Kindi" src={HowItWorkVideo} className="w-full" /> */}
              <video
                controls
                autoPlay
                loop
                muted
                className="object-cover max-h-[260px] lg:max-h-[360px] rounded-[24px] w-full md:w-full lg:w-[540px] h-full"
              >
                <source src={videoUrl} type="video/mp4" /> Your browser does not
                support the video tag.
              </video>
            </div>
          </div>
          <div className="flex-col flex justify-center body items-start">
            <div className="flex w-full flex-col script justify-start items-start ">
              <div className="text-white clarascript animate-fadeIn animate-delay-150">
                Life-Defining Early Learning Through Play{" "}
              </div>
              <div className="w-full flex heading flex-col justify-start items-start">
                <div>
                  <span className="text-[#3F3A64] capitalize animate-fadeIn animate-delay-150 claraheading">
                    Our{" "}
                  </span>
                  <span className="text-white capitalize animate-fadeIn animate-delay-150 claraheading">
                    Story
                  </span>
                </div>
                {/* <div className="w-auto h-auto text-white animate-fadeIn animate-delay-150 font-montserrat"> */}
                <div className="w-auto h-auto text-white clarabodyTwo animate-fadeIn animate-delay-150 ">
                  {/* We weren&apos;t always child development experts. We remember
                  the struggle of wanting the best for our kids during these
                  precious years but feeling lost, like we were failing at
                  parenting. Now, with over 20 years of combined experience
                  working directly with Early Years children and top ratings
                  from OFSTED, we&apos;re committed to ensuring no parent ever
                  feels overwhelmed and every child thrives through our guided
                  activities for brain stimulation and development. */}
                  <p>{stories[0].ourStory}</p>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <Button className="bg-[#ffffff] text-[#EEBA00] animate-fadeIn animate-delay-150 hover:bg-[#ffffff] hover:border-2  px-4 md:px-8 xl:px-12 border-2 clarabutton rounded-[10px]">
                {/* Get Started */}
                {session ? "Upgrade" : "Get Started"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurStory;
