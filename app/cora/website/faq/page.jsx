"use client";
 
import Link from "next/link";
import { useEffect, useState } from "react";
import { Accordion } from "../../Sections/Accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newFaq, setNewFaq] = useState({ Question: "", Answer: "" });
  const [openDialog, setOpenDialog] = useState(false); // Manage dialog state

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/faqs?populate=*"
        );
        const data = await response.json();

        if (data?.data) {
          setFaqs(data.data);
        } else {
          setError("No FAQ data found");
        }
      } catch (err) {
        setError("Error fetching FAQs: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleCreateFAQ = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            Question: newFaq.Question,
            Answer: newFaq.Answer,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create FAQ.");
      }

      // Close dialog after submission and reset form
      setOpenDialog(false);
      setNewFaq({ Question: "", Answer: "" });

      // Refresh FAQ list after successful submission
      const updatedData = await response.json();
      setFaqs((prevFaqs) => [...prevFaqs, updatedData.data]);
    } catch (err) {
      setError("Error creating FAQ: " + err.message);
    }
  };

  const deleteFAQ = async (faqId) => {
    try {
      // Send DELETE request to Strapi to remove the FAQ
      const response = await fetch(`https://lionfish-app-98urn.ondigitalocean.app/api/faqs/${faqId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete FAQ.");
      }

      // Remove the FAQ from the local state after deletion
      setFaqs(faqs.filter((faq) => faq.id !== faqId));
    } catch (err) {
      setError("Error deleting FAQ: " + err.message);
    }
  };

  // Show loading message while fetching
  if (loading) {
    return <div>Loading FAQs...</div>;
  }

  // Show error if any
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto font-fredoka px-8 py-12">
      <head>
          <title>FAQ&apos;s - Kindi Learning</title>
        </head>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-medium mb-8">FAQs</h2>
        <div className="flex justify-end">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger className="border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 rounded-lg px-6 py-2">
              Add New FAQ
            </DialogTrigger>

            <DialogContent className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
              <DialogHeader>
                <DialogTitle>Create New FAQ</DialogTitle>
                <DialogDescription>
                  Fill out the details to create a new FAQ entry.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateFAQ} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newFaq.Question}
                    onChange={(e) =>
                      setNewFaq({ ...newFaq, Question: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Answer
                  </label>
                  <textarea
                    value={newFaq.Answer}
                    onChange={(e) =>
                      setNewFaq({ ...newFaq, Answer: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  Add FAQ
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="w-full h-fit gap-2 flex flex-col">
        {faqs.length === 0 ? (
          <p>No FAQs available</p>
        ) : (
          faqs.map((faq) => (
            <Accordion
              key={faq.id}
              faq={faq}
              deleteFAQ={deleteFAQ} // Pass the delete function to Accordion
            />
          ))
        )}
      </div>
    </div>
  );
}
