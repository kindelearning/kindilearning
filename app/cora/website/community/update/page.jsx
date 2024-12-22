"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogText,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation to All Blogs page
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Description } from "@radix-ui/react-dialog";
import LocalHeader from "../../test/Topbar";
import DeleteContent from "../delete/page";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/blogs?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          setBlogs(data.data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = (documentId) => {
    console.log("Deleting documentId:", documentId);
    setBlogs((prevBlogs) =>
      prevBlogs.filter((item) => item.documentId !== documentId)
    );
  };

  const handleUpdateClick = (item) => {
    setSelectedBlog(item);
    setIsDialogOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    // Exclude fields like documentId, createdAt, updatedAt, publishedAt, and localizations
    const {
      documentId,
      createdAt,
      updatedAt,
      localizations,
      publishedAt,
      id,
      locale,
      ...updateData
    } = selectedBlog;

    try {
      // Perform the PUT request using documentId in the URL
      const response = await fetch(
        `http://localhost:1337/api/blogs/${documentId}`, // Using documentId to identify the blog
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: updateData, // Send only the fields that need to be updated
          }),
        }
      );

      const responseData = await response.json();
      console.log("Update Response:", responseData);

      if (response.ok) {
        // Update the local state with updated data
        setBlogs((prevBlogs) =>
          prevBlogs.map((item) =>
            item.documentId === documentId
              ? { ...item, ...responseData.data }
              : item
          )
        );
        setSuccess("Blog updated successfully!");
      } else {
        setError(
          `Update failed: ${responseData?.error?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
      console.error("Update Error:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBlog({ ...selectedBlog, [name]: value });
  };

  if (loading)
    return (
      <div className="text-center mt-8 text-lg font-medium">Loading...</div>
    );
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="w-full flex flex-col items-center">
      <LocalHeader />
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Blog List</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-lg mt-4">No blogs available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          {blogs.map((item) => (
            <div
              key={item.documentId}
              className="border rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col space-y-4 bg-white"
            >
              <h2 className="text-2xl font-bold text-gray-700">{item.Text}</h2>
              <p className="text-gray-600 line-clamp-3">{item.Description}</p>
              <p className="text-sm text-gray-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => handleUpdateClick(item)}
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  Update
                </button>
                <DeleteContent
                  documentId={item.documentId}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Dialog */}
      {isDialogOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Update Blog</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Dynamically render fields */}
              {Object.keys(selectedBlog).map((field) => {
                if (
                  field !== "documentId" &&
                  field !== "id" &&
                  field !== "createdAt" &&
                  field !== "updatedAt" &&
                  field !== "FeaturedImage" &&
                  field !== "locale" &&
                  field !== "localizations" &&
                  field !== "publishedAt"
                ) {
                  return (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-gray-700 font-medium"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "Date" ? "date" : "text"}
                        id={field}
                        name={field}
                        value={selectedBlog[field]}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  );
                }
                return null;
              })}

              <div className="flex justify-between items-center mt-4">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="text-red-600 hover:text-red-700"
                >
                  Cancel
                </button>
              </div>

              {success && (
                <p className="text-green-500 mt-4 text-sm">{success}</p>
              )}
              {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// const BlogEditor = () => {
//   const [blogEntries, setBlogEntries] = useState([]);
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [newField, setNewField] = useState(false);

//   // Fetch the blog entries
//   useEffect(() => {
//     const fetchBlogEntries = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "http://localhost:1337/api/blogs?populate=*"
//         );
//         const data = await response.json();
//         setBlogEntries(data.data);
//       } catch (error) {
//         console.error("Error fetching blog entries:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogEntries();
//   }, []);

//   // Update blog content
//   const handleUpdate = async (documentId, updatedData) => {
//     try {
//       const response = await fetch(`http://localhost:1337/api/blogs/${documentId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           data: updatedData, // Strapi expects the data to be in a "data" field
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to update blog: ${response.statusText}`);
//       }
  
//       const updatedEntry = await response.json();
//       console.log("Updated Entry:", updatedEntry); // Log the updated entry for debugging
  
//       setBlogEntries((prevEntries) =>
//         prevEntries.map((entry) =>
//           entry.documentId === documentId ? { ...entry, ...updatedEntry.data } : entry
//         )
//       );
//       setSelectedEntry(null); // Close edit mode after saving
//     } catch (error) {
//       console.error("Error updating blog entry:", error);
//     }
//   };

//   // Delete a blog entry
//   const handleDelete = async (documentId) => {
//     try {
//       await fetch(`http://localhost:1337/api/blogs/${documentId}`, {
//         method: "DELETE",
//       });
//       setBlogEntries((prevEntries) =>
//         prevEntries.filter((entry) => entry.documentId !== documentId)
//       );
//     } catch (error) {
//       console.error("Error deleting blog entry:", error);
//     }
//   };

//   // Handle field change
//   const handleInputChange = (e, field) => {
//     setSelectedEntry((prev) => ({
//       ...prev,
//       [field]: e.target.value,
//     }));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Manage Blog Entries</h1>
//       {/* Display loading message */}
//       {loading && <p>Loading...</p>}
//       {/* Display existing blog entries */}
//       {blogEntries.length === 0 && <p>No blog entries found</p>}
//       <div className="grid grid-cols-1 gap-6">
//         {blogEntries.map((entry) => (
//           <div
//             key={entry.documentId}
//             className="border rounded-xl shadow-lg p-6 bg-white"
//           >
//             <h2 className="text-xl font-bold">{entry.Name}</h2>
//             <p>{entry.Description}</p>
//             {/* Editable content for selected entry */}
//             {selectedEntry && selectedEntry.documentId === entry.documentId ? (
//               <div>
//                 <div className="mb-4">
//                   <label htmlFor="name" className="block text-gray-700">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={selectedEntry.Name}
//                     onChange={(e) => handleInputChange(e, "Name")}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="description" className="block text-gray-700">
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     id="description"
//                     value={selectedEntry.Description}
//                     onChange={(e) => handleInputChange(e, "Description")}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="content" className="block text-gray-700">
//                     Content
//                   </label>
//                   <textarea
//                     id="content"
//                     value={selectedEntry.Content}
//                     onChange={(e) => handleInputChange(e, "Content")}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     rows="6"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="seoKeywords" className="block text-gray-700">
//                     SEO Keywords
//                   </label>
//                   <input
//                     type="text"
//                     id="seoKeywords"
//                     value={selectedEntry.SEOKeywords}
//                     onChange={(e) => handleInputChange(e, "SEOKeywords")}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="metaDescription"
//                     className="block text-gray-700"
//                   >
//                     Meta Description
//                   </label>
//                   <input
//                     type="text"
//                     id="metaDescription"
//                     value={selectedEntry.MetaDescription}
//                     onChange={(e) => handleInputChange(e, "MetaDescription")}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <button
//                   onClick={() => handleUpdate(entry.documentId, selectedEntry)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   onClick={() => setSelectedEntry(null)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-lg ml-2"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-4">
//                 <div dangerouslySetInnerHTML={{ __html: entry.Content }} />{" "}
//                 {/* Render HTML content directly */}
//                 <p>{entry.SEOKeywords}</p>
//                 <p>{entry.MetaDescription}</p>
//                 <div className="flex justify-between items-center mt-4">
//                   <button
//                     onClick={() => setSelectedEntry(entry)}
//                     className="text-blue-600 hover:text-blue-700"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(entry.documentId)}
//                     className="text-red-600 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       {/* Add another field functionality */}
//       <button
//         onClick={() => setNewField(!newField)}
//         className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
//       >
//         {newField ? "Cancel New Field" : "Add Another Field"}
//       </button>
//       {newField && (
//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Enter new field name"
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogEditor;
