import { Edit } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCard = ({ ProfilData }) => {
  return (
    <Link
      href="/profile/edit"
      className="w-full flex flex-row justify-between items-center py-4 px-4 bg-white rounded-xl"
    >
      <div className="flex flex-row gap-4 w-full justify-start items-center">
        <div className="w-12 h-12 flex justify-center items-center">
          <Image
            src={ProfilData.image}
            alt="Profile Image"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="w-full flex-col justify-start items-start inline-flex">
          <div className="text-[#0a1932] w-full text-[28px] font-semibold font-fredoka leading-tight">
            {ProfilData.name}
          </div>
          <div className="text-[#757575] w-full text-xl font-normal font-fredoka leading-none">
            {ProfilData.age}
          </div>
        </div>
      </div>
      <div className="w-4 h-4 flex justify-center items-center">
        <Image src={Edit} alt="Profile Image" className="w-4 h-4 " />
      </div>
    </Link>
  );
};

export default ProfileCard;
