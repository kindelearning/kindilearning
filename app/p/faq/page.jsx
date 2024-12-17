"use client";

import { fetchFaq } from "@/app/data/p/Standard";
import Accordion from "@/app/Sections/Global/MyAccordion";
import { useEffect, useState } from "react";

export default async function FaqPage() {
  // Fetch FAQ data directly on the server
  const faqContent = await fetchFaq();

  if (!faqContent || faqContent.length === 0) {
    return <p>No FAQ data available</p>;
  }

  return (
    <section className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-0 flex flex-col md:flex-row gap-[20px]">
      <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
        <div className="flex flex-col w-full gap-4 justify-center items-center">
          <div className="w-full text-center">
            <span className="text-[#3f3a64] claraheading uppercase">
              FAQ&apos;s
            </span>
          </div>
          <div className="w-full text-center text-[#3f3a64] text-[16px] font-fredoka font-medium">
            At Kindi, we&apos;re committed to continuous improvement in our
            pursuit of enjoyable and impactful learning experiences. Each month,
            we retire play activities to introduce enhanced learning for the
            upcoming month. Which one will you select to elevate your
            child&apos;s early-years development?
          </div>
        </div>
        <div className="items-center w-full justify-center flex flex-col gap-2">
          {faqContent.map((faqItem, index) => {
            const { Question, Answer } = faqItem;
            return (
              <div key={index} className="w-full ">
                <Accordion
                  title={Question}
                  description={
                    Answer ? (
                      <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                        <span
                          className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight"
                          dangerouslySetInnerHTML={{ __html: Answer }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                        <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                          No Answer Available
                        </span>
                      </div>
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
