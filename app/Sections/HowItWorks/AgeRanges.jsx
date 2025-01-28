"use client";

import { fetchHowItWorks } from "@/app/data/p/HowItWorks";
import AgeRangeWidget from "./AgeRangeWidget";
import { useEffect, useState } from "react";

export default function AgeRanges() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate[AgeGroup][populate]=Content.Icon"
        );
        const data = await response.json();
        console.log("Age Group Data", data);
        if (data?.data) {
          setContent(data.data);
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

  if (loading) return <div className="text-gray-500">Loading content...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!content) return <div>No content available.</div>;

  const { AgeGroup } = content;
  const { featuredText, Title, Body, Content } = AgeGroup;

  // const data = await fetchHowItWorks();

  // if (!data) {
  //   return <div>Error loading page content</div>;
  // }
 
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-0 xl:p-12 justify-start items-center lg:justify-center w-full flex flex-col overflow-hidden gap-8">
          {/* Top Heading Section */}
          <div className="claracontainer px-4 w-full py-6 flex-col justify-start items-center gap-1 inline-flex">
            <div className="text-start w-full md:text-center">
              <div>
                <span className="text-[#3f3a64] claraheading">
                  {Title.split(" ").slice(0, 3).join(" ") || "Kindi"}
                </span> {" "}
                <span className="text-red claraheading">
                  {/* {featuredText || " Age Ranges"} */}
                  {Title.split(" ").slice(2, 12).join(" ") || "Age Ranges"}

                </span>
              </div>
            </div>
            <div className="flex w-full justify-start items-start flex-col">
              <div className="w-full px-0 md:px-12 prose lg:px-32 text-start md:text-center text-[#3f3a64] clarbodyTwo">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      Body ||
                      "We created Kindi to empower both par with resources, you have everything you need to customize a unique learning path for your child amidst your other commitments.",
                  }}
                />
              </div>
            </div>
          </div>
          {/* Row Two */}
          <AgeRangeWidget />
        </div>
      </section>
    </>
  );
}
