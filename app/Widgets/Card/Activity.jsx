// "use client";

// import { ActivityCard } from "@/public/Images";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const IconBadge = ({ icon, backgroundColor = "3F3A64" }) => (
//   <div
//     className={`w-[36px] h-[36px] flex justify-center items-center bg-[#${backgroundColor}] rounded-[12px]`}
//     style={{
//       backgroundColor: `#${backgroundColor}`,
//     }}
//   >
//     <Image alt="Kindi" src={icon || KindiKindiHeart} className="p-[2px]" />
//   </div>
// );

// const ExtraIconBadge = ({ totalIcons, backgroundColor = "f05c5c" }) => {
//   if (totalIcons <= 4) return null;

//   return (
//     <div
//       className={`w-[36px] h-[36px] flex justify-center items-center bg-[#F6BEBF] rounded-[12px]`}
//     >
//       <span className="text-red p-[2px] text-[20px] font-medium font-fredoka">
//         +{totalIcons - 4}
//       </span>
//     </div>
//   );
// };

// const GridContainer = ({ children, className }) => {
//   const totalIcons = React.Children.count(children);
//   const visibleIcons = totalIcons > 4 ? 4 : totalIcons;

//   return (
//     <div
//       className={`items-center scrollbar-hidden justify-center grid grid-cols-5 md:grid-cols-5 ${className}`}
//     >
//       {[...React.Children.toArray(children)]
//         .slice(0, visibleIcons)
//         .map((child, index) => (
//           <React.Fragment key={index}>{child}</React.Fragment>
//         ))}
//       {totalIcons > 4 && <ExtraIconBadge totalIcons={totalIcons} />}
//     </div>
//   );
// };

// const Activity = ({ title, time, tags, icons }) => (
//   <Link
//     href="/p/activities/slug"
//     className="w-full min-w-[300px] h-auto bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4"
//   >
//     {/* <section className="w-full min-w-[300px] h-auto bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4"> */}
//     <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
//       <div className="w-full max-w-full h-auto">
//         <Image
//           className="w-full max-h-[240px] md:max-h-[300px] object-cover rounded-tl-3xl rounded-tr-3xl"
//           src={ActivityCard}
//         />
//         <div className="w-full py-6 flex-col justify-start px-4 items-start flex gap-4">
//           <div className="flex-col gap-[6px] justify-start items-start">
//             <div className="text-[#0a1932] text-lg md:text-2xl font-semibold font-fredoka leading-normal">
//               {title || "Autumn Colors Leaf Wheel"}
//             </div>
//             <div className="justify-start w-full items-center gap-2 inline-flex">
//               <div className="text-[#0a1932] w-[max-content] text-sm md:text-base font-normal font-fredoka leading-normal">
//                 {time || "5 minutes"}
//               </div>
//               {tags?.map((tag, index) => (
//                 <React.Fragment key={index}>
//                   <div className="w-1 h-1 bg-[#e3e3e3] rounded-full" />
//                   <div className="text-[#0a1932] w-[max-content] text-sm md:text-base font-normal font-fredoka leading-normal">
//                     {tag}
//                   </div>
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//           <GridContainer className="items-center justify-center gap-3 md:gap-4 grid grid-cols-3 md:grid-cols-5">
//             {icons?.map((icon, index) => (
//               <IconBadge key={index} icon={icon} />
//             ))}
//           </GridContainer>
//         </div>
//       </div>
//     </div>
//   </Link>
// );

// export default Activity;

"use client";

import { ActivityCard, KindiHeart } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// IconBadge Component
const IconBadge = ({ icon, backgroundColor = "3F3A64" }) => (
  <div
    className={`w-[36px] h-[36px] flex justify-center items-center rounded-[12px]`}
    style={{
      backgroundColor: `#${backgroundColor}`, // Ensure backgroundColor is a valid hex code
    }}
  >
    <Image alt="Icon" src={icon || KindiHeart} className="p-[2px]" />
  </div>
);

// ExtraIconBadge Component
const ExtraIconBadge = ({ totalIcons, backgroundColor = "f05c5c" }) => {
  if (totalIcons <= 4) return null;

  return (
    <div
      className={`w-[36px] h-[36px] flex justify-center items-center rounded-[12px]`}
      style={{ backgroundColor: `#${backgroundColor}` }} // Ensure backgroundColor is a valid hex code
    >
      <span className="text-red p-[2px] text-[20px] font-medium font-fredoka">
        +{totalIcons - 4}
      </span>
    </div>
  );
};

// GridContainer Component
const GridContainer = ({ children, className }) => {
  const totalIcons = React.Children.count(children);
  const visibleIcons = totalIcons > 4 ? 4 : totalIcons;

  return (
    <div
      className={`items-center scrollbar-hidden justify-center grid grid-cols-5 md:grid-cols-5 ${className}`}
    >
      {[...React.Children.toArray(children)]
        .slice(0, visibleIcons)
        .map((child, index) => (
          <React.Fragment key={index}>{child}</React.Fragment>
        ))}
      {totalIcons > 4 && <ExtraIconBadge totalIcons={totalIcons} />}
    </div>
  );
};

// Activity Component
const Activity = ({
  title = "Autumn Colors Leaf Wheel",
  time = "5 minutes",
  tags = [],
  icons = [],
}) => (
  <Link
    href="/p/activities/slug" // Adjust this path if needed
    className="w-full min-w-[300px] h-auto bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4"
  >
    <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
      <div className="w-full max-w-full h-auto overflow-clip rounded-t-3xl ">
        <Image
          className="w-full max-h-[240px] hover:scale-105  md:max-h-[300px] object-cover rounded-t-3xl "
          src={ActivityCard}
          alt="Activity Card" // Add alt attribute for accessibility
        />
        <div className="w-full py-6 flex-col justify-start px-4 items-start flex gap-4">
          <div className="flex-col gap-[6px] justify-start items-start">
            <div className="text-[#0a1932] text-lg md:text-2xl font-semibold font-fredoka leading-normal">
              {title}
            </div>
            <div className="justify-start w-full items-center gap-2 inline-flex">
              <div className="text-[#0a1932] w-[max-content] text-sm md:text-base font-normal font-fredoka leading-normal">
                {time}
              </div>
              {tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <div className="w-1 h-1 bg-[#e3e3e3] rounded-full" />
                  <div className="text-[#0a1932] w-[max-content] text-sm md:text-base font-normal font-fredoka leading-normal">
                    {tag}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <GridContainer className="items-center justify-center gap-3 md:gap-4 grid grid-cols-3 md:grid-cols-5">
            {icons.map((icon, index) => (
              <IconBadge key={index} icon={icon} />
            ))}
          </GridContainer>
        </div>
      </div>
    </div>
  </Link>
);

export default Activity;
