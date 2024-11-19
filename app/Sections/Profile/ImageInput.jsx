"use client";
import { Button } from "@/components/ui/button";
import { ProfileDP } from "@/public/Images";
import Image from "next/image";
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

      setSuccessMessage("Avatar updated successfully! It will reflect Shortly");
      setError("");
    } catch (err) {
      setError("Failed to update avatar. Please try again.");
    }
  };

  if (loading) return <div>Loading avatars...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex flex-col w-full gap-[16px] lg:gap-8 justify-between items-start">
        <div className="flex flex-col lg:flex-row gap-4 p-6 justify-between items-start  w-full bg-white rounded-[12px] relative">
          {/* <div className="flex flex-col gap-4 p-6 justify-center items-center max-w-[360px] w-full bg-white rounded-[12px] relative">
            <label className="w-32 h-32 rounded-full border-2 border-dashed border-gray-200 flex flex-col justify-center items-center cursor-pointer">
              <Image
                src={ProfileDP}
                className="opacity-0 absolute w-full h-full"
              />
            </label>
            <div className="text-[#0a1932] text-sm font-semibold font-fredoka leading-tight">
              Select custom avatar
            </div>
          </div> */}

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
                      style={{ display: "none" }} // Hide the radio button visually
                    />
                    <div
                      style={{
                        cursor: "pointer",
                        border:
                          selectedAvatarId === avatar.id
                            ? "4px solid red"
                            : "2px solid transparent", // Red border when selected
                        borderRadius: "50%", // Make the border circular
                        padding: "2px", // To make space around the image inside the border
                        transition: "border 0.3s ease", // Optional: Smooth transition for border change
                      }}
                    >
                      <Image
                        src={avatar.profileAvatar.url}
                        width={100}
                        height={100}
                        alt={`Avatar ${avatar.id}`}
                        style={{
                          borderRadius: "50%", // Ensure the image has circular corners to match the border shape
                        }}
                      />
                    </div>
                  </label>
                </div>
              ))}
            </div>
            <Button
              className="text-center text-white text-base bg-red rounded-2xl shadow border-2 border-white font-semibold font-['Fredoka'] leading-tight w-[200px]"
              type="submit"
              disabled={!selectedAvatarId}
            >
              Save Selection
            </Button>
          </form>
        </div>
        {successMessage && (
          <div style={{ color: "green", marginTop: "10px" }}>
            {successMessage}
          </div>
        )}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
      </div>
    </>
  );
}
