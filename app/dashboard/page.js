import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You need to sign in to view this page</p>;
  }

  return <div>Welcome to the dashboard, {session.user.email}!</div>;
}
