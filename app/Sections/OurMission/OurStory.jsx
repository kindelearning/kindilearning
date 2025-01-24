import { fetchOurMission } from "@/app/data/p/OurMission";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function OurStory() {
  const data = await fetchOurMission();

  if (!data) {
    return <div>No content available.</div>;
  }

  return (
    <>
      <section className="w-full h-auto bg-[#EEBA00] items-center justify-center py-4 flex flex-col gap-[20px] md:flex-row">
        <div className="claracontainer px-4 md:px-0 lg:px-4 py-8 md:py-8 xl:py-12 w-full flex flex-col md:flex-col lg:flex-row xl:flex-row overflow-hidden gap-8">
          <div className="w-full lg:max-w-[600px] flex justify-center items-start h-auto">
            <div className="w-full lg:w-[400px] rounded-xl  border-[12px] border-[#ffffff] xl:w-[500px] h-auto animate-fadeIn animate-delay-500">
              {data?.OurStory?.Media ? (
                <video className="w-full h-full " autoPlay loop muted>
                  <source
                    // src={data?.OurStory?.Media[0]?.url}
                    src={`https://lionfish-app-98urn.ondigitalocean.app${data?.OurStory?.Media[0]?.url}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video.
                </video>
              ) : (
                <video className="w-full h-full " autoPlay loop muted>
                  <source src="/preloader.mp4" type="video/mp4" />
                  Your browser does not support the video.
                </video>
              )}
            </div>
          </div>
          <div className="flex-col flex justify-center body items-start">
            <div className="flex w-full flex-col script justify-start items-start ">
              <div className="text-white clarascript animate-fadeIn animate-delay-150">
                {(data.OurStory.featuredText && (
                  <p>{data.OurStory.featuredText}</p>
                )) ||
                  "Life-Defining Early Learning Through Play"}{" "}
              </div>
              <div className="w-full flex heading flex-col justify-start items-start">
                <div>
                  <span className="text-[#3F3A64] capitalize animate-fadeIn animate-delay-150 claraheading">
                    {data.OurStory.Title.split(" ").slice(0, 1).join(" ") ||
                      "Our"}
                  </span>{" "}
                  <span className="text-white capitalize animate-fadeIn animate-delay-150 claraheading">
                    {data.OurStory.Title.split(" ").slice(1, 2).join(" ") ||
                      "Story"}
                  </span>
                </div>
                {/* <div className="w-auto h-auto text-white clarabodyTwo animate-fadeIn animate-delay-150 ">
                  {data.OurStory.Body}
                  </div> */}
                {data.OurStory.Body ? (
                  <div
                    className="w-auto prose h-auto text-white clarabodyTwo animate-fadeIn animate-delay-150 "
                    dangerouslySetInnerHTML={{ __html: data.OurStory.Body }}
                  />
                ) : (
                  <p>
                    We werent always child development experts. We remember the
                    struggle of wanting the best for our kids during these
                    precious years but feeling lost, like we were failing at
                    parenting. Now, with over 20 years of combined experience
                    working directly with Early Years children and top ratings
                    from OFSTED, were committed to ensuring no parent ever
                    feels overwhelmed and every child thrives through our guided
                    activities for brain stimulation and development.
                  </p>
                )}
              </div>
            </div>
            <Link href="/profile" target="_blank" className="w-full flex">
              <Button className="bg-[#ffffff] text-[#EEBA00] hover:bg-red hover:text-white animate-fadeIn animate-delay-150 hover:border-2  px-4 md:px-8 xl:px-12 border-2 clarabutton rounded-[10px]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
