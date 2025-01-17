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

export default function SliderSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://upbeat-life-04fe8098b1.strapiapp.com/api/slider?populate=Content.Media"
      );
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  console.log("Fetched Data for Slider", data);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <section className="how-it-works py-4 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4">
        {data.Content ? (
          <>
            {data.Content.map((section) => (
              <div
                key={section.id}
                style={{ backgroundColor: `${section.bgcolor}` }}
                className="how-it-works-section bg-white rounded-lg p-8 gap-4 flex items-start"
              >
                {/* Image */}
                {section.Media && section.Media.length ? (
                  <>
                    <img
                      className="rounded-lg max-w-[300px] h-[300px] w-full object-contain"
                      // src={section?.Media[0]?.url}
                      src={`https://upbeat-life-04fe8098b1.strapiapp.com${section?.Media[0]?.url}`}
                      alt={section.Media.name}
                    />
                  </>
                ) : (
                  <div className="w-full h-[300px] bg-gray-300 rounded-lg flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}
                <div className="flex flex-col justify-start items-start">
                  {/* Title and Featured Text */}
                  <span className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    {section.Title} {section.featuredText}
                  </span>

                  <p
                    className="prose w-full text-start text-[#101010] clarabodyTwo"
                    dangerouslySetInnerHTML={{
                      __html: section.Body,
                    }}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <p> Data not Found</p>
        )}
      </div>
    </section>
  );
}

// export function UpdateSliderSection2() {
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/slider?populate=*")
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
//         Content: formData.Content.map((card) => ({
//           featuredText: card.featuredText,
//           Title: card.Title,
//           bgcolor: card.bgcolor,
//           Body: card.Body,
//         })),
//       },
//     };
//     console.log("Sent Data", payload);

//     try {
//       const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/slider", {
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

//   const handleCardChange = (index, key, value) => {
//     const updatedCards = [...formData.Content];
//     updatedCards[index][key] = value;
//     setFormData((prev) => ({
//       ...prev,
//       Content: updatedCards,
//     }));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">
//         Update How It Works Content
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid w-full grid-cols-2 justify-between gap-2">
//           {formData.Content.map((card, index) => (
//             <div
//               key={card.id}
//               className="space-y-4 p-4 border border-gray-300 rounded-lg"
//               style={{ backgroundColor: card.bgcolor }}
//             >
//               <div>
//                 <label
//                   htmlFor={`Content_${index}_featuredText`}
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Featured Text
//                 </label>
//                 <input
//                   type="text"
//                   id={`Content_${index}_featuredText`}
//                   name="Content"
//                   value={card.featuredText}
//                   onChange={(e) =>
//                     handleCardChange(index, "featuredText", e.target.value)
//                   }
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor={`Content_${index}_title`}
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   id={`Content_${index}_Title`}
//                   name="Content"
//                   value={card.Title}
//                   // onChange={(e) => {
//                   //   const updatedContent = [...howItWorksData.Content];
//                   //   updatedContent[index].title = e.target.value;
//                   //   setHowItWorksData((prevData) => ({
//                   //     ...prevData,
//                   //     Content: updatedContent,
//                   //   }));
//                   // }}
//                   onChange={(e) =>
//                     handleCardChange(index, "Title", e.target.value)
//                   }
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor={`Content_${index}_BodyDescription`}
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Body Description
//                 </label>
//                 {/* <textarea
//                     id={`Content_${index}_BodyDescription`}
//                     name="BodyDescription"
//                     value={card.BodyDescription}
//                     // onChange={(e) => {
//                     //   const updatedContent = [...howItWorksData.Content];
//                     //   updatedContent[index].BodyDescription = e.target.value;
//                     //   setHowItWorksData((prevData) => ({
//                     //     ...prevData,
//                     //     Content: updatedContent,
//                     //   }));
//                     // }}
//                     onChange={(e) =>
//                       handleCardChange(index, "BodyDescription", e.target.value)
//                     }
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
//                     rows="5"
//                     required
//                   /> */}
//                 <ClaraMarkdownRichEditor
//                   value={card.Body}
//                   onChange={(value) => handleCardChange(index, "Body", value)}
//                 />
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
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
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
//     </div>
//   );
// }

export function UpdateSliderSection() {
  const [sliderContent, setSliderContent] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHIWData = async () => {
      try {
        const res = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/slider?populate=Content.Media"
        );
        const data = await res.json();
        const sliderData = data.data;
        setSliderContent(sliderData?.Content || []);
      } catch (err) {
        console.error("Error fetching How It Works data:", err);
        setError("Error fetching content");
      }
    };

    fetchHIWData();
  }, []);

  const handleHIWSectionUpdate = (index, updatedSection) => {
    const updatedHIWSections = [...sliderContent];
    updatedHIWSections[index] = updatedSection;
    setSliderContent(updatedHIWSections);
  };

  const handleMediaSelect = (selectedMedia, index) => {
    const updatedSection = [...sliderContent];
    updatedSection[index].Media = selectedMedia;
    setSliderContent(updatedSection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        Content: sliderContent.map((section) => ({
          Title: section.Title,
          featuredText: section.featuredText,
          Body: section.Body,
          bgcolor: section.bgcolor,
          buttonColor: section.buttonColor,
          Media: section.Media ? { id: section.Media.id } : null,
        })),
      },
    };
    console.log("payload sent", payload);

    try {
      const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/slider", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Updated How It Works Data:", data);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error updating How It Works content:", error);
      alert("Error updating content.");
    }
  };

  // const handleEditorChange = (newValue) => {
  //   setBody(newValue);  // Update body state with the new value from the editor
  // };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Edit Slider Section
      </h1>

      {/* Error message display */}
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Looping through each slider content section */}
        {sliderContent.map((section, index) => (
          <div
            style={{ backgroundColor: section.bgcolor }}
            key={index}
            className="border p-6 rounded-lg shadow-sm bg-gray-50"
          >
            <h3 className="text-xl font-medium mb-4">Section {index + 1}</h3>

            {/* Title */}
            <div>
              <label
                htmlFor={`title-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id={`title-${index}`}
                value={section.Title}
                onChange={(e) => {
                  const updatedSection = { ...section, Title: e.target.value };
                  handleHIWSectionUpdate(index, updatedSection);
                }}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Featured Text */}
            <div>
              <label
                htmlFor={`featuredText-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Featured Text:
              </label>
              <input
                type="text"
                id={`featuredText-${index}`}
                value={section.featuredText}
                onChange={(e) => {
                  const updatedSection = {
                    ...section,
                    featuredText: e.target.value,
                  };
                  handleHIWSectionUpdate(index, updatedSection);
                }}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Body Description */}
            <div>
              <label
                htmlFor={`bodyDescription-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Body Description (Markdown):
              </label>
              {/* <textarea
                id={`bodyDescription-${index}`}
                value={section.Body}
                onChange={(e) => {
                  const updatedSection = { ...section, Body: e.target.value };
                  handleHIWSectionUpdate(index, updatedSection);
                }}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              /> */}
              <ClaraMarkdownRichEditor
                value={section.Body || ""} // Ensure the value is always a string (fallback to an empty string if undefined)
                onChange={(newBodyValue) => {
                  const updatedSection = { ...section, Body: newBodyValue }; // Update section with the new body value
                  handleHIWSectionUpdate(index, updatedSection); // Call your handler to update the section
                }}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Background Color Picker */}
            <div>
              <label
                htmlFor={`bgcolor-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Background Color:
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
                className="mt-1 block w-16 border rounded-md"
              />
            </div>

            {/* button Color Picker */}
            <div>
              <label
                htmlFor={`buttonColor-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                buttonColor:
              </label>
              <input
                type="color"
                id={`buttonColor-${index}`}
                value={section.buttonColor}
                onChange={(e) => {
                  const updatedSection = {
                    ...section,
                    buttonColor: e.target.value,
                  };
                  handleHIWSectionUpdate(index, updatedSection);
                }}
                className="mt-1 block w-16 border rounded-md"
              />
            </div>

            {/* Media Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Media:
              </label>
              {section.Media ? (
                <div className="mt-2">
                  <img
                    src={`https://upbeat-life-04fe8098b1.strapiapp.com${section.Media.url}`}
                    alt={section.Title}
                    className="w-32 h-32 object-cover border rounded-md"
                  />
                </div>
              ) : (
                <p className="mt-2 text-gray-500">No media selected</p>
              )}
              <MediaSelector
                onMediaSelect={(media) => handleMediaSelect(media, index)}
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
