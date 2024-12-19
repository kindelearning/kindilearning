"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function EditTnc() {
  const [content, setContent] = useState({
    Title: "",
    Body: "",
    Pagecontent: "",
    Lastupdated: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/tnc?populate=*"
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:1337/api/tnc", {
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
      const updatedContent = await response.json();
      alert("Content updated successfully!");
    } else {
      alert("Failed to update content.");
    }
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
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Edit Terms and Condition Page
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Make necessary changes and save.
        </p>
      </div>

      {/* Form Card */}
      <Card className="p-8 bg-white shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title field - Disabled */}
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
              disabled
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Body field */}
          {/* <div>
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
          </div> */}

          {/* Pagecontent field */}
          <div>
            <label
              htmlFor="Pagecontent"
              className="block text-lg font-medium text-gray-700"
            >
              Page Content
            </label>
            <Textarea
              id="Pagecontent"
              name="Pagecontent"
              value={content.Pagecontent || ""}
              onChange={handleChange}
              rows="20"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Lastupdated field */}
          <div>
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

          {/* <div>
            <label
              htmlFor="AdditionalInfo"
              className="block text-lg font-medium text-gray-700"
            >
              Additional Info
            </label>
            <Textarea
              id="AdditionalInfo"
              name="AdditionalInfo"
              onChange={handleChange}
              rows="4"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}

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
    </div>
  );
}
