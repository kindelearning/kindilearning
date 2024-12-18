import "../globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <div className="flex">
          <Sidebar />
          <body className="w-full p-4">
            <Header />
            {children}
          </body>
        </div>
        {/* <body>{children}</body> */}
      </html>
    </>
  );
}
