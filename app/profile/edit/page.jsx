"use client";

import { ImageInput } from "@/app/Sections";
import AvatarSelectionForm from "@/app/Sections/Profile/ImageInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcw } from "lucide-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";
const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";

const AvailableDaysForm = ({ userId }) => {
  // Ensure userId is passed as a prop
  const weekdays = ["S", "M", "T", "WE", "Th", "F", "S"];
  const [selectedDays, setSelectedDays] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const updateAvailableDays = async (userId, availableDays) => {
    const mutation = `
          mutation UpdateAvailableDays($id: ID!, $availableDays: [String!]) {
            updateAccount(
              where: { id: $id }
              data: { availableDays: $availableDays }
            ) {
              id
              availableDays
            }
          }
        `;

    const variables = {
      id: userId,
      availableDays,
    };

    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update available days: ${errorText}`);
    }

    const data = await response.json();
    console.log("Updated available days:", data);
    return data.data.updateAccount; // Adjust based on your needs
  };

  const handleToggleDay = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  useEffect(() => {
    const storedDays = localStorage.getItem("selectedDays");
    if (storedDays) {
      setSelectedDays(JSON.parse(storedDays));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedDays.length > 0) {
      try {
        // Store selected days in local storage
        localStorage.setItem("selectedDays", JSON.stringify(selectedDays));

        // Set loading state to true
        setIsLoading(true);

        // Call the mutation to update the user profile
        await updateAvailableDays(userId, selectedDays);

        // Set success message
        setSuccessMessage("Successfully updated available days!");

        // Optionally, you can clear the message after a few seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Failed to update available days:", error);
      } finally {
        // Reset loading state
        setIsLoading(false);
      }
    } else {
      alert("Please select at least one day.");
    }
  };

  return (
    <form
      className="w-full px-4 flex flex-col gap-2 justify-start items-center py-2 rounded-xl bg-white"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex w-full justify-start items-start gap-2 flex-col">
          <div className="text-[#757575] text-[10px] font-normal font-fredoka leading-none">
            Select Dates
          </div>
          <div className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
            Nursery days
          </div>
        </div>
        <Button
          type="submit"
          className={`transition w-fit duration-300 ease-in-out font-fredoka font-bold hover:border-2 hover:border-[#ffffff] px-2 p-2 md:px-4 border-2 rounded-[32px] flex flex-row gap-1 text-[12px] lg:text-[16px] items-center justify-center bg-[#029871] ${
            isLoading ? "" : ""
          }`}
        >
          <RefreshCcw
            className={`w-2 h-2 lg:w-5 lg:h-5 ${
              isLoading ? "animate-spin" : ""
            }`}
          />
          Sync Nursery
        </Button>
      </div>
      <div className="flex w-full gap-2 flow-row">
        {weekdays.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => handleToggleDay(day)}
            className={`w-10 h-10 clarabodyTwo rounded-full p-2 cursor-pointer ${
              selectedDays.includes(day)
                ? "bg-red text-white"
                : "bg-[#F8F8F8] text-[#3f3a64]"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      {/* Success message display */}
      {successMessage && (
        <div className="mt-2 text-green-600 font-medium">{successMessage}</div>
      )}
    </form>
  );
};

export default function ProfileEdit({ userId }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    attendingNursery: false,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/user-profile?userId=${userId}`);
        const data = await response.json();
        setFormData({
          name: data.name,
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          attendingNursery: data.attendingNursery,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default to stop unintended refreshes
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully! It will reflect Shortly");
      } else {
        setMessage(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <head>
        <title>Profile Edit | Kindilearning</title>
        <meta name="description" content="Edit your profile in Kindilearning" />
      </head>
      <section className="w-full pb-24 h-auto bg-[#f5f5f5] flex flex-col md:flex-row items-center justify-center px-0">
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Profile Edit
          </div>
        </div>
        <div className="claracontainer bg-[#f5f5f5] -mt-4 rounded-t-[12px] md:m-12 p-6 w-full flex flex-col gap-8">
          <div className="w-full flex justify-center items-center text-center ">
            <span className="text-[#3f3a64] uppercase claraheading">My </span>
            <span className="text-red uppercase claraheading">Account</span>
          </div>

          <div className="claracontainer lg:px-[144px] flex flex-col gap-8 justify-center items-center">
            <div className="flex w-full justify-center items-center">
              <AvatarSelectionForm accountId={userId} />
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              <div className="claracontainer w-full flex flex-col gap-2">
                <div className="mb-4 py-2 bg-white rounded-lg">
                  <label
                    htmlFor="name"
                    className="block text-[#757575] text-[10px] lg:text-[14px] px-3 font-fredoka"
                  >
                    Name:
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-0 shadow-none focus:ring-0 rounded-b-lg bg-white text-[#000] text-base font-fredoka"
                  />
                </div>

                <div className="flex flex-col lg:flex-row w-full gap-4">
                  <div className="w-full py-2 bg-white rounded-lg flex-col">
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-[#757575] text-[10px] lg:text-[14px] px-3 font-fredoka"
                    >
                      Date of Birth:
                    </label>
                    <Input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full border-0 shadow-none focus:ring-0 rounded-b-lg bg-white text-[#000] text-base font-fredoka"
                    />
                  </div>

                  <div className="w-full py-2 bg-white rounded-lg flex flex-col gap-2">
                    <label className="block text-[#757575] text-[10px] lg:text-[14px] px-3 font-fredoka">
                      Attending Nursery:
                    </label>
                    <div className="w-full flex items-center px-2 gap-1">
                      <Input
                        type="checkbox"
                        id="attendingNursery"
                        name="attendingNursery"
                        checked={formData.attendingNursery}
                        onChange={handleChange}
                        className="w-[20px] h-[20px] rounded-full text-[black] bg-white text-base font-fredoka"
                      />
                      <label
                        htmlFor="attendingNursery"
                        className="block text-[#757575] text-[10px] lg:text-[12px] px-4 font-fredoka"
                      >
                        Check if you are studying in Nursery
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-center items-center">
                  <Button
                    type="submit"
                    className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold w-[200px]"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                </div>
                {message && <p className="mt-4 text-green-600">{message}</p>}
              </div>
            </form>
            <AvailableDaysForm />
          </div>
        </div>
      </section>
    </>
  );
}
