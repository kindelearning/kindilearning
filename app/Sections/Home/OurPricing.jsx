import { fetchPricingData } from "@/app/data/p/Home";
import PricingTabs from "./PricingTabs";

export default async function OurPricing() {
  const pricingData = await fetchPricingData(); // Fetch pricing data from your server-side API

  if (!pricingData) {
    return <div>Error loading pricing data</div>;
  }

  if (!pricingData || !pricingData.SectionTitle) {
    return <div>No pricing data available.</div>;
  }

  return (
    <>
      <section
        className="w-full h-auto bg-[#EAEAF5] pt-12 pb-[120px] items-center justify-center flex flex-col gap-[20px] transition-all duration-500"
        style={{
          animation: "fadeIn 1s ease-in-out",
          animationFillMode: "forwards",
        }}
      >
        <div
          className="claracontainer w-full py-6 gap-4 md:gap-4 flex-col justify-start items-center inline-flex"
          style={{
            animation: "slideInUp 1s ease-in-out 0.5s",
            animationFillMode: "forwards",
          }}
        >
          <div className="w-full text-red clarascript px-4 md:px-0 text-start md:text-center">
            {pricingData.featuredText || "Default featuredText"}
          </div>
          <div className="flex w-full px-4 md:px-0 container justify-start md:justify-center items-start md:items-center gap-4 flex-col">
            <div
              className="w-full max-w-[683px] text-start md:text-center mx-auto"
              style={{
                animation: "fadeIn 1s ease-in-out 1s",
                animationFillMode: "forwards",
              }}
            >
              <span className="text-[#3f3a64] claraheading text-start md:text-center capitalize ">
                {pricingData.SectionTitle
                  ? pricingData.SectionTitle.split(" ").slice(0, 1).join(" ")
                  : "Our" || "Default SectionTitle"}{" "}
              </span>
              <span className="text-red claraheading text-start md:text-center capitalize">
                {pricingData.SectionTitle
                  ? pricingData.SectionTitle.split(" ").slice(1, 2).join(" ")
                  : "Pricing" || "Default SectionTitle"}{" "}
              </span>
            </div>
            <div
              className="w-full px-0 md:px-24 lg:px-48 mx-auto text-start md:text-center text-[#3f3a64] font-medium font-fredoka capitalize clarabodyTwo"
              style={{
                animation: "fadeIn 1s ease-in-out 1.5s",
                animationFillMode: "forwards",
              }}
            >
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: pricingData.SectionBody || "Default Body Text", // Render Markdown or Rich Text
                  }}
                />
              </p>
            </div>
          </div>
        </div>
        <PricingTabs />
      </section>
    </>
  );
}
