"use client";

import AvatarSelectionForm from "@/app/Sections/Profile/ImageInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, RefreshCcw, Trash, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// const HYGRAPH_TOKEN =
//   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";
// const HYGRAPH_ENDPOINT =
//   "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";

// const AvailableDaysForm = ({ userId }) => {
//   // Ensure userId is passed as a prop
//   const weekdays = ["S", "M", "T", "WE", "Th", "F", "S"];
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // State to track loading status

//   const updateAvailableDays = async (userId, availableDays) => {
//     const mutation = `
//       mutation UpdateAvailableDays($id: ID!, $availableDays: [String!]) {
//         updateAccount(
//           where: { id: $id }
//           data: { availableDays: $availableDays }
//         ) {
//           id
//           availableDays
//         }
//       }
//     `;

//     const variables = {
//       id: userId,
//       availableDays,
//     };

//     const response = await fetch(HYGRAPH_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${HYGRAPH_TOKEN}`,
//       },
//       body: JSON.stringify({ query: mutation, variables }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to update available days: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log("Updated available days:", data);
//     return data.data.updateAccount; // Adjust based on your needs
//   };

//   const handleToggleDay = (day) => {
//     setSelectedDays((prev) => {
//       if (prev.includes(day)) {
//         return prev.filter((d) => d !== day);
//       } else {
//         return [...prev, day];
//       }
//     });
//   };

