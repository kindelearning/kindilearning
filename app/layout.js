"use client";
import { Fredoka as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

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

          <link rel="shortcut icon" href="/favicon.ico" />
          <script
            src="https://accounts.google.com/gsi/client"
            async
            defer
          ></script>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
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
          <GoogleOAuthProvider clientId="1055268493431-9l6ee7s7d7o14dfg5vhh9pr0jgq7rlh7.apps.googleusercontent.com">
            <UserProvider>
              <SessionProvider>
                <CartProvider>
                  {children}
                  <SpeedInsights />
                </CartProvider>
              </SessionProvider>
            </UserProvider>
          </GoogleOAuthProvider>
        </body>
      </html>
    </>
  );
}
