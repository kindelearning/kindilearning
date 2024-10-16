"use lient";

import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ProfileSection } from "../Sections";
import { getServerSession } from "next-auth"; // Updated for NextAuth v5
import ProfileEdit from "./edit/page";

export default async function ProfilePage() {
  // const userId = "cm2aafavc09k507o7hkvkrntx";

  const session = await getServerSession(authOptions);
  // if (!session) {
  //   return (
  //     <div className="claracontainer h-screen justify-center items-center flex mx-auto p-4">
  //       <p>
  //         Please sign in to view your profile. <br />
  //         <Link
  //           href="/auth/sign-up"
  //           target="_blank"
  //           className="text-red font-fredoka"
  //         >
  //           {" "}
  //           Click here
  //         </Link>
  //       </p>
  //     </div>
  //   );
  // }
  if (!session || !session.user) {
    // Redirect to login if not authenticated
    redirect("/api/auth/signin");
    return null;
  }

  const userId = session.user.id; // Assuming `id` is included in the session token
  console.log("User Id: " + userId);

  return (
    <>
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <ProfileEdit userId={userId} />
        {/* <ProfileSection /> */}
      </section>
    </>
  );
}
