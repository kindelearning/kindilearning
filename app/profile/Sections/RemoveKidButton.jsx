"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, Trash2 } from "lucide-react";
import { useState } from "react";

export default function RemoveKidButton({ kidId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle Remove Kid logic
  const handleRemoveKid = async () => {
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    // Prepare the updated payload to remove the parent reference
    const updatedKid = {
      data: {
        myParent: [
          // We are setting the parent field to null or to another parentId
          { id: 1 }, // Setting parent ID to null, or you can use another parent ID
        ],
      },
    };

    try {
      const response = await fetch(`https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedKid),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true); // Kid is successfully removed from the current parent
        setOpenDialog(false); // Close dialog after success
      } else {
        setError(data.error?.message || "Error removing kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Kid removed successfully!</p>}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button className="btn font-fredoka text-red-500" disabled={isSubmitting}>
            {isSubmitting ? "Removing..." : (
              <Trash2 className="text-red"/>
            )}
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will remove the kid from your
              profile.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-end space-x-2">
            <DialogClose asChild className="btn-secondary">
              <Button>Cancel</Button>
            </DialogClose>

            <Button
            variant="outline"
              className="btn-danger font-fredoka text-red"
              onClick={handleRemoveKid}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Removing..." : "Confirm Remove"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
