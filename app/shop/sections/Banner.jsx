"use client";
import { fetchDynamicPageContent } from "@/app/data/p/Dynamic";
import { useEffect, useState } from "react";

export default function Banner() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/dynammic-page-content?populate=*"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("ShopBanner Database", data);
        if (data?.data) {
          setContent(data.data.Shop); // Set the fetched data
        } else {
          setError("No data found.");
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

  return (
    <>
      <section className="w-full max-w-full claracontainer h-full px-4 lg:px-0 bg-[#EAEAF5] items-center justify-center py-2 flex flex-col md:flex-row gap-[20px]">
        <div
          style={{
            backgroundImage: "url('/Images/ShopBannerBG.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
          }}
          className="claracontainer min-w-full min-h-[120px] items-center justify-between lg:min-h-[350px] px-4 md:px-2 lg:px-0 flex flex-row overflow-hidden gap-8"
        >
          <div className="flex flex-col items-start lg:max-w-[50%] justify-start py-4 lg:p-12 lg:pt-12 w-full">
            <div className=" text-white text-start text-[12px] leading-[16px] lg:text-4xl font-semibold font-fredoka">
              {content?.featuredText}
            </div>
            <div className="w-full font-fredoka text-[8px] leading-[10px] lg:text-2xl flex justify-start text-start text-white">
              {content?.Title}
            </div>
          </div>
          <div className="min-w-[40%] lg:min-w-[30%]">.</div>
        </div>
      </section>
    </>
  );
}
