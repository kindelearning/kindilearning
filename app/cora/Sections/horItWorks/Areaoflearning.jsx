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

export default function AreaOfLearning() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/how-it-work-page?populate[AreaOflearningCards][populate]=Icon"
        );
        const data = await response.json();
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

  console.log("Area of Learning COntent", content);

  if (loading) return <div className="text-gray-500">Loading content...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!content) return <div>No content available.</div>;

  const { AreaoflearningTitle, ArealearningBody, AreaOflearningCards } =
    content;

  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {AreaoflearningTitle}
        </h2>
        <p className="text-gray-600 mt-4 text-lg">{ArealearningBody}</p>
      </div>

      {/* Cards Grid */}
      <div className="grid  lg:grid-cols-2 gap-6">
        {AreaOflearningCards?.map((card) => (
          <div
            key={card.id}
            className="p-6 rounded-lg shadow-lg text-white"
            style={{ backgroundColor: `#${card.bgcolor}` }}
          >
            {card.Icon ? (
              <img
                // src={`https://upbeat-life-04fe8098b1.strapiapp.com${card.Icon.url}`}
                src={card.Icon.url}
                className="w-[60px] h-[60px]"
                alt={card.Title}
              />
            ) : (
              <p>No image </p>
            )}
            {/* Card Title */}
            <h3 className="text-2xl font-semibold mb-4">{card.Title}</h3>

            {/* Card Body */}
            <ul
              className="space-y-2 list-disc list-inside"
              dangerouslySetInnerHTML={{ __html: card.Body }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// export const UpdateAreaOfLearning2 = () => {
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [media, setMedia] = useState(null); // Use `null` for initial media

//   // Fetch existing data
//   useEffect(() => {
//     fetch(
//       "https://upbeat-life-04fe8098b1.strapiapp.com/api/how-it-work-page?populate[AreaOflearningCards][populate]=Icon"
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setFormData(data.data);
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
//         AreaoflearningTitle: formData.AreaoflearningTitle,
//         ArealearningBody: formData.ArealearningBody,
//         AreaOflearningCards: formData.AreaOflearningCards.map((card) => ({
//           Title: card.Title,
//           Body: card.Body,
//           bgcolor: card.bgcolor.replace("#", ""),
//           Icon: media.id,
//         })),
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

//   const handleMediaSelect = (selectedMedia) => {
//     console.log("Selected Media:", selectedMedia); // Log to inspect the structure
//     setMedia(selectedMedia); // Store only the media ID
//   };
//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// const handleCardChange = (index, key, value) => {
//   const updatedCards = [...formData.AreaOflearningCards];
//   updatedCards[index][key] = value;
//   setFormData((prev) => ({
//     ...prev,
//     AreaOflearningCards: updatedCards,
//   }));
// };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="space-y-6 p-6">
//         {/* Area of Learning Title */}
//         <div className="space-y-2">
//           <label
//             htmlFor="AreaoflearningTitle"
//             className="block text-lg font-semibold"
//           >
//             Area of Learning Title
//           </label>
//           <input
//             type="text"
//             name="AreaoflearningTitle"
//             id="AreaoflearningTitle"
//             value={formData.AreaoflearningTitle || ""}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Area of Learning Body */}
//         <div className="space-y-2">
//           <label
//             htmlFor="ArealearningBody"
//             className="block text-lg font-semibold"
//           >
//             Area of Learning Body
//           </label>
//           <textarea
//             name="ArealearningBody"
//             id="ArealearningBody"
//             value={formData.ArealearningBody || ""}
//             onChange={handleInputChange}
//             rows="2"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Area of Learning Cards */}
//         <h3 className="text-xl font-semibold">Area of Learning Cards</h3>
//         <div className="grid w-full grid-cols-2 justify-between gap-2">
//           {formData.AreaOflearningCards.map((card, index) => (
//             <div
//               key={card.id}
//               className="space-y-4 p-4 border border-gray-300 rounded-lg"
//               style={{ backgroundColor: card.bgcolor }}
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

//                 <ClaraMarkdownRichEditor
//                   value={card.Body}
//                   onChange={(value) => handleCardChange(index, "Body", value)}
//                 />
//               </div>
//               <div>
//                 <label>Media:</label>
//                 {media ? (
//                   <div className="mt-4">
//                     <img
//                       src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
//                       className="w-[300px] h-[200px] rounded-lg object-cover"
//                     />
//                     <p>{media.name}</p>
//                   </div>
//                 ) : (
//                   <p> Not selected anything</p>
//                 )}
//                 <MediaSelector onMediaSelect={handleMediaSelect} />
//               </div>
//               <div className="space-y-2">
//                 <label
//                   htmlFor={`card-bgcolor-${index}`}
//                   className="block text-sm font-medium"
//                 >
//                   Background Color
//                 </label>
//                 <input
//                   type="color"
//                   id={`card-bgcolor-${index}`}
//                   value={card.bgcolor || "#000000"}
//                   onChange={(e) =>
//                     handleCardChange(index, "bgcolor", e.target.value)
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
// };

export function UpdateAreaOfLearning() {
  const [areaOflearningCards, setAreaOflearningCards] = useState([]);
  const [areaoflearningTitle, setAreaoflearningTitle] = useState();
  const [arealearningBody, setArealearningBody] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHIWData = async () => {
      try {
        const res = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/how-it-work-page?populate[AreaOflearningCards][populate]=Icon"
        );
        const data = await res.json();
        const cardData = data.data;
        setAreaoflearningTitle(cardData.AreaoflearningTitle);
        setArealearningBody(cardData.ArealearningBody);
        setAreaOflearningCards(cardData.AreaOflearningCards);
        console.log("Fethced Areaoflearning cardData", cardData);
      } catch (err) {
        console.error("Error fetching How It Works data:", err);
        setError("Error fetching content");
      }
    };

    fetchHIWData();
  }, []);

  const handleHIWSectionUpdate = (index, updatedSection) => {
    const updatedHIWSections = [...areaOflearningCards];
    updatedHIWSections[index] = updatedSection;
    setAreaOflearningCards(updatedHIWSections);
  };

  const handleMediaSelect = (selectedMedia, index) => {
    const updatedSection = [...areaOflearningCards];
    updatedSection[index].Icon = selectedMedia;
    setAreaOflearningCards(updatedSection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        AreaoflearningTitle: areaoflearningTitle,
        ArealearningBody: arealearningBody,
        AreaOflearningCards: areaOflearningCards.map((section) => ({
          Body: section.Body,
          bgcolor: section.bgcolor.replace("#", ""),
          Title: section.Title,
          Icon: section.Icon ? { id: section.Icon.id } : null,
        })),
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
        <div>
          <label
            htmlFor={`areaoflearningTitle-`}
            className="block text-sm font-medium text-gray-700"
          >
            areaoflearningTitle:
          </label>
          <input
            type="text"
            id={`areaoflearningTitle-`}
            value={areaoflearningTitle}
            onChange={(e) => setAreaoflearningTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor={`areaoflearningTitle-`}
            className="block text-sm font-medium text-gray-700"
          >
            areaoflearningBody:
          </label>

          <ClaraMarkdownRichEditor
            value={arealearningBody}
            onChange={(newContent) => setArealearningBody(newContent)} // update the state with new content
          />
        </div>

        <div className="grid w-full grid-cols-2 justify-between gap-2">
          {/* Looping through each slider content section */}
          {areaOflearningCards.map((section, index) => (
            <div
              key={index}
              style={{ backgroundColor: `${section.bgcolor}` }}
              className="border p-6 rounded-lg shadow-sm bg-gray-50"
            >
              <h3 className="text-xl font-medium mb-4">Section {index + 1}</h3>

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
                  htmlFor={`bgcolor-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  bgcolor:
                </label>
                <input
                  type="color"
                  id={`bgcolor-${index}`}
                  value={section.bgcolor}
                  onChange={(e) => {
                    const updatedSection = {
                      ...section,
                      bgcolor: e.target.value,
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
