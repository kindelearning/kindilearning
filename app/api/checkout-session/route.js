import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   const { cart } = await req.json(); // Get the request body as JSON
//   console.log("Received cart:", cart); // Log incoming cart

//   const lineItems = cart.map((item) => ({
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: item.title,
//         images: [item.image],
//       },
//       unit_amount: item.price * 100, // Price in cents
//     },
//     quantity: item.quantity,
//   }));

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${req.headers.origin}/success`,
//       cancel_url: `${req.headers.origin}/cart`,
//     });

//     console.log("Stripe Session Created:", session); // Log session details
//     return new Response(JSON.stringify({ id: session.id }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Stripe Error:", error); // Log error details
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
// Named export for handling POST requests
export async function POST(req) {
  const { cart } = await req.json(); // Get the request body as JSON
  console.log("Received cart:", cart); // Log incoming cart

  const lineItems = cart.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * 100, // Price in cents
    },
    quantity: item.quantity,
  }));

  // Get the origin or set a default
  const origin = req.headers.origin || "http://localhost:3000"; // Change this if your dev server runs on a different port

  const successUrl = `${origin}/success`;
  const cancelUrl = `${origin}/cart`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    console.log("Stripe Session Created:", session); // Log session details
    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Stripe Error:", error); // Log error details
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}