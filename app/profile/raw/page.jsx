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
import { Button } from "@/components/ui/button";

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
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col px-0">
        <div className="claracontainer bg-[#ffffff] md:bg-[#ffffff] -mt-4 rounded-t-[12px] z-2 lg:m-12 px-4 py-6 rounded-xl md:px-2 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
          <Dialog>
            <DialogTrigger>Update Profile</DialogTrigger>
            <DialogContent className="w-full max-w-[1000px] max-h-[600px] overflow-y-scroll">
              <DialogDescription>
                {/* <UpdateUserForm /> */}
                <EditProfile
                  userData={userData}
                  onProfileUpdate={handleProfileUpdate}
                />
              </DialogDescription>
            </DialogContent>
          </Dialog>

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
                {/* Displaying Payment Methodd for the Main Accout */}
                <h3>Payment Method</h3>
                <div className="grid w-full grid-cols-3 gap-4 justify-between">
                  {userData.myPayment && userData.myPayment.length > 0 ? (
                    userData.myPayment.map((kid, index) => (
                      <div key={index} style={{ marginBottom: "20px" }}>
                        <p>
                          <strong>ID:</strong> {kid.id}
                        </p>
                        <p>
                          <strong>CVV:</strong> {kid.CVV}
                        </p>
                        <p>
                          <strong>ExpiryDate:</strong> {kid.ExpiryDate}
                        </p>
                        <p>
                          <strong>Name:</strong> {kid.Name}
                        </p>
                        <p>
                          <strong>Number:</strong> {kid.Number}
                        </p>
                        <p>
                          <strong>createdAt:</strong> {kid.createdAt}
                        </p>
                        <p>
                          <strong>documentId:</strong> {kid.documentId}
                        </p>
                        <p>
                          <strong>publishedAt:</strong> {kid.publishedAt}
                        </p>
                        <p>
                          <strong>updatedAt:</strong> {kid.updatedAt}
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
    myPayment: userData.myPayment || [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    Name: "",
    Number: "",
    ExpiryDate: "",
    CVV: "",
  });
  const mytoken = localStorage.getItem("jwt");
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
          myPayment: data.myPayment || [],
        });
      } catch (err) {
        setError("Error fetching content");
      }
    };

    fetchProfile();
  }, []);

  // Handle changes in user data (Name, Username)
  const handleUserChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

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

  return (
    <>
      <CreatePaymentMethod
        userDocumentId={content.documentId}
        token={mytoken}
      />
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

        <Button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Update..." : "Add Payment Method"}
        </Button>

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
    </>
  );
}

export function CreatePaymentMethod({ userDocumentId, token }) {
  const [paymentMethod, setPaymentMethod] = useState({
    Name: "",
    Number: "",
    ExpiryDate: "",
    CVV: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethod((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const response = await fetch(
      "http://localhost:1337/api/payment-methods", // Strapi endpoint for Payment Method
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Correct token for authentication
        },
        body: JSON.stringify({
          data: {
            ...paymentMethod, // Your new payment method data
            user: userDocumentId, // Ensure this is the user's documentId to link the payment method
          },
        }),
      }
    );

    const result = await response.json();
    console.log(result); // Check if the result includes the new payment method

    if (!response.ok) {
      throw new Error(result.error?.message || "Failed to add payment method");
    }

    setSuccess("Payment method added successfully.");
    setPaymentMethod({ Name: "", Number: "", ExpiryDate: "", CVV: "" });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add Payment Method</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name on Card</label>
          <input
            type="text"
            name="Name"
            value={paymentMethod.Name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Card Number</label>
          <input
            type="text"
            name="Number"
            value={paymentMethod.Number}
            onChange={handleChange}
            maxLength={16}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              type="date"
              name="ExpiryDate"
              value={paymentMethod.ExpiryDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">CVV</label>
            <input
              type="text"
              name="CVV"
              value={paymentMethod.CVV}
              onChange={handleChange}
              maxLength={3}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Payment Method"}
        </button>
      </form>
    </div>
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
