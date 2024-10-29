import { getStandardPagesContent } from "@/lib/hygraph";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const standardPages = await getStandardPagesContent();
  console.log("Standard Pages Content: ", standardPages);
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
              <div
                dangerouslySetInnerHTML={{
                  __html: standardPages.termsConditions.html,
                }}
              />
            ) : (
              <p>No content found</p>
            )}
          </div>
          {/* <span className="text-[#3f3a64] text-[16px] font-semibold font-fredoka leading-[25px]">
            Why Invest in Kindi?{" "}
          </span>
          <div className="items-center w-full justify-center flex flex-col gap-4">
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                1. Transforming Early Childhood Education{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Kindi is redefining the way caregivers and educators approach
                early childhood learning. Our unique, proven program provides
                fun, educational, and developmentally appropriate play
                activities for children from five months to five years. We are
                tapping into the most critical period of brain development,
                ensuring children have the best start in life.
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                2. Rapidly Growing Market{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                The early childhood education market is growing at an
                unprecedented rate, with increasing awareness about the
                importance of early brain development. Parents, nurseries, and
                childcare providers are seeking innovative and accessible ways
                to support children’s cognitive, emotional, social, and physical
                growth. Kindi is well-positioned to meet this growing demand by
                providing high-quality, engaging solutions that nurture learning
                at every stage of early development.
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                3. Proven Science, Real Results
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Kindi’s program is grounded in the latest neuroscience and child
                development research. Our play-based approach supports optimal
                brain growth and development, preparing children for success in
                school and life. Backed by measurable results and real-world
                application, Kindi has the potential to revolutionise the early
                education space globally.
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                4. Scalable Business Model{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Kindi offers a scalable subscription-based model that allows us
                to grow exponentially, both in domestic and international
                markets. Whether through monthly or annual subscriptions, our
                platform provides affordable, accessible resources to caregivers
                and educators, enabling steady, recurring revenue. As more
                nurseries and families adopt Kindi, the potential for expansion
                is limitless.
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Our Vision{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Kindi is on a mission to become the global leader in early
                childhood development, offering parents and educators the tools
                they need to unlock a child’s full potential. Our long-term
                vision is to expand our offerings to millions of families and
                nurseries worldwide, driving innovation in education and
                nurturing the next generation of thinkers, creators, and
                leaders.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Key Investment Highlights{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">
                      Innovative Product Offering:
                    </span>
                    Kindi delivers tailored, research-based activities to
                    support holistic child development.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Subscription-Based Revenue Model:{" "}
                    </span>{" "}
                    Steady and predictable revenue through our subscription
                    platform, offering scalability and growth opportunities.
                  </li>
                  <li>
                    <span className="font-semibold">
                      {" "}
                      Growing Global Market:
                    </span>{" "}
                    If your Increased focus on early childhood education and a
                    strong market demand for accessible, high-quality learning
                    resources.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Strong Competitive Edge:{" "}
                    </span>{" "}
                    Strong Competitive Edge: Backed by science and child
                    development research, Kindi offers a unique, play-based
                    approach that sets us apart from competitors.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Experienced Leadership Team:{" "}
                    </span>{" "}
                    Kindi is led by a passionate team of experts in child
                    development, education, and business, all focused on driving
                    growth and making an impact.
                  </li>
                </ol>
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Join Us on Our Journey{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We invite you to be a part of Kindi&apos;s journey as we
                revolutionise early childhood education. As an investor, you’ll
                have the opportunity to contribute to our growth while making a
                positive, lasting impact on the lives of children around the
                world. <br /> For more information on investment opportunities,
                please contact us via our website contact form and specify that
                you are interested to discuss investing and leave your contact
                details:
                <br /> Together, we can unlock the potential of the next
                generation.
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Current Investors and Strategic Partners{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                At Kindi, we are proud to partner with visionary investors and
                organisations that believe in the importance of early childhood
                development. Through strategic collaboration, we aim to drive
                innovation, expand our reach, and continue to lead the market in
                delivering transformative learning experiences.
                <div className="h-[1.5px] bg-[black] rounded-full my-4" />
                <br />
                Invest in Kindi today and help shape the future of education for
                young minds.
              </span>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Page;
