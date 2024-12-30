"use client";
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

export default function AnnualPriceing() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/ourpricing?populate[MonthlyPlans][populate][0]=Features&populate[MonthlyPlans][populate][1]=Thumbnail&populate[AnnualPlans][populate][0]=Features&populate[AnnualPlans][populate][1]=Thumbnail"
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
                  src={`https://proper-fun-404805c7d9.strapiapp.com${plan.Thumbnail?.url}`}
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

export async function getPricingData() {
  const response = await fetch('https://proper-fun-404805c7d9.strapiapp.com/api/ourpricing?populate[MonthlyPlans][populate][0]=Features&populate[MonthlyPlans][populate][1]=Thumbnail');
  const data = await response.json();
  return data.data;
}

export  function EditPricing({ pricingData }) {
  const [formData, setFormData] = useState(pricingData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePlanChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedPlans = [...prevState.MonthlyPlans];
      updatedPlans[index][name] = value;
      return {
        ...prevState,
        MonthlyPlans: updatedPlans,
      };
    });
  };

  const handleFeatureChange = (planIndex, featureIndex, e) => {
    const { name, value, type, checked } = e.target;
    const updatedPricingData = { ...formData };
    const updatedFeature = updatedPricingData.MonthlyPlans[planIndex].Features[featureIndex];

    if (type === 'checkbox') {
      updatedFeature[name] = checked;
    } else {
      updatedFeature[name] = value;
    }

    setFormData(updatedPricingData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://proper-fun-404805c7d9.strapiapp.com/api/ourpricing/${formData.documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update pricing');
      }

      alert('Pricing updated successfully');
    } catch (error) {
      alert(error.message || 'Failed to update pricing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Edit Pricing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="SectionTitle">Section Title</label>
          <input
            type="text"
            id="SectionTitle"
            name="SectionTitle"
            value={formData.SectionTitle || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="SectionBody">Section Body</label>
          <textarea
            id="SectionBody"
            name="SectionBody"
            value={formData.SectionBody || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="featuredText">Featured Text</label>
          <input
            type="text"
            id="featuredText"
            name="featuredText"
            value={formData.featuredText || ''}
            onChange={handleChange}
          />
        </div>

        <h2>Monthly Plans</h2>
        {formData.MonthlyPlans.map((plan, index) => (
          <div key={plan.id}>
            <div>
              <label htmlFor={`PriceTitle-${index}`}>Plan Title</label>
              <input
                type="text"
                id={`PriceTitle-${index}`}
                name="PriceTitle"
                value={plan.PriceTitle || ''}
                onChange={(e) => handlePlanChange(index, e)}
              />
            </div>
            <div>
              <label htmlFor={`PriceBody-${index}`}>Plan Description</label>
              <textarea
                id={`PriceBody-${index}`}
                name="PriceBody"
                value={plan.PriceBody || ''}
                onChange={(e) => handlePlanChange(index, e)}
              />
            </div>
            <div>
              <label htmlFor={`Price-${index}`}>Price</label>
              <input
                type="number"
                id={`Price-${index}`}
                name="Price"
                value={plan.Price || ''}
                onChange={(e) => handlePlanChange(index, e)}
              />
            </div>

            <h3>Features</h3>
            {plan.Features.map((feature, featureIndex) => (
              <div key={feature.id}>
                <div>
                  <label htmlFor={`FeatureTitle-${feature.id}`}>Feature Title</label>
                  <input
                    type="text"
                    id={`FeatureTitle-${feature.id}`}
                    name="Title"
                    value={feature.Title || ''}
                    onChange={(e) => handleFeatureChange(index, featureIndex, e)}
                  />
                </div>
                <div>
                  <label htmlFor={`FeatureHelpText-${feature.id}`}>Feature Help Text</label>
                  <textarea
                    id={`FeatureHelpText-${feature.id}`}
                    name="HelpText"
                    value={feature.HelpText || ''}
                    onChange={(e) => handleFeatureChange(index, featureIndex, e)}
                  />
                </div>
                <div>
                  <label htmlFor={`FeatureIsIncluded-${feature.id}`}>Is Included?</label>
                  <input
                    type="checkbox"
                    id={`FeatureIsIncluded-${feature.id}`}
                    name="isIncluded"
                    checked={feature.isIncluded || false}
                    onChange={(e) => handleFeatureChange(index, featureIndex, e)}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
