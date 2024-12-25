"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "../api";
import { VerifiedIcon } from "@/public/Images";
import Image from "next/image";

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
        router.push("/oAuth/signin"); // Redirect to login if there's an error fetching user data
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
        router.push("/oAuth/signin"); // Redirect to login if there's an error fetching user data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
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
