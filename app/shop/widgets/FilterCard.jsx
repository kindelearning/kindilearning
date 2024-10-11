// FilterCard.js
import Image from "next/image";
import Link from "next/link";

const FilterCard = ({ data }) => {
  return (
    <Link
      href="#"
      className="w-[100px] md:w-[120px] h-[120px] md:h-[149px] hover:scale-105 duration-150 pl-[6.13px] pr-[6.12px] pt-[12.25px] pb-[21.25px] rounded-xl flex-col justify-start items-center gap-2 inline-flex"
      style={{ backgroundColor: data.bgColor }}
    >
      <div className="w-[74px] h-[74px] relative gap-2 lg:gap-0 flex-col justify-center items-center flex">
        <Image
          src={data.icon}
          alt={data.title}
          width={73.5}
          height={73.5}
          className="absolute w-[60px] h-[60px] lg:w-full lg:h-full"
        />
      </div>
      <div className="w-[110px] text-center text-white text-[13px] font-semibold font-fredoka leading-none">
        {data.title}
      </div>
    </Link>
  );
};

export default FilterCard;
