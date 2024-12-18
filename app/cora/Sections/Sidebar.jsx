"use client";

import Link from "next/link";
import { Home, FileText, Settings, List, AppWindow, User, ChevronRight } from "lucide-react";
import { useState } from "react";

const SidebarLink = ({ href, icon, label, isCollapsed }) => {
  return (
    <Link href={href}>
      <div className="flex items-center space-x-4 py-2 hover:bg-gray-700 rounded-lg">
        <div className="text-xl">{icon}</div>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Toggle state for sidebar
  const [isCollapsed, setIsCollapsed] = useState(false); // Toggle state for collapsed sidebar

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-opacity-50`}>
        <div
          className={`w-${isCollapsed ? '16' : '64'} h-full bg-gray-900 text-white transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'transform-none' : '-translate-x-full'
          }`}
        >
          {/* Sidebar Content */}
          <div className="flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-semibold ${isCollapsed ? 'hidden' : ''}`}>
                Admin Panel
              </h2>
              {/* Profile icon or Avatar */}
              <div className="w-8 h-8 rounded-full bg-gray-500"></div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <SidebarLink href="/cora/website" icon={<Home />} label="Home" isCollapsed={isCollapsed} />

              <SidebarLink href="/cora/website/shop" icon={<List />} label="Products" isCollapsed={isCollapsed} />
              <SidebarLink href="/cora/website/pages" icon={<FileText />} label="Pages" isCollapsed={isCollapsed} />
              <div className="mb-4">
                <label htmlFor="pages" className="text-gray-400">
                  Pages
                </label>
                <select
                  id="pages"
                  name="pages"
                  className="w-full bg-gray-700 text-white p-2 mt-2 rounded-md"
                >
                  <option value="/cora/pages">All Pages</option>
                  <option value="/cora/pages/privacypolicy">Privacy Policy</option>
                  <option value="/cora/pages/tnc">Terms and Conditions</option>
                  <option value="/cora/pages/refund">Refund Policy</option>
                </select>
              </div>

              <SidebarLink href="/cora/website/pages/tnc" icon={<FileText />} label="Terms and Conditions" isCollapsed={isCollapsed} />
              <SidebarLink href="/cora/website/pages/refund" icon={<FileText />} label="Refund Policy" isCollapsed={isCollapsed} />
              <SidebarLink href="/cora/website/community" icon={<List />} label="Blogs" isCollapsed={isCollapsed} />
              <SidebarLink href="/cora/website/themes" icon={<AppWindow />} label="Themes" isCollapsed={isCollapsed} />
              <SidebarLink href="/cora/website/activities" icon={<Settings />} label="Activity" isCollapsed={isCollapsed} />
              <SidebarLink href="/cora/website/scheduler" icon={<Settings />} label="Scheduler" isCollapsed={isCollapsed} />
              <SidebarLink href="/cora/website/users" icon={<User />} label="Users" isCollapsed={isCollapsed} />
              <SidebarLink href="/cora/website/profile" icon={<User />} label="Admin Profile" isCollapsed={isCollapsed} />
              <SidebarLink href="/cora/app" icon={<AppWindow />} label="Switch to App" isCollapsed={isCollapsed} />
            </div>

            {/* Toggle Collapse Button */}
            <button
              onClick={toggleCollapse}
              className="absolute bottom-4 left-4 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronRight />}
            </button>
          </div>
        </div>
        {/* Overlay for Sidebar */}
      </div>
    </>
  );
}
