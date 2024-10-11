import { BlogThumb, CommentIcon, LikeIcon } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({
  slug,
  image,
  title = "Blog Title",
  metsDesc = "Blog metsDesc",
  likes = "123",
  comments = "456",
  views = "789",
}) => {
  return (
    <div>
      <div className="bg-white shadow-md cursor-pointer rounded-lg overflow-hidden">
        <div className="flex overflow-clip">
          <Image width={400} height={300}
            src={image || BlogThumb}
            alt={title}
            className="w-full hover:scale-110 duration-500 ease-out h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-[24px] font-bold text-[#3F3A64] font-fredoka">
            {title.slice(0,24)}...
          </h2>
          <p className="text-[#757575] clarabodyTwo ">
            {metsDesc}
          </p>
        </div>
        <div className="p-4 border-t flex justify-between items-center end-0">
          <div className="flex py-1 gap-4 items-center">
            <div className="flex items-center">
              <button className="text-red bg-[#FBCECE] rounded-full p-2 hover:text-[#da4848]">
                <Image src={LikeIcon} />
              </button>
              <span className="ml-1 font-semibold">{likes}</span>
            </div>
            <div className="flex items-center">
              <button className="text-[#0a1932] bg-[#f8f8f8] font-fredoka rounded-full p-2 hover:text-[#0a1932]">
                <Image src={CommentIcon} />
              </button>
              <span className="ml-1 font-semibold font-fredoka ">
                {comments}
              </span>
            </div>
          </div>
          <div className=" flex flex-col text-end">
            <span className="ml-1 font-semibold text-[#020817] font-fredoka">
              {views}
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

// import { BlogThumb, CommentIcon, LikeIcon } from "@/public/Images";
// import Image from "next/image";

// const BlogCard = ({
//   image,
//   title = "Blog Title",
//   metsDesc = "Blog metsDesc",
//   likes = "123",
//   comments = "456",
//   views = "789",
// }) => {
//   return (
//     <>
//       <div
//         className="bg-white shadow-md rounded-lg overflow-hidden"
//       >
//         <div className="flex overflow-clip">
//           <Image
//             src={image || BlogThumb}
//             alt={title}
//             className="w-full hover:scale-110 duration-500 ease-out h-48 object-cover"
//           />
//         </div>
//         <div className="p-4">
//           <h2 className="text-[24px] font-bold text-[#3F3A64] font-fredoka">
//             {title}
//           </h2>
//           <p className="text-[#757575]  text-[16px] font-montserrat ">
//             {metsDesc}
//           </p>
//         </div>
//         <div className="p-4 border-t flex justify-between items-center end-0">
//           <div className="flex py-1 gap-4 items-center">
//             <div className="flex items-center">
//               <button className="text-red bg-[#FBCECE] rounded-full p-2 hover:text-[#da4848]">
//                 <Image src={LikeIcon} />
//               </button>
//               <span className="ml-1 font-semibold">{likes}</span>
//             </div>
//             <div className="flex items-center">
//               <button className="text-[#0a1932] bg-[#f8f8f8] font-fredoka rounded-full p-2 hover:text-[#0a1932]">
//                 <Image src={CommentIcon} />
//               </button>
//               <span className="ml-1 font-semibold font-fredoka ">
//                 {comments}
//               </span>
//             </div>
//           </div>
//           <div className=" flex flex-col text-end">
//             <span className="ml-1 font-semibold text-[#020817] font-fredoka">
//               {views}
//             </span>
//             <span className="text-[#b4b4b4] font-medium font-fredoka text-[10px]">
//               Post Views
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogCard;
