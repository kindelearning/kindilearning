"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteContent from "./delete/page";
import { Eye, PencilIcon } from "lucide-react";
import UpdateThemeForm from "./update/page";

export default function AdminThemes() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch all themes
  const fetchThemes = async () => {
    const res = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/our-themes?populate=*");
    const data = await res.json();

    if (data && data.data) {
      setThemes(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handlePreview = (theme) => {
    setSelectedTheme(theme);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published"; // Toggle status between published and draft

    const res = await fetch(`https://proper-fun-404805c7d9.strapiapp.com/api/our-themes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setThemes((prevThemes) =>
        prevThemes.map((theme) =>
          theme.id === id ? { ...theme, status: newStatus } : theme
        )
      );
    } else {
      // Handle error
      console.error("Failed to update status");
    }
  };

  const handleDelete = (documentId) => {
    // Log the documentId being deleted
    console.log("Deleting documentId:", documentId);

    // Remove the deleted item from the UI
    setThemes((prevContent) =>
      prevContent.filter((theme) => theme.documentId !== documentId)
    );
  };

  const filteredThemes = themes.filter((theme) =>
    theme.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedThemes = filteredThemes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(filteredThemes.length / rowsPerPage);

  const handleSort = (field) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);

    const sortedThemes = [...filteredThemes].sort((a, b) => {
      if (direction === "asc") {
        return new Date(a[field]) - new Date(b[field]);
      } else {
        return new Date(b[field]) - new Date(a[field]);
      }
    });

    setThemes(sortedThemes);
  };

  return (
    <>
      <section className="p-8 font-fredoka bg-gray-100">
        <div className="container mx-auto">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center mb-4">
              <label
                htmlFor="rows-per-page"
                className="mr-2 text-xl font-medium"
              >
                Rows per page:
              </label>
              <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                className="p-2 border rounded-md"
              >
                {[5, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <Link
              target="_blank"
              className="text-purple hover:scale-105 duration-150"
              href="/cora/website/themes/create"
            >
              Create New Theme
            </Link>
          </div>

          <Input
            placeholder="Search Themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />

          {/* Data Table */}
          <div className="flex max-w-[1400px]">
            <Table className="overscroll-x-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Thumbnail</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Meta Description</TableHead>
                  <TableHead
                    className=" cursor-pointer"
                    onClick={() => handleSort("LaunchTime")}
                  >
                    Launch Time {sortDirection === "asc" ? "↑" : "↓"}
                  </TableHead>
                  <TableHead
                    className=" cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Created At {sortDirection === "asc" ? "↑" : "↓"}
                  </TableHead>
                  <TableHead
                    className=" cursor-pointer"
                    onClick={() => handleSort("updatedAt")}
                  >
                    Updated At {sortDirection === "asc" ? "↑" : "↓"}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedThemes.map((theme) => (
                  <TableRow key={theme.id}>
                    <TableCell>
                      {theme.status === "published" ? "Draft" : " Published"}
                    </TableCell>
                    <TableCell>
                      <img
                        src={theme?.Thumbnail?.url}
                        // src={`https://proper-fun-404805c7d9.strapiapp.com${theme?.Thumbnail?.url}`}
                        alt={theme?.Title}
                        className="w-[40px] border-2 border-[#333333] rounded-full h-[40px] object-cover"
                      />
                    </TableCell>
                    <TableCell>{theme.Title}</TableCell>
                    <TableCell>{theme.metaDesc.slice(0, 100)}...</TableCell>
                    <TableCell>
                      {new Date(theme.LaunchTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(theme.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(theme.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex">
                      <Button variant="primary">
                        <DeleteContent
                          documentId={theme.documentId}
                          onDelete={handleDelete}
                        />
                      </Button>
                      <Dialog>
                        <DialogTrigger>
                          <Button variant="primary">
                            <PencilIcon className="text-[#7f7f7f]  w-5 h-5 duration-300 ease-in-out hover:text-black" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[600px] font-fredoka max-w-[1000px] overflow-y-scroll">
                          <DialogTitle>
                            Update {selectedTheme?.Title}
                          </DialogTitle>
                          <DialogDescription>
                            <UpdateThemeForm documentId={theme.documentId} />

                            {/* Dialog Close Button */}
                          </DialogDescription>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button
                                variant="secondary"
                                onClick={handleCloseDialog}
                              >
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            variant="primary"
                            onClick={() => handlePreview(theme)}
                          >
                            <Eye className="text-[#7f7f7f]  w-5 h-5 duration-300 ease-in-out hover:text-black" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[600px] font-fredoka max-w-[1000px] overflow-y-scroll">
                          <DialogTitle>{selectedTheme?.Title}</DialogTitle>
                          <DialogDescription>
                            <div className="w-full flex flex-col">
                              <div className="flex w-full gap-4 justify-between items-start">
                                {/* Thumbnail Image */}
                                <img
                                  src={selectedTheme?.Thumbnail?.url} // Assuming the image URL is in the 'image' property
                                  // src={`https://proper-fun-404805c7d9.strapiapp.com${selectedTheme?.Thumbnail?.url}`} // Assuming the image URL is in the 'image' property
                                  alt={selectedTheme?.Title}
                                  className="w-full h-[300px] object-cover rounded-lg  mb-6"
                                />
                                <div className="flex w-full flex-col justify-start items-start">
                                  {/* Theme Title */}
                                  <div>
                                    <strong className="text-xl font-medium">
                                      Meta Description
                                    </strong>
                                    <p className="text-gray-600 text-sm mt-2">
                                      {selectedTheme?.Title}
                                    </p>
                                  </div>
                                  {/* Meta Description */}
                                  <div>
                                    <strong className="text-xl font-medium">
                                      Meta Description
                                    </strong>
                                    <p className="text-gray-600 text-sm mt-2">
                                      {selectedTheme?.metaDesc}
                                    </p>
                                  </div>
                                  {/* Launch Time */}
                                  <div>
                                    <strong className="text-xl font-medium">
                                      Launch Time
                                    </strong>
                                    <p className="text-gray-600 text-sm mt-2">
                                      {new Date(
                                        selectedTheme?.LaunchTime
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  {/* Toggle Status Button */}
                                  <div className="mt-4">
                                    <Button
                                      variant={
                                        selectedTheme?.status === "published"
                                          ? "success"
                                          : "warning"
                                      }
                                      onClick={() =>
                                        toggleStatus(
                                          selectedTheme?.id,
                                          selectedTheme?.status
                                        )
                                      }
                                    >
                                      {selectedTheme?.status === "published"
                                        ? "Switch to Draft"
                                        : "Switch to Publish"}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <strong className="text-xl font-medium">
                                Main Content
                              </strong>
                              <div
                                className="text-sm prose text-gray-700 mt-2"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    selectedTheme?.MainContent ||
                                    "No content available",
                                }}
                              />
                            </div>

                            {/* Dialog Close Button */}
                          </DialogDescription>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button
                                variant="secondary"
                                onClick={handleCloseDialog}
                              >
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Custom Pagination */}
          <div className="flex justify-between mt-4">
            <Button
              variant="secondary"
              onClick={() => handleChangePage(Math.max(0, page - 1))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() =>
                handleChangePage(Math.min(totalPages - 1, page + 1))
              }
              disabled={page === totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
