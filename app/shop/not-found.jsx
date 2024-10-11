import { NotFoundImg } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col md:flex-col lg:flex-row overflow-hidden gap-8">
          <Image alt="Kindi" src={NotFoundImg} />
          <div className="flex w-full flex-col justify-start items-start gap-4">
            <div className="flex flex-col w-full justify-start items-start gap-4">
              <div className="w-full">
                <span className="text-[#3f3a64] text-4xl font-normal font-fredoka leading-[45px]">
                  404 Error!
                  <br />
                </span>
                <span className="text-red text-4xl font-normal font-fredoka leading-[45px]">
                  Opps... This page is taking a little nap!{" "}
                </span>
              </div>
            </div>
            <div className="w-[460px] h-[203px]">
              <span className="text-[#696969] text-lg font-semibold font-['Fredoka'] leading-[21px]">
                This page isn’t quite ready to play right now. While you’re
                here:
                <br />
              </span>
              <span className="text-[#696969] text-lg font-normal font-['Fredoka'] leading-[21px]">
                <br />
              </span>
              <span className="text-[#696969] text-lg font-normal font-['Fredoka'] leading-[21px]">
                Try searching for the page again
                <br />
                Return to our homepage, or
                <br />
                Take a quick detour to explore some fun activities for your
                toddler!
                <br />
              </span>
              <span className="text-[#696969] text-lg font-normal font-['Fredoka'] leading-[21px]">
                <br />
              </span>
            </div>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
