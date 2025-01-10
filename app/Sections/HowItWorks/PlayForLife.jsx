import { fetchHowItWorks } from "@/app/data/p/HowItWorks";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
              {hero?.Media?.url ? (
                hero?.Media?.url.endsWith(".mp4") ? (
                  <video autoPlay loop muted>
                    <source src={heroMediaUrl} type="video/mp4" />
                    Your browser does not support the video.
                  </video>
                ) : (
                  <Image
                    src={hero?.Media?.url}
                    alt="Hero media"
                    width={800}
                    height={600}
                  />
                )
              ) : (
                <div className="w-full lg:w-[400px] rounded-xl  border-[12px] border-[#ffffff] xl:w-[500px] h-auto animate-fadeIn animate-delay-500">
                  <video autoPlay loop muted>
                    <source src="/preloader.mp4" type="video/mp4" />
                    Your browser does not support the video.
                  </video>
                </div>
              )}
            </div>
          </div>
          <div className="flex-col button flex justify-center items-start">
            <div className="flex w-full flex-col justify-start items-start script">
              <div className="text-white clarascript animate-fadeIn duration-300">
                {hero?.featuredText ||
                  "Life-Defining Early Learning Through Play"}{" "}
              </div>
              <div className="w-full heading flex flex-col justify-start gap-[20px] items-start">
                <div>
                  <span className="text-[#3F3A64] capitalize claraheading">
                    {hero?.Title.split(" ").slice(0, 2).join(" ") ||
                      " Play for"}{" "}
                  </span>
                  <span className="text-white capitalize claraheading">
                    {hero?.Title.split(" ").slice(2, 3).join(" ") || "Life"}
                  </span>
                </div>
                <div className="w-auto h-auto text-white  clarabodyTwo">
                  {hero?.Body ? (
                    <div dangerouslySetInnerHTML={{ __html: hero?.Body }} />
                  ) : (
                    <p>
                      We created Kindi to empower both parents and professionals
                      with essential developmental tools to unlock young
                      childrens full potential. Our ultimate goal is to enhance
                      the life prospects, prosperity, and well-being of future
                      generations through the transformative power of play.
                      Early years learning is a continuous journey, and Kindi is
                      your reliable companion, ensuring a smooth, fulfilling,
                      and fruitful path for a lifetime of achievement and joy.
                      Weve developed a comprehensive suite of tools to simplify
                      and streamline this journey, tailored to the demands of
                      our increasingly busy and fast-paced world. With our early
                      years learning app packed with resources, you have
                      everything you need to customize a unique learning path
                      for your child amidst your other commitments.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Link href="/profile" target="_blank" className="w-full flex">
              <Button className="bg-[#ffffff] text-[#019acf] hover:bg-red hover:text-white hover:border-2 hover:border-[#ffffff8a] px-4 md:px-8 xl:px-12 border-2 clarabutton rounded-[10px]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
