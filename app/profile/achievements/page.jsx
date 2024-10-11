import { AcheievemnetData } from "@/app/constant/menu";
import { PopupFooter } from "@/app/Sections";
import AchievementBadge from "@/app/Sections/Profile/AchievementBadge";
import LevelCard from "@/app/Sections/Profile/LevelCard";
import ReferralCard from "@/app/Sections/Profile/ReferralCard";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { ProfileDP } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section className="w-full h-auto pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          {/* Top Profile Card */}
          <div className="w-full flex bg-[white] rounded-[24px] p-2 md:p-4 justify-start gap-[4px] lg:gap-[12px]  items-center">
            <div className="w-fit items-center flex justify-start">
              <Image
                src={ProfileDP}
                alt="User DP"
                className="w-32 h-32 rounded-full"
              />
            </div>
            <div className="w-full gap-4 flex flex-col justify-center">
              <div className="flex flex-row justify-between items-center w-full">
                <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                  John Doe
                </h2>
                {/* Trigger for the Edit Profile Popup */}
                <Link href="/profile/edit">
                  <Badge
                    className="text-[10px] md:text-[16px] cursor-pointer"
                    variant="outline"
                  >
                    Edit
                  </Badge>
                </Link>
              </div>
              <div className="flex flex-col w-full gap-1 items-start justify-start">
                <div className="flex flex-row w-full justify-start items-center gap-2">
                  <div className="text-[#3f3a64] text-[16px] md:text-[20px] lg:text-[24px] xl:text-[20px] font-medium font-montserrat leading-none">
                    Level 1
                  </div>
                  {/* Trigger for the Level Popup */}
                  <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
                    <DialogTrigger asChild>
                      <Badge
                        className="text-[10px] md:text-[16px] cursor-pointer"
                        variant="outline"
                      >
                        Check Now
                      </Badge>
                    </DialogTrigger>
                    <DialogContent className="bg-[#EAEAF5] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[28px] w-full claracontainer">
                      <DialogHeader className="p-4">
                        <div className="flex flex-row justify-center items-center w-full">
                          <DialogTitle>
                            <div className="text-center">
                              <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                My{" "}
                              </span>
                              <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                Level
                              </span>
                            </div>
                          </DialogTitle>
                        </div>
                      </DialogHeader>
                      <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                        <div className="flex flex-col justify-center items-center w-full claracontainer gap-4">
                          <LevelCard level="Level 1" activities="5" />
                          <LevelCard level="Level 2" activities="10" />
                          <LevelCard level="Level 3" activities="15" />
                          <LevelCard level="Level 4" activities="20" />
                          <LevelCard level="Level 5" activities="25" />
                        </div>
                      </DialogDescription>
                      <DialogFooter className="sticky  rounded-t-[16px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bottom-0 m-0 w-full px-4 bg-[#ffffff]">
                        <PopupFooter PrimaryText="Save and Continue" />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="w-full flex flex-row justify-between items-center gap-2">
                  <Slider
                    defaultValue={[33]}
                    max={100}
                    className="h-[8px] text-[#3a3a89]"
                    step={10}
                  />{" "}
                  Activities
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Section */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-2">
              <div className="text-[#0a1932] text-2xl lg:text-4xl font-medium font-fredoka w-full">
                Your achievements
              </div>
              <div className="flex w-full overflow-x-scroll scrollbar-hidden gap-1">
                {AcheievemnetData.map((achievement, index) => (
                  <AchievementBadge
                    key={index}
                    image={achievement.image}
                    title={achievement.title}
                    level={achievement.level}
                    backgroundColor={achievement.backgroundColor}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="text-[#0a1932] text-2xl lg:text-4xl font-medium font-fredoka w-full">
                To Be Completed
              </div>
              <div className="flex w-full overflow-x-scroll scrollbar-hidden gap-1">
                {AcheievemnetData.map((achievement, index) => (
                  <AchievementBadge
                    key={index}
                    image={achievement.image}
                    title={achievement.title}
                    level={achievement.level}
                    backgroundColor={achievement.backgroundColor}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Referral Card */}
          <div className="claracontainer px-0 w-full flex flex-col justify-start items-start overflow-hidden gap-8">
            <ReferralCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
