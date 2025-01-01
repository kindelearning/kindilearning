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
  PictureInPicture,
  FlaskConical,
  FormInputIcon,
  ShoppingCart,
  Activity,
  Flag,
  Info,
  FileTextIcon,
  CheckCircle,
  DollarSign,
  Users,
  HelpCircle,
  Palette,
  Clock,
  UserCog,
  FlaskConicalIcon,
} from "lucide-react";
import { useState } from "react";
import { AppStore, KindiVector } from "@/public/Images";
import Image from "next/image";

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
            <Image
              src={KindiVector}
              className="w-[100px] h-[40px] justify-start"
            />
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
          href="/cora/website"
          icon={<Home />} // Dashboard icon
          label="Dashboard"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/media"
          icon={<Home />} // Media icon (Image icon for media files)
          label="Media"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/test"
          icon={<FlaskConicalIcon />} // Test icon (Flask icon for testing)
          label="Test"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/forms"
          icon={<FormInput />} // Form icon (for ClaraForms)
          label="ClaraForms"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/activities"
          icon={<Activity />} // Activity icon (Activity log)
          label="Activity"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/shop"
          icon={<ShoppingCart />} // Products icon (Shopping Cart)
          label="Products"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/levels"
          icon={<Flag />} // Mission icon (Flag for mission)
          label="Levels"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/milestone"
          icon={<Flag />} // Mission icon (Flag for mission)
          label="Milestone"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/badge"
          icon={<Flag />} // Mission icon (Flag for mission)
          label="Badge"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/paymentmethod"
          icon={<Flag />} // Mission icon (Flag for mission)
          label="Payment Method"
          isCollapsed={isCollapsed}
        />
        {/* Pages Dropdown */}
        <div className="space-y-2">
          <div
            className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
            onClick={togglePagesDropdown}
          >
            <Folder className="mr-2 text-gray-400" />{" "}
            {/* Folder icon for pages */}
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
                icon={<Home />} // Home page icon
                label="Home Page"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/ourmission"
                icon={<Flag />} // Mission icon (Flag for mission)
                label="Our Mission"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/howitworks"
                icon={<Info />} // How It Works icon (Information)
                label="How It Works"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages"
                icon={<FileText />} // Pages icon (File text)
                label="Pages"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/tnc"
                icon={<FileText />} // Terms and Conditions icon
                label="Terms and Conditions"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/refund"
                icon={<FileText />} // Refund Policy icon
                label="Refund Policy"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/privacypolicy"
                icon={<FileText />} // Privacy Policy icon
                label="Privacy Policy"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/quality"
                icon={<CheckCircle />} // Quality Control icon (CheckCircle)
                label="Quality Control"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/investment"
                icon={<DollarSign />} // Investment icon (Dollar Sign)
                label="Investment"
                isCollapsed={isCollapsed}
              />
            </div>
          )}
        </div>

        <SidebarLink
          href="/cora/website/community"
          icon={<Users />} // Blogs icon (Users for community)
          label="Blogs"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/faq"
          icon={<HelpCircle />} // FAQ icon (Help Circle)
          label="FAQs"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/themes"
          icon={<Palette />} // Themes icon (Palette for themes)
          label="Themes"
          isCollapsed={isCollapsed}
        />

        {/* <SidebarLink
          href="/cora/website/scheduler"
          icon={<Clock />} // Scheduler icon (Clock for scheduling)
          label="Scheduler"
          isCollapsed={isCollapsed}
        /> */}
        {/* <SidebarLink
          href="/cora/website/users"
          icon={<User />} // Users icon (User management)
          label="Users"
          isCollapsed={isCollapsed}
        /> */}
        {/* <SidebarLink
          href="/cora/website/profile"
          icon={<UserCog />} // Admin Profile icon (UserCog for settings)
          label="Admin Profile"
          isCollapsed={isCollapsed}
        /> */}
        {/* <SidebarLink
          href="/cora/app"
          icon={<AppWindow />} // App Switch icon (AppWindow)
          label="Switch to App"
          isCollapsed={isCollapsed}
        /> */}
      </div>
    </div>
  );
}
