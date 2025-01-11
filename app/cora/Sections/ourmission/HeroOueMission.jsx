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

export default async function HeroOueMission() {
  const data = await fetchOurMission();

  if (!data) {
    return <div>No content available.</div>;
  }

  return (
    <>
      <section className="max-w-[1500px] min-h-screen h-full  md:h-full lg:h-full flex justify-start bg-[#ffffff] w-full items-start">
        <div className="w-full py-0 md:py-2 flex-col flex justify-start items-start script animate-fadeIn animate-delay-500">
          <div className="w-full text-[#1d1d1d] clarascript animate-slideInLeft script animate-delay-1000">
            {data.Hero.featuredText && <p>{data.Hero.featuredText}</p>}
          </div>
          <div className="flex flex-col w-full justify-start items-start heading animate-fadeIn animate-delay-1500">
            <div className="text-start flex-wrap w-full animate-slideInLeft animate-delay-2000">
              <span className="text-[#1d1d1d] claraheading">
                {data.Hero.Title.split(" ").slice(0, 2).join(" ")}{" "}
              </span>
              <span className="text-[#1d1d1d] claraheading">
                {data.Hero.Title.split(" ").slice(2, 3).join(" ")}
              </span>
            </div>
            <div className="w-full text-start justify-start items-start px-0 animate-fadeIn animate-delay-2500">
              <div
                dangerouslySetInnerHTML={{ __html: data.Hero.Body }}
                className="w-full prose text-start text-[#696969] text-[16px] leading-[20px] md:text-[18px] md:leading-[22px] lg:text-[22px] lg:leading-[24px] xl:text-[22px] xl:leading-[24px] font-medium font-fredoka animate-slideInLeft animate-delay-3000"
              />
            </div>
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
//     fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/our-mission?populate=*")
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
//       const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/our-mission", {
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
  const [media, setMedia] = useState(null); // Media state
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data for MonthlyTheme content
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/our-mission?populate=Hero.Media"
        );
        const data = await res.json();

        const content = data.data;
        if (content) {
          setTitle(content.Hero?.Title || ""); // Set default values if not found
          setBody(content.Hero?.Body || "");
          setFeaturedText(content.Hero?.featuredText || "");
          setMedia(content.Hero?.Media?.id || null); // Set the media ID or null if no media is selected
        }

        console.log('Fetched Content', content);
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
          Media: media?.id || null, // Use media ID if selected
        },
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(
        "https://upbeat-life-04fe8098b1.strapiapp.com/api/our-mission",
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
          <textarea
            id="BodyDescription"
            name="BodyDescription"
            value={body}
            onChange={(e) => setBodyDescription(e.target.value)}
            className="border p-2 w-full"
            rows="5"
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
              <img
                src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
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