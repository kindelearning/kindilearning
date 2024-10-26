"use client";

import { auth } from "@/lib/firebaseConfig";
import { useUser } from "@/lib/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  // const { user, emailVerified } = useUser(); // Accessing both user and emailVerified

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  if (!user) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Name:</strong> {user.displayName || "No display name"}
      </p>
      <p>
        <strong>Profile Picture:</strong>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            style={{ width: 50, height: 50 }}
          />
        ) : (
          "No profile picture"
        )}
      </p>
    </div>
  );
};

export default Profile;
