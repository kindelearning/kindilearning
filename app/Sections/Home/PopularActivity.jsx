import NotFound from "@/app/not-found";
import Activity from "@/app/Widgets/Card/Activity";
import { getAllActivities, getHomeData } from "@/lib/hygraph";
import { Confidence } from "@/public/Icons";
import {
  DiscoveringOurWorldActivity,
  ExperimentsMathActivity,
  KindiHeart,
  ReadingWritingActivity,
  SpeechLanguageActivity,
} from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PopularActivity = async () => {
  const homeData = await getHomeData();
  const activities = await getAllActivities();
  if (!activities || activities.length === 0) {
    return <div>No activities found!</div>;
  }

  // console.log("Home Page Data (in component):", homeData);
  if (!homeData || !homeData[0]?.popularLearningActivities) {
    return <NotFound />;
  }
  return (
    <section className="w-full h-auto bg-[#eaeaf5] pt-12 pb-20 items-center justify-center flex flex-col gap-[20px]">
      {/* Top Heading Section */}
      <div className="claracontainer w-full script p-4 flex-col justify-start items-start md:items-center inline-flex">
        <h2 className="clarascript text-start md:text-center text-red">
          Follow with your Child, Guided step-by-step
        </h2>
        <div className="flex w-full heading justify-start items-start md:items-center md:justify-center flex-col">
          <div className="flex flex-wrap gap-1  text-start md:text-center justify-start items-start md:items-center md:justify-center  w-full">
            <span className="claraheading text-start md:text-center text-purple">
              Popular Learning
            </span>
            &nbsp;
            <span className="claraheading text-red">Activities</span>
          </div>
          <p className="clarabodyTwo text-start md:text-center text-purple">
            {homeData[0].popularLearningActivities}
          </p>
        </div>
      </div>
      {/* The Activity Carousel */}
      <div className="flex overflow-x-auto py-2 scrollbar-hidden px-4 lg:px-0 w-full claracontainer gap-4 scrollbar-hidden">
        {activities.map((activity) => (
          <div key={activity.id}>
            <article className="rounded-lg ">
              <Link target="_blank" href={`/p/activities/${activity.id}`}>
                <div className="md:w-full hover:shadow-md duration-200 min-w-[200px] w-[200px] min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
                  <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
                    <div className="w-full max-w-[240px]  lg:max-w-full h-auto  ">
                      <div className="flex max-h-[180px] min-h-[150px] h-[150px] lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px]  overflow-clip rounded-t-3xl ">
                        <Image
                          width={280}
                          height={250}
                          alt={activity.title}
                          className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl "
                          src={activity.thumbnail.url}
                        />
                      </div>
                      <div className="w-full p-2 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                        <div className="flex-col w-full gap-[6px] justify-start items-start">
                          <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                            {activity.title}
                          </div>
                          <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
                            <div className="text-[#0a1932] min-w-[max-content] p-0 lg:pl-2 md:text-[18px] md:leading-[22px] font-[500] font-fredoka text-[10px] lg:text-[16px] leading-none">
                              {activity.setUpTime}
                            </div>
                            <ul className="text-[#0a1932] justify-between items-center gap-6 flex px-4 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                              {activity.skills
                                .slice(0, 2)
                                .map((skill, index) => (
                                  <li key={index}>{skill.slice(0, 8)}</li>
                                ))}
                            </ul>
                          </div>
                        </div>
                        <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                          <Image
                            alt="Kindi"
                            className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                            src={SpeechLanguageActivity}
                          />
                          <Image
                            alt="Kindi"
                            className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                            src={DiscoveringOurWorldActivity}
                          />
                          <Image
                            alt="Kindi"
                            className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                            src={ReadingWritingActivity}
                          />
                          <Image
                            alt="Kindi"
                            className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                            src={ExperimentsMathActivity}
                          />
                          <div
                            className={`w-[20px] lg:w-[48px] lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
                          >
                            <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
                              +1
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularActivity;
