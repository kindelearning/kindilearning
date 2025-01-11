import NotFound from "@/app/not-found";
import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { ThemeDummy } from "@/public/Images";
import Image from "next/image";

// export default function ThemeClientDetail({ theme }) {
//   if (!theme) {
//     return (
//       <div>
//         <NotFound />
//       </div>
//     );
//   }

//   return (
//     <>
//       <head>
//         <title>{theme.title}</title>
//       </head>
//       <section className="w-full h-auto py-0 lg:py-12 bg-[#EAEAF5] items-center justify-center pb-24 flex flex-col gap-[20px]">
//         <div className="flex overflow-clip lg:rounded-xl lg:max-w-[960px] w-full">
//           <Image
//             width={400}
//             height={300}
//             src={theme.thumbnail.url || ThemeDummy}
//             alt={theme.title}
//             className="w-full hover:scale-105 duration-300 lg:max-w-[960px] lg:rounded-xl h-60 md:h-[400px] lg:h-[400px] object-cover"
//           />
//         </div>
//         <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
//           <div className="w-full mx-auto flex flex-col gap-4 justify-start items-start">
//             <h2 className="text-[#3f3a64] w-full claraheading text-start">
//               {theme.title}
//             </h2>
//             <p className=" text-[#0a1932] text-start clarabodyTwo">
//               {theme.metaDesc}
//             </p>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 pb-12 gap-8">
//             <div className="flex flex-col w-full gap-[12px]">
//               <h3 className="text-2xl md:text-3xl font-semibold font-fredoka">
//                 About the theme
//               </h3>
//               <div className="w-full text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
//                 <RichTextRender content={theme.aboutContent.json} />
//               </div>
//             </div>
//             <div className="flex flex-col w-full gap-[12px]">
//               <h3 className="text-2xl md:text-3xl font-semibold font-fredoka">
//                 What to Expect
//               </h3>
//               <div className="w-full text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
//                 <RichTextRender content={theme.expectContent.json} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
export default function ThemeClientDetail({
  Title,
  metaDesc,
  MainContent,
  LaunchTime,
  Thumbnail,
}) {
  return (
    <>
      <head>
        <title>Kindi Theme</title>
      </head>
      <section className="w-full h-auto py-0 lg:py-12 bg-[#EAEAF5] items-center justify-center pb-24 flex flex-col gap-[20px]">
        <div className="flex overflow-clip lg:rounded-xl lg:max-w-[960px] w-full">
          {Thumbnail?.url ? (
            <img
              width={1400}
              height={600}
              src={Thumbnail?.url}
              // src={`https://upbeat-life-04fe8098b1.strapiapp.com${Thumbnail?.url}`}
              alt={Title}
              className="w-full hover:scale-105 duration-300 lg:max-w-[960px] lg:rounded-xl h-60 md:h-[400px] lg:h-[400px] object-cover"
            />
          ) : (
            <Image
              width={1400}
              height={600}
              src={ThemeDummy}
              alt={Title}
              className="w-full hover:scale-105 duration-300 lg:max-w-[960px] lg:rounded-xl h-60 md:h-[400px] lg:h-[400px] object-cover"
            />
          )}
        </div>
        <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          <div className="w-full mx-auto flex flex-col gap-4 justify-start items-start">
            <h2 className="text-[#3f3a64] w-full claraheading text-start">
              {Title || "Default Title"}
            </h2>
            <p className=" text-[#0a1932] text-start clarabodyTwo">
              {metaDesc || "meta Desc "}
            </p>
          </div>
          <div className="grid grid-cols-1  pb-12 gap-8">
            <div className="flex flex-col w-full gap-[12px]">
              <h3 className="text-2xl md:text-3xl font-semibold font-fredoka">
                About the theme
              </h3>
              <div className="w-full text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
                {MainContent || "Meta Content"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
