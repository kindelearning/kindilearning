import { activityIcons } from "@/app/constant/menu";
import { ActivityImage, ThemeDummy } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

export const getIconForSkill = (skillTitle) => {
  const foundIcon = activityIcons.find(
    (iconData) => iconData.title === skillTitle
  );
  //   console.log("foundIcon", foundIcon);
  return foundIcon ? foundIcon.icon : null; // Return the icon URL or null if not found
};
export default function ActivityCard({ activity, activityUrl, icons }) {
  const {
    Title,
    Skills,
    LearningAreaIcons,
    Theme,
    FocusAge,
    ActivityDate,
    LearningArea,
    Gallery,
    SetUpTime,
  } = activity;

  // Handle Gallery URL (Assume it's either an array or object with a URL field)
  const imageUrl = Array.isArray(Gallery)
    ? Gallery[0]?.url // If it's an array, use the first image
    : Gallery?.url || "/Images/ActivityImage.png";
  return (
    <>
      <Link
        href={activityUrl || "#"}
        target="_blank"
        className="md:w-full md:max-w-full max-w-[196px]  hover:shadow-md duration-200 min-w-[170px] w-full min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4"
      >
        <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
          <div className="w-full max-w-full md:min-w-full lg:max-w-full h-auto">
            <div className="flex max-h-[180px] min-h-[150px] h-[150px] md:min-h-[200px] md:h-full lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-3xl">
              {imageUrl ? (
                <img
                  width={280}
                  height={250}
                  alt={Title}
                  className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                  src={`https://lionfish-app-98urn.ondigitalocean.app${imageUrl}`}
                  // src={imageUrl}
                />
              ) : (
                <Image
                  width={280}
                  height={250}
                  alt="ThemeDummy"
                  className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                  src={ThemeDummy}
                />
              )}
            </div>
            <div className="w-full p-2 md:p-4  flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
              <div className="flex-col w-full gap-[6px] justify-start items-start">
                <div className="text-[#0a1932] text-[16px] md:text-xl font-semibold font-fredoka leading-[20px]">
                  {Title.length > 18
                    ? `${Title.slice(0, 18)}...`
                    : Title || "Activity Title"}
                </div>
                <div className="justify-start overflow-clip w-full items-center gap-1 lg:gap-2 inline-flex">
                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-4 flex px-0 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                    {SetUpTime || "5 min"}
                  </div>
                  •
                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                    {Theme || "Winter"}
                  </div>
                  •
                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex pr-2 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                    {FocusAge || "Toddler"}
                  </div>
                </div>
              </div>
              {/* <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5"></div> */}
              <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                {/* Skill Icons Section */}
                {LearningAreaIcons?.slice(0, 5).map((skill, index) => {
                  const skillTitle = skill.children?.[0]?.text; // Extract skill title
                  const iconUrl = getIconForSkill(skillTitle, icons); // Get icon URL using the passed prop
                  return (
                    <div
                      key={index}
                      className="activity-icon  flex items-center gap-2"
                    >
                      {iconUrl && (
                        <img
                          title={skillTitle}
                          src={iconUrl.src}
                          alt={skillTitle}
                          className="w-6 lg:w-10 lg:h-10 h-6"
                          width={iconUrl.width} // Optionally set width and height
                          height={iconUrl.height}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
