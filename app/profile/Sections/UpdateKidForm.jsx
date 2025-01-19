"use client";

import { useEffect, useState } from "react";

export default function UpdateKidForm({ parentId, kidId }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [attendingNursery, setAttendingNursery] = useState(false);
  const [gender, setGender] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing kid's data when component mounts
  useEffect(() => {
    const fetchKidData = async () => {
      try {
        const response = await fetch(`https://kindiadmin.up.railway.app/api/kids/${kidId}`);
        const data = await response.json();
        if (response.ok) {
          const kid = data.data;
          setName(kid.Name || "");
          setAge(kid.Age || "");
          setDob(kid.dob || "");
          setAttendingNursery(kid.AttendingNursury || false);
          setGender(kid.Gender || "");
        } else {
          setError("Failed to fetch kid data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      }
    };

    fetchKidData();
  }, [kidId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare the updated payload
    const updatedKid = {
      data: {
        Name: name,
        Age: age,
        dob: dob,
        AttendingNursury: attendingNursery,
        Gender: gender,
        myParent: [
          { id: parentId }, // Ensure we keep the parent's reference
        ],
      },
    };

    try {
      const response = await fetch(`https://kindiadmin.up.railway.app/api/kids/${kidId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedKid),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form fields after successful update
        setName("");
        setAge("");
        setDob("");
        setAttendingNursery(false);
        setGender("");
      } else {
        setError(data.error?.message || "Error updating kid");
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
      className="max-w-md mx-auto font-fredoka bg-white  rounded-lg p-6 space-y-6"
    >
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="age" className="font-medium text-gray-700">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="dob" className="font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="attendingNursery" className="font-medium text-gray-700">
          Attending Nursery
        </label>
        <input
          type="checkbox"
          id="attendingNursery"
          name="attendingNursery"
          checked={attendingNursery}
          onChange={(e) => setAttendingNursery(e.target.checked)}
          className="input"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="gender" className="font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="input"
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn">
        {isSubmitting ? "Updating..." : "Update Kid"}
      </button>
    </form>
  );
}
