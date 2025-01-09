import { OrderConfirmed } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

const generateOrderNumber = () => {
  const prefix = "KINDI";
  const randomNum = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
  return `${prefix}${randomNum.toString().padStart(6, "0")}`; // Pads the number with leading zeros if needed
};

export default function SuccessPage() {
  const orderNumber = generateOrderNumber();
  return (
    <>
      <section className="w-full h-screen bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer py-4 w-full bg-[#eaeaf5] flex flex-row overflow-hidden gap-8">
          <div className="flex h-full flex-col gap-2 justify-center items-center w-full">
            <Image alt="Kindi" src={OrderConfirmed} className="w-12 h-12" />
            <div className="w-full text-center text-[#0a1932] text-[24px] lg:text-[40px] font-semibold font-fredoka leading-tight">
              Congratulation!
            </div>
            <div className="w-full text-center text-[#0a1932] text-[16px] lg:text-[24px] font-normal font-fredoka">
              Your order has been placed. Your order reference number is
              {` ${orderNumber}`}.
            </div>
            <div className="w-fit flex gap-2">
              <Link
                href="/"
                className="text-center text-red text-[24px] font-medium font-fredoka leading-normal"
              >
                Go to Home{" "}
              </Link>
              <Link
                href="/profile"
                className="text-center text-purple text-[24px] font-medium font-fredoka leading-normal"
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
