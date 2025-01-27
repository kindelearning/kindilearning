"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function UpdatePartnerForm({ userId }) {
  const [email, setEmail] = useState("");
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingUser, setExistingUser] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value.toLowerCase());
    setError("");
  };

  const handleCheckUser = async () => {
    if (!email) {
      setError("Please provide an email.");
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/users?filters[email][$eq]=${email}&populate=*`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setExistingUser(data[0]);
        setError("");
      } else {
        setExistingUser(null);
        setError("No user found with this email.");
      }
    } catch (error) {
      setError("An error occurred while checking the user.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError("Please enter an email.");
      return;
    }

    if (!existingUser) {
      setError("No matching user found. Please check the email.");
      return;
    }

    // Check if the partner is already in the list
    const isPartnerExists = partners.some(
      (partner) => partner.id === existingUser.id
    );
    if (isPartnerExists) {
      setError("This user is already a partner.");
      return;
    }

    // Add the new partner to the existing partners array
    const updatedPartners = [...partners, { id: existingUser.id }]; // Add the new partner to the existing partners

    setIsSubmitting(true);

    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("Please log in to continue.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ myPartner: updatedPartners }), // Send updated list of partners
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        setError(
          responseData.error
            ? responseData.error.message
            : "Failed to update partners."
        );
        return;
      }

      const responseData = await response.json();
      setPartners(updatedPartners); // Update state with the new list of partners
      setEmail("");
      setSuccess("Partner added successfully!");
      setError("");
    } catch (error) {
      setError("An error occurred while adding the partner.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-2 bg-transparent w-full rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm bg-red-100 p-2 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-500 text-sm bg-green-100 p-2 rounded-lg">
            {success}
          </div>
        )}

        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`p-3 w-full text-sm border rounded-lg shadow-sm ${
              error ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter partner's email"
            required
          />
        </div>

        <div className="flex w-full gap-2 justify-between">
          <Button
            type="button"
            onClick={handleCheckUser}
            disabled={isChecking}
            className={`w-full py-3 px-4 text-white rounded-lg transition-all ${
              isChecking
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red hover:bg-hoverRed"
            }`}
          >
            {isChecking ? "Checking..." : "Check Now"}
          </Button>
        </div>
        {existingUser ? (
          <div className="mt-6 p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-2xl border-l-4 border-gray-600">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Matching User Found
            </h2>

            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>ID:</strong> {existingUser.id}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {existingUser.email}
              </p>
              <p className="text-gray-600">
                <strong>Name:</strong> {existingUser.name || "N/A"}
              </p>
            </div>

            <div className="mt-6 space-x-4 flex">
              <Button
                type="submit"
                onClick={() => console.log("Add Partner Clicked")}
                className={`inline-flex items-center justify-center px-6 py-3 text-sm font-medium ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white rounded-full focus:ring-2 focus:ring-indigo-500 transition-all`}
              >
                {isSubmitting ? "Submitting..." : "Add Partner"}
              </Button>

              <Button
                disabled
                type="button"
                onClick={() => console.log("Send Email Invite Clicked")}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-teal-600 rounded-full hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 transition-all"
              >
                <span className="mr-2">Send Email Invite</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-2xl border-l-4 border-gray-600">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No User Found
            </h2>

            <div className="mt-6 space-x-4 flex">
              <Button
                type="button"
                disabled
                onClick={() => console.log("Send Email Invite Clicked")}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-teal-600 rounded-full hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 transition-all"
              >
                <span className="mr-2">Send Email Invite</span>
              </Button>
            </div>
          </div>
        )}
      </form>
    </Card>
  );
}

export function MyPartners({ userData }) {
  return (
    <div className="font-fredoka">
      {userData?.myPartner?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {userData.myPartner.map((partner, index) => (
            <div
              className="flex flex-col p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              key={index}
            >
              <div className="space-y-4">
                <p className="text-lg font-semibold text-gray-800">
                  <strong>ID:</strong> {partner.id}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {partner.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {partner.name || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No Partner added</p>
      )}
    </div>
  );
}

{
  /* <Button
  type="submit"
  disabled={isSubmitting}
  className={`w-full py-3 px-4 text-white rounded-lg transition-all ${
    isSubmitting
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {isSubmitting ? "Submitting..." : "Add Partner"}
</Button>; */
}
