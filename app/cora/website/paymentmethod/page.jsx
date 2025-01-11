"use client";

import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PaymentMethodsTable() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [filteredMethods, setFilteredMethods] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 12;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://upbeat-life-04fe8098b1.strapiapp.com/api/payment-methods?populate=*"
      );
      const data = await response.json();
      setPaymentMethods(data.data || []);
      setFilteredMethods(data.data || []);
    };

    fetchData();
  }, []);

  // Handle filter

  // Handle delete
  const handleDelete = async () => {
    if (!selectedPaymentMethod) return;

    await fetch(
      `https://upbeat-life-04fe8098b1.strapiapp.com/api/payment-methods/${selectedPaymentMethod.documentId}`,
      {
        method: "DELETE",
      }
    );

    setOpenDialog(false);
    setPaymentMethods((prev) =>
      prev.filter(
        (item) => item.documentId !== selectedPaymentMethod.documentId
      )
    );
    setFilteredMethods((prev) =>
      prev.filter(
        (item) => item.documentId !== selectedPaymentMethod.documentId
      )
    );
  };

  // Handle search
  useEffect(() => {
    const filtered = paymentMethods.filter((method) =>
      method.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMethods(filtered);
  }, [searchTerm, paymentMethods]);

  // Handle sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...filteredMethods].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredMethods(sorted);
  };

  // Handle pagination
  const totalPages = Math.ceil(filteredMethods.length / entriesPerPage);
  const currentEntries = filteredMethods.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <section className="font-fredoka min-h-screen h-full md:h-full lg:h-full flex flex-col items-center bg- [#ffffff] w-full gap-4 py-8">
      <head>
        <title>Payment Methods - Kindi learning</title>
      </head>
      <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
        <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 mb-4 border rounded w-full"
        />
        {/* Filter Dropdown */}
        <div className="overflow-x-scroll max-w-[1200px] w-full flex justify-center items-center">
          <Table className="">
            <TableCaption>A list of all your payment methods.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Serial No.</TableHead>
                <TableHead>DocumentId</TableHead>
                <TableHead onClick={() => handleSort("Name")}>
                  Name{" "}
                  {sortField === "Name" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>

                <TableHead onClick={() => handleSort("Number")}>
                  Number{" "}
                  {sortField === "Number" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>CVV</TableHead>
                <TableHead>User</TableHead>
                <TableHead onClick={() => handleSort("createdAt")}>
                  Created At{" "}
                  {sortField === "createdAt" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => handleSort("updatedAt")}>
                  Updated At{" "}
                  {sortField === "updatedAt" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEntries.map((method, index) => (
                <TableRow key={method.documentId}>
                  <TableCell>
                    {(currentPage - 1) * entriesPerPage + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {method.documentId}
                  </TableCell>
                  <TableCell className="font-medium">{method.Name}</TableCell>
                  <TableCell>{method.Number}</TableCell>
                  <TableCell>{method.ExpiryDate}</TableCell>
                  <TableCell>{method.CVV}</TableCell>
                  <TableCell>{method.user?.Name || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(method.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(method.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DialogTrigger asChild>
                        <button
                          className="text-red -600 hover:underline"
                          onClick={() => {
                            setSelectedPaymentMethod(method);
                            setOpenDialog(true);
                          }}
                        >
                          Delete
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the payment method.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            className="px-4 py-2 bg-red-600 text-red rounded"
                            onClick={handleDelete}
                          >
                            Yes, Delete
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-200 rounded"
                            onClick={() => setOpenDialog(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
