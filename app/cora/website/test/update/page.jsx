"use client";
import { useState, useEffect } from "react";
import LocalHeader from "../Topbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


export default function EditContent() {
  const [content, setContent] = useState({
    Title: "",
    Date: "",
    Body: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog visibility
  const [dialogMessage, setDialogMessage] = useState(""); // Message to show in the dialog
  const [dialogType, setDialogType] = useState(""); // Type of dialog: success or error

  // Fetching content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/content?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          setContent(data.data); // Directly set the content data
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          Title: content.Title,
          Date: content.Date,
          Body: content.Body,
        },
      }),
    });

    if (response.ok) {
      setDialogMessage(
        "Content updated successfully! Changes will reflect shortly."
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
    <div className="container mx-auto px-8 py-12 font-poppins">
       <head>
        <title>Privacy Policy - Kindi</title>
      </head>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Edit Content</h1>
        <p className="text-lg text-gray-600 mt-2">
          Make necessary changes and save.
        </p>
      </div>

      {/* Form Card */}
      <Card className="p-8 bg-white shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title field */}
          <div>
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
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Date field */}
          <div>
            <label
              htmlFor="Date"
              className="block text-lg font-medium text-gray-700"
            >
              Date
            </label>
            <Input
              id="Date"
              type="date"
              name="Date"
              value={content.Date}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Body field */}
          <div>
            <label
              htmlFor="Body"
              className="block text-lg font-medium text-gray-700"
            >
              Body (Markdown)
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

      {/* Dialog for success or error */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="font-fredoka">
          <DialogHeader>
            <DialogTitle className="text-[24px] font-medium">
              {dialogType === "success" ? "Success" : "Error"}
            </DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
