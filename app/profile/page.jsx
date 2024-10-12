import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ProfileSection } from "../Sections";
import { getServerSession } from "next-auth"; // Updated for NextAuth v5

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="claracontainer h-screen justify-center items-center flex mx-auto p-4">
        <p>
          Please sign in to view your profile. <br />
          <Link
            href="/auth/sign-up"
            target="_blank"
            className="text-red font-fredoka"
          >
            {" "}
            CLick here
          </Link>
        </p>
      </div>
    );
  }
  return (
    <>
      {/* <p>
        <strong>Name:</strong> {session.user.name}
      </p>
      <p>
        <strong>Email:</strong> {session.user.email}
      </p>
      <p>
        <strong>Username:</strong> {session.user.username}
      </p> */}
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <ProfileSection />
      </section>
    </>
  );
}
