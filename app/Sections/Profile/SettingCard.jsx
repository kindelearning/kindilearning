import { LanguageIcon } from '@/public/Images';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const SettingCard = ({
    image,
    title = " Full name",
    Value = "Sarah Tom ",
    disabled = false,
  }) => {
    return (
      <>
        <div className="w-full py-2 cursor-pointer hover:shadow-md hover:delay-100 bg-white rounded-xl flex flex-row px-4 justify-between items-center transition-shadow duration-300">
          <div className="claracontainer flex flex-row justify-start  items-center gap-4">
            <div className="w-6 h-6 px-[3px] flex-col justify-center items-center gap inline-flex">
              <Image alt="Kindi" src={image || LanguageIcon} />
            </div>
            <div className="w-full flex-col justify-center items-start gap-1 inline-flex">
              <div
                className={`text-[${
                  disabled ? "#757575" : "#000000"
                }] text-[12px] font-normal font-fredoka leading-none`}
              >
                {title}
              </div>
              <div
                className={`text-[${
                  disabled ? "#757575" : "#000000"
                }] text-[20px] font-semibold font-fredoka leading-tight`}
              >
                {Value}
              </div>
            </div>
          </div>
          <div className="w-6 h-6 flex items-center justify-center">
            <ChevronRight className="w-[24px] h-[24px] text-[#0A1932]" />
          </div>
        </div>
      </>
    );
  };

export default SettingCard
