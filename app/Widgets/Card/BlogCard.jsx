"use client";

import { BlogThumb, CommentIcon, LikeIcon } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogCard({
  image,
  title = "Blog Title",
  metsDesc = "Blog metsDesc",
  initialLikes = 0,
  initialDislikes = 0,
  addUrl = "#",
  documentId,
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  // Fetch the like/dislike counts from the backend when the component mounts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(
          `https://kindiadmin.up.railway.app/api/blogs/${documentId}`
        );
        const data = await response.json();

        // Check the structure of the API response
        // console.log("API Response:", data);

        if (data?.data) {
          // Correctly update likes and dislikes from the API response
          setLikes(data.data.Likes || 0); // Use data.data.Likes
          setDislikes(data.data.Dislikes || 0); // Use data.data.Dislikes
        }
      } catch (error) {
        console.error("Failed to fetch like/dislike counts:", error);
      }
    };

    fetchCounts();
  }, [documentId]); // Runs when the documentId changes

  const handleLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    await updateLikesDislikes(newLikes, dislikes);
  };

  const handleDislike = async () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    await updateLikesDislikes(likes, newDislikes);
  };

  // Update the likes/dislikes in the backend
  const updateLikesDislikes = async (newLikes, newDislikes) => {
    try {
      const response = await fetch(
        `https://kindiadmin.up.railway.app/api/blogs/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Likes: newLikes, // Correct structure based on Strapi API
              Dislikes: newDislikes, // Correct structure based on Strapi API
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update likes/dislikes");
      }

      console.log(
        `Successfully updated likes to ${newLikes} and dislikes to ${newDislikes}`
      );
    } catch (error) {
      console.error("Failed to update likes/dislikes:", error);
    }
  };

  // Generate random comments and views count for display
  const randomComments = Math.floor(Math.random() * 100) + 10; // Random number for comments
  const randomViews = Math.floor(Math.random() * 10000) + 1000; // Random number for views

  return (
    <div>
      <div className="bg-white shadow-md cursor-pointer rounded-lg overflow-hidden">
        <Link
          href={addUrl}
          target="_blank"
          className="flex cursor-pointer overflow-clip"
        >
          <img
            width={400}
            height={300}
            // src={image || BlogThumb}
            src={`https://kindiadmin.up.railway.app${image}` || "/Images/BlogThumb.png"}

            alt={title}
            className="w-full hover:scale-110 duration-500 ease-out h-48 object-cover"
          />
        </Link>
        <Link
          href={addUrl}
          target="_blank"
          className="p-4 flex flex-col cursor-pointer min-h-[140px]"
        >
          <h2 className="text-[24px] font-bold text-[#3F3A64] font-fredoka">
            {title.slice(0, 24)}...
          </h2>
          <p className="text-[#757575] clarabodyTwo min-h-[58px]">{metsDesc.slice(0,100)}..</p>
        </Link>
        <div className="p-4 border-t flex justify-between items-center end-0">
          <div className="flex py-1 gap-4 items-center">
            <div className="flex items-center">
              <button
                onClick={handleLike}
                className="text-red bg-[#FBCECE] rounded-full p-2 hover:text-[#da4848]"
              >
                <Image src={LikeIcon} alt="Like" />
              </button>
              <span className="ml-1 font-semibold font-fredoka">{likes}+</span>
            </div>
            <div className="flex items-center">
              <button className="text-[#0a1932] bg-[#f8f8f8] font-fredoka rounded-full p-2 hover:text-[#0a1932]">
                <Image src={CommentIcon} alt="Comment" />
              </button>
              <span className="ml-1 font-semibold font-fredoka">
                {/* {randomComments}+ */}
              </span>
            </div>
          </div>
          <div className="flex flex-col text-end">
            <span className="ml-1 font-semibold text-[#020817] font-fredoka">
              {randomViews}+
            </span>
            <span className="text-[#b4b4b4] font-medium font-fredoka text-[10px]">
              Post Views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
