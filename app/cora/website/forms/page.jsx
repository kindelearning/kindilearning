"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import RichTextRender from "@/app/Sections/Global/RichTextRender";

export default function ContactFormPage() {
  const [contactForms, setContactForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 10; // Number of items per page

  // Fetch contact form entries from API
  useEffect(() => {
    const fetchContactForms = async () => {
      const res = await fetch(
        "https://proper-fun-404805c7d9.strapiapp.com/api/contact-forms?populate=*"
      );
      if (res.ok) {
        const data = await res.json();
        console.log("Form data:", data); // Check the response structure in the console

        // Sort entries by createdAt (desc) and set state
        const sortedForms = data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setContactForms(sortedForms); // Set the data from 'data.data'
      } else {
        alert("Failed to fetch contact forms");
      }
      setLoading(false);
    };

    fetchContactForms();
  }, []);

  const renderMessage = (message) => {
    if (!message || !Array.isArray(message)) {
      return <p>{message}</p>; // Return the original message if it's not an array
    }

    const truncatedMessage = message.slice(0, 1).map((block, index) => {
      return block.children.map((child, idx) => {
        if (child.type === "text") {
          return <p key={`${index}-${idx}`}>{child.text.slice(0, 100)}...</p>; // Truncate to 100 characters
        }
        if (child.type === "link") {
          return (
            <a
              key={`${index}-${idx}`}
              href={child.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {child.children
                .map((linkChild, linkIdx) => linkChild.text)
                .join("")
                .slice(0, 40) + "..."}{" "}
              {/* Truncate link text */}
            </a>
          );
        }
        return null;
      });
    });

    return truncatedMessage;
  };

  // Format date and time to a readable format (e.g., "December 22, 2024, 4:30 PM")
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // For 12-hour time format with AM/PM
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  // Calculate the paginated data
  const indexOfLastForm = currentPage * itemsPerPage;
  const indexOfFirstForm = indexOfLastForm - itemsPerPage;
  const currentForms = contactForms.slice(indexOfFirstForm, indexOfLastForm);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="p-8 min-h-screen font-fredoka bg-gray-100">
      <head>
          <title>Forms - Kindi Learning</title>
        </head>
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold">Contact Form Entries</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Table>
                <TableCaption>A list of contact form submissions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serial</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Subject</TableHead>
                    {/* <TableHead>Message</TableHead> */}
                    <TableHead>Enquiry Type</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentForms.length > 0 ? (
                    currentForms.map((form, index) => (
                      <TableRow key={form.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{form.Name}</TableCell>
                        <TableCell>{form.Email}</TableCell>
                        <TableCell>{form.Phone}</TableCell>
                        <TableCell>{form.Subject}</TableCell>
                        {/* <TableCell>
                          {Array.isArray(form.Message) ? (
                            <RichTextRender content={form.Message} />
                          ) : (
                            <p>{form.Message}</p> // If it's not an array, just display the string
                          )}
                        </TableCell> */}
                        <TableCell>{form.EnquiryType}</TableCell>
                        <TableCell>{formatDate(form.createdAt)}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger>
                              <Eye />
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-[1000px] max-h-[600px] overflow-y-scroll">
                              <DialogHeader>
                                <DialogTitle>Contact Form Details</DialogTitle>
                                <DialogDescription>
                                  Below are the details of the contact form
                                  entry.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 font-fredoka text-gray-700">
                                {/* Contact Details */}
                                <p className="text-lg font-medium">
                                  <strong>Name:</strong> {form.Name}
                                </p>
                                <p className="text-lg font-medium">
                                  <strong>Email:</strong> {form.Email}
                                </p>
                                <p className="text-lg font-medium">
                                  <strong>Phone:</strong> {form.Phone}
                                </p>
                                <p className="text-lg font-medium">
                                  <strong>Subject:</strong> {form.Subject}
                                </p>
                                <p className="text-lg font-medium">
                                  <strong>Message:</strong>
                                  {Array.isArray(form.Message) ? (
                                    <RichTextRender content={form.Message} />
                                  ) : (
                                    <p>{form.Message}</p> // If it's not an array, just display the string
                                  )}
                                </p>
                                <p className="text-lg font-medium">
                                  <strong>Enquiry Type:</strong>{" "}
                                  {form.EnquiryType}
                                </p>
                                <p className="text-lg font-medium">
                                  <strong>Date Created:</strong>{" "}
                                  {formatDate(form.createdAt)}
                                </p>

                                {/* CTA Button */}
                                <div className="mt-6 flex justify-end">
                                  <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    Send Reply
                                  </button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        No contact forms available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={indexOfLastForm >= contactForms.length}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
