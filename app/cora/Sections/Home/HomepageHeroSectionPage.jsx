"use client";

import { useState, useEffect } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

// export default function HomepageHeroSection() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedContent, setSelectedContent] = useState(null);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:1337/api/homepage-hero-section?populate=*"
//         );
//         const result = await response.json();

//         if (result.data) {
//           setData(result.data); // result.data is where the content is located
//           setSelectedContent(result.data); // Initializing selectedContent with fetched data
//         } else {
//           console.error("No data found");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleUpdateClick = () => {
//     setIsDialogOpen(true);
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     setUpdateLoading(true);

//     // Exclude fields that should not be updated directly (like id, createdAt, etc.)
//     const { id, createdAt, updatedAt, publishedAt, ...updateData } = selectedContent;

//     try {
//       const response = await fetch(
//         `http://localhost:1337/api/homepage-hero-section/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             data: updateData,
//           }),
//         }
//       );

//       const responseData = await response.json();
//       console.log("Update Response:", responseData);

//       if (response.ok) {
//         // Update the local state with updated data
//         setData(responseData.data);
//         setSuccess("Content updated successfully!");
//       } else {
//         setError(`Update failed: ${responseData?.error?.message || "Unknown error"}`);
//       }
//     } catch (err) {
//       setError(`An error occurred: ${err.message}`);
//       console.error("Update Error:", err);
//     } finally {
//       setUpdateLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedContent({ ...selectedContent, [name]: value });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!data) {
//     return <div>No data available</div>;
//   }

//   // Destructure the fields from the fetched data
//   const { featuredText, HeroTitle, BodyDescription, Image } = data;

//   // Check if Image exists in the data and get the media URL
//   const heroMediaUrl = Image?.data?.attributes?.url || null;

//   // Function to get file extension
//   const getFileExtension = (url) => {
//     return url ? url.split(".").pop().toLowerCase() : null;
//   };

//   // Check for media type (image or video)
//   const fileExtension = heroMediaUrl ? getFileExtension(heroMediaUrl) : null;
//   const isImage =
//     fileExtension &&
//     ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);
//   const isVideo =
//     fileExtension && ["mp4", "webm", "ogg"].includes(fileExtension);

//   return (
//     <div>
//       {/* The Hero Section */}
//       <section className="homepage-hero-section bg-gray-100 py-16 px-6 sm:px-12 md:px-16">
//         <div className="max-w-6xl flex mx-auto text-center">
//           <div className="hero-text max-w-[60%] mb-12">
//             <p className="text-lg text-start sm:text-xl text-gray-600 mb-2">
//               {featuredText}
//             </p>
//             <h1 className="text-3xl text-start font-bold text-gray-700 mb-6">
//               {HeroTitle}
//             </h1>

//             {/* Render BodyDescription if available */}
//             <div className="rich-text text-start prose text-lg sm:text-xl text-gray-700 leading-relaxed">
//               {BodyDescription ? (
//                 <BlocksRenderer content={BodyDescription} />
//               ) : (
//                 <p>No description available</p>
//               )}
//             </div>
//           </div>

//           {/* Render media (image or video) based on file extension */}
//           {heroMediaUrl ? (
//             isVideo ? (
//               <video
//                 autoPlay
//                 loop
//                 muted
//                 className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
//               >
//                 <source
//                   src={`http://localhost:1337${heroMediaUrl}`}
//                   type="video/mp4"
//                 />
//                 Your browser does not support the video.
//               </video>
//             ) : isImage ? (
//               <Image
//                 src={`http://localhost:1337${heroMediaUrl}`}
//                 alt="Hero"
//                 width={1200}
//                 height={800}
//                 className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
//               />
//             ) : (
//               <p className="text-gray-600">Unsupported media type</p>
//             )
//           ) : (
//             <p className="text-gray-600">No media available</p>
//           )}
//         </div>
//       </section>

//       {/* Update Dialog */}
//       {isDialogOpen && selectedContent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//             <h2 className="text-xl font-bold mb-4">Update Hero Section</h2>
//             <form onSubmit={handleUpdateSubmit} className="space-y-4">
//               {/* Dynamically render fields */}
//               {["featuredText", "HeroTitle", "BodyDescription"].map((field) => (
//                 <div key={field}>
//                   <label
//                     htmlFor={field}
//                     className="block text-gray-700 font-medium"
//                   >
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     type="text"
//                     id={field}
//                     name={field}
//                     value={selectedContent[field] || ""}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               ))}

