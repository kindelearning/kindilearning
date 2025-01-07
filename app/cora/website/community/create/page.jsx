"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation to All Blogs page
import Link from "next/link";
import MediaSelector from "../../media/Section/MediaSelector";
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";

// export default function CreateBlog() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [content, setContent] = useState("");
//   const [featuredImage, setFeaturedImage] = useState(null);
//   const [seoKeywords, setSeoKeywords] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState({
//     title: "",
//     description: "",
//   });
//   const [documentId, setDocumentId] = useState(null);
//   const [blogCreated, setBlogCreated] = useState(false);

//   const router = useRouter(); // For navigation to All Blogs page

//   // Handle file upload for featured image
//   const handleFeaturedImageChange = (e) => {
//     setFeaturedImage(e.target.files[0]);
//   };

//   // Handle drag and drop
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       setFeaturedImage(file);
//     }
//   };

//   // Handle content (Rich text input)
//   const handleContentChange = (e) => {
//     setContent(e.target.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("data[Name]", name);
//     formData.append("data[Description]", description);
//     formData.append("data[Content]", content);
//     formData.append("data[SEOKeywords]", seoKeywords);
//     formData.append("data[MetaDescription]", metaDescription);

//     if (featuredImage) {
//       formData.append("files[FeaturedImage]", featuredImage);
//     }

//     try {
//       const res = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/blogs", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log(data); // Log the response to see if any error is returned

//       if (data && data.data) {
//         setDocumentId(data.data.documentId);
//         setBlogCreated(true);
//         setDialogMessage({
//           title: "Blog Created Successfully!",
//           description:
//             "Your blog has been created. You can preview it on the live website.",
//         });
//         setOpenDialog(true); // Open custom dialog
//         setName("");
//         setDescription("");
//         setContent("");
//         setSeoKeywords("");
//         setMetaDescription("");
//         setFeaturedImage(null);
//       } else {
//         setDialogMessage({
//           title: "Failed to Create Blog",
//           description:
//             "There was an issue creating the blog. Please try again.",
//         });
//         setOpenDialog(true); // Open custom dialog
//       }
//     } catch (error) {
//       console.error("Error creating blog:", error);
//       setDialogMessage({
//         title: "Error Creating Blog",
//         description: `An unexpected error occurred: ${error.message}`,
//       });
//       setOpenDialog(true); // Open custom dialog
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="p-8 font-fredoka bg-gray-50 min-h-screen flex justify-center items-center">
//       <div className="container mx-auto bg-white shadow-lg rounded-lg p-8">
//         {/* Header with navigation buttons */}
//         <div className="flex justify-between mb-6">
//           <Button
//             onClick={() => router.push("/cora/website/blogs")}
//             className="text-[#282828] bg-transparent hover:bg-transparent hover:scale-105 ease-out duration-150"
//           >
//             Back to All Blogs
//           </Button>
//           {blogCreated && documentId && (
//             <Link
//               href={`http://localhost:3000/p/blogs/${documentId}`}
//               target="_blank"
//               className="text-purple hover:scale-105 duration-150"
//             >
//               Preview on Live Website
//             </Link>
//           )}
//           <Button
//             type="submit"
//             onClick={handleSubmit}
//             disabled={blogCreated}
//             className="text-green bg-transparent hover:bg-transparent hover:scale-105 ease-out duration-150"
//           >
//             Create a New Blog
//           </Button>
//         </div>

//         <h2 className="text-3xl font-bold text-gray-800 mb-6">
//           Create New Blog
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-row justify-between gap-2">
//             <div className="flex flex-col w-full">
//               <div className="mb-6">
//                 <label
//                   htmlFor="name"
//                   className="block text-lg font-medium text-gray-700 mb-2"
//                 >
//                   Name:
//                 </label>
//                 <Input
//                   id="name"
//                   placeholder="Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="mb-6">
//                 <label
//                   htmlFor="description"
//                   className="block text-lg font-medium text-gray-700 mb-2"
//                 >
//                   Description:
//                 </label>
//                 <Input
//                   id="description"
//                   placeholder="Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="mb-6 w-full">
//               <label
//                 htmlFor="featuredImage"
//                 className="block text-lg font-medium text-gray-700 mb-2"
//               >
//                 Featured Image:
//               </label>
//               <div
//                 className="flex flex-col w-full justify-start items-center p-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer transition-all hover:border-primary"
//                 onDragOver={handleDragOver}
//                 onDrop={handleDrop}
//               >
//                 <input
//                   type="file"
//                   id="featuredImage"
//                   onChange={handleFeaturedImageChange}
//                   className="border w-full rounded-xl justify-start opacity-30"
//                 />
//                 {!featuredImage ? (
//                   <div className="text-center text-gray-500">
//                     <p>
//                       Drag and drop an image here, or click to select a file
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="w-full object-cover h-[300px] bg-gray-200 rounded-md overflow-hidden">
//                     <img
//                       src={URL.createObjectURL(featuredImage)}
//                       alt="Featured Image Preview"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="content"
//               className="block text-lg font-medium text-gray-700 mb-2"
//             >
//               Content:
//             </label>
//             <Textarea
//               placeholder="Content:"
//               id="content"
//               value={content}
//               onChange={handleContentChange}
//               className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows={6}
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="seoKeywords"
//               className="block text-lg font-medium text-gray-700 mb-2"
//             >
//               SEO Keywords:
//             </label>
//             <Input
//               id="seoKeywords"
//               placeholder="SEO Keywords"
//               value={seoKeywords}
//               onChange={(e) => setSeoKeywords(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="metaDescription"
//               className="block text-lg font-medium text-gray-700 mb-2"
//             >
//               Meta Description:
//             </label>
//             <Input
//               id="metaDescription"
//               placeholder="Meta Description"
//               value={metaDescription}
//               onChange={(e) => setMetaDescription(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={loading}
//             className="w-full p-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
//           >
//             {loading ? "Creating..." : "Create Blog"}
//           </Button>
//         </form>

