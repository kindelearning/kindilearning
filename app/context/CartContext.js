
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    console.log("Cart updated:", cart);
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // const handleCheckout = async () => {
  //   try {
  //     const response = await fetch("/api/checkout-session", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         items: cart.map((item) => ({
  //           name: item.name,
  //           description: item.description,
  //           image: item.image,
  //           price: item.price,
  //           quantity: item.quantity,
  //         })),
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data?.url) {
  //       window.location.href = data.url; // Redirect to Stripe checkout
  //     } else {
  //       console.error("Failed to create checkout session");
  //     }
  //   } catch (error) {
  //     console.error("Checkout error:", error);
  //   }
  // };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const session = await response.json();
  
      // Instead of using stripe.redirectToCheckout, redirect directly using the URL
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error("No URL received.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, handleCheckout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
