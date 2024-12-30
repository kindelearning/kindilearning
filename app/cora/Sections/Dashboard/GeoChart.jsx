"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GeolocationAnalytics = () => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    // Chart options for Bar chart
    setOptions({
      chart: {
        type: "bar", // Bar chart for geolocation data
        height: 400,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [
          "United States",
          "India",
          "Brazil",
          "United Kingdom",
          "Germany",
          "Australia",
          "France",
          "Italy",
          "Canada",
          "Japan",
        ], // Regions or countries
        title: {
          text: "Countries",
        },
      },
      yaxis: {
        title: {
          text: "Visitors",
        },
      },
      fill: {
        colors: ["#00e396"], // Custom color for bars
      },
      title: {
        text: "Geolocation Analytics by Country",
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
    });

    // Dummy data for visitor count by country
    setSeries([
      {
        name: "Visitors",
        data: [1200, 800, 600, 700, 500, 450, 400, 350, 300, 250], // Visitor data by country
      },
    ]);
  }, []);

  if (!options || !series) return <div>Loading Chart...</div>;

  return (
    <div className="bg-white p-4 w-full rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Geolocation Analytics by Country</h2>
      <ReactApexChart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default GeolocationAnalytics;
