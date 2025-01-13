import AnnualPriceing, {
  EditAnnualPricing,
} from "@/app/cora/Sections/Home/AnnualPricing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AnnualPrice() {
  return (
    <>
      <section className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-0 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="flex w-full gap-4 justify-between items-center">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                Annual Pricing
              </span>
            </div>
            <Dialog>
              <DialogTrigger className="text-purple w-[max-content] hover:scale-105 duration-200 hover:underline">
                Edit Annual
              </DialogTrigger>
              <DialogContent className="max-w-[800px] p-0 max-h-[600px] overflow-y-scroll">
                <DialogHeader>
                  <DialogDescription>
                    <EditAnnualPricing />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col w-full gap-4 justify-center items-center">
            <AnnualPriceing />
          </div>
        </div>
      </section>
    </>
  );
}
