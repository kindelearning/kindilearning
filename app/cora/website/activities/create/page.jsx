"use client";

import React, { useState } from "react";

export default function CreateActivityForm() {
  const [formData, setFormData] = useState({
    Title: "",
    Theme: "",
    FocusAge: "",
    LearningArea: "",
    Skills: [{ type: "paragraph", children: [{ type: "text", text: "" }] }],
    ActivityDate: "",
    SetUpTime: "",
    Accordions: [{ Question: "", Answer: "" }],
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Skills/Accordions changes
  const handleArrayChange = (e, arrayName, index, key) => {
    const newArray = [...formData[arrayName]];
    newArray[index][key] = e.target.value;
    setFormData({
      ...formData,
      [arrayName]: newArray,
    });
  };

  // Add new Skill or Accordion
  const addNewItem = (arrayName) => {
    const newItem =
      arrayName === "Skills"
        ? { type: "paragraph", children: [{ type: "text", text: "" }] }
        : { Question: "", Answer: "" };
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], newItem],
    });
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      data: {
        Title: formData.Title,
        Theme: formData.Theme,
        FocusAge: formData.FocusAge,
        LearningArea: formData.LearningArea,
        Skills: formData.Skills,
        ActivityDate: formData.ActivityDate,
        SetUpTime: formData.SetUpTime,
        Accordions: formData.Accordions,
      },
    };
  
    try {
      const response = await fetch('http://localhost:1337/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error: ${errorData.message || 'Unknown Error'}`);
      } else {
        const data = await response.json();
        alert('Activity Created Successfully');
        console.log('Response:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Theme</label>
        <input
          type="text"
          name="Theme"
          value={formData.Theme}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Focus Age</label>
        <input
          type="text"
          name="FocusAge"
          value={formData.FocusAge}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Learning Area</label>
        <input
          type="text"
          name="LearningArea"
          value={formData.LearningArea}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Activity Date</label>
        <input
          type="datetime-local"
          name="ActivityDate"
          value={formData.ActivityDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Set Up Time</label>
        <input
          type="text"
          name="SetUpTime"
          value={formData.SetUpTime}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Skills</label>
        {formData.Skills.map((skill, index) => (
          <div key={index}>
            <textarea
              value={skill.children[0].text}
              onChange={(e) =>
                handleArrayChange(e, "Skills", index, "children[0].text")
              }
            />
          </div>
        ))}
        <button type="button" onClick={() => addNewItem("Skills")}>
          Add Skill
        </button>
      </div>

      <div>
        <label>Accordions</label>
        {formData.Accordions.map((accordion, index) => (
          <div key={index}>
            <div>
              <label>Question</label>
              <input
                type="text"
                value={accordion.Question}
                onChange={(e) =>
                  handleArrayChange(e, "Accordions", index, "Question")
                }
              />
            </div>
            <div>
              <label>Answer</label>
              <textarea
                value={accordion.Answer}
                onChange={(e) =>
                  handleArrayChange(e, "Accordions", index, "Answer")
                }
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={() => addNewItem("Accordions")}>
          Add Accordion
        </button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