//               <div className="flex justify-between items-center mt-4">
//                 <button
//                   type="submit"
//                   disabled={updateLoading}
//                   className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
//                 >
//                   {updateLoading ? "Updating..." : "Update"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsDialogOpen(false)}
//                   className="text-red-600 hover:text-red-700"
//                 >
//                   Cancel
//                 </button>
//               </div>

//               {success && (
//                 <p className="text-green-500 mt-4 text-sm">{success}</p>
//               )}
//               {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default function HomepageHeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState({
    featuredText: "",
    HeroTitle: "",
    BodyDescription: "",
    Image: null,
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/homepage-hero-section?populate=*"
        );
        const result = await response.json();

        if (result.data) {
          setData(result.data);
          setUpdateData({
            featuredText: result.data.featuredText || "",
            HeroTitle: result.data.HeroTitle || "",
            BodyDescription: result.data.BodyDescription || "",
            Image: result.data.Image || null,
          });
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdateData({
      ...updateData,
      Image: file,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    // Exclude fields like documentId, createdAt, updatedAt, publishedAt, and id
    const {
      documentId,
      createdAt,
      updatedAt,
      publishedAt,
      id,
      ...updateDataToSend
    } = updateData;

    try {
      const formData = new FormData();
      console.log(updateData);

      // Append fields that need to be updated to the FormData
      Object.keys(updateDataToSend).forEach((key) => {
        formData.append(`data[${key}]`, updateDataToSend[key]);
      });

      if (updateData.Image) {
        formData.append("files.Image", updateData.Image);
      }

      const response = await fetch(
        `http://localhost:1337/api/homepage-hero-section/${documentId}`, // Use documentId here
        {
          method: "PUT",
          body: updateData,
        }
      );

      const responseData = await response.json();
      console.log("Update Response:", responseData);

      if (response.ok) {
        setData(responseData.data); // Update the local state with updated data
        setError(null); // Reset any previous errors
        setSuccess("Content updated successfully!");
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {/* The Hero Section */}
      <section className="homepage-hero-section bg-gray-100 py-16 px-6 sm:px-12 md:px-16">
        <div className="max-w-6xl flex mx-auto text-center">
          <div className="hero-text max-w-[60%] mb-12">
            <p className="text-lg text-start sm:text-xl text-gray-600 mb-2">
              {data.featuredText}
            </p>
            <h1 className="text-3xl text-start font-bold text-gray-700 mb-6">
              {data.HeroTitle}
            </h1>

            {/* Render BodyDescription if available */}
            <div className="rich-text text-start prose text-lg sm:text-xl text-gray-700 leading-relaxed">
              {data.BodyDescription ? (
                <BlocksRenderer content={data.BodyDescription} />
              ) : (
                <p>No description available</p>
              )}
            </div>
          </div>

          {/* Render media (image or video) based on file extension */}
          {data.Image?.data?.attributes?.url ? (
            <img
              src={`http://localhost:1337${data.Image.data.attributes.url}`}
              alt="Hero"
              width={1200}
              height={800}
              className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
            />
          ) : (
            <p className="text-gray-600">No media available</p>
          )}
        </div>
      </section>

      {/* Update Form */}
      <section className="update-form-section bg-white py-12 px-6 sm:px-12 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Update Hero Section</h2>

          {/* Form to update hero section */}
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            {/* Featured Text */}
            <div>
              <label
                htmlFor="featuredText"
                className="block text-gray-700 font-medium"
              >
                Featured Text
              </label>
              <input
                type="text"
                id="featuredText"
                name="featuredText"
                value={updateData.featuredText}
                onChange={handleUpdateChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Hero Title */}
            <div>
              <label
                htmlFor="HeroTitle"
                className="block text-gray-700 font-medium"
              >
                Hero Title
              </label>
              <input
                type="text"
                id="HeroTitle"
                name="HeroTitle"
                value={updateData.HeroTitle}
                onChange={handleUpdateChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Body Description */}
            <div>
              <label
                htmlFor="BodyDescription"
                className="block text-gray-700 font-medium"
              >
                Body Description
              </label>
              <textarea
                id="BodyDescription"
                name="BodyDescription"
                value={updateData.BodyDescription}
                onChange={handleUpdateChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="Image"
                className="block text-gray-700 font-medium"
              >
                Update Image
              </label>
              <input
                type="file"
                id="Image"
                name="Image"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                disabled={updateLoading}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {updateLoading ? "Updating..." : "Update"}
              </button>
            </div>

            {/* Success/Error Messages */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
