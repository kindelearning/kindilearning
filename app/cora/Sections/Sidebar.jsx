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
  Video,
  Clipboard,
  ActivityIcon,
  Award,
  CreditCard,
  InfoIcon,
  LucideFileText,
  EyeIcon,
} from "lucide-react";
import { useState } from "react";
import { AppStore, KindiVector } from "@/public/Images";
import Image from "next/image";

export const SidebarLink = ({ href, icon, label, isCollapsed }) => {
  return (
    <Link href={href}>
      <div
        title={isCollapsed ? label : ""}
        className="flex items-center space-x-4 py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-200"
      >
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
          icon={<Video />} // Image icon for media files
          label="Media"
          isCollapsed={isCollapsed}
        />
        {/* <SidebarLink
          href="/cora/website/test"
          icon={<FlaskConical />} // Flask icon for testing
          label="Test"
          isCollapsed={isCollapsed}
        /> */}
        <SidebarLink
          href="/cora/website/forms"
          icon={<Clipboard />} // Clipboard icon for forms
          label="ClaraForms"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/activities"
          icon={<ActivityIcon />} // Activity icon for activity log
          label="Activity"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/shop"
          icon={<ShoppingCart />} // Shopping cart for products
          label="Products"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/levels"
          icon={<Flag />} // Flag icon for levels
          label="Levels"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/milestone"
          icon={<Flag />} // Flag icon for milestones
          label="Milestone"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/badge"
          icon={<Award />} // Award icon for badges
          label="Badge"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/paymentmethod"
          icon={<CreditCard />} // Credit card icon for payment methods
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
                icon={<Home />} // Home icon
                label="Home Page"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/ourmission"
                icon={<Flag />} // Flag icon for mission
                label="Our Mission"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/howitworks"
                icon={<InfoIcon />} // Information icon for how it works
                label="How It Works"
                isCollapsed={isCollapsed}
              />
              {/* <SidebarLink
                href="/cora/website/pages"
                icon={<LucideFileText />} // Document icon for pages
                label="Pages"
                isCollapsed={isCollapsed}
              /> */}
              <SidebarLink
                href="/cora/website/pages/tnc"
                icon={<LucideFileText />} // Document icon for terms and conditions
                label="Terms and Conditions"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/refund"
                icon={<LucideFileText />} // Document icon for refund policy
                label="Refund Policy"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/privacypolicy"
                icon={<LucideFileText />} // Document icon for privacy policy
                label="Privacy Policy"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/quality"
                icon={<CheckCircle />} // Check Circle for quality control
                label="Quality Control"
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/cora/website/pages/investment"
                icon={<DollarSign />} // Dollar icon for investment
                label="Investment"
                isCollapsed={isCollapsed}
              />
            </div>
          )}
        </div>

        <SidebarLink
          href="/cora/website/community"
          icon={<Users />} // Users icon for community
          label="Blogs"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/faq"
          icon={<HelpCircle />} // Help Circle for FAQs
          label="FAQs"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/themes"
          icon={<Palette />} // Palette icon for themes
          label="Themes"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/cora/website/users"
          icon={<User />} // User icon for user management
          label="Users"
          isCollapsed={isCollapsed}
        />
      </div>
      <SidebarLink
        href="/"
        icon={<EyeIcon />} // User icon for user management
        label="Live Website"
        isCollapsed={isCollapsed}
      />
    </div>
  );
}
