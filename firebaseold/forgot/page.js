"use client";

// components/ForgotPassword.js
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      // URL you want to redirect back to after password reset
      url: "http://localhost:3000/firebase/reset",
      handleCodeInApp: true, // This must be true for the continue URL to work
    };

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setMessage("Password reset email sent! Check your inbox.");
      setError(""); // Clear error if successful
    } catch (error) {
      setError(error.message);
      console.error("Error sending password reset email:", error.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <button type="submit">Send Password Reset Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
