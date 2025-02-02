import { BottomNavigation, Footer, Newsletter } from "@/app/Sections";
import ShopHeader from "../sections/ShopHeader";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <ShopHeader className="sticky" />
          {children}
          <Newsletter />
          <BottomNavigation />
          {/* <Footer /> */}
        </body>
      </html>
    </>
  );
}
