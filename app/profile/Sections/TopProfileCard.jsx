import { Badge } from "@/components/ui/badge";
import { ProfileDP, VerifiedIcon } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import MyLevel from "./MyLevel"; 

export default function TopProfileCard({ userData, totalactitivuty }) {
  return (
    <>
      <div className="w-full flex bg-[white] rounded-[24px] gap-2 p-2 md:p-4 justify-start items-start lg:gap-[12px] lg:items-center">
        <div className="w-fit min-w-20 lg:w-full lg:max-w-[160px] items-center flex justify-center">
          {userData.profilepic?.url ? (
            <>
              <div className="relative w-20 h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
                  <img
                    src={userData.profilepic.url}
                    // src={`https://lionfish-app-98urn.ondigitalocean.app${userData.profilepic.url}`}
                    alt="Profile Picture"
                    className="w-[72px] h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative w-20 h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
                  <img
                    src="/Images/ProfileDP.svg"
                    // src={`https://lionfish-app-98urn.ondigitalocean.app${userData.profilepic.url}`}
                    alt="Profile Picture"
                    className="w-[72px] h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-full gap-4 flex flex-col justify-center items-center">
          <div className="flex flex-row justify-between items-start w-full">
            {userData ? (
              <div className="flex flex-col w-full justify-start items-start">
                <div className="flex gap-1 items-center w-full justify-start">
                  <h2 className="text-[#029871] text-[20px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold font-fredoka leading-tight">
                    {userData.username || "Kindi Learner"}
                  </h2>
                  {userData.isPremium && (
                    <span className="ml-2 text-[#255825]" title="Verified User">
                      <Image
                        src={VerifiedIcon}
                        alt="VerifiedIcon"
                        className="w-[20px] h-[20px] lg:h-[30px] lg:w-[30px]"
                      />
                    </span>
                  )}
                </div>
                <p className="font-fredoka text-[12px] lg:text-[20px]">
                  Email: {userData.email}
                </p>
              </div>
            ) : (
              <div className="flex w-full flex-col justify-start items-start gap-2">
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
            {/* Trigger for the Edit Profile Popup for Larger screen */}
            <Link
              href="/profile/edit"
              className="hidden lg:flex"
              target="_blank"
            >
              <Badge
                className="text-[10px] md:text-[16px] cursor-pointer"
                variant="outline"
              >
                Edit
              </Badge>
            </Link>
          </div>
          {/* Trigger for the Level Popup and Edit on Mobile, hidden after mobile */}
          <div className="flex flex-col w-full gap-1 items-start justify-start">
            <div className="flex flex-row w-full justify-start items-center gap-2">
              <MyLevel totalActivities={totalactitivuty} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
