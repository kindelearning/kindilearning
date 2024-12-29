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
  const kid = "19";
  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        <div className="claracontainer bg-[#ffffff] md:bg-[#ffffff] -mt-4 rounded-t-[12px] z-2 lg:m-12 px-4 py-6 rounded-xl md:px-2 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
          {/* <EditProfile
            userData={userData}
            onProfileUpdate={handleProfileUpdate}
          /> */}

          <KidProfile kidId={kid} />

          <h1>User Profile</h1>
          <div className=" w-full ">
            {userData && (
              <>
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
                <h3>Kids Profiles</h3>
                <div className="grid w-full grid-cols-3 gap-4 justify-between">
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
              </>
            )}
          </div>
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
    myKids: userData.myKids || [], // Initializing kids data
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch the user profile data on initial load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          setError("You are not logged in!");
          return;
        }

        const response = await fetch(
          "http://localhost:1337/api/users/me?populate=*",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data = await response.json();
        setContent({
          id: data.id, // Save the user ID
          username: data.username || "",
          Name: data.Name || "",
          myKids: data.myKids || [], // Setting kids data
        });
      } catch (err) {
        setError("Error fetching content");
      }
    };

    fetchProfile();
  }, []);

  // Handling the form submission
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

    // Prepare the payload for the update
    const updatedContent = {
      username: content.username,
      Name: content.Name,
      myKids: content.myKids.map((kid) => {
        if (kid.id) {
          return {
            id: kid.id,
            Name: kid.Name,
            Age: kid.Age,
            Gender: kid.Gender,
            AttendingNursury: kid.AttendingNursury,
          };
        } else {
          return {
            Name: kid.Name,
            Age: kid.Age,
            Gender: kid.Gender,
            AttendingNursury: kid.AttendingNursury,
          };
        }
      }),
    };

    // Log the request payload for debugging
    console.log("Request payload:", updatedContent);

    try {
      const response = await fetch(
        `http://localhost:1337/api/users/${content.id}`,
        {
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
        setDialogMessage("Error updating content: " + result.message);
      }
    } catch (err) {
      setDialogMessage("Error updating content: " + err.message);
    } finally {
      setIsDialogOpen(true);
      setLoading(false);
    }
  };

  // Handle changes in user data (Name, Username)
  const handleUserChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  // Handle changes in kids' data (Name, Age, Gender)
  const handleKidChange = (index, e) => {
    const updatedKids = [...content.myKids];
    updatedKids[index][e.target.name] = e.target.value;
    setContent({ ...content, myKids: updatedKids });
  };

  // Add a new kid profile
  const addKid = () => {
    setContent({
      ...content,
      myKids: [
        ...content.myKids,
        {
          Name: "",
          Age: "",
          Gender: "",
          AttendingNursury: "",
        },
      ],
    });
  };

  // Remove a kid profile
  const removeKid = (index) => {
    const updatedKids = content.myKids.filter((_, idx) => idx !== index);
    setContent({ ...content, myKids: updatedKids });
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
          onChange={handleUserChange}
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
          onChange={handleUserChange}
          required
          className="input-field"
        />
      </label>

      {/* Displaying kids as cards */}
      <div className="kids-cards">
        {content.myKids.length > 0 ? (
          <>
            {content.myKids.map((kid, index) => (
              <div key={index} className="kid-card">
                <h3>Kid {index + 1}</h3>

                <label>
                  Kid Name:
                  <input
                    type="text"
                    name="Name"
                    value={kid.Name}
                    onChange={(e) => handleKidChange(index, e)}
                    className="input-field"
                  />
                </label>

                <label>
                  Age:
                  <input
                    type="number"
                    name="Age"
                    value={kid.Age}
                    onChange={(e) => handleKidChange(index, e)}
                    className="input-field"
                  />
                </label>

                <label>
                  Gender:
                  <input
                    type="text"
                    name="Gender"
                    value={kid.Gender}
                    onChange={(e) => handleKidChange(index, e)}
                    className="input-field"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => removeKid(index)}
                  className="remove-kid-button"
                >
                  Remove Kid
                </button>
              </div>
            ))}
          </>
        ) : (
          <p>No kids profiles available.</p>
        )}
      </div>

      <button type="button" onClick={addKid} className="add-kid-button">
        Add New Kid
      </button>

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

export const KidProfile = ({ kidId }) => {
  const [userData, setUserData] = useState(null);
  const [kidData, setKidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Retrieve token from storage
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:1337/api/users/me?populate=*",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch user data");
      setLoading(false);
    }
  };

  // Fetch kid data based on kidId
  const fetchKidData = () => {
    console.log("Kid ID:", kidId); // Debug kidId
    if (userData && userData.myKids) {
      console.log("Kids Data:", userData.myKids); // Debug the kids data
      const kid = userData.myKids.find((kid) => kid.id === parseInt(kidId, 10)); // Ensure type match
      if (kid) {
        console.log("Kid Data:", kid); // Debug found kid data
        setKidData(kid);
      } else {
        console.error("Kid not found"); // Log error
        setError("Kid not found");
      }
    } else {
      console.error("User data or kids data is missing"); // Log missing data error
      setError("No kids data available");
    }
  };
  
  

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  }, []);

  useEffect(() => {
    if (userData) {
      fetchKidData(); // Fetch kid data once user data is available
    }
  }, [userData]);

  // Show loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if fetching data fails
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {kidData ? (
        <div>
          <h2>{kidData.Name}'s Profile</h2>
          <p>
            <strong>Age:</strong> {kidData.age}
          </p>
          <p>
            <strong>Gender:</strong> {kidData.Gender}
          </p>
          <p>
            <strong>Date of Birth:</strong> {kidData.dob}
          </p>
          <p>
            <strong>Attending Nursery:</strong>{" "}
            {kidData.AttendingNursury ? "Yes" : "No"}
          </p>
        </div>
      ) : (
        <div>No kid data available</div>
      )}
    </div>
  );
};
