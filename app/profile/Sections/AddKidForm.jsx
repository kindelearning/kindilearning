"use client";
import { useEffect, useState } from "react";

export default function AddKidForm({ parentId }) {
  // Managing individual states
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [attendingNursery, setAttendingNursery] = useState(false);
  const [gender, setGender] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare the payload
    const newKid = {
      data: {
        Name: name,
        Age: age,
        dob: dob,
        AttendingNursury: attendingNursery,
        Gender: gender,
        myParent: [
          { id: parentId }, // Sending the parent ID in the payload
        ],
      },
    };

    console.log("New Kid data", newKid);

    try {
      const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/kids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newKid),
      });

      const data = await response.json();
      console.log("Payload sent", data);

      if (response.ok) {
        // Trigger callback after successful creation
        // onKidAdded(data);
        // Reset form fields
        setName("");
        setAge("");
        setDob("");
        setAttendingNursery(false);
        setGender("");
      } else {
        setError(data.error?.message || "Error adding kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto gap-1 flex flex-col  bg-white rounded-lg space-y-6"
    >
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter the child's name"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter the child's age"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="dob"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="attendingNursery" className="block">
          Attending Nursery
        </label>
        <input
          type="checkbox"
          id="attendingNursery"
          name="attendingNursery"
          checked={attendingNursery}
          onChange={(e) => setAttendingNursery(e.target.checked)}
          className={`relative inline-flex h-6 w-11 rounded-full transition-colors focus:outline-none ${
            attendingNursery ? "bg-indigo-500" : "bg-gray-200"
          }`}
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"      >
        {isSubmitting ? "Adding..." : "Add Kid"}
      </button>
    </form>
  );
}
