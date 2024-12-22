import { fetchOurMission } from "@/app/data/p/OurMission";

export default async function HeroOueMission() {
  const data = await fetchOurMission();

  if (!data) {
    return <div>No content available.</div>;
  }

  return (
    <>
      <section className="max-w-[1500px] min-h-screen h-full  md:h-full lg:h-full flex justify-start bg-[#ffffff] w-full items-start">
        <div className="w-full py-0 md:py-2 flex-col flex justify-start items-start script animate-fadeIn animate-delay-500">
          <div className="w-full text-[#1d1d1d] clarascript animate-slideInLeft script animate-delay-1000">
            {data.Hero.featuredText && <p>{data.Hero.featuredText}</p>}
          </div>
          <div className="flex flex-col w-full justify-start items-start heading animate-fadeIn animate-delay-1500">
            <div className="text-start flex-wrap w-full animate-slideInLeft animate-delay-2000">
              <span className="text-[#1d1d1d] claraheading">
                {data.Hero.Title.split(" ").slice(0, 2).join(" ")}{" "}
              </span>
              <span className="text-[#1d1d1d] claraheading">
                {data.Hero.Title.split(" ").slice(2, 3).join(" ")}
              </span>
            </div>
            <div className="w-full text-start justify-start items-start px-0 animate-fadeIn animate-delay-2500">
              <div className="w-full text-start text-[#696969] text-[16px] leading-[20px] md:text-[18px] md:leading-[22px] lg:text-[22px] lg:leading-[24px] xl:text-[22px] xl:leading-[24px] font-medium font-fredoka animate-slideInLeft animate-delay-3000">
                {data.Hero.Body}
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
