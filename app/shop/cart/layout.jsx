import { Fredoka as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
// import { Header } from "@/app/Sections";
import "../../globals.css";
import ShopHeader from "../sections/ShopHeader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kindi Education Shop",
  description: "Built by Clara.io",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ShopHeader className="sticky" />
          {children}
        </body>
      </html>
    </>
  );
}
