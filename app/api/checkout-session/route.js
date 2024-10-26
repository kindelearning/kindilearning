import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @Code_working_But_static_Data
 * @param {*} req
 * @returns
 */
// export async function POST(req) {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       billing_address_collection: "required", // Capture billing address
//       allow_promotion_codes: true,
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Test Product Shop ",
//             },
//             unit_amount: 99 * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:3000/shop/success",
//       cancel_url: "http://localhost:3000/shop/cart",
//     });

//     // Send back the session URL
//     return new Response(JSON.stringify({ url: session.url }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to create checkout session" }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }

export async function POST(req) {
  try {
    const { cart } = await req.json();

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      billing_address_collection: "required", // Capture billing address
      allow_promotion_codes: true,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/shop/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/shop/cart`,
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
