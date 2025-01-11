"use client";

import { useEffect, useState } from "react";

export default function MonthlyPricing() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/ourpricing?populate[MonthlyPlans][populate][0]=Features&populate[MonthlyPlans][populate][1]=Thumbnail&populate[AnnualPlans][populate][0]=Features&populate[AnnualPlans][populate][1]=Thumbnail"
        );
        const data = await response.json();
        console.log("Fetched data: ", data); // Log to inspect the structure
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

  const { MonthlyPlans } = content || {};

  return (
    <div className="container mx-auto flex flex-col justify-between font-fredoka px-8 py-12">
      <div className="plans-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MonthlyPlans?.map((plan) => (
          <div
            key={plan.id}
            className="plan-card p-2 border rounded-lg shadow-lg hover:bg-white hover:duration-300 ease-in-out transition-shadow"
          >
            {/* Thumbnail Image */}
            {plan.Thumbnail?.url && (
              <div className="thumbnail flex justify-center">
                <img
                  src={plan.Thumbnail?.url}
                  // src={`https://upbeat-life-04fe8098b1.strapiapp.com${plan.Thumbnail?.url}`}
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
            <div className="features mb-6">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export  function MonthlyPricingUpdate() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/ourpricing?populate[MonthlyPlans][populate][0]=Features&populate[MonthlyPlans][populate][1]=Thumbnail"
        );
        const data = await response.json();
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/ourpricing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: content, // Send the updated content
        }),
      });

      const updatedData = await response.json();
      if (updatedData) {
        alert("Content updated successfully!");
      }
    } catch (error) {
      alert("Failed to update content");
    }
  };

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-8 py-12">
      <h2 className="text-3xl font-bold mb-4">Update Pricing Content</h2>
      
      {/* Section Title */}
      <div className="mb-4">
        <label htmlFor="SectionTitle" className="block font-medium">
          Section Title
        </label>
        <input
          type="text"
          id="SectionTitle"
          value={content?.SectionTitle || ""}
          onChange={(e) => setContent({ ...content, SectionTitle: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Featured Text */}
      <div className="mb-4">
        <label htmlFor="featuredText" className="block font-medium">
          Featured Text
        </label>
        <textarea
          id="featuredText"
          value={content?.featuredText || ""}
          onChange={(e) => setContent({ ...content, featuredText: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Monthly Plans */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Monthly Plans</h3>
        {content?.MonthlyPlans?.map((plan, index) => (
          <div key={plan.id} className="border p-4 mb-4 rounded">
            <div className="mb-2">
              <label className="font-medium">Price Title</label>
              <input
                type="text"
                value={plan.PriceTitle}
                onChange={(e) => {
                  const updatedPlans = [...content.MonthlyPlans];
                  updatedPlans[index].PriceTitle = e.target.value;
                  setContent({ ...content, MonthlyPlans: updatedPlans });
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="font-medium">Price Body</label>
              <textarea
                value={plan.PriceBody}
                onChange={(e) => {
                  const updatedPlans = [...content.MonthlyPlans];
                  updatedPlans[index].PriceBody = e.target.value;
                  setContent({ ...content, MonthlyPlans: updatedPlans });
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-2">
              <label className="font-medium">Price</label>
              <input
                type="number"
                value={plan.Price}
                onChange={(e) => {
                  const updatedPlans = [...content.MonthlyPlans];
                  updatedPlans[index].Price = e.target.value;
                  setContent({ ...content, MonthlyPlans: updatedPlans });
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {/* Optionally, handle the Thumbnail and Features as well */}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Update Content
      </button>
    </div>
  );
}
