"use client";

import ProfileEdit from "../edit/page";
import { useAuth } from "@/app/lib/useAuth";
import { useRouter } from "next/navigation";
import { getUserDataByEmail } from "@/lib/hygraph";
// import Loading from "../loading";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export default function ProfileUpdate() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      // Fetch user data by email when the user is available
      const fetchData = async () => {
        try {
          const data = await getUserDataByEmail(user.email);
          setHygraphUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [user, loading, router]);
  
  // useEffect(() => {
  //   if (user && user.email) {
  //     getUserDataByEmail(user.email).then((data) => {
  //       setHygraphUser(data);
  //     });
  //   }
  // }, [user, loading, router]);

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );

  return (
    <>
      <section className="w-full pb-32 bg-[#f5f5f5] flex flex-col gap-0 justify-center items-start">
        {user && hygraphUser ? (
          <ProfileEdit userId={hygraphUser.id} />
        ) : (
          <p>User Not found</p>
        )}
      </section>
    </>
  );
}
