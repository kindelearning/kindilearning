import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // const lineItems = cart.map((item) => {
    //   if (
    //     !item.title ||
    //     typeof item.title !== "string" ||
    //     !item.price ||
    //     typeof item.price !== "number"
    //   ) {
    //     console.error("Invalid item:", item);
    //     throw new Error("Invalid cart item");
    //   }

    //   return {
    //     price_data: {
    //       currency: "usd",
    //       product_data: {
    //         name: item.title,
    //         images: [item.image],
    //       },
    //       unit_amount: item.price * 100, // Price in cents
    //     },
    //     quantity: item.quantity,
    //   };
    // });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Your Product Name",
            },
            unit_amount: 9900, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/shop/success",
      cancel_url: "http://localhost:3000/shop/cart",
    });

    // Send back the session URL
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create checkout session" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
// export async function POST(req) {
//   try {
//     const { cart } = await req.json();
//     console.log("Received cart:", cart);

//     if (!cart || cart.length === 0) {
//       console.error("Error: Cart is empty or invalid.");
//       return new Response(
//         JSON.stringify({ error: "Cart is empty or invalid." }),
//         {
//           status: 400,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }
// const lineItems = cart.map((item) => {
//   if (
//     !item.title ||
//     typeof item.title !== "string" ||
//     !item.price ||
//     typeof item.price !== "number"
//   ) {
//     console.error("Invalid item:", item);
//     throw new Error("Invalid cart item");
//   }

//   return {
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: item.title,
//         images: [item.image],
//       },
//       unit_amount: item.price * 100, // Price in cents
//     },
//     quantity: item.quantity,
//   };
// });

//     // Log the line items to ensure they are correct
//     console.log("Line items:", lineItems);

//     const origin = req.headers.origin || "http://localhost:3000";
//     const successUrl = `${origin}/shop/success`;
//     const cancelUrl = `${origin}/shop/cart`;

//     console.log("Success URL:", successUrl);
//     console.log("Cancel URL:", cancelUrl);

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       // billing_address_collection: "required",
//       // allow_promotion_codes: true,
//       success_url: successUrl,
//       cancel_url: cancelUrl,
//     });

//     console.log("Stripe Session Created:", session);
//     return new Response(JSON.stringify({ id: session.id }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Stripe Error:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
