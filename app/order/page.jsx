const HYGRAPH_MAIN_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_MAIN_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

export default async function OrdersPage() {
  // Fetch the orders from Hygraph
  const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
          query GetOrders {
            orders {
              id
              sessionId
              customerEmail
              amountTotal
              paymentStatus
              createdDate
            }
          }
        `,
    }),
  });

  const data = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      <table className="mt-4 min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Session ID</th>
            <th className="border p-2">Customer Email</th>
            <th className="border p-2">Amount Total</th>
            <th className="border p-2">Payment Status</th>
            <th className="border p-2">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {data.data.orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.sessionId}</td>
              <td className="border p-2">{order.customerEmail}</td>
              <td className="border p-2">{order.amountTotal / 100} USD</td>{" "}
              {/* Assuming amount is in cents */}
              <td className="border p-2">{order.paymentStatus}</td>
              <td className="border p-2">
                {new Date(order.createdDate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
