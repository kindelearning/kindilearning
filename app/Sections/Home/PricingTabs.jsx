"use client";
 
import {
  fetchMonthlyPricingDataFeatures,
  fetchPricingData,
  fetchPricingDataFeatures,
} from "@/app/data/p/Home";
import { useEffect, useState } from "react";
import PricingCard from "./PricingCard";

export default function PricingTabs() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("monthly");
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pricingDataFeature, setPricingDataFeature] = useState(null);
  const [monthlypricingDataFeature, setMonthlyPricingDataFeature] =
    useState(null);
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

  // Fetch Annual pricing features on component mount
  useEffect(() => {
    const loadPricingData = async () => {
      const fetchedData = await fetchPricingDataFeatures();
      console.log("Fetched Data:", fetchedData); // Log data here

      if (fetchedData) {
        setPricingDataFeature(fetchedData);
      } else {
        setError("Failed to load pricing data");
      }
      setLoading(false);
    };

    loadPricingData();
  }, []);

  // Fetch Annual pricing features on component mount
  useEffect(() => {
    const loadPricingDataTwo = async () => {
      const fetchedDataTwo = await fetchMonthlyPricingDataFeatures();
    //   console.log("Fetched Data:", fetchedDataTwo); // Log data here

      if (fetchedDataTwo) {
        setMonthlyPricingDataFeature(fetchedDataTwo);
      } else {
        setError("Failed to load pricing data");
      }
      setLoading(false);
    };

    loadPricingDataTwo();
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

  const transformFeaturesToPricingDetailsFamily = (features) => {
    return (
      features?.map((feature, index) => ({
        id: index + 1, // Or any other unique identifier
        title: feature.Title,
        helpText: feature.HelpText,
        isActive: feature.isIncluded, // If isIncluded indicates active status
      })) || []
    );
  };

  return (
    <>
      <div
        className="w-full h-auto bg-[#EAEAF5] px-4 pt-12 pb-[120px] items-center justify-center flex flex-col gap-[20px] transition-all duration-500"
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
                   
                    {monthlypricingDataFeature?.MonthlyPlans?.length > 0 ? (
                      monthlypricingDataFeature.MonthlyPlans.slice(0, 10).map(
                        (plan, index) => (
                          <PricingCard
                            key={index}
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
                            pricingDetails={transformFeaturesToPricingDetailsFamily(
                              plan.Features
                            )}
                            isOpen={isAccordionOpen} // Pass the state here
                            toggleAccordion={toggleAccordion} // Pass toggle function
                            image={`https://proper-fun-404805c7d9.strapiapp.com${plan.Thumbnail?.url}`}
                            // image={plan.Thumbnail?.url}
                          />
                        )
                      )
                    ) : (
                      <p>No Monthly Plans available.</p>
                    )}
                  </>
                )}
            </>
          )}
          {activeTab === "yearly" && (
            <>
              {pricingData.AnnualPlans &&
                pricingData.AnnualPlans.length > 0 && (
                  <>
                    {pricingDataFeature?.AnnualPlans?.length > 0 ? (
                      pricingDataFeature.AnnualPlans.slice(0, 10).map(
                        (plan, index) => (
                          <PricingCard
                            key={index}
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
                            pricingDetails={transformFeaturesToPricingDetailsFamily(
                              plan.Features
                            )}
                            isOpen={isAccordionOpen} // Pass the state here
                            toggleAccordion={toggleAccordion} // Pass toggle function
                            image={`https://proper-fun-404805c7d9.strapiapp.com${plan.Thumbnail?.url}`}
                          />
                        )
                      )
                    ) : (
                      <p>No Annual Plans available.</p>
                    )}
                  </>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
