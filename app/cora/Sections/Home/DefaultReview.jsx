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
import { PenIcon, PenLineIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DefaultReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/reviews?populate=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data?.data || []); // Update state with fetched reviews
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  console.log("Review in Cora", reviews);

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

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex w-full justify-end">
        <CreateReviewForm />
      </div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-lg shadow-md text-white"
            style={{
              backgroundColor: review.bgcolor || "#4A90E2", // Fallback color
            }}
          >
            {/* Updta eme */}
            <Dialog>
              <DialogTrigger>
                <PenIcon className="text-white" />
              </DialogTrigger>
              <DialogContent className="max-w-[800px] mmx-h-[600px] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Update Status</DialogTitle>
                  <DialogDescription>
                    <UpdateReviewForm reviewId={review.documentId} />
                  </DialogDescription>
                </DialogHeader>
                {/* <DialogClose className="bg-red text-white rounded-md px-4 py-2">
                  Close
                </DialogClose> */}
              </DialogContent>
            </Dialog>
            {/* Delete Review */}
            <DeleteReview reviewId={review.documentId} />

            <h3
              style={{
                color: review.MainLineColor || "#FFFFFF",
              }}
              className="text-lg font-bold"
            >
              {review.MainLine}
            </h3>
            <h4
              style={{
                color: review.SecondLineColor || "#FFFFFF",
              }}
              className="text-lg font-bold"
            >
              {review.SecondLine}
            </h4>

            <p
              className="text-lg text-white text-start md:text-base sm:text-sm"
              dangerouslySetInnerHTML={{
                __html: review?.Body || "No content available",
              }}
            />
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

export function UpdateReviewForm({ reviewId }) {
  // Individual state for each field
  const [mainLine, setMainLine] = useState("");
  const [mainLineColor, setMainLineColor] = useState("#000000");
  const [secondLine, setSecondLine] = useState("");
  const [secondLineColor, setSecondLineColor] = useState("#000000");
  const [body, setBody] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current review data on component mount
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/reviews/${reviewId}?populate=*`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch review data");
        }
        const data = await response.json();
        const review = data.data;

        setMainLine(review?.MainLine || "");
        setMainLineColor(review?.MainLineColor || "#000000");
        setSecondLine(review?.SecondLine || "");
        setSecondLineColor(review?.SecondLineColor || "#000000");
        setBody(review?.Body || "");
        setBgColor(review?.bgcolor || "#ffffff");

        setLoading(false);
      } catch (err) {
        console.error("Error fetching review data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReview();
  }, [reviewId]);

  // Submit updated data to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      data: {
        MainLine: mainLine,
        MainLineColor: mainLineColor,
        SecondLine: secondLine,
        SecondLineColor: secondLineColor,
        Body: body,
        bgcolor: bgColor,
      },
    };

    console.log("Payload Created:", payload);

    try {
      const res = await fetch(`https://lionfish-app-98urn.ondigitalocean.app/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Updated Review Content:", data);
      alert("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Error updating review.");
    }
  };

  if (loading) return <p>Loading review data...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleEditorChange = (newValue) => {
    setBody(newValue); // Update body state with the new value from the editor
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg"
    >
      <div>
        <label className="block font-medium">Main Line</label>
        <input
          type="text"
          value={mainLine}
          onChange={(e) => setMainLine(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Main Line Color</label>
        <input
          type="color"
          value={mainLineColor}
          onChange={(e) => setMainLineColor(e.target.value)}
          className="w-full h-10 p-1 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Second Line</label>
        <input
          type="text"
          value={secondLine}
          onChange={(e) => setSecondLine(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Second Line Color</label>
        <input
          type="color"
          value={secondLineColor}
          onChange={(e) => setSecondLineColor(e.target.value)}
          className="w-full h-10 p-1 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Body</label>
        {/* <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded"
        /> */}
        <ClaraMarkdownRichEditor
          name="Body"
          value={body || ""} // Ensure the value is always a string
          onChange={handleEditorChange}
        />
      </div>
      <div>
        <label className="block font-medium">Background Color</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full h-10 p-1 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Review
      </button>
    </form>
  );
}

export function DeleteReview({ reviewId }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Review deleted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error deleting review:", errorData);
        alert("Failed to delete the review. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to delete the review.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <TrashIcon className="text-white" />
    </button>
  );
}

export function CreateReviewForm() {
  const [mainLine, setMainLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [body, setBody] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [mainLineColor, setMainLineColor] = useState("#000000");
  const [secondLineColor, setSecondLineColor] = useState("#000000");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      data: {
        MainLine: mainLine,
        SecondLine: secondLine,
        Body: body,
        bgcolor: bgColor,
        MainLineColor: mainLineColor,
        SecondLineColor: secondLineColor,
      },
    };

    console.log("Payload Created:", payload);

    try {
      const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Review Created:", data);
        // onCreateSuccess(); // Call parent callback to refresh data or provide feedback
        setOpen(false); // Close the dialog
        resetForm(); // Clear the form
      } else {
        const errorData = await response.json();
        console.error("Error creating review:", errorData);
        alert("Failed to create the review. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the review.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (newValue) => {
    setBody(newValue); // Update body state with the new value from the editor
  };

  const resetForm = () => {
    setMainLine("");
    setSecondLine("");
    setBody("");
    setBgColor("#ffffff");
    setMainLineColor("#000000");
    setSecondLineColor("#000000");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create New Review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mainLine">Main Line</label>
            <Input
              id="mainLine"
              value={mainLine}
              onChange={(e) => setMainLine(e.target.value)}
              placeholder="Enter main line"
              required
            />
          </div>
          <div>
            <label htmlFor="secondLine">Second Line</label>
            <Input
              id="secondLine"
              value={secondLine}
              onChange={(e) => setSecondLine(e.target.value)}
              placeholder="Enter second line"
              required
            />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            {/* <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter the review body"
              required
            /> */}
            <ClaraMarkdownRichEditor
              name="Body"
              value={body || ""} // Ensure the value is always a string
              onChange={handleEditorChange}
            />
          </div>
          <div>
            <label htmlFor="bgColor">Background Color</label>
            <Input
              id="bgColor"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="mainLineColor">Main Line Color</label>
            <Input
              id="mainLineColor"
              type="color"
              value={mainLineColor}
              onChange={(e) => setMainLineColor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="secondLineColor">Second Line Color</label>
            <Input
              id="secondLineColor"
              type="color"
              value={secondLineColor}
              onChange={(e) => setSecondLineColor(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Review"}
            </Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
