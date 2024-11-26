"use client";
import { Accordian } from "@/app/Widgets";
import { Button } from "@/components/ui/button";
import { GraphQLClient, gql } from "graphql-request";
import {
  ActivityBlack,
  CompletedMark,
  KidBlack,
  Print,
  SpeechLanguageActivity,
  ReadingWritingActivity,
  ConfidenceIndependenceActivity,
  CreativityImaginationActivity,
  DiscoveringOurWorldActivity,
  EmotionalSocialStrengthActivity,
  ExperimentsMathActivity,
  PhysicalAgilityActivity,
  Themes,
  TimerBlack,
} from "@/public/Images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import NotFound from "@/app/not-found";
import { ProductImages } from "@/app/shop";
import { getActivityById, getUserDataByEmail } from "@/lib/hygraph";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/useAuth";
import { activityIcons } from "@/app/constant/activity";
import ActivityResources from "../ActivityResources";

/**
 * @Main_account_Credentials
 */
const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});

const GET_ACCOUNT_BY_EMAIL = gql`
  query GetAccountByEmail($email: String!) {
    account(where: { email: $email }) {
      id
      name
      username
      email
      profilePicture {
        url
      }
      isVerified
    }
  }
`;

const ActivityCompleteButton = ({ activityId, userId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleActivityCompletion = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/mark-activity-completed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, activityId }),
      });

      console.log("esponse: ", response);
      if (response.ok) {
        setSuccess(true);
      } else {
        console.error("Failed to mark activity as complete");
      }
    } catch (error) {
      console.error("Error completing activity:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      className={`rounded-2xl text-[10px] lg:text-[12px] w-full flex flex-row gap-1 font-fredoka text-white shadow border-2 border-white ${
        loading
          ? "opacity-50 cursor-not-allowed bg-red"
          : success
          ? "bg-purple hover:bg-purple"
          : "bg-red hover:bg-red-600"
      }`}
      onClick={handleActivityCompletion}
      disabled={loading || success}
    >
      <Image alt="Kindi" className="flex lg:hidden" src={CompletedMark} />

      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
            />
          </svg>
          Loading...
        </span>
      ) : success ? (
        "Activity Completed"
      ) : (
        "Mark as Completed"
      )}
    </Button>
  );
};

const ActivityAttribute = ({
  title = " Event Timeline",
  features = " 18th September 2023",
  image,
}) => {
  return (
    <div className="w-full cursor-pointer justify-between items-center inline-flex">
      <div className="justify-start w-full items-center gap-2 flex">
        <Image
          alt="Kindi"
          src={image || Themes}
          className="text-[#0a1932] w-4 h-4"
        />
        <div className=" text-[#0a1932] w-full text-[16px] font-normal font-fredoka leading-none">
          {title}
        </div>
      </div>
      <div className="text-[#0a1932] text-[16px] w-full justify-start items-center font-semibold font-fredoka leading-none">
        {features}
      </div>
    </div>
  );
};

export const IconBadge = ({ icon, backgroundColor = "f05c5c" }) => {
  return (
    <div
      className={`w-[50px] hover:scale-105 duration-200 ease-ease-out cursor-pointer h-[50px] flex justify-center items-center bg-[#${backgroundColor}] rounded-[16px]`}
    >
      <Image alt="Kindi" src={icon || KindiHeart} />
    </div>
  );
};

const handlePrint = () => {
  window.print();
};

