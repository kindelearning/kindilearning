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
import MediaSelector from "../../website/media/Section/MediaSelector";
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";
import Link from "next/link";

export default function HowItWorks() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate[Hero][populate]=Media"
        );
        const data = await response.json();
        // console.log("HIW Data", data);
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

  const {
    Hero,
    AgeGroup,
    Content,
    AreaOflearningCards,
    KindiSkillsCategoriesCards,
  } = content;

  return (
    <>
      <section className="max-w-screen-lg w-full min-h-screen flex flex-col items-center bg-white gap-6 py-10 px-4">
        {/* Media Section */}
        <div className="w-full flex justify-center">
          {Hero?.Media?.[0]?.url ? (
            <video
              autoPlay
              controls
              src={Hero.Media[0].url}
              className="w-full max-w-3xl h-auto border border-gray-300 shadow-md rounded-lg"
            />
          ) : (
            <p className="text-gray-500 text-lg">No media available.</p>
          )}
        </div>

        {/* Text Content */}
        <div className="w-full text-center space-y-4">
          {/* Featured Text */}
          {Hero?.featuredText && (
            <div className="text-gray-600 text-lg md:text-xl font-medium">
              {Hero.featuredText}
            </div>
          )}

          {/* Title */}
          {Hero?.Title && (
            <h1 className="text-gray-900 text-3xl md:text-5xl font-bold">
              {Hero.Title}
            </h1>
          )}

          {/* Get Started Link */}
          {Hero?.additionalField && (
            <div>
              <Link
                href={Hero.additionalField}
                target="_blank"
                className="bg-[#3f3a64] text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition hover:shadow-lg hover:bg-[#2d2a4b]"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Body Content */}
          {Hero?.Body && (
            <div
              dangerouslySetInnerHTML={{ __html: Hero.Body }}
              className="prose text-gray-700 text-lg leading-relaxed md:text-xl"
            />
          )}
        </div>
      </section>
    </>
  );
}

// export function UpdateHowItWorkSection2() {
//   const [content, setContent] = useState({
//     Hero: {
//       Title: "",
//       featuredText: "",
//       Body: "",
//       additionalField: "",
//     },
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   // Fetch initial data for the Hero section
//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const response = await fetch(
//           "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate[Hero][populate]=Media"
//         );
//         const data = await response.json();
//         if (data && data.data) {
//           setContent({
//             Hero: data.data.Hero || {},
//           });
//         }
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

//     // Prepare the data to update
//     const updatedContent = {
//       data: {
//         Hero: {
//           Body: content.Hero.Body,
//           featuredText: content.Hero.featuredText,
//           Title: content.Hero.Title,
//           additionalField: content.Hero.additionalField,
//         },
//       },
//     };

//     try {
//       const response = await fetch(
//         "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate[Hero][populate]=Media",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedContent),
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         setDialogMessage("Hero content updated successfully!");
//       } else {
//         const result = await response.json();
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

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">
//         Edit How It Works - Hero Section
//       </h2>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title Field */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             value={content.Hero.Title}
//             onChange={(e) =>
//               setContent({
//                 ...content,
//                 Hero: { ...content.Hero, Title: e.target.value },
//               })
//             }
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Featured Text Field */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Featured Text
//           </label>
//           <input
//             type="text"
//             value={content.Hero.featuredText}
//             onChange={(e) =>
//               setContent({
//                 ...content,
//                 Hero: { ...content.Hero, featuredText: e.target.value },
//               })
//             }
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* additionalField Field */}
//         <div>
//           <label
//             htmlFor={`additionalField-${index}`}
//             className="block text-sm font-medium text-gray-700"
//           >
//             Read More Link:
//           </label>
//           <input
//             type="url" // Changed type to 'url' for built-in URL validation
//             id={`additionalField-${index}`}
//             value={content.Hero.additionalField}
//             placeholder="https://kindilearning.com/p/community"
//             onChange={(e) =>
//               setContent({
//                 ...content,
//                 Hero: { ...content.Hero, additionalField: e.target.value },
//               })
//             }
//             pattern="https?://.*" // Optional, if you want more control over URL format (e.g., allowing only http or https)
//             className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Body Field */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Body
//           </label>
//           <textarea
//             value={content.Hero.Body}
//             onChange={(e) =>
//               setContent({
//                 ...content,
//                 Hero: { ...content.Hero, Body: e.target.value },
//               })
//             }
//             className="w-full p-2 border border-gray-300 rounded-md"
//             rows="5"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="flex items-center justify-center">
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
//           >
//             {loading ? "Updating..." : "Update Hero Section"}
//           </button>
//         </div>
//       </form>

