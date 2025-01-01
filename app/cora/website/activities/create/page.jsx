"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";

export default function CreateActivityForm() {
  const [formData, setFormData] = useState({
    Title: "",
    Theme: "",
    FocusAge: "",
    ActivityDate: "",
    SetUpTime: "",
    SkillCategory: "",
    Skills: "",
    LearningArea: "", // Add LearningArea to form data state
    Accordions: [{ Question: "", Answer: "" }],
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccordionChange = (index, e) => {
    const updatedAccordions = formData.Accordions.map((accordion, i) =>
      i === index
        ? { ...accordion, [e.target.name]: e.target.value }
        : accordion
    );
    setFormData({ ...formData, Accordions: updatedAccordions });
  };

  const addAccordion = () => {
    setFormData({
      ...formData,
      Accordions: [...formData.Accordions, { Question: "", Answer: "" }],
    });
  };

  const removeAccordion = (index) => {
    setFormData({
      ...formData,
      Accordions: formData.Accordions.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });

      if (!response.ok) throw new Error("Failed to create activity");

      const result = await response.json();
      setDialogMessage("Activity created successfully!");
      setDialogType("success");
      setIsDialogOpen(true);
      console.log(result);
    } catch (error) {
      setDialogMessage("Error: " + error.message);
      setDialogType("error");
      setIsDialogOpen(true);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 mx-auto bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Create New Activity
        </h2>

        {/* Title & Theme in 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600">Title:</label>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              className="border p-3 w-full rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Theme:</label>
            <input
              type="text"
              name="Theme"
              value={formData.Theme}
              onChange={handleChange}
              className="border p-3 w-full rounded-md shadow-sm"
              required
            />
          </div>
        </div>

        {/* Learning Area */}
        <div>
          <label className="block text-gray-600">Learning Area:</label>
          <select
            name="LearningArea"
            value={formData.LearningArea}
            onChange={handleChange}
            className="border p-3 w-full rounded-md shadow-sm"
            required
          >
            <option value="" disabled>
              Select Learning Area
            </option>
            <option value="Emotional & Social Strength">
              Emotional & Social Strength
            </option>
            <option value="Confidence & Independence">
              Confidence & Independence
            </option>
            <option value="Speech & Language">Speech & Language</option>
            <option value="Physical Agility">Physical Agility</option>
            <option value="Reading & Writing">Reading & Writing</option>
            <option value="Discovering Our World">Discovering Our World</option>
            <option value="Creativity & Imagination">
              Creativity & Imagination
            </option>
            <option value="Experiments & Math">Experiments & Math</option>
          </select>
        </div>

        {/* Focus Age & Activity Date in 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600">Focus Age:</label>
            <input
              type="text"
              name="FocusAge"
              value={formData.FocusAge}
              onChange={handleChange}
              className="border p-3 w-full rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Activity Date:</label>
            <input
              type="date"
              name="ActivityDate"
              value={formData.ActivityDate}
              onChange={handleChange}
              className="border p-3 w-full rounded-md shadow-sm"
              required
            />
          </div>
        </div>

        {/* Set Up Time & Skill Category in 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600">Set Up Time:</label>
            <input
              type="text"
              name="SetUpTime"
              value={formData.SetUpTime}
              onChange={handleChange}
              className="border p-3 w-full rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Skill Category:</label>
            <input
              type="text"
              name="SkillCategory"
              value={formData.SkillCategory}
              onChange={handleChange}
              className="border p-3 w-full rounded-md shadow-sm"
              required
            />
          </div>
        </div>

        {/* Skills (Textarea) */}
        <div>
          <label className="block text-gray-600">Skills:</label>
          <textarea
            name="Skills"
            value={formData.Skills}
            onChange={handleChange}
            className="border p-3 w-full rounded-md shadow-sm"
            required
          ></textarea>
        </div>

        {/* Accordions Section */}
        <div>
          <label className="block text-gray-600">Accordions:</label>
          {formData.Accordions.map((accordion, index) => (
            <div key={index} className="space-y-4 mt-4">
              <div className="space-y-2">
                <input
                  type="text"
                  name="Question"
                  placeholder="Question"
                  value={accordion.Question}
                  onChange={(e) => handleAccordionChange(index, e)}
                  className="border p-3 w-full rounded-md shadow-sm"
                />
                <textarea
                  name="Answer"
                  placeholder="Answer"
                  value={accordion.Answer}
                  onChange={(e) => handleAccordionChange(index, e)}
                  className="border p-3 w-full rounded-md shadow-sm"
                ></textarea>
                <button
                  type="button"
                  onClick={() => removeAccordion(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Accordion
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addAccordion}
            className="text-blue-500 hover:text-blue-700 mt-4"
          >
            Add Accordion
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Submit Activity
          </button>
        </div>
      </form>

      {/* Custom Dialog Box for Success/Error */}
      <Dialog isOpen={isDialogOpen} onDismiss={() => setIsDialogOpen(false)}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle
              className={`text-xl font-semibold ${
                dialogType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {dialogType === "success" ? "Success!" : "Error!"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {dialogMessage}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
