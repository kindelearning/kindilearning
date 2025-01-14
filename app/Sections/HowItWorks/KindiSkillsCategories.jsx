import { fetchHowItWorks } from "@/app/data/p/HowItWorks";
import SkillToggleCardGrid from "./SkillToggleCardGrid";

export default async function KindiSkillsCategories() {
  const data = await fetchHowItWorks();
  if (!data) {
    return <div>Error loading page content</div>;
  }

  return (
    <section className="w-full h-auto bg-[#3F3A64] items-center justify-center pb-12 pt-4 flex flex-col md:flex-row gap-[20px]">
      <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-4 w-full flex flex-col overflow-hidden gap-4">
        <div className="claracontainer p-4 w-full py-6 flex-col justify-start items-center gap-6 inline-flex">
          <div className="text-start w-full md:text-center">
            <div>
              <span className="text-white claraheading">
                {data.KindiSkillsCategoriesTitle.split(" ")
                  .slice(0, 1)
                  .join(" ") || "Kindi's"}{" "}
              </span>
              <span className="text-red claraheading">
                {data.KindiSkillsCategoriesTitle.split(" ")
                  .slice(1, 6)
                  .join(" ") || "Skills Categories "}{" "}
              </span>
            </div>
          </div>
          <div className="flex w-full justify-start items-start flex-col">
            <div className="w-full px-0 md:px-12 lg:px-32 text-start md:text-center text-[#ffffff] font-fredoka text-[18px] font-medium leading-[22px]">
              {/* <p>
                {data.KindiSkillsCategoriesBody ||
                  "Encouraging children to tackle open-ended problems nurtures their creative thinking and equips them with skills for a successful life. Kindi supports this journey by providing tailored learning exercises designed to nurture these skills through play"}
              </p> */}
              {data.KindiSkillsCategoriesBody ? (
                <p
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: data.KindiSkillsCategoriesBody,
                  }}
                />
              ) : (
                <p>
                  Encouraging children to tackle open-ended problems nurtures
                  their creative thinking and equips them with skills for a
                  successful life. Kindi supports this journey by providing
                  tailored learning exercises designed to nurture these skills
                  through play
                </p>
              )}
            </div>
          </div>
        </div>
        <SkillToggleCardGrid />
      </div>
    </section>
  );
}
