"use client";

import { Button } from "@/components/ui/button";
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
import {
  Eye,
  FilePenLine,
  MessageCircleMore, 
  ThumbsUp,
  TrashIcon,
} from "lucide-react";
import BlogUpdateForm from "./update/page";
import ClaraMarkdownRichEditor from "../../Sections/TextEditor/ClaraMarkdownRichEditor";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState("asc");
  const [comments, setComments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/blogs?populate=comments&populate=FeaturedImage"
      );
      const data = await res.json();
      // console.log("API Response:", data);

      if (data && data.data) {
        // Extract comments from all blog entries
        const allComments = data.data.flatMap((blog) => blog.comments || []);
        setComments(
          allComments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
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

    const res = await fetch(
      `https://lionfish-app-98urn.ondigitalocean.app/api/blogs/${id}?populate=comments&populate=FeaturedImage`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

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
    setIsDialogOpen(false);
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
  const handleDeleteComment = async (documentId) => {
    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/comments/${documentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(
          `Comment with Document ID: ${documentId} deleted successfully.`
        );
        // Update your state/UI here
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.documentId !== documentId)
        );
        alert("Comment deleted successfully!");
      } else {
        console.error("Failed to delete comment", response.status);
        alert("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("An error occurred while deleting the comment.");
    }
  };
  return (
    <>
      <section className="p-8 font-fredoka bg-gray-100">
        <head>
          <title>Manage Blog - Kindi</title>
        </head>
        <DynamicPageContent />
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
          <div className="flex max-w-[1400px]">
            <Table className="overflow-x-scroll">
              <TableHeader>
                <TableRow>
                  <TableHead>Sr. No</TableHead>
                  <TableHead>documentId</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="min-w-[100px]">
                    Featured Image
                  </TableHead>
                  <TableHead className="min-w-[120px]">Text</TableHead>
                  <TableHead className="min-w-[300px]">
                    Meta Description
                  </TableHead>
                  <TableHead>Likes</TableHead>
                  <TableHead>For App</TableHead>
                  <TableHead
                    className="min-w-[200px] cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Created At {sortDirection === "asc" ? "↑" : "↓"}
                  </TableHead>
                  <TableHead className="min-w-[200px]">Actions</TableHead>
                  <TableHead>Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedBlogs.map((blog, index) => (
                  <TableRow key={blog.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{blog.documentId}</TableCell>
                    <TableCell>
                      {blog.status === "published" ? "Draft" : " Published"}
                    </TableCell>
                    <TableCell>
                      <img
                        // src={blog?.FeaturedImage?.url}
                        src={`https://lionfish-app-98urn.ondigitalocean.app${blog?.FeaturedImage?.url}`}
                        alt={blog?.Text}
                        className="w-[40px] border-2 border-[#333333] rounded-full h-[40px] object-cover"
                      />
                    </TableCell>
                    <TableCell>{blog.Text}</TableCell>
                    <TableCell>
                      {blog.MetaDescription.slice(0, 100)}...
                    </TableCell>
                    {/* likes */}
                    <TableCell className="flex gap-1 ">
                      {blog.Likes} <ThumbsUp className="w-4 h-4" />
                    </TableCell>
                    <TableCell >
                      {blog.additionalField ? (blog.additionalField === "shop"? "Yes": "No") : null} 
                    </TableCell>

                    {/* date */}
                    <TableCell>
                      {new Date(blog.createdAt).toLocaleString()}
                    </TableCell>
                    {/* actions */}
                    <TableCell className="flex">
                      {/* delete */}

                      {/* Delete */}
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="primary"
                            onClick={() => {
                              setIsDialogOpen(true);
                            }}
                            className="text-[#6d6d6d] hover:text-[#000000]"
                          >
                            <TrashIcon size={20} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete this badge.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="secondary"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button variant="primary">
                              <DeleteContent
                                documentId={blog.documentId}
                                onDelete={handleDelete}
                              />
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      {/* Preview */}
                      <Button variant="primary" title="Preview Live on website">
                        <Link
                          href={`https://kindilearning.vercel.app/p/community/${blog.documentId}`}
                          target="_blank"
                        >
                          <Eye className="text-[#7f7f7f]  w-5 h-5 duration-300 ease-in-out hover:text-black" />
                        </Link>
                      </Button>
                      {/* Preview Live */}
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            title="Preview on Admin"
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
                              <div className="flex w-full prose gap-4 justify-between items-start">
                                {/* Featured Image */}
                                <img
                                  // src={selectedBlog?.FeaturedImage?.url}
                                  src={`https://lionfish-app-98urn.ondigitalocean.app${selectedBlog?.FeaturedImage?.url}`}
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
                                    <p className="text-gray-600 prose text-sm mt-2">
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
                              {/* {selectedBlog?.Content.map((block, index) => {
                              return block.type === "paragraph" ? (
                                <p key={index}>{block.children[0].text}</p>
                              ) : null;
                            })} */}
                              <div
                                className="text-lg text-gray-600 prose leading-relaxed mb-6"
                                dangerouslySetInnerHTML={{
                                  __html: selectedBlog?.Content,
                                }}
                              />
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
                      {/* Edit */}
                      <Dialog>
                        <DialogTrigger>
                          <Button variant="primary">
                            <FilePenLine className="text-[#7f7f7f]  w-5 h-5 duration-300 ease-in-out hover:text-black" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[600px] font-fredoka max-w-[1000px] overflow-y-scroll">
                          <DialogTitle>{selectedBlog?.Text}</DialogTitle>
                          <DialogDescription>
                            <BlogUpdateForm documentId={blog.documentId} />
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
                    {/* comments */}
                    <TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <MessageCircleMore />
                        </DialogTrigger>
                        <DialogContent className="max-h-[600px] font-fredoka max-w-[1000px] overflow-y-scroll">
                          <DialogTitle>{selectedBlog?.Text}</DialogTitle>
                          <DialogDescription>
                            <div className="comment-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {comments.length > 0 ? (
                                comments.map((comment) => (
                                  <div
                                    key={comment.id}
                                    className="bg-white shadow-md rounded-md p-4 relative"
                                  >
                                    <p className="text-gray-700 mb-2">
                                      {comment.Text}
                                    </p>
                                    <span className="text-sm text-gray-500">
                                      {new Date(
                                        comment.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleDeleteComment(comment.documentId)
                                      }
                                      className="bg-red-500 text-red text-xs font-bold px-2 py-1 rounded hover:bg-red-600"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500">
                                  No comments available
                                </p>
                              )}
                            </div>
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
          </div>

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
const DynamicPageContent = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/dynammic-page-content?populate=*"
        );
        const data = await response.json();
        setContent(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!content) return <p>No content available.</p>;

  return (
    <>
      <div
        className="p-6 rounded-lg"
        style={{
          backgroundColor: `#${content.Community.bgcolor}`,
          color: `#${content.Community.buttonColor}`,
        }}
      >
        <Dialog>
          <DialogTrigger className="text-red justify-end text-end w-full hover:text-purple duration-100 ">Update the Data</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update the Page Data for Kindi Community Page</DialogTitle>
              <DialogDescription>
                <UpdateDynamicPage />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <h1 className="text-2xl font-bold">{content.Community.Title}</h1>
        {/* <p className="mt-2">{content.Community.Body}</p> */}
        <span
          className="prose"
          dangerouslySetInnerHTML={{ __html: content.Community.Body }}
        />
        {/* <p className="mt-2 text-sm font-semibold">
          {content.Community.featuredText}
        </p> */}
      </div>
    </>
  );
};

function UpdateDynamicPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [featuredText, setFeaturedText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/dynammic-page-content?populate=*`
        );
        const data = await res.json();

        const content = data.data.Community;

        if (content) {
          setTitle(content.Title || "");
          setBody(content.Body || "");
          setFeaturedText(content.featuredText || "");
        }
        console.log("Fetched Blog Content", content);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError("Error fetching content");
      }
    };

    fetchBlogData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        Community: {
          Title: title,
          Body: body,
          // featuredText: featuredText,
        },
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/dynammic-page-content`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Updated Badge Content:", data);
      setOpenDialog(true); // Show success dialog
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Error updating content.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <head>
        <title>Update Blog - Kindi</title>
      </head>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Text</label>
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block">Description</label>
          <ClaraMarkdownRichEditor
            onChange={(value) => setBody(value)}
            value={body || ""}
          />
        </div>

        {/* <div>
          <label className="block">Featurd Text</label>
          <input
            type="text"
            name="featureText"
            value={featuredText}
            onChange={(e) => setFeaturedText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div> */}
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
}
