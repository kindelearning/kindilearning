"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Pagination = ({ total, perPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null; // No pagination needed for single-page results

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`px-3 py-1 rounded ${
            number === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterPremium, setFilterPremium] = useState("");
  const [filterBlocked, setFilterBlocked] = useState("");
  const [filterConfirmed, setFilterConfirmed] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const usersPerPage = 12;

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://proper-fun-404805c7d9.strapiapp.com/api/users?populate=*",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Replace with your JWT storage method
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search and Filter Logic
  useEffect(() => {
    let updatedUsers = users;

    if (search) {
      updatedUsers = updatedUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterRole) {
      updatedUsers = updatedUsers.filter(
        (user) => user.role?.name === filterRole
      );
    }

    if (filterPremium) {
      const isPremium = filterPremium === "Yes";
      updatedUsers = updatedUsers.filter(
        (user) => user.isPremium === isPremium
      );
    }

    if (filterBlocked) {
      const isBlocked = filterBlocked === "Yes";
      updatedUsers = updatedUsers.filter((user) => user.blocked === isBlocked);
    }

    if (filterConfirmed) {
      const isConfirmed = filterConfirmed === "Yes";
      updatedUsers = updatedUsers.filter(
        (user) => user.confirmed === isConfirmed
      );
    }

    setFilteredUsers(updatedUsers);
    setCurrentPage(1); // Reset to the first page on filters
  }, [
    search,
    filterRole,
    filterPremium,
    filterBlocked,
    filterConfirmed,
    users,
  ]);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-full font-fredoka min-h-screen h-full flex flex-col items-center gap-4 py-8">
      <head>
        <title>Kindi Users - Cora</title>
      </head>
      <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-8">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-xl font-semibold">All Users</h1>

          <div className="flex w-full gap-4 flex- wrap">
            <Input
              className="max-w-[50%]"
              placeholder="Search by username or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select onValueChange={setFilterRole} placeholder="Filter by Role">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select by Role" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All Roles</SelectItem> */}
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={setFilterPremium}
              placeholder="Filter by Premium"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select by Subscription" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All Users</SelectItem> */}
                <SelectItem value="Yes">Premium</SelectItem>
                <SelectItem value="No">Standard</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={setFilterBlocked}
              placeholder="Blocked Status"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Yes">Blocked</SelectItem>
                <SelectItem value="No">Active</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={setFilterConfirmed}
              placeholder="Confirmation Status"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select by Email Status" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All</SelectItem> */}
                <SelectItem value="Yes">Confirmed</SelectItem>
                <SelectItem value="No">Unconfirmed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table className="font-fredoka font-medium">
          <TableCaption>A list of all registered users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Number of Kids</TableHead>
              <TableHead>Payment Methods</TableHead>
              <TableHead>Partners</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.profilepic ? (
                    <img
                      src={user.profilepic.url}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role?.name || "N/A"}</TableCell>
                <TableCell>
                  <div
                    className="font-medium border border-black rounded-full"
                    variant={user.blocked ? "destructive" : "success"}
                  >
                    {user.blocked ? "Blocked" : "Active"}
                  </div>
                  <div
                    className="font-medium border border-black rounded-full"
                    variant={user.confirmed ? "success" : "warning"}
                  >
                    {user.confirmed ? "Confirmed" : "Unconfirmed"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium border border-black rounded-full">
                    {user.SubscriptionLevel || "Free"}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell>{user.myKids?.length || 0}</TableCell>
                <TableCell>{user.myPaymentMethods?.length || 0}</TableCell>
                <TableCell>{user.myPartner?.length || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          total={filteredUsers.length}
          perPage={usersPerPage}
          currentPage={currentPage}
          onPageChange={paginate}
        />
      </div>
    </section>
  );
}
