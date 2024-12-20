"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProductById } from "@/lib/hygraph";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ReviewForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewData = {
      name,
      email,
      content,
      rating: parseInt(rating, 10),
    };

    setIsLoading(true); // Start loading

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
        setIsLoading(false); // Stop loading on error
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
    setIsLoading(false); // Stop loading after submission
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true); // Start loading while fetching product
      try {
        const productData = await getProductById(id);
        setProduct(productData); // Update state with fetched product data
      } catch (error) {
        setError("Failed to load product"); // Handle error
      }
      setIsLoading(false); // Stop loading after fetching
    };

    fetchProduct(); // Call the async function

    return () => {
      setProduct(null);
      setError(null);
    };
  }, [id]);

  if (isLoading && !product) {
    return <div>Loading...</div>; // Display loading state while product is being fetched
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <form
      className="w-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="claracontainer w-full py-6 flex flex-col gap-4 justify-between items-start">
        <div className="w-full object-contain overflow-clip">
          <Image
            alt="Kindi"
            width={600}
            height={400}
            src={product.thumbnail.url || "/default-image.png"}
            className="w-full rounded-[8px] object-cover overflow-clip flex h-[200px]"
          />
        </div>
        <div className="flex w-full flex-col gap-2 justify-start items-start claracontainer">
          <div className="claracontainer w-full flex flex-col gap-2 justify-between items-start">
            <div className="w-full text-[#3f3a64] clarabodyTwo font-fredoka capitalize">
              Add your Comments
            </div>
            <div className="w-full flex lg:flex-row flex-col gap-2 justify-between items-center">
              <Input
                type="text"
                placeholder="Name..."
                value={name}
                className="border-2 focus:border-black focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white border-[#b4b4b4]"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                className="border-2 focus:border-black focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white border-[#b4b4b4]"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Add your review..."
              className="w-full p-4 focus-within:ring-0 focus-visible:ring-0 ring-white ring-offset-0 text-[#0f172a] py-4 text-start rounded-lg border-2 border-[#b4b4b4] justify-center items-center gap-2.5 inline-flex"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="flex flex-row justify-between items-center w-full">
              <div className="text-center text-red clarabodyTwo">
                Give us Rating out of 5-Stars
              </div>
              <div className="flex gap-1 items-center">
                {[...Array(5)].map((_, index) => (
                  <Image
                    key={index}
                    className="w-2 h-2 lg:w-4 lg:h-4"
                    src={Ratings}
                    alt="Rating"
                  />
                ))}
              </div>
            </div>
            <Input
              type="number"
              placeholder="Rating"
              value={rating}
              className="border-2 focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white border-[#b4b4b4]"
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
            />
          </div>
        </div>
      </div>

      <Button
        disabled={isLoading}
        className="clarabutton bg-red hover:bg-hoverRed"
        type="submit"
      >
        {isLoading ? (
          <span className="loader"></span> // Add a simple loading spinner or text
        ) : (
          "Submit Review"
        )}
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
};
