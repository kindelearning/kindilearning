import { fetchRefundPolicy } from "@/app/data/p/Standard";
import RichTextRender from "@/app/Sections/Global/RichTextRender";
import Link from "next/link";
import React from "react";

export default async function RefundPolicy() {
  const content = await fetchRefundPolicy();

  if (!content) {
    return (
      <div>
        <p>No data available.</p>
        <p>Data was expected from the Refund Policy API. Please check the API response and ensure it is working.</p>
      </div>
    );
  }

  // Destructure fields from the fetched content
  const { Title, Body, Pagecontent, Lastupdated } = content;

  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
            <div className="w-full text-center">
              <span className="text-red claraheading uppercase">
                {Title.length > 2
                  ? Title.split(" ").slice(0, 1).join(" ")
                  : Title}
              </span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {Title.length > 2
                  ? Title.split(" ").slice(1, 2).join(" ")
                  : Title}
              </span>
            </div>
            {Body ? (
              <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                  {Body}
                </span>
              </div>
            ) : (
              <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                <span className="text-[#3f3a64] claraheading capitalize">
                  No Body Content Available
                </span>
              </div>
            )}
          </div>
          {Lastupdated ? (
            <div className="text-purple clarabodyTwo animate-fade-in">
              Last updated: {new Date(Lastupdated).toLocaleDateString()}
            </div>
          ) : null}
          <div className="h-[1.5px] bg-[black] rounded-full my-4" />

          {Pagecontent ? (
            <span
              className="w-full text-[20px] text-gray-700 font-medium font-fredoka leading-[24px]"
              dangerouslySetInnerHTML={{
                __html: Pagecontent, // Render markdown or rich text content
              }}
            />
          ) : (
            <div className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              No Additional Content Available
            </div>
          )}
        </div>
      </section>
      {/* <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                Kindi
              </span>{" "}
              <span className="text-red claraheading uppercase"> Refund</span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {" "}
                Policy
              </span>
            </div>
            <div className="justify-center flex items-center text-center">
              <span className="text-black text-xs font-medium font-['Fredoka']">
                Last Updated:
              </span>
              <span className="text-black text-xs font-normal font-['Fredoka']">
                {" "}
                September 2024
              </span>
            </div>
            <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              At <span className="font-semibold">Kindi</span> , we strive to
              provide the best experience possible with our educational play
              activities and resources. However, we understand that
              circumstances may arise where you need a refund. This Refund
              Policy explains the terms under which refunds are offered for
              Kindi’s ser
            </span>
          </div>
          <div className="h-[1.5px] bg-[black] rounded-full my-4" />
          <div className="items-center w-full justify-center flex flex-col gap-4">
            {standardPages?.refundPolicy?.html ? (
              <div className="w-full text-gray-700 text-[20px] font-medium font-fredoka leading-[24px]">
                <RichTextRender content={standardPages?.refundPolicy?.json} />
              </div>
            ) : (
              <p>No content found</p>
            )}
          </div>
         
        </div>
      </section> */}
    </>
  );
}
