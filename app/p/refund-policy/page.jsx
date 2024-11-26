import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { getStandardPagesContent } from "@/lib/hygraph";
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
            {/* The Divider */}
          </div>
          <div className="h-[1.5px] bg-[black] rounded-full my-4" />
          <div className="items-center w-full justify-center flex flex-col gap-4">
            {standardPages?.refundPolicy?.html ? (
             
              <div className="w-full text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
                <RichTextRender content={standardPages?.refundPolicy?.json} />
              </div>
            ) : (
              <p>No content found</p>
            )}
          </div>
          <div className="items-center w-full justify-center flex flex-col gap-4">
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                1. Subscription Plans{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Kindi offers various subscription plans to access our activities
                and resources, including monthly and annual options. The
                following terms apply to these plans:
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">
                      Monthly Subscriptions:
                    </span>{" "}
                    These renew automatically every month on the billing date.
                  </li>
                  <li>
                    <span className="font-semibold">Annual Subscriptions:</span>{" "}
                    These renew automatically every year on the billing date.{" "}
                  </li>
                </ol>
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                2. Refund Eligibility{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Refunds are granted under specific conditions as outlined below:
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                2.1. Monthly Subscriptions{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                <ol className="list-disc px-4 py-2">
                  <li>
                    You are eligible for a refund{" "}
                    <span className="font-semibold"> within 7 days</span> of the
                    initial purchase or renewal date for monthly subscriptions.
                  </li>
                  <li>
                    After the 7-day period,{" "}
                    <span className="font-semibold">no refunds</span> will be
                    granted for that billing cycle, and you will continue to
                    have access to the Kindi services until the end of the
                    subscription period.
                  </li>
                </ol>{" "}
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                2.2. Annual Subscriptions{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                <ol className="list-disc px-4 py-2">
                  <li>
                    You are eligible for a refund{" "}
                    <span className="font-semibold"> within 14 days</span> of
                    the initial purchase or renewal date for annual
                    subscriptions.
                  </li>
                  <li>
                    After the 14-day period,{" "}
                    <span className="font-semibold">no refunds</span> will be
                    granted for that billing cycle, and you will continue to
                    have access to the Kindi services until the end of the
                    subscription period.
                  </li>
                </ol>{" "}
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                3. Requesting a Refund{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                To request a refund, please follow these steps:
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">Contact Us: </span>
                    Send an email to{" "}
                    <Link
                      href="mailto:support@kindilearning.com"
                      className="font-semibold uppercase text-red"
                    >
                      support@kindilearning.com
                    </Link>{" "}
                    within the eligible time frame (7 days for monthly
                    subscriptions, 14 days for annual subscriptions).
                  </li>
                  <li>
                    <span className="font-semibold"> Provide Information:</span>{" "}
                    Include your full name, email address associated with the
                    account, and the reason for your refund request.
                  </li>
                  <li>
                    <span className="font-semibold"> Processing:</span> We will
                    review your request and respond within 5-7 business days. If
                    approved, the refund will be processed and credited back to
                    your original method of payment.
                  </li>
                </ol>
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                4. Non-Refundable Cases{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Kindi does not offer refunds in the following cases:
                <br />
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">Partial Usage:</span>
                    No refunds will be issued for partial use of the
                    subscription during the billing cycle (e.g., if you cancel
                    midway through the month or year but have used the service).
                  </li>
                  <li>
                    <span className="font-semibold">
                      Discounted Offers or Promotions:
                    </span>{" "}
                    Subscriptions purchased during sales, special promotions, or
                    with a discount code are non-refundable.
                  </li>
                  <li>
                    <span className="font-semibold"> Free Trials:</span> If your
                    subscription started with a free trial and you did not
                    cancel before the trial ended, you are not eligible for a
                    refund for the first billing period.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Digital Downloads or Resources:{" "}
                    </span>{" "}
                    Any one-time purchases of digital content, downloadable
                    resources, or add-ons are non-refundable once the download
                    or access has been initiated.
                  </li>
                </ol>
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                5. Cancelling Your Subscription{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                If you wish to cancel your Kindi subscription to prevent future
                charges:
                <br />
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">
                      {" "}
                      Monthly Subscriptions:{" "}
                    </span>
                    You can cancel anytime before your renewal date to avoid
                    being charged for the next billing cycle. After
                    cancellation, your access to Kindi services will continue
                    until the end of the current subscription period.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Annual Subscriptions:{" "}
                    </span>{" "}
                    We You can cancel your subscription anytime, but you will
                    retain access to the service until the end of the
                    subscription period. No refunds will be issued for any
                    unused portion of the annual subscription after the 14-day
                    refund period.
                  </li>
                </ol>
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                6. Payment Discrepancies{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                If you notice any unauthorised or incorrect charges on your
                account, please contact us immediately through our online
                contact from offering as much detail as possible. We will
                investigate and resolve the issue promptly.
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                7. Changes to the Refund Policy{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We may update this Refund Policy from time to time to reflect
                changes in our services or feedback from our users. If
                significant changes are made, we will notify you via email or
                through a notice on our website. By continuing to use Kindi
                after changes are made, you agree to the revised policy.
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                8. Contact Information{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                If you have any questions or need assistance regarding this
                Refund Policy, please reach out to us via our contact form.
                <br />
                We are committed to ensuring a fair and transparent experience
                for all Kindi users. Thank you for your understanding and
                support!
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
