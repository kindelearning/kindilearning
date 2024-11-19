/**
 * @ToDo  TO be removed as we dont use this, but need to check it infuture
 */
import { Fredoka as FontSans } from "next/font/google";

import "../../globals.css";
import { cn } from "@/lib/utils";
import { BottomNavigation, Footer,  Newsletter } from "@/app/Sections";
import ShopHeader from "../sections/ShopHeader";

/**
 * @ToDo  TO be removed as we dont use this, but need to check it infuture
 */
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kindi Education",
  description: "Built by ClaraVerse",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
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
          <ShopHeader className="sticky" />
          {children}
          <Newsletter />
          <BottomNavigation />
          <Footer />
        </body>
      </html>
    </>
  );
}
