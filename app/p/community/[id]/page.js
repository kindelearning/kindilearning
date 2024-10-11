"use client";

import { ShareButton } from "@/app/Widgets";
import { getBlogById, likeBlogPost } from "@/lib/hygraph";
import { CommentIcon, LikeIcon } from "@/public/Images";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default async function BlogDetailPage({ params }) {
  const { id } = params;
  // const blog = await getBlogById(id);
  const [blog, setBlog] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const blogData = await getBlogById(id);
      setBlog(blogData);
      setLikeCount(blogData.likeCount); // Set the initial like count
    }
    fetchData();
  }, [id]);

  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/p/community/${id}`;
  if (!blog) {
    return <div>Blog not found!</div>;
  }

  const handleLikeClick = async () => {
    if (isLiking) return;
    setIsLiking(true);

    const updatedLikeCount = await likeBlogPost(blog.id, likeCount);
    if (updatedLikeCount !== null) {
      setLikeCount(updatedLikeCount);
      console.log("Updated Like Count:", updatedLikeCount);
    }

    setIsLiking(false);
  };
  return (
    <>
      <section className="w-full h-auto py-0 lg:py-12 bg-[#EAEAF5] items-center justify-center pb-24 flex flex-col gap-[20px]">
        <div className="flex overflow-clip lg:rounded-xl lg:max-w-[960px] w-full">
          <Image
            src={blog.thumbnail.url}
            alt={blog.blogTitle}
            width={800}
            height={450}
            className="w-full hover:scale-105 duration-300 lg:max-w-[960px] lg:rounded-xl h-60 md:h-[400px] lg:h-[400px] object-cover"
          />
        </div>
        <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-8">
          <div className="w-full mx-auto flex flex-col gap-4 justify-center items-center">
            <div className="flex max-w-4xl w-full mx-auto justify-start items-start">
              <div className="flex w-full justify-between gap-4 items-center">
                <div className="flex gap-4 items-center justify-start">
                  <div className="flex items-center">
                    <button
                      className={`text-red bg-[#FBCECE] rounded-full p-2 hover:text-[#da4848] ${
                        isLiking ? "opacity-50" : ""
                      }`}
                      onClick={handleLikeClick}
                    >
                      <Image src={LikeIcon} />
                    </button>
                    <span className="ml-2 text-[#0a1932] font-medium">
                      {blog.likeCount} {likeCount}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button className="text-[#0a1932] bg-[#f8f8f8] rounded-full p-2 hover:text-[#0a1932]">
                      <Image src={CommentIcon || "129"} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <ShareButton url={blogUrl} />
                </div>
              </div>
            </div>
            <div className="flex max-w-4xl w-full flex-col gap-4">
              <hr className="border-1 my-3 rounded-full w-full h-[2px] border-[#000000]" />
              <div className="w-full text-[#3f3a64] claraheading">
                {blog.blogTitle}
              </div>{" "}
              <div className="w-full text-[#0a1932] text-2xl font-normal font-fredoka leading-[28px]">
                {blog.metaDescription}
              </div>
              <div className="content py-4 flex flex-col gap-2 justify-center">
                <div dangerouslySetInnerHTML={{ __html: blog.content.html }} />{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
