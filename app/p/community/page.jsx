"use client";

import { BlogCard } from "@/app/Widgets";
import { Input } from "@/components/ui/input";
import { getPublishedPosts } from "@/lib/hygraph";
import Link from "next/link";
import { useEffect, useState } from "react";

function SearchInput({ value, onChange }) {
  return (
    <div className="flex w-full items-center bg-white rounded-full border border-gray-200">
      <span className="px-3 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <Input
        type="email"
        placeholder="Search for products..."
        value={value}
        onChange={onChange}
        className="w-full border-0 rounded-full focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0   focus:border-0 focus-within:border-0 px-3 py-2"
      />
    </div>
  );
}

export default function Community() {
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Initialize as an empty array

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getPublishedPosts();
      setBlogs(data);
      setFilteredBlogs(data); // Initialize filteredBlogs with all blogs
    };

    fetchBlogs();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter blogs based on search term
    const filtered = blogs.filter((blog) =>
      blog.blogTitle.toLowerCase().includes(term)
    );
    setFilteredBlogs(filtered);
  };

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found!</div>;
  }

  return (
    <>
      <section className="w-full h-auto pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-2 md:gap-4">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] text-[32px] tracking-tight font-semibold font-fredoka uppercase leading-10">
                The Kindi{" "}
              </span>
              <span className="text-[#f05c5c] text-[32px] font-semibold font-fredoka uppercase leading-10">
                Connect
              </span>
            </div>
            <div className="w-full text-center px-0 md:px-12 lg:px-24 xl:px-28 text-[#3f3a64] clarabodyTwo">
              Here&apos;s where you&apos;ll discover your daily educational play
              activities. Utilize our drag-and-drop feature to rearrange
              learning, ensuring development seamlessly fits your schedule.
              Additionally, sync your schedule with your child&apos;s nursery
              for a smooth and integrated learning experience.
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full px-4 md:px-2 lg:px-0">
            <SearchInput
              value={searchTerm}
              onChange={handleSearchChange}
              // className="w-full p-2 border rounded"
            />
          </div>

          <div className="claracontainer w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 overflow-hidden gap-4">
            {/* Render filtered blogs */}
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div key={blog.id}>
                  <Link
                    target="_blank"
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
              ))
            ) : (
              <div className="flex w-full flex-col gap-2">
                <div className="w-full text-center clarabodyTwo text-red-500">
                  No matching blogs found.
                </div>
                <div className="claracontainer w-full grid grid-cols-1 overflow-hidden gap-4">
                  {blogs.map((blog) => (
                    <div key={blog.id}>
                      <Link
                        target="_blank"
                        href={`/p/community/${blog.id}`}
                        onClick={() =>
                          console.log("Clicked Blog:", blog.blogTitle)
                        }
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
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
