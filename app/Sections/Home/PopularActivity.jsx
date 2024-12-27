import { fetchPopularLearning } from "@/app/data/p/Home";
import PopularActivityCarousel from "@/app/Widgets/Carousel/PopularActivityCarousel";
import { getAllActivities } from "@/lib/hygraph";

export default async function PopularActivity() {
  // Fetch the content
  const content = await fetchPopularLearning();

  if (!content || !content.Content) {
    return <p>No content available</p>;
  }

  const { featuredText, title, BodyDescription, Media } = content.Content;

  const activities = await getAllActivities();

  if (!activities || activities.length === 0) {
    return <div>No activities found!</div>;
  }

  return (
    <>
      <section className="w-full h-auto bg-[#eaeaf5] pt-12 pb-20 items-center justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full script p-4 flex-col justify-start items-start md:items-center inline-flex">
          {featuredText && (
            <div className="clarascript text-start md:text-center text-red">
              {featuredText || "Follow with your Child, Guided step-by-step"}
            </div>
          )}

          <div className="flex w-full heading justify-start items-start md:items-center md:justify-center flex-col">
            <div className="flex flex-wrap gap-1 text-start md:text-center justify-start items-start md:items-center md:justify-center w-full">
              <span className="claraheading text-start md:text-center text-purple">
                {title
                  ? title.split(" ").slice(0, 2).join(" ")
                  : "Popular Learning"}{" "}
              </span>
              <span className="claraheading text-red">
                {" "}
                {title
                  ? title.split(" ").slice(2, 3).join(" ")
                  : "Activities"}{" "}
              </span>
            </div>

            <p
              className="prose w-full clarabodyTwo text-start md:text-center text-purple text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
              dangerouslySetInnerHTML={{ __html: BodyDescription }}
            />
          </div>
        </div>

        <PopularActivityCarousel activities={activities} />
      </section>
    </>
  );
}
