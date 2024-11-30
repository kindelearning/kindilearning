"use client";

import { useAuth } from "@/app/lib/useAuth";
import { getUserDataByEmail } from "@/lib/hygraph";
import { ProfilePlaceholder01 } from "@/public/Images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CurrentUser() {
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

  return (
    <>
      {user && hygraphUser ? (
        <div className="relative -mx-[26px] z-20 min-w-20 lg:min-w-36 w-20 h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
            <Image
              src={
                hygraphUser.myAvatar.profileAvatar.url || 'https://ap-south-1.graphassets.com/cm1dom2gf0lqw07pi72v8797k/cm3jnqto60fx008o0ctpfoiaq'
              }
              alt="User DP"
              width={100}
              height={100}
              className="w-[72px] cursor-pointer hover:scale-110 ease-in-out duration-200 h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
          <Image
            src={ProfilePlaceholder01}
            alt="Random Profile Placeholder"
            className="cursor-pointer w-16 h-16"
          />
        </div>
      )}
    </>
  );
}
