"use client";

import {
  ActivityImage,
  creditCard,
  ProductImage,
  PromotionalImage,
  Ratings,
  ShopImage,
} from "@/public/Images";
import { ProductGrid, ProductImages, ReviewGrid } from "..";
import Image from "next/image";
import { GroupChip, QuantityControl } from "..";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewData = {
      name,
      email,
      content,
      rating: parseInt(rating, 10),
    };

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          `Failed to submit review: ${data.message || "Unknown error"}`
        );
        return;
      }

      setMessage("Review submitted successfully!");
      setName("");
      setEmail("");
      setContent("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <form
      className="w-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="claracontainer w-full py-6 flex flex-row gap-4 justify-between items-start">
        <Image
          alt="Kindi"
          src={ShopImage}
          className="w-[260px] hidden lg:flex h-[200px]"
        />
        <div className="flex w-full flex-col gap-2 justify-start items-start claracontainer">
          {/* <div className="text-start text-[#3f3a64] text-[20px] lg:text-4xl font-semibold font-fredoka capitalize">
              Wooden geometrical montessori puzzle
            </div>
            <div className="text-[#757575] text-[16px] lg:text-2xl text-start font-light font-fredoka">
              Lorem ipsum dolor sit amet consectetur. At lectus diam a sit
              aliquet sollicitudin sagittis volutpat....
            </div> */}
          <div className="claracontainer w-full flex flex-col gap-2 justify-between items-start">
            <div className="w-full text-[#3f3a64] clarabodyTwo font-fredoka capitalize">
              Add your Comments
            </div>{" "}
            <Textarea
              placeholder="Add your review..."
              className="w-full p-4 text=[#0f172a] py-4 text-start rounded-lg border-2 border-[#b4b4b4] justify-center items-center gap-2.5 inline-flex"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Rating"
              value={rating}
              className="border-2 border-[#b4b4b4] "
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full">
            <div className="text-center text-red text-[12px] lg:text-[20px] font-bold font-['Montserrat']">
              Give us Rating out of 5-Stars
            </div>
            <div className="flex gap-1">
              <Image src={Ratings} alt="Rating" />
              <Image src={Ratings} alt="Rating" />
              <Image src={Ratings} alt="Rating" />
              <Image src={Ratings} alt="Rating" />
              <Image src={Ratings} alt="Rating" />
            </div>
          </div>
        </div>
      </div>

      <Button className="clarabutton bg-red hover:bg-hoverRed" type="submit">
        Submit Review
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
};

