import { fetchOurMission } from "@/app/data/p/OurMission";
import { Button } from "@/components/ui/button";
import { HeroBGOurStoryTwo } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const data = await fetchOurMission();

  if (!data) {
    return <div>No content available.</div>;
  }

  return (
    <>
      <section className="max-w-[1500px] min-h-screen h-full md:min-h-[600px] md:h-full lg:h-full flex justify-center bg-[#ffffff] w-full items-center">
        <div className="w-full min-h-screen lg:h-[814px] object-bottom bg-none lg:bg-hero-image bg-contain bottom-0 bg-center bg-no-repeat justify-self-end grid md:flex md:flex-col lg:grid-cols-2 pb-16 gap-6 animate-fadeIn">
          <div className="w-full h-full flex flex-col lg:hidden p-0 justify-start items-start animate-slideInUp">
            <Image
              alt="Kindi"
              src={HeroBGOurStoryTwo}
              className="object-cover w-full"
            />
          </div>

          <div className="claracontainer w-full px-4 lg:pr-4 lg:pl-[92px] lg:max-w-[56%] flex flex-col body md:justify-between min-h-fit lg:justify-between xl:justify-between justify-center items-start  lg:py-24 animate-slideInUp">
            <div className="w-full py-0 md:py-2 flex-col flex justify-start items-start script animate-fadeIn animate-delay-500">
              <div className="w-full text-red clarascript animate-slideInLeft script animate-delay-1000">
                {data.Hero.featuredText && (
                  <p>
                    {data.Hero.featuredText ||
                      "Maximising Potential for a Lifetime of Achievement"}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full justify-start items-start heading animate-fadeIn animate-delay-1500">
                <div className="text-start flex-wrap w-full animate-slideInLeft animate-delay-2000">
                  <span className="text-[#3f3a64] claraheading">
                    {data.Hero.Title.split(" ").slice(0, 2).join(" ") ||
                      "The Kindi"}{" "}
                  </span>
                  <span className="text-red claraheading">
                    {data.Hero.Title.split(" ").slice(2,14).join(" ") ||
                      "Mission"}
                  </span>
                </div>
                <div className="w-full text-start justify-start items-start px-0 animate-fadeIn animate-delay-2500">
                  {data.Hero.Body ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: data.Hero.Body }}
                      className="w-full prose text-start text-[#696969] text-[16px] leading-[20px] md:text-[18px] md:leading-[22px] lg:text-[22px] lg:leading-[24px] xl:text-[22px] xl:leading-[24px] font-medium font-fredoka animate-slideInLeft animate-delay-3000"
                    />
                  ) : (
                    <p>
                      Happiness is seeing your children grow into wonderful,
                      kind, successful people. At Kindi, our main mission is to
                      ensure everyone gets to achieve this feeling. Our general
                      mission is to help little ones fulfil their full
                      potential. While our goal is serious, our approach is fun.
                      Improving the health and success of future generations
                      starts today—with little minds and big ambitions. “The
                      first five years have so much to do with how the next 80
                      turn out.”
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Link
              href="/profile"
              target="_blank"
              className="w-auto animate-slideInUp animate-delay-4000"
            >
              <Button className="bg-red hover:bg-purple text-white clarabutton px-6 md:px-12 py-3 rounded-[16px] animate-fadeIn animate-delay-4500">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="hidden lg:flex w-[40%]"></div>
        </div>
      </section>
    </>
  );
}
