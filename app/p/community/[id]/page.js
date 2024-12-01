"use client";

import { ShareButton } from "@/app/Widgets";
import { fetchProfilePictures, getBlogById, likeBlogPost } from "@/lib/hygraph";
import {
  CommentIcon,
  LikeIcon,
  ProfilePlaceholder01,
  ProfilePlaceHolderOne,
} from "@/public/Images";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommentForm from "../comments/CommentForm";
import Head from "next/head";
import RichTextRender from "@/app/Sections/Global/RichTextRender";

const scrollToCommentSection = () => {
  const commentSection = document.getElementById("comment_Section");
  if (commentSection) {
    commentSection.scrollIntoView({ behavior: "smooth" });
  }
};

const getRandomPastDate = () => {
  // Set the range for the random date
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  // Generate a random timestamp between one year ago and now
  const randomTimestamp =
    oneYearAgo.getTime() +
    Math.random() * (now.getTime() - oneYearAgo.getTime());

  return new Date(randomTimestamp);
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getRandomLikes = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ProfilePictureComponent = () => {
  const [profilePictures, setProfilePictures] = useState([]);
  const [randomPicture, setRandomPicture] = useState(null);

  useEffect(() => {
    const loadProfilePictures = async () => {
      const pictures = await fetchProfilePictures();
      setProfilePictures(pictures);
      // Set a random picture
      if (pictures.length > 0) {
        const randomIndex = Math.floor(Math.random() * pictures.length);
        setRandomPicture(pictures[randomIndex]);
      }
    };

    loadProfilePictures();
  }, []);

  return (
    <div className="profile-picture">
      {randomPicture ? (
        <Image
          src={randomPicture.url}
          alt="Profile Picture"
          className="rounded-full w-8 h-8"
        />
      ) : (
        <Image
          src={ProfilePlaceholder01}
          alt="Profile Picture"
          className="rounded-full w-8 h-8"
        />
      )}
    </div>
  );
};

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const randomLikes = Math.floor(Math.random() * 100); // Example for random likes count

  // Load the like state from local storage on component mount
  useEffect(() => {
    const liked = localStorage.getItem("isLiked");
    if (liked === "true") {
      setIsLiked(true);
    }
  }, []);

  const handleLikeClick = () => {
    setIsLiked(true); // Change to true when clicked
    setAnimate(true); // Start the animation

    // Save the like state to local storage
    localStorage.setItem("isLiked", "true");

    // Stop the animation after 1.5 seconds
    setTimeout(() => {
      setAnimate(false);
    }, 1500);
  };

  return (
    <div className="w-full cursor-pointer items-center flex flex-row justify-start gap-2">
      <div
        className={`text-[#f05c5c] text-[10px] font-semibold font-fredoka leading-none 
                    ${animate ? "animate-bounce" : ""}`} // Add bounce animation on like
        onClick={handleLikeClick}
      >
        {isLiked ? "Liked" : "Like"}
      </div>
      {!isLiked && (
        <div className="text-[#0a1932] text-[10px] font-semibold font-fredoka leading-none">
          {randomLikes}+
        </div>
      )}

      <Image
        src={LikeIcon}
        alt="CommentLikeIcon"
        className="w-3 h-3 cursor-pointer" // Add cursor-pointer for better UX
        onClick={handleLikeClick} // Make icon clickable too
      />
    </div>
  );
};

// Helper function to generate random numbers within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default async function BlogDetailPage({ params }) {
  const { id } = params;
  const [blog, setBlog] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const randomDate = getRandomPastDate();
  const randomLikes = getRandomLikes(0, 100); // Set your desired range
  const randomComments = getRandomNumber(10, 100); // Adjust range as needed
  const randomViews = getRandomNumber(1000, 10000); // Adjust range as needed

  useEffect(() => {
    async function fetchData() {
      const blogData = await getBlogById(id);
      console.log("Blog Data Id:", id);
      setBlog(blogData);
      // setLikeCount(blogData.likeCount); // Set the initial like count
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
      <head>
        <title>{blog.blogTitle}</title>
        <meta name="description" content={blog.blogDescription} />
      </head>
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
        <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
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
                      <Image alt="Kindi" src={LikeIcon} />
                    </button>
                    <span className="ml-2 text-[#0a1932] font-fredoka font-medium">
                      {/* {blog.likeCount} */}
                      {randomLikes}
                    </span>
                  </div>
                  <button href="#comment_Section" className="flex items-center">
                    <button
                      onClick={scrollToCommentSection}
                      className="text-[#0a1932] bg-[#f8f8f8] rounded-full p-2 hover:text-[#0a1932]"
                    >
                      <Image alt="Kindi" src={CommentIcon || "129"} />
                    </button>
                    {randomComments}+
                  </button>
                </div>

                <div className="flex items-center">
                  <ShareButton url={blogUrl} />
                </div>
              </div>
            </div>
            <div className="flex max-w-4xl w-full flex-col gap-4">
              <hr className="border-1 my-3 rounded-full w-full h-[2px] border-[#000000]" />
              <div className="w-full text-[#3f3a64] font-semibold font-fredoka capitalize text-[32px] md:text-[36px] md:leading-[40px] lg:text-[48px] lg:leading-[54px]">
                {blog.blogTitle}
              </div>{" "}
              <div className="w-full text-[#0a1932] text-2xl font-normal font-fredoka leading-[28px]">
                {blog.metaDescription}
              </div>
              <div className="content py-4 flex flex-col gap-2 justify-center">
                {/* <div dangerouslySetInnerHTML={{ __html: blog.content.html }} /> */}
                <RichTextRender content={blog.content.json} />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-1 my-3 rounded-full w-full h-[2px] border-[#c7c7c7]" />

        <div className="w-full claracontainer  md:p-2 lg:p-4 flex flex-col justify-start items-start py-5 px-4 ">
          <div className="flex flex-col max-w-4xl w-full mx-auto justify-start items-start gap-4">
            <div className="text-[#0a1932] leading-[46px] text-[44px] font-semibold font-fredoka">
              Comments
            </div>
            {blog.comments && blog.comments.length > 0 ? (
              <div className="w-full flex flex-col gap-2 justify-end items-end">
                {blog.comments.map((comment) => (
                  <div
                    className="w-full lg:min-w-[500px] lg:max-w-[700px] flex flex-col justify-normal items-start bg-white gap-4 rounded-[8px] p-2 lg:p-4"
                    key={comment.id}
                  >
                    <div className="w-full flex gap-2 justify-start items-start">
                      <ProfilePictureComponent />
                      <div className="w-fit flex flex-col justify-start items-start gap-2">
                        <div className="text-[#0a1932] text-xs font-semibold font-fredoka leading-none">
                          {comment.name}
                        </div>
                        <div className="w-[115px] text-[#b4b4b4] text-[10px] font-normal font-fredoka leading-none">
                          {formatDate(randomDate)}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex-wrap text-[#0a1932] text-xs font-normal font-fredoka leading-[14px]">
                      {comment.content}
                    </div>
                    <LikeButton />
                  </div>
                ))}
              </div>
            ) : (
              <p>No comments yet.</p>
            )}

            <CommentForm className="pt-6" id="comment_Section" blogId={id} />
          </div>
        </div>
      </section>
    </>
  );
}
