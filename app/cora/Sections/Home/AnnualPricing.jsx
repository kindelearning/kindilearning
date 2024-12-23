"use client";

import { useEffect, useState } from "react";

export default function AnnualPriceing() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/ourpricing?populate[MonthlyPlans][populate][0]=Features&populate[MonthlyPlans][populate][1]=Thumbnail&populate[AnnualPlans][populate][0]=Features&populate[AnnualPlans][populate][1]=Thumbnail"
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

  const { AnnualPlans } = content || {};

  return (
    <div className="container mx-auto flex flex-col justify-between font-fredoka px-8 py-12">
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
                  src={`http://localhost:1337${plan.Thumbnail?.url}`}
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
