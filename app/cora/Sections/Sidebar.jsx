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
  Folder,
  FormInput,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { KindiVector } from "@/public/Images";

export const SidebarLink = ({ href, icon, label, isCollapsed }) => {
  return (
    <Link href={href}>
      <div className="flex items-center space-x-4 py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-200">
        <div className="text-xl text-gray-400">{icon}</div>
        {!isCollapsed && (
          <span className="text-gray-200 font-medium font-fredoka">
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const togglePagesDropdown = () => {
    setIsPagesOpen(!isPagesOpen);
  };

  return (
    <div
      className={`transition-all duration-300 bg-gray-900 text-white h-full shadow-xl ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!isCollapsed && (
          <div className="w-full flex flex-col justify-between">
            <Image src={KindiVector} className="w-[100px] h-[40px] justify-start"/>
            {/* <h2 className="text-xl font-semibold">Admin Panel</h2> */}
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
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

        {/* Pages Dropdown */}
        <div className="space-y-2">
          <div
            className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
            onClick={togglePagesDropdown}
          >
            <Folder className="mr-2 text-gray-400" />
            {!isCollapsed && (
              <span className="text-base font-medium text-gray-200">
                All Pages
              </span>
            )}
          </div>
          {isPagesOpen && (
            <div className="pl-8 space-y-2">
              <SidebarLink
                href="/cora/website/home"
                icon={<Home />}
                label="Home Page"
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
                label="Refund Policy"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/privacypolicy"
                icon={<FileText />}
                label="Privacy Policy"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/quality"
                icon={<FileText />}
                label="Quality Control"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/investment"
                icon={<FileText />}
                label="Investment"
                isCollapsed={isCollapsed}
              />
            </div>
          )}
        </div>

        <SidebarLink
          href="/cora/website/community"
          icon={<List />}
          label="Blogs"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/faq"
          icon={<AppWindow />}
          label="FAQs"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/themes"
          icon={<AppWindow />}
          label="Themes"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/forms"
          icon={<FormInput />}
          label="ClaraForms"
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
