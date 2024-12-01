"use client";

import NotFound from "@/app/not-found";
import { getStoryData } from "@/lib/hygraph";
import { BookOpen, PWKOne, PWKTwo } from "@/public/Images";
import Image from "next/image";
import Claras3DGallery from "./ClaraGallery";
import RichTextRender from "../Global/RichTextRender";
import { useEffect, useState } from "react";

const InternalChip = ({
  image,
  title = "Delivered by highly experienced early years professionals",
}) => {
  return (
    <div className="claracontainer  liquid-hover cursor-pointer w-full pl-4  bg-white rounded-[26px] flex justify-start gap-[12px] flex-row items-center">
      <Image
        alt="Kindi"
        src={image || BookOpen}
        className="w-[24px] h-[24px]"
      />
      <div className="text-black text-[16px] w-full font-medium py-4 pr-4 rounded-r-[24px] hover:text-[white] duration-150 liquid-hover font-montserrat leading-[16px]">
        {title}{" "}
      </div>
    </div>
  );
};

export default async function ParentWithKindi() {
  const [storyData, setStoryData] = useState(null);

  // Fetch story data
  useEffect(() => {
    const fetchStoryData = async () => {
      const data = await getStoryData();
      setStoryData(data);
    };

    fetchStoryData();
  }, []);

  if (!storyData) {
    return <div>Loading...</div>;
  }

  // const stories = await getStoryData();
  // console.log("Our stories:", stories);
  // // console.log("Story Page Data (in component):", stories);
  // if (!stories || !stories[0]?.parentWithKindi) {
  //   console.error("Error: Stories data is missing or incomplete.");
  //   return <NotFound />;
  // }

  return (
    <>
      <section className="w-full h-auto bg-[#523373] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        {/* <section className="w-full h-auto cursor-pointer bg-gradient-to-r from-[#523373] to-[#663399] hover:from-[#663399] hover:to-[#523373] duration-500 items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]"> */}
        <div className="claracontainer  md:px-0 lg:px-4 px-4 py-12 w-full flex flex-col-reverse lg:flex-row xl:flex-row overflow-hidden gap-8">
          <div className="w-full lg:max-w-[60%] py-6 flex-col justify-start items-start button inline-flex">
            {/* Top Heading Section */}
            <div className="flex-col flex justify-center heading items-start">
              <div className="text-start w-full">
                <span className="text-red claraheading">Be Confident: </span>
                <br className="flex md:hidden lg:flex" />
                <span className="text-white claraheading">
                  Parent With Kindi
                </span>
              </div>
              <div className="flex w-full container justify-start px-0 items-center flex-col">
                {storyData.map((story) => (
                  <div className="w-full px-0 text-start clarabodyTwo text-[white] font-medium font-fredoka">
                    {story.parentWithKindi?.json && (
                      <RichTextRender content={story.parentWithKindi.json} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="py-3 w-full flex-col justify-start items-center gap-1 inline-flex">
              <InternalChip
                image={PWKOne}
                title="Delivered by highly experienced early years professionals"
              />
              <InternalChip
                image={PWKTwo}
                title="Proven learning activities — tried and tested "
              />
              <InternalChip
                image={BookOpen}
                title="Targeted learning for early learners of all stages of development "
              />
            </div>
          </div>

          <Claras3DGallery />
          {/* <Gallery /> */}
        </div>
      </section>
    </>
  );
}
