// "use client";

// import { useCart } from "../context/CartContext";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_live_51NcT49CjBezv2y8r9rE0b8L5W37kGyDZ4ER8m3gCrcFJW0pA1C7P7goLmUx2yaAftCibKGcvwRuhEkDq6Mlymz7b00oBy7wN5m"
// );

// export default function CheckoutButton() {
//   const { cart } = useCart();

//   const handleCheckout = async () => {
//     const stripe = await stripePromise;
//     const response = await fetch("/api/checkout_sessions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ cart }),
//     });

//     const session = await response.json();

//     await stripe.redirectToCheckout({ sessionId: session.id });
//   };

//   return <button onClick={handleCheckout}>Checkout</button>;
// }
