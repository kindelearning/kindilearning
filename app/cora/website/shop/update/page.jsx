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
import { Button } from "@/components/ui/button";

export default function ProductUpdateForm({ documentId }) {
  const [existingData, setExistingData] = useState(null);
  const [additionalField, setAdditionalField] = useState("");
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
          `https://lionfish-app-98urn.ondigitalocean.app/api/products/${documentId}?populate=*`
        );
        const data = await res.json();
        if (res.ok) {
          setExistingData(data.data);
          setName(data.data.Name || "");
          setDescription(data.data.Description || "");
          setLongDescription(data.data.LongDescription || "");
          setPrice(data.data.Price || "");
          setDiscountPrice(data.data.DiscountPrice || "");
          setAdditionalField(data.data.additionalField || "");
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
    const formattedGallery = gallery.map((id) => ({ id }));

    const payload = {
      data: {
        Name: name,
        Description: description,
        LongDescription: longDescription,
        Price: price,
        DiscountPrice: discountPrice,
        additionalField: additionalField,
        SEOKeywords: seoKeywords,
        Gallery: formattedGallery,
        // Gallery: [{ id: 2 }, { id: 4 }, { id: 5 }],
        FeaturedImage: media?.id || null,
        MaterialOptions: materialOptions,
      },
    };
    console.log("Payload Created", payload);

    try {
      const res = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/products/${documentId}`,
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

  const handleMediaSelect = (selectedMediaIds) => {
    setMedia(selectedMediaIds); // Store the selected media object
  };

  const handleGallerySelect = async (selectedMediaIds) => {
    console.log("Selected Media IDs:", selectedMediaIds);
    setGallery(selectedMediaIds);
  };

  if (!existingData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex w-full justify-between items-center gap-2">
          <div className="flex gap-4 justify-between items-start w-full">
            <div className="w-full p-2 bg-[#f3f3f3a8] rounded-lg">
              <label>Media:</label>

              <div className="flex justify-between items-center max-w-full">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Select Media
                </h1>

                {/* Media Count Display */}
                <div className="flex max-w-full justify-between items-center gap-2">
                  <div className="justify-center items-center text-lg font-semibold transition-colors duration-300 ">
                    {media ? (
                      <div className="flex flex-col">
                        <img
                          // src={media.url}
                          src={`https://lionfish-app-98urn.ondigitalocean.app${media.url}`}
                          className="w-32 h-32 object-cover rounded-full flex "
                        />
                        <p>{media.name}</p>
                      </div>
                    ) : (
                      <p className="mt-4 text-gray-500 text-center">
                        Not selected anything
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <MediaSelector onMediaSelect={handleMediaSelect} />
            </div>

            <div className="w-full p-2 bg-[#ffe9e9a8] rounded-lg">
              <label>Gallery:</label>
              <div className="flex max-w-full justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Media Gallery
                </h1>

                {/* Minimal count display */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-500 text-white text-lg font-semibold transition-colors duration-300 hover:bg-indigo-600">
                    {gallery && <>{gallery.length}</>}
                  </div>
                  <span className="text-gray-600 text-sm">Items Selected</span>
                </div>
              </div>
              <MultiMediaSelector onMediaSelect={handleGallerySelect} />{" "}
              {/* If no media selected, show a placeholder */}
              {gallery.length === 0 && (
                <p className="mt-4 text-gray-500 text-center">
                  No items selected yet.
                </p>
              )}
            </div>
          </div>
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
          <label className="block mb-2">
            Is this For App?{" "}
            <span className="text-red">
              Yes- if you want to display it on App home page
            </span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="additionalField"
                value="shop"
                checked={additionalField === "shop"}
                onChange={() => setAdditionalField("shop")}
                className="cursor-pointer"
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="additionalField"
                value="notShop"
                checked={additionalField === "notShop"}
                onChange={() => setAdditionalField("notShop")}
                className="cursor-pointer"
              />
              No
            </label>
          </div>
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

        {/* <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Product
        </button> */}
        <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-center py-4 flex flex-row">
          <div className="claracontainer flex flex-row  justify-between w-full items-center gap-4 px-4">
            <Button type="submit">Update Product</Button>
          </div>
        </section>
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
