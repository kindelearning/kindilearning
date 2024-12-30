"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import "react-quill/dist/quill.snow.css"; // Include Quill's styles
// import dynamic from "next/dynamic";
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";

// Dynamically import ReactQuill to avoid SSR issues
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// const modules = {
//   toolbar: [
//     [
//       { header: "1" },
//       { header: "2" },
//       { header: "3" },
//       { header: "4" },
//       { header: "5" },
//       { header: "6" },
//       { align: [] },
//     ],
//     ["bold", "italic", "underline", "strike"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ color: [] }], // Text color
//     ["link", "image"],
//     ["blockquote", "code-block"],
//     ["clean"], // For clearing the content
//   ],
// };
export default function EditRefund() {
  const [content, setContent] = useState({
    Title: "",
    Body: "",
    Pagecontent: "",
    Lastupdated: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/privacypolicy?populate=*"
        );
        const data = await response.json();
        setEditorLoaded(true); // Set editorLoaded to true once the component is mounted

        if (response.ok) {
          setContent(data.data.Content);
        } else {
          setError("Failed to fetch content");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleChange = (value, delta, source, editor) => {
    setContent({
      ...content,
      Pagecontent: value, // Only update Pagecontent
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/privacypolicy", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Content: {
            Title: content.Title,
            Body: content.Body, // Keep Body as plain text
            Pagecontent: content.Pagecontent, // Save rich text for Pagecontent
            Lastupdated: new Date(),
          },
        },
      }),
    });

    if (response.ok) {
      setDialogMessage("Content updated successfully!");
      setDialogType("success");
    } else {
      setDialogMessage("Failed to update content.");
      setDialogType("error");
    }

    setOpenDialog(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container font-fredoka mx-auto px-8 py-12 font-poppins">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Edit Your Refund Policy Page
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Make necessary changes and save.
        </p>
      </div>

      <Card className="p-8 bg-white shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex w-full gap-2 justify-between">
            <div className="flex w-full flex-col">
              <label
                htmlFor="Title"
                className="block text-lg font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                id="Title"
                type="text"
                name="Title"
                value={content.Title}
                disabled
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div className="flex w-full flex-col">
              <label
                htmlFor="Lastupdated"
                className="block text-lg font-medium text-gray-700"
              >
                Last Updated
              </label>
              <Input
                id="Lastupdated"
                type="text"
                name="Lastupdated"
                value={new Date(content.Lastupdated).toLocaleString()}
                disabled
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <label
            htmlFor="Body"
            className="block text-lg font-medium text-gray-700"
          >
            Body
          </label>
          <Textarea
            id="Body"
            name="Body"
            value={content.Body || ""}
            onChange={(e) => setContent({ ...content, Body: e.target.value })}
            rows="6"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />

          <label
            htmlFor="Pagecontent"
            className="block text-lg font-medium text-gray-700"
          >
            Page Content
          </label>
          {/* <ReactQuill
            value={content.Pagecontent || ""}
            onChange={handleChange}
            modules={modules}
            className="mt-2 w-full max-h-96 overflow-auto border border-gray-300 rounded-lg focus:outline-none"
          /> */}
          {editorLoaded ? (
            // <ReactQuill
            //   value={content.Pagecontent || ""}
            //   onChange={handleChange}
            //   modules={modules}
            //   className="mt-2 w-full max-h-96 overflow-auto border border-gray-300 rounded-lg focus:outline-none"
            // />
            <ClaraMarkdownRichEditor
              onChange={handleChange}
              value={content.Pagecontent || ""}
              className="mt-2 w-full max-h-96 overflow-auto border border-gray-300 rounded-lg focus:outline-none"
            />
          ) : (
            <div className="p-4 border rounded-md">Loading editor...</div>
          )}


          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 text-white px-6 py-3">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "success" ? "Success" : "Error"}
            </DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
