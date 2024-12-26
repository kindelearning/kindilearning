"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "../api";

export default function RawProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilepic: null,
  });

  const router = useRouter();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt"); // Get the JWT token from localStorage
      if (!token) {
        // router.push("/oAuth/signin"); // Redirect to login if there's an error fetching user data
        return;
      }

      try {
        const data = await fetchUserDetails(token); // Use the helper function to fetch user data
        console.log("User data: ", data);
        setUserData(data);
        setFormData({
          username: data.username,
          email: data.email,
          profilepic: data.profilepic?.url || "",
        });
      } catch (error) {
        console.error("Error fetching user data", error);
        // router.push("/oAuth/signin"); // Redirect to login if there's an error fetching user data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <EditProfile />

      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        <div className="claracontainer bg-[#ffffff] md:bg-[#ffffff] -mt-4 rounded-t-[12px] z-2 lg:m-12 px-4 py-6 rounded-xl md:px-2 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
          <h1>User Profile</h1>
          {userData && (
            <>
              {/* Displaying User Information */}
              <div>
                <h2>Username: {userData.username}</h2>
                <p>Email: {userData.email}</p>
                <p>Provider: {userData.provider}</p>
                <p>Premium Status: {userData.isPremium ? "Yes" : "No"}</p>
                <p>Blocked: {userData.blocked ? "Yes" : "No"}</p>
                <p>Confirmed: {userData.confirmed ? "Yes" : "No"}</p>
                <p>
                  Role:{" "}
                  {userData.role ? userData.role.name : "No role assigned"}
                </p>

                {/* Displaying Profile Picture */}
                {userData.profilepic ? (
                  <img
                    src={`http://localhost:1337${userData.profilepic.url}`}
                    alt="Profile Picture"
                    className="profile-pic"
                  />
                ) : (
                  <p>No profile picture</p>
                )}

                {/* Displaying Kids' Profiles */}
                <div>
                  <h3>Kids Profiles</h3>
                  {userData.myKids && userData.myKids.length > 0 ? (
                    userData.myKids.map((kid, index) => (
                      <div key={index} style={{ marginBottom: "20px" }}>
                        <p>
                          <strong>ID:</strong> {kid.id}
                        </p>
                        <p>
                          <strong>Name:</strong> {kid.Name}
                        </p>
                        <p>
                          <strong>Age:</strong> {kid.age}
                        </p>
                        <p>
                          <strong>Gender:</strong> {kid.Gender}
                        </p>
                        <p>
                          <strong>DoB:</strong> {kid.dob}
                        </p>
                        <p>
                          <strong>Attending Nursery:</strong>{" "}
                          {kid.attendingNursury ? "Yes" : "No"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No kids profiles available.</p>
                  )}
                </div>

                {/* Logout Button */}
                <button onClick={() => router.push("/auth/sign-out")}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

const EditProfile = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  // Fetch current user data when the page loads
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("jwt"); // Fetch the JWT token from localStorage

      if (!token) {
        return null;
      }

      try {
        const response = await fetch("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError("Failed to fetch user data. Please try again.");
          return;
        }

        setName(data.name); // Set the initial value of the name field
      } catch (error) {
        console.error("Error fetching user data", error);
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, [router]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt"); // Get JWT from localStorage
    if (!token) {
      setError("You need to be logged in to update your profile.");
      return;
    }

    setIsUpdating(true); // Set loading state while updating

    try {
      const response = await fetch("http://localhost:1337/api/users/me", {
        method: "PUT", // Use PUT to update user data
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name, // Send the updated name field
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update your profile.");
      }

      alert("Profile updated successfully!");
      router.push("/profile"); // Redirect back to the profile page on success
    } catch (error) {
      console.error("Error details: ", error);
      setError("Failed to update your profile. Please try again.");
    } finally {
      setIsUpdating(false); // Reset loading state
    }
  };

  if (!name) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};
