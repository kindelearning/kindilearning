"use client";

import { useEffect, useState } from "react";

export default function UpdatePartnerForm({userId}) {
  const [email, setEmail] = useState("");
  const [partners, setPartners] = useState([]); // To store existing partners
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingUser, setExistingUser] = useState(null); // To store existing user details
  const [isChecking, setIsChecking] = useState(false); // To handle loading state for checking user

  // Handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle the "Check Now" button click
  const handleCheckUser = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setIsChecking(true); // Start loading

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/users?filters[email][$eq]=${email}&populate=*`
      );
      const data = await response.json();
      console.log("Existed User", data);

      // Ensure data is in expected structure
      if (data  && data.length > 0) {
        setExistingUser(data[0]); // Store the matching user
        setError(""); // Clear any previous errors
      } else {
        setExistingUser(null); // Clear if no match
        setError("No user found with this email");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setError("Error checking user.");
      setExistingUser(null); // Clear on error
    } finally {
      setIsChecking(false); // Stop loading
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    // Check if the email already exists in the partners array
    if (partners.includes(email)) {
      setError("This email is already a partner.");
      return;
    }

    if (!existingUser) {
      setError("No matching user found to add as a partner.");
      return;
    }

    const updatedPartners = [...partners, { id: existingUser.id }]; // Add the user ID as an object

    console.log("Payload sent", updatedPartners);
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            myPartner: updatedPartners, // The field that we want to update
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update partners");
      }

      // Update local state to reflect changes
      setPartners(updatedPartners);
      setEmail(""); // Clear input
      alert("Partner added successfully!");
    } catch (error) {
      console.error("Error updating partners:", error);
      setError("An error occurred while updating the partners.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Partner</h2>

      {/* Form to add partner */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <div className="text-red-500">{error}</div>}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Partner&apos;s Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleCheckUser}
          className={`mt-4 py-2 px-4 bg-green-500 text-white rounded-md ${
            isChecking ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isChecking}
        >
          {isChecking ? "Checking..." : "Check Now"}
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 py-2 px-4 bg-blue-500 text-white rounded-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Add Partner"}
        </button>
      </form>

      {/* Display existing user if available */}
      {existingUser && (
        <div className="mt-4 bg-yellow-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Matching User</h3>
          <p>
            <strong>id:</strong> {existingUser.id}
          </p>
          <p>
            <strong>Email:</strong> {existingUser.email}
          </p>
          <p>
            <strong>Name:</strong> {existingUser.name || "N/A"}
          </p>
          {/* Add more fields if necessary */}
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Current Partners</h3>
        <ul className="mt-2">
          {partners.length > 0 ? (
            partners.map((partner, index) => (
              <li key={index} className="text-gray-700">
                {partner.id} {/* Display ID instead of email */}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No partners added yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
