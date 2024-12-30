// app/profile/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Function to fetch user data
  const fetchUserData = async () => {
    const token = localStorage.getItem("jwt"); // Get JWT from localStorage
    if (!token) {
      // If no token, redirect to login page
      router.push("/oAuth/signin");
      return;
    }

    try {
      const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError("An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Provider:</strong> {user.provider}</p>
        <p><strong>Confirmed:</strong> {user.confirmed ? "Yes" : "No"}</p>
        <p><strong>Blocked:</strong> {user.blocked ? "Yes" : "No"}</p>
        <p><strong>Role:</strong> {user.role.name}</p>
      </div>
    </div>
  );
};

export default Profile;
