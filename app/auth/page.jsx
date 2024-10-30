"use client";

import { EmailIcons, Facebook, Google, Logo, WithApple } from "@/public/Images";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DynamicCard from "../Sections/Global/DynamicCard";
import { DynamicCardMobile } from "../Sections";


const Page = () => {
  return (
    <>
      {/* Larger Screens */}
      <section className="w-full h-screen bg-[url('/Images/SignUpBG.svg')] bg-[#EAEAF5] items-center justify-center py-4 hidden lg:flex lg:flex-col  gap-[20px]">
        <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col items-center justify-center overflow-hidden gap-8">
          <Image alt="Kindi" src={Logo} className="w-[200px] h-[100px]" />
        </div>
        <Dialog className="p-0 w-full rounded-[24px]">
          <DialogTrigger className=" p-0">
            <div className="flex px-4 py-1 font-fredoka border-purple items-center gap-2 border-[2px] font-medium text-[20px] text-purple broder rounded-[1200px] cursor-pointer animate-wobble">
              Proceed Now
              <ChevronRight />
            </div>
          </DialogTrigger>
          <DialogContent className="w-full p-0 rounded-[24px] max-w-[1000px] flex items-center justify-center">
            <DialogHeader className="p-0">
              {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
              <DialogDescription className="flex flex-row  gap-0 h-[70vh] items-center justify-between w-full">
                {/* Coloumn 1 */}
                <div className="w-full flex gap-8 flex-col justify-center items-center bg-[url('/Images/BGVectors.svg')] h-full min-w-[500px]">
                  <Image
                    alt="Kindi"
                    src={Logo}
                    className="w-[200px] h-[100px]"
                  />
                  <div className="flex flex-col gap-2 w-full justify-center items-center px-6">
                    <Link href="/auth/sign-up">
                      <Button className="bg-[#3f3a64] w-[300px]  border-white text-center text-white clarabutton rounded-[20px] leading-tight">
                        SignUp
                      </Button>
                    </Link>
                    <Link href="/auth/sign-in">
                      <Button className="bg-red w-[300px]  border-white text-center text-white clarabutton rounded-[20px] leading-tight">
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* Coloumn 2 */}
                <DynamicCard />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>

      {/* Mobile Screen */}
      <section className="flex flex-col h-screen w-full lg:hidden">
        <DynamicCardMobile />

        <div className="flex justify-between bottom-0 py-4 gap-2 px-4 h-fit fixed w-full ">
          <Dialog className="p-0 w-full ">
            {/* OTP verification Trigger */}
            <DialogTrigger className="w-full p-0">
              <div className="flex w-full">
                <Button className="bg-purple w-full border-[#ffffff] h-[50px] text-[#ffffff] hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-2 rounded-[16px] transition duration-300 ease-in-out">
                  Log in
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="w-full px-4 p-0 rounded-[12px] flex items-center justify-center">
              <DialogHeader className="p-0">
                <DialogDescription className="flex flex-row  gap-0 h-fit py-12 items-start  justify-start w-full">
                  {/* Coloumn 1 - bg-[url('/Images/BGVectors.svg')] */}
                  <div className="w-full flex gap-8 flex-col justify-center items-center h-full">
                    <div className="text-[#0a1932] text-2xl font-semibold font-fredoka leading-loose">
                      Sign up
                    </div>
                    <Link href="/auth/sign-up" className="w-full px-4 justify-end items-start text-center">
                      <Button className="w-full flex  gap-2 bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
                        <Image  alt="Kindi" src={EmailIcons} />
                        Continue with Email
                      </Button>
                      <div className="flex w-full flex-col justify-center py-4 items-center gap-4">
                        <div className="text-center text-[#0a1932] text-lg font-medium font-fredoka leading-tight">
                          Or continue with
                        </div>
                        <div className="flex gap-2 items-center justify-center w-full">
                          <Image
                            alt="Kindi"
                            className="cursor-pointer"
                            src={WithApple}
                          />
                          <Image
                            alt="Kindi"
                            className="cursor-pointer"
                            src={Google}
                          />
                          <Image
                            alt="Kindi"
                            className="cursor-pointer"
                            src={Facebook}
                          />
                        </div>
                      </div>
                      <div className="w-full text-center">
                        <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                          Already have an account.{" "}
                        </span>
                        <Link href='/auth/sign-in' className="text-[#f05c5c] text-sm font-medium font-fredoka leading-tight">
                          Login
                        </Link>
                      </div>
                    </Link>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog className="p-0 w-full rounded-[24px]">
            {/* OTP verification Trigger */}
            <DialogTrigger className="w-full p-0">
              <div className="flex w-full">
                <Button className="bg-red px-[40px] w-full h-[50px] border-[#ffffff] hover:text-white border-2 hover:bg-hoverRed hover:border-hoverRed  rounded-[16px] transition duration-300 ease-in-out">
                  Sign up
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="w-full p-0 rounded-[24px] flex items-center justify-center">
              <DialogHeader className="p-0">
                <DialogDescription className="flex flex-row  gap-0 h-fit py-12 items-start  justify-start w-full">
                  {/* Coloumn 1 -bg-[url('/Images/BGVectors.svg')] */}
                  
                  <div className="w-full flex gap-8 flex-col justify-center items-center  h-full">
                    <div className="text-[#0a1932] text-2xl font-semibold font-fredoka leading-loose">
                      Log in
                    </div>
                    <Link href="/auth/sign-in" className="w-full px-4 justify-end items-start text-center">
                      <Button className="w-full flex  gap-2 bg-red hover:bg-red clarabutton rounded-2xl shadow border-2 border-white">
                        <Image  alt="Kindi" src={EmailIcons} />
                        Continue with Email
                      </Button>
                      <div className="flex w-full flex-col justify-center py-4 items-center gap-4">
                        <div className="text-center text-[#0a1932] text-lg font-medium font-fredoka leading-tight">
                          Or continue with
                        </div>
                        <div className="flex gap-2 items-center justify-center w-full">
                          <Image
                            alt="Kindi"
                            className="cursor-pointer"
                            src={WithApple}
                          />
                          <Image
                            alt="Kindi"
                            className="cursor-pointer"
                            src={Google}
                          />
                          <Image
                            alt="Kindi"
                            className="cursor-pointer"
                            src={Facebook}
                          />
                        </div>
                      </div>
                      <div className="w-full text-center">
                        <span className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                          Don&apos;t have an account.{" "}
                        </span>
                        <Link href='/auth/sign-up' className="text-[#f05c5c] text-sm font-medium font-fredoka leading-tight">
                          Signup
                        </Link>
                      </div>
                    </Link>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
};

export default Page;
