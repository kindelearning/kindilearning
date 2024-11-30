
import Image from "next/image";
import { ThemeDummy } from "@/public/Images";
import ThemeTimer from "../Chip/ThemeTimer";


const CategoryCard = ({
  image,
  schedulesDate,
  header = "Winter Magic",
  description = "Snow adventure, ice castles, cozy indoor playtimes",
}) => {
  return (
    <div className="flex cursor-pointer flex-col justify-end relative">
      {" "}
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex rounded-t-lg  overflow-clip">
          <Image
            width={400}
            height={300}
            src={image || ThemeDummy}
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

            {/* <button
              className="border border-red text-red rounded-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              )}
            </button> */}
          </div>
        </div>
      </div>{" "}
      {/* <div className="w-full flex justify-end px-4 -mt-4">
        <CountdownTimer endDate={schedulesDate} />
      </div> */}
      <div className="-mt-4 flex justify-end mr-2 z-12 animate-fade-in">
        <ThemeTimer targetDate={schedulesDate} />
      </div>
    </div>
  );
};

export default CategoryCard;
