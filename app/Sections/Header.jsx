"use client";

import {
  Achievement,
  BlogThumb,
  Logo,
  Milestone,
  ProfessionalThumb,
  ProfileDP,
  progressImage02,
  User,
} from "@/public/Images";
import Image from "next/image";
import { NavMenu } from "../constant/menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraphQLClient, gql } from "graphql-request";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, Menu } from "lucide-react";
import { HomeLight } from "@/public/Icons";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Loading from "../loading";

const LocalNavitem = ({
  Link = "#",
  IconSrc = <HomeLight />,
  Title = "NavTitle",
}) => {
  return (
    <a
      href={Link}
      className="w-full flex bg-[#ffffff] justify-between items-center py-2 px-4 rounded-lg"
    >
      <div className="flex items-center gap-2">
        <div className="icon-container w-5 h-5">
          <Image src={IconSrc} width={20} height={20} />
        </div>
        <span className="text-lg font-medium font-fredoka">{Title}</span>
      </div>
      <ChevronRight />
    </a>
  );
};

const MileStone = () => {
  return (
    <>
      <Link
        href="/"
        className="w-full h-[80px] bg-[#3f3d91] justify-center items-center gap-1 flex flex-col rounded-xl border-3 border-[#85829c]"
      >
        <Image src={Milestone} width={40} height={40} />
        <div className="text-center w-full text-white text-xs font-normal font-fredoka leading-none">
          Milestones
        </div>{" "}
      </Link>
    </>
  );
};

const Progress = () => {
  return (
    <>
      <Link
        href="/"
        className="w-full h-[80px] bg-[#FF8E00] justify-center items-center gap-1 flex flex-col rounded-xl border-3 border-[#f9d09b]"
      >
        <Image src={progressImage02} width={40} height={40} />
        <div className="text-center w-full text-white text-xs font-normal font-fredoka leading-none">
          Milestones
        </div>{" "}
      </Link>
    </>
  );
};

const Achievements = () => {
  return (
    <>
      <Link
        href="/"
        className="w-full h-[80px] bg-[#C42797] justify-center items-center gap-1 flex flex-col rounded-xl border-3 border-[#e4a9d3]"
      >
        <Image src={Achievement} width={40} height={40} />
        <div className="text-center w-full text-white text-xs font-normal font-fredoka leading-none">
          Milestones
        </div>{" "}
      </Link>
    </>
  );
};

