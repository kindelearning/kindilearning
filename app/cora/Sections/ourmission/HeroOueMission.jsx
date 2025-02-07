"use client";
import { fetchOurMission } from "@/app/data/p/OurMission";
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
import { useEffect, useState } from "react";
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";
import MediaSelector from "../../website/media/Section/MediaSelector";
import Link from "next/link";

export default async function HeroOueMission() {
  const data = await fetchOurMission();

  if (!data) {
    return <div>No content available.</div>;
  }

  return (
    <>
      <section className="container mx-auto min-h-screen flex items-start bg-white">
        <div className="w-full py-4 flex flex-col items-start animate-fadeIn">
          {/* Featured Text */}
          {data.Hero.featuredText && (
            <p className="text-gray-900 animate-slideInLeft delay-1000">
              {data.Hero.featuredText}
            </p>
          )}

          {/* Heading */}
          <div className="flex flex-col w-full items-start space-y-3 animate-fadeIn delay-1500">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight animate-slideInLeft delay-2000">
              {data.Hero.Title.split(" ").slice(0, 2).join(" ")}{data.Hero.Title.split(" ").slice(2).join(" ")}
              <span className="block text-gray-800">
                
              </span>
            </h1>

            {/* Body Content */}
            <div
              dangerouslySetInnerHTML={{ __html: data.Hero.Body }}
              className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed animate-slideInLeft delay-3000"
            />

            {/* Get Started Button */}
            {data.Hero?.additionalField && (
              <Link
                href={data.Hero.additionalField}
                target="_blank"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-lg font-medium shadow-md transition hover:shadow-lg hover:bg-indigo-700 animate-slideInLeft delay-3500"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// export function UpdateHeroSection2() {
//   const [formData, setFormData] = useState({
//     Title: "",
//     Body: "",
//     featuredText: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     fetch("https://lionfish-app-98urn.ondigitalocean.app/api/our-mission?populate=*")
//       .then((res) => res.json())
//       .then((data) => {
//         // Assuming the response structure is { data: { Hero: {...} } }
//         if (data?.data?.Hero) {
//           const { Title, Body, featuredText } = data.data.Hero;
//           setFormData({
//             Title,
//             Body,
//             featuredText,
//           });
//         } else {
//           setError("Hero data not found");
//         }
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
//         Hero: {
//           Title: formData.Title,
//           Body: formData.Body,
//           featuredText: formData.featuredText,
//         },
//       },
//     };
//     console.log("Sent Data", payload);

//     try {
//       const res = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/our-mission", {
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

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target || e;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Edit Hero</h2>
//       <form onSubmit={handleSubmit} className="space-y-6 p-6">
//         {/* Edit Title */}
//         <div className="space-y-2">
//           <label htmlFor="Title">Title:</label>
//           <input
//             type="text"
//             name="Title"
//             value={formData.Title || ""}
//             onChange={handleChange}
//             placeholder="Edit Title"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Edit Body */}
//         <div className="space-y-2">
//           <label htmlFor="Body">Body:</label>

//           <ClaraMarkdownRichEditor
//             onChange={(value) =>
//               handleChange({ target: { name: "Body", value } })
//             }
//             value={formData.Body || ""}
//           />
//         </div>

//         {/* Edit featuredText */}
//         <div className="space-y-2">
//           <label htmlFor="featuredText">Featured Text:</label>
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             name="featuredText"
//             value={formData.featuredText || ""}
//             onChange={handleChange}
//             placeholder="Edit Featured Text"
//           />
//         </div>

//         <button type="submit">Update Hero</button>
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

export function UpdateHeroSection() {
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
          "https://lionfish-app-98urn.ondigitalocean.app/api/our-mission?populate=Hero.Media"
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

        console.log("Fetched Content", content);
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
          additionalField: additionalField,

          featuredText: featuredText,
          // Media: media?.id || null, // Use media ID if selected
        },
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/our-mission",
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

  const handleEditorChange = (newValue) => {
    setBody(newValue); // Update body state with the new value from the editor
  };

  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia); // Store the selected media object
  };

  return (
    <div className="p-8">
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
            Get Started Link:
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
        {/* <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <img
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
        </div> */}

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
