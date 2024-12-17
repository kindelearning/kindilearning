import { fetchInvestmentOpportunity } from "@/app/data/p/Standard";
// import RichTextRender from "@/app/Sections/Global/RichTextRender";

export default async function InvestmentOpportunity() {
  const content = await fetchInvestmentOpportunity();

  if (!content) {
    return <p>No data available</p>;
  }

  // Destructure fields from the fetched content
  const { Title, Body, Pagecontent, Lastupdated } = content;
  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
            <div className="w-full text-center">
              <span className="text-red claraheading uppercase">
                {Title.length > 2
                  ? Title.split(" ").slice(0, 1).join(" ")
                  : Title}
              </span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {" "}
                {Title.length > 2
                  ? Title.split(" ").slice(1, 2).join(" ")
                  : Title}
              </span>
            </div>
            {Body ? (
              <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                  {Body}
                </span>
              </div>
            ) : (
              <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                <span className="text-[#3f3a64] claraheading capitalize">
                  No Body Content Available
                </span>
              </div>
            )}
          </div>
          {Lastupdated ? (
            <div className="text-purple clarabodyTwo animate-fade-in">
              Last updated: {new Date(Lastupdated).toLocaleDateString()}
            </div>
          ) : null}
          <div className="h-[1.5px] bg-[black] rounded-full my-4" />

          {Pagecontent ? (
            <span
              className="w-full text-[20px] text-gray-700 font-medium font-fredoka leading-[24px]"
              dangerouslySetInnerHTML={{
                __html: Pagecontent, // Render markdown or rich text content
              }}
            />
          ) : (
            <div className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              No Additional Content Available
            </div>
          )}
        </div>
      </section>
    </>
  );
}
