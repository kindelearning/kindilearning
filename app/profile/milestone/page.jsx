"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfilePlaceholder01 } from "@/public/Images";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getUserDataByEmail } from "@/lib/hygraph";
import { useAuth } from "@/app/lib/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CurrentUser from "./IntComponent/CurrentUser";
import DisplayAllMileStone from "./IntComponent/Milestonepath";

export default function MileStone() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
      console.log("Hygraph User Data", hygraphUser);
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (hygraphUser && hygraphUser.partner) {
      hygraphUser.partner.forEach((partner) => {
        console.log("Partner ID:", partner.id);
        console.log("Partner Name:", partner.name);
      });
    }
  }, [hygraphUser]);

  return (
    <>
      <section className="w-full pb-24 h-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer items-center justify-center p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          {/* <UserImages /> */}
          <div className="flex w-full py-6 flex-col justify-center items-center">
            <Tabs
              defaultValue="CurrentUser"
              className="w-full flex flex-col gap-6 lg:gap-12"
            >
              <TabsList className="bg-[#eaeaf5]">
                {hygraphUser?.partner.slice(0, 2)?.map((partner) => (
                  <TabsTrigger
                    className="data-[state=active]:bg-[#f5f5f500] p-0 data-[state=active]:shadow-none"
                    key={partner.id}
                    value={`Partner-${partner.id}`}
                  >
                    <Image
                      width={84}
                      height={84}
                      src={
                        partner.myAvatar?.profileAvatar?.url ||
                        'https://ap-south-1.graphassets.com/cm1dom2gf0lqw07pi72v8797k/cm3jnqto60fx008o0ctpfoiaq'
                      }
                      alt={`Avatar of ${partner.name}`}
                      className="min-w-16 max-w-16 h-16 cursor-pointer hover:scale-110 ease-in-out duration-200  object-cover overflow-clip rounded-full"
                    />
                  </TabsTrigger>
                ))}
                <TabsTrigger
                  className="data-[state=active]:bg-[#f5f5f500] p-0 data-[state=active]:shadow-none"
                  value="CurrentUser"
                >
                  <CurrentUser />
                </TabsTrigger>
                {hygraphUser?.partner.slice(2, 4)?.map((partner) => (
                  <TabsTrigger
                    className="data-[state=active]:bg-[#f5f5f500] p-0 data-[state=active]:shadow-none"
                    key={partner.id}
                    value={`Partner-${partner.id}`}
                  >
                    <Image
                      width={84}
                      height={84}
                      src={
                        partner.myAvatar?.profileAvatar?.url ||
                        'https://ap-south-1.graphassets.com/cm1dom2gf0lqw07pi72v8797k/cm3jnqto60fx008o0ctpfoiaq'
                      }
                      alt={`Avatar of ${partner.name}`}
                      className="min-w-16 max-w-16 h-16 cursor-pointer hover:scale-110 ease-in-out duration-200 object-cover overflow-clip rounded-full"
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
              {hygraphUser?.partner?.map((partner) => (
                <TabsContent key={partner.id} value={`Partner-${partner.id}`}>
                  {hygraphUser ? (
                    <div className="w-full flex flex-col gap-2 lg:gap-4 justify-between items-center">
                      {/* <div className="w-full text-center text-[#0a1932] text-[40px] font-semibold font-fredoka leading-normal">
                        Milestone For: {partner.name}
                      </div> */}
                      <div className="font-fredoka text-[12px] lg:text-[20px]">
                        Email: {partner.email || "Partner"}
                      </div>
                      {/* <ProfileRoute /> */}
                      <DisplayAllMileStone passThecurrentUserId={partner.id} />
                    </div>
                  ) : null}
                </TabsContent>
              ))}
              <TabsContent value="CurrentUser">
                <>
                  {hygraphUser ? (
                    <div className="flex flex-col justify-center items-center gap-2 lg:gap-4 px-4 lg:px-0 overflow-x-scroll scrollbar-hidden w-full">
                      <div className="w-full text-center text-[#0a1932] text-[40px] font-semibold font-fredoka leading-normal">
                        {hygraphUser.name}
                      </div>
                      {/* <ProfileRoute /> */}
                      <DisplayAllMileStone
                        passThecurrentUserId={hygraphUser.id}
                      />
                    </div>
                  ) : (
                    <div className="flex w-full flex-col justify-center items-center gap-2">
                      <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                        Kindi Learner
                      </h2>
                      <p className="font-fredoka text-[12px] lg:text-[20px]">
                        <Link href="/auth/sign-in" className="text-red">
                          Login&nbsp;
                        </Link>
                        to use more feature
                      </p>
                    </div>
                  )}
                </>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
