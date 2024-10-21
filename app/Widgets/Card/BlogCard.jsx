import { BlogThumb, CommentIcon, LikeIcon } from "@/public/Images";
import Image from "next/image";
// import Link from "next/link";

// Helper function to generate random numbers within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const BlogCard = ({
  // slug,
  image,
  title = "Blog Title",
  metsDesc = "Blog metsDesc",
  // likes = "123",
  // comments = "456",
  // views = "789",
}) => {
  const randomLikes = getRandomNumber(50, 500); // Adjust range as needed
  const randomComments = getRandomNumber(10, 100); // Adjust range as needed
  const randomViews = getRandomNumber(1000, 10000); // Adjust range as needed
  return (
    <div>
      <div className="bg-white shadow-md cursor-pointer rounded-lg overflow-hidden">
        <div className="flex overflow-clip">
          <Image
            width={400}
            height={300}
            src={image || BlogThumb}
            alt={title}
            className="w-full hover:scale-110 duration-500 ease-out h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-[24px] font-bold text-[#3F3A64] font-fredoka">
            {title.slice(0, 24)}...
          </h2>
          <p className="text-[#757575] clarabodyTwo ">{metsDesc}</p>
        </div>
        <div className="p-4 border-t flex justify-between items-center end-0">
          <div className="flex py-1 gap-4 items-center">
            <div className="flex items-center">
              <button className="text-red bg-[#FBCECE] rounded-full p-2 hover:text-[#da4848]">
                <Image src={LikeIcon} alt="Kindi" />
              </button>
              <span className="ml-1 font-semibold font-fredoka">{randomLikes}+</span>
            </div>
            <div className="flex items-center">
              <button className="text-[#0a1932] bg-[#f8f8f8] font-fredoka rounded-full p-2 hover:text-[#0a1932]">
                <Image src={CommentIcon} alt="Kindi" />
              </button>
              <span className="ml-1 font-semibold font-fredoka ">
                {randomComments}+
              </span>
            </div>
          </div>
          <div className=" flex flex-col text-end">
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
};

export default BlogCard;
