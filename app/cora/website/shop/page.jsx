"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(5); // Number of products per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  // Fetch products from API with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        // console.log('Shop Data:', data);

        setProducts(data.data);
        setTotalPages(data.meta.pagination.pageCount); // Set total pages
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize]); // Refetch when page or pageSize changes

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className="p-8 min-h-screen bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold">Shop - Product List</h1>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <Table>
              <TableCaption>A list of all products</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.Name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.Description}</TableCell>
                      <TableCell>${product.Price}</TableCell>
                      <TableCell>${product.DiscountPrice}</TableCell>
                      <TableCell>
                        {product.inStock === "true" ? (
                          <div>no</div>
                        ) : (
                          <div> yes</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <button className="bg-blue-600 text-white py-1 px-3 rounded">
                          View
                        </button>
                        <button className="bg-yellow-600 text-white py-1 px-3 rounded ml-2">
                          Edit
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No products available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
