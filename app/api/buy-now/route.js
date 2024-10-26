import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  const { items } = await req.json();

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.id, // Change to product name or other identifier
      },
      unit_amount: item.price * 100, // Stripe expects the amount in cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/cancel`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
