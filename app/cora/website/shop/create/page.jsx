"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
// import { FileInput } from "@/components/ui/file-input"; // This can be a custom component for uploading media files
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
import MediaSelector from "../../media/Section/MediaSelector";
import ClaraMarkdownRichEditor from "@/app/cora/Sections/TextEditor/ClaraMarkdownRichEditor";

// export function CreateProductPage2() {
//   const [productData, setProductData] = useState({
//     name: "",
//     description: "",
//     longDescription: "",
//     price: "",
//     discountPrice: "",
//     metaDescription: "",
//     seoKeywords: "",
//     variants: "",
//     inStock: false,
//     keywords: "",
//   });

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle checkbox changes (inStock)
//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setProductData((prevData) => ({ ...prevData, [name]: checked }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare the data to send to Strapi API
//     const productPayload = {
//       data: {
//         Name: productData.name,
//         Description: productData.description,
//         LongDescription: productData.longDescription,
//         Price: parseFloat(productData.price),
//         DiscountPrice: productData.discountPrice
//           ? parseFloat(productData.discountPrice)
//           : null,
//         MetaDescription: productData.metaDescription,
//         SEOKeywords: productData.seoKeywords,
//         Variants: productData.variants ? JSON.parse(productData.variants) : {},
//         inStock: productData.inStock,
//         Keywords: productData.keywords,
//       },
//     };

//     try {
//       const res = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productPayload),
//       });

//       if (!res.ok) throw new Error("Failed to create product");

//       // Clear the form after successful submission
//       setProductData({
//         name: "",
//         description: "",
//         longDescription: "",
//         price: "",
//         discountPrice: "",
//         metaDescription: "",
//         seoKeywords: "",
//         variants: "",
//         inStock: false,
//         keywords: "",
//       });

//       alert("Product created successfully!");
//     } catch (error) {
//       console.error("Error creating product:", error);
//       alert("There was an error creating the product.");
//     }
//   };

//   return (
//     <>
//       <section className="p-8 min-h-screen font-fredoka bg-gray-50">
//         <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-semibold text-gray-700 mb-4">
//             Create New Product
//           </h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-600">Name</label>
//                 <Input
//                   type="text"
//                   name="name"
//                   value={productData.name}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600">Description</label>
//                 <Input
//                   type="text"
//                   name="description"
//                   value={productData.description}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600">Long Description</label>
//                 <Textarea
//                   name="longDescription"
//                   value={productData.longDescription}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600">Price</label>
//                 <Input
//                   type="number"
//                   name="price"
//                   value={productData.price}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600">Discount Price</label>
//                 <Input
//                   type="number"
//                   name="discountPrice"
//                   value={productData.discountPrice}
//                   onChange={handleInputChange}
//                   className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600">Meta Description</label>
//                 <Input
//                   type="text"
//                   name="metaDescription"
//                   value={productData.metaDescription}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600">SEO Keywords</label>
//                 <Input
//                   type="text"
//                   name="seoKeywords"
//                   value={productData.seoKeywords}
//                   onChange={handleInputChange}
//                   className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600">Variants (JSON)</label>
//                 <Textarea
//                   name="variants"
//                   value={productData.variants}
//                   onChange={handleInputChange}
//                   placeholder='{"color": "red", "size": "M"}'
//                   className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="w-fit gap-2 flex">
//                 <input
//                   type="checkbox"
//                   name="inStock"
//                   checked={productData.inStock}
//                   onChange={handleCheckboxChange}
//                   className=" w-[max-content] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <label className="block text-gray-600">In Stock</label>
//               </div>

