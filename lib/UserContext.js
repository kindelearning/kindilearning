"use client";

// lib/UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmailVerified(user.emailVerified);
      } else {
        setUser(null);
        setEmailVerified(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, emailVerified }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);

  // Ensure context is not null
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context; // Now returns { user, emailVerified }
};
