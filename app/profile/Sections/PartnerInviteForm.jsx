"use client";

import React, { useState } from "react";
import { sendPartnerInvite } from "../api";

const PartnerInviteForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("jwt"); // Get JWT token from localStorage

      if (!token) {
        setMessage("You need to be logged in to send an invitation.");
        return;
      }

      const result = await sendPartnerInvite(token, email);
      setMessage(result.message || "Invitation sent successfully!");
    } catch (error) {
      setMessage("Error sending invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Invite a Partner</h2>
      <form onSubmit={handleInvite}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Invitation"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PartnerInviteForm;
