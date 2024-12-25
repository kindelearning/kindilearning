"use client";

import { useRouter } from "next/navigation";
import ProfileSegments from "../Sections/Profile/ProfileSegments";
import { useEffect, useState } from "react";
import { fetchUserDetails } from "./api";

// export default function ProfilePage() {
//   return (
//     <>
//       <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
//         <ProfileSegments />
//       </section>
//     </>
//   );
// }
export default function ProfilePage() {
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
    <div className="profile-container">
      <h1>User Profile</h1>
      {userData && (
        <>
          <div>
            <h2>{userData.username}</h2>
            <p>{userData.email}</p>

            {userData.profilepic?.url && (
              <img
                src={userData.profilepic.url}
                alt="Profile Picture"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            )}

            <button onClick={() => router.push("/auth/sign-out")}>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
