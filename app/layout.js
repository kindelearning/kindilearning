"use client";
import { Fredoka as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { UserProvider } from "./context/UserContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-48x48.png"
            sizes="48x48"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          {/* Google CDN for all the fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Gloria+Hallelujah&family=Montserrat:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>

        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <UserProvider>
            <SessionProvider>
              <CartProvider>
                {children}
                <SpeedInsights />
              </CartProvider>
            </SessionProvider>
          </UserProvider>
        </body>
      </html>
    </>
  );
}
