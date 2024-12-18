import "../../globals.css";
import { Header, Sidebar } from "../Sections";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" >
        <section className="w-full h-full bg-[#EAEAF5] items-center pb-32 justify-center flex flex-col gap-[20px]">
          <div className="flex w-full flex-row claracontainer">
            <Sidebar />
            <body className="w-full">
              <Header />
              {children}
            </body>
          </div>
        </section>
      </html>
    </>
  );
}
