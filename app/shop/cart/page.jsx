"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { DeleteItem } from "@/public/Images";
import { QuantityControl } from "..";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  console.log("CartPage:", cart);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    console.log("Proceeding to checkout with cart items:", cart);
    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { id } = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred while processing the checkout.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="w-full flex-col h-screen justify-center items-center flex gap-2">
        <div className="claracontainer flex justify-center items-center claraheading">
          Your cart is empty
        </div>
        <Link href="/shop" target="_blank" className="clarabodyTwo text-red">
          Explore Shop{" "}
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="w-full h-screen bg-[#eaeaf5] items-center justify-between p-0 flex flex-col">
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Cart
          </div>
        </div>
        <div className="claracontainer -mt-4 rounded-t-[12px] z-2 md:m-12  p-6 rounded-xl bg-[#eaeaf5] md:bg-[white] w-full flex flex-col overflow-hidden gap-4">
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <div className="text-red hidden justify-center items-center md:flex text-[32px] md:text-[44px] w-full text-center font-semibold font-fredoka capitalize leading-10">
              Cart
            </div>

            <div className="w-full text-[#0a1932] text-lg  font-semibold font-fredoka capitalize">
              Products
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
                      <div className="w-full gap-[2px] flex justify-end items-center">
                        <button>
                          <Image src={DeleteItem} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="shadow-upper rounded-t-[12px] bottom-0 z-24  sticky bg-[white] shadow py-4 flex flex-row justify-center w-full items-center gap-4">
          <div className="claracontainer px-4 w-full justify-between items-center flex">
            <Button
              onClick={clearCart}
              className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-2xl font-semibold font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex"
            >
              Clear Cart
            </Button>
            <Link target="_blank" href="/shop/cart/checkout">
              <Button
                onClick={handleCheckout}
                className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white"
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