//       {/* Success/Failure Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{dialogMessage}</DialogTitle>
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose asChild>
//               <button className="px-4 py-2 bg-red-500 text-red rounded-md">
//                 Close
//               </button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

export function UpdateHowItWorkSection() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [featuredText, setFeaturedText] = useState("");
  const [additionalField, setAdditionalField] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data for MonthlyTheme content
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate[Hero][populate]=Media"
        );
        const data = await res.json();

        const content = data.data;
        if (content) {
          setTitle(content.Hero?.Title || ""); // Set default values if not found
          setBody(content.Hero?.Body || "");
          setFeaturedText(content.Hero?.featuredText || "");
          setAdditionalField(content.Hero?.additionalField || ""); // Set the media ID or null if no media is selected
          setMedia(content.Hero?.Media?.id || null); // Set the media ID or null if no media is selected
        }

        console.log("Fetched OurStory Content", content);
      } catch (err) {
        console.error("Error fetching content data:", err);
        setError("Error fetching content");
      }
    };

    fetchContentData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        Hero: {
          Title: title,
          Body: body,
          featuredText: featuredText,
          additionalField: additionalField,
          Media: media?.id || null, // Use media ID if selected
        },
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Updated our-mission Content:", data);
      setOpenDialog(true); // Show success dialog
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Error updating content.");
    }
  };

  const handleMediaSelect = (selectedMedia) => {
    
    setMedia(selectedMedia); // Store the selected media object
  };
  const handleEditorChange = (newValue) => {
    setBody(newValue); // Update body state with the new value from the editor
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Monthly Theme</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="Title" className="block">
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Body Description Field */}
        <div>
          <label htmlFor="BodyDescription" className="block">
            Body Description (Markdown)
          </label>
          {/* <textarea
            id="BodyDescription"
            name="BodyDescription"
            value={body}
            onChange={(e) => setBodyDescription(e.target.value)}
            className="border p-2 w-full"
            rows="5"
          /> */}
          <ClaraMarkdownRichEditor
            name="Body"
            value={body || ""} // Ensure the value is always a string
            onChange={handleEditorChange}
          />
        </div>

        {/* Featured Text Field */}
        <div>
          <label htmlFor="FeaturedText" className="block">
            Featured Text
          </label>
          <input
            type="text"
            id="FeaturedText"
            name="FeaturedText"
            value={featuredText}
            onChange={(e) => setFeaturedText(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* additionalField Field */}
        <div>
          <label
            htmlFor={`additionalField`}
            className="block text-sm font-medium text-gray-700"
          >
            Read More Link:
          </label>
          <input
            type="url" // Changed type to 'url' for built-in URL validation
            id={`additionalField`}
            value={additionalField}
            placeholder="https://kindilearning.com/p/community"
            onChange={(e) => setAdditionalField(e.target.value)}
            pattern="https?://.*" // Optional, if you want more control over URL format (e.g., allowing only http or https)
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Media Field */}
        <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <video
                autoPlay
                controls
                // src={media.url}
                src={`https://lionfish-app-98urn.ondigitalocean.app${media.url}`}
                className="w-60 h-32 object-cover rounded-lg"
              />
              <p>{media.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleMediaSelect} />
        </div>

        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Update Content
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
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
