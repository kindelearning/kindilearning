import { HomeLight } from "@/public/Icons";
import Image from "next/image";
import React from "react";

const Navitem = ({
  Link = "#",
  IconSrc = <HomeLight />,
  Title = "NavTitle",
}) => {
  return (
    <>
      <a
        href={Link}
        className="text-light-blue-200 gap-1 flex-row dark:text-dark-blue-200 text-lg font-medium font-fredoka leading-6 flex items-center justify-center space-x-2"
      >
        <div className="w-[20px] h-[20px] p-[4px]">
          <Image   src={IconSrc} alt={`${Title} icon`} width={20} height={20} />
        </div>
        <span>{Title}</span>
      </a>
    </>
  );
};

export default Navitem;
