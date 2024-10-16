"use client";

import { ImageInput } from "@/app/Sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

export default async function ProfileEdit({ userId }) {
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
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setMessage("Profile updated successfully!");
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
      <section className="w-full pb-24 h-auto bg-[#eaeaf5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Profile Edit
          </div>
        </div>
        <div className="claracontainer bg-[#eaeaf5] md:bg-[#EAEAF5] -mt-4 rounded-t-[12px] z-2 md:m-12 px-4 py-6 rounded-xl md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
          {/* Top Heading */}
          <div className="w-full  flex justify-center items-center text-center ">
            <span className="text-[#3f3a64] uppercase claraheading">My </span>
            <span className="text-red uppercase claraheading">Account</span>
          </div>

          <div className="claracontainer  lg:px-[144px] flex flex-col gap-8 justify-center items-center">
            <div className="flex w-full justify-center items-center">
              <ImageInput />
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]"
            >
              <div className="claracontainer  w-full flex flex-col overflow-hidden">
                <div className="claracontainer  w-full flex flex-col overflow-hidden gap-2">
                  <h2 className="text-xl font-fredoka font-semibold">
                    Edit Profile
                  </h2>
                  <div className="mb-4 font-fredoka">
                    <label htmlFor="name" className="block font-fredoka mb-1">
                      Name:
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full focus-within:ring-0 focus-within:ring-offset-0 bg-white rounded-lg shadow text-[#757575] text-base font-normal font-fredoka leading-normal"
                    />
                  </div>

                  <div className="flex flex-row w-full justify-between items-center gap-4">
                    <div className="w-full flex flex-col justify-center items-center gap-1">
                      <label
                        htmlFor="dateOfBirth"
                        className="w-full justify-start flex"
                      >
                        Date of Birth:
                      </label>
                      <Input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full flex justify-between focus-within:ring-0 focus-within:ring-offset-0 ring-0 bg-white rounded-lg shadow text-[#757575] text-base font-normal font-fredoka leading-normal"
                      />
                    </div>

                    <div className="flex flex-col w-full justify-start items-start">
                      <div className="w-full flex justify-start items-center gap-1">
                        <Input
                          type="checkbox"
                          id="attendingNursery"
                          name="attendingNursery"
                          checked={formData.attendingNursery}
                          onChange={handleChange}
                          className="w-[20px] h-[20px] focus-within:ring-0 shadow-none focus-within:ring-offset-0 bg-white rounded-lg text-[#757575] text-base font-normal font-fredoka leading-normal"
                        />
                        <label
                          htmlFor="attendingNursery"
                          className="block mb-1"
                        >
                          Attending Nursery:
                        </label>
                      </div>
                      <label className="block  text-[12px] font-fredoka text-start text-[#878787]">
                        Check if your are studing in Nursery
                      </label>
                    </div>
                  </div>
                  <div className="flex w-full justify-center items-center">
                    <Button
                      type="submit"
                      className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold font-['Fredoka'] leading-tight w-[200px] "
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </Button>
                  </div>
                  {message && <p className="mt-4 text-green-600">{message}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
