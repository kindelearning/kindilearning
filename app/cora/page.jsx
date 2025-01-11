"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const cardData = [
  {
    id: "website",
    title: "Website Admin Panel",
    description:
      "Manage the content and design of your website with full flexibility.",
    icon: "🌐", // You can use an SVG icon here or a suitable icon
    link: "/cora/website", // Link to the website admin panel
  },
  {
    id: "app",
    title: "App Admin Panel",
    description: "Manage your mobile app's features, settings, and content.",
    icon: "📱", // You can use an SVG icon here or a suitable icon
    link: "/cora/app", // Link to the app admin panel
  },
];

export default function Cora() {
  return (
    <>
      <section className="w-full h-screen bg-[#EAEAF5] items-center pb-32 justify-center flex lg:hidden flex-col gap-[20px]">
        <head>
          <title>
         
          </title>
        </head>
        <div className="flex items-center space-x-4">
          Cora Works best in Laptop, Please open me on Larger screen
        </div>
      </section>
      <section className="w-full h-screen  bg-[#EAEAF5] items-center pb-32 justify-center hidden lg:flex flex-col gap-[20px]">
        <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
          <div className="text-1xl font-fredoka text-center font-medium text-gray-900">
            Kindi Learning Admin Panel
          </div>
          <AdminPanel />
        </div>
      </section>
    </>
  );
}

export function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Fetch the JWT token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setIsAdmin(userData.role?.name === "Admin"); // Check if the user is an admin
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!isAdmin) {
    return <p className="text-red-600">Accessible to admin only</p>;
  }

  return (
    <div className="flex flex-col px-4 lg:px-0 md:flex-row font-fredoka gap-6">
      {cardData.map((card) => (
        <Link
          target="_blank"
          key={card.id}
          href={card.link}
          passHref
          className="w-full flex flex-col justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{card.icon}</span>
            <div>
              <div className="text-lg font-medium text-gray-800">
                {card.title}
              </div>
              <div className="text-sm text-gray-600">{card.description}</div>
            </div>
          </div>
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
              Switch to {card.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
