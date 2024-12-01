import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { getStandardPagesContent } from "@/lib/hygraph";
import Link from "next/link";
import React from "react";

export default async function PrivacyPolicy() {
  const standardPages = await getStandardPagesContent();
  // console.log("Standard Pages Content: ", standardPages);
  if (
    !standardPages ||
    !standardPages.privacyPolicy ||
    !standardPages.privacyPolicy.html
  ) {
    return <p>No content found</p>;
  }
  // const updatedDate = format(new Date(standardPages.updatedAt), 'MMMM dd, yyyy');
  const updatedDate = new Date(standardPages.updatedAt).toLocaleDateString();

  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                Kindi
              </span>{" "}
              <span className="text-red claraheading uppercase"> Privacy</span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {" "}
                Policy
              </span>{" "}
            </div>
            <div className="justify-center flex items-center text-center">
              <span className="text-black text-xs font-medium font-['Fredoka']">
                Last Updated:
              </span>
              <span className="text-black text-xs font-normal font-['Fredoka']">
                {" "}
                {updatedDate}
              </span>
            </div>
            <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              Your privacy is of utmost importance to us. This Privacy Policy
              outlines how Kindi (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) collects, uses, discloses, and protects your
              personal information when you use our website
              www.kindilearning.com (the &quot;Platform&quot;) and related
              services (the &quot;Services&quot;). By accessing or using the
              Platform and our Services, you agree to this Privacy Policy and
              our Terms of Use. If you do not agree with the terms of this
              policy, please discontinue use of the Platform and Services.
            </span>
            {/* The Divider */}
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
          </div>

          <div className="items-center w-full justify-center flex flex-col gap-4">
            {standardPages?.privacyPolicy?.html ? (
              <div className="w-full text-gray-700 text-[20px] font-medium font-fredoka leading-[24px]">
                <RichTextRender content={standardPages?.privacyPolicy?.json} />
              </div>
            ) : (
              <p>No content found</p>
            )}
          </div>
          {/* <div className="items-center w-full justify-center flex flex-col gap-4">
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                1. Information We Collect
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We collect both personal and non-personal information to provide
                and improve our Services.
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                1.1. Personal Information
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                When you interact with our Platform, you may provide us with
                personal information that identifies you. This may include, but
                is not limited to:
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold"> Contact Information:</span>{" "}
                    Your name, email address, telephone number, and mailing
                    address.
                  </li>
                  <li>
                    <span className="font-semibold">Account Information:</span>{" "}
                    Username, password, and other registration details.
                  </li>
                  <li>
                    <span className="font-semibold">Payment Information:</span>{" "}
                    Billing details such as credit card numbers and transaction
                    data when you make a purchase.
                  </li>
                  <li>
                    <span className="font-semibold">Child’s Information:</span>{" "}
                    Information about your child’s age, developmental stage, and
                    preferences to customise tools and resources. This data is
                    strictly protected and used solely for the intended purpose
                    of providing personalised activities.
                  </li>
                  <li>
                    <span className="font-semibold">
                      {" "}
                      Demographic Information:
                    </span>{" "}
                    Age, gender, and other relevant details that help us better
                    understand our audience.
                  </li>
                </ol>{" "}
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                1.2. Non-Personal Information
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We also collect non-personal data such as:
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold"> Usage Data:</span>{" "}
                    Information about how you interact with the Platform, such
                    as page visits, time spent on pages, and general usage
                    patterns.
                  </li>
                  <li>
                    <span className="font-semibold"> Device Data:</span> Data
                    related to the device you use to access our Platform,
                    including IP address, browser type, device type, and
                    operating system.
                  </li>
                </ol>{" "}
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                1.3. Cookies and Tracking Technologies
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We use cookies, web beacons, and other tracking technologies to
                collect information. Cookies are small files placed on your
                device that help improve your experience by remembering your
                preferences. You can control the use of cookies through your
                browser settings, but note that disabling them may limit your
                ability to use some features of the Platform
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                2. How We Use Your Information
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We use the information we collect for a variety of purposes,
                including:
                <br />
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">
                      To Provide Our Services:
                    </span>
                    Offering educational activities and resources for your
                    child’s development based on the information you provide.
                  </li>
                  <li>
                    <span className="font-semibold"> Account Management:</span>{" "}
                    Enabling account creation, access, and management.
                  </li>
                  <li>
                    <span className="font-semibold"> Customer Support:</span>{" "}
                    Responding to your inquiries and providing assistance.
                  </li>
                  <li>
                    <span className="font-semibold"> Communication:</span>{" "}
                    Sending you updates, newsletters, promotions, and important
                    information related to the Platform. You may opt out of
                    marketing communications at any time.
                  </li>
                  <li>
                    <span className="font-semibold">
                      {" "}
                      Payments and Transactions :
                    </span>
                    Processing your payments for services and subscriptions.
                  </li>
                  <li>
                    <span className="font-semibold">
                      {" "}
                      Improvement of Services :
                    </span>
                    Analysing usage patterns to enhance and personalise our
                    offerings.
                  </li>
                  <li>
                    <span className="font-semibold"> Security: </span>{" "}
                    Monitoring for fraud and protecting against unauthorised
                    access to accounts and data.
                  </li>
                </ol>
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                3. How We Share Your Information
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We respect your privacy and will not share your personal
                information with third parties except in the following
                situations:
                <br />
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">Service Providers:</span>
                    We may share information with third-party vendors,
                    contractors, and service providers who help us operate the
                    Platform and Services. These providers have access to your
                    data only to perform tasks on our behalf and are
                    contractually obligated to protect your data.
                  </li>
                  <li>
                    <span className="font-semibold"> Legal Compliance:</span> We
                    may disclose your information to comply with applicable
                    laws, legal proceedings, or governmental requests.
                  </li>
                  <li>
                    <span className="font-semibold"> Business Transfers:</span>{" "}
                    In the event of a merger, acquisition, or sale of assets,
                    your information may be transferred as part of that
                    transaction. You will be notified of such changes.
                  </li>
                  <li>
                    <span className="font-semibold"> Your Consent:</span>
                    We may share your personal information with other parties if
                    we have your explicit consent to do so
                  </li>
                </ol>
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                4. Data Retention
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We will retain your personal information only as long as
                necessary for the purposes stated in this Privacy Policy, or as
                required by law. When your information is no longer needed, we
                will securely delete or anonymise it.
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold"> Account Data:</span>
                    Retained as long as your account is active or as needed to
                    provide you with our Services.
                  </li>
                  <li>
                    <span className="font-semibold"> Child’s Information:</span>{" "}
                    Retained only for the duration of your subscription or as
                    required to personalise activities, then securely deleted.
                  </li>
                  <li>
                    <span className="font-semibold"> Legal Obligations:</span>{" "}
                    Some data may be retained longer if necessary to comply with
                    legal obligations or resolve disputes.
                  </li>
                </ol>
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                5. Data Security
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We take the protection of your personal information seriously.
                We implement security measures such as encryption, secure
                servers, and firewalls to protect your data from unauthorised
                access, alteration, or disclosure. However, please be aware that
                no method of transmission over the internet is completely
                secure, and we cannot guarantee absolute security.
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                6. Your Rights and Choices
              </span>
              <div className="flex gap-2 flex-col w-full">
                <span className="text-red text-[16px] font-medium font-fredoka leading-[25px]">
                  6.1. Access and Update Your Information{" "}
                </span>
                <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                  You have the right to access, correct, or update your personal
                  information at any time by logging into your account or
                  contacting us.
                  <br />
                </span>
              </div>
              <div className="flex gap-2 flex-col w-full">
                <span className="text-red text-[16px] font-medium font-fredoka leading-[25px]">
                  6.2. Data Portability
                </span>
                <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                  Upon request, we will provide you with a copy of your personal
                  data in a machine-readable format.
                  <br />
                </span>
              </div>
              <div className="flex gap-2 flex-col w-full">
                <span className="text-red text-[16px] font-medium font-fredoka leading-[25px]">
                  6.3. Deletion of Information{" "}
                </span>
                <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                  You may request that we delete your personal information by
                  contacting us, but please note that certain data may be
                  retained to comply with legal obligations.
                  <br />
                </span>
              </div>
              <div className="flex gap-2 flex-col w-full">
                <span className="text-red text-[16px] font-medium font-fredoka leading-[25px]">
                  6.4. Opt-Out of Marketing Communications{" "}
                </span>
                <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                  You can opt out of receiving marketing emails by following the
                  unsubscribe link in any of our communications or by contacting
                  us directly.
                  <br />
                </span>
              </div>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                7. Children&apos;s Privacy
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Our Services are designed to be used by adults (parents and
                caregivers) for the benefit of their children. We do not
                knowingly collect personal information directly from children
                under the age of 13 without parental consent.
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">
                      {" "}
                      Parental Involvement:{" "}
                    </span>
                    Parents must provide any necessary information regarding
                    their children. We encourage parental involvement in the use
                    of our Platform and recommend that parents supervise their
                    child’s online activities.
                  </li>
                  <li>
                    <span className="font-semibold">
                      {" "}
                      If you believe we have collected personal information from
                      a child under 13 without parental consent, please contact
                      us immediately, and we will take steps to delete such
                      information.
                    </span>{" "}
                  </li>
                </ol>
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                8. International Data Transfers
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Your information may be transferred to and maintained on servers
                located outside your state, province, or country where data
                protection laws may differ from your local jurisdiction. By
                using our Platform, you consent to the transfer of your personal
                information to other countries, including the United States.
                <br />
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                9. Changes to this Privacy Policy
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page, and the &quot;Last Updated&quot;
                date will be updated accordingly. If there are significant
                changes, we may notify you by email or through a prominent
                notice on our Platform. By continuing to use the Platform after
                changes are posted, you agree to the revised Privacy Policy.
                <br />
              </span>
            </div>

            <div className="h-[2px] bg-[black] rounded-full my-4" />
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                10. Contact Us
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                If you have any questions about these terms, your subscription,
                or need assistance, please contact us via our website
                <Link
                  href="/p/contact-us"
                  className="font-semibold uppercase text-red"
                >
                  {" "}
                  contact form.
                </Link>
                <br />
                By subscribing to our service, you acknowledge that you have
                read, understood, and agree to these terms and conditions.
              </span>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
