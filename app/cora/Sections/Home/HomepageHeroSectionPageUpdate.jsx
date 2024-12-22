"use client";

import { useEffect, useState } from "react";

export default function HomepageHeroSectionPageUpdate() {
  const [heroSection, setHeroSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [updatedHeroSection, setUpdatedHeroSection] = useState({
    featuredText: "",
    HeroTitle: "",
    BodyDescription: "",
    Image: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch the HomepageHeroSection data
  useEffect(() => {
    const fetchHeroSectionData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/homepage-hero-section?populate=*"
        );
        const data = await response.json();

        if (data?.data) {
          setHeroSection(data.data);
          setUpdatedHeroSection({
            featuredText: data.data?.featuredText || "",
            HeroTitle: data.data?.HeroTitle || "",
            BodyDescription: data.data?.BodyDescription
              ? data.data?.BodyDescription.map((block) =>
                  block?.children?.map((child) => child?.text).join(" ")
                ).join("\n")
              : "",
            Image: null,
          });
        } else {
          setError("No hero section data found.");
        }
      } catch (err) {
        setError("Error fetching hero section data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSectionData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHeroSection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change (Image/Video)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdatedHeroSection((prev) => ({
      ...prev,
      Image: file,
    }));
  };

  // Handle the form submission to update the hero section data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("data[featuredText]", updatedHeroSection.featuredText);
    formData.append("data[HeroTitle]", updatedHeroSection.HeroTitle);
    formData.append(
      "data[BodyDescription]",
      updatedHeroSection.BodyDescription
    );

    if (updatedHeroSection.Image) {
      formData.append("files.Image", updatedHeroSection.Image);
    }

    try {
      const response = await fetch(
        `http://localhost:1337/api/y832y4kynif9jk6pn5y9sdxw`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (data?.data) {
        setHeroSection(data.data); // Update the state with the newly updated data
        setIsEditing(false); // Stop editing mode
      } else {
        setError("Error updating hero section data.");
      }
    } catch (err) {
      setError("Error updating hero section data: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl">
        Loading homepage hero section...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-16 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-start">
        Homepage Hero Section
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-wrap justify-between items-start space-y-8 md:space-y-0">
            <div className="flex flex-col w-full gap-0 space-y-6 md:w-1/2">
              {/* Featured Text */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Featured Text
                </h3>
                <input
                  type="text"
                  name="featuredText"
                  value={updatedHeroSection.featuredText}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Hero Title */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Hero Title
                </h3>
                <input
                  type="text"
                  name="HeroTitle"
                  value={updatedHeroSection.HeroTitle}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Body Description */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Body Description
                </h3>
                <textarea
                  name="BodyDescription"
                  value={updatedHeroSection.BodyDescription}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Image or Video */}
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Hero Media
                </h3>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="mt-4 px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap justify-between items-start space-y-8 md:space-y-0">
          <div className="flex flex-col w-full gap-0 space-y-6 md:w-1/2">
            {/* Display the current content */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">
                Featured Text
              </h3>
              <p className="text-gray-600">{heroSection?.featuredText}</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">
                Hero Title
              </h3>
              <p className="text-gray-600">{heroSection?.HeroTitle}</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">
                Body Description
              </h3>
              <p className="text-gray-600">
                {updatedHeroSection.BodyDescription}
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">
                Hero Media
              </h3>
              {heroSection?.Image?.mime?.includes("video") ? (
                <video
                  controls
                  className="w-full rounded-lg shadow-lg"
                  src={`http://localhost:1337${heroSection?.Image?.url}`}
                  alt="Hero Section Video"
                />
              ) : (
                <img
                  src={`http://localhost:1337${heroSection?.Image?.url}`}
                  alt="Hero Section Image"
                  className="w-full rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={() => setIsEditing(true)}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Edit Content
        </button>
      </div>
    </div>
  );
}
