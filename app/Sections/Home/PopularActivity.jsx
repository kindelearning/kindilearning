import NotFound from "@/app/not-found";
import PopularActivityCarousel from "@/app/Widgets/Carousel/PopularActivityCarousel";
import { getAllActivities, getHomeData } from "@/lib/hygraph";


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
      <PopularActivityCarousel activities={activities} />
   
    </section>
  );
};

export default PopularActivity;
