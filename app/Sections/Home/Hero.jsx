import { Button } from "@/components/ui/button";
import { fetchHeroSection } from "../../data/p/Home";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const result = await fetchHeroSection();

  if (!result) {
    return <p>No Hero Section data found.</p>;
  }

  const { heroData, heroMediaUrl } = result;

  // Helper function to slice the first 3 and last words
  const getFirstThreeWords = (text) => {
    return text ? text.split(" ").slice(0, 3).join(" ") : "No Text";
  };
  const getLastThreeWords = (text) => {
    return text ? text.split(" ").slice(3).join(" ") : "No Text";
  };

  return (
    <>
      <section className="w-full min-h-screen h-full md:min-h-[600px] md:h-full lg:h-full bg-[#5449A1] pt-4 pb-12 md:py-24 lg:py-28 items-start md:items-center justify-center flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex flex-col-reverse justify-between md:items-center lg:flex-row px-0 md:px-2 lg:px-0 xl:px-0 bg-[#5449A1] xl:flex-row gap-4 md:gap-0 lg:gap-4">
          <div className="h-auto w-full lg:max-w-[60%] md:min-w-[50%] md:w-[100%] lg:w-full flex-col px-4 md:px-0 lg:px-4 justify-center items-start gap-6 md:gap-7 lg:gap-8 xl:gap-10 inline-flex">
            <div className="w-full flex flex-col justify-start items-start h-auto gap-6 md:gap-2 lg:gap-4 xl:gap-4">
              <div className="text-white animate-text-reveal clarascript">
                {heroData.featuredText || "No Featured Text available"}
              </div>
              <div className="flex flex-col flex-wrap w-full justify-start items-start gap-3 lg:gap-6 animate-fade-in">
                <div className="w-full lg:w-[max-content]">
                  <span className="text-white claraheading lg:text-[50px] lg:leading-[56px] font-bold font-fredoka capitalize animate-fade-in">
                    {getFirstThreeWords(heroData.HeroTitle) || "Kindi Learning"}
                  </span>
                  <br />
                  <span className="text-light-purple-100 claraheading md:text-[24px] md:leading-[26px] font-normal font-fredoka capitalize animate-fade-in"></span>
                  <span className="text-red claraheading lg:text-[50px] lg:leading-[56px] animate-fade-in">
                    {getLastThreeWords(heroData.HeroTitle) ||
                      "For 0-5 Year kids"}
                  </span>
                </div>
                {heroData.BodyDescription ? (
                  <p
                    className="prose text-start w-full h-auto text-white clarabody animate-fade-in] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
                    dangerouslySetInnerHTML={{
                      __html: heroData.BodyDescription,
                    }}
                  />
                ) : (
                  <p className="prose text-start w-full h-auto text-white clarabody animate-fade-in] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000">
                    New Featured Text for Hero Section shravya shsNew Featured
                    Text for Hero Section shravya shsNew Featured Text for Hero
                    Section shravya shsNew Featured Text for Hero Section
                    shravya shsNew Featured Text for Hero Section shravya shsNew
                    Featured Text for Hero Section shravya shs
                  </p>
                )}
              </div>
            </div>
            <Link
              href="/profile"
              target="_blank"
              className="w-auto animate-fade-in"
            >
              <Button className="bg-red hover:bg-[#eaeaf5] hover:text-red clarabutton">
                Get Started
                {/* {session ? "Upgrade" : "Get Started"} */}
              </Button>
            </Link>
          </div>
          <div className="w-full flex md:min-w-[300px] items-start justify-center h-fit min-h-[400px] md:w-[300px] lg:w-full">
            <div className="w-full h-fit md:h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
              {heroMediaUrl ? (
                heroMediaUrl.endsWith(".mp4") ? (
                  <video autoPlay loop muted>
                    <source src={heroMediaUrl} type="video/mp4" />
                    Your browser does not support the video.
                  </video>
                ) : (
                  <Image src={heroMediaUrl} alt="Hero" />
                )
              ) : (
                <video autoPlay loop muted>
                  <source src="/preloader.mp4" type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