const DynamicMarkActivityCompleteComponent = ({ activityId }) => {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  const handleClose = () => {
    setTimeout(() => {
      setIsOpen(false); // Close the dialog after a delay
    }, 1000); // Close the dialog
  };

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);
  const fetchUserData = async (email) => {
    try {
      const data = await client.request(GET_ACCOUNT_BY_EMAIL, { email });
      setProfileData(data.account);
      console.log("Fetched profile data:", data.account);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      console.log("Session email:", session.user.email);
      fetchUserData(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (hygraphUser && hygraphUser.partner) {
      hygraphUser.partner.forEach((partner) => {
        const partnerAvatarUrl = partner.profileAvatar
          ? partner.profileAvatar.url
          : null;

        // Check if the partner has an avatar in myAvatar field
        const avatarUrl =
          partner.myAvatar?.profileAvatar?.url || partnerAvatarUrl;

        if (avatarUrl) {
          console.log("Partner Avatar URL:", avatarUrl);
        } else {
          console.log("No avatar for this partner.");
        }
        console.log("Partner ID:", partner.id);
        console.log("Partner Name:", partner.email);
      });
    }
  }, [hygraphUser]);

  if (status === "loading") return null;

  return (
    <>
      {user && hygraphUser ? (
        <>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="w-full">
              <Button
                onClick={() => setIsOpen(true)}
                className="bg-red w-full hover:bg-hoverRed clarabutton"
              >
                Mark as Completed
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="w-full grid grid-cols-2 lg:grid-cols-3 justify-between gap-1 lg:gap-2">
                  {hygraphUser?.partner.slice(0, 2)?.map((partner) => (
                    <div
                      onClick={handleClose}
                      key={partner.id}
                      value={`Partner-${partner.id}`}
                    >
                      {hygraphUser ? (
                        <div className="w-full flex justify-between items-center">
                          <div className="flex flex-col p-2 bg-[#eaeaf5] hover:shadow-lg hover:scale-105 duration-500 cursor-pointer shadow rounded-xl justify-center gap-2 items-center w-full">
                            <Image
                              width={36}
                              height={36}
                              src={
                                partner.myAvatar?.profileAvatar?.url ||
                                ProfilePlaceholder01
                              }
                              alt={`Avatar of ${partner.name}`}
                              className="min-w-9 max-w-9 h-9 cursor-pointer hover:scale-110 ease-in-out duration-200 object-cover overflow-clip rounded-full"
                            />
                            <div className="font-fredoka text-[12px] lg:text-[16px]">
                              {partner?.email?.split("@")[0]}
                            </div>
                            <ActivityCompleteButton
                              activityId={activityId}
                              userId={partner.id}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}

                  <div
                    onClick={handleClose}
                    className="flex flex-col p-2 bg-[#eaeaf5] hover:shadow-lg hover:scale-105 duration-500 cursor-pointer shadow rounded-xl justify-center gap-2 items-center w-full"
                  >
                    <Image
                      width={36}
                      height={36}
                      src={
                        hygraphUser.myAvatar.profileAvatar.url ||
                        ProfilePlaceholder01
                      }
                      className="min-w-9 max-w-9 h-9 cursor-pointer hover:scale-110 ease-in-out duration-200 object-cover overflow-clip rounded-full"
                    />
                    <div className="font-fredoka text-[12px] lg:text-[16px]">
                      {hygraphUser?.email?.split("@")[0]}
                    </div>
                    <ActivityCompleteButton
                      activityId={activityId}
                      userId={hygraphUser.id}
                    />
                  </div>
                  {hygraphUser?.partner.slice(2, 4)?.map((partner) => (
                    <div
                      onClick={handleClose}
                      key={partner.id}
                      value={`Partner-${partner.id}`}
                    >
                      {hygraphUser ? (
                        <div className="w-full flex justify-between items-center">
                          <div className="flex flex-col p-2 bg-[#eaeaf5] hover:shadow-lg hover:scale-105 duration-500 cursor-pointer shadow rounded-xl justify-center gap-2 items-center w-full">
                            <Image
                              width={36}
                              height={36}
                              src={
                                partner.myAvatar?.profileAvatar?.url ||
                                ProfilePlaceholder01
                              }
                              alt={`Avatar of ${partner.name}`}
                              className="min-w-9 max-w-9 h-9 cursor-pointer hover:scale-110 ease-in-out duration-200 object-cover overflow-clip rounded-full"
                            />
                            <div className="font-fredoka text-[12px] lg:text-[16px]">
                              {partner?.email?.split("@")[0]}
                            </div>
                            <ActivityCompleteButton
                              activityId={activityId}
                              userId={partner.id}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Link
          href="/auth/sign-up"
          className="clarabutton bg-red flex gap-[4px] py-2 text-center text-white text-xs font-semibold font-fredoka rounded-2xl shadow border-2 border-white flex-row justify-center items-center w-full"
          target="_blank"
        >
          Login <p className="hidden lg:flex">to complete this activity</p>
        </Link>
      )}
    </>
  );
};

export default async function ActivityDetailPage({ params }) {
  const { id } = params;
  const activity = await getActivityById(id);

  if (!activity) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-0 px-0 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-0 lg:p-8 xl:p-12 w-full flex flex-col md:flex-row overflow-hidden gap-8">
          <div className="w-full hidden  text-[#3f3a64] claraheading capitalize">
            {activity.title}
          </div>
          {/* Col 1(R1) */}
          <div className="claracontainer lg:min-w-[60%] lg:w-full bg-[#ffffff] md:bg-[#ffffff] pb-4 lg:bg-[#eaeaf5] py-0 flex flex-col justify-start items-start gap-4">
            {/* Row 1(C1) */}
            <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
              <ProductImages
                images={activity.activityImages.map((img) => img.url)}
              />
            </div>
            {/* Row 1(R2) */}
            <div className="claracontainer lg:hidden w-full flex flex-col px-4 lg:px-0 justify-start items-start gap-4">
              <div className="flex w-full flex-col justify-normal items-center gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  {activity.title}
                </div>
                <div className="items-center cursor-pointer w-full justify-center flex flex-col gap-2">
                  <ActivityAttribute
                    image={ActivityBlack}
                    features={activity.eventTimeline}
                  />
                  <ActivityAttribute
                    image={TimerBlack}
                    features={activity.setUpTime}
                    title="Set up Time"
                  />
                  <ActivityAttribute
                    image={Themes}
                    className="text-[black]"
                    features={activity.themeName}
                    title="Theme"
                  />
                  <ActivityAttribute
                    image={KidBlack}
                    features={activity.focusAge}
                    title="Focus age"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Learning Areas
                </div>

                <div className="items-center h-fit hover:h-full overflow-y-hidden overflow-x-scroll scrollbar-hidden w-full justify-start flex flex-row gap-1">
                  {activityIcons.map(
                    (item) =>
                      activity[item.key] && (
                        <IconBadge key={item.key} icon={item.icon} />
                      )
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Skills{" "}
                </div>
                <ul className="text-[#0a1932] px-4 text-[16px] font-normal font-fredoka list-disc leading-none">
                  {activity.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Row - 2(C1) */}
            {/* {JSON.stringify(activity.bodyOne.markdown, null, 2)} */}
            <div className="items-center px-4 hidden lg:px-0 w-full lg:min-w-[600px] justify-center lg:flex flex-col gap-2">
              <div className="px-4 mb-6 md:hidden flex w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Check Activity Resources
                </div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      disabled={
                        !activity.resources || activity.resources.length === 0
                      }
                      className={`w-full clarabuttton flex md:hidden ${
                        activity.resources && activity.resources.length > 0
                          ? "bg-[#3f3a64] text-white"
                          : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      } text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white`}
                    >
                      Resources
                    </Button>
                  </DialogTrigger>
                  {activity.resources && activity.resources.length > 0 && (
                    <DialogContent className="w-full max-w-[96%] p-0 lg:max-w-[800px] max-h-[500px] overflow-y-scroll rounded-lg">
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                          <ActivityResources resources={activity.resources} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
              <Accordian
                title={activity.accordionOne}
                description={activity?.bodyOne?.json}
              />
              <Accordian
                title={activity.accordionTwo}
                description={activity?.bodyTwo?.json}
              />
              <Accordian
                title={activity.accordionThree}
                description={activity?.bodyThree?.json}
              />
              <Accordian
                title={activity.accordionFour}
                description={activity?.bodyFour?.json}
              />
              <Accordian
                title={activity.accordionFive}
                description={activity?.bodyFive?.json}
              />
            </div>
          </div>

          {/* Col Two */}
          <div className="claracontainer p-0 pb-24 flex flex-col justify-start items-start gap-8">
            {/* Row 1(R2) */}
            <div className="claracontainer hidden lg:flex w-full flex-col px-4 lg:px-0 justify-start items-start gap-4">
              <div className="flex w-full flex-col justify-normal items-center gap-2">
                <div className="text-[#0a1932] text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  {activity.title}
                </div>
                <div className="items-center w-full justify-center flex flex-col gap-2">
                  <ActivityAttribute
                    image={ActivityBlack}
                    features={activity.eventTimeline}
                  />
                  <ActivityAttribute
                    image={TimerBlack}
                    features={activity.setUpTime}
                    title="Set up Time"
                  />
                  <ActivityAttribute
                    image={Themes}
                    className="text-[black]"
                    features={activity.themeName}
                    title="Theme"
                  />
                  <ActivityAttribute
                    image={KidBlack}
                    features={activity.focusAge}
                    title="Focus age"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Learning Areas
                </div>

                <div className="items-center overflow-x-scroll scrollbar-hidden w-full justify-start flex flex-row gap-1">
                  {activityIcons.map(
                    (item) =>
                      activity[item.key] && (
                        <IconBadge key={item.key} icon={item.icon} />
                      )
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Skills{" "}
                </div>
                <ul className="text-[#0a1932] px-4 text-[16px] font-normal font-fredoka list-disc leading-none">
                  {activity.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="items-center px-4 lg:hidden lg:px-0 w-full lg:min-w-[600px] justify-center flex flex-col gap-2">
              <div className="px-4 mb-6 md:hidden flex w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Check Activity Resources
                </div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      disabled={
                        !activity.resources || activity.resources.length === 0
                      }
                      className={`w-full clarabuttton flex md:hidden ${
                        activity.resources && activity.resources.length > 0
                          ? "bg-[#3f3a64] text-white"
                          : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      } text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white`}
                    >
                      Resources
                    </Button>
                  </DialogTrigger>
                  {activity.resources && activity.resources.length > 0 && (
                    <DialogContent className="w-full max-w-[96%] p-0 lg:max-w-[800px] max-h-[500px] overflow-y-scroll rounded-lg">
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                          <ActivityResources resources={activity.resources} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
              <Accordian
                title={activity.accordionOne}
                description={activity?.bodyOne?.json}
              />
              <Accordian
                title={activity.accordionTwo}
                description={activity?.bodyTwo?.json}
              />
              <Accordian
                title={activity.accordionThree}
                description={activity?.bodyThree?.json}
              />
              <Accordian
                title={activity.accordionFour}
                description={activity?.bodyFour?.json}
              />
              <Accordian
                title={activity.accordionFive}
                description={activity?.bodyFive?.json}
              />
            </div>

            {/* Row 2(R2) */}
            <div className="flex w-full flex-col py-6 md:py-0 justify-start items-start gap-2">
              <div className="w-full md:flex hidden justify-between items-center p-6 bg-white rounded-xl shadow">
                <ChevronLeft />
                <div className="text-center text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Activity date <br />
                  {new Date(activity.activityDate).toLocaleDateString("en-GB")}
                </div>
                <ChevronRight />
              </div>
              <div className="px-4 md:flex hidden w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Check Activity Resources
                </div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      disabled={
                        !activity.resources || activity.resources.length === 0
                      }
                      className={`w-full clarabuttton md:flex hidden ${
                        activity.resources && activity.resources.length > 0
                          ? "bg-[#3f3a64] text-white"
                          : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      } text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white`}
                    >
                      Resources
                    </Button>
                  </DialogTrigger>
                  {activity.resources && activity.resources.length > 0 && (
                    <DialogContent className="w-full p-0 max-w-[96%] lg:max-w-[800px] max-h-[500px] overflow-y-scroll rounded-lg">
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                          <ActivityResources resources={activity.resources} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  )}
                </Dialog>
              </div>

              <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Print Activity{" "}
                </div>
                <Button
                  onClick={handlePrint}
                  className="w-full bg-[#3f3a64] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white"
                >
                  {" "}
                  Print{" "}
                </Button>
              </div>
              <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Mark Activity as Complete{" "}
                </div>
                <DynamicMarkActivityCompleteComponent activityId={id} />
              </div>
            </div>
          </div>

          {/* Mobile Specific Row */}
          <div className="flex md:hidden z-50 shadow-upper pt-2 pb-4 px-2 mb-[72px] rounded-t-[8px] justify-between items-center gap-1 bg-[white] shadow-sm fixed bottom-0 left-0 w-full">
            <Button
              onClick={handlePrint}
              className="flex bg-[#3f3a64] gap-[4px] py-2 text-center text-white text-xs font-semibold font-fredoka rounded-2xl shadow border-2 border-white flex-row justify-center items-center w-full"
            >
              <Image alt="Kindi" src={Print} />
              Print
            </Button>
            <DynamicMarkActivityCompleteComponent activityId={id} />
          </div>
        </div>{" "}
      </section>
    </>
  );
}
