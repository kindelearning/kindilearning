"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import MediaSelector from "../../website/media/Section/MediaSelector";
import { HelpCircle } from "lucide-react";

export default function AnnualPriceing() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" />
        <span className="ml-4 text-lg">Loading content...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-bold">{error}</div>
      </div>
    );
  }
  const { AnnualPlans } = content || {};

  return (
    <div className="container mx-auto flex flex-col justify-between font-fredoka px-8 py-12">
      <head>
        <title>Update Annual Pricing</title>
      </head>
      {AnnualPlans?.length ? (
        <div className="plans-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AnnualPlans?.map((plan) => (
            <div
              key={plan.id}
              className="plan-card p-2 border rounded-lg shadow-lg hover:bg-white hover:duration-300 ease-in-out transition-shadow"
            >
              {/* Thumbnail Image */}
              {plan.Thumbnail?.url && (
                <div className="thumbnail flex justify-center">
                  <img
                    // src={plan.Thumbnail?.url}
                    src={`https://lionfish-app-98urn.ondigitalocean.app${plan.Thumbnail?.url}`}
                    alt={plan.Thumbnail?.name}
                    className="rounded-lg object-cover w-full h-48  "
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-center mt-4">
                {plan.PriceTitle}
              </h3>
              <p className="text-lg text-start text-gray-700 mb-4 leading-[20px]">
                {plan.PriceBody}
              </p>
              <p className="text-2xl font-bold text-start text-red text-primary mb-6">
                ${plan.Price}
              </p> 

              {/* Features Section */}
              {/* <div className="features mb-6">
                {plan.Features?.map((feature) => (
                  <div key={feature.id} className="feature-item mb-4">
                    <h4 className="text-lg font-medium text-gray-800">
                      {feature.Title}
                    </h4>
                    <p className="text-sm text-gray-600 text-start">
                      {feature.HelpText}
                    </p>
                  </div>
                ))}
              </div> */}
              {plan.Features ? (
                <div className="features mb-6">
                  {plan.Features?.map((feature) => (
                    <div
                      key={feature.id}
                      className="feature-item flex items-center justify-between mb-4"
                    >
                      <h4 className="text-lg font-medium text-gray-800">
                        {feature.Title}
                      </h4>
                      <div className="relative group">
                        {/* Question Mark Icon */}
                        <HelpCircle className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800" />
                        {/* Tooltip */}
                        <div className="absolute left-6 -top-6 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg w-48">
                          {feature.HelpText}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-xl mt-8">
          No annual plans available at the moment.
        </div>
      )}
    </div>
  );
}

export function EditAnnualPricing() {
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  const [expandedPlanIndex, setExpandedPlanIndex] = useState(null); // Track expanded tiers
  const [expandedFeatureIndexes, setExpandedFeatureIndexes] = useState({}); // Track expanded features per plan

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/ourpricing?populate[AnnualPlans][populate][0]=Features&populate[AnnualPlans][populate][1]=Thumbnail"
        );
        const data = await response.json();
        if (response.ok) {
          setMonthlyPlans(data.data.AnnualPlans || []);
        } else {
          console.error("Failed to fetch pricing data");
        }
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      }
    };

    fetchPricingData();
  }, []);

  const handleFeatureChange = (planIndex, featureIndex, field, value) => {
    const updatedPlans = [...monthlyPlans];
    updatedPlans[planIndex].Features[featureIndex][field] = value;
    setMonthlyPlans(updatedPlans);
  };

  const handlePlanChange = (index, field, value) => {
    const updatedPlans = [...monthlyPlans];
    updatedPlans[index][field] = value;
    setMonthlyPlans(updatedPlans);
  };

  const handleAddFeature = (planIndex) => {
    const updatedPlans = [...monthlyPlans];
    updatedPlans[planIndex].Features.push({
      Title: "",
      HelpText: "",
      isIncluded: false,
    });
    setMonthlyPlans(updatedPlans);
  };

  const handleRemoveFeature = (planIndex, featureIndex) => {
    const updatedPlans = [...monthlyPlans];
    updatedPlans[planIndex].Features.splice(featureIndex, 1); // Remove the feature at the given index
    setMonthlyPlans(updatedPlans);
  };

  const handleTogglePlanAccordion = (index) => {
    setExpandedPlanIndex(expandedPlanIndex === index ? null : index);
  };

  const handleToggleFeatureAccordion = (planIndex, featureIndex) => {
    setExpandedFeatureIndexes((prevState) => ({
      ...prevState,
      [`${planIndex}-${featureIndex}`]:
        !prevState[`${planIndex}-${featureIndex}`],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      data: {
        AnnualPlans: monthlyPlans.map((plan) => ({
          PriceTitle: plan.PriceTitle,
          PriceBody: plan.PriceBody,
          Price: plan.Price,
          Thumbnail: plan?.Thumbnail ? { id: plan.Thumbnail.id } : null,
          Features: plan.Features.map((feature) => ({
            Title: feature.Title,
            HelpText: feature.HelpText,
            isIncluded: feature.isIncluded || false,
          })),
        })),
      },
    };

    console.log("Submitting FormData:", formData);

    try {
      const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/ourpricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error Response:", errorDetails);
        alert("Failed to update pricing");
      } else {
        alert("Pricing updated successfully");
      }
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  const handleMediaSelect = (selectedMedia, index) => {
    const updatedSection = [...monthlyPlans];
    updatedSection[index].Thumbnail = selectedMedia;
    setMonthlyPlans(updatedSection);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white font-fredoka rounded-lg"
    >
      {/* <h3 className="text-2xl font-semibold mb-4">Monthly Plans</h3> */}
      {monthlyPlans.map((plan, index) => (
        <div key={index} className="border-b  p-4 border-gray-200 pb-6 mb-6">
          {/* Accordion for each plan (tier) */}
          <div
            className="cursor-pointer text-lg font-semibold text-red mb-4"
            onClick={() => handleTogglePlanAccordion(index)}
          >
            {expandedPlanIndex === index ? (
              <span>- {plan.PriceTitle}</span>
            ) : (
              <span>+ {plan.PriceTitle}</span>
            )}
          </div>

          {expandedPlanIndex === index && (
            <div className="space-y-4">
              {/* Media Selection */}
              <div className="flex flex-col mb-4">
                <label className="font-medium text-gray-600">
                  Plan Thumbnail
                </label>
                {plan.Thumbnail ? (
                  <div className="mt-4">
                    <img
                      src={`https://lionfish-app-98urn.ondigitalocean.app${plan.Thumbnail.url}`}
                      alt={plan.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <p className="text-sm text-gray-500">{plan.name}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Not selected</p>
                )}
                <MediaSelector
                  onMediaSelect={(selectedMedia) =>
                    handleMediaSelect(selectedMedia, index)
                  }
                  className="mt-2"
                />
              </div>

              {/* Title, Body, Price */}
              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-600">
                    Price Title
                  </label>
                  <input
                    type="text"
                    value={plan.PriceTitle}
                    onChange={(e) =>
                      handlePlanChange(index, "PriceTitle", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-600">
                    Price Body
                  </label>
                  <textarea
                    value={plan.PriceBody}
                    onChange={(e) =>
                      handlePlanChange(index, "PriceBody", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-600">
                    Price
                  </label>
                  <input
                    type="number"
                    value={plan.Price}
                    onChange={(e) =>
                      handlePlanChange(index, "Price", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Accordion for Features */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-gray-600">Features</label>
                  <button
                    type="button"
                    onClick={() => handleAddFeature(index)}
                    className="flex items-center text-red hover:text-blue-800 text-sm"
                  >
                    <span className="mr-2">+ Add Feature</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M8 3a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2H9v3a1 1 0 0 1-2 0V9H4a1 1 0 0 1 0-2h3V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                </div>

                {plan.Features && plan.Features.length > 0 ? (
                  plan.Features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="border-b pb-4 mb-4">
                      <div
                        className="cursor-pointer text-sm text-gray-600"
                        onClick={() =>
                          handleToggleFeatureAccordion(index, featureIndex)
                        }
                      >
                        {expandedFeatureIndexes[`${index}-${featureIndex}`] ? (
                          <span>- {feature.Title}</span>
                        ) : (
                          <span>+ {feature.Title}</span>
                        )}
                      </div>

                      {expandedFeatureIndexes[`${index}-${featureIndex}`] && (
                        <div className="space-y-2 mt-2">
                          <div>
                            <label className="text-sm text-gray-500">
                              Feature Title
                            </label>
                            <input
                              type="text"
                              value={feature.Title || ""}
                              onChange={(e) =>
                                handleFeatureChange(
                                  index,
                                  featureIndex,
                                  "Title",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="mt-2">
                            <label className="text-sm text-gray-500">
                              Feature Description
                            </label>
                            <textarea
                              value={feature.HelpText || ""}
                              onChange={(e) =>
                                handleFeatureChange(
                                  index,
                                  featureIndex,
                                  "HelpText",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="2"
                            />
                          </div>

                          <div className="mt-2">
                            <label className="text-sm text-gray-500">
                              <input
                                type="checkbox"
                                checked={feature.isIncluded}
                                onChange={() =>
                                  handleFeatureChange(
                                    index,
                                    featureIndex,
                                    "isIncluded",
                                    !feature.isIncluded
                                  )
                                }
                                className="mr-2"
                              />
                              Is Included
                            </label>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveFeature(index, featureIndex)
                            }
                            className="text-red-600 hover:text-red-800 text-xs"
                          >
                            Remove Feature
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs">No features added.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-center py-4 flex flex-row">
        <div className="claracontainer flex flex-row  justify-between w-full items-center gap-4 px-4">
          <Button type="submit">Update Pricing</Button>
        </div>
      </section>
    </form>
  );
}
