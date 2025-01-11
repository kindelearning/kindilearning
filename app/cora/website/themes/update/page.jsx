"use client";
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";
import { useState, useEffect } from "react";
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
import MediaSelector from "../../media/Section/MediaSelector";

// export  function UpdateThemeForm2({ documentId }) {
//   const [title, setTitle] = useState("");
//   const [metaDesc, setMetaDesc] = useState("");
//   const [mainContent, setMainContent] = useState("");
//   const [launchTime, setLaunchTime] = useState("");
//   const [thumbnail, setThumbnail] = useState(null);
//   const [existingData, setExistingData] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   // const [thumbnail, setMedia] = useState(null); // Use `null` for initial media

//   // Fetch the existing theme data
//   useEffect(() => {
//     const fetchThemeData = async () => {
//       try {
//         const res = await fetch(
//           `https://upbeat-life-04fe8098b1.strapiapp.com/api/our-themes/${documentId}?populate=*`
//         );
//         const data = await res.json();
//         setExistingData(data.data);

//         // Set the form fields with existing data
//         setTitle(data.data.Title || "");
//         setMetaDesc(data.data.metaDesc || "");
//         setMainContent(data.data.MainContent || "");
//         setLaunchTime(data.data.LaunchTime || "");
//         setThumbnail(data.data.Thumbnail.id || null); // Set media ID or null if no media
//       } catch (error) {
//         console.error("Error fetching theme data:", error);
//       }
//     };
//     fetchThemeData();
//   }, [documentId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("data[Title]", title);
//     formData.append("data[metaDesc]", metaDesc);
//     formData.append("data[MainContent]", mainContent);
//     formData.append("data[LaunchTime]", launchTime);
//     // formData.append("data[Thumbnail]", thumbnail);

//     try {
//       const res = await fetch(
//         `https://upbeat-life-04fe8098b1.strapiapp.com/api/our-themes/${documentId}?populate=Thumbnail`,
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       console.log("Updated Theme:", data);
//       setOpenDialog(true); // Open the success dialog
//     } catch (error) {
//       console.error("Error updating theme:", error);
//       alert("Error updating theme.");
//     }
//   };
//   const handleMediaSelect = (selectedMedia) => {
//     console.log("Selected Media:", selectedMedia); // Log to inspect the structure
//     setThumbnail(selectedMedia); // Store only the media ID
//     // setIsDialogOpen(false); // Close the dialog after selection
//   };
//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="w-full mx-auto p-6 bg-white shadow rounded"
//       >
//         <h2 className="text-2xl font-semibold mb-4">Edit Theme</h2>

//         {/* Title */}
//         <div className="mb-4">
//           <label htmlFor="Title" className="block font-medium mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             id="Title"
//             name="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         {/* Meta Description */}
//         <div className="mb-4">
//           <label htmlFor="metaDesc" className="block font-medium mb-1">
//             Meta Description
//           </label>
//           <textarea
//             id="metaDesc"
//             name="metaDesc"
//             value={metaDesc}
//             onChange={(e) => setMetaDesc(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Main Content (Markdown) */}
//         <div className="mb-4">
//           <label htmlFor="MainContent" className="block font-medium mb-1">
//             Main Content
//           </label>

//           <ClaraMarkdownRichEditor
//             onChange={(value) => setMainContent(value)}
//             value={mainContent || ""}
//           />
//         </div>

//         {/* Launch Time */}
//         <div className="mb-4">
//           <label htmlFor="LaunchTime" className="block font-medium mb-1">
//             Launch Time
//           </label>
//           <input
//             type="datetime-local"
//             id="LaunchTime"
//             name="LaunchTime"
//             value={
//               launchTime ? new Date(launchTime).toISOString().slice(0, 16) : ""
//             }
//             onChange={(e) => setLaunchTime(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Thumbnail */}
//         {/* <div className="mb-4">

//         {thumbnail ? (
//           <div>
//             <img
//               src={`https://upbeat-life-04fe8098b1.strapiapp.com${thumbnail.url}`}
//               alt="Thumbnail"
//               className="w-32 h-32 object-cover mb-2"
//             />
//             <button
//               type="button"
//               onClick={() => setThumbnail(null)}
//               className="text-red-500"
//             >
//               Remove Thumbnail
//             </button>
//           </div>
//         ) : (
//           <p>No thumbnail selected</p>
//         )}
//         <input
//           type="file"
//           id="Thumbnail"
//           name="Thumbnail"
//           onChange={(e) => setThumbnail(e.target.files[0] || null)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//       </div> */}

//         <div>
//           <label>Media:</label>
//           {thumbnail ? (
//             <div className="mt-4">
//               <img
//                 src={`https://upbeat-life-04fe8098b1.strapiapp.com${thumbnail.url}`}
//                 alt={thumbnail.name}
//                 className="w-32 h-32 object-cover"
//               />
//               <p>{thumbnail.name}</p>
//             </div>
//           ) : (
//             <p> Not selected anything</p>
//           )}
//           <MediaSelector onMediaSelect={handleMediaSelect} />
//         </div>

//         <div className="mb-4">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             Save Changes
//           </button>
//         </div>
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

export default function UpdateThemeForm({ documentId }) {
  const [metaDesc, setMetaDesc] = useState("");
  const [title, setTitle] = useState("");
  const [mainContent, setMainContent] = useState("");
  const [launchTime, setLaunchTime] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data for the "How It Works" section
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await fetch(
          `https://upbeat-life-04fe8098b1.strapiapp.com/api/our-themes/${documentId}?populate=*`
        );
        const data = await res.json();

        const content = data.data;
        if (content) {
          setTitle(content.Title || ""); // Set default values if not found
          setMetaDesc(content.metaDesc || ""); // Set default values if not found
          setMainContent(content.MainContent || ""); // Set default values if not found
          setLaunchTime(content.LaunchTime || "");
          setMedia(content?.Thumbnail?.id || null); // Set the media ID or null if no media is selected
        }
        console.log("Fetched MileStone Content", content);
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
        LaunchTime: launchTime,
        Title: title,
        metaDesc: metaDesc,
        MainContent: mainContent,
        Thumbnail: media?.id || null, // Use media ID if selected
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(
        `https://upbeat-life-04fe8098b1.strapiapp.com/api/our-themes/${documentId}?populate=Thumbnail`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Updated Theme Content:", data);
      setOpenDialog(true); // Show success dialog
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Error updating content.");
    }
  };

  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia); // Store the selected media object
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit How It Works Section</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <img
                src={media.url}
                // src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
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
          <label htmlFor="title" className="block">
            title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="metaDesc" className="block">
            Meta Desc
          </label>
          <input
            type="text"
            id="metaDesc"
            name="metaDesc"
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="subCategory" className="block">
            Launch Time
          </label>
          <input
            type="datetime-local"
            id="lunchTime"
            name="subCategory"
            value={launchTime}
            onChange={(e) => setLaunchTime(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="Description" className="block">
            Main Content
          </label>
          <ClaraMarkdownRichEditor
            value={mainContent}
            onChange={(newContent) => setMainContent(newContent)}
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-red text-white rounded">
          Update Badge
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
