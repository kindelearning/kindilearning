"use client";

// import { useCart } from '../context/CartContext';

import { useCart } from "@/app/context/CartContext";

const CartIndicator = () => {
  const { cart } = useCart();

  return (
    <div>
      <p>Cart Items: {cart.length}</p>
    </div>
  );
};

export default CartIndicator;
