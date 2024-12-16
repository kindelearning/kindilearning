import {
  Apple,
  AppStore,
  Facebook,
  Instagram,
  KindiVector,
  Language,
  Telegram,
  WhatsApp,
} from "@/public/Images";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { footerSections } from "@/app/constant/menu";
import Link from "next/link";
import { GoogleTranslate } from "../GoogleTranslate";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <section className="w-full h-auto bg-[#000000] pt-12 pb-2 items-center justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full flex flex-col gap-1 md:flex-col lg:flex-row md:gap-12 lg:gap-2">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 justify-between items-start gap-8 px-4">
            {footerSections.map((section, index) => (
              <div key={index} className="claracontainer mb-8 md:mb-0">
                <div className="flex w-full flex-col justify-between items-start gap-2">
                  <div className="text-white text-[24px] md:text-[28px] font-semibold font-fredoka">
                    {section.title}
                  </div>
                  <div className="h-auto flex-col justify-start items-start gap-[4px] inline-flex flex-wrap">
                    {section.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        className="text-[#BABABA] hover:text-white w-[max-content] text-[18px] font-normal font-fredoka "
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full claracontainer px-4 flex flex-col md:border-l-[0px] md:border-l-emerald-50 border-0 justify-between gap-[20px] items-start md:w-full xl:w-1/3">
            <Image alt="Kindi" src={KindiVector} className="flex w-[120px]" />
            <div className="w-auto text-white clarabodyTwo font-medium font-fredoka capitalize mb-8 md:mb-0">
              special offers and latest news about our products directly{" "}
            </div>

            {/* <div className="hidden lg:flex w-full">
              <GoogleTranslate />
            </div> */}
          </div>
        </div>
        <div className="claracontainer w-full py-8 px-2 flex flex-col justify-center items-center gap-1">
          <div className="text-white text-3xl md:text-4xl font-bold font-fredoka">
            Download Our App
          </div>
          <div className="claracontainer w-full py-4 px-2 flex flex-row justify-center items-center gap-1 md:flex-row">
            <Image alt="Kindi" src={Apple} />
            <Image alt="Kindi" src={AppStore} />
          </div>
        </div>
        <div className="claracontainer px-2 w-full py-4 flex flex-col justify-between items-center gap-1 md:flex-row">
          <div className="text-white/90  w-full text-[18px] md:text-[22px] font-semibold font-fredoka">
            {currentYear} KINDI Learning, INC. All rights reserved.
          </div>
          <Link href="#" className="flex w-full justify-end items-end gap-2">
            <Image
              alt="Kindi"
              src={Facebook}
              className="w-6 h-6 justify-center items-center p-1 border-[1px] rounded-[4px] border-white flex"
            />
            <Image
              alt="Kindi"
              src={Instagram}
              className="w-6 h-6 justify-center items-center p-1 border-[1px] rounded-[4px] border-white flex"
            />
            <Image
              alt="Kindi"
              src={Telegram}
              className="w-6 h-6 justify-center items-center p-1 border-[1px] rounded-[4px] border-white flex"
            />
            <Image
              alt="Kindi"
              src={WhatsApp}
              className="w-6 h-6 justify-center items-center p-1 border-[1px] rounded-[4px] border-white flex"
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Footer;
