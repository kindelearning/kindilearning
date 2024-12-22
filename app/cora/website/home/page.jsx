import HomepageHeroSectionPage from "../../Sections/Home/HomepageHeroSectionPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, FilePenLine } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial No.</TableHead>
                <TableHead>Section Name</TableHead>
                <TableHead>Parent Page</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Hero</TableCell>
                <TableCell>Home</TableCell>
                <TableCell className="flex">
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="primary">
                        <Eye className="text-[#7f7f7f] w-5 h-5 duration-300 ease-in-out hover:text-black" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[800px] font-fredoka max-w-[1000px] overflow-y-scroll">
                      <DialogTitle>Home Hero Section</DialogTitle>
                      <DialogDescription>
                        <HomepageHeroSectionPage />
                      </DialogDescription>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button variant="secondary">Close</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="primary">
                        <FilePenLine className="text-[#7f7f7f] w-5 h-5 duration-300 ease-in-out hover:text-black" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[800px] font-fredoka max-w-[1000px] overflow-y-scroll">
                      <DialogTitle>Home Hero Section</DialogTitle>
                      <DialogDescription>
                        <HomepageHeroSectionPage />
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
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
