"use client";

import { Button } from "@/components/ui/button";
import { ConnectPartner, Referral } from "@/public/Images";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PopupFooter } from "..";
import { useState } from "react";

export default function ReferralForm() {
  const [referrerName, setReferrerName] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");
  const [referredName, setReferredName] = useState("");
  const [referredEmail, setReferredEmail] = useState("");
  const [status, setStatus] = useState("");

  const submitReferral = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/referral", {
      method: "POST",
      body: JSON.stringify({
        referrerName,
        referrerEmail,
        referredName,
        referredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setReferrerName("");
    setReferrerEmail("");
    setReferredName("");
    setReferredEmail("");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center rounded-[22px] border-4 gap-4 border-[#3f3a64] w-full justify-between p-4">
        <div className="flex flex-col justify-start items-start w-full gap-1">
          <div className="w-full text-red text-4xl md:text-6xl font-semibold font-fredoka">
            Refer Now
          </div>
          <div className="w-full text-[#3f3a64] clarabodyTwo">
            Share app with your friends on 5 signups you will get 1 month free
            subscription
          </div>
        </div>
        <div className="w-full md:max-w-[360px] px-4 py-4 bg-white rounded-xl border-4 border-[#ffffffb8] flex-col justify-between items-center inline-flex">
          <Image alt="Kindi" src={Referral} className="w-auto h-auto" />
          <Dialog>
            <DialogTrigger>
              <Button className="bg-red w-full rounded-[16px] clarabutton shadow border-2 border-white text-center text-white">
                Join Referral Program
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full lg:max-w-[800px] lg:w-full">
              <DialogHeader>
                <DialogTitle>
                  <div className="text-center w-full">
                    <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                      Refer{" "}
                    </span>
                    <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                      A Friend{" "}
                    </span>
                    <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                      & Get $20
                    </span>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col md:flex-row px-2 max-w-[800px] justify-center items-start claracontainer gap-4">
                    <div className="flex w-full max-w-[20%]">
                      <Image
                        alt="Kindi"
                        src={ConnectPartner}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-start items-start gap-4">
                      <div className="text-[#757575] clarabodyTwo">
                        Invite a Partner or friends, family, coworkers,
                        neighbours, and your favourite barista to Brushlink.
                        Every time someone books and visits a new dentist
                        through your link, you both get $20.
                      </div>
                      <form
                        onSubmit={submitReferral}
                        className="flex w-full flex-col justify-start items-start gap-4"
                      >
                        <Input
                          type="text"
                          value={referrerName}
                          required
                          onChange={(e) => setReferrerName(e.target.value)}
                          placeholder="Your Name"
                          className=" bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00]  shadow border border-[#383838]"
                        />
                        <Input
                          type="email"
                          value={referrerEmail}
                          required
                          onChange={(e) => setReferrerEmail(e.target.value)}
                          placeholder="Friend's Name"
                          className=" bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00]  shadow border border-[#383838]"
                        />
                        <Input
                          type="text"
                          value={referredName}
                          required
                          onChange={(e) => setReferredName(e.target.value)}
                          placeholder="Friend's Name"
                          className=" bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00]  shadow border border-[#383838]"
                        />
                        <Input
                          className=" bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00] shadow border border-[#383838]"
                          type="email"
                          value={referredEmail}
                          onChange={(e) => setReferredEmail(e.target.value)}
                          placeholder="Friend's Email"
                          required
                        />
                        <Button
                          type="submit"
                          className="bg-[#3f3a64]  hover:bg-purple border-purple hover:border-4 hover:border-[#4d3d9738]  rounded-[27px] border-4 border-[#3f3a64]/40 justify-center items-center inline-flex text-white font-semibold"
                        >
                          {status === "loading"
                            ? "Submitting..."
                            : "Refer a Friend"}
                        </Button>
                        {status === "success" && (
                          <p className="text-[green]">
                            Thank you for referring!
                          </p>
                        )}
                        {status === "error" && (
                          <p className="text-red">
                            Something went wrong. Please try again.
                          </p>
                        )}
                      </form>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
