"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

export function Accordion({ faq, deleteFAQ }) {
  const [isOpen, setIsOpen] = useState(false); // For opening the accordion
  const [dialogOpen, setDialogOpen] = useState(false); // For opening the delete confirmation dialog

  const handleDelete = () => {
    deleteFAQ(faq.documentId); // Call deleteFAQ function when confirmed
    setDialogOpen(false); // Close the dialog after delete
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="w-full bg-[white] px-4 rounded-[12px] claracontainer">
      <div
        className="flex bg-[white] py-[6px] duration-300 justify-between w-full items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-[#414141] text-[20px] font-medium clarabodyTwo font-fredoka">
          {faq.Question}
        </h2>
        <span
          className={`text-lg text-red ${
            isOpen ? "rotate-90" : ""
          } transition-transform duration-300 transition-max-height`}
        >
          ❯
        </span>
      </div>
      {isOpen && (
        <div className="pb-4 transition-max-height duration-500">
          <p className="clarabodyTwo text-[#7d7d7d]">{faq.Answer}</p>
          {/* Add delete button */}
          <button
            onClick={() => setDialogOpen(true)} // Show confirmation dialog on button click
            className="mt-4 bg-red-500 text-red px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete FAQ
          </button>

          {/* Confirmation Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this FAQ?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Are you sure you want to delete
                  this FAQ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <button
                  onClick={() => setDialogOpen(false)} // Close dialog without deleting
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete} // Confirm delete and call deleteFAQ
                  className="ml-4 bg-red-600 text-red px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

// export function Accordion({ title, description }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="w-full bg-[white] px-4 rounded-[12px] claracontainer">
//       <div
//         className="flex bg-[white] py-[6px] duration-300 justify-between w-full items-center cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <h2 className="text-[#414141] text-[20px] font-medium clarabodyTwo font-fredoka">
//           {title}
//         </h2>
//         <span
//           className={`text-lg text-red ${
//             isOpen ? "rotate-90" : ""
//           } transition-transform duration-300 transition-max-height`}
//         >
//           ❯
//         </span>
//       </div>
//       {isOpen && (
//         <div className="pb-4 transition-max-height duration-500">
//           <p className="clarabodyTwo text-[#7d7d7d]">{description}</p>
//         </div>
//       )}
//     </div>
//   );
// }
