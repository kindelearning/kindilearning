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
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";
import MediaSelector from "../../website/media/Section/MediaSelector";

export default function TeamSection() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/our-mission?populate[Hero][populate]=Media&populate[Parentwithkindi][populate]=Media&populate[OurStory][populate]=Media&populate[OurTeam][populate]=*"
        );
        const data = await response.json();
        // console.log("Fetched data:", data); // Log the response structure
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
      {/* <div className="flex flex-row ">
         {Array.isArray(content?.OurTeam) && content?.OurTeam?.length > 0 ? (
          content.OurTeam.map((teamMember) => (
            <div key={teamMember.id} className="mb-8">
              {teamMember.MemberPic ? (
                <img src={teamMember.MemberPic.url} alt={teamMember.Name} />
              ) : (
                <p>No image found</p>
              )}
              <h3 className="text-2xl font-bold">{teamMember.Name}</h3>
              <p className="text-xl font-medium">{teamMember.Degree}</p>
              <p
                className="prose w-full px-0 text-start clarabodyTwo  font-medium font-fredoka"
                dangerouslySetInnerHTML={{
                  __html: teamMember.About,
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No team members found</p>
        )}
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Array.isArray(content?.OurTeam) && content?.OurTeam?.length > 0 ? (
          content.OurTeam.map((teamMember) => (
            <div
              key={teamMember.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                {teamMember.MemberPic ? (
                  <img
                    // src={teamMember.MemberPic.url}
                    src={`https://lionfish-app-98urn.ondigitalocean.app${teamMember.MemberPic.url}`}

                    alt={teamMember.Name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                    <p>No image found</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {teamMember.Name}
                </h3>
                <p className="text-xl text-gray-600 mb-4">
                  {teamMember.Degree}
                </p>
                <p
                  className="text-gray-700 text-base font-medium"
                  dangerouslySetInnerHTML={{
                    __html: teamMember.About,
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No team members found</p>
        )}
      </div>
    </div>
  );
}

// export function UpdateTeamSection2() {
//   const [content, setContent] = useState({
//     OurTeam: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   useEffect(() => {
//     // Fetch initial data for the OurTeam array
//     const fetchContent = async () => {
//       try {
//         const response = await fetch(
//           "https://lionfish-app-98urn.ondigitalocean.app/api/our-mission?populate[OurTeam][populate]=MemberPic"
//         );
//         const data = await response.json();
//         setContent({
//           OurTeam: data.data.OurTeam || [], // Populate the team members array
//         });
//       } catch (err) {
//         setError("Error fetching content");
//       }
//     };

//     fetchContent();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Prepare the data for submission, excluding the 'id' field as Strapi handles it internally
//     const updatedContent = {
//       data: {
//         OurTeam: content.OurTeam.map((teamMember) => ({
//           Name: teamMember.Name,
//           Degree: teamMember.Degree,
//           About: teamMember.About,
//         })),
//       },
//     };

//     try {
//       const response = await fetch(
//         `https://lionfish-app-98urn.ondigitalocean.app/api/our-mission`, // Remove the `populate` query here
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedContent),
//         }
//       );

//       const result = await response.json();
//       if (response.ok) {
//         setDialogMessage("Team data updated successfully!");
//       } else {
//         setDialogMessage(
//           `Error updating content: ${result.message || response.statusText}`
//         );
//       }
//     } catch (err) {
//       setDialogMessage(`Error updating content: ${err.message}`);
//     } finally {
//       setIsDialogOpen(true);
//       setLoading(false);
//     }
//   };

//   // Handle individual team member updates
//   const handleTeamChange = (index, field, value) => {
//     const updatedTeam = [...content.OurTeam];
//     updatedTeam[index][field] = value;
//     setContent({ ...content, OurTeam: updatedTeam });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">Edit Team Members</h2>

//       {error && <div className="text-red-500">{error}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {content.OurTeam.map((teamMember, index) => (
//           <div key={teamMember.id} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 value={teamMember.Name}
//                 onChange={(e) =>
//                   handleTeamChange(index, "Name", e.target.value)
//                 }
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Degree
//               </label>
//               <input
//                 type="text"
//                 value={teamMember.Degree}
//                 onChange={(e) =>
//                   handleTeamChange(index, "Degree", e.target.value)
//                 }
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 About
//               </label>

//               <ClaraMarkdownRichEditor
//                 name="Body"
//                 value={teamMember.About}
//                 onChange={(value) => {
//                   const updatedTeam = [...content.OurTeam];
//                   updatedTeam[index].About = value;
//                   setContent({ ...content, OurTeam: updatedTeam });
//                 }}
//               />
//             </div>
//           </div>
//         ))}

//         <div className="flex items-center justify-center">
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
//           >
//             {loading ? "Updating..." : "Update Team Members"}
//           </button>
//         </div>
//       </form>

//       {/* Shadcn Dialog for Success/Error Message */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Update Status</DialogTitle>
//             <DialogDescription>{dialogMessage}</DialogDescription>
//           </DialogHeader>
//           <DialogClose
//             onClick={() => setIsDialogOpen(false)}
//             className="bg-red text-white rounded-md px-4 py-2"
//           >
//             Close
//           </DialogClose>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

export function UpdateTeamSection() {
  const [teamContent, setTeamContent] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHIWData = async () => {
      try {
        const res = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/our-mission?populate[OurTeam][populate]=MemberPic"
        );
        const data = await res.json();
        const teamData = data.data;
        setTeamContent(teamData.OurTeam);
        console.log("Fethced Team COntentity", teamData);
      } catch (err) {
        console.error("Error fetching How It Works data:", err);
        setError("Error fetching content");
      }
    };

    fetchHIWData();
  }, []);

  const handleHIWSectionUpdate = (index, updatedSection) => {
    const updatedHIWSections = [...teamContent];
    updatedHIWSections[index] = updatedSection;
    setTeamContent(updatedHIWSections);
  };

  const handleMediaSelect = (selectedMedia, index) => {
    const updatedSection = [...teamContent];
    updatedSection[index].MemberPic = selectedMedia;
    setTeamContent(updatedSection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        OurTeam: teamContent.map((section) => ({
          About: section.About,
          Degree: section.Degree,
          Name: section.Name,
          MemberPic: section.MemberPic ? { id: section.MemberPic.id } : null,
        })),
      },
    };
    console.log("payload sent", payload);

    try {
      const res = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/our-mission", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Updated our-mission? Data:", data);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error updating our-mission? content:", error);
      alert("Error updating content.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Edit Our Team Section
      </h1>

      {/* Error message display */}
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Looping through each slider content section */}
        {teamContent.map((section, index) => (
          <div
            key={index}
            className="border p-6 rounded-lg shadow-sm bg-gray-50"
          >
            <h3 className="text-xl font-medium mb-4">Section {index + 1}</h3>

            {/* Title */}
            <div>
              <label
                htmlFor={`Degree-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Degree:
              </label>
              <input
                type="text"
                id={`Degree-${index}`}
                value={section.Degree}
                onChange={(e) => {
                  const updatedSection = { ...section, Degree: e.target.value };
                  handleHIWSectionUpdate(index, updatedSection);
                }}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Featured Text */}
            <div>
              <label
                htmlFor={`Name-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id={`Name-${index}`}
                value={section.Name}
                onChange={(e) => {
                  const updatedSection = {
                    ...section,
                    Name: e.target.value,
                  };
                  handleHIWSectionUpdate(index, updatedSection);
                }}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Body Description */}
            <div>
              <label
                htmlFor={`About-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <textarea
                id={`About-${index}`}
                value={section.About}
                onChange={(e) => {
                  const updatedSection = { ...section, About: e.target.value };
                  handleHIWSectionUpdate(index, updatedSection);
                }}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>

            {/* Media Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Media:
              </label>
              {section.MemberPic ? (
                <div className="mt-2">
                  <img
                    src={`https://lionfish-app-98urn.ondigitalocean.app${section.MemberPic.url}`}
                    alt={section.Name}
                    className="w-32 h-32 object-cover border rounded-md"
                  />
                </div>
              ) : (
                <p className="mt-2 text-gray-500">No media selected</p>
              )}
              <MediaSelector
                onMediaSelect={(MemberPic) =>
                  handleMediaSelect(MemberPic, index)
                }
              />
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md w-full mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </form>

      {/* Success Dialog */}
      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Your content has been successfully updated.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
