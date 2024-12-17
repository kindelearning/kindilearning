"use client";

import { pricingDetailsFamily } from "@/app/constant/standard";
import { getHomeData } from "@/lib/hygraph";
import React, { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { fetchPricingData } from "@/app/data/p/Home";

const PricingTabs = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("monthly");
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  useEffect(() => {
    const loadPricingData = async () => {
      const fetchedData = await fetchPricingData(); // Fetch pricing data
      if (fetchedData) {
        setPricingData(fetchedData); // Set the pricing data if available
      } else {
        setError("Failed to fetch pricing data");
      }
      setLoading(false); // Stop loading after data is fetched
    };

    loadPricingData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Check if pricingData exists and is populated
  if (!pricingData || !pricingData.SectionTitle) {
    return <div>No pricing data available.</div>;
  }


  return (
    <>
      <div
        className="w-full h-auto bg-[#EAEAF5] pt-12 pb-[120px] items-center justify-center flex flex-col gap-[20px] transition-all duration-500"
        style={{
          animation: "fadeIn 1s ease-in-out",
          animationFillMode: "forwards",
        }}
      >
        <div
          className="flex bg-[white] rounded-[20px] px-2 w-[max-content] py-2 justify-center items-center gap-2"
          style={{
            animation: "slideInUp 1s ease-in-out 2s",
            animationFillMode: "forwards",
          }}
        >
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab("monthly")}
              className={`text-[#3F3D91] rounded-[10px]  font-medium flex px-6 justify-center items-center p-2 ${
                activeTab === "monthly"
                  ? "bg-[#3F3D91] text-[#ffffff]"
                  : "bg-[white]  text-[#3F3D91]"
              } transition-all duration-500`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab("yearly")}
              className={`text-[#3F3D91] rounded-[10px] font-medium flex flex-col px-6 justify-center items-center py-2  ${
                activeTab === "yearly"
                  ? "bg-[#3F3D91] text-[#ffffff]"
                  : "bg-[white]  text-[#3F3D91]"
              } transition-all duration-500`}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-start lg:justify-center lg:items-start items-start scrollbar-hidden px-0 w-full claracontainer gap-2 md:gap-4 scrollbar-hidden">
          {activeTab === "monthly" && (
            <>
              {pricingData.MonthlyPlans &&
                pricingData.MonthlyPlans.length > 0 && (
                  <>
                    {pricingData.MonthlyPlans.map((plan, index) => (
                      <div
                        style={{
                          transition: "transform 0.5s ease-in-out",
                        }}
                        key={index}
                        className="flex "
                      >
                        <PricingCard
                          title={plan.PriceTitle}
                          paymentLink="https://buy.stripe.com/6oEbKT0yJa5qbPG28h"
                          description={
                            <div
                              dangerouslySetInnerHTML={{
                                __html: plan.PriceBody, // Render Markdown or Rich Text
                              }}
                            />
                          }
                          price={plan.Price}
                          duration="/Yearly"
                          pricingDetails={pricingDetailsFamily}
                          isOpen={isAccordionOpen} // Pass the state here
                          toggleAccordion={toggleAccordion} // Pass toggle function
                          image={plan.Thumbnail?.url}
                        />
                        {/* {plan.Features && plan.Features.length > 0 ? (
                    <ul>
                      {plan.Features.map((feature, index) => (
                        <li key={index}>
                          <strong>{feature.Title}</strong>
                          <p>
                            {feature.isIncluded ? "Included" : "Not Included"}
                          </p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: feature.HelpText, // Render Markdown or Rich Text
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No features available.</p>
                  )} */}
                      </div>
                    ))}
                  </>
                )}
            </>
          )}
          {activeTab === "yearly" && (
            <>
              {pricingData.AnnualPlans &&
                pricingData.AnnualPlans.length > 0 && (
                  <>
                    {pricingData.AnnualPlans.map((plan, index) => (
                      <div
                        key={index}
                        style={{
                          transition: "transform 0.5s ease-in-out",
                        }}
                        className="flex "
                      >
                        <PricingCard
                          title={plan.PriceTitle}
                          paymentLink="https://buy.stripe.com/6oEbKT0yJa5qbPG28h"
                          description={
                            <div
                              dangerouslySetInnerHTML={{
                                __html: plan.PriceBody, // Render Markdown or Rich Text
                              }}
                            />
                          }
                          price={plan.Price}
                          duration="/Yearly"
                          pricingDetails={pricingDetailsFamily}
                          isOpen={isAccordionOpen} // Pass the state here
                          toggleAccordion={toggleAccordion} // Pass toggle function
                          image={plan.Thumbnail?.url}
                        />

                        {/* {plan.Features && plan.Features.length > 0 ? (
                      <ul>
                        {plan.Features.map((feature, index) => (
                          <li key={index}>
                            <strong>{feature.Title}</strong>
                            <p>
                              {feature.isIncluded ? "Included" : "Not Included"}
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: feature.HelpText, // Render Markdown or Rich Text
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No features available.</p>
                    )} */}
                      </div>
                    ))}
                  </>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const OurPricing = async () => {
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadPricingData = async () => {
      const fetchedData = await fetchPricingData(); // Fetch pricing data
      if (fetchedData) {
        setPricingData(fetchedData); // Set the pricing data if available
      } else {
        setError("Failed to fetch pricing data");
      }
      setLoading(false); // Stop loading after data is fetched
    };

    loadPricingData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Check if pricingData exists and is populated
  if (!pricingData || !pricingData.SectionTitle) {
    return <div>No pricing data available.</div>;
  }
  const homeData = await getHomeData();
  if (!homeData || !homeData[0]?.ourPricing) {
    return <div>Loading...</div>;
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
            {pricingData.featuredText}
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
                  : "Our"}{" "}
              </span>
              <span className="text-red claraheading text-start md:text-center capitalize">
                {pricingData.SectionTitle
                  ? pricingData.SectionTitle.split(" ").slice(1, 2).join(" ")
                  : "Pricing"}{" "}
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
                    __html: pricingData.SectionBody, // Render Markdown or Rich Text
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
};

export default OurPricing;
