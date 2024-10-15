"use client";

import React from "react";
import ProductChip from "../widgets/Checkout/ProductChip";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { checkoutProduct } from "@/app/constant/menu";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  console.log("CartPage:", cart);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    console.log("Proceeding to checkout with cart items:", cart);
    alert("Proceeding to checkout!");
    clearCart();
  };

  if (cart.length === 0) {
    return <p>Your cart is empty</p>;
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
          {cart.map((item) => (
            <div key={item.id}>
              {/* <img src={item.image} alt={item.title} /> */}
              <h2>{item.title}</h2>
              <p>${item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
          {/* <Link href="/shop/cart/checkout">
          </Link> */}
          <div className="w-full flex overflow-y-scroll scrollbar-hidden flex-col gap-2">
            <ProductChip product={checkoutProduct} />
            <ProductChip product={checkoutProduct} />
            <ProductChip product={checkoutProduct} />
            <ProductChip product={checkoutProduct} />
            <ProductChip product={checkoutProduct} />
            <ProductChip product={checkoutProduct} />
          </div>
        </div>
        <div className="shadow-upper rounded-t-[12px] bottom-0 z-24  sticky bg-[white] shadow py-4 flex flex-row justify-center w-full items-center gap-4">
          <div className="claracontainer px-4 w-full justify-between items-center flex">
            <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-2xl font-semibold font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
              <ChevronLeft className="w-[24px] h-[24px]" />
              Back
            </Button>
            <Link href="/shop/cart/checkout">
              <Button className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
