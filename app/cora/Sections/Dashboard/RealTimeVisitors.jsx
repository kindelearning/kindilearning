'use client'


import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RealTimeVisitors = () => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    // Chart options for Line chart
    setOptions({
      chart: {
        type: "line", // Line chart for real-time visitors
        height: 400,
        zoom: {
          enabled: false, // Disable zoom
        },
        toolbar: {
          show: false, // Hide toolbar for cleaner look
        },
      },
      stroke: {
        curve: "smooth", // Smooth curve for the line
        width: 2, // Line thickness
      },
      xaxis: {
        categories: [
          "00:00", "00:05", "00:10", "00:15", "00:20", "00:25", "00:30", // Time intervals (last 30 minutes)
        ],
        labels: {
          style: {
            colors: "#555", // Subtle color for x-axis labels
            fontSize: '12px', // Smaller font size for labels
          },
        },
      },
      yaxis: {
        title: {
          text: "Visitors", // Y-axis label
          style: {
            color: "#555", // Subtle color for the y-axis title
          },
        },
      },
      title: {
        text: "Real-Time Visitors",
        align: "center",
        style: {
          fontSize: "14px", // Smaller title for a minimal look
          fontWeight: "500", // Light font weight
          color: "#333", // Darker color for the title text
        },
      },
      tooltip: {
        theme: 'light', // Light tooltip for a subtle look
        y: {
          formatter: (val) => `${val} visitors`, // Format the tooltip value
        },
      },
      grid: {
        show: true,
        borderColor: "#f1f1f1", // Subtle grid lines
        strokeDashArray: 5, // Dashed grid lines for a minimalist look
      },
      fill: {
        type: "gradient", // Gradient fill for the line chart
        gradient: {
          shadeIntensity: 0.3,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
    });

    // Dummy data for real-time visitors (replace with real-time data later)
    setSeries([
      {
        name: "Visitors",
        data: [10, 12, 8, 15, 18, 20, 23], // Number of visitors at each time interval
      },
    ]);
  }, []);

  if (!options || !series) return <div>Loading Chart...</div>;

  return (
    <div className="bg-white p-4 rounded-md w-full shadow-sm">
      <h2 className="text-lg font-medium mb-2 text-gray-800">Real-Time Visitors</h2>
      <ReactApexChart options={options} series={series} type="line" height={400} />
    </div>
  );
};

export default RealTimeVisitors;
