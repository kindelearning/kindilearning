"use client";

import { useState, useEffect } from "react";
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
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";

export default function ProductUpdateForm({ documentId }) {
  const [existingData, setExistingData] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [seoKeywords, setSEOKeywords] = useState("");
  const [materialOptions, setMaterialOptions] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/products/${documentId}?populate=*`
        );
        const data = await res.json();
        if (res.ok) {
          setExistingData(data.data);
          setName(data.data.Name || "");
          setDescription(data.data.Description || "");
          setLongDescription(data.data.LongDescription || "");
          setPrice(data.data.Price || "");
          setDiscountPrice(data.data.DiscountPrice || "");
          setSEOKeywords(data.data.SEOKeywords || "");
          setMaterialOptions(data.data.MaterialOptions || "");
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("Error fetching data.");
      }
    };
    fetchProductData();
  }, [documentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (name) formData.append("data[Name]", name);
    if (description) formData.append("data[Description]", description);
    if (longDescription) formData.append("data[LongDescription]", longDescription);
    if (price) formData.append("data[Price]", price);
    if (discountPrice) formData.append("data[DiscountPrice]", discountPrice);
    if (seoKeywords) formData.append("data[SEOKeywords]", seoKeywords);
    if (materialOptions)
      formData.append("data[MaterialOptions]", materialOptions);

    try {
      const res = await fetch(
        `http://localhost:1337/api/products/${documentId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("Updated Product:", data);
      setOpenDialog(true); // Open the success dialog
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product.");
    }
  };

  if (!existingData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">Description</label>
          <input
            type="text"
            name="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Description</label>
          {/* <input
            type="text"
            name="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          /> */}
           <ClaraMarkdownRichEditor
            onChange={(value) => setLongDescription(value)}
            value={longDescription || ""}
          />
        </div>

        <div>
          <label className="block">Price</label>
          <input
            type="number"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">Discount Price</label>
          <input
            type="number"
            name="DiscountPrice"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">SEO Keywords</label>
          <input
            type="text"
            name="SEOKeywords"
            value={seoKeywords}
            onChange={(e) => setSEOKeywords(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">Material Options</label>
          <input
            type="text"
            name="MaterialOptions"
            value={materialOptions}
            onChange={(e) => setMaterialOptions(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Product
        </button>
      </form>

      {/* Dialog for success message */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>
              Your data has been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button className="btn-close">Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
