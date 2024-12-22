"use client";
import { useEffect, useState } from "react";

export default function HowItWorksSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:1337/api/howitwork?populate=HIWSection.Media"
      );
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <section className="how-it-works py-4 bg-gray-100">
      {/* Main Title */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          {data.MainTitle}
        </h1>
      </div>

      {/* Main Body */}
      <div className="max-w-4xl mx-auto px-4">
        {data.MainBody.map((paragraph, index) => (
          <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">
            {paragraph.children[0].text}
          </p>
        ))}
      </div>

      {/* How It Works Sections */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4">
        {data.HIWSection.map((section) => (
          <div
            key={section.id}
            className="how-it-works-section bg-white rounded-lg p-8 gap-4 flex items-start"
          >
            {/* Image */}
            <img
              className="rounded-lg max-w-[300px] h-[300px] w-full  object-contain"
              src={`http://localhost:1337${section.Media.url}`}
              alt={section.Media.name}
            />
            <div className="flex flex-col justify-start items-start">
              {/* Title and Featured Text */}
              <span className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {section.title} {" "}
                {section.featuredText}
              </span>

              {/* Body Description */}
              {section.BodyDescription.map((body, index) => (
                <p
                  key={index}
                  className="text-lg text-[gray]  mb-6 text-start leading-relaxed"
                >
                  {body.children[0].text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
