import "../globals.css";
import { cn } from "@/lib/utils";
import { BottomNavigation, Footer, Header, Newsletter } from "../Sections";

export const metadata = {
  title: "Kindi Education",
  description: "Built by ClaraVerse",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body
          className={cn("min-h-screen bg-background font-sans antialiased")}
        >
          <Header className="sticky" />
          {children}
          <Newsletter />
          <BottomNavigation />
          <Footer />
        </body>
      </html>
    </>
  );
}
