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
import MediaSelector, {
  MultiMediaSelector,
} from "../../media/Section/MediaSelector";

export default function ProductUpdateForm({ documentId }) {
  const [existingData, setExistingData] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [seoKeywords, setSEOKeywords] = useState("");
  const [materialOptions, setMaterialOptions] = useState("");
  const [media, setMedia] = useState(null); // Media state
  const [gallery, setGallery] = useState([]); // Media state
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(
          `https://upbeat-life-04fe8098b1.strapiapp.com/api/products/${documentId}?populate=*`
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
          setMedia(data.data?.FeaturedImage?.id || null); // Set the media ID or null if no media is selected
          setGallery(
            data.data?.Gallery?.map((media) => ({ id: media.id })) || []
          );
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

    const payload = {
      data: {
        Name: name,
        Description: description,
        LongDescription: longDescription,
        Price: price,
        DiscountPrice: discountPrice,
        SEOKeywords: seoKeywords,
        Gallery: gallery.map((mediaItem) => ({
          id: mediaItem.id,
        })),
        FeaturedImage: media?.id || null,
        MaterialOptions: materialOptions,
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(
        `https://upbeat-life-04fe8098b1.strapiapp.com/api/products/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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

  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia); // Store the selected media object
  };

  const handleGalleryMediaSelect = (selectedMedia) => {
    console.log("Selected Media for Gallery (Before Mapping):", selectedMedia);
    if (!selectedMedia || !Array.isArray(selectedMedia)) {
      console.error("Invalid media selection:", selectedMedia);
      return;
    }
    setGallery(selectedMedia);
  };

  if (!existingData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <img
                // src={media.url}
                src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
                className="w-32 h-32 object-cover"
              />
              <p>{media.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleMediaSelect} />
        </div>

        <div>
          <label>Gallery:</label>
          {/* {gallery?.map((media) => (
            <div key={media.id} className="relative">
              <img
                src={`https://upbeat-life-04fe8098b1.strapiapp.com${media.url}`}
                className="w-32 h-32 object-cover"
              />
              <p className="text-sm mt-2">{media.name}</p>
            </div>
          ))} */}
          <MultiMediaSelector onMediaSelect={handleGalleryMediaSelect} />
        </div>
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
          <ClaraMarkdownRichEditor
            onChange={(value) => setDescription(value)}
            value={description || ""}
          />
        </div>
        <div>
          <label className="block">Meta Description</label>

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
