"use client";
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
import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { useEffect, useState } from "react";

export default function TeamSection() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/our-mission?populate[Hero][populate]=Media&populate[Parentwithkindi][populate]=Media&populate[OurStory][populate]=Media&populate[OurTeam][populate]=*"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Log the response structure
        if (data?.data) {
          setContent(data.data); // Set the fetched data
        } else {
          setError("No data found.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  console.log("Content:", content); // Log content before rendering

  // Check if content is null or undefined
  if (!content) {
    return <div>No content available.</div>;
  }

  return (
    <div className="container mx-auto flex flex-col space-y-12 px-8 py-12">
      {/* Our Team Section */}
      <h2 className="text-4xl font-bold mb-6">Our Team</h2>
      <div className="flex flex-row ">
        {/* Check if OurTeam is an array before using .map() */}
        {Array.isArray(content?.OurTeam) && content?.OurTeam?.length > 0 ? (
          content.OurTeam.map((teamMember) => (
            <div key={teamMember.id} className="mb-8">
              <h3 className="text-2xl font-bold">{teamMember.Name}</h3>
              <p className="text-xl font-medium">{teamMember.Degree}</p>
              <div className="prose">{teamMember.About}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No team members found</p>
        )}
      </div>
    </div>
  );
}

export function UpdateTeamSection() {
  const [content, setContent] = useState({
    OurTeam: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch initial data for the OurTeam array
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/our-mission?populate[OurTeam][populate]"
        );
        const data = await response.json();
        setContent({
          OurTeam: data.data.OurTeam || [], // Populate the team members array
        });
      } catch (err) {
        setError("Error fetching content");
      }
    };

    fetchContent();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data for submission, excluding the 'id' field as Strapi handles it internally
    const updatedContent = {
      data: {
        OurTeam: content.OurTeam.map((teamMember) => ({
          Name: teamMember.Name,
          Degree: teamMember.Degree,
          About: teamMember.About,
        })),
      },
    };

    try {
      const response = await fetch(
        `http://localhost:1337/api/our-mission`, // Remove the `populate` query here
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setDialogMessage("Team data updated successfully!");
      } else {
        setDialogMessage(
          `Error updating content: ${result.message || response.statusText}`
        );
      }
    } catch (err) {
      setDialogMessage(`Error updating content: ${err.message}`);
    } finally {
      setIsDialogOpen(true);
      setLoading(false);
    }
  };

  // Handle individual team member updates
  const handleTeamChange = (index, field, value) => {
    const updatedTeam = [...content.OurTeam];
    updatedTeam[index][field] = value;
    setContent({ ...content, OurTeam: updatedTeam });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Team Members</h2>

      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {content.OurTeam.map((teamMember, index) => (
          <div key={teamMember.id} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={teamMember.Name}
                onChange={(e) =>
                  handleTeamChange(index, "Name", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                value={teamMember.Degree}
                onChange={(e) =>
                  handleTeamChange(index, "Degree", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                About
              </label>
              <textarea
                value={teamMember.About}
                onChange={(e) =>
                  handleTeamChange(index, "About", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="5"
              />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Team Members"}
          </button>
        </div>
      </form>

      {/* Shadcn Dialog for Success/Error Message */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogClose
            onClick={() => setIsDialogOpen(false)}
            className="bg-red text-white rounded-md px-4 py-2"
          >
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
