import { fetchHowItWorks } from "@/app/data/p/HowItWorks";
import AgeRangeWidget from "./AgeRangeWidget";

export default async function AgeRanges() {
  const data = await fetchHowItWorks();
  if (!data) {
    return <div>Error loading page content</div>;
  } 

  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-0 xl:p-12 justify-start items-center lg:justify-center w-full flex flex-col overflow-hidden gap-8">
          {/* Top Heading Section */}
          <div className="claracontainer px-4 w-full py-6 flex-col justify-start items-center gap-1 inline-flex">
            <div className="text-start w-full md:text-center">
              <div>
                <span className="text-[#3f3a64] claraheading">
                  {data.AgeGroup?.Title}
                </span>
                <span className="text-red claraheading">
                  {" "}
                  {data.AgeGroup?.featuredText}
                </span>
              </div>
            </div>
            <div className="flex w-full justify-start items-start flex-col">
              <div className="w-full px-0 md:px-12 prose lg:px-32 text-start md:text-center text-[#3f3a64] clarbodyTwo">
                <div
                  dangerouslySetInnerHTML={{ __html: data.AgeGroup?.Body }}
                />
              </div>
            </div>
          </div>
          {/* Row Two */}
          <AgeRangeWidget />
        </div>
      </section>
    </>
  );
}
