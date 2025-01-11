"use client";

import { useEffect, useState } from "react";
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
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";
import MediaSelector from "../../website/media/Section/MediaSelector";

export default function AgeGroupSection() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/how-it-work-page?populate[AgeGroup][populate]=Content.Icon"
        );
        const data = await response.json();
        console.log("Age Group Data", data);
        if (data?.data) {
          setContent(data.data);
        } else {
          setError("No content found.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-gray-500">Loading content...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!content) return <div>No content available.</div>;

  const { AgeGroup } = content;
  const { featuredText, Title, Body, Content } = AgeGroup;

  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {Title}
        </h2>
        <p className="text-gray-600 mt-4 text-lg">{Body}</p>
      </div>

      {/* Featured Text */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-700">{featuredText}</h3>
      </div>

      {/* Content Blocks for each Age Group */}
      <div className="grid grid-cols-2 gap-2 justify-between w-full">
        {Content?.map((ageGroup) => (
          <div
            key={ageGroup.id}
            className="p-6 border flex flex-col justify-between items-center rounded-lg shadow-lg bg-white"
          >
            {/* Age Group Icon */}
            {ageGroup.Icon && ageGroup.Icon.url && (
              <div className="text-center mb-4">
                <img
                  // src={ageGroup.Icon.url}
                  src={`https://upbeat-life-04fe8098b1.strapiapp.com${ageGroup.Icon.url}`}
                  alt={
                    ageGroup.Icon.alternativeText ||
                    `Icon for ${ageGroup.Title}`
                  }
                  width={ageGroup.Icon.width}
                  height={ageGroup.Icon.height}
                  className="mx-auto w-[60px] h-[60px]"
                />
              </div>
            )}
            {/* Age Group Title */}
            <div className="flex w-full flex-col">
              <h4 className="text-2xl font-semibold text-gray-800">
                {ageGroup.Title}
              </h4>

              {/* Age Group Body */}
              <p
                className="text-gray-600 prose mt-4"
                dangerouslySetInnerHTML={{ __html: ageGroup.Body }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// export function UpdateAgeGroupSection2() {
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   // Fetch existing data
//   useEffect(() => {
//     fetch(
//       "https://upbeat-life-04fe8098b1.strapiapp.com/api/how-it-work-page?populate[AgeGroup][populate]=*"
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Data:", data);
//         setFormData(data.data.AgeGroup.Content || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load data");
//       });
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare the payload
//     const payload = {
//       data: {
//         AgeGroup: {
//           Content: formData.map((card) => ({
//             Title: card.Title,
//             Body: card.Body,
//             featuredText: card.featuredText,
//           })),
//         },
//       },
//     };

//     console.log("Sent Data", payload);

//     try {
//       const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/how-it-work-page", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setOpenDialog(true); // Open the success dialog
//       } else {
//         const errorData = await res.json();
//         console.error("Error updating:", errorData);
//         alert(`Failed to update: ${errorData.error.message}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An unexpected error occurred.");
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCardChange = (index, key, value) => {
//     console.log(`Updating card ${index}, key: ${key}, value: ${value}`); // Debugging log
//     const updatedCards = [...formData];
//     updatedCards[index][key] = value;
//     setFormData(updatedCards);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;
//   if (!formData || !Array.isArray(formData)) {
//     return <p>No Age Group content available</p>;
//   }
//   return (
//     <>
//       <form onSubmit={handleSubmit} className="space-y-6 p-6">
//         {/* Area of Learning Cards */}
//         <h3 className="text-xl font-semibold">Area of Learning Cards</h3>
//         <div className="grid w-full grid-cols-2 justify-between gap-2">
//           {formData.map((card, index) => (
//             <div
//               key={card.id}
//               className="space-y-4 p-4 border border-gray-300 rounded-lg"
//             >
//               <h4 className="text-lg font-medium">Card {index + 1}</h4>

//               <div className="space-y-2">
//                 <label
//                   htmlFor={`card-title-${index}`}
//                   className="block text-sm font-medium"
//                 >
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   id={`card-title-${index}`}
//                   value={card.Title || ""}
//                   onChange={(e) =>
//                     handleCardChange(index, "Title", e.target.value)
//                   }
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor={`card-body-${index}`}
//                   className="block text-sm font-medium"
//                 >
//                   Body
//                 </label>
//                 {/* <textarea
//                   id={`card-body-${index}`}
//                   value={card.Body || ""}
//                   onChange={(e) =>
//                     handleCardChange(index, "Body", e.target.value)
//                   }
//                   rows="3"
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 /> */}
//                 <ClaraMarkdownRichEditor
//                   value={card.Body}
//                   onChange={(value) => handleCardChange(index, "Body", value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor={`card-featuredText-${index}`}
//                   className="block text-sm font-medium"
//                 >
//                   Background Color
//                 </label>
//                 <input
//                   type="text"
//                   id={`card-featuredText-${index}`}
//                   value={card.featuredText || "#000000"}
//                   onChange={(e) =>
//                     handleCardChange(index, "featuredText", e.target.value)
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           Update
//         </button>
//       </form>
//       {/* Dialog for success message */}
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Success!</DialogTitle>
//             <DialogDescription>
//               Your data has been updated successfully.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose asChild>
//               <button className="btn-close">Close</button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

export function UpdateAgeGroupSection() {
  const [ageGroupCards, setAgeGroupCards] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHIWData = async () => {
      try {
        const res = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/how-it-work-page?populate[AgeGroup][populate]=Content.Icon"
        );
        const data = await res.json();
        console.log("Complete API response:", data);

        // Extract data correctly based on the API structure
        const content = data.data?.AgeGroup?.Content;
        if (content && Array.isArray(content)) {
          setAgeGroupCards(content); // Populate ageGroupCards with the array
        } else {
          throw new Error("Invalid response structure for Content");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load content");
      }
    };

    fetchHIWData();
  }, []);

  const handleHIWSectionUpdate = (index, updatedSection) => {
    setAgeGroupCards((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index] = updatedSection;
      return updatedSections;
    });
  };

  const handleMediaSelect = (selectedMedia, index) => {
    const updatedSection = [...ageGroupCards];
    updatedSection[index].Icon = selectedMedia;
    setAgeGroupCards(updatedSection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        AgeGroup: {
          Content: ageGroupCards.map((section) => ({
            Body: section.Body,
            Title: section.Title,
            Icon: section.Icon ? { id: section.Icon.id } : null,
          })),
        },
      },
    };
    console.log("payload sent", payload);

    try {
      const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/how-it-work-page", {
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

      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <div className="grid w-full grid-cols-2 justify-between gap-2">
          {/* Looping through each slider content section */}

          {ageGroupCards.map((section, index) => (
            <div
              key={index}
              style={{ backgroundColor: section.bgcolor || "transparent" }}
              className="border p-6 rounded-lg shadow-sm bg-gray-50"
            >
              <div>
                <label
                  htmlFor={`Title-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id={`Title-${index}`}
                  value={section.Title}
                  onChange={(e) => {
                    const updatedSection = {
                      ...section,
                      Title: e.target.value,
                    };
                    handleHIWSectionUpdate(index, updatedSection);
                  }}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor={`Body-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Body
                </label>

                <ClaraMarkdownRichEditor
                  value={section.Body}
                  // onChange={(value) => handleCardChange(index, "Body", value)}
                  onChange={(newContent) => {
                    const updatedSection = { ...section, Body: newContent };
                    handleHIWSectionUpdate(index, updatedSection);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Icon:
                </label>
                {section.Icon ? (
                  <div className="mt-2">
                    <img
                      src={`https://upbeat-life-04fe8098b1.strapiapp.com${section.Icon.url}`}
                      alt={section.Title}
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
        </div>

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
