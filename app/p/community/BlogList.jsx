"use client";

import { BlogCard } from "@/app/Widgets";
import Link from "next/link";
import { useState } from "react";

const BlogList = ({ blogs }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Calculate indexes for slicing
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;

  // Get blogs for the current page
  const currentBlogs = blogs.slice(startIndex, endIndex);

  // Total number of pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Handle page change
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      {/* Blogs Grid */}
      <div className="claracontainer w-full grid grid-cols-1 overflow-hidden gap-4">
        {currentBlogs.map((blog) => (
          <div key={blog.id}>
            <Link
              href={`/p/community/${blog.id}`}
              onClick={() => console.log("Clicked Blog:", blog.blogTitle)}
            >
              <article className="bg-white rounded-lg">
                <BlogCard
                  title={blog.blogTitle}
                  metsDesc={blog.metaDescription}
                  image={blog.thumbnail.url}
                />
              </article>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
