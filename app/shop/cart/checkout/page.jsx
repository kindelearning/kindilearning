"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { DeleteItem } from "@/public/Images";
import { useSession } from "next-auth/react";
import Link from "next/link";

const stripePromise = loadStripe(
  "pk_live_51NcT49CjBezv2y8r9rE0b8L5W37kGyDZ4ER8m3gCrcFJW0pA1C7P7goLmUx2yaAftCibKGcvwRuhEkDq6Mlymz7b00oBy7wN5m"
);

const CheckoutPage = () => {
  const { data: session, status } = useSession();

  const { cart, clearCart } = useCart();
  const completeCheckout = async () => {
    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      // Check if the response is successful
      if (!response.ok) {
        console.error(
          "Failed to create checkout session:",
          response.statusText
        );
        alert("Failed to create checkout session. Please try again.");
        return;
      }

      const session = await response.json();
      console.log("Stripe Session:", session);

      if (session.id) {
        const stripe = await stripePromise;
        if (!stripe) {
          console.error("Stripe instance not loaded");
          alert("Stripe is not initialized. Please refresh and try again.");
          return;
        }

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error("Stripe redirect error:", result.error.message);
          alert(result.error.message);
        }
      } else {
        console.error("Error creating session:", session.error);
        alert(`Error: ${session.error || "Failed to initiate checkout."}`);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <>
      <section className="w-full h-screen py-24 bg-[rgb(234,234,245)] items-start justify-start lg:items-center lg:justify-center p-0 flex flex-col">
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Checkout
          </div>
        </div>
        <div className="claracontainer h-screen -mt-4 rounded-t-[12px] z-2 md:m-12  p-6 rounded-xl bg-[#eaeaf5] md:bg-[white] w-full flex flex-col overflow-hidden gap-4">
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <div className="text-red hidden justify-center items-center md:flex text-[32px] md:text-[44px] w-full text-center font-semibold font-fredoka capitalize leading-10">
              Checkout
            </div>
          </div>

          <div className="w-full flex min-h-[50vh] px-2 overflow-y-scroll scrollbar-hidden flex-col gap-2">
            {cart.map((item) => (
              <div key={item.id}>
                <div className="flex gap-4 px-2 py-2 bg-white rounded-xl items-center shadow w-full border-gray-200">
                  <Image
                    alt={item.title}
                    src={item.image}
                    width={120}
                    height={90}
                    className="w-[80px] h-[76px] md:w-[100px] lg:h-[80px] rounded-[12px]"
                  />
                  <div className="flex w-full justify-between items-start">
                    <div className="flex flex-col w-full gap-1 md:gap-2">
                      <h5 className="text-black text-lg font-fredoka font-medium leading-relaxed ">
                        {item.title}
                      </h5>
                    </div>
                    <div className="flex flex-col justify-end items-end w-full gap-2">
                      <div className="w-full text-red text-3xl text-end font-semibold font-fredoka capitalize leading-10">
                        ${item.price}
                      </div>
                      {/* <div className="w-full gap-[2px] flex justify-end items-center">
                        <button onClick={handleCheckout}>
                          <Image src={DeleteItem} />
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* bottom CTA's */}
        <div className="shadow-upper rounded-t-[12px] bottom-0 z-24  sticky bg-[white] shadow py-4 flex flex-row justify-center w-full items-center gap-4">
          <div className="claracontainer px-4 w-full justify-between items-center flex">
            <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-2xl font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
              Back
            </Button>

            {session ? (
              <>
                <Button
                  onClick={completeCheckout}
                  className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white"
                >
                  Complete Purchase
                </Button>
              </>
            ) : (
              <>
                <Link target="_blank" href="/auth/sign-up">
                  <Button className="bg-red hover:bg-hoverRed clarabutton">
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
