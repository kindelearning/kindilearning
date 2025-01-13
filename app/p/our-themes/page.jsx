"use client";

import { fetchOurThemes } from "@/app/data/p/Dynamic/OurTheme";
import { CategoryCard } from "@/app/Widgets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [themes, setThemes] = useState([]);

  const fetchTheme = async () => {
    try {
      const res = await fetch(
        "https://upbeat-life-04fe8098b1.strapiapp.com/api/our-themes?populate=*"
      );
      const data = await res.json();
      // console.log("API Response:", data);

      if (data && data.data) {
        setThemes(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  // const pageContent = await fetchOurThemes();
  // if (!pageContent) {
  //   return <div>Error: No data available</div>;
  // }

  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center pb-32 justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-4">
            <div className="text-[#0a1932] claraheading text-start capitalize">
              Upcoming Themes
            </div>
            <div className="grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full claracontainer">
              {themes.map((item) => (
                <Link
                  key={item.id}
                  target="_blank"
                  href={`/p/our-themes/${item.documentId}`}
                >
                  <article className="rounded-lg">
                    {/* <CategoryCard
                      schedulesDate={item.LaunchTime}
                      image={item.Thumbnail.url}
                      // image={`https://upbeat-life-04fe8098b1.strapiapp.com${item.Thumbnail.url}`}
                      description={item.metaDesc.slice(0, 100)}
                      header={item.Title}
                    /> */}
                    <CategoryCard
                      schedulesDate={item?.LaunchTime || "2024-12-25"} // Fallback for LaunchTime
                      image={item?.Thumbnail?.url || "/Images/ThemeDummy.png"} // Fallback for image URL
                      description={
                        item?.metaDesc
                          ? item.metaDesc.slice(0, 100)
                          : "No description available"
                      } // Fallback for metaDesc
                      header={item?.Title || "Untitled"} // Fallback for Title
                    />
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
