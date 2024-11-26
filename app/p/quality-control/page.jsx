import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { getStandardPagesContent } from "@/lib/hygraph";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const standardPages = await getStandardPagesContent();
  // console.log("Standard Pages Content: ", standardPages);
  if (
    !standardPages ||
    !standardPages.qualityControl ||
    !standardPages.qualityControl.html
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
              <span className="text-red claraheading uppercase"> Quality</span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {" "}
                Control
              </span>
            </div>

            <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              At <span className="font-semibold">Kindi</span> ,we blend
              cutting-edge technology with research-backed early childhood
              education practices to deliver a seamless, engaging, and effective
              learning experience for children, carers, and educators. Our
              platform is designed to provide easy access to carefully crafted
              play activities while ensuring a user-friendly experience for both
              parents and professionals. Below, we highlight the key
              technological features that power Kindi’s innovative approach to
              early childhood development.
            </span>
          </div>
          {/* The Divider */}
          <div className="h-[1.5px] bg-[black] rounded-full my-4" />
          <div className="items-center w-full justify-center flex flex-col gap-4">
            {standardPages?.qualityControl?.html ? (
              <div className="w-full text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
                <RichTextRender content={standardPages?.qualityControl?.json} />
              </div>
            ) : (
              <p>No content found</p>
            )}
          </div>
          {/* <div className="items-center w-full justify-center flex flex-col gap-4">
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Platform Architecture{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Kindi is built on a robust, scalable cloud-based infrastructure
                to support our growing community of users globally. Our platform
                leverages the latest advancements in cloud computing, data
                storage, and machine learning to deliver high-quality content
                that evolves with each child’s development.
                <br />
                <span className="text-red text-[16px] pt-3 font-semibold font-fredoka leading-[25px]">
                  Key Features:{" "}
                </span>
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">Cloud Scalability: </span>{" "}
                    Kindi’s infrastructure is hosted on scalable cloud services,
                    allowing for seamless expansion as user demand increases.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Cross-Platform Accessibility:{" "}
                    </span>{" "}
                    Available across web, mobile, and tablet devices, Kindi
                    offers flexibility for carers and educators to access
                    content anytime, anywhere.
                  </li>
                  <li>
                    <span className="font-semibold">Global Reach: </span> With
                    localised content, Kindi is designed to serve a global
                    audience, supporting multiple languages and regions.
                  </li>
                </ol>
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Personalised Learning Experience{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We understand that every child is unique, which is why Kindi
                uses data-driven insights to curate activities for every child’s
                developmental needs. Our algorithms create customised activity
                recommendations based on the child’s age, milestones, and
                progress, ensuring optimal engagement and growth.
                <br />
                <span className="text-red text-[16px] pt-3 font-semibold font-fredoka leading-[25px]">
                  Key Features:{" "}
                </span>
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">Adaptive Learning: </span>{" "}
                    Kindi’s system monitors developmental progress and adapts
                    content to match the evolving abilities and interests of our
                    users.
                  </li>
                  <li>
                    <span className="font-semibold">Milestone Tracking:: </span>{" "}
                    Parents and educators can track developmental milestones
                    using Kindi’s intuitive dashboard.
                  </li>
                  <li>
                    <span className="font-semibold">Custom schedule: </span>{" "}
                    Based on carer input, Kindi offers dynamic content, ensuring
                    children are continuously challenged and supported.
                  </li>
                </ol>
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Secure and Compliant Infrastructure{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We prioritise the safety and privacy of our users, particularly
                when dealing with sensitive child data. Kindi is designed to
                comply with global privacy standards, ensuring that all user
                data is stored and processed securely.
                <br />
                <span className="text-red text-[16px] pt-3 font-semibold font-fredoka leading-[25px]">
                  Key Features:{" "}
                </span>
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">Data Encryption: </span>{" "}
                    Kindi employs state-of-the-art encryption protocols to
                    safeguard user data, both at rest and in transit.
                  </li>
                  <li>
                    <span className="font-semibold">
                      GDPR & COPPA Compliance:
                    </span>{" "}
                    Our platform adheres to stringent data privacy laws,
                    ensuring the safety and confidentiality of children’s data.
                  </li>
                  <li>
                    <span className="font-semibold">User Authentication: </span>{" "}
                    Multi-factor authentication and secure access controls
                    protect user accounts and prevent unauthorised access.
                  </li>
                </ol>
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Seamless Integration with Nurseries{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Kindi supports seamless integration with nursery systems,
                allowing educators to easily incorporate our activities into
                their daily curriculum. The platform offers a collaborative
                environment, promoting the best progress of each child.
                <br />
                <span className="text-red text-[16px] pt-3 font-semibold font-fredoka leading-[25px]">
                  Key Features:{" "}
                </span>
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold"> Teacher Dashboards:</span>{" "}
                    Educators have access to personalised dashboards where they
                    can assign activities and monitor progress.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Child Profile Sharing:{" "}
                    </span>{" "}
                    Secure child profiles allow nurseries and parents to
                    collaborate on developmental goals and achievements,
                    fostering a unified approach to learning.
                  </li>
                </ol>
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Mobile App Features{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Our mobile app offers a user-friendly experience for busy
                parents and carers who need easy access to Kindi’s resources on
                the go. The app includes features that simplify activity
                scheduling, milestone tracking, and real-time notifications.
                <br />
                <span className="text-red text-[16px] pt-3 font-semibold font-fredoka leading-[25px]">
                  Key Features:{" "}
                </span>
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold">
                      Activity Notifications:{" "}
                    </span>{" "}
                    Receive reminders and suggestions for daily activities based
                    on your child’s developmental needs.
                  </li>
                  <li>
                    <span className="font-semibold">Progress Updates:</span>{" "}
                    Track your child’s progress with real-time updates and
                    reports generated by the app.
                  </li>
                  <li>
                    <span className="font-semibold"> Offline Access: </span>{" "}
                    Download activities for offline use, ensuring uninterrupted
                    access to Kindi’s resources, even without an internet
                    connection.
                  </li>
                </ol>
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Data-Driven Insights{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Kindi uses advanced analytics to continuously improve its
                content and platform. We gather anonymised usage data to refine
                activity recommendations, identify trends in early childhood
                development, and enhance user experience.
                <br />
                <span className="text-red text-[16px] pt-3 font-semibold font-fredoka leading-[25px]">
                  Key Features:{" "}
                </span>
                <ol className="list-disc px-4 py-2">
                  <li>
                    <span className="font-semibold"> Analytics: </span> Kindi
                    collects data on activity engagement and user behaviour to
                    deliver actionable insights to carers and educators.
                  </li>
                  <li>
                    <span className="font-semibold">Content Optimisation:</span>{" "}
                    Feedback loops from user interactions allow us to
                    continually optimise and expand our library of activities.
                  </li>
                  <li>
                    <span className="font-semibold">
                      {" "}
                      Performance Metrics:{" "}
                    </span>{" "}
                    Detailed performance metrics provide a comprehensive view of
                    each child’s development, offering personalised insights for
                    carers and educators.
                  </li>
                </ol>
              </span>
            </div>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />

            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Future Tech Innovations{" "}
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                At Kindi, we are committed to staying at the forefront of
                technology and education. Our future development plans include
                incorporating AI-driven content suggestions, and voice-based
                assistance to further enhance the ease of use for carers and
                children alike.
                <br />
                <div className="h-[1.5px] bg-[black] rounded-full my-4" />
                Kindi is dedicated to using the power of technology to create
                meaningful, interactive, and effective early childhood education
                experiences. We are excited to continue innovating and providing
                the tools necessary for every child to thrive.
              </span>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Page;
