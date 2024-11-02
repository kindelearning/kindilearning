"use client";
// components/ResetPassword.js
import React, { useState } from "react";
import { getAuth, confirmPasswordReset } from "firebase/auth"; // Import necessary functions
import { useRouter } from "next/navigation";

const ResetPassword = ({ oobCode }) => {
  // oobCode will be passed as a prop
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password has been reset successfully!");
      setError("");
    } catch (error) {
      setError(error.message);
      console.error("Error resetting password:", error.message);
    }
  };

  return (
    <div className="flex claracontainer justify-center flex-col items-center min-h-screen">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

// export default ResetPassword;
export default function ResetPasswordPage() {
  const router = useRouter();
  const { oobCode } = router.query; // Get the oobCode from the URL
  return (
    <>
      <div>
        {oobCode ? <ResetPassword oobCode={oobCode} /> : <p>Loading...</p>}
      </div>
    </>
  );
}
