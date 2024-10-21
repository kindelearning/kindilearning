"use client";

import { KindiCalendar, OurPricing } from "@/app/Sections";
import NewCalendar from "@/app/Sections/Schedule/NewCalendar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Signup from "@/app/auth/sign-up/page";

/**
 * @Main_account
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

export default function Schedule() {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);

  const fetchUserData = async (email) => {
    try {
      const data = await client.request(GET_ACCOUNT_BY_EMAIL, { email });
      console.log("User data", data);
      setProfileData(data.account);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      fetchUserData(session.user.email);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] pb-24 items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4  w-full flex flex-col overflow-hidden gap-8">
          {session ? (
            <>
              <div className="claracontainer w-full flex flex-col overflow-hidden gap-2">
                <div className="w-full text-center">
                  <span className="text-[#3f3a64] claraheading uppercase">
                    THE KINDI{" "}
                  </span>
                  <span className="text-red claraheading uppercase">
                    ACTI VITY SCHEDULE
                  </span>
                </div>
                <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
                  Here&apos;s where you&apos;ll discover your daily educational
                  play activities. Utilize our drag-and-drop feature to
                  rearrange learning, ensuring development seamlessly fits your
                  schedule. Additionally, sync your schedule with your
                  child&apos;s nursery for a smooth and integrated learning
                  experience.
                </div>
              </div>

              {profileData ? (
                <>
                  <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
                    Welcome, {profileData.name}! <br />
                    {profileData.isVerified ? "Yes" : "No"}!
                    <p className="font-semibold">
                      {profileData.isVerified
                        ? "You are Verified"
                        : "You are Not Verified"}
                    </p>
                  </div>
                  {profileData.isVerified ? (
                    <div className="claracontainer md:p-0 p-0 py-4 w-full flex flex-col overflow-hidden gap-8">
                      <div className="flex lg:hidden">
                        {/* <KindiCalendar /> */}
                        <NewCalendar />
                      </div>
                      <div className="lg:flex hidden">
                        <KindiCalendar />
                      </div>
                    </div>
                  ) : (
                    <div className="claracontainer md:p-0 p-0 py-4 w-full flex flex-col overflow-hidden gap-8">
                      <Link
                        href="/#pricing_Section"
                        className="claracontainer gap-2 flex-col h-[50vh] flex justify-center items-center"
                        title="User Not Subscribed"
                      >
                        <span className="clarabodyTwo text-purple">
                          Please upgrade to access the Activity Scheduler
                        </span>
                        <Button className="clarabutton bg-red hover:bg-hoverRed">
                          Click here to Upgrade
                        </Button>
                        <p className="font-fredoka w-full justify-center flex items-center">
                          Curruntly Logged in as: {profileData.email}
                        </p>
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
                  Please verify your email to access your schedule.
                </div>
              )}
            </>
          ) : (
            <>
              <section className="w-full">
                <div className="claracontainer h-[500px] flex flex-col gap-6 justify-center items-center">
                  <div className="flex-col gap-4 text-center">
                    <span className="text-[#3f3a64] claraheading uppercase">
                      Access Denied
                    </span>{" "}
                    <br />
                    <span className="text-red claraheading uppercase">
                      Please Login to Access Schedular
                    </span>
                  </div>
                  <div className="flex w-full justify-center items-center gap-4 flex-col lg:flex-row text-white text-center">
                    <Link
                      target="_blank"
                      href="/auth/sign-in"
                      className="clarabutton w-full lg:max-w-[240px] py-2 bg-purple hover:bg-hoverPurple"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      className="clarabutton py-2 w-full lg:max-w-[240px] bg-red hover:bg-hoverRed"
                      target="_blank"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
}
