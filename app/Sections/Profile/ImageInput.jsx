"use client";
import { useEffect, useState } from "react";

export default function AvatarSelectionForm({ accountId }) {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch("/api/avatars", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query GetAvailableAvatars {
                avatars {
                  id
                  profileAvatar {
                    url
                    fileName
                  }
                }
              }
            `,
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch avatars");

        const result = await response.json();
        setAvatars(result.data.avatars);
      } catch (err) {
        setError("Error loading avatars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  const handleAvatarChange = (avatarId) => {
    setSelectedAvatarId(avatarId);
    setSuccessMessage(""); // Clear success message on new selection
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedAvatarId) {
      setError("Please select an avatar before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/update-avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation UpdateUserAvatar($accountId: ID!, $avatarId: ID!) {
              updateAccount(
                where: { id: $accountId }
                data: { myAvatar: { connect: { id: $avatarId } } }
              ) {
                id
                myAvatar {
                  id
                  profileAvatar {
                    url
                    fileName
                  }
                }
              }
            }
          `,
          variables: {
            accountId,
            avatarId: selectedAvatarId,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to update avatar");

      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setSuccessMessage("Avatar updated successfully!");
      setError("");
    } catch (err) {
      setError("Failed to update avatar. Please try again.");
    }
  };

  if (loading) return <div>Loading avatars...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Select Your Avatar</h1>
      <form onSubmit={handleFormSubmit}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {avatars.map((avatar) => (
            <div key={avatar.id} style={{ textAlign: "center" }}>
              <label>
                <input
                  type="radio"
                  name="avatar"
                  value={avatar.id}
                  onChange={() => handleAvatarChange(avatar.id)}
                  checked={selectedAvatarId === avatar.id}
                  style={{ marginBottom: "5px" }}
                />
                <img
                  src={avatar.profileAvatar.url}
                  alt={avatar.profileAvatar.fileName}
                  style={{
                    width: "100px",
                    height: "100px",
                    cursor: "pointer",
                    border:
                      selectedAvatarId === avatar.id
                        ? "2px solid blue"
                        : "2px solid transparent",
                  }}
                />
              </label>
            </div>
          ))}
        </div>
        <button type="submit" disabled={!selectedAvatarId}>
          Save Selection
        </button>
      </form>
      {successMessage && (
        <div style={{ color: "green", marginTop: "10px" }}>
          {successMessage}
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
}