import { getProductById, submitReview } from "@/lib/hygraph";
import NotFound from "@/app/not-found";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/app/context/CartContext";

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const { addToCart } = useCart();

  const product = await getProductById(id);

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    addToCart({
      id: product.id,
      title: product.title,
      price: product.salePrice,
      image: product.productImages[0]?.url,
      quantity: 1,
    });
  };

  if (!product) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] lg:bg-[#eaeaf5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          {/* Row 1 */}
          <div className="flex w-full flex-col md:flex-col lg:flex-row xl:flex-row gap-8 justify-between items-start">
            {/* column1 */}
            <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
              <ProductImages
                images={product.productImages.map((img) => img.url)}
              />
            </div>
            {/* col 2 */}
            <div className="claracontainer py-0 flex w-full flex-col lg:max-w-[48%] justify-between items-start gap-4">
              <div className="w-full hidden md:hidden lg:flex text-[#3f3a64] text-[32px] leading-normal font-semibold font-fredoka capitalize">
                {product.title}
              </div>
              <div className="claracontainer w-full flex md:flex lg:hidden xl:hidden flex-row p-0 justify-start items-start gap-1">
                {/* Product Title */}
                <div className="w-full flex md:flex lg:hidden xl:hidden text-[#0a1932] text-[28px] font-semibold font-['Fredoka'] leading-[30px]">
                  {product.title}
                </div>
              </div>
              {/* Product Pricing */}
              <div className="claracontainer w-full flex flex-row p-0 justify-start items-start gap-1">
                <div className="w-[max-content] text-red text-[40px] leading-[40px]  font-semibold font-fredoka ">
                  ${product.salePrice}
                </div>
                <div className="w-full text-gray-500 text-[24px] leading-[24px] font-semibold font-fredoka line-through ">
                  ${product.actualPrice}
                </div>
              </div>
              {/* ratings */}
              <div className="w-full flex gap-1 items-center claracontainer">
                <div className="flex gap-1">
                  <Image src={Ratings} alt="Rating" />
                  <Image src={Ratings} alt="Rating" />
                  <Image src={Ratings} alt="Rating" />
                  <Image src={Ratings} alt="Rating" />
                  <Image src={Ratings} alt="Rating" />
                </div>
                <div className="text-zinc-600 w-[max-content] text-sm font-medium font-fredoka leading-[20px]">
                  157 Reviews
                </div>
              </div>
              {/* COntent */}
              <div className="claracontainer">
                <div className="w-[max-content] text-[#0a1932] text-[32px] font-semibold font-fredoka leading-tight">
                  Description
                </div>
                <div className="w-full text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description.html,
                    }}
                  />
                </div>
              </div>
              {/* variants */}
              <div className="claracontainer flex flex-col gap-1">
                <div className="w-[max-content] text-[#0a1932] text-[32px] font-semibold font-fredoka leading-tight">
                  Select Variant
                </div>
                {/* <GroupChip
                  options={options}
                  selectedOption={selectedOption}
                  onChange={handleOptionChange}
                /> */}
                To be added soon
              </div>
              {/* CTA */}
              <div className="claracontainer flex flex-col w-full gap-1">
                <div className="claracontainer w-full justify-between items-start flex flex-row gap-4">
                  <QuantityControl />
                  <div className="w-full flex flex-col gap-1">
                    <Button
                      onClick={handleAddToCart}
                      className="bg-red w-full rounded-[16px] border-2 border-[white]"
                    >
                      Add to Cart
                    </Button>
                    <div className="w-full flex flex-row justify-start items-center gap-2">
                      <Image alt="Kindi" src={creditCard} className="w-4 h-4" />
                      <div className="text-zinc-600 text-sm text-start font-medium font-fredoka leading-[20px]">
                        100% Secured Payment
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex w-full flex-col justify-start items-center">
            <div className="text-[#0a1932] text-[20px] lg:text-[28px] font-semibold font-fredoka text-start w-full ">
              Recently Viewed
            </div>
            <ProductGrid />
          </div>
          {/* Row 3 - Reviews */}
          <div className="flex w-full flex-col justify-start items-center">
            <div className="flex justify-between w-full items-center">
              <div className="text-[#0a1932] text-[20px] lg:text-[28px]  font-semibold font-fredoka text-start w-full leading-loose">
                Customer Reviews
              </div>
              <Dialog className="w-full flex flex-col justify-center items-center">
                <DialogTrigger className="text-red w-full text-end text-xl font-semibold font-fredoka leading-none">
                  {" "}
                  Write a Review
                </DialogTrigger>
                <DialogContent className="claracontainer w-full rounded-[24px] gap-6 min-h-[600px] justify-start items-start px-4">
                  <DialogHeader className="w-full">
                    <DialogTitle className="w-full">
                      {" "}
                      <div className="text-center text-red claraheading font-semibold capitalize ">
                        Write a Review
                      </div>
                    </DialogTitle>
                    <DialogDescription className="w-full">
                      <ReviewForm />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <ReviewGrid />
          </div>
          {/* Row 4 */}
          <div className="flex w-full flex-col justify-start items-center">
            <div className="text-[#0a1932] text-[20px] lg:text-[28px]  font-semibold font-fredoka text-start w-full leading-loose">
              You May also like
            </div>
            <ProductGrid />
          </div>
        </div>
      </section>
      {/* Row 5 - Sticky CTA Mobile */}
      <div className="flex w-full lg:hidden md:hidden flex-col justify-start items-center">
        <div className="claracontainer px-4 py-4 w-full bg-[#ffffff] rounded-t-[24px] shadow-upper sticky bottom-0 z-12 justify-between items-center flex flex-row gap-4">
          <QuantityControl />
          <Link className="w-full" href="/shop/cart">
            <Button className="bg-red w-full rounded-[16px] border-2 border-[white]">
              Add to Cart
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
