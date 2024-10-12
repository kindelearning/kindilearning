import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default async function Dashboard() {
  // const session = await getServerSession(authOptions);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin'); // Redirect if not authenticated
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }



  // if (!session) {
  //   return <p>You need to sign in to view this page</p>;
  // }

  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>{" "}
      Welcome to the dashboard, {session.user.email}!
    </div>
  );
}