//         {/* Custom Dialog */}
//         <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//           <DialogContent>
//             <DialogTitle>{dialogMessage.title}</DialogTitle>
//             <DialogDescription>{dialogMessage.description}</DialogDescription>
//             <DialogFooter className="sm:justify-start">
//               <DialogClose asChild>
//                 <Button type="button" variant="secondary">
//                   Close
//                 </Button>
//               </DialogClose>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// }
export default function CreateBlog() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    description: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogCreated, setBlogCreated] = useState(false);

  const router = useRouter();

  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia);
  };

  const resetForm = () => {
    setText("");
    setDescription("");
    setContent("");
    setLikes("");
    setDislikes("");
    setSeoKeywords("");
    setMetaDescription("");
    setMedia(null);
    setBlogCreated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newBlog = {
      Text: text,
      Description: description,
      Content: content,
      SEOKeywords: seoKeywords,
      MetaDescription: metaDescription,
      Likes: likes || 0,
      Dislikes: dislikes || 0,
      FeaturedImage: media?.id || null,
    };

    try {
      const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newBlog }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setDialogMessage({
          title: "Success",
          description: "Blog created successfully!",
        });
        setBlogCreated(true);
        resetForm();
      } else {
        setDialogMessage({
          title: "Error",
          description: responseData.error?.message || "Failed to create blog.",
        });
        throw new Error(
          responseData.error?.message || "Failed to create blog."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setIsDialogOpen(true);
    }
  };

  return (
    <section className="p-8 font-fredoka bg-gray-50 min-h-screen flex justify-center items-center">
      <head>
        <title>
          Create New Blog - Cora
        </title>
      </head>
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between mb-6">
          <Button
            onClick={() => router.push("/cora/website/blogs")}
            className="text-[#282828] hover:bg-transparent bg-transparent hover:scale-105 duration-150"
          >
            Back to All Blogs
          </Button>
          {/* {blogCreated && (
            <Link
              href={`http://localhost:3000/p/blogs/${media?.id}`}
              target="_blank"
              className="text-purple hover:scale-105 duration-150"
            >
              Preview on Live Website
            </Link>
          )} */}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create New Blog
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Blog Name:
            </label>
            <Input
              id="name"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter blog name"
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="seoKeywords"
              className="block text-lg font-medium text-gray-700"
            >
              SEO Keywords:
            </label>
            <Input
              id="description"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="Enter blog description"
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="metaDescription"
              className="block text-lg font-medium text-gray-700"
            >
              Meta Description:
            </label>
            <Input
              id="metaDesc"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Enter blog description"
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Description:
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter blog description"
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="media"
              className="block text-lg font-medium text-gray-700"
            >
              Featured Media:
            </label>
            {media ? (
              <div>
                <img
                  src={`https://proper-fun-404805c7d9.strapiapp.com${media.url}`}
                  alt={media.name}
                  className="w-32 h-32 object-cover"
                />
                <p>{media.name}</p>
              </div>
            ) : (
              <p>No media selected</p>
            )}
            <MediaSelector onMediaSelect={handleMediaSelect} />
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700"
            >
              Content:
            </label>
            <ClaraMarkdownRichEditor
              value={content}
              onChange={setContent}
              placeholder="Write your blog content here..."
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white rounded-md"
          >
            {loading ? "Creating..." : "Create Blog"}
          </Button>
        </form>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogTitle>{dialogMessage.title}</DialogTitle>
            <DialogDescription>{dialogMessage.description}</DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
