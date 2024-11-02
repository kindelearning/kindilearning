// import { ProfileSection } from "../Sections";

// export default function ProfilePage() {
//   return (
//     <>
//       <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
//         <ProfileSection />
//       </section>
//     </>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../lib/useAuth";
import { getUserDataByEmail } from "@/lib/hygraph";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect to login if not authenticated
    }

    if (user && user.email) {
      // Fetch Hygraph user data based on Firebase user's email
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 flex flex-col claracontainer pb-24">
      {user ? (
        <>
          <h1>Welcome, {hygraphUser?.name || "User"}!</h1>
          <p>Email: {user.email}</p>
          <p>Username: {hygraphUser?.username || "Not set"}</p>
          <p>Hygraph ID: {hygraphUser?.id}</p>
          {hygraphUser?.profilePicture?.url && (
            <img
              src={hygraphUser.profilePicture.url}
              alt="Profile Picture"
              className="w-20 h-20 rounded-full"
            />
          )}
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 clarabutton text-[#000000] px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
