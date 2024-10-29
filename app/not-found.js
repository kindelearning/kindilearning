import { NotFoundImg } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./Sections";

export default function NotFound() {
  return (
    <>
      {/* <Header className="sticky" /> */}

      <section className="w-full h-screen bg-[#EAEAF5] items-center justify-center py-4 flex flex-col lg:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col md:flex-col lg:flex-row py-24 overflow-hidden gap-8">
          <Image alt="Kindi" src={NotFoundImg} />
          <div className="flex flex-col w-full justify-start items-start gap-4">
            <div className="flex flex-col w-full justify-start items-start gap-4">
              <div className="w-full">
                <span className="text-[#3f3a64] text-3xl font-normal font-fredoka leading-[45px]">
                  404 Error! app/notfound.js
                  <br />
                </span>
                <span className="text-red text-2xl md:text-4xl font-normal font-fredoka leading-[26px] md:leading-[45px]">
                  Opps... This page is taking a little nap!{" "}
                </span>
              </div>
            </div>
            <div className="w-full lg:w-[460px] h-full lg:h-[203px]">
              <span className="text-[#696969] text-lg font-semibold font-fredoka leading-[21px]">
                This page isn&apos;t quite ready to play right now. While you&apos;s
                here:
                <br />
              </span>
              <span className="text-[#696969] text-lg font-normal font-fredoka leading-[21px]">
                <br />
              </span>
              <span className="text-[#696969] text-lg font-normal font-fredoka leading-[21px]">
                Try searching for the page again
                <br />
                Return to our homepage, or
                <br />
                Take a quick detour to explore some fun activities for your
                toddler!
                <br />
              </span>
              <span className="text-[#696969] text-lg font-normal font-fredoka leading-[21px]">
                <br />
              </span>
            </div>
            <p>Could not find requested resource</p>
            <div className="w-full duration-200">
              <Link href="/">
                <span className="text-[#3f3a64] hover:font-semibold duration-200 hover:underline text-lg font-medium font-fredoka leading-[21px]">
                  Return Home
                </span>
              </Link>
              <span className="text-[#696969] text-lg font-medium font-fredoka leading-[21px]">
                {" "}
              </span>
              <span className="text-red text-lg font-medium font-fredoka leading-[21px]">
                {" "}
                |
              </span>
              <span className="text-[#696969] text-lg font-medium font-fredoka leading-[21px]">
                {" "}
              </span>
              <Link href="/p/activities">
                <span className="text-[#3f3a64] hover:font-semibold duration-200 hover:underline text-lg font-medium font-fredoka leading-[21px]">
                  Explore Activities
                </span>
              </Link>
              <span className="text-[#696969] text-lg font-medium font-fredoka leading-[21px]">
                {" "}
              </span>
              <span className="text-red text-lg font-medium font-fredoka leading-[21px]">
                {" "}
                |
              </span>
              <span className="text-[#696969] text-lg font-medium font-fredoka leading-[21px]">
                {" "}
              </span>
              <Link href="/p/contact-us">
                <span className="text-[#3f3a64] hover:font-semibold duration-200 hover:underline text-lg font-medium font-fredoka leading-[21px]">
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
