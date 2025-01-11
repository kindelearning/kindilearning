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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, PenIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/users?populate=*",
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

  const handleUpdate = (updatedUser) => {
    // Here, you can send a PUT request to update the user's details
    fetch(`https://upbeat-life-04fe8098b1.strapiapp.com/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Replace with your JWT storage method
      },
      body: JSON.stringify({
        data: updatedUser, // Pass the updated user data
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("User data updated successfully!");
          setUsers(data);
        }
      })
      .catch((err) => setError("Error updating user data."));
  };

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
            <input
              className="max-w-[50%] px-2 rounded-full"
              placeholder="Search by email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select onValueChange={setFilterRole} placeholder="Filter by Role">
              <SelectTrigger className="w-[max-content] rounded-full pr-4">
                <SelectValue placeholder="Select by Role" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="">All Roles</SelectItem> */}
                <SelectItem>All</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                {/* <SelectItem value="User">User</SelectItem> */}
              </SelectContent>
            </Select>
            <Select
              onValueChange={setFilterPremium}
              placeholder="Filter by Premium"
            >
              <SelectTrigger className="w-[max-content] rounded-full pr-4">
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
              <SelectTrigger className="w-[max-content] rounded-full pr-4">
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
              <SelectTrigger className="w-[max-content] rounded-full pr-4">
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
              <TableHead >Status</TableHead>
              <TableHead >isConfirmed</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Number of Kids</TableHead>
              <TableHead>Payment Methods</TableHead>
              <TableHead>Partners</TableHead>
              <TableHead>Actions</TableHead>
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
                <TableCell className="min-w-[max-content]">
                  <div
                    className="font-medium  border-black rounded-full"
                    variant={user.blocked ? "destructive" : "success"}
                  >
                    {user.blocked ? "Blocked" : "Active"} 
                  </div>
                </TableCell>
                <TableCell className="min-w-[max-content]">
                  <div
                    className="font-medium  border-black rounded-full"
                    variant={user.blocked ? "destructive" : "success"}
                  >
                    {user.confirmed ? "Confirmed" : "Unconfirmed"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium  border-black rounded-full">
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
                <TableCell className="flex w-full gap-2 justify-center items-center">
                  {/* View */}
                  <Dialog>
                    <DialogTrigger>
                      <Eye className="font-[30px] text-[#111b3753] hover:text-black"/>
                    </DialogTrigger>
                    <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>
                          Check every details for : {user.username}
                        </DialogTitle>
                        <DialogDescription>
                          <UserDetails user={user} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  {/* Update */}
                  <Dialog>
                    <DialogTrigger>
                      <PenIcon className="font-[30px] text-[#111b3753] hover:text-black" />
                    </DialogTrigger>
                    <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>
                          Check every details for : {user.username}
                        </DialogTitle>
                        <DialogDescription>
                          <UserEditForm
                            userId={user.id}
                            onUpdate={handleUpdate}
                          />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
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

const UserDetails = ({ user }) => {
  return (
    <Card className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <CardHeader className="mb-6">
        <CardTitle className="text-2xl font-bold text-gray-800">
          User Details
        </CardTitle>
        <CardDescription className="text-gray-500">
          Detailed information about the selected user.
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <div className="space-y-8">
          {/* Basic Info */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-600">Username</p>
                <p className="text-gray-800">{user.username}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Email</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Name</p>
                <p className="text-gray-800">{user.Name || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Role</p>
                <p className="text-gray-800">{user.role?.name || "N/A"}</p>
              </div>
            </div>
          </section>

          {/* Subscription Info */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Subscription Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-600">Premium</p>
                <Badge variant={user.isPremium ? "success" : "destructive"}>
                  {user.isPremium ? "Yes" : "No"}
                </Badge>
              </div>
              <div>
                <p className="font-medium text-gray-600">Subscription Level</p>
                <p className="text-gray-800">
                  {user.SubscriptionLevel || "N/A"}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Confirmed</p>
                <Badge variant={user.confirmed ? "success" : "destructive"}>
                  {user.confirmed ? "Yes" : "No"}
                </Badge>
              </div>
              <div>
                <p className="font-medium text-gray-600">Blocked</p>
                <Badge variant={user.blocked ? "destructive" : "success"}>
                  {user.blocked ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </section>

          {/* Relational Fields */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Relational Fields
            </h3>
            {/* Kids */}
            <div>
              <p className="font-medium text-gray-600">My Kids</p>
              {user.myKids?.length > 0 ? (
                <div className="w-full grid grid-cols-2 gap-2 justify-between pl-4 text-gray-800">
                  {user.myKids.map((kid) => (
                    <div key={kid.id}>
                      {kid.Name} (Age: {kid.Age}, Gender: {kid.Gender})
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No kids associated.</p>
              )}
            </div>

            {/* Payment Methods */}
            <div>
              <p className="font-medium text-gray-600">Payment Methods</p>
              {user.myPaymentMethods?.length > 0 ? (
                <div className="w-full grid grid-cols-2 gap-2 justify-between pl-4 text-gray-800">
                  {user.myPaymentMethods.map((method) => (
                    <div key={method.id}>
                      {method.Name}
                      {method.Number}
                      {method.CVV}
                      {method.ExpiryDate}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No payment methods added.</p>
              )}
            </div>

            {/* Partner Info */}
            <div>
              <p className="font-medium text-gray-600">My Partner</p>
              {user.myPartner?.length > 0 ? (
                <div className="w-full grid grid-cols-2 gap-2 justify-between pl-4 text-gray-800">
                  {user.myPartner.map((partner) => (
                    <div key={partner.id}>{partner.username || "N/A"}</div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No partner associated.</p>
              )}
            </div>
          </section>

          {/* Timestamps */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Timestamps
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-600">Created At</p>
                <p className="text-gray-800">
                  {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Updated At</p>
                <p className="text-gray-800">
                  {new Date(user.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};
const UserEditForm = ({ userId, onUpdate }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [SubscriptionLevel, setSubscriptionLevel] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data based on the userId
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://upbeat-life-04fe8098b1.strapiapp.com/api/users/${userId}?populate=*`
        );
        const data = await response.json();

        if (response.ok) {
          // Pre-fill the form with the fetched user data
          setUsername(data.username || "");
          setEmail(data.email || "");
          setName(data.Name || "");
          setSubscriptionLevel(data.SubscriptionLevel || "");
          setIsPremium(data.isPremium || false);
          setConfirmed(data.confirmed || false);
          setBlocked(data.blocked || false);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !email) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        `https://upbeat-life-04fe8098b1.strapiapp.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            Name,
            SubscriptionLevel,
            isPremium,
            confirmed,
            blocked,
          }),
        }
      );

      const data = await response.json();
      console.log("Payload Sent", data);

      if (response.ok) {
        onUpdate(data); // Call parent callback after successful update
        alert("User updated successfully!");
      } else {
        setError("Failed to update user data.");
      }
    } catch (err) {
      setError("Error updating user data");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}

      <div>
        <label htmlFor="username" className="block font-medium text-gray-600">
          Username
        </label>
        <input
          type="text"
          disabled
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full border rounded px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          disabled
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border rounded px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="name" className="block font-medium text-gray-600">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded px-4 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="subscriptionLevel"
          className="block font-medium text-gray-600"
        >
          Subscription Level
        </label>
        <select
          id="subscriptionLevel"
          value={SubscriptionLevel}
          onChange={(e) => setSubscriptionLevel(e.target.value)}
          className="mt-1 block w-full border rounded px-4 py-2"
        >
          <option value="">Select Subscription Level</option>
          <option value="Family">Family</option>
          <option value="Family Plus">Family Plus</option>
          <option value="Professional">Professional</option>
        </select>
      </div>

      <div>
        <label htmlFor="isPremium" className="block font-medium text-gray-600">
          Premium
        </label>
        <input
          type="checkbox"
          id="isPremium"
          checked={isPremium}
          onChange={() => setIsPremium(!isPremium)}
        />
      </div>

      <div>
        <label htmlFor="confirmed" className="block font-medium text-gray-600">
          Confirmed
        </label>
        <input
          type="checkbox"
          id="confirmed"
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
        />
      </div>

      <div>
        <label htmlFor="blocked" className="block font-medium text-gray-600">
          Blocked
        </label>
        <input
          type="checkbox"
          id="blocked"
          checked={blocked}
          onChange={() => setBlocked(!blocked)}
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Update User
      </button>
    </form>
  );
};
