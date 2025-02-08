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
import Link from "next/link";
import { Eye, PencilLine, Trash, View } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import ProductUpdateForm from "./update/page";
import Image from "next/image";
import { ProductImage } from "@/public/Images";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceSortOption, setPriceSortOption] = useState("none");
  const [stockSortOption, setStockSortOption] = useState("none");
  const [sortBy, setSortBy] = useState("createdAt"); // Sorting field
  const [sortDirection, setSortDirection] = useState("asc"); // Sorting direction
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage the dialog visibility
  const [deleteProductId, setDeleteProductId] = useState(null); // Store the ID of the product to be deleted

  const handleProductSort = (field) => {
    // Toggle sorting direction
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);

    // Sort products
    const sortedProducts = [...products].sort((a, b) => {
      const valueA = new Date(a[field]);
      const valueB = new Date(b[field]);

      // Validate dates or handle non-date fields gracefully
      if (isNaN(valueA) || isNaN(valueB)) {
        // For non-date fields, fall back to string comparison
        const strA = a[field]?.toString() || "";
        const strB = b[field]?.toString() || "";
        return direction === "asc"
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }

      // Perform date sorting based on direction
      return direction === "asc" ? valueA - valueB : valueB - valueA;
    });

    // Update the products state with sorted data
    setProducts(sortedProducts);
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        console.log("Fetched Products", data);
        setProducts(data.data);
        setTotalPages(data.meta.pagination.pageCount);
        setFilteredProducts(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize]);

  // Delete product by documentId
  const deleteProduct = async (documentId) => {
    try {
      const res = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/products/${documentId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.documentId !== documentId)
        );
        setFilteredProducts((prevProducts) =>
          prevProducts.filter((product) => product.documentId !== documentId)
        );
        setIsDialogOpen(false); // Close the dialog after successful deletion
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Open the confirmation dialog
  const openDialog = (documentId) => {
    setDeleteProductId(documentId);
    setIsDialogOpen(true);
  };

  // Search and Sort
  useEffect(() => {
    let filtered = [...products];

    // Search
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    filtered = filtered.filter((product) => {
      const name = product.Name ? product.Name.toLowerCase() : "";
      const category = product.category ? product.category.toLowerCase() : "";
      return (
        name.includes(lowerCaseSearchTerm) ||
        category.includes(lowerCaseSearchTerm)
      );
    });

    // Price Sort
    if (priceSortOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.Price - b.Price);
    } else if (priceSortOption === "priceHighToLow") {
      filtered.sort((a, b) => b.Price - a.Price);
    }

    // Stock Sort
    if (stockSortOption === "inStock") {
      filtered.sort((a, b) => (a.inStock === "true" ? -1 : 1));
    } else if (stockSortOption === "outOfStock") {
      filtered.sort((a, b) => (a.inStock === "true" ? 1 : -1));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, priceSortOption, stockSortOption, products]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <section className="p-8 min-h-screen font-fredoka bg-gray-100">
        <head>
          <title>Manage Shop - Kindi Learning</title>
        </head>
        <div className="flex justify-between mb-4">
          <div className="flex text-black font-medium text-[24px]">
            Kindi Shop Products
          </div>
          <Link
            target="_blank"
            href="https://kindilearning.vercel.app/cora/website/shop/create"
            className="text-[#414141] hover:text-black px-4 py-2 rounded-md text-[16px] font-medium duration-200 ease-in-out"
          >
            Create New Product
          </Link>
        </div>
        <div className=" w-full">
          {/* Search and Sort Controls */}
          <div className="flex justify-between rounded-lg items-center mb-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by Name or Category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border  rounded-lg   px-2 py-1  w-1/2"
            />

            <div className="flex w-fit gap-2 justify-between">
              {/* Price Sorting */}
              <select
                value={priceSortOption}
                onChange={(e) => setPriceSortOption(e.target.value)}
                className="border text-[#676b74] px-2 py-1 rounded-full "
              >
                <option value="none" className="text-[#a1a1a1]">
                  Sort by Price
                </option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>

              {/* Stock Sorting */}
              <select
                value={stockSortOption}
                onChange={(e) => setStockSortOption(e.target.value)}
                className="border p-2 text-[#676b74] rounded-full"
              >
                <option value="none">Sort by Stock</option>
                <option value="inStock">Stock: In Stock</option>
                <option value="outOfStock">Stock: Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Products Table with Horizontal Scroll */}
          <div className="overflow-x-auto scrollbar-hidden">
            <Table className="min-w-[1400px]">
              {" "}
              {/* Add min-width to trigger horizontal scrolling */}
              <TableCaption>A list of all products</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[max-content]">Sr. No</TableHead>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>DocumentId</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>For App</TableHead>
                  <TableHead onClick={() => handleProductSort("createdAt")}>
                    Created At {sortDirection === "asc" ? "↑" : "↓"}
                  </TableHead>
                  <TableHead onClick={() => handleProductSort("updatedAt")}>
                    Updated At {sortDirection === "asc" ? "↑" : "↓"}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <TableRow key={product.documentId}>
                      <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                      <TableCell>
                        {product.FeaturedImage ? (
                          <img
                            className="w-16 h-16 rounded-full"
                            // src={product.FeaturedImage[0]?.url}
                      src={`https://lionfish-app-98urn.ondigitalocean.app${product.FeaturedImage[0]?.url}`}

                            alt={product.Name}
                          />
                        ) : (
                          <Image
                            className="w-16 h-16 rounded-full"
                            alt="{product.Name}"
                            src={ProductImage}
                          />
                        )}
                      </TableCell>
                      <TableCell>{product.documentId}</TableCell>
                      <TableCell>{product.Name}</TableCell>
                      <TableCell>
                        {product.Description ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: product.Description.slice(0, 100),
                            }}
                          />
                        ) : (
                          <p>No description availble</p>
                        )}
                        ...
                      </TableCell>
                      <TableCell>${product.Price || "N/A"}</TableCell>
                      <TableCell>${product.DiscountPrice || "N/A"}</TableCell>
                      <TableCell>
                        {product.inStock === "true" ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                      {product.additionalField ? (product.additionalField === "shop"? "Yes": "No") : null} 
                      </TableCell>
                      <TableCell>
                        {new Date(product.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(product.updatedAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="flex w-fit gap-1">
                        {/* ?preview */}
                        <Link
                          target="_blank"
                          href={`http://localhost:3000/shop/${product.documentId}`}
                        >
                          <Eye className="text-[#717171] w-4 h-4  duration-200 ease-ease-in-out hover:text-black" />
                        </Link>
                        {/* Edit */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="primary">
                              <PencilLine className="text-[#717171] w-4 h-4  duration-200 ease-ease-in-out hover:text-black" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
                            <DialogHeader>
                              <DialogDescription>
                                <ProductUpdateForm
                                  documentId={product.documentId}
                                />
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter></DialogFooter>
                          </DialogContent>
                        </Dialog>{" "}
                        {/* delete */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Trash className="text-[#717171] w-4 h-4  duration-200 ease-ease-in-out hover:text-black" />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete the product.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                onClick={() =>
                                  deleteProduct(product.documentId)
                                }
                                className="bg-red text-white"
                              >
                                Confirm Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No products available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Dialog for Delete Confirmation */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-500 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteProduct(deleteProductId)}
                  className="bg-red text-white"
                >
                  Confirm Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Pagination */}
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
        </div>
      </section>
    </>
  );
}
