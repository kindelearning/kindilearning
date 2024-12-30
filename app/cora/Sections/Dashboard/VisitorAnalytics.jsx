"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { format, subDays } from "date-fns";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const VisitorAnalytics = () => {
  const [view, setView] = useState("daily"); // daily, weekly, monthly, all
  const [dateRange, setDateRange] = useState({
    start: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    end: format(new Date(), "yyyy-MM-dd"),
  });

  const rawVisitorData = [
    { date: "2024-12-01", visitors: 120 },
    { date: "2024-12-02", visitors: 200 },
    { date: "2024-12-03", visitors: 300 },
    { date: "2024-12-04", visitors: 150 },
    { date: "2024-12-05", visitors: 250 },
    { date: "2024-12-06", visitors: 350 },
    { date: "2024-12-07", visitors: 400 },
    { date: "2024-12-08", visitors: 370 },
    { date: "2024-12-09", visitors: 320 },
    { date: "2024-12-10", visitors: 270 },
    { date: "2024-12-11", visitors: 220 },
    { date: "2024-12-12", visitors: 180 },
    { date: "2024-12-13", visitors: 140 },
  ];

  const filteredData = rawVisitorData.filter((entry) => {
    const entryDate = new Date(entry.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    return entryDate >= startDate && entryDate <= endDate;
  });

  const groupedData = () => {
    if (view === "daily") {
      return filteredData;
    }
    if (view === "weekly") {
      return filteredData.reduce((acc, curr, index) => {
        if (index % 7 === 0) {
          acc.push({ date: curr.date, visitors: curr.visitors });
        } else {
          acc[acc.length - 1].visitors += curr.visitors;
        }
        return acc;
      }, []);
    }
    if (view === "monthly") {
      return [
        {
          date: "Monthly",
          visitors: filteredData.reduce((acc, curr) => acc + curr.visitors, 0),
        },
      ];
    }
    return filteredData; // 'all'
  };

  const chartData = groupedData();

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: true },
    },
    xaxis: {
      categories: chartData.map((entry) => entry.date),
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    title: {
      text: "Visitor Analytics",
      align: "left",
      style: { fontSize: "20px", fontWeight: "bold", color: "#4A5568" },
    },
    tooltip: { enabled: true, shared: true },
    colors: ["#4299E1"],
  };

  const chartSeries = [
    {
      name: "Visitors",
      data: chartData.map((entry) => entry.visitors),
    },
  ];

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="bg-white font-fredoka shadow-lg rounded-xl p-6 w-full mx-auto">
      <header className="flex justify-between items-center mb-6">
        {/* <h2 className="text-2xl font-bold text-gray-800">Visitor Analytics</h2> */}
        <div className="flex items-center gap-4">
          <select
            name="view"
            value={view}
            onChange={(e) => handleViewChange(e.target.value)}
            className="border-gray-300 rounded-md text-gray-600 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="all">All Data</option>
          </select>
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleDateChange}
            className="border-gray-300 rounded-md text-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleDateChange}
            className="border-gray-300 rounded-md text-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </header>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={350}
      />
    </div>
  );
};

export default VisitorAnalytics;
