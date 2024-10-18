// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
//     const lineItems = cart.map((item) => {
//       if (
//         !item.title ||
//         typeof item.title !== "string" ||
//         !item.price ||
//         typeof item.price !== "number"
//       ) {
//         console.error("Invalid item:", item);
//         throw new Error("Invalid cart item");
//       }

//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.title,
//             images: [item.image],
//           },
//           unit_amount: item.price * 100, // Price in cents
//         },
//         quantity: item.quantity,
//       };
//     });

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
//       billing_address_collection: "required",
//       allow_promotion_codes: true,
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

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { cart } = await req.json();
    console.log("Received cart:", cart);

    // Validate the cart
    if (!Array.isArray(cart) || cart.length === 0) {
      console.error("Error: Cart is empty or invalid.");
      return new Response(
        JSON.stringify({ error: "Cart is empty or invalid." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Prepare line items for the checkout session
    const lineItems = cart.map((item) => {
      if (
        !item.title ||
        typeof item.title !== "string" ||
        !item.price ||
        typeof item.price !== "number" ||
        !item.quantity ||
        typeof item.quantity !== "number"
      ) {
        console.error("Invalid item:", item);
        throw new Error("Invalid cart item");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: item.price * 100, // Price in cents
        },
        quantity: item.quantity,
      };
    });

    // Log the line items to ensure they are correct
    console.log("Line items:", lineItems);

    // Set URLs for success and cancellation
    const origin = req.headers.get("origin") || "http://localhost:3000"; // Updated to use 'get'
    const successUrl = `${origin}/shop/success`;
    const cancelUrl = `${origin}/shop/cart`;

    console.log("Success URL:", successUrl);
    console.log("Cancel URL:", cancelUrl);

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    console.log("Stripe Session Created:", session);

    // Respond with the session ID
    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
