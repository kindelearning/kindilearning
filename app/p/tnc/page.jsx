"use client";

import { fetchTnc } from "@/app/data/p/Standard";
import { useEffect, useState } from "react";

export default async function TermsAndCondition() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the refund policy when the component mounts
  useEffect(() => {
    const getRefundPolicyData = async () => {
      const data = await fetchTnc();
      // console.log("Fetched Data:", data); // Log the data to check if it's set correctly
      setContent(data);
      setLoading(false);
    };

    getRefundPolicyData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!content) {
    return <p>No data available</p>;
  }

  // Destructure fields from the fetched content
  const { Title, Body, Pagecontent, Lastupdated } = content;
  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
            <div className="flex flex-col w-full gap-4 justify-center items-center">
              <div className="w-full text-center">
                <span className="text-[#3f3a64] claraheading uppercase">
                  Terms
                </span>{" "}
                <span className="text-red claraheading uppercase"> And</span>{" "}
                <span className="text-[#3f3a64] claraheading uppercase">
                  Condition
                </span>
              </div>
            </div>
            {/* {Body ? (
              <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                  {Body}
                </span>
              </div>
            ) : (
              <div className="flex flex-col w-full justify-start items-start heading animate-fade-in">
                <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight"></span>
              </div>
            )} */}
          </div>
          {Lastupdated ? (
            <div className="text-purple  clarabodyTwo animate-fade-in">
              Last updated: {new Date(Lastupdated).toLocaleDateString()}
            </div>
          ) : null}
          {/* <div className=" prose bg-[black] rounded-full my-4" /> */}
          {Pagecontent ? (
            <div
              className="prose font-fredoka"
              dangerouslySetInnerHTML={{
                __html: Pagecontent,
              }}
            />
          ) : (
            <div className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              No Additional Content Available
            </div>
          )}
        </div>
      </section>
    </>
  );
}
// .replace(/\n/g, "<br />") 