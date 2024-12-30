import { fetchEarlyLearningExpert } from "@/app/data/p/Home";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// const PromotionalSectionTwo = async () => {
export default async function PromotionalSectionTwo() {
  const content = await fetchEarlyLearningExpert();

  if (!content) {
    return <p>No data available</p>;
  }

  const { featuredText, title, BodyDescription, Media } = content;
  const mediaUrl = Media?.url ? Media.url : null;

  // Log the media URL to check
  // console.log("Media URL:", mediaUrl);

  return (
    <section className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-4 flex flex-col md:flex-row gap-4 transition-all duration-300 animate-fade-in">
      <div className="claracontainer p-4 py-8 md:px-2 md:py-12 lg:py-20 w-full flex flex-col md:justify-center md:items-center lg:flex-row xl:flex-row overflow-hidden gap-9 animate-slide-up">
        <div className="w-full md:w-[100%] lg:w-[540px] flex justify-start items-start h-auto animate-fade-in">
          <div className="w-full md:w-full flex items-start justify-start flex-col lg:w-[540px] h-auto">
            {mediaUrl ? (
              mediaUrl.endsWith(".mp4") ? (
                <video
                  controls
                  autoPlay
                  loop
                  muted
                  className="object-cover max-h-[260px] md:min-h-[400px] md:h-[400px] lg:h-[360px] lg:max-h-[400px] rounded-[24px] w-full md:w-full lg:w-[540px] h-full"
                >
                  <source src={mediaUrl} type="video/mp4" />
                  Your browser does not support the video.
                </video>
              ) : (
                <Image src={Media.url} alt="Hero" width={540} height={360} />
              )
            ) : (
              <p>No media available</p>
            )}
          </div>
        </div>
        <div className="w-full flex-col justify-center items-start gap-6 flex md:gap-8 xl:gap-10 animate-fade-in">
          <div className="w-full h-auto gap-6 flex flex-col justify-start items-start">
            <div className="text-red clarascript animate-fade-in">
              {featuredText}
            </div>
            <div className="flex w-full justify-start items-start gap-4 flex-col">
              <div className="w-full claraheading animate-fade-in">
                <span className="text-red claraheading ">
                  {title.length > 2
                    ? title.split(" ").slice(0, 2).join(" ")
                    : title}
                </span>{" "}
                <span className="text-purple claraheading">
                  {title.length > 2
                    ? title.split(" ").slice(2, 3).join(" ")
                    : title}
                </span>
              </div>
              {BodyDescription && BodyDescription.length > 0 && (
                <div>
                  <p
                    className="prose w-full text-start text-[#696969] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
                    dangerouslySetInnerHTML={{ __html: BodyDescription }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-auto animate-fade-in">
            <Button className="bg-red hover:bg-purple px-4 md:px-8 xl:px-12 border-2 clarabutton rounded-[16px]">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
