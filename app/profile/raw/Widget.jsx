"use client";

import { useEffect, useState } from "react";

// t0bpyl45xsmodzdkruyldcfr

export default function AddKidForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [attendingNursery, setAttendingNursery] = useState(false);
  const [dob, setDob] = useState("");
  const [userId, setUserId] = useState(null);
  const [jwtToken, setJwtToken] = useState("");
  const [existingKids, setExistingKids] = useState([]); // State to hold existing kids

  // Fetch userId and JWT token
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setJwtToken(token);
      // Fetch user details from backend (you need to implement this in your API)
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      console.log("Document: " + JSON.stringify(userData));
      setUserId(userData.documentId); // Save userId from the response
      fetchExistingKids(userData.id, token); // Fetch existing kids for this user
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchExistingKids = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:1337/api/users${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      setExistingKids(userData.myKids || []); // Set existing kids data
    } catch (error) {
      console.error("Error fetching existing kids:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const kidData = {
      name,
      age: parseInt(age),
      gender,
      attendingNursery: attendingNursery,
      dob,
    };

    try {
      // Fetch the current user data
      const response = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const userData = await response.json();

      // Append the new kid to the existing kids
      const updatedKids = [...userData.myKids, kidData];

      // Update the user profile with the new list of kids
      const updateResponse = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            data: {
              myKids: updatedKids,
            },
          }),
        }
      );

      if (updateResponse.ok) {
        alert("Kid profile added successfully!");
        setName("");
        setAge("");
        setGender("");
        setAttendingNursery(false);
        setDob("");
        setExistingKids(updatedKids); // Update the existing kids state after successful submission
      } else {
        console.error("Error adding kid profile");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add a New Kid</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="attendingNursery"
            className="block text-sm font-medium text-gray-700"
          >
            Attending Nursery
          </label>
          <input
            type="checkbox"
            id="attendingNursery"
            checked={attendingNursery}
            onChange={(e) => setAttendingNursery(e.target.checked)}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-600 text-white rounded-md"
        >
          Add Kid
        </button>
      </form>
    </div>
  );
}

export function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("t0bpyl45xsmodzdkruyldcfr"); // Example user ID

  const handleSave = async (newKidData) => {
    setLoading(true);
    try {
      // Fetch the current user details (user with `myKids` field)
      const response = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      const user = await response.json();

      // Append the new kid profile to the `myKids` field
      const updatedUser = {
        ...user,
        myKids: [...user.myKids, { ...newKidData }],
      };

      // Update the user with the new `myKids` field
      const updateResponse = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ data: updatedUser }),
        }
      );

      const result = await updateResponse.json();
      setMessage("Kid profile added successfully!");
    } catch (error) {
      setMessage("Error adding kid profile. ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <AddKidForm onSave={handleSave} />
      {loading && <p>Loading...</p>}
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}

export function ManageKids({ userId, token, onSuccess }) {
  const [kidName, setKidName] = useState("");
  const [kidAge, setKidAge] = useState("");
  const [kidGender, setKidGender] = useState("");
  const [kidDob, setKidDob] = useState("");
  const [kidAttendingNursery, setKidAttendingNursery] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const newKid = {
      Name: kidName,
      age: parseInt(kidAge),
      Gender: kidGender,
      dob: kidDob,
      attendingNursury: kidAttendingNursery,
    };

    const query = `
        mutation UpdateUserWithKids($id: ID!, $input: UsersPermissionsUserInput!) {
          updateUsersPermissionsUser(id: $id, input: $input) {
            data {
              id
              username
              email
              myKids {
                Name
                age
                Gender
                dob
                attendingNursury
              }
            }
          }
        }
      `;

    const variables = {
      id: userId,
      input: {
        myKids: [newKid], // Adding the new kid to the array
      },
    };

    try {
      const response = await fetch("http://localhost:1337/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        onSuccess(result.data.updateUsersPermissionsUser.data);
      } else {
        setError("Failed to update user profile.");
      }
    } catch (err) {
      setError("An error occurred while updating the profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Kid</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="kidName"
            className="block text-sm font-medium text-gray-700"
          >
            Kid&apos; Name
          </label>
          <input
            type="text"
            id="kidName"
            value={kidName}
            onChange={(e) => setKidName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="kidAge"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            id="kidAge"
            value={kidAge}
            onChange={(e) => setKidAge(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="kidGender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <input
            type="text"
            id="kidGender"
            value={kidGender}
            onChange={(e) => setKidGender(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="kidDob"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="kidDob"
            value={kidDob}
            onChange={(e) => setKidDob(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="kidAttendingNursery"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <input
              type="checkbox"
              id="kidAttendingNursery"
              checked={kidAttendingNursery}
              onChange={(e) => setKidAttendingNursery(e.target.checked)}
              className="mr-2"
            />
            Is attending nursery
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 text-white rounded-md ${
              isSubmitting ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Add Kid"}
          </button>
        </div>
      </form>
    </div>
  );
}
