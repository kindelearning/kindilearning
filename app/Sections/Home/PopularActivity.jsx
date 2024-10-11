import NotFound from "@/app/not-found";
import Activity from "@/app/Widgets/Card/Activity";
import { getHomeData } from "@/lib/hygraph";
import { Confidence } from "@/public/Icons";
import { KindiHeart } from "@/public/Images";
import React from "react";

const PopularActivity = async () => {
  const homeData = await getHomeData();
  console.log("Home Page Data (in component):", homeData);
  if (!homeData || !homeData[0]?.popularLearningActivities) {
    return <NotFound />;
  }
  return (
    <section className="w-full h-auto bg-[#eaeaf5] py-12 items-center justify-center flex flex-col gap-[20px]">
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
      <div className="flex overflow-x-auto  scrollbar-hidden px-4 lg:px-0 w-full claracontainer gap-4 scrollbar-hidden">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <Activity
            key={index}
            title="Custom Title"
            time="10 minutes"
            tags={["Tag 1", "Tag 2", "Tag 3"]}
            icons={[KindiHeart, Confidence]}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularActivity;
