"use client";
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
import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { useEffect, useState } from "react";
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";

export default function PopularActivities() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/popularlearning?populate=Content.Media"
        );
        const data = await response.json();
        console.log("popularlearning Database", data);
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
        Featured Text
        <p className="text-xl font-medium text-gray-700 mb-6">
          {content?.featuredText}
        </p>
        Title
        <h1 className="text-4xl font-bold mb-6">{content?.title}</h1>
        Body
        <div className="prose">
          {/* <RichTextRender content={content?.BodyDescription} /> */}
          <p
            className="prose w-full text-start text-[#696969] text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
            dangerouslySetInnerHTML={{ __html: content?.BodyDescription }}
          />
        </div>
      </div>

      {/* {content.Media ? (
        <img
          // src={`https://lionfish-app-98urn.ondigitalocean.app${content.Media[0].url}`}
          src={content.Media[0].url}
          alt="Child Development Media"
          className="w-full h-auto"
        />
      ) : (
        <p>No media available.</p>
      )} */}
    </div>
  );
}

// https://lionfish-app-98urn.ondigitalocean.app/api/popularlearning?ite9ryv5396fqmfyrmj29lv2
export function UpdatePopularLearningForm() {
  const [content, setContent] = useState({
    title: "",
    BodyDescription: "",
    featuredText: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch initial content data to pre-fill the form
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/popularlearning?populate=*"
        );
        const data = await response.json();
        setContent({
          title: data.data.Content.title,
          BodyDescription: data.data.Content.BodyDescription,
          featuredText: data.data.Content.featuredText,
        });
      } catch (err) {
        setError("Error fetching content");
      }
    };

    fetchContent();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedContent = {
      data: {
        Content: {
          title: content.title,
          BodyDescription: content.BodyDescription,
          featuredText: content.featuredText,
        },
      },
    };

    try {
      const response = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/popularlearning?nxfbah0rlj4nhjo381vg7x8q",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setDialogMessage("Content updated successfully!");
      } else {
        setDialogMessage("Error updating content.");
      }
    } catch (err) {
      setDialogMessage("Error updating content.");
    } finally {
      setIsDialogOpen(true);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Content</h2>

      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            title
          </label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            BodyDescription
          </label>
          {/* <textarea
            value={content.BodyDescription}
            onChange={(e) =>
              setContent({ ...content, BodyDescription: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
          /> */}
          <ClaraMarkdownRichEditor
            name="BodyDescription"
            value={content.BodyDescription || ""} // Ensure the value is always a string
            onChange={(value) =>
              setContent({ ...content, BodyDescription: value })
            }
          />
          {/* {content.BodyDescription && (
          )} */}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Featured Text
          </label>
          <input
            type="text"
            value={content.featuredText}
            onChange={(e) =>
              setContent({ ...content, featuredText: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Content"}
          </button>
        </div>
      </form>

      {/* Shadcn Dialog for Success/Error Message */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogClose
            onClick={() => setIsDialogOpen(false)}
            className="bg-red text-white rounded-md px-4 py-2"
          >
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