//   useEffect(() => {
//     const storedDays = localStorage.getItem("selectedDays");
//     if (storedDays) {
//       setSelectedDays(JSON.parse(storedDays));
//     }
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (selectedDays.length > 0) {
//       try {
//         // Store selected days in local storage
//         localStorage.setItem("selectedDays", JSON.stringify(selectedDays));

//         // Set loading state to true
//         setIsLoading(true);

//         // Call the mutation to update the user profile
//         await updateAvailableDays(userId, selectedDays);

//         // Set success message
//         setSuccessMessage("Successfully updated available days!");

//         // Optionally, you can clear the message after a few seconds
//         setTimeout(() => setSuccessMessage(""), 3000);
//       } catch (error) {
//         console.error("Failed to update available days:", error);
//       } finally {
//         // Reset loading state
//         setIsLoading(false);
//       }
//     } else {
//       alert("Please select at least one day.");
//     }
//   };

//   return (
//     <form
//       className="w-full px-4 flex flex-col gap-2 justify-start items-center py-2 rounded-xl bg-white"
//       onSubmit={handleSubmit}
//     >
//       <div className="flex w-full justify-between items-center">
//         <div className="flex w-full justify-start items-start gap-2 flex-col">
//           <div className="text-[#757575] text-[10px] font-normal font-fredoka leading-none">
//             Select Dates
//           </div>
//           <div className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
//             Nursery days
//           </div>
//         </div>
//         <Button
//           type="submit"
//           className={`transition w-fit duration-300 ease-in-out font-fredoka font-bold hover:border-2 hover:border-[#ffffff] px-2 p-2 md:px-4 border-2 rounded-[32px] flex flex-row gap-1 text-[12px] lg:text-[16px] items-center justify-center bg-[#029871] ${
//             isLoading ? "" : ""
//           }`}
//         >
//           <RefreshCcw
//             className={`w-2 h-2 lg:w-5 lg:h-5 ${
//               isLoading ? "animate-spin" : ""
//             }`}
//           />
//           Sync Nursery
//         </Button>
//       </div>
//       <div className="flex w-full gap-2 flow-row">
//         {weekdays.map((day) => (
//           <button
//             key={day}
//             type="button"
//             onClick={() => handleToggleDay(day)}
//             className={`w-10 h-10 clarabodyTwo rounded-full p-2 cursor-pointer ${
//               selectedDays.includes(day)
//                 ? "bg-red text-white"
//                 : "bg-[#F8F8F8] text-[#3f3a64]"
//             }`}
//           >
//             {day}
//           </button>
//         ))}
//       </div>
//       {/* Success message display */}
//       {successMessage && (
//         <div className="mt-2 text-green-600 font-medium">{successMessage}</div>
//       )}
//     </form>
//   );
// };

export default function ProfileEdit() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [kidsData, setKidsData] = useState([]);
  const [myLevels, setMyLevels] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        return;
      }

      try {
        // Fetch user data
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/users/me?populate=*",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUserData(data);

        // console.log("userData on profile Edit Page", userData.myKids);
        // Fetch kids data
        const kidsResponse = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/kids?populate=*"
        );
        const kidsData = await kidsResponse.json();
        setKidsData(kidsData.data);

        // Filter kids based on user data's myKids documentIds
        if (data.myKids && data.myKids.length > 0) {
          const kidDocumentIds = data.myKids.map((kid) => kid.documentId);

          // Loop through kidsData and calculate lengths of 'myActivities'
          let totalActivitiesLength = 0;

          kidDocumentIds.forEach((kidId) => {
            const kid = kidsData.data.find((k) => k.documentId === kidId);
            if (kid) {
              const activitiesLength = kid.myActivities.length;
              console.log(
                `Kid ${kid.Name} has ${activitiesLength} activities.`
              );
              totalActivitiesLength += activitiesLength;
            }
          });
          setMyLevels(totalActivitiesLength);

          console.log(`Total Activities Length: ${totalActivitiesLength}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter for even index entries
  const filterEvenEntries = (arr) => arr.filter((_, index) => index % 2 === 0);

  console.log("Fetched user details", userData);
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <head>
        <title>Profile Edit | Kindilearning</title>
        <meta name="description" content="Edit your profile in Kindilearning" />
      </head>
      <section className="w-full font-fredoka pb-24 h-auto bg-[#f5f5f5] flex flex-col md:flex-row items-center justify-center px-0">
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

          <div className="claracontainer lg:px-[24px] flex flex-col gap-8 justify-center items-center">
            <div className="flex w-full justify-center items-center">
              {/* <AvatarSelectionForm /> */}
            </div>

            <UpdateRawProfile />

            {/* My Kids Section */}
            <div className="w-full ">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-2xl font-medium mb-4">My Kids</h3>
                {userData && (
                  <Dialog>
                    <DialogTrigger className="claraButton">
                      Add new kid
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-[800px] max-h-[600px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogDescription>
                          <AddKidForm parentId={userData.id} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              {userData?.myKids?.length > 0 ? (
                <div className="grid w-full font-fredoka grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterEvenEntries(userData.myKids).map((kid, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between">
                        <Dialog>
                          <DialogTrigger>
                            <Pencil className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
                            <DialogHeader>
                              <DialogTitle>Update Kid</DialogTitle>
                              <DialogDescription>
                                <UpdateKidForm
                                  kidId={kid.documentId}
                                  parentId={userData.id}
                                />
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <RemoveKidButton
                          kidId={kid.documentId}
                          parentId={userData.id}
                          className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {kid.Name}
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium text-gray-800">
                              Age:
                            </span>{" "}
                            {kid.Age}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">
                              DOB:
                            </span>{" "}
                            {kid.dob}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">
                              Gender:
                            </span>{" "}
                            {kid.Gender === "M" ? "Male" : "Female"}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">
                              Attending Nursery:
                            </span>{" "}
                            {kid.AttendingNursury ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No kids data available.</p>
              )}
            </div>

            {/* My Partners Section */}
            <div className="w-full">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-2xl font-medium mb-4">My Partners</h3>
                {userData && (
                  <Dialog>
                    <DialogTrigger className="claraButton">
                      Add New Partners
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-[800px] max-h-[600px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogDescription>
                          <AddPaymentMethodForm parentId={userData.id} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              {userData?.myPartner?.length > 0 ? (
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterEvenEntries(userData.myPartner).map(
                    (partner, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
                      >
                        {/* Card Content */}
                        <h4 className="text-lg font-bold mb-2">
                          {partner.Name}
                        </h4>
                        <p>id: {partner.id}</p>
                        <p>Email: {partner.email}</p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No partners data available.</p>
              )}
            </div>

            {/* Payment Methods Section */}
            <div className="w-full">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-2xl font-medium mb-4">
                  My Payment Methods
                </h3>
                {userData && (
                  <Dialog>
                    <DialogTrigger className="claraButton">
                      Add New Payment Method
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-[800px] max-h-[600px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogDescription>
                          <AddPaymentMethodForm parentId={userData.id} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              {userData?.myPaymentMethods?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterEvenEntries(userData.myPaymentMethods).map(
                    (payment, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
                      >
                        {/* Card Header */}
                        <div className="flex items-center justify-between">
                          <Dialog>
                            <DialogTrigger>
                              <Pencil className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer" />
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update Kid</DialogTitle>
                                <DialogDescription>
                                  <UpdatePaymentDataForm
                                    paymentId={payment.documentId}
                                    parentId={userData.id}
                                  />
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                          <RemovePaymentMethodButton
                            paymentId={payment.documentId}
                            className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                          />
                        </div>
                        <h4 className="text-lg font-bold mb-2">
                          {payment.Name}
                        </h4>
                        <p>Card Number: {payment.Number}</p>
                        <p>Expiry: {payment.expiryDate}</p>
                        <p>CVV: {payment.CVV}</p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-500">
                  No payment methods data available.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function UpdateRawProfile() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [myKids, setMyKids] = useState([]); // Existing kids data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setError("Please log in to continue.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data.");
        const data = await response.json();

        if (data) {
          setUsername(data.username || "");
          setUserData(data);
          setName(data.Name || "");
          setEmail(data.email || "");
          setMyKids(data.myKids || []); // Load existing kids data
          setUserId(data.id); // Store the user ID
        } else {
          setError("Unable to fetch current data.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Token retrieval utility
  const getToken = () => localStorage.getItem("jwt");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      username: username,
      Name: name,
      email: email,
      // myKids: myKids, // Include updated kids
    };
    const token = getToken();
    // const token = localStorage.getItem("jwt");
    if (!token) {
      setError("You need to be logged in to update your profile.");
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
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile: " + result?.error?.message);
      }
    } catch (err) {
      alert("Error submitting form: " + err.message);
    }
  };

  if (loading) return <div>Loading current data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="claraContainer w-full font-fredoka py-12">
      <h2 className="text-3xl font-medium mb-8">Update Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto font-fredoka bg-white rounded-lg p-4 space-y-6"
      >
        <div className="claracontainer w-full flex flex-col gap-2">
          <div className="py-2 w-full bg-white rounded-lg">
            <label className="block text-[#757575] text-[10px] lg:text-[14px] px-3 font-fredoka">
              Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-none ring-offset-0  focus-visible:ring-0  border-0 focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="w-full justify-between gap-2 items-center  flex">
            <div className="w-full py-2 bg-white rounded-lg">
              <label className="block text-[#757575] text-[10px] lg:text-[14px] px-3 font-fredoka">
                Username{" "}
                <span className="text-red text-[12px]">
                  (Can&apos;t Update Username)
                </span>
              </label>
              <Input
                type="text"
                disabled
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-none ring-offset-0  focus-visible:ring-0  border-0 focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
                placeholder="Enter Username"
                required
              />
            </div>
            <div className="w-full py-2 bg-white rounded-lg">
              <label className="block text-[#757575] text-[10px] lg:text-[14px] px-3 font-fredoka">
                Email{" "}
                <span className="text-red text-[12px]">
                  (Can&apos;t Update Email)
                </span>{" "}
              </label>
              <Input
                type="email"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-none ring-offset-0  focus-visible:ring-0  border-0 focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold w-[200px]"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </div>
        {error && <p className="mt-4 text-red">{error}</p>}
      </form>
    </div>
  );
}

const AddKidForm = ({ parentId }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [attendingNursery, setAttendingNursery] = useState(false);
  const [gender, setGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare the payload
    const newKid = {
      data: {
        Name: name,
        Age: age,
        dob: dob,
        AttendingNursury: attendingNursery,
        Gender: gender,
        myParent: [
          { id: parentId }, // Sending the parent ID in the payload
        ],
      },
    };

    console.log("New Kid data", newKid);

    try {
      const response = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/kids",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newKid),
        }
      );

      const data = await response.json();
      console.log("Payload sent", data);

      if (response.ok) {
        setName("");
        setAge("");
        setDob("");
        setAttendingNursery(false);
        setGender("");
      } else {
        setError(data.error?.message || "Error adding kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-full font-fredoka bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Add Kid Profile
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="claracontainer w-full flex flex-col gap-2">
          <div className="w-full gap-1 py-2 bg-white rounded-lg">
            <label htmlFor="name" className="block">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
            />
          </div>

          <div className="w-full gap-1 py-2 bg-white rounded-lg">
            <label htmlFor="age" className="block">
              Age
            </label>
            <Input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
            />
          </div>

          <div className="w-full gap-1 py-2 bg-white rounded-lg">
            <label htmlFor="dob" className="block">
              Date of Birth
            </label>
            <Input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
            />
          </div>
          <div className="w-full justify-between gap-2 items-center  flex">
            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="attendingNursery" className="block">
                Attending Nursery
              </label>
              <Input
                type="checkbox"
                id="attendingNursery"
                name="attendingNursery"
                checked={attendingNursery}
                onChange={(e) => setAttendingNursery(e.target.checked)}
                className="w-[20px] h-[20px] rounded-none ring-offset-0  focus-visible:ring-0  border-0 focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
              />
            </div>

            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="gender" className="block">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full rounded-none ring-offset-0  focus-visible:ring-0  border-0 focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold w-[200px]"
        >
          {isSubmitting ? "Adding..." : "Add Kid"}
        </Button>
      </form>
    </div>
  );
};

const UpdateKidForm = ({ parentId, kidId }) => {
  // Managing individual states for the kid's data
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [dp, setDP] = useState(null); // Store the selected media
  const [attendingNursery, setAttendingNursery] = useState(false);
  const [gender, setGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mediaList, setMediaList] = useState([]); // Store the media list fetched from the server

  // Fetch media data from the server
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/upload/files"
        );
        const data = await response.json();

        // Filter media with ids between 159 and 169
        const filteredMedia = data.filter(
          (item) => item.id >= 159 && item.id <= 169
        );
        setMediaList(filteredMedia); // Update the state with the filtered media
      } catch (err) {
        setError("An error occurred while fetching media files");
      }
    };

    fetchMedia();
  }, []);

  // Fetch existing kid's data when component mounts
  useEffect(() => {
    const fetchKidData = async () => {
      try {
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}`
        );
        const data = await response.json();
        if (response.ok) {
          const kid = data.data;
          setName(kid.Name || "");
          setAge(kid.Age || "");
          setDob(kid.dob || "");
          setAttendingNursery(kid.AttendingNursury || false);
          setGender(kid.Gender || "");
          setDP(kid.kidDP || null); // Set existing media if available
        } else {
          setError("Failed to fetch kid data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      }
    };

    fetchKidData();
  }, [kidId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare the updated payload
    const updatedKid = {
      data: {
        Name: name,
        Age: age,
        dob: dob,
        AttendingNursury: attendingNursery,
        Gender: gender,
        kidDP: dp?.id || null, // Include the media id if available
        myParent: [
          { id: parentId }, // Ensure we keep the parent's reference
        ],
      },
    };

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedKid),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Reset form fields after successful update
        setName("");
        setAge("");
        setDob("");
        setDP(null); // Reset media
        setAttendingNursery(false);
        setGender("");
      } else {
        setError(data.error?.message || "Error updating kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleMediaSelect = (selectedMedia) => {
    setDP(selectedMedia); // Store the selected media object
  };
  return (
    <div className="max-w-full font-fredoka bg-white rounded-lg">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="claracontainer w-full flex flex-col gap-2">
          <div>
            <label>Media:</label>
            <div className="mt-4 flex gap-4">
              {mediaList.length === 0 ? (
                <p>Loading media...</p>
              ) : (
                mediaList.map((media) => (
                  <div
                    key={media.id}
                    className={`cursor-pointer min-w-16 min-h-16 w-12 h-12 p-2 rounded-lg border-2 ${
                      dp?.id === media.id
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleMediaSelect(media)}
                  >
                    <img
                      src={`https://lionfish-app-98urn.ondigitalocean.app${media.url}`}
                      // src={media.url}
                      alt={media.name}
                      className="min-w-12 min-h-12 w-12 h-12 object-cover rounded-full"
                    />
                    {/* <p className="text-center mt-2">{media.name}</p> */}
                  </div>
                ))
              )}
            </div>
          </div>

          {dp && (
            <div className="mt-4">
              <p>Selected Media:</p>
              <img
                src={`https://lionfish-app-98urn.ondigitalocean.app${dp.url}`}
                alt={dp.name}
                className="w-32 h-32 object-cover"
              />
              <p>{dp.name}</p>
            </div>
          )}

          <div className="w-full gap-1 py-2 bg-white rounded-lg">
            <label htmlFor="name" className="block">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
            />
          </div>

          <div className="flex w-full justify-between gap-2">
            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="age" className="block">
                Age
              </label>
              <Input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
              />
            </div>
            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="dob" className="block">
                Date of Birth
              </label>
              <Input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="input"
              />
            </div>
          </div>
          <div className="flex w-full justify-between gap-2">
            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="attendingNursery" className="block">
                Attending Nursery
              </label>
              <Input
                type="checkbox"
                id="attendingNursery"
                name="attendingNursery"
                checked={attendingNursery}
                onChange={(e) => setAttendingNursery(e.target.checked)}
                className="input"
              />
            </div>
            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="gender" className="block">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="input"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold w-[200px]"
        >
          {isSubmitting ? "Updating..." : "Update Kid"}
        </Button>
      </form>
    </div>
  );
};

const RemoveKidButton = ({ kidId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle Remove Kid logic
  const handleRemoveKid = async () => {
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    // Prepare the updated payload to remove the parent reference
    const updatedKid = {
      data: {
        myParent: [
          // We are setting the parent field to null or to another parentId
          { id: 19 }, // Setting parent ID to null, or you can use another parent ID
        ],
      },
    };

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedKid),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true); // Kid is successfully removed from the current parent
        setOpenDialog(false); // Close dialog after success
      } else {
        setError(data.error?.message || "Error removing kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-fredoka">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Kid removed successfully!</p>}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button className="btn text-red-500" disabled={isSubmitting}>
            {isSubmitting ? (
              "Removing..."
            ) : (
              <Trash2Icon className="text-[#6a6a6a] duration-200 hover:text-black" />
            )}
          </button>
        </DialogTrigger>

        <DialogContent className="font-fredoka">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will remove the kid from your
              profile.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-end space-x-2">
            <DialogClose asChild className="btn-secondary">
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              className="btn-danger text-white bg-red"
              onClick={handleRemoveKid}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Removing..." : "Confirm Remove"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AddPaymentMethodForm = ({ parentId }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [expiryDate, setExpiryDate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare the payload
    const newKid = {
      data: {
        Name: name,
        Number: number,
        ExpiryDate: expiryDate,
        CVV: cvv,
        myUsers: [
          { id: parentId }, // Sending the parent ID in the payload
        ],
      },
    };

    console.log("New Kid data", newKid);

    try {
      const response = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/payment-methods",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newKid),
        }
      );

      const data = await response.json();
      console.log("Payload sent", data);

      if (response.ok) {
        setName("");
        setCVV("");
        setExpiryDate("");
        setNumber(false);
      } else {
        setError(data.error?.message || "Error adding kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-fredoka">
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="claracontainer w-full flex flex-col gap-2">
          <div className="w-full gap-1 py-2 bg-white rounded-lg">
            <label htmlFor="name" className="block">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
            />
          </div>

          <div className="w-full gap-1 py-2 bg-white rounded-lg">
            <label htmlFor="number" className="block">
              Number
            </label>
            <Input
              type="number"
              id="number"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
            />
          </div>

          <div className="flex w-full justify-between items-center">
            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="expiryDate" className="block">
                ExpiryDate
              </label>
              <Input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
              />
            </div>

            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="cvv" className="block">
                CVV
              </label>
              <Input
                type="number"
                id="cvv"
                name="cvv"
                checked={cvv}
                onChange={(e) => setCVV(e.target.value)}
                className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold w-[200px]"
        >
          {isSubmitting ? "Adding..." : "Add Payment Method"}
        </Button>
      </form>
    </div>
  );
};

const UpdatePaymentDataForm = ({ parentId, paymentId }) => {
  // Managing individual states for the kid's data
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [expiryDate, setExpiryDate] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing kid's data when component mounts
  useEffect(() => {
    const fetchKidData = async () => {
      try {
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/payment-methods/${paymentId}`
        );
        const data = await response.json();
        if (response.ok) {
          const paymentData = data.data;
          setName(paymentData.Name || "");
          setCVV(paymentData.CVV || "");
          setExpiryDate(paymentData.ExpiryDate || "");
          setNumber(paymentData.Number || false);
        } else {
          setError("Failed to fetch kid data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      }
    };

    fetchKidData();
  }, [paymentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare the updated payload
    const updatedpaymentData = {
      data: {
        Name: name,
        Number: number,
        ExpiryDate: expiryDate,
        CVV: cvv,
        myUsers: [
          { id: parentId }, // Sending the parent ID in the payload
        ],
      },
    };

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/payment-methods/${paymentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedpaymentData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Reset form fields after successful update
        setName("");
        setCVV("");
        setExpiryDate("");
        setName(false);
      } else {
        setError(data.error?.message || "Error updating kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-fredoka">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="claracontainer w-full flex flex-col gap-2">
          <div className="w-full gap-1 py-2 bg-white rounded-lg">
            <label htmlFor="name" className="block">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
            />
          </div>

          <div className="w-full gap-1 py-2 bg-white rounded-lg">
            <label htmlFor="number" className="block">
              Number
            </label>
            <Input
              type="number"
              id="number"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="expiryDate" className="block">
                Expiry
              </label>
              <Input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
              />
            </div>

            <div className="w-full gap-1 py-2 bg-white rounded-lg">
              <label htmlFor="cvv" className="block">
                CVV
              </label>
              <Input
                type="number"
                id="cvv"
                name="cvv"
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
                required
                className="w-full rounded-lg focus-visible:scale-100 shadow-none border-transparent bg-white text-gray-500 text-base font-fredoka focus:text-black focus:ring-0 focus:outline-none transition-colors duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn">
          {isSubmitting ? "Updating..." : "Update Payment Method"}
        </button>
      </form>
    </div>
  );
};

const RemovePaymentMethodButton = ({ paymentId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle Remove Kid logic
  const handleRemoveKid = async () => {
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    // Prepare the updated payload to remove the parent reference
    const updatedKid = {
      data: {
        myUsers: [
          // We are setting the parent field to null or to another parentId
          { id: 19 }, // Setting parent ID to null, or you can use another parent ID
        ],
      },
    };

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/payment-methods/${paymentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedKid),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true); // Kid is successfully removed from the current parent
        setOpenDialog(false); // Close dialog after success
      } else {
        setError(data.error?.message || "Error removing Payment Method");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-fredoka">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Removed Successfully!</p>}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button className="btn text-red-500" disabled={isSubmitting}>
            {isSubmitting ? (
              "Removing..."
            ) : (
              <Trash2Icon className="text-[#6a6a6a] duration-200 hover:text-black" />
            )}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will remove the kid from your
              profile.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end space-x-2">
            <DialogClose asChild className="btn-secondary">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className="btn-danger text-white bg-red"
              onClick={handleRemoveKid}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Removing..." : "Confirm Remove"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
