"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DeviceAnalytics = () => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    // Chart options for Pie chart
    setOptions({
      chart: {
        type: "pie", // Pie chart for device analytics
        height: 350, // Slightly smaller height for a cleaner look
        toolbar: {
          show: false, // Hide chart toolbar for a more minimal interface
        },
      },
      labels: ["Mobile", "Desktop", "Tablet"], // Device categories
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#555"], // Subtle color for data labels
          fontSize: "12px", // Smaller font size for labels
        },
      },
      title: {
        text: "Device Analytics",
        align: "center",
        style: {
          fontSize: "16px", // Slightly larger title for visibility
          fontWeight: "600", // Medium font weight for title
          color: "#333", // Darker color for the title text
        },
      },
      fill: {
        colors: ["#CDE3F7", "#fbcdcd", "#aaffc6"], // Vibrant and modern color scheme
      },
      legend: {
        show: true,
        position: "bottom",
        labels: {
          colors: "#555", // Subtle text color for legend
          fontSize: "12px", // Smaller font size for the legend
        },
      },
      tooltip: {
        theme: "light", // Light tooltip for a subtle look
      },
      plotOptions: {
        pie: {
          donut: {
            size: "60%", // Adjusted size for a donut-style chart
          },
        },
      },
    });

    // Dummy data for device usage distribution
    setSeries([70, 25, 5]); // 70% Mobile, 25% Desktop, 5% Tablet (Replace with real data later)
  }, []);

  if (!options || !series)
    return <div className="text-center text-gray-600">Loading Chart...</div>;

  return (
    <div className="bg-[#ffffff] p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
        Device Analytics
      </h2>
      <div className="flex justify-center items-center">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          height={350}
        />
      </div>
    </div>
  );
};

export default DeviceAnalytics;
