"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "../api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const handleProfileUpdate = (updatedData) => {
    setUserData(updatedData); // Update the state with the new profile data
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        <div className="claracontainer bg-[#ffffff] md:bg-[#ffffff] -mt-4 rounded-t-[12px] z-2 lg:m-12 px-4 py-6 rounded-xl md:px-2 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
          <EditProfile
            userData={userData}
            onProfileUpdate={handleProfileUpdate}
          />
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

export function EditProfile({ userData }) {
  const [content, setContent] = useState({
    id: userData.id || "",
    username: userData.username || "",
    Name: userData.Name || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          setError("You are not logged in!");
          return;
        }

        const response = await fetch("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data = await response.json();
        setContent({
          id: data.id, // Save the user ID
          username: data.username || "",
          Name: data.Name || "",
        });
      } catch (err) {
        setError("Error fetching content");
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("jwt");
    if (!token) {
      setDialogMessage("You are not logged in!");
      setIsDialogOpen(true);
      setLoading(false);
      return;
    }

    const updatedContent = {
      username: content.username,
      Name: content.Name,
    };

    try {
      const response = await fetch(
        `http://localhost:1337/api/users/${content.id}`,
        {
          // Use the user's ID
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedContent),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setDialogMessage("Content updated successfully!");
      } else {
        setDialogMessage("Error updating content.");
      }
    } catch (err) {
      setDialogMessage("Error updating content.");
    } finally {
      setIsDialogOpen(true);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="error-message">{error}</p>}
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={content.username}
          onChange={(e) => setContent({ ...content, username: e.target.value })}
          required
          className="input-field"
        />
      </label>

      <label>
        Name:
        <input
          type="text"
          name="Name"
          value={content.Name}
          onChange={(e) => setContent({ ...content, Name: e.target.value })}
          required
          className="input-field"
        />
      </label>

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-md w-96">
          <DialogHeader>
            <DialogTitle>Profile Update</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
