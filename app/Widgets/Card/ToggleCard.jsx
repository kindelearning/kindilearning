import { KindiHeart } from "@/public/Images";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

const ToggleCard = ({
  title,
  description,
  icon,
  backgroundColor,
  isOpen,
  setIsOpen,
  link = "#",
  linkText = "Read More",
}) => {
  return (
    <div
      className={`w-full min-w-[320px] md:min-w-[200px] max-w-md p-4 rounded-[16px] shadow-md`}
      style={{ backgroundColor: `#${backgroundColor}` }}
    >
      <div className="flex justify-between h-full flex-col items-center">
        <div className="flex w-full h-full justify-between flex-col items-center">
          <div className="flex w-full flex-row justify-between min-h-[50px] items-start">
            <h5 className="text-white font-bold text-[24px] font-fredoka leading-[28px]">
              {title}
            </h5>
            <Image
              alt="Kindi"
              src={icon || KindiHeart}
              className="flex justify-center w-[40px] h-[40px]"
            />
          </div>
          <div
            className={`my-4 h-full justify-between flex flex-col gap-2 w-full px-4 transition-all duration-1000 overflow-hidden ${
              isOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <p className="text-white text-base font-medium font-montserrat leading-[20px]">
              {description}
            </p>
            <a
              href={link}
              className="text-center text-white text-lg font-bold font-fredoka uppercase leading-relaxed mt-2 relative inline-block"
            >
              <span className="transition-all duration-300">{linkText}</span>
              <span className="absolute bottom-0 left-0 w-0 bg-white h-[2px] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black rounded-full p-[2px] items-end"
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-[white]" />
          ) : (
            <Plus className="w-4 h-4 text-[white]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ToggleCard;
