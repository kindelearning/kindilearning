"use client";
import { Fredoka as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Fredoka, Montserrat } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Specify weights you want to include
  display: "swap", // Optional: helps with font loading behavior
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify weights and styles
  display: "swap",
  style: ["normal", "italic"], // Include italic if needed
});

// const myFont = localFont({
//   src: "./path-to-your-font/font-file.ttf",
//   display: "swap",
// });

// export const metadata = {
//   title: "Kindi Education",
//   description: "Built by ClaraVerse",
// };

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
            fontSans.variable,
            fredoka.className,
            montserrat.className
          )}
        >
          <SessionProvider>
            <CartProvider>
              {children}
              <SpeedInsights />
            </CartProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
