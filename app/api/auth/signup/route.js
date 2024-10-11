import { client, CREATE_ACCOUNT } from "@/lib/hygraph";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Create account in Hygraph
    const account = await client.request(CREATE_ACCOUNT, { email, password });
    return new Response(JSON.stringify(account), { status: 201 });
  } catch (error) {
    console.error("Sign-up error:", error);
    return new Response("Failed to create account", { status: 500 });
  }
}
