"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteContent from "./delete/page";
import { Eye } from "lucide-react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch all blogs
  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:1337/api/blogs?populate=*");
    const data = await res.json();

    if (data && data.data) {
      setBlogs(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePreview = (blog) => {
    setSelectedBlog(blog);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published"; // Toggle status between published and draft

    const res = await fetch(`http://localhost:1337/api/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? { ...blog, status: newStatus } : blog
        )
      );
    } else {
      // Handle error
      console.error("Failed to update status");
    }
  };
  const handleDelete = (documentId) => {
    // Log the documentId being deleted
    console.log("Deleting documentId:", documentId);

    // Remove the deleted item from the UI
    setBlogs((prevContent) =>
      prevContent.filter((blog) => blog.documentId !== documentId)
    );
  };
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.Text && blog.Text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedBlogs = filteredBlogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(filteredBlogs.length / rowsPerPage);

  const handleSort = (field) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);

    const sortedBlogs = [...filteredBlogs].sort((a, b) => {
      if (direction === "asc") {
        return new Date(a[field]) - new Date(b[field]);
      } else {
        return new Date(b[field]) - new Date(a[field]);
      }
    });

    setBlogs(sortedBlogs);
  };

  return (
    <>
      <section className="p-8 font-fredoka bg-gray-100">
        <div className="container mx-auto">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center mb-4">
              <label
                htmlFor="rows-per-page"
                className="mr-2 text-xl font-medium"
              >
                Rows per page:
              </label>
              <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                className="p-2 border rounded-md"
              >
                {[5, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <Link
              target="_blank"
              className="text-purple hover:scale-105 duration-150"
              href="/cora/website/community/create"
            >
              Create New Blog
            </Link>
          </div>

          <Input
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />

          {/* Data Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Featured Image</TableHead>
                <TableHead>Text</TableHead>
                <TableHead>Meta Description</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At {sortDirection === "asc" ? "↑" : "↓"}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedBlogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    {blog.status === "published" ? "Draft" : " Published"}
                  </TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:1337${blog?.FeaturedImage?.url}`}
                      alt={blog?.Text}
                      className="w-[40px] border-2 border-[#333333] rounded-full h-[40px] object-cover"
                    />
                  </TableCell>
                  <TableCell>{blog.Text}</TableCell>
                  <TableCell>{blog.MetaDescription.slice(0, 100)}...</TableCell>
                  <TableCell>
                    {new Date(blog.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="flex">
                    <DeleteContent
                      documentId={blog.documentId}
                      onDelete={handleDelete}
                    />
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          variant="primary"
                          onClick={() => handlePreview(blog)}
                        >
                          <Eye className="text-[#7f7f7f]  w-5 h-5 duration-300 ease-in-out hover:text-black" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[600px] font-fredoka max-w-[1000px] overflow-y-scroll">
                        <DialogTitle>{selectedBlog?.Text}</DialogTitle>
                        <DialogDescription>
                          <div className="w-full flex flex-col">
                            <div className="flex w-full gap-4 justify-between items-start">
                              {/* Featured Image */}
                              <img
                                src={`http://localhost:1337${selectedBlog?.FeaturedImage?.url}`}
                                alt={selectedBlog?.Text}
                                className="w-full h-[300px] object-cover rounded-lg mb-6"
                              />
                              <div className="flex w-full flex-col justify-start items-start">
                                {/* Blog Text */}
                                <div>
                                  <strong className="text-xl font-medium">
                                    Text
                                  </strong>
                                  <p className="text-gray-600 text-sm mt-2">
                                    {selectedBlog?.Text}
                                  </p>
                                </div>
                                {/* Meta Description */}
                                <div>
                                  <strong className="text-xl font-medium">
                                    Meta Description
                                  </strong>
                                  <p className="text-gray-600 text-sm mt-2">
                                    {selectedBlog?.MetaDescription}
                                  </p>
                                </div>
                                {/* Created At */}
                                <div>
                                  <strong className="text-xl font-medium">
                                    Created At
                                  </strong>
                                  <p className="text-gray-600 text-sm mt-2">
                                    {new Date(
                                      selectedBlog?.createdAt
                                    ).toLocaleString()}
                                  </p>
                                </div>
                                {/* Toggle Status Button */}
                                <div className="mt-4">
                                  <Button
                                    variant={
                                      selectedBlog?.status === "published"
                                        ? "success"
                                        : "warning"
                                    }
                                    onClick={() =>
                                      toggleStatus(
                                        selectedBlog?.id,
                                        selectedBlog?.status
                                      )
                                    }
                                  >
                                    {selectedBlog?.status === "published"
                                      ? "Switch to Draft"
                                      : "Switch to Publish"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <strong className="text-xl font-medium">
                              Content
                            </strong>
                            {selectedBlog?.Content.map((block, index) => {
                              return block.type === "paragraph" ? (
                                <p key={index}>{block.children[0].text}</p>
                              ) : null;
                            })}{" "}
                            {/* <div
                              className="text-sm text-gray-700 mt-2"
                              dangerouslySetInnerHTML={{
                                __html:
                                  selectedBlog?.Content ||
                                  "No content available",
                              }}
                            /> */}
                          </div>

                          {/* Dialog Close Button */}
                        </DialogDescription>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button
                              variant="secondary"
                              onClick={handleCloseDialog}
                            >
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Custom Pagination */}
          <div className="flex justify-between mt-4">
            <Button
              variant="secondary"
              onClick={() => handleChangePage(Math.max(0, page - 1))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() =>
                handleChangePage(Math.min(totalPages - 1, page + 1))
              }
              disabled={page === totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