const SideBar = () => {
  return (
    <>
      <section className="lg:hidden h-full flex flex-col gap-2 items-start justify-between space-y-2 mt-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-1 justify-start items-start">
            <div className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
              Quick Access
            </div>
            <div className="flex w-full flex-col gap-1 justify-normal items-center">
              {NavMenu?.map((menuItem, index) => (
                <LocalNavitem
                  key={index}
                  IconSrc={menuItem.icon}
                  Link={menuItem.link}
                  Title={menuItem.title}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-1 justify-start items-start">
            <div className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
              My Progress
            </div>
            <div className="grid grid-cols-3 w-full gap-1">
              <MileStone />
              <Progress />
              <Achievements />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full flex- col gap-1 justify-start items-start">
            <Link
              href="/auth/sign-in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <div className="bg-[#ffffff] py-2 w-full text-[12px] font-fredoka border-[black] text-[black] hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-2 rounded-[10px] transition duration-300 ease-in-out">
                Log in
              </div>
            </Link>
            <Link
              href="/auth/sign-up"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <div className="bg-red hover:bg-hoverRed  text-[12px] font-fredoka text-white  w-[max-content] py-2 px-[40px]  hover:text-white border-2 border-red rounded-[10px] transition duration-300 ease-in-out">
                Get Started
              </div>
            </Link>
          </div>
          {/* <SignOutButton /> */}
          <Button
            className="bg-red clarabutton"
            onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
          >
            Sign Out
          </Button>{" "}
        </div>
      </section>
    </>
  );
};

const usePathname = () => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return pathname;
};

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});

const GET_ACCOUNT_BY_EMAIL = gql`
  query GetAccountByEmail($email: String!) {
    account(where: { email: $email }) {
      name
      username
      email
      profilePicture {
        url
      }
      isVerified
    }
  }
`;

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (session && session.user) {
      fetchUserData(session.user.email);
    }
  }, [session]);

  const fetchUserData = async (email) => {
    try {
      const data = await client.request(GET_ACCOUNT_BY_EMAIL, { email });
      setProfileData(data.account);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/", // Optional: Redirect users to this URL after sign out
    });
  };

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <header className="sticky rounded-b-[12px] top-0 z-50 w-full px-4 bg-white dark:bg-dark-blue-100 shadow-md flex justify-center items-center py-4 md:py-4">
      <section className="max-w-[1400px] claracontainer px-0 md:px-2 lg:px-4 flex flex-row justify-between items-center w-full">
        <Link href="/">
          <div className="logo">
            <Image
              src={Logo}
              alt="Logo"
              className="lg:w-[110px] w-[80px] md:w-[100px] lg:max-h-[50px]"
            />
          </div>
        </Link>
        {/* Hamburger icon for small screens */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="bg-[#F5F5F5] px-2 h-full">
              <SheetHeader className="h-full">
                {/* Custom Sidebar Item */}
                <section className="lg:hidden h-full flex flex-col w-full gap-2 items-start justify-between space-y-2 mt-4">
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col gap-1 justify-start items-start">
                      <div className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                        Quick Access
                      </div>
                      <div className="flex w-full flex-col gap-1 justify-normal items-center">
                        {NavMenu?.map((menuItem, index) => (
                          <LocalNavitem
                            key={index}
                            IconSrc={menuItem.icon}
                            Link={menuItem.link}
                            Title={menuItem.title}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-1 justify-start items-start">
                      <div className="text-[#0a1932] text-sm font-medium font-fredoka leading-tight">
                        My Progress
                      </div>
                      <div className="grid grid-cols-3 w-full gap-1">
                        <MileStone />
                        <Progress />
                        <Achievements />
                      </div>
                    </div>
                  </div>
                  {/* {session ? (
                    <Link
                      href="/profile"
                      target="_blank"
                      className="rounded-full w-full"
                    >
                      
                    </Link>
                  ) : (
                    
                  )} */}
                  {profileData ? (
                    <div className="flex w-full justify-start items-center">
                      {/* <div className="relative w-[32px] h-[32px] p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                              <Image
                                src={profileData.profilePicture?.url}
                                alt="User DP"
                                width={40}
                                height={40}
                                className="w-[32px] h-[32px] object-cover rounded-full"
                              />
                            </div>
                          </div> */}
                      <Button
                        onClick={handleSignOut}
                        className="bg-red hover:bg-hoverRed text-white clarabutton w-full"
                      >
                        Sign Out
                      </Button>
                      {/* <div className="flex flex-col w-full justify-start items-start">
                        <h2 className="text-[#029871] text-[20px] font-semibold font-fredoka leading-tight">
                          {profileData.name}
                        </h2>
                      </div> */}
                    </div>
                  ) : (
                    <div className="flex w-full flex-col gap-1 justify-start items-start">
                      <Link
                        href="/auth/sign-in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <div className="bg-[#ffffff] py-2 w-full text-[12px] font-fredoka border-[black] text-[black] hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-2 rounded-[10px] transition duration-300 ease-in-out">
                          Log in
                        </div>
                      </Link>
                      <Link
                        href="/auth/sign-up"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <div className="bg-red hover:bg-hoverRed text-[12px] font-fredoka text-white w-full py-2 px-[40px]  hover:text-white border-2 border-red rounded-[10px] transition duration-300 ease-in-out">
                          Get Started
                        </div>
                      </Link>
                    </div>
                  )}
                </section>
                <SheetDescription>#KindiLearning</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        {/* Navigation Links - Hidden on small screens */}
        <div className="hidden lg:flex flex-col md:flex-row gap-[16px] md:items-center md:justify-center w-full md:w-[max-content]">
          {NavMenu.map((menuItem, index) => (
            <a
              key={index}
              href={menuItem.link}
              className={`text-light-gray-500 gap-[6px] flex-row w-[max-content] dark:text-light-gray-500 text-lg font-semibold font-montserrat leading-6 flex items-center transition duration-300 ease-in-out ${
                pathname === menuItem.link ? "active" : ""
              }`}
            >
              <Image
                src={
                  pathname === menuItem.link
                    ? menuItem.activeIcon
                    : menuItem.icon
                }
                alt={`${menuItem.title} icon`}
                width={20}
                height={20}
                className="h-[14px] w-[14px] transition duration-300 ease-in-out"
              />
              <span
                className={`text-[14px] font-montserrat hover:text-[#000000] transition duration-300 ease-in-out ${
                  pathname === menuItem.link
                    ? "text-[#000000] hover:text-[#000000] underline underline-[red]"
                    : " text-[#757575] "
                }`}
                style={{ textDecorationColor: "#de4040" }}
              >
                {menuItem.title}
              </span>
            </a>
          ))}
        </div>
        {/* <div className="hidden lg:flex space-x-4">
          <Link href="/auth/sign-in">
            <Button className="bg-[#ffffff] border-purple text-purple hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-2 rounded-[16px] transition duration-300 ease-in-out">
              Log In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-red px-[40px]  hover:text-white border-4 border-red hover:bg-hoverRed hover:border-hoverRed  rounded-[16px] transition duration-300 ease-in-out">
              Sign Up
            </Button>
          </Link>
          <Button onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}>
            Sign Out
          </Button>{" "}
        </div> */}
        <div className="hidden lg:flex space-x-4">
          {/* If the user is signed in, show the Sign Out button */}
          {/* {session ? (
            <Link
              href="/profile"
              target="_blank"
              className="rounded-full w-[48px] h-[48px]"
            >
             
            </Link>
          ) : (
            <>
              <Link href="/auth/sign-in">
                <Button className="bg-[#ffffff] border-purple text-purple hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-2 rounded-[16px] transition duration-300 ease-in-out">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-red px-[40px] hover:text-white border-4 border-red hover:bg-hoverRed hover:border-hoverRed rounded-[16px] transition duration-300 ease-in-out">
                  Sign Up
                </Button>
              </Link>
            </>
          )} */}
          {profileData ? (
            <Link href="/profile" target="_blank" className="flex cursor-pointer w-full justify-start items-center">
              <div className="relative w-full flex justify-center items-center p-[2px] border-2 border-red hover:border-hoverRed rounded-full">
                <div className="w-full h-full bg-white rounded-full  flex items-center justify-center">
                  <Image
                    src={profileData.profilePicture?.url}
                    alt="User DP"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                </div>
              </div>
            </Link>
          ) : (
            <>
              <Link href="/auth/sign-in">
                <Button className="bg-[#ffffff] border-purple text-purple hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-2 rounded-[16px] transition duration-300 ease-in-out">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-red px-[40px] hover:text-white border-4 border-red hover:bg-hoverRed hover:border-hoverRed rounded-[16px] transition duration-300 ease-in-out">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
