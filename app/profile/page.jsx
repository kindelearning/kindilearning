import { authOptions } from "../api/auth/[...nextauth]/route";
import { ProfileSection } from "../Sections";
import { getServerSideSession } from "next-auth"; // Updated for NextAuth v5

export default async function ProfilePage() {
  const session = await getServerSideSession(authOptions); // Use getServerSideSession
  if (!session) {
    return (
      <div className="container mx-auto p-4">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }
  return (
    <>
      <p>
        <strong>Name:</strong> {session.user.name}
      </p>
      <p>
        <strong>Email:</strong> {session.user.email}
      </p>
      <p>
        <strong>Username:</strong> {session.user.username}
      </p>
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <ProfileSection />
      </section>
    </>
  );
}
