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
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";

export default function EditRefund() {
  const [content, setContent] = useState({
    Title: "",
    Body: "",
    Pagecontent: "",
    Lastupdated: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog visibility
  const [dialogMessage, setDialogMessage] = useState(""); // Message to show in the dialog
  const [dialogType, setDialogType] = useState(""); // Type of dialog: success or error

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://kindiadmin.up.railway.app/api/qualitycontrol?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          setContent(data.data.Content); // Access 'Content' directly
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

  const handleChange = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = (value, delta, source, editor) => {
    setContent({
      ...content,
      Pagecontent: value, // Only update Pagecontent
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://kindiadmin.up.railway.app/api/qualitycontrol", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Content: {
            Title: content.Title,
            Body: content.Body,
            Pagecontent: content.Pagecontent,
            Lastupdated: new Date(),
          },
        },
      }),
    });

    if (response.ok) {
      setDialogMessage(
        "Content updated successfully! Changes will reflect in a while"
      );
      setDialogType("success");
    } else {
      setDialogMessage("Failed to update content.");
      setDialogType("error");
    }

    setOpenDialog(true); // Open the dialog after submission
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <head>
        <title>Quality Controls | Update</title>
        <meta
          name="description"
          content="At Kindi, we blend cutting-edge technology with research-backed early childhood education practices to deliver a seamless, engaging, and effective learning experience for children, carers, and educators."
        />
      </head>
      <div className="container mx-auto px-8 py-12 font-poppins">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Edit Your Quality Control Page
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Make necessary changes and save.
          </p>
        </div>

        {/* Form Card */}
        <Card className="p-8 bg-white shadow-xl rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex w-full gap-2 justify-between">
              {/* Title field - Disabled */}
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
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Lastupdated field */}
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
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Body field */}
            <div className="flex w-full flex-col">
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
                onChange={handleChange}
                rows="6"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Pagecontent field */}
            <div className="flex w-full flex-col">
              <label
                htmlFor="Pagecontent"
                className="block text-lg font-medium text-gray-700"
              >
                Page Content
              </label>
              {/* <Textarea
                id="Pagecontent"
                name="Pagecontent"
                value={content.Pagecontent || ""}
                onChange={handleChange}
                rows="20"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              /> */}
              <ClaraMarkdownRichEditor
                onChange={handleChange2}
                value={content.Pagecontent || ""}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant="outline"
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-6 py-3"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* ShadCN Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="font-fredoka">
            <DialogHeader>
              <DialogTitle className="text-[24px] font-medium">
                {dialogType === "success" ? "Success" : "Error"}
              </DialogTitle>
              <DialogDescription>{dialogMessage}</DialogDescription>
            </DialogHeader>
            {/* <DialogFooter>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
