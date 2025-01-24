import { ThemeDummy } from "@/public/Images";
import Image from "next/image";
import ThemeTimer from "../Chip/ThemeTimer";

const ThemeCard = ({ image, title, metaDesc, theTime }) => {
  return (
    <div className="flex flex-col gap-[-12px] cursor-pointer justify-center items-end animate-fade-in transition-all duration-300 group">
      <div className="p-[8px] w-full bg-[#3f3d91] min-w-[360px] flex flex-col items-end rounded-[32px] animate-slide-up ">
        <div className="w-full flex min-h-[180px] max-h-[182px] lg:min-h-[200px]  justify-between border-2 border-white  rounded-[28px] ">
          <div className="w-full max-w-[200px] flex flex-col bg-[#3f3d91] lg:max-w-[460px] z-2 rounded-r-[60px] rounded-l-[50px] lg:rounded-l-[38px] py-4 lg:py-8 justify-start items-start lg:pl-4 pl-2 pr-2 animate-fade-in">
            <div className="text-white flex lg:hidden font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[24px] md:leading-[28px] lg:text-[32px] lg:leading-[36px] xl:text-[36px] xl:leading-[40px]">
              {title.length > 14
                ? title.slice(0, 12) + "..."
                : title || "Winter Magic"}
            </div>
            <div className="text-white hidden lg:flex font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[24px] md:leading-[28px] lg:text-[32px] lg:leading-[36px] xl:text-[36px] xl:leading-[40px]">
              {title.length > 24
                ? title.slice(0, 24) + "..."
                : title || "Winter Magic"}
            </div>
            <div className="text-[white] flex lg:hidden clarabodyTwo text-[14px] font-montserrat">
              {metaDesc.length > 100
                ? metaDesc.slice(0, 100) + "..."
                : metaDesc ||
                  "Snowy adventures, ice castles, cozy indoor playtimes."}
            </div>
            <div className="text-[white] hidden lg:flex text-[14px] leading-[20px] md:text-[18px] md:leading-[22px] font-fredoka font-medium">
              {metaDesc.length > 160
                ? metaDesc.slice(0, 180) + "..."
                : metaDesc ||
                  "Snowy adventures, ice castles, cozy indoor playtimes."}
            </div>
          </div>
          <div className="flex overflow-clip -z-20 -ml-[96px] group-hover:scale-[1.025] transition-all duration-300">
            <img
              alt="Kindi"
              width={400}
              height={100}
              // src={image || ThemeDummy}
              src={image ? image : "/Images/ThemeDummy.png"}
              className={`w-full max-w-[130px] md:max-w-[200px] lg:max-w-[240px]  h-full object-cover rounded-r-[28px] animate-fade-in`}
            />
          </div>
        </div>
      </div>
      <div className="-mt-4 flex justify-end mr-2 z-12 animate-fade-in">
        {new Date(theTime).getTime() > Date.now() ? (
          <ThemeTimer targetDate={theTime} />
        ) : (
          <div className="w-auto hover:scale-110 duration-500 ease-out max-w-[340px] h-auto bg-purple rounded-full px-[16px] flex gap-[8px] items-center justify-between">
            <div className="w-auto h-[34px] flex gap-[12px] justify-between items-center">
              <div className="w-[max-content] font-semibold text-white text-[12px] md:text-[16px] font-fredoka leading-[28px]">
                Explore Theme
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="-mt-4 flex mr-2 z-12 animate-fade-in">
        <ThemeTimer targetDate={theTime} />
      </div> */}
    </div>
  );
};

export default ThemeCard;
