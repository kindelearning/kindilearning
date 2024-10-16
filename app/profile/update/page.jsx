"use lient";

import { getServerSession } from "next-auth"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileEdit from "../edit/page";

export default async function ProfileUpdate() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
    return null;
  }

  const userId = session.user.id;
  console.log("User Id: " + userId);

  return (
    <>
      <section className="w-full pb-32 bg-[#f5f5f5] flex flex-col gap-0 justify-center items-start">
        <ProfileEdit userId={userId} />
      </section>
    </>
  );
}
