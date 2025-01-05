"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "../api";
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
import { Condiment } from "next/font/google";
import MyLevel from "../Sections/MyLevel";

export default function RawProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        return;
      }

      try {
        const data = await fetchUserDetails(token);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  console.log("Fetched user details", userData);
  if (loading) return <p>Loading...</p>;

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="claracontainer max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        {userData && (
          <Dialog>
            <DialogTrigger>add new kid</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  <AddKidForm parentId={userData.id} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}

        {/* <UpdateRawProfile /> */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          User Profile
        </h1>
        {/* <MyLevel /> */}

        {/* <Dialog>
          <DialogTrigger className="text-purple">Invite a new Partner</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                <InvitePartnerForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}

        {userData && (
          <div className="space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-medium">Username:</h2>
                <p>{userData.username}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Name:</h2>
                <p>{userData.Name}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Email:</h2>
                <p>{userData.email}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Provider:</h2>
                <p>{userData.provider}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Premium Status:</h2>
                <p>{userData.isPremium ? "Yes" : "No"}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Blocked:</h2>
                <p>{userData.blocked ? "Yes" : "No"}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Confirmed:</h2>
                <p>{userData.confirmed ? "Yes" : "No"}</p>
              </div>
            </div>

            {/* Profile Picture */}
            {userData.profilepic && (
              <div className="text-center">
                <img
                  src={`https://proper-fun-404805c7d9.strapiapp.com${userData.profilepic.url}`}
                  alt="Profile Picture"
                  className="w-32 h-32 rounded-full mx-auto"
                />
              </div>
            )}

            {/* Kids Profiles */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Kids Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.myKids && userData.myKids.length > 0 ? (
                  userData.myKids.map((kid, index) => {
                    if (index % 2 === 0) {
                      return (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg shadow-sm"
                        >
                          <Dialog>
                            <DialogTrigger>Update kid</DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Are you absolutely sure?
                                </DialogTitle>
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
                          />
                          <p>
                            <strong>Id:</strong> {kid.id}
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
                          <UpdateKidButton
                            kidDocumentId={kid.documentId} // Pass the kid's documentId
                            activityId="70" // Pass the activity ID to associate with the kid
                            parentId={userData.id} // Pass the parent's ID
                          />
                        </div>
                      );
                    }
                    return null; // Return null if the kid is at an odd index
                  })
                ) : (
                  <p>No kids profiles available.</p>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <Dialog>
                <DialogTrigger>create Payment Method</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      <AddPaymentMethodForm parentId={userData.id} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <h3 className="text-xl font-semibold mb-4">payment-methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.myPaymentMethods &&
                userData.myPaymentMethods.length > 0 ? (
                  userData.myPaymentMethods.map((payment, index) => {
                    // Only render payment methods at even index (0, 2, 4, ...)
                    if (index % 2 === 0) {
                      return (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg shadow-sm"
                        >
                          <Dialog>
                            <DialogTrigger className="text-[blue]">
                              Update Payment Method
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Are you absolutely sure?
                                </DialogTitle>
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
                          />
                          <p>
                            <strong>Id:</strong> {payment.id}
                          </p>
                          <p>
                            <strong>Name:</strong> {payment.Name}
                          </p>
                          <p>
                            <strong>Number:</strong> {payment.Number}
                          </p>
                          <p>
                            <strong>ExpiryDate:</strong> {payment.ExpiryDate}
                          </p>
                          <p>
                            <strong>CVV:</strong> {payment.CVV}
                          </p>
                        </div>
                      );
                    }
                    return null; // Return null if the payment method is at an odd index
                  })
                ) : (
                  <p>No PaymentMethods available.</p>
                )}
              </div>
            </div>
            {/* Partners */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Partners {}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.myPartner && userData.myPartner.length > 0 ? (
                  userData.myPartner.map((partner, index) => {
                    // Only render partners at even index (0, 2, 4, ...)
                    if (index % 2 === 0) {
                      return (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg shadow-sm"
                        >
                          <p>
                            <strong>Name:</strong> {partner.Name}
                          </p>
                          <p>
                            <strong>Email:</strong> {partner.email}
                          </p>
                        </div>
                      );
                    }
                    return null; // Return null if the partner is at an odd index
                  })
                ) : (
                  <p>No partner profiles available.</p>
                )}
              </div>
            </div>

            {/* Logout */}
            <div className="text-center">
              <button
                onClick={() => router.push("/auth/sign-out")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setError("Please log in to continue.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data) {
          setUsername(data.username || "");
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

  const handleUpdateKid = (index, field, value) => {
    const updatedKids = [...myKids];
    updatedKids[index][field] = value;
    setMyKids(updatedKids);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      username: username,
      Name: name,
      email: email,
      myKids: myKids, // Include updated kids
    };

    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("You need to be logged in to update your profile.");
      return;
    }

    try {
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/users/${userId}`,
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
    <div className="container mx-auto font-fredoka px-8 py-12">
      <h2 className="text-3xl font-medium mb-8">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Username"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Email"
            required
          />
        </div>

        <h3 className="text-xl font-medium mt-6">My Kids</h3>
        {myKids.map((kid, index) => (
          <div key={index} className="border p-4 rounded-md mb-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={kid.Name}
                onChange={(e) => handleUpdateKid(index, "Name", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter Kid's Name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                value={kid.age}
                onChange={(e) => handleUpdateKid(index, "age", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter Kid's Age"
              />
            </div>
            <div>
              <label className="block text-gray-700">Gender</label>
              <input
                type="text"
                value={kid.Gender}
                onChange={(e) =>
                  handleUpdateKid(index, "Gender", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter Kid's Gender"
              />
            </div>
            <div>
              <label className="block text-gray-700">Attending Nursery</label>
              <input
                type="checkbox"
                checked={kid.AttendingNursury}
                onChange={(e) =>
                  handleUpdateKid(index, "AttendingNursury", e.target.checked)
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={kid.dob}
                onChange={(e) => handleUpdateKid(index, "dob", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}

        <div>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

const AddKidForm = ({ parentId }) => {
  // Managing individual states
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
      const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/kids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newKid),
      });

      const data = await response.json();
      console.log("Payload sent", data);

      if (response.ok) {
        // Trigger callback after successful creation
        // onKidAdded(data);
        // Reset form fields
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="age" className="block">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="dob" className="block">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="attendingNursery" className="block">
          Attending Nursery
        </label>
        <input
          type="checkbox"
          id="attendingNursery"
          name="attendingNursery"
          checked={attendingNursery}
          onChange={(e) => setAttendingNursery(e.target.checked)}
          className="input"
        />
      </div>

      <div>
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

      <button type="submit" disabled={isSubmitting} className="btn">
        {isSubmitting ? "Adding..." : "Add Kid"}
      </button>
    </form>
  );
};

const UpdateKidForm = ({ parentId, kidId }) => {
  // Managing individual states for the kid's data
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [attendingNursery, setAttendingNursery] = useState(false);
  const [gender, setGender] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing kid's data when component mounts
  useEffect(() => {
    const fetchKidData = async () => {
      try {
        const response = await fetch(`https://proper-fun-404805c7d9.strapiapp.com/api/kids/${kidId}`);
        const data = await response.json();
        if (response.ok) {
          const kid = data.data;
          setName(kid.Name || "");
          setAge(kid.Age || "");
          setDob(kid.dob || "");
          setAttendingNursery(kid.AttendingNursury || false);
          setGender(kid.Gender || "");
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
        myParent: [
          { id: parentId }, // Ensure we keep the parent's reference
        ],
      },
    };

    try {
      const response = await fetch(`https://proper-fun-404805c7d9.strapiapp.com/api/kids/${kidId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedKid),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form fields after successful update
        setName("");
        setAge("");
        setDob("");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="age" className="block">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="dob" className="block">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="attendingNursery" className="block">
          Attending Nursery
        </label>
        <input
          type="checkbox"
          id="attendingNursery"
          name="attendingNursery"
          checked={attendingNursery}
          onChange={(e) => setAttendingNursery(e.target.checked)}
          className="input"
        />
      </div>

      <div>
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

      <button type="submit" disabled={isSubmitting} className="btn">
        {isSubmitting ? "Updating..." : "Update Kid"}
      </button>
    </form>
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
      const response = await fetch(`https://proper-fun-404805c7d9.strapiapp.com/api/kids/${kidId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedKid),
      });

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
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Kid removed successfully!</p>}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button className="btn text-red-500" disabled={isSubmitting}>
            {isSubmitting ? "Removing..." : "Remove Kid"}
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
              <button>Cancel</button>
            </DialogClose>

            <button
              className="btn-danger"
              onClick={handleRemoveKid}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Removing..." : "Confirm Remove"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const UpdateKidButton = ({ kidDocumentId, activityId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/kids/${kidDocumentId}?populate=*`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Assuming token is stored in localStorage
          },
          body: JSON.stringify({
            data: {
              myActivities: [
                {
                  id: activityId,
                },
              ],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update kid's data.");
      }

      const data = await response.json();
      // On success, set success state to true
      setSuccess(true);
      console.log("Kid's data updated successfully:", data);
    } catch (error) {
      setError(error.message || "An error occurred while updating the data.");
      console.error("Error updating kid's data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Updating..." : "Update Kid's Activity"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">
          Kid's activity updated successfully!
        </p>
      )}
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
        "https://proper-fun-404805c7d9.strapiapp.com/api/payment-methods",
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="number" className="block">
          number
        </label>
        <input
          type="number"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="expiryDate" className="block">
          expiryDate
        </label>
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="cvv" className="block">
          cvv
        </label>
        <input
          type="number"
          id="cvv"
          name="cvv"
          checked={cvv}
          onChange={(e) => setCVV(e.target.value)}
          className="input"
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn">
        {isSubmitting ? "Adding..." : "Add Kid"}
      </button>
    </form>
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
          `https://proper-fun-404805c7d9.strapiapp.com/api/payment-methods/${paymentId}`
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
        `https://proper-fun-404805c7d9.strapiapp.com/api/payment-methods/${paymentId}`,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="number" className="block">
          Number
        </label>
        <input
          type="number"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="expiryDate" className="block">
          Expiry
        </label>
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="number"
          id="cvv"
          name="cvv"
          value={cvv}
          onChange={(e) => setCVV(e.target.value)}
          required
          className="input"
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn">
        {isSubmitting ? "Updating..." : "Update Kid"}
      </button>
    </form>
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
        `https://proper-fun-404805c7d9.strapiapp.com/api/payment-methods/${paymentId}`,
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
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Kid removed successfully!</p>}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button className="btn text-red-500" disabled={isSubmitting}>
            {isSubmitting ? "Removing..." : "Remove Thsi method"}
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
              <button>Cancel</button>
            </DialogClose>

            <button
              className="btn-danger"
              onClick={handleRemoveKid}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Removing..." : "Confirm Remove"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const InvitePartnerForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      // Fetch the user by email
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/users?filters[email][$eq]=${email}`
      );
      const data = await response.json();
      console.log("User search response:", data); // Debugging line

      if (response.ok && data.data.length > 0) {
        const invitedUserId = data.data[0].id;
        console.log("Invited user ID:", invitedUserId); // Debugging line

        // Prepare the payload with the inviter's user ID (in this case, use "me" API to get it)
        const currentUserResponse = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/users/me"
        );
        const currentUserData = await currentUserResponse.json();
        const inviterId = currentUserData.id;
        console.log("Current user data:", currentUserData); // Debugging line

        // Send the invitation by updating the inviter's `myPartner` field
        const updateResponse = await fetch(
          `https://proper-fun-404805c7d9.strapiapp.com/api/users/${inviterId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                myPartner: [
                  ...currentUserData.myPartner,
                  { id: invitedUserId },
                ],
              },
            }),
          }
        );

        if (updateResponse.ok) {
          setMessage("Partner invited successfully!");
        } else {
          setError("Failed to invite the partner.");
          console.error("Update user failed:", await updateResponse.json()); // Debugging line
        }
      } else {
        setError("No user found with this email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error occurred:", err); // Debugging line
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleInvite} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <div>
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn">
        {isSubmitting ? "Inviting..." : "Invite Partner"}
      </button>
    </form>
  );
};
