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


    console.log('Payload Sent', newBlog)
    try {
      const response = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/blogs", {
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
            onClick={() => router.push("/cora/website/community")}
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
                  src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
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
