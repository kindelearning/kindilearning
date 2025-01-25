"use client";

import PopularActivityCarousel from "@/app/Widgets/Carousel/PopularActivityCarousel";
import { useEffect, useState } from "react";

export default async function PopularActivity() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/popularlearning?populate=Content.Media"
        );
        const data = await response.json();
        console.log("popularlearning Database", data);
        if (data?.data) {
          setContent(data.data.Content); // Set the fetched data
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
      <section className="w-full h-auto bg-[#eaeaf5] pt-12 pb-20 items-center justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full script p-4 flex-col justify-start items-start md:items-center inline-flex">
          {content?.featuredText && (
            <div className="clarascript text-start md:text-center text-red">
              {content?.featuredText ||
                "Follow with your Child, Guided step-by-step"}
            </div>
          )}

          <div className="flex w-full heading justify-start items-start md:items-center md:justify-center flex-col">
            <div className="flex flex-wrap gap-1 text-start md:text-center justify-start items-start md:items-center md:justify-center w-full">
              <span className="claraheading text-start md:text-center text-purple">
                {content?.title
                  ? content?.title.split(" ").slice(0, 2).join(" ")
                  : "Popular Learning"}{" "}
              </span>
                {" "}
              <span className="claraheading text-red">
                {content?.title
                  ? content?.title.split(" ").slice(2, 3).join(" ")
                  : "Activities"}{" "}
              </span>
            </div>

            {content?.BodyDescription ? (
              <p
                className="prose w-full clarabodyTwo text-start md:text-center text-purple text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
                dangerouslySetInnerHTML={{ __html: content?.BodyDescription }}
              />
            ) : (
              <p>Discover the Joy of learning with Kindi</p>
            )}
          </div>
        </div>

        {/* <PopularActivityCarousel activities={filteredActivities} /> */}
        <PopularActivityCarousel />
      </section>
    </>
  );
}
