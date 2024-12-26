"use client";

import React, { useState } from "react";

export default function CreateActivityForm() {
  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    theme: "",
    focusAge: "",
    activityDate: "",
    learningArea: "",
    accordions: [{ question: "", answer: "" }], // Repeatable component
    setUpTime: "",
    skillCategory: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccordionChange = (index, field, value) => {
    const updatedAccordions = formData.accordions.map((accordion, i) =>
      i === index ? { ...accordion, [field]: value } : accordion
    );
    setFormData((prev) => ({ ...prev, accordions: updatedAccordions }));
  };

  const addAccordion = () => {
    setFormData((prev) => ({
      ...prev,
      accordions: [...prev.accordions, { question: "", answer: "" }],
    }));
  };

  const removeAccordion = (index) => {
    setFormData((prev) => ({
      ...prev,
      accordions: prev.accordions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData, // Ensure proper structure
        }),
      });

      if (response.ok) {
        alert("Activity created successfully!");
        setFormData({
          title: "",
          skills: "",
          theme: "",
          focusAge: "",
          activityDate: "",
          learningArea: "",
          accordions: [{ question: "", answer: "" }],
          setUpTime: "",
          skillCategory: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error creating activity:", errorData);
        alert("Failed to create activity. Check the input data.");
      }
    } catch (error) {
      console.error("Error creating activity:", error);
      alert("An error occurred while creating the activity.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Create New Activity
      </h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border rounded-lg"
        />
      </div>

      {/* Skills */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Skills
        </label>
        <textarea
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border rounded-lg"
        ></textarea>
      </div> */}

      {/* Other fields */}
      {["theme", "focusAge", "setUpTime", "skillCategory"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {field}
          </label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>
      ))}

      {/* Activity Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Activity Date
        </label>
        <input
          type="date"
          name="activityDate"
          value={formData.activityDate}
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border rounded-lg"
        />
      </div>

      {/* Learning Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Learning Area
        </label>
        <select
          name="learningArea"
          value={formData.learningArea}
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border rounded-lg"
        >
          <option value="">Select</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          {/* Add more options here */}
        </select>
      </div>

      {/* Accordions */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Accordions
        </label>
        {formData.accordions.map((accordion, index) => (
          <div key={index} className="flex items-center space-x-4 mt-2">
            <input
              type="text"
              placeholder="Question"
              value={accordion.question}
              onChange={(e) =>
                handleAccordionChange(index, "question", e.target.value)
              }
              className="w-1/2 p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Answer"
              value={accordion.answer}
              onChange={(e) =>
                handleAccordionChange(index, "answer", e.target.value)
              }
              className="w-1/2 p-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeAccordion(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAccordion}
          className="mt-2 text-blue-500"
        >
          Add Accordion
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        Create Activity
      </button>
    </form>
  );
}
