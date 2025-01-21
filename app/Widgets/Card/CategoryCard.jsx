import Image from "next/image";
import { ThemeDummy } from "@/public/Images";
import ThemeTimer from "../Chip/ThemeTimer";
import { Link } from "lucide-react";

const CategoryCard = ({
  image,
  schedulesDate,
  header = "Winter Magic",
  description = "Snow adventure, ice castles, cozy indoor playtimes",
}) => {
  return (
    <div className="flex cursor-pointer flex-col justify-end relative">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex rounded-t-lg  overflow-clip">
          <img
            width={400}
            height={300}
            // src={image || ThemeDummy}
            src={`https://kindiadmin.up.railway.app${image}` || "/Images/ThemeDummy.png"}

            alt="Category Image"
            className="w-full hover:scale-110  duration-500 ease-out h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-between py-2 flex-col w-full items-start">
              <h2 className="text-[#3f3a64] text-2xl font-semibold font-fredoka leading-tight">
                {header}
              </h2>

              <p className="text-[#0a1932] min-h-[60px] max-h-[60px] text-[16px] font-normal font-fredoka leading-[20px]">
                {description.length > 100
                  ? description.slice(0, 99) + "..."
                  : description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="-mt-4 flex justify-end mr-2 z-12 animate-fade-in">
        <ThemeTimer targetDate={schedulesDate} />
      </div> */}
      <div className="-mt-4 flex justify-end mr-2 z-12 animate-fade-in">
        {new Date(schedulesDate).getTime() > Date.now() ? (
          <ThemeTimer targetDate={schedulesDate} />
        ) : (
          // <span className="text-red font-semibold">Explore Theme</span>
          <div className="w-auto hover:scale-110 duration-500 ease-out max-w-[340px] h-auto bg-purple rounded-full px-[16px] flex gap-[8px] items-center justify-between">
            <div className="w-auto h-[34px] flex gap-[12px] justify-between items-center">
              <div className="w-[max-content] font-semibold text-white text-[12px] md:text-[16px] font-fredoka leading-[28px]">
                Explore Theme
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
