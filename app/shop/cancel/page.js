import { OrderConfirmed } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

export default function CancelPage() {
  return (
    <>
      <section className="w-full h-screen bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer py-4 w-full bg-[#eaeaf5] flex flex-row overflow-hidden gap-8">
          <div className="flex h-full flex-col gap-2 justify-center items-center w-full">
            <Image alt="Kindi" src={OrderConfirmed} className="w-12 h-12" />
            <div className="w-full text-center text-red text-[24px] lg:text-[40px] font-semibold font-fredoka leading-tight">
              Opps!
            </div>
            <div className="w-full text-center text-[#0a1932] text-[16px] lg:text-[24px] font-normal font-fredoka">
              Your order was not Successfull. Please try again.
            </div>
            <div className="w-fit flex gap-2">
              <Link
                href="/shop"
                className="text-center text-red hover:text-hoverRed text-[24px] font-medium font-fredoka leading-normal"
              >
                Go to Shop |
              </Link>
              <Link
                href="/profile"
                className="text-center text-purple hover:text-[purple] text-[24px] font-medium font-fredoka leading-normal"
              >
                Go to Profile{" "}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
