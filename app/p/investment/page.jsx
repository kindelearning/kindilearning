import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { getStandardPagesContent } from "@/lib/hygraph";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const standardPages = await getStandardPagesContent();
  // console.log("Standard Pages Content: ", standardPages);
  if (
    !standardPages ||
    !standardPages.refundPolicy ||
    !standardPages.refundPolicy.html
  ) {
    return <p>No content found</p>;
  }
  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
            <div className="w-full text-center">
              <span className="text-red claraheading uppercase">
                {" "}
                Investment
              </span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {" "}
                Opportunities
              </span>
            </div>
            <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              Welcome to{" "}
              <span className="font-semibold">
                Kindi&apos;s Investor Relations
              </span>{" "}
              page. Here at Kindi, we believe in the transformative power of
              early childhood development and education, and we are dedicated to
              creating meaningful opportunities for investors who share our
              vision of building a brighter future for young minds.
            </span>
          </div>
          {/* The Divider */}
          <div className="h-[1.5px] bg-[black] rounded-full my-4" />
          <div className="items-center w-full justify-center flex flex-col gap-4">
            {standardPages?.termsConditions?.html ? (
              <div className="w-full text-[20px] text-gray-700 font-medium font-fredoka leading-[24px]">
                <RichTextRender
                  content={standardPages?.termsConditions?.json}
                />
              </div>
            ) : (
              <p>No content found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
