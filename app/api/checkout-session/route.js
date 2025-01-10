// app/api/create-checkout-session/route.js
import { ProductImage, User } from "@/public/Images";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function POST(req) {
//   try {
//     // Parsing the request body
//     const { cartItems } = await req.json();

//     if (!cartItems || cartItems.length === 0) {
//       throw new Error('Cart is empty');
//     }

//     // Create an array of line items for Stripe
//     const lineItems = cartItems.map((item) => ({
//       price_data: {
//         currency: 'usd', // You can change the currency if needed
//         product_data: {
//           name: item.title,
//           description: item.description,
//           images: [item.image], // Optional: You can add images
//         },
//         unit_amount: item.price, // price in cents
//       },
//       quantity: item.quantity,
//     }));

//     // Create Stripe Checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
//     });

//     return new Response(JSON.stringify({ id: session.id }), { status: 200 });
//   } catch (error) {
//     console.error('Error creating Stripe session:', error); // Log error details
//     return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500 });
//   }
// }

export async function POST(req) {
  try {
    const { cartItems } = await req.json();

    // Check if cartItems is empty
    if (!cartItems || cartItems.length === 0) {
      return new Response(
        JSON.stringify({
          error:
            "Your cart is empty. Please add items to your cart before checking out.",
        }),
        { status: 400 }
      );
    }

    // Process cart items to ensure correct data format
    const lineItems = cartItems.map((item) => {
      // Check if item.title is available
      if (!item.title) {
        throw new Error("Missing product title for cart item");
      }

      return {
        price_data: {
          currency: "usd", // You can change the currency if needed
          product_data: {
            name: item.title, // Ensure item.title is defined
            description: item.description,
            images: [process.env.NEXT_PUBLIC_URL + item.image], // Ensure this is correct
          },
          unit_amount: item.price * 100, // Convert price to cents
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal", "link"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/shop/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/shop/cancel`,
    });

    // Log session ID for debugging
    console.log("Stripe Checkout Session ID:", session.id);

    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500 }
    );
  }
}
