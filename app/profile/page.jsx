"use lient";

import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ProfileSection } from "../Sections";
import { getServerSession } from "next-auth"; // Updated for NextAuth v5
import ProfileEdit from "./edit/page";

export default async function ProfilePage() {
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user) {
  //   // Redirect to login if not authenticated
  //   redirect("/api/auth/signin");
  //   return null;
  // }

  // const userId = session.user.id; // Assuming `id` is included in the session token
  // console.log("User Id: " + userId);

  return (
    <>
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <ProfileSection />
        {/* <ProfileEdit userId={userId} /> */}
      </section>
    </>
  );
}
