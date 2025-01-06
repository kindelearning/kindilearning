"use client";

import { notFound, useRouter } from "next/navigation";

import { Accordian } from "@/app/Widgets";
import { Button } from "@/components/ui/button";
import { GraphQLClient, gql } from "graphql-request";
import {
  ActivityBlack,
  CompletedMark,
  KidBlack,
  Print,
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
import { useAuth } from "@/app/lib/useAuth";
import { activityIcons } from "@/app/constant/activity";
import ActivityResources from "../ActivityResources";
import ProductMedia from "@/app/shop/sections/ProductMedia";
import MarkActivityCompleteForm from "../ActivityCompleteButton";
import { fetchKidDetails } from "@/app/profile/api";

async function fetchActivityByDocumentId(documentId) {
  const res = await fetch(
    `https://proper-fun-404805c7d9.strapiapp.com/api/activities/${documentId}?populate=*`
  );
  const data = await res.json();
  if (!data || !data.data) {
    return null; // If data is not found
  }

  return data.data;
}

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

const IconBadge = ({ icon, backgroundColor = "f05c5c" }) => {
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

export default async function ActivityDetailPage({ params }) {
  console.log('I am the params', params);
  const { id } = params;
  const activityData = await fetchActivityByDocumentId(id);
  // const kidData = await fetchKidDetails();
  console.log("activity Data fetched", activityData);

  if (!activityData) {
    console.log("not found activity");
  }

  const {
    
    Title,
    Skills,
    Theme,
    FocusAge,
    ActivityDate,
    SetUpTime,
    Gallery,
    Accordions,
  } = activityData;
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-0 px-0 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-0 lg:p-8 xl:p-12 w-full flex flex-col md:flex-row overflow-hidden gap-8">
          <div className="w-full hidden  text-[#3f3a64] claraheading capitalize">
            {Title}
          </div>
          {/* Col 1(R1) */}
          <div className="claracontainer lg:min-w-[60%] lg:w-full bg-[#ffffff] md:bg-[#ffffff] pb-4 lg:bg-[#eaeaf5] py-0 flex flex-col justify-start items-start gap-4">
            {/* Row 1(C1) */}
            <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
              <ProductMedia gallery={Gallery} />

            </div>
            {/* Row 1(R2) */}
            <div className="claracontainer lg:hidden w-full flex flex-col px-4 lg:px-0 justify-start items-start gap-4">
              <div className="flex w-full flex-col justify-normal items-center gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  {Title}
                </div>
                <div className="items-center cursor-pointer w-full justify-center flex flex-col gap-2">
                  <ActivityAttribute
                    image={ActivityBlack}
                    features={new Date(ActivityDate).toDateString()}
                  />
                  <ActivityAttribute
                    image={TimerBlack}
                    features={SetUpTime}
                    title="Set up Time"
                  />
                  <ActivityAttribute
                    image={Themes}
                    className="text-[black]"
                    features={Theme}
                    title="Theme"
                  />
                  <ActivityAttribute
                    image={KidBlack}
                    features={FocusAge}
                    title="Focus age"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Learning Areas
                </div>

                <div className="items-center h-fit hover:h-full overflow-y-hidden overflow-x-scroll scrollbar-hidden w-full justify-start flex flex-row gap-1">
                  {/* {activityIcons.map(
                    (item) =>
                      activity[item.key] && (
                        <IconBadge key={item.key} icon={item.icon} />
                      )
                  )} */}
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Skills{" "}
                </div>
                <ul className="text-[#0a1932] px-4 text-[16px] font-normal font-fredoka list-disc leading-none">
                  {Skills.map((skill, index) => (
                    <li key={index}>{skill.children[0]?.text}</li>
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
                {/* <Dialog>
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
                </Dialog> */}
              </div>
              {Accordions.map((accordion, index) => (
                <Accordian
                  key={index}
                  title={accordion.Question}
                  description={accordion.Answer}
                />
              ))}
            </div>
          </div>

          {/* Col Two */}
          <div className="claracontainer p-0 pb-24 flex flex-col justify-start items-start gap-8">
            {/* Row 1(R2) */}
            <div className="claracontainer hidden lg:flex w-full flex-col px-4 lg:px-0 justify-start items-start gap-4">
              <div className="flex w-full flex-col justify-normal items-center gap-2">
                <div className="text-[#0a1932] text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  {Title}
                </div>
                <div className="items-center w-full justify-center flex flex-col gap-2">
                  <ActivityAttribute
                    image={ActivityBlack}
                    features={new Date(ActivityDate).toDateString()}
                  />
                  <ActivityAttribute
                    image={TimerBlack}
                    features={SetUpTime}
                    title="Set up Time"
                  />
                  <ActivityAttribute
                    image={Themes}
                    className="text-[black]"
                    features={Theme}
                    title="Theme"
                  />
                  <ActivityAttribute
                    image={KidBlack}
                    features={FocusAge}
                    title="Focus age"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Learning Areas
                </div>

                <div className="items-center overflow-x-scroll scrollbar-hidden w-full justify-start flex flex-row gap-1">
                  {/* {activityIcons.map(
                    (item) =>
                      activity[item.key] && (
                        <IconBadge key={item.key} icon={item.icon} />
                      )
                  )} */}
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Skills{" "}
                </div>
                <ul className="text-[#0a1932] px-4 text-[16px] font-normal font-fredoka list-disc leading-none">
                  {/* {activity.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))} */}
                  {Skills.map((skill, index) => (
                    <li key={index}>{skill.children[0]?.text}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="items-center px-4 lg:hidden lg:px-0 w-full lg:min-w-[600px] justify-center flex flex-col gap-2">
              <div className="px-4 mb-6 md:hidden flex w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Check Activity Resources
                </div>
                {/* <Dialog>
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
                </Dialog> */}
              </div>
              {Accordions.map((accordion, index) => (
                <Accordian
                  key={index}
                  title={accordion.Question}
                  description={accordion.Answer}
                />
              ))}
            </div>

            {/* Row 2(R2) */}
            <div className="flex w-full flex-col py-6 md:py-0 justify-start items-start gap-2">
              <div className="w-full md:flex hidden justify-between items-center p-6 bg-white rounded-xl shadow">
                <ChevronLeft />
                <div className="text-center text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Activity date <br />
                  {/* {new Date(activity.activityDate).toLocaleDateString("en-GB")} */}
                  {new Date(ActivityDate).toLocaleDateString("en-GB")}
                </div>
                <ChevronRight />
              </div>
              <div className="px-4 md:flex hidden w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Check Activity Resources
                </div>
                {/* <Dialog>
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
                </Dialog> */}
              </div>

              <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Print Activity{" "}
                </div>
                <Button
                  onClick={handlePrint}
                  className="w-full bg-[#3f3a64] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white"
                >
                  Print
                </Button>
              </div>
              <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Mark Activity as Complete{" "}
                </div>

                {/* THE PROBLEM The activity id we are fetching from the server att his point actually does not exist  */}
                <MarkActivityCompleteForm  passactivityId={activityData.id}  />

                {/* <DynamicMarkActivityCompleteComponent activityId={id} /> */}
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
            {/* <DynamicMarkActivityCompleteComponent activityId={id} /> */}
          </div>
        </div>{" "}
      </section>
    </>
  );
}
