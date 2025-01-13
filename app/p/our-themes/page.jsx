"use client";

import { fetchOurThemes } from "@/app/data/p/Dynamic/OurTheme";
import { CategoryCard } from "@/app/Widgets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [themes, setThemes] = useState([]); // Store all themes
  const [currentPage, setCurrentPage] = useState(1);
  const [currentThemes, setCurrentThemes] = useState([]); // Store themes for the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const fetchThemes = async () => {
    try {
      const res = await fetch(
        "https://upbeat-life-04fe8098b1.strapiapp.com/api/our-themes?populate=*"
      );
      const data = await res.json();

      if (data && data.data) {
        setThemes(data.data); // Save all themes
        setTotalPages(Math.ceil(data.data.length / 12)); // Calculate total pages
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchThemes(); // Fetch all themes once
  }, []);

  useEffect(() => {
    // Paginate the themes
    const start = (currentPage - 1) * 12;
    const end = start + 12;
    setCurrentThemes(themes.slice(start, end)); // Get the themes for the current page
  }, [themes, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center pb-32 justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-4">
            <div className="text-[#0a1932] claraheading text-start capitalize">
              Upcoming Themes
            </div>
            {themes.length === 0 ? (
              <div>Loading...</div> // Loading state
            ) : (
              <div className="grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full claracontainer">
                {currentThemes.map((item) => (
                  <Link
                    key={item.id}
                    target="_blank"
                    href={`/p/our-themes/${item.documentId}`}
                  >
                    <article className="rounded-lg">
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
            )}
            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="self-center text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