//               <div>
//                 <label className="block text-gray-600">
//                   Keywords (Rich Text)
//                 </label>
//                 <Textarea
//                   name="keywords"
//                   value={productData.keywords}
//                   onChange={handleInputChange}
//                   className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <Button type="submit">Create Product</Button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeOfToy, setTypeOfToy] = useState("");
  const [educationalFeatures, setEducationalFeatures] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [skillOptions, setSkillOptions] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [seoKeywords, setSEOKeywords] = useState("");
  const [materialOptions, setMaterialOptions] = useState("");
  const [gallery, setGallery] = useState(null); // Media state
  const [media, setMedia] = useState(null); // Media state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // To distinguish between success/error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProducts = {
      Name: name,
      Description: description,
      LongDescription: longDescription,
      Price: price,
      DiscountPrice: discountPrice,
      MetaDescription: metaDescription,
      SEOKeywords: seoKeywords,
      Keywords: seoKeywords,
      SkillOptions: skillOptions,
      MaterialOptions: materialOptions,
      EducationalFeatures: educationalFeatures,
      DiscountType: discountType,
      TypeOfToy: typeOfToy,
      FeaturedImage: media?.id || null, // Use media ID if selected
      Gallery: gallery?.id || null, // Use media ID if selected
    };

    console.log("New Badge data", newProducts);
    try {
      const response = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newProducts }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setDialogMessage("Product created successfully!");
        setDialogType("success");

        setName("");
        setDescription("");
        setTypeOfToy("");
        setEducationalFeatures("");
        setDiscountPrice("");
        setDiscountType("");
        setLongDescription("");
        setSkillOptions("");
        setSEOKeywords("");
        setPrice("");
        setMaterialOptions("");
        setMetaDescription("");
        setGallery("");
        setMedia(null);
      } else {
        setDialogMessage(
          "Failed to create badge. Please check the input and try again."
        );
        setDialogType("error");
        throw new Error("Failed to create badge");
      }
    } catch (error) {
      console.error("Error:", error.message); // Log any error that occurs
      setDialogMessage(error.message);
      setDialogType("error");
    }

    setIsDialogOpen(true); // Open dialog after submit
  };
  const handleMediaSelect = (selectedMedia) => {
    setMedia(selectedMedia); // Store the selected media object
  };
  const handleGalleryMediaSelect = (selectedMedia) => {
    setGallery(selectedMedia); // Store the selected media object
  };
  return (
    <div className="p-8 font-fredoka bg-[#ffffff]">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Media */}
        <div>
          <label>Media:</label>
          {media ? (
            <div className="mt-4">
              <img
                src={media.url}
                // src={`https://proper-fun-404805c7d9.strapiapp.com${media.url}`}
                className="w-32 h-32 object-cover"
              />
              <p>{media.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleMediaSelect} />
        </div>
        {/* Gallery */}
        <div>
          <label>Gallery:</label>
          {gallery ? (
            <div className="mt-4">
              <img
                // src={media.url}
                src={`https://proper-fun-404805c7d9.strapiapp.com${gallery.url}`}
                className="w-32 h-32 object-cover"
              />
              <p>{gallery.name}</p>
            </div>
          ) : (
            <p>Not selected anything</p>
          )}
          <MediaSelector onMediaSelect={handleGalleryMediaSelect} />
        </div>

        <div>
          <label htmlFor="Name" className="block">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="flex gap-1 justify-start items-start">
          <div className="flex w-full  flex-col gap-1 justify-start items-start">
            <label htmlFor="typeOfToy" className="block">
              Type of Toy
            </label>
            <input
              type="text"
              id="typeOfToy"
              name="typeOfToy"
              value={typeOfToy}
              onChange={(e) => setTypeOfToy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex w-full  flex-col gap-1 justify-start items-start">
            <label htmlFor="educationalFeatures" className="block">
              Educational Features
            </label>
            <input
              type="text"
              id="educationalFeatures"
              name="educationalFeatures"
              value={educationalFeatures}
              onChange={(e) => setEducationalFeatures(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <div className="flex gap-1 justify-start items-start">
          <div className="flex w-full flex-col gap-1 justify-start items-start">
            <label htmlFor="discountType" className="block">
              Discount Type
            </label>
            <input
              type="text"
              id="discountType"
              name="discountType"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex w-full  flex-col gap-1 justify-start items-start">
            <label htmlFor="skillOptions" className="block">
              Skill Options
            </label>
            <input
              type="text"
              id="skillOptions"
              name="skillOptions"
              value={skillOptions}
              onChange={(e) => setSkillOptions(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-start items-start">
          <label htmlFor="NlongDescriptioname" className="block">
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
           <ClaraMarkdownRichEditor
            value={longDescription}
            onChange={(newContent) => setLongDescription(newContent)}
            placeholder="Enter a description"
          />
        </div>
        <div className="flex gap-1 justify-start items-start">
          <div className="flex w-full  flex-col gap-1 justify-start items-start">
            <label htmlFor="price" className="block">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex  w-full  flex-col gap-1 justify-start items-start">
            <label htmlFor="discountPrice" className="block">
              Discount Price
            </label>
            <input
              type="number"
              id="discountPrice"
              name="discountPrice"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <div className="flex w-full   flex-col gap-1 justify-start items-start">
          <label htmlFor="metaDescription" className="block">
            Meta Description
          </label>
          {/* <input
            type="text"
            id="metaDescription"
            name="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="border p-2 w-full"
            required
          /> */}
          <ClaraMarkdownRichEditor
            value={metaDescription}
            onChange={(newContent) => setMetaDescription(newContent)}
            placeholder="Enter a description"
          />
        </div>
        <div className="flex w-full   flex-col gap-1 justify-start items-start">
          <label htmlFor="seoKeywords" className="block">
            SEO Keywords
          </label>
          <input
            type="text"
            id="seoKeywords"
            name="seoKeywords"
            value={seoKeywords}
            onChange={(e) => setSEOKeywords(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex w-full   flex-col gap-1 justify-start items-start">
          <label htmlFor="materialOptions" className="block">
            Material Options
          </label>
          <input
            type="text"
            id="materialOptions"
            name="materialOptions"
            value={materialOptions}
            onChange={(e) => setMaterialOptions(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex w-full   flex-col gap-1 justify-start items-start">
          <label htmlFor="discountType" className="block">
            Discount Type
          </label>
          <input
            type="text"
            id="discountType"
            name="discountType"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex w-full flex-col gap-1 justify-start items-start">
          <label htmlFor="Description" className="block">
            Description
          </label>
          <ClaraMarkdownRichEditor
            value={description}
            onChange={(newContent) => setDescription(newContent)}
            placeholder="Enter a description"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Create Product
        </button>
      </form>

      {/* Dialog for showing success/error messages */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="hidden">Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage}</DialogTitle>
            <DialogDescription>
              {dialogType === "success"
                ? "Product Created Successfully"
                : "Something went wrong"}
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <button className="px-4 py-2 bg-black text-white rounded">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
