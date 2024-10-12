"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default async function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>{" "}
      Welcome to the dashboard, {session.user.email}!
    </div>
  );
}
