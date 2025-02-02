"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader, 
  DialogText,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";
import MediaSelector from "../../media/Section/MediaSelector";

// const BlogUpdateFormw = ({ documentId }) => {
//   const [text, setText] = useState("");
//   const [description, setDescription] = useState("");
//   const [sEOKeywords, setSEOKeywords] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [likes, setLikes] = useState(null);
//   const [Content, setContent] = useState(null);
//   const [dislikes, setDislikes] = useState(null);
//   const [existingData, setExistingData] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility

//   // Fetch existing blog data based on documentId
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const res = await fetch(
//           `https://lionfish-app-98urn.ondigitalocean.app/api/blogs/${documentId}?populate=*`
//         );
//         const data = await res.json();
//         setExistingData(data.data);
//         setText(data.data.Text || "");
//         setDescription(data.data.Description || "");
//         setSEOKeywords(data.data.SEOKeywords || "");
//         setMetaDescription(data.data.MetaDescription || "");
//         setLikes(data.data.Likes || "");
//         setContent(data.data.Content || "");
//         setDislikes(data.data.Dislikes || "");
//       } catch (err) {
//         console.error("Error fetching blog data:", err);
//       }
//     };

//     fetchBlogData();
//   }, [documentId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("data[Text]", text);
//     formData.append("data[Description]", description);
//     formData.append("data[SEOKeywords]", sEOKeywords);
//     formData.append("data[MetaDescription]", metaDescription);
//     formData.append("data[Content]", Content);
//     formData.append("data[Likes]", likes);
//     formData.append("data[Dislikes]", dislikes);

//     try {
//       const res = await fetch(`https://lionfish-app-98urn.ondigitalocean.app/api/blogs/${documentId}`, {
//         method: "PUT",
//         body: formData,
//       });

//       const data = await res.json();
//       console.log("Updated Blog:", data);
//       setOpenDialog(true); // Show the success dialog
//     } catch (error) {
//       console.error("Error updating blog:", error);
//       alert("Error updating blog.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block">Text</label>
//           <input
//             type="text"
//             name="Text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block">Description</label>
//           <ClaraMarkdownRichEditor
//             onChange={(value) => setContent(value)}
//             value={Content || ""}
//           />
//         </div>

//         <div>
//           <label className="block">SEO Keywords</label>
//           <input
//             type="text"
//             name="SEOKeywords"
//             value={sEOKeywords}
//             onChange={(e) => setSEOKeywords(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block">Likes</label>
//           <input
//             type="text"
//             name="Likes"
//             value={likes}
//             onChange={(e) => setLikes(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block">Dislikes</label>
//           <input
//             type="text"
//             name="Dislikes"
//             value={dislikes}
//             onChange={(e) => setDislikes(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             Update Blog
//           </button>
//         </div>
//       </form>

//       {/* Custom Success Dialog */}
//       <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Success!</DialogTitle>
//           </DialogHeader>
//           <DialogDescription>
//             Your blog has been successfully updated.
//           </DialogDescription>
//           <DialogFooter>
//             <DialogClose asChild>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//                 Close
//               </button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

const BlogUpdateForm = ({ documentId }) => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [sEOKeywords, setSEOKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [likes, setLikes] = useState(null);
  const [Content, setContent] = useState(null);
  const [dislikes, setDislikes] = useState(null);
  const [existingData, setExistingData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility
  const [media, setMedia] = useState(null); // Media state
  const [error, setError] = useState("");

  // Fetch existing blog data based on documentId
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/blogs/${documentId}?populate=*`
        );
        const data = await res.json();

        const content = data.data;

        if (content) {
          setText(content.Text || "");
          setDescription(content.Description || "");
          setSEOKeywords(content.SEOKeywords || "");
          setMetaDescription(content.MetaDescription || "");
          setLikes(content.Likes || "");
          setContent(content.Content || "");
          setDislikes(content.Dislikes || "");
          setMedia(content?.FeaturedImage?.id || null); // Set the media ID or null if no media is selected
        }
        console.log("Fetched Blog Content", content);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError("Error fetching content");
      }
    };

    fetchBlogData();
  }, [documentId]);

  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia); // Store the selected media object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        Text: text,
        Description: description,
        Content: Content,
        SEOKeywords: sEOKeywords,
        MetaDescription: metaDescription,
        Likes: likes,
        Dislikes: dislikes,
        FeaturedImage: media?.id || null, // Use media ID if selected
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(`https://lionfish-app-98urn.ondigitalocean.app/api/blogs/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Updated Badge Content:", data);
      setOpenDialog(true); // Show success dialog
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Error updating content.");
    }
  };

  return (
    <div className="container mx-auto p-4">
       <head>
        <title>
          Update Blog - Kindi
        </title>
        </head>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Text</label>
          <input
            type="text"
            name="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block">Description</label>
          <ClaraMarkdownRichEditor
            onChange={(value) => setContent(value)}
            value={Content || ""}
          />
        </div>

        <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <img
                // src={media.url}
                src={`https://lionfish-app-98urn.ondigitalocean.app${media.url}`}
                className="w-32 h-32 object-cover"
              />
              <p>{media.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleMediaSelect} />
        </div>
        <div>
          <label className="block">SEO Keywords</label>
          <input
            type="text"
            name="SEOKeywords"
            value={sEOKeywords}
            onChange={(e) => setSEOKeywords(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block">Likes</label>
          <input
            type="text"
            name="Likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block">Dislikes</label>
          <input
            type="text"
            name="Dislikes"
            value={dislikes}
            onChange={(e) => setDislikes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update Blog
          </button>
        </div>
      </form>

      {/* Custom Success Dialog */}
      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Your blog has been successfully updated.
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
};
export default BlogUpdateForm;
 