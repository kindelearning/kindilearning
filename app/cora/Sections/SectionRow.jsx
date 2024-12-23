import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Eye, FilePenLine } from "lucide-react";

export function SectionRow({
  serialNo,
  sectionName,
  ComponentPreview,
  ComponentForm,
  page
}) {
  return (
    <TableRow>
      <TableCell>{serialNo}</TableCell>
      <TableCell>{sectionName}</TableCell>
      <TableCell>{page || "Home"}</TableCell>
      <TableCell className="flex">
        {/* Preview Dialog */}
        <Dialog>
          <DialogTrigger>
            <Button variant="primary">
              <Eye className="text-[#7f7f7f] w-5 h-5 duration-300 ease-in-out hover:text-black" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[600px] font-fredoka max-w-[1000px] overflow-y-scroll">
            <DialogTitle>{sectionName} Section</DialogTitle>
            <DialogDescription>
              <ComponentPreview />
            </DialogDescription>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Update Dialog */}
        <Dialog>
          <DialogTrigger>
            <FilePenLine className="text-[#7f7f7f] w-5 h-5 duration-300 ease-in-out hover:text-black" />
          </DialogTrigger>
          <DialogContent className="max-h-[600px] font-fredoka max-w-[1000px] overflow-y-scroll">
            <DialogTitle>{sectionName} Section</DialogTitle>
            <DialogDescription>
              <ComponentForm />
            </DialogDescription>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
