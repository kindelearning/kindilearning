"use client";

import { getPublishedMileStone } from "@/lib/hygraph";
import { useEffect, useState } from "react";

export default function MilestoneList() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const data = await getPublishedMileStone();
        setMilestones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Extract unique categories
  const categories = [
    "All",
    ...new Set(milestones.map((m) => m.category || "Uncategorized")),
  ];

  // Extract unique subcategories for the selected category
  const subCategories =
    selectedCategory === "All"
      ? ["All"]
      : [
          "All",
          ...new Set(
            milestones
              .filter((m) => m.category === selectedCategory)
              .map((m) => m.subCategory || "Unspecified")
          ),
        ];

  // Filter milestones based on selected category and subcategory
  const filteredMilestones = milestones.filter((milestone) => {
    const matchesCategory =
      selectedCategory === "All" || milestone.category === selectedCategory;
    const matchesSubCategory =
      selectedSubCategory === "All" ||
      milestone.subCategory === selectedSubCategory;
    return matchesCategory && matchesSubCategory;
  });

  return (
    <section className="w-full pb-24 h-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col gap-[20px]">
      <h1>Milestone Filter</h1>

      {/* Category Filter Dropdown */}
      <label htmlFor="category-select">Filter by Category: </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedSubCategory("All"); // Reset subcategory selection when category changes
        }}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Subcategory Filter as Badge/Chip (conditionally rendered) */}
      {selectedCategory !== "All" && (
        <div className="subcategory-filter mt-4">
          <p>Filter by Subcategory:</p>
          <div className="flex flex-wrap gap-2">
            {subCategories.map((subCategory) => (
              <span
                key={subCategory}
                onClick={() => setSelectedSubCategory(subCategory)}
                className={`cursor-pointer px-4 py-2 rounded-full ${
                  selectedSubCategory === subCategory
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-blue-400`}
                style={{
                  display: "inline-block",
                  margin: "0.2rem",
                  border:
                    selectedSubCategory === subCategory
                      ? "2px solid #000"
                      : "1px solid #ccc",
                }}
              >
                {subCategory}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Render Filtered Milestones */}
      <div className="claracontainer items-center justify-center p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
        {filteredMilestones.length > 0 ? (
          filteredMilestones.map((milestone) => (
            <div key={milestone.id} className="milestone-item">
              <h3>{milestone.title}</h3>
              <p>Category: {milestone.category}</p>
              <p>Sub-Category: {milestone.subCategory}</p>
              <p>{milestone.description}</p>
              {milestone.thumbnail && (
                <img
                  src={milestone.thumbnail.url}
                  alt={milestone.title}
                  style={{ width: "150px", height: "auto" }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No milestones found for the selected filters.</p>
        )}
      </div>
    </section>
  );
}
