"use client";
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
import RichTextRender from "@/app/Sections/Global/RichTextRender";
import { useEffect, useState } from "react";
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";

export default function DefaultReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/defaultreview?populate=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data?.data?.Content || []); // Update state with fetched reviews
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Display loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading reviews...
        </p>
      </div>
    );
  }

  // Display error state with fallback message
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <p className="text-xl font-semibold text-red-600">{error}</p>
        <p className="text-gray-500 mt-2">
          Please try refreshing the page or contact support.
        </p>
      </div>
    );
  }

  // Render the reviews
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-lg shadow-md text-white"
            style={{
              backgroundColor: review.bgcolor || "#4A90E2", // Fallback color
            }}
          >
            <h3 className="text-lg font-bold">{review.featuredText}</h3>
            <h4 className="text-md font-semibold mt-2">{review.Title}</h4>
            <p className="text-sm mt-2 opacity-90">{review.body}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">
          No reviews are available at the moment.
        </p>
      )}
    </div>
  );
}

export function UpdateReviewForm() {
  const [reviews, setReviews] = useState([]);
  const [newFeaturedText, setNewFeaturedText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newBgColor, setNewBgColor] = useState("#ffffff");
  const [isEditing, setIsEditing] = useState(null); // Track editing review ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from the server
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://upbeat-life-04fe8098b1.strapiapp.com/api/defaultreview?populate=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data?.data?.Content || []);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Handle Add or Edit submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      featuredText: newFeaturedText,
      Title: newTitle,
      body: newBody,
      bgcolor: newBgColor,
    };

    if (isEditing === null) {
      // Add new review
      setReviews([...reviews, { ...newReview, id: Date.now() }]);
    } else {
      // Edit existing review
      setReviews(
        reviews.map((review) =>
          review.id === isEditing ? { ...review, ...newReview } : review
        )
      );
    }

    // Reset the form and state after submission
    resetForm();
    setIsEditing(null); // Reset edit mode
  };

  // Reset form fields
  const resetForm = () => {
    setNewFeaturedText("");
    setNewTitle("");
    setNewBody("");
    setNewBgColor("#ffffff");
  };

  // Handle Edit button click
  const handleEdit = (review) => {
    setNewFeaturedText(review.featuredText);
    setNewTitle(review.Title);
    setNewBody(review.body);
    setNewBgColor(review.bgcolor);
    setIsEditing(review.id); // Set the editing ID
  };

  // Handle Delete button click
  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  // Handle delete of individual field
  const handleDeleteField = (field, id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, [field]: "" } : review
      )
    );
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-center">
        {isEditing ? "Edit Review" : "Add New Review"}
      </h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="featuredText" className="block text-sm font-medium">
            Featured Text
          </label>
          <input
            type="text"
            id="featuredText"
            value={newFeaturedText}
            onChange={(e) => setNewFeaturedText(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="Title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium">
            Body
          </label>
          <textarea
            id="body"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="bgcolor" className="block text-sm font-medium">
            Background Color
          </label>
          <input
            type="color"
            id="bgcolor"
            value={newBgColor}
            onChange={(e) => setNewBgColor(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            {isEditing ? "Update Review" : "Add Review"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(null)}
              className="text-gray-500 underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Display Existing Reviews */}
      <div className="space-y-4 mt-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 rounded-lg shadow-md text-white"
              style={{ backgroundColor: review.bgcolor }}
            >
              <h3 className="text-lg font-bold">{review.featuredText}</h3>
              <h4 className="text-md font-semibold">{review.Title}</h4>
              <p>{review.body}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(review)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleDeleteField("featuredText", review.id)}
                  className="bg-gray-500 text-white py-1 px-3 rounded-lg ml-2"
                >
                  Delete Featured Text
                </button>
                <button
                  onClick={() => handleDeleteField("Title", review.id)}
                  className="bg-gray-500 text-white py-1 px-3 rounded-lg ml-2"
                >
                  Delete Title
                </button>
                <button
                  onClick={() => handleDeleteField("body", review.id)}
                  className="bg-gray-500 text-white py-1 px-3 rounded-lg ml-2"
                >
                  Delete Body
                </button>
                <button
                  onClick={() => handleDeleteField("bgcolor", review.id)}
                  className="bg-gray-500 text-white py-1 px-3 rounded-lg ml-2"
                >
                  Delete Background Color
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
}

// <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Update Status</DialogTitle>
//       <DialogDescription>{dialogMessage}</DialogDescription>
//     </DialogHeader>
//     <DialogClose
//       onClick={() => setIsDialogOpen(false)}
//       className="bg-red text-white rounded-md px-4 py-2"
//     >
//       Close
//     </DialogClose>
//   </DialogContent>
// </Dialog>;
