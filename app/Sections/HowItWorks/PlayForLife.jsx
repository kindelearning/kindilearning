import { fetchHowItWorks } from "@/app/data/p/HowItWorks";
import { Button } from "@/components/ui/button";

export default async function PlayForLife() {
  const data = await fetchHowItWorks();

  if (!data) {
    return <div>Error loading page content</div>;
  }

  const hero = data.Hero;
  const heroMediaUrl = hero?.Media?.url;

  return (
    <>
      <section
        id="video"
        className="w-full h-auto bg-[#0097cb] items-center justify-center py-8 lg:py-16 flex flex-col gap-[20px] md:flex-row"
      >
        <div className="claracontainer px-4 md:px-2 lg:px-4 items-start justify-start-4 w-full flex flex-col md:flex-col lg:flex-row xl:flex-row overflow-hidden gap-8">
          <div className="w-full flex justify-center items-center h-auto">
            <div className="w-full lg:w-[400px] h-full lg:h-[340px] xl:w-[500px] animate-fadeIn animate-delay-500 duration-300">
              {heroMediaUrl ? (
                heroMediaUrl.endsWith(".mp4") ? (
                  <video autoPlay loop muted>
                    <source src={heroMediaUrl} type="video/mp4" />
                    Your browser does not support the video.
                  </video>
                ) : (
                  <Image
                    src={heroMediaUrl}
                    alt="Hero media"
                    width={800}
                    height={600}
                  />
                )
              ) : (
                <p>No media available</p>
              )}
            </div>
          </div>
          <div className="flex-col button flex justify-center items-start">
            <div className="flex w-full flex-col justify-start items-start script">
              <div className="text-white clarascript animate-fadeIn duration-300">
                {hero?.featuredText}{" "}
              </div>
              <div className="w-full heading flex flex-col justify-start gap-[20px] items-start">
                <div>
                  <span className="text-[#3F3A64] capitalize claraheading">
                    {hero?.Title.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <span className="text-white capitalize claraheading">
                    {hero?.Title.split(" ").slice(2, 3).join(" ")}
                  </span>
                </div>
                <div className="w-auto h-auto text-white  clarabodyTwo">
                  <div dangerouslySetInnerHTML={{ __html: hero?.Body }} />
                </div>
              </div>
            </div>
            <div className="w-auto py-2 h-auto">
              <Button className="bg-[#ffffff] text-[#019acf] hover:bg-red hover:text-white hover:border-2 hover:border-[#ffffff8a] px-4 md:px-8 xl:px-12 border-2 clarabutton rounded-[10px]">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
