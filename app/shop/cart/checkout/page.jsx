"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronLeft, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import {
  CheckVector,
  LocationIcon,
  OrderConfirmed,
  PaymentsIcon,
} from "@/public/Images";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const Accordion = ({
  trailingIcon,
  title,
  Data = (
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
      nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque
      penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </p>
  ),
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full px-4 py-3 bg-white shadow rounded-lg">
      <button
        className="flex items-center justify-between w-full text-lg font-medium text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1">
          <Image
            alt="Kindi"
            src={trailingIcon || LocationIcon}
            className="w-6 h-4"
          />
          <h4 className="text-[#0a1932] text-sm font-normal font-fredoka leading-tight">
            {" "}
            {title || "Accordion Title"}{" "}
          </h4>
        </div>
        {isOpen ? (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isOpen && <div className="w-full py-4 px-2">{Data}</div>}
    </div>
  );
};
const AddressForm = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center gap-2">
      <Input placeholder="Name" className="bg-white rounded-lg shadow" />
      <Input placeholder="Contact" className="bg-white rounded-lg shadow" />
      <Textarea
        placeholder="Street Address"
        className="bg-white rounded-lg shadow"
      />
      <Input placeholder="City" className="bg-white rounded-lg shadow" />
      <Input placeholder="Zip Code" className="bg-white rounded-lg shadow" />
      <Input placeholder="State" className="bg-white rounded-lg shadow" />
      <Input
        placeholder="Landmark (Optional)"
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};
const PaymentDetail = () => {
  return (
    <>
      <div className="flex w-full gap-2">
        <Accordion title="Paypal" />
        <Accordion title="Debit or Credit Card" />
      </div>
    </>
  );
};
const SummaryItem = ({ item }) => {
  return (
    <div
      className={`w-full h-5 top-[${
        item.isTotal ? 144 : 16 + (item.label === "Delivery fee" ? 28 : 0)
      }px] justify-between items-center inline-flex`}
    >
      <div className="text-[#0a1932] text-sm font-normal font-fredoka leading-tight">
        {item.label}
      </div>
      <div className="text-right text-[#0a1932] text-sm font-normal font-fredoka leading-tight">
        {item.value}
      </div>
    </div>
  );
};
const SummaryItems = () => {
  const items = [
    { label: "Subtotal", value: "$125" },
    { label: "Delivery fee", value: "$5" },
    { label: "Discount", value: "$0" },
    { label: "GST", value: "$0" },
    { label: "Total bill", value: "$130", isTotal: true },
  ];

  return (
    <div className="flwx w-full justify-between items-center">
      {items.map((item, index) => (
        <SummaryItem key={index} item={item} />
      ))}
    </div>
  );
};
const OrderSummaryCard = () => {
  return (
    <div className=" bg-white w-full gap-2 p-4 rounded-xl shadow">
      <SummaryItems />
    </div>
  );
};

const Page = () => {
  return (
    <>
      <section className="w-full h-screen bg-[rgb(234,234,245)] items-start justify-start lg:items-center lg:justify-center p-0 flex flex-col">
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Checkout
          </div>
        </div>
        <div className="claracontainer h-screen -mt-4 rounded-t-[12px] z-2 md:m-12  p-6 rounded-xl bg-[#eaeaf5] md:bg-[white] w-full flex flex-col overflow-hidden gap-4">
          {/* <div className="claracontainer min-h-[600px] m-12 p-6 rounded-xl bg-[white] w-full flex flex-col overflow-hidden gap-8"> */}
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <div className="text-red hidden justify-center items-center md:flex text-[32px] md:text-[44px] w-full text-center font-semibold font-fredoka capitalize leading-10">
              Checkout
            </div>
          </div>
          <div className="flex gap-2 flex-col w-full justify-start items-start">
            <Accordion
              Data={<AddressForm />}
              trailingIcon={LocationIcon}
              title="Add Address"
            />
            <Accordion
              Data={<PaymentDetail />}
              trailingIcon={PaymentsIcon}
              title="Add Payment Method"
            />
            <OrderSummaryCard />
          </div>
          {/* The middle COntent */}
        </div>
        <div className="shadow-upper rounded-t-[12px] bottom-0 z-24  sticky bg-[white] shadow py-4 flex flex-row justify-center w-full items-center gap-4">
          <div className="claracontainer px-4 w-full justify-between items-center flex">
            <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-2xl font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
              <ChevronLeft className="w-[24px] h-[24px]" />
              Back
            </Button>
            <Dialog className="w-full flex justify-center items-center">
              <DialogTrigger>
                <Button className="bg-red hover:bg-red rounded-2xl font-fredoka text-white shadow border-2 border-white">
                  Proceed to Checkout
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[92%] lg:max-w-[800px] bg-[#eaeaf5] lg:bg-[#ffffff] rounded-[8px] h-[600px]">
                <DialogHeader>
                  <DialogDescription className="flex h-full flex-col gap-2 justify-center items-center w-full">
                    <Image
                      alt="Kindi"
                      src={OrderConfirmed}
                      className="w-12 h-12"
                    />
                    <div className="w-full text-center text-[#0a1932] text-[24px] lg:text-[40px] font-semibold font-fredoka leading-tight">
                      Congratulation!
                    </div>
                    <div className="w-full text-center text-[#0a1932] text-[16px] lg:text-[24px] font-normal font-fredoka">
                      Your order has been placed. Your order reference number is
                      BRJ388290.
                    </div>
                    <Link
                      href="/"
                      className="text-center text-red text-[24px] font-medium font-fredoka leading-normal"
                    >
                      Go to Home{" "}
                    </Link>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
