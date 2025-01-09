"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { DeleteItem } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@/app/context/UserContext";
import { QuantityControl } from "../[id]/page";

const stripePromise = loadStripe(
  "pk_test_51NcT49CjBezv2y8roAoIWTNnaSyTsf8vaAICyY4MTx5sDq2fBi0vNQ4e3QshqT0f8KSgtCaXq7g4R95WBEbpaQet003oUhYRiJ"

);
// const stripe = new Stripe(
//   "sk_test_51NcT49CjBezv2y8roX6Ue51YBKbLz3lhKZOZfcUr9JtPAbsS1hXe21UjrByPkU7AHi51gWMv5vfT9WfUuygJhQsb00i2OkGohI"
// );

export default function CartPage() {
  const { user } = useUser(); // Retrieve user data from context
  const [loading, setLoading] = useState(false);
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  console.log("CartPage:", cartItems);

  // Calculate total price for each item (price * quantity)
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const incrementQuantity = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  const decrementQuantity = (id, quantity) => {
    updateQuantity(id, quantity - 1);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
  
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
  
      const session = await response.json();
      console.log("Checkout Session Response", session);
  
      if (session.error) {
        console.error("Error creating checkout session:", session.error);
        alert("There was an issue with your checkout. Please try again.");
        return;
      }
  
      if (session.id) {
        // Make sure Stripe is loaded before redirecting
        const stripe = await stripePromise;
  
        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
  
        if (error) {
          console.error("Stripe redirect error:", error);
          alert("There was an error redirecting to the checkout page.");
        }
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an issue with your checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleCheckout = async () => {
  //   const stripe = await stripePromise;
  //   setLoading(true);
  //   console.log("Proceeding to checkout with cart items:", cartItems);

  //   const res = await fetch("/api/checkout-session", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ cartItems }),
  //   });

  //   const data = await res.json();

  //   if (data.sessionId) {
  //     // Use dynamic user data
  //     const userId = user.id; // Get user ID from context
  //     const userAddress = user.address; // Get user address from context
  //     const paymentDetails = user.paymentMethod; // Get payment method from context

  //     // Format ordered products data
  //     const orderedProducts = cart.map((item) => ({
  //       title: item.title,
  //       price: item.price,
  //     }));
  //     // Call the API route to store data
  //     await fetch("/api/save-order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: userId,
  //         address: userAddress,
  //         orderedProducts: orderedProducts,
  //         paymentDetails: paymentDetails,
  //       }),
  //     });
  //     stripe.redirectToCheckout({ sessionId: data.sessionId });
  //   } else {
  //     console.error(data.error);
  //   }
  //   setLoading(false);
  // };

  if (cartItems.length === 0) {
    return (
      <div className="w-full flex-col h-screen justify-center items-center flex gap-2">
        <div className="claracontainer flex justify-center items-center claraheading">
          Your cart is empty
        </div>
        <Link href="/shop" className="clarabodyTwo text-red">
          Explore Shop{" "}
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="w-full h-screen bg-[#eaeaf5] items-center justify-start p-0 flex flex-col">
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Cart
          </div>
        </div>
        <div className="claracontainer h-screen -mt-4 rounded-t-[12px] z-2 md:m-12 p-2 rounded-xl bg-[#eaeaf5] md:bg-[white] w-full flex flex-col overflow-hidden gap-4">
          <div className="flex flex-col justify-start pt-4 items-start gap-4 w-full">
            <div className="text-red hidden justify-center items-center md:flex text-[32px] md:text-[44px] w-full text-center font-semibold font-fredoka capitalize leading-10">
              Cart
            </div>

            <div className="w-full text-[#0a1932] text-lg  font-semibold font-fredoka capitalize">
              Products
            </div>
          </div>
          <div className="w-full flex min-h-[50vh] px-2 overflow-y-scroll scrollbar-hidden flex-col gap-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 px-2 py-2 bg-white rounded-xl items-center shadow w-full border-gray-200"
              >
                <img
                  alt={item.title}
                  // src={item.image}
                  src={`https://proper-fun-404805c7d9.strapiapp.com${item.image}`}
                  width={120}
                  height={90}
                  className="w-[80px] h-[76px] md:w-[100px] lg:h-[80px] rounded-[10px]"
                />
                <div className="flex w-full justify-between items-start">
                  <div className="flex flex-col w-full gap-1 md:gap-2">
                    <h5 className="text-black clarabodyTwo">{item.title}</h5>
                    <div className="w-[max-content] text-[#0a1932] text-[12px] font-normal font-fredoka leading-tight">
                    {item.description}
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end w-full gap-2">
                    <div className="w-full text-red text-3xl text-end font-semibold font-fredoka capitalize leading-10">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </div>
                    <div className="w-full gap-[2px] flex justify-end items-center">
                      <button onClick={() => removeFromCart(item.id)}>
                        <Image src={DeleteItem} alt="Remove Item" />
                      </button>
                    </div>
                    <QuantityControl
                      quantity={item.quantity}
                      incrementQuantity={() =>
                        incrementQuantity(item.id, item.quantity)
                      }
                      decrementQuantity={() =>
                        decrementQuantity(item.id, item.quantity)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local BottomNav */}
        <div className="shadow-upper rounded-t-[12px] bottom-0 z-24  sticky bg-[white] shadow py-4 flex flex-row justify-center w-full items-center gap-4">
          <div className="claracontainer px-4 lg:px-0 w-full justify-between items-center flex">
            {/* <Button
              onClick={clearCart}
              className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64]clarabodyTwo rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex"
            >
              Clear Cart
            </Button> */}

            <div>
              <h3>Total Price: ${(totalPrice / 100).toFixed(2)}</h3>
            </div>
            <Button
              disabled={loading}
              onClick={handleCheckout}
              className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white"
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

// export  function CartPage2() {
//   const { cartItems, updateQuantity, removeFromCart } = useCart();
//   const [loading, setLoading] = useState(false);

//   // Calculate total price for each item (price * quantity)
//   const totalPrice = cartItems.reduce((total, item) => {
//     return total + item.price * item.quantity;
//   }, 0);
//   const incrementQuantity = (id, quantity) => {
//     updateQuantity(id, quantity + 1);
//   };

//   const decrementQuantity = (id, quantity) => {
//     updateQuantity(id, quantity - 1);
//   };

//   const handleCheckout = async () => {
//     try {
//       setLoading(true);
  
//       const response = await fetch("/api/checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ cartItems }),
//       });
  
//       const session = await response.json();
//       console.log("Checkout Session Response", session);
  
//       if (session.error) {
//         console.error("Error creating checkout session:", session.error);
//         alert("There was an issue with your checkout. Please try again.");
//         return;
//       }
  
//       if (session.id) {
//         // Make sure Stripe is loaded before redirecting
//         const stripe = await stripePromise;
  
//         // Redirect to Stripe Checkout
//         const { error } = await stripe.redirectToCheckout({
//           sessionId: session.id,
//         });
  
//         if (error) {
//           console.error("Stripe redirect error:", error);
//           alert("There was an error redirecting to the checkout page.");
//         }
//       } else {
//         alert("Failed to create checkout session.");
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//       alert("There was an issue with your checkout. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.id}>
//             <div className="flex items-center">
//               <span>{item.title}</span>
//               <div className="flex items-center ml-4">
//                 <button
//                   onClick={() => decrementQuantity(item.id, item.quantity)}
//                   disabled={item.quantity <= 1}
//                   className="px-2 py-1 border border-gray-400 rounded"
//                 >
//                   -
//                 </button>
//                 <span className="mx-2">{item.quantity}</span>
//                 <button
//                   onClick={() => incrementQuantity(item.id, item.quantity)}
//                   className="px-2 py-1 border border-gray-400 rounded"
//                 >
//                   +
//                 </button>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="ml-4 text-red-600"
//               >
//                 Remove
//               </button>
//               <span className="ml-4">
//                 ${((item.price * item.quantity) / 100).toFixed(2)}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <h3>Total Price: ${(totalPrice / 100).toFixed(2)}</h3>
//       </div>
//       {/* Add checkout button */}
//       {/* Checkout Button */}
//       <div className="mt-4">
//         <button
//           onClick={handleCheckout}
//           disabled={loading}
//           className="bg-green-500 text-white rounded py-2 px-4"
//         >
//           {loading ? "Processing..." : "Proceed to Checkout"}
//         </button>
//       </div>
//     </div>
//   );
// }
