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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ChildDevelopmentUnlock() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/childdevelopmentunlock?populate=Content.Media"
        );
        const data = await response.json();
        console.log("child development Database", data);
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
        <h1 className="text-4xl font-bold mb-6">{content?.Title}</h1>

        {/* Featured Text */}
        <p className="text-xl font-medium text-gray-700 mb-6">
          {content?.featuredText}
        </p>

        {/* Body */}
        <div className="prose mb-6">
          {/* Render the markdown content as HTML */}
          {content?.Body && (
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: content?.Body }}
            />
          )}
        </div>
        {/* Get Started Link */}
        {content?.additionalField && (
            <div>
              <Link
                href={content.additionalField}
                target="_blank"
                className="bg-[#3f3a64] text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition hover:shadow-lg hover:bg-[#2d2a4b]"
              >
                Get Started
              </Link>
            </div>
          )}

      </div>

      {/* Media */}
      {content?.Media && (
        <div className="max-w-[400px]">
          {content.Media ? (
            <img
              src={content.Media[0].url}
              // src={`https://lionfish-app-98urn.ondigitalocean.app${content.Media[0].url}`}
              alt="Child Development Media"
              className="w-full h-auto"
            />
          ) : (
            <p>No media available.</p>
          )}
        </div>
      )}
    </div>
  );
}

// export function UpdateChildDevelopmentContent() {
//   const [content, setContent] = useState({
//     Title: "",
//     Body: "",
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
//           "https://lionfish-app-98urn.ondigitalocean.app/api/childdevelopmentunlock?populate=Content.Media"
//         );
//         const data = await response.json();
//         setContent({
//           Title: data.data.Content.Title,
//           Body: data.data.Content.Body,
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

//     const updatedContent = {
//       data: {
//         Content: {
//           Title: content.Title,
//           Body: content.Body,
//           featuredText: content.featuredText,
//         },
//       },
//     };

//     try {
//       const response = await fetch(
//         "https://lionfish-app-98urn.ondigitalocean.app/api/childdevelopmentunlock?nxfbah0rlj4nhjo381vg7x8q",
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
//             value={content.Title}
//             onChange={(e) => setContent({ ...content, Title: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Body
//           </label>
//           {/* <textarea
//             value={content.Body}
//             onChange={(e) => setContent({ ...content, Body: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             rows="5"
//           /> */}
//           <ClaraMarkdownRichEditor
//             name="Body"
//             value={content.Body || ""} // Ensure the value is always a string
//             onChange={(value) => setContent({ ...content, Body: value })}
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

export function UpdateChildDevelopmentContent() { 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [featuredText, setFeaturedText] = useState("");
  const [additionalField, setAdditionalField] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data for Childdevelopmentunlock content
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/childdevelopmentunlock?populate=Content.Media"
        );
        const data = await res.json();

        const content = data.data;
        if (content) {
          setTitle(content.Content?.Title || ""); // Set default values if not found
          setBody(content.Content?.Body || "");
          setAdditionalField(content.Content?.additionalField || ""); // Set the media ID or null if no media is selected
          setFeaturedText(content.Content?.featuredText || "");
          setMedia(content.Content?.Media?.id || null); // Set the media ID or null if no media is selected
        }
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
        "https://lionfish-app-98urn.ondigitalocean.app/api/childdevelopmentunlock?nxfbah0rlj4nhjo381vg7x8q",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Updated ChildDevelopmentUnlock Content:", data);
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
    <div className="p-0">
      <h1 className="text-2xl font-bold mb-6">Edit Child Development Unlock</h1>
      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Featured Text Field */}
        <div>
          <label htmlFor="featuredText" className="block">
            Featured Text
          </label>
          <input
            type="text"
            id="FeaturedText"
            name="featuredText"
            value={featuredText}
            onChange={(e) => setFeaturedText(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
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
            // onChange={(e) => setTitle({  })}
            className="border p-2 w-full"
          />
        </div>

        {/* Body Field */}
        <div>
          <label htmlFor="Body" className="block">
            Body (Markdown)
          </label>
          {/* <textarea
            id="Body"
            name="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border p-2 w-full"
            rows="5"
          /> */}
          <ClaraMarkdownRichEditor
            name="Body"
            value={body || ""} // Ensure the value is always a string
            onChange={handleEditorChange}
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
              <img
                // src={media.url}
                src={`https://lionfish-app-98urn.ondigitalocean.app${media.url}`}

                alt={media.name}
                className="w-32 h-32 object-cover"
              />
              <p>{media.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleMediaSelect} />
        </div>

        <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-center py-4 flex flex-row">
          <div className="claracontainer flex flex-row  justify-between w-full items-center gap-4 px-4">
            <Button type="submit">Save Changes</Button>
          </div>
        </section>
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
