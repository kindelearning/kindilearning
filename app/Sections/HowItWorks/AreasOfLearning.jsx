import { fetchHowItWorks } from "@/app/data/p/HowItWorks";
import ToggleCardGrid from "./ToggleCardGrid";

export default async function AreasOfLearning() {
  const data = await fetchHowItWorks();
  if (!data) {
    return <div>Error loading page content</div>;
  }

  return (
    <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center pt-4 pb-12 flex flex-col md:flex-row gap-[20px]">
      <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-4 w-full flex flex-col overflow-hidden gap-8">
        <div className="claracontainer p-4 w-full py-4 flex-col justify-start items-start gap-4 inline-flex">
          <div className="text-start w-full md:text-center">
            <span className="text-[#3f3a64] claraheading">
              {data.AreaoflearningTitle.split(" ").slice(0, 1).join(" ") ||
                "Kindi's"}{" "}
            </span>
            <span className="text-red claraheading">
              {data.AreaoflearningTitle.split(" ").slice(1, 6).join(" ") ||
                "Area of learning"}
            </span>
          </div>
          <div className="flex w-full justify-start items-start flex-col">
            <div className="w-full px-0 md:px-12 lg:px-32 text-start md:text-center text-[#3f3a64] font-fredoka text-[18px] font-medium leading-[22px]">
              {/* <p>{data.ArealearningBody}</p> */}
              <p>
                {data.ArealearningBody ||
                  "Unlocking your child's full potential. Kindi is here to equip you with the tools to make it happen! Discover our early years education activities across eight distinctive categories, all aligned with &lt;strong"}
              </p>
            </div>
          </div>
        </div>

        <ToggleCardGrid />
      </div>
    </section>
  );
}
