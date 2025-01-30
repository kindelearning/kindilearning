"use client";

import { fetchQualityControl } from "@/app/data/p/Standard";
import { useEffect, useState } from "react";

export default  function QualityControll() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the refund policy when the component mounts
  useEffect(() => {
    const getRefundPolicyData = async () => {
      const data = await fetchQualityControl();
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

  const { Title, Body, Pagecontent, Lastupdated } = content;

  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                Kindi
              </span>{" "}
              <span className="text-red claraheading uppercase"> Quality</span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {" "}
                Control
              </span>
            </div>

            <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              {Body ||
                "At Kindi</span> ,we blend   cutting-edge technology with research-backed early childhoodeducation practices to deliver a seamless, engaging, and effective               learning experience for children, carers, and educators. Ourplatform is designed to provide easy access to carefully craftedplay activities while ensuring a user-friendly experience for bothparents and professionals. Below, we highlight the keytechnological features that power Kindi&apos;s innovative approach toearly childhood development."}
            </span>
          </div>
          <div className="h-[1.5px] bg-[black] rounded-full my-4" />

          <div
            className="w-full prose text-gray-700 text-[20px] font-medium font-fredoka leading-[24px]"
            dangerouslySetInnerHTML={{
              __html:
                Pagecontent.replace(/\n/g, "<br />") ||
                "<p>No additional content available</p>",
            }}
          />
        </div>
      </section>
    </>
  );
}
