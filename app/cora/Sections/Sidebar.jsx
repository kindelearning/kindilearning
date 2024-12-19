"use client";

import Link from "next/link";
import {
  Home,
  FileText,
  Settings,
  List,
  AppWindow,
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

export const SidebarLink = ({ href, icon, label, isCollapsed }) => {
  return (
    <Link href={href}>
      <div className="flex items-center space-x-4 py-2 px-4 hover:bg-gray-700 rounded-lg">
        <div className="text-xl">{icon}</div>
        {!isCollapsed && <span className="text-white font-fredoka">{label}</span>}
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`transition-all duration-300 bg-gray-900 text-white h-full  ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!isCollapsed && <h2 className="text-xl font-semibold">Admin Panel</h2>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Sidebar Links */}
      <div className="mt-6 space-y-4">
        <SidebarLink
          href="/cora/website/test"
          icon={<Home />}
          label="Test"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website"
          icon={<Home />}
          label="Home"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/shop"
          icon={<List />}
          label="Products"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/pages"
          icon={<FileText />}
          label="Pages"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/pages/tnc"
          icon={<FileText />}
          label="Terms and Conditions"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/pages/refund"
          icon={<FileText />}
          label="refund"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/pages/privacypolicy"
          icon={<FileText />}
          label="privacy policy"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/community"
          icon={<List />}
          label="Blogs"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/themes"
          icon={<AppWindow />}
          label="Themes"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/activities"
          icon={<Settings />}
          label="Activity"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/scheduler"
          icon={<Settings />}
          label="Scheduler"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/users"
          icon={<User />}
          label="Users"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/profile"
          icon={<User />}
          label="Admin Profile"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/app"
          icon={<AppWindow />}
          label="Switch to App"
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
}
