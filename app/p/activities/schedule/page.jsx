"use client";

import { KindiCalendar, OurPricing } from "@/app/Sections";
import NewCalendar from "@/app/Sections/Schedule/NewCalendar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/app/lib/useAuth";
import { useRouter } from "next/navigation";
import { getUserDataByEmail } from "@/lib/hygraph";

export default function Schedule() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] pb-24 items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:px-0 md:py-4 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          {user && hygraphUser ? (
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

              {hygraphUser ? (
                <>
                  <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
                    Welcome, {hygraphUser.name}! <br />
                    {hygraphUser.isVerified ? "Yes" : "No"}!
                    <p className="font-semibold">
                      {hygraphUser.isVerified
                        ? "You are Verified"
                        : "You are Not Verified"}
                    </p>
                  </div>
                  {hygraphUser.isVerified ? (
                    <div className="claracontainer md:p-0 p-0 py-4 w-full flex flex-col overflow-hidden gap-8">
                      <div className="flex lg:hidden">
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
                          Curruntly Logged in as: {hygraphUser.email}
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
