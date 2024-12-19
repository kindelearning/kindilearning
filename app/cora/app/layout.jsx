"use client";

import { useState } from "react";
import "../../globals.css";
import { Header, Sidebar } from "../Sections";

export default function RootLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <html lang="en">
      <body className="w-full h-full bg-[#EAEAF5]">
        <div className="flex w-full h-full ">
          {/* Sidebar */}
          <div
            className={`transition-all duration-300 ${
              isSidebarCollapsed ? "max-w-16" : "max-w-64"
            } h-screen w-fit bg-white z-10 shadow-md`}
          >
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              toggleCollapse={toggleSidebarCollapse}
            />
          </div>

          {/* Main Content */}
          <div
            className={`flex-1 flex w-full flex-col  transition-all duration-300 ${
              isSidebarCollapsed ? "ml-1" : "ml-1"
            }`}
          >
            <Header />
            <main className="">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
