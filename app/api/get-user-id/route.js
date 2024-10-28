import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  // Fetch the session using NextAuth to get user information
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // Assuming `session.user.id` contains the `userId` from your authentication system
  const userId = session.user.id;

  if (userId) {
    return NextResponse.json({ userId }, { status: 200 });
  } else {
    return NextResponse.json({ message: "User ID not found" }, { status: 404 });
  }
}
