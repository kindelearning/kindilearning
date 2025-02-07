"use client";
import { useEffect, useState } from "react";

export default function AddKidForm({ parentId }) {
  // Managing individual states
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [attendingNursery, setAttendingNursery] = useState(false);
  const [gender, setGender] = useState("");
  const [dp, setDP] = useState(null); // Store the selected media
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mediaList, setMediaList] = useState([]); // Store the media list fetched from the server

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/upload/files"
        );
        const data = await response.json();

        // Filter media with ids between 159 and 169
        const filteredMedia = data.filter(
          (item) => item.id >= 159 && item.id <= 168
        );
        setMediaList(filteredMedia); // Update the state with the filtered media
      } catch (err) {
        setError("An error occurred while fetching media files");
      }
    };

    fetchMedia();
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setDob(dobValue);
    setAge(calculateAge(dobValue)); // Auto-update age
  };

  const today = new Date().toISOString().split("T")[0];

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
        kidDP: dp?.id || null,
        myParent: [
          { id: parentId }, // Sending the parent ID in the payload
        ],
      },
    };

    console.log("New Kid data", newKid);

    try {
      const response = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/kids",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newKid),
        }
      );

      const data = await response.json();
      console.log("Payload sent", data);

      if (response.ok) {
        // Trigger callback after successful creation
        // onKidAdded(data);
        // Reset form fields
        setName("");
        setAge("");
        setDob("");
        setDP(null);
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

  const handleMediaSelect = (selectedMedia) => {
    setDP(selectedMedia); // Store the selected media object
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto gap-1 flex flex-col  bg-white rounded-lg space-y-6"
    >
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div>
        <label>Media:</label>
        <div className="mt-4 flex gap-4">
          {mediaList.length === 0 ? (
            <p>Loading media...</p>
          ) : (
            mediaList.map((media) => (
              <div
                key={media.id}
                className={`cursor-pointer min-w-16 min-h-16 w-12 h-12 p-2 rounded-lg border-2 ${
                  dp?.id === media.id ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => handleMediaSelect(media)}
              >
                <img
                  src={`https://lionfish-app-98urn.ondigitalocean.app${media.url}`}
                  // src={media.url}
                  alt={media.name}
                  className="min-w-12 min-h-12 w-12 h-12 object-cover rounded-full"
                />
                {/* <p className="text-center mt-2">{media.name}</p> */}
              </div>
            ))
          )}
        </div>
      </div>

      {dp && (
        <div className="mt-4">
          <p>Selected Media:</p>
          <img
            src={`https://lionfish-app-98urn.ondigitalocean.app${dp.url}`}
            alt={dp.name}
            className="w-32 h-32 object-cover"
          />
          <p>{dp.name}</p>
        </div>
      )}

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
      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full flex-col space-y-1">
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
            readOnly // Make it non-editable
            placeholder="Calculated automatically"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            // placeholder="Enter the child's age"
          />
        </div>

        <div className="flex w-full flex-col space-y-1">
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
            max={today}
            value={dob}
            onChange={handleDobChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full flex-col space-y-1">
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

        <div className="flex w-full flex-col space-y-1">
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
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
      >
        {isSubmitting ? "Adding..." : "Add Kid"}
      </button>
    </form>
  );
}
