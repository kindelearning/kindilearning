"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Trash2 } from "lucide-react";
import { useEffect } from "react";

const {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} = require("@/components/ui/dialog");
const { useState } = require("react");

export default function RemovePaymentMethodButton({ paymentId }) {
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
        myUsers: [
          // We are setting the parent field to null or to another parentId
          { id: 19 }, // Setting parent ID to null, or you can use another parent ID
        ],
      },
    };

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/payment-methods/${paymentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedKid),
        }
      );

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
          <button className="btn text-red-500" disabled={isSubmitting}>
            {!isSubmitting ? (
              <Trash2 className="text-[black]" />
            ) : (
              "Remove Thsi method"
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button variant="danger"
              className="btn-danger text-red"
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

export const AddPaymentMethodForm = ({ parentId }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [expiryDate, setExpiryDate] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare the payload
    const newKid = {
      data: {
        Name: name,
        Number: number,
        ExpiryDate: expiryDate,
        CVV: cvv,
        myUsers: [
          { id: parentId }, // Sending the parent ID in the payload
        ],
      },
    };

    console.log("New Kid data", newKid);

    try {
      const response = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/payment-methods",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newKid),
        }
      );

      const data = await response.json();
      console.log("Payload sent", data);

      if (response.ok) {
        setName("");
        setCVV("");
        setExpiryDate("");
        setNumber(false);
      } else {
        setError(data.error?.message || "Error adding kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-md shadow-md max-w-md mx-auto"
    >
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      {/* <div>
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="number" className="block">
          number
        </label>
        <input
          type="number"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="expiryDate" className="block">
          expiryDate
        </label>
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="cvv" className="block">
          cvv
        </label>
        <input
          type="number"
          id="cvv"
          name="cvv"
          checked={cvv}
          onChange={(e) => setCVV(e.target.value)}
          className="input"
        />
      </div> */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Cardholder Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="number"
          className="block text-sm font-medium text-gray-700"
        >
          Card Number
        </label>
        <input
          type="text"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          maxLength="16"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="1234 5678 9012 3456"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-gray-700"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            required
            maxLength="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="123"
          />
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn">
        {isSubmitting ? "Adding..." : "Add Kid"}
      </button>
    </form>
  );
};

export const UpdatePaymentDataForm = ({ parentId, paymentId }) => {
  // Managing individual states for the kid's data
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [expiryDate, setExpiryDate] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing kid's data when component mounts
  useEffect(() => {
    const fetchKidData = async () => {
      try {
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/payment-methods/${paymentId}`
        );
        const data = await response.json();
        if (response.ok) {
          const paymentData = data.data;
          setName(paymentData.Name || "");
          setCVV(paymentData.CVV || "");
          setExpiryDate(paymentData.ExpiryDate || "");
          setNumber(paymentData.Number || false);
        } else {
          setError("Failed to fetch kid data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      }
    };

    fetchKidData();
  }, [paymentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare the updated payload
    const updatedpaymentData = {
      data: {
        Name: name,
        Number: number,
        ExpiryDate: expiryDate,
        CVV: cvv,
        myUsers: [
          { id: parentId }, // Sending the parent ID in the payload
        ],
      },
    };

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/payment-methods/${paymentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedpaymentData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Reset form fields after successful update
        setName("");
        setCVV("");
        setExpiryDate("");
        setName(false);
      } else {
        setError(data.error?.message || "Error updating kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-2 rounded-xl  max-w-md mx-auto  border-gray-200"
    >
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="number"
          className="block text-sm font-medium text-gray-700"
        >
          Card Number
        </label>
        <Input
          type="text"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiry Date
          </label>
          <Input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>

        <div className="flex-1">
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-gray-700"
          >
            CVV
          </label>
          <Input
            type="text"
            id="cvv"
            name="cvv"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            required
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200">
        {isSubmitting ? "Updating..." : "Update "}
      </Button>
    </form>
  );
};
