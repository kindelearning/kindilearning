"use client";

import { useEffect, useState } from "react";

const countUsers = (users, condition) => users.filter(condition).length;

const UserAnalyticsCard = ({ title, count, color }) => {
  return (
    <div
      className={`bg-white hover:bg-${color}-300 p-6 rounded-lg shadow-md text-center transition-all duration-200 transform hover:scale-105`}
    >
      <h4 className="text-lg font-medium text-gray-800">{title}</h4>
      <p className="text-3xl font-semibold text-gray-900 mt-2">{count}</p>
    </div>
  );
};

export default function UserAnalytics() {
  const [userCounts, setUserCounts] = useState({
    totalUsers: 0,
    confirmedUsers: 0,
    premiumUsers: 0,
    blockedUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        // Fetch all users from the Strapi API
        const response = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/users");
        const users = await response.json();

        // Calculate the counts based on the user data
        const totalUsers = users.length;
        const confirmedUsers = countUsers(
          users,
          (user) => user.confirmed === true
        );
        const premiumUsers = countUsers(
          users,
          (user) => user.isPremium === true
        );
        const blockedUsers = countUsers(users, (user) => user.blocked === true);

        // Update the state with the counts
        setUserCounts({
          totalUsers,
          confirmedUsers,
          premiumUsers,
          blockedUsers,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCounts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner here
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <UserAnalyticsCard
        title="Total Users"
        count={userCounts.totalUsers}
        color="blue"
      />
      <UserAnalyticsCard
        title="Confirmed Users"
        count={userCounts.confirmedUsers}
        color="green"
      />
      <UserAnalyticsCard
        title="Premium Users"
        count={userCounts.premiumUsers}
        color="purple"
      />
      <UserAnalyticsCard
        title="Blocked Users"
        count={userCounts.blockedUsers}
        color="red"
      />
    </div>
  );
}
