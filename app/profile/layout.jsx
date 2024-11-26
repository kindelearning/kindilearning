import "../globals.css";
import { cn } from "@/lib/utils";
import { BottomNavigation, Footer, Header, Newsletter } from "../Sections";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
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
