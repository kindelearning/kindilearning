import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full font-fredoka sticky rounded-b-[12px] bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section: Logo or Menu */}
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-medium text-gray-700">Admin Dashboard</h1>
        </div>

        {/* Center Section: Search */}
        <div className="hidden md:flex items-center w-1/3">
          <div className="flex items-center w-full bg-gray-100 rounded-lg px-3 py-2">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent w-full border-none outline-none text-gray-600 ml-2"
            />
          </div>
        </div>

        {/* Right Section: Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Section */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="hidden md:block text-gray-700 font-medium">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
