"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, 
} from "@/components/ui/dialog";
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";

export default function Ourpricing() {
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
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const { SectionTitle, featuredText, SectionBody, MonthlyPlans, AnnualPlans } =
    content || {};

  return (
    <div className="container mx-auto flex flex-col justify-center items-center font-fredoka px-8 py-12">
      <div className="flex flex-col items-center ">
        <h1 className="text-4xl font-bold mb-2">
          {SectionTitle || "Default Title"}
        </h1>
        <p className="text-xl font-medium text-gray-700 mb-2">
          {featuredText || "Default Featured Text"}
        </p>
        <div className="prose mb-6">
          {/* {SectionBody || "Default Body Content"} */}
          <p
            className="prose w-full text-start text-[#696969] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
            dangerouslySetInnerHTML={{ __html: SectionBody }}
          />
        </div>
      </div>
      <div className="flex w-fit justify-between items-center gap-4">
        <div className="mt-8 flex gap-1">
          <Link
            href="home/annual"
            target="_blank"
            className="text-red hover:scale-105 duration-200 hover:underline"
          >
            Annual
          </Link>
          <Link
            href="home/editannual"
            target="_blank"
            className="text-purple hover:scale-105 duration-200 hover:underline"
          >
            Edit Annual
          </Link>
        </div>
        <div className="mt-8 flex gap-1">
          <Link
            href="home/monthly"
            target="_blank"
            className="text-red hover:scale-105 duration-200 hover:underline"
          >
            Monthly
          </Link>
          <Link
            href="home/editannual"
            target="_blank"
            className="text-purple hover:scale-105 duration-200 hover:underline"
          >
            Edit Monthly
          </Link>
        </div>
      </div>
    </div>
  );
}

export function UpdatePricingForm() {
  const [pricingData, setPricingData] = useState({
    SectionTitle: "",
    SectionBody: "",
    featuredText: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/ourpricing?populate=*"
        );
        const result = await response.json();

        if (response.ok) {
          setPricingData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch data");
        }
      } catch (err) {
        setError("Failed to load pricing data");
      } finally {
        setLoading(false);
      }
    };

    fetchPricingData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPricingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditorChange = (value) => {
    // Assuming ClaraMarkdownRichEditor returns a value instead of an event
    setPricingData((prevData) => ({
      ...prevData,
      SectionBody: value, // Assuming SectionBody is the markdown content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/ourpricing?ec3qtd8zh0b94uelu1bn9je6`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              SectionTitle: pricingData.SectionTitle,
              SectionBody: pricingData.SectionBody,
              featuredText: pricingData.featuredText,
            },
          }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setPricingData(updatedData.data);
        setDialogOpen(true); // Open the dialog after successful submission
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating pricing data:", error);
      setError("Error updating pricing data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Pricing Data</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="SectionTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Section Title
          </label>
          <input
            type="text"
            id="SectionTitle"
            name="SectionTitle"
            value={pricingData.SectionTitle}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="SectionBody"
            className="block text-sm font-medium text-gray-700"
          >
            Section Body
          </label>
          
          <ClaraMarkdownRichEditor
            name="SectionBody"
            value={pricingData.SectionBody || ""} // Ensure the value is always a string
            onChange={handleEditorChange} // Handle change specific to the editor
          />
        </div>

        <div>
          <label
            htmlFor="featuredText"
            className="block text-sm font-medium text-gray-700"
          >
            Featured Text
          </label>
          <input
            type="text"
            id="featuredText"
            name="featuredText"
            value={pricingData.featuredText}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-red text-white rounded-md"
        >
          {isSubmitting ? "Updating..." : "Update Pricing"}
        </button>
      </form>

      {/* Shadcn Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pricing Data Updated</DialogTitle>
            <DialogDescription>
              Your pricing data has been successfully updated!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
