"use client";

import RichTextRender from "@/app/Sections/Global/RichTextRender";
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

export default function EarlyLearningExpert() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/early-learning-expert?populate=Content.Media"
        );
        const data = await response.json();
        // console.log("Monthlytheme Database", data);
        if (data?.data) {
          setContent(data.data.Content); // Set the fetched data
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

  return (
    <div className="container mx-auto flex justify-between font-fredoka px-8 py-12">
      <div className="flex flex-col max-w-[50%]">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">{content?.title}</h1>

        {/* Featured Text */}
        <p className="text-xl font-medium text-gray-700 mb-6">
          {content?.featuredText}
        </p>

        {/* Body */}
        <div className="prose ">
          {/* Render the markdown content as HTML */}
          <p
            className="prose w-full text-start text-[#696969] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
            dangerouslySetInnerHTML={{ __html: content?.BodyDescription }}
          />
        </div>
      </div>

      {/* Media */}
      {content?.Media?.url ? (
        <div className="w-full max-w-[400px] mx-auto">
          <video
            // src={content.Media.url}
            src={`https://lionfish-app-98urn.ondigitalocean.app${content.Media.url}`}
            controls
            autoPlay
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      ) : (
        <p className="text-gray-600">No media available</p>
      )}
    </div>
  );
}

// export function UpdateEarlyLearningExpert2() {
//   const [content, setContent] = useState({
//     title: "",
//     BodyDescription: "",
//     featuredText: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   useEffect(() => {
//     // Fetch initial content data to pre-fill the form
//     const fetchContent = async () => {
//       try {
//         const response = await fetch(
//           "https://lionfish-app-98urn.ondigitalocean.app/api/early-learning-expert?populate=*"
//         );
//         const data = await response.json();
//         setContent({
//           title: data.data.Content.title,
//           BodyDescription: data.data.Content.BodyDescription,
//           featuredText: data.data.Content.featuredText,
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

//     // Prepare the updated content
//     const updatedContent = {
//       data: {
//         Content: {
//           title: content.title,
//           BodyDescription: content.BodyDescription, // Ensure BodyDescription is correctly handled
//           featuredText: content.featuredText,
//         },
//       },
//     };

//     try {
//       // Use documentId in the PUT request URL
//       const response = await fetch(
//         `https://lionfish-app-98urn.ondigitalocean.app/api/early-learning-expert`,
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
//         setDialogMessage("Content updated successfully!");
//       } else {
//         setDialogMessage("Error updating content.");
//       }
//     } catch (err) {
//       setDialogMessage("Error updating content.");
//     } finally {
//       setIsDialogOpen(true);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">Edit Content</h2>

//       {error && <div className="text-red-500">{error}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             value={content.title}
//             onChange={(e) => setContent({ ...content, title: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Featured Text
//           </label>
//           <input
//             type="text"
//             value={content.featuredText}
//             onChange={(e) =>
//               setContent({ ...content, featuredText: e.target.value })
//             }
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Body Description
//           </label>
//           {/* <textarea
//             value={content.BodyDescription || ""}
//             onChange={(e) =>
//               setContent({ ...content, BodyDescription: e.target.value })
//             }
//             className="w-full p-2 border border-gray-300 rounded-md"
//             rows="5"
//           /> */}

//           {content && (
//             <ClaraMarkdownRichEditor
//               name="BodyDescription"
//               value={content.BodyDescription || ""} // Ensure the value is always a string
//               onChange={(value) =>
//                 setContent({ ...content, BodyDescription: value })
//               }
//             />
//           )}
//         </div>

//         <div className="flex items-center justify-center">
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
//           >
//             {loading ? "Updating..." : "Update Content"}
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

export function UpdateEarlyLearningExpert() {
  const [title, setTitle] = useState("");
  const [bodyDescription, setBodyDescription] = useState("");
  const [featuredText, setFeaturedText] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data for MonthlyTheme content
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/early-learning-expert?populate=Content.Media"
        );
        const data = await res.json();

        const content = data.data;
        if (content) {
          setTitle(content.Content?.title || ""); // Set default values if not found
          setBodyDescription(content.Content?.BodyDescription || "");
          setFeaturedText(content.Content?.featuredText || "");
          setMedia(content.Content?.Media?.id || null); // Set the media ID or null if no media is selected
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
        Content: {
          title: title,
          BodyDescription: bodyDescription,
          featuredText: featuredText,
          Media: media?.id || null, // Use media ID if selected
        },
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/early-learning-expert", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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
    setBodyDescription(newValue);  // Update body state with the new value from the editor
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
            value={bodyDescription}
            onChange={(e) => setBodyDescription(e.target.value)}
            className="border p-2 w-full"
            rows="5"
          /> */}
          <ClaraMarkdownRichEditor
            name="BodyDescription"
            value={bodyDescription || ""} // Ensure the value is always a string
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
                className="w-60 rounded-lg h-32 object-cover"
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
