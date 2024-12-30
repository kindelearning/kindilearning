"use client";

import { useEffect, useState } from "react";
import fetchBlogs from "../../api/blog/route";
import { BlogThumb } from "@/public/Images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BlogWidgets() {
  const [selectedMonth, setSelectedMonth] = useState("December");

  // Dummy data
  const data = {
    blogViews: {
      current: 4500,
      previous: 3500,
    },
    blogComments: {
      current: 150,
      previous: 120,
    },
    likesDislikes: {
      likes: 80,
      dislikes: 30,
      previousLikes: 70,
      previousDislikes: 40,
    },
    newBlogs: {
      current: 10,
      previous: 8,
    },
    totalBlogs: {
      current: 98,
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Blog Views Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Blog Views</h3>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">{data.blogViews.current}</p>
            <p className="text-sm text-gray-500">Views this month</p>
          </div>
          <div className="text-sm text-gray-500">
            <span
              className={`${
                data.blogViews.current > data.blogViews.previous
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {data.blogViews.current > data.blogViews.previous
                ? "+" + (data.blogViews.current - data.blogViews.previous)
                : "-" + (data.blogViews.previous - data.blogViews.current)}
            </span>{" "}
            from last month
          </div>
        </div>
        {/* <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
            onClick={() => setSelectedMonth("November")}
          >
            Compare with November
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-600 rounded-md"
            onClick={() => setSelectedMonth("December")}
          >
            Compare with December
          </button>
        </div> */}
      </div>

      {/* Blog Comments Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Blog Comments</h3>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">{data.blogComments.current}</p>
            <p className="text-sm text-gray-500">Comments this month</p>
          </div>
          <div className="text-sm text-gray-500">
            <span
              className={`${
                data.blogComments.current > data.blogComments.previous
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {data.blogComments.current > data.blogComments.previous
                ? "+" + (data.blogComments.current - data.blogComments.previous)
                : "-" +
                  (data.blogComments.previous - data.blogComments.current)}
            </span>{" "}
            from last month
          </div>
        </div>
      </div>

      {/* Likes vs Dislikes Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Likes vs Dislikes</h3>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">{data.likesDislikes.likes}</p>
            <p className="text-sm text-gray-500">Likes this month</p>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-xl">Likes: {data.likesDislikes.likes}</p>
            <p className="text-xl">Dislikes: {data.likesDislikes.dislikes}</p>
          </div>
          <div className="text-sm text-gray-500">
            <div className="flex justify-between items-center">
              <div>
                <span
                  className={`${
                    data.likesDislikes.likes > data.likesDislikes.previousLikes
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data.likesDislikes.likes > data.likesDislikes.previousLikes
                    ? "+" +
                      (data.likesDislikes.likes -
                        data.likesDislikes.previousLikes)
                    : "-" +
                      (data.likesDislikes.previousLikes -
                        data.likesDislikes.likes)}
                </span>{" "}
                Likes Change from last month
              </div>
              <div>
                <span
                  className={`${
                    data.likesDislikes.dislikes >
                    data.likesDislikes.previousDislikes
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data.likesDislikes.dislikes >
                  data.likesDislikes.previousDislikes
                    ? "+" +
                      (data.likesDislikes.dislikes -
                        data.likesDislikes.previousDislikes)
                    : "-" +
                      (data.likesDislikes.previousDislikes -
                        data.likesDislikes.dislikes)}
                </span>{" "}
                Dislikes Change from last month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Blogs Added Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">New Blogs Added</h3>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">{data.newBlogs.current}</p>
            <p className="text-sm text-gray-500">Blogs added this month</p>
          </div>
          <div className="text-sm text-gray-500">
            <span
              className={`${
                data.newBlogs.current > data.newBlogs.previous
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {data.newBlogs.current > data.newBlogs.previous
                ? "+" + (data.newBlogs.current - data.newBlogs.previous)
                : "-" + (data.newBlogs.previous - data.newBlogs.current)}
            </span>{" "}
            from last month
          </div>
        </div>
      </div>

      {/* Total Blogs Published Widget */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Total Blogs Published</h3>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">{data.totalBlogs.current}</p>
            <p className="text-sm text-gray-500">Total blogs published</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const BlogCard = ({ post }) => {
  return (
    <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
      {/* Thumbnail */}
      <img
        src={`https://proper-fun-404805c7d9.strapiapp.com${post.thumbnail}`}
        // src={post.thumbnail || BlogThumb}
        alt={post.title}
        className="w-16 h-16 object-cover rounded-lg"
      />
      {/* Content */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">{post.title}</h4>
        <p className="text-xs text-gray-600 line-clamp-2">{post.description}</p>
        <a
          href={post.link}
          className="text-indigo-500 text-xs font-medium mt-2 inline-block hover:underline"
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

export function RecentBlogs() {
  const [blogs, setBlogs] = useState([]);

  // Fetching the recent blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/blogs?populate=*"
        );
        const data = await response.json();

        // Sort the blogs by publishedAt to get the recent ones
        const sortedBlogs = data.data.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        console.log(data);

        // Extract the first 5 recent blogs
        const recentBlogs = sortedBlogs.slice(0, 5).map((blog) => ({
          title: blog.Text,
          description: blog.Description,
          publishedAt: blog.publishedAt,
          thumbnail: blog.FeaturedImage?.url, // Assuming thumbnail URL is stored here
          link: `/p/community/${blog.documentId}`, // Assuming you want to link to a blog page
        }));

        setBlogs(recentBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="recent-blogs">
      <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
      <div className="space-y-4">
        {blogs.map((blog, index) => (
          <BlogCard key={index} post={blog} />
        ))}
      </div>
    </div>
  );
}

const CommentCard = ({ comment, onDelete }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Open the confirmation dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Close the confirmation dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle the actual delete action
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://proper-fun-404805c7d9.strapiapp.com/api/comments/${comment.documentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        onDelete(comment.documentId);
      } else {
        console.error("Failed to delete the comment");
      }
      handleCloseDialog(); // Close the dialog after deletion
    } catch (error) {
      console.error("Error deleting the comment:", error);
      handleCloseDialog(); // Close the dialog if there's an error
    }
  };

  return (
    <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
      {/* Comment Content */}
      <div className="flex-1">
        <p className="text-xs text-gray-800">{comment.Text}</p>
      </div>

      {/* Delete Button */}
      <Dialog >
        <DialogTrigger
          asChild
          onClick={handleOpenDialog}
          className="text-red flex text-xs font-medium mt-2 ml-4 hover:underline cursor-pointer"
        >
          Delete
          </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              comment.
            </DialogDescription>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCloseDialog}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export function RecentComment() {
  const [comments, setComments] = useState([]);

  // Fetching the recent comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/comments");
        const data = await response.json();

        // Sort the comments by publishedAt to get the recent ones
        const sortedComments = data.data.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        // Extract the first 5 recent comments
        const recentComments = sortedComments.slice(0, 5).map((comment) => ({
          Text: comment.Text,
          publishedAt: comment.publishedAt,
          documentId: comment.id, // Assuming comment has a documentId
        }));

        setComments(recentComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  // Handle comment deletion
  const handleCommentDelete = (documentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.documentId !== documentId)
    );
  };

  return (
    <div className="recent-comments">
      <h2 className="text-xl font-semibold mb-4">Recent Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentCard
            key={comment.documentId}
            comment={comment}
            onDelete={handleCommentDelete}
          />
        ))}
      </div>
    </div>
  );
}
