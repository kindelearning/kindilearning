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

  // Fetch existing blog data based on documentId
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(
          `https://proper-fun-404805c7d9.strapiapp.com/api/blogs/${documentId}?populate=*`
        );
        const data = await res.json();
        setExistingData(data.data);
        setText(data.data.Text || "");
        setDescription(data.data.Description || "");
        setSEOKeywords(data.data.SEOKeywords || "");
        setMetaDescription(data.data.MetaDescription || "");
        setLikes(data.data.Likes || "");
        setContent(data.data.Content || "");
        setDislikes(data.data.Dislikes || "");
      } catch (err) {
        console.error("Error fetching blog data:", err);
      }
    };

    fetchBlogData();
  }, [documentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data[Text]", text);
    formData.append("data[Description]", description);
    formData.append("data[SEOKeywords]", sEOKeywords);
    formData.append("data[MetaDescription]", metaDescription);
    formData.append("data[Content]", Content);
    formData.append("data[Likes]", likes);
    formData.append("data[Dislikes]", dislikes);

    try {
      const res = await fetch(`https://proper-fun-404805c7d9.strapiapp.com/api/blogs/${documentId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      console.log("Updated Blog:", data);
      setOpenDialog(true); // Show the success dialog
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Error updating blog.");
    }
  };

  return (
    <div className="container mx-auto p-4">
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
