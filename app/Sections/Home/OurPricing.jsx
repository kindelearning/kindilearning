"use client";

import PricingTabs from "./PricingTabs";
import { useEffect, useState } from "react";

export default function OurPricing() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/ourpricing?populate[MonthlyPlans][populate][0]=Features&populate[MonthlyPlans][populate][1]=Thumbnail&populate[AnnualPlans][populate][0]=Features&populate[AnnualPlans][populate][1]=Thumbnail"
        );
        const data = await response.json();
        // console.log("Fetched data: ", data); // Log to inspect the structure
        if (data?.data) {
          setContent(data.data); // Set the fetched data
        } else {
          setError("No content found.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const { SectionTitle, featuredText, SectionBody, MonthlyPlans, AnnualPlans } =
    content || {};
  return (
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
          {featuredText || "Default featuredText"}
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
              {SectionTitle
                ? SectionTitle.split(" ").slice(0, 1).join(" ")
                : "Our" || "Default SectionTitle"}{" "}
            </span>
            <span className="text-red claraheading text-start md:text-center capitalize">
              {SectionTitle
                ? SectionTitle.split(" ").slice(1, 2).join(" ")
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
                  __html: SectionBody || "Default Body Text", // Render Markdown or Rich Text
                }}
              />
            </p>
          </div>
        </div>
      </div>
      <PricingTabs />
    </section>
  );
}
