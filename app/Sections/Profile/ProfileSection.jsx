"use client";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import {
  Achievement,
  Bag,
  Email,
  Kid,
  LanguageIcon,
  Partner,
  Payments,
  ProfileDP,
  Progress,
  Support,
  TnC,
  User,
  Phone,
  MasterCard,
  ConnectPartner,
  Milestone,
  ProfileSettingIcon,
  VerifiedIcon,
} from "@/public/Images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BadgeSection from "./BadgeSection";
import { Button } from "@/components/ui/button";
import { PopupFooter } from "..";
import { Input } from "@/components/ui/input";
import ReferralCard from "./ReferralCard";
import SettingCard from "./SettingCard";
import LevelCard from "./LevelCard";
import MyProfileRoutes from "./MyProfileRoutes";
import ProductCard from "./ProductCard";
import ProfileCard from "./ProfileCard";
import Link from "next/link";
import { data, profilData } from "@/app/constant/menu";
import { Textarea } from "@/components/ui/textarea";
import { GraphQLClient, gql } from "graphql-request";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import SignOutButton from "@/app/auth/signout/page";
import Head from "next/head";

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

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setError("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setError("Error submitting contact form.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
      <div className="flex w-full claracontainer px-2 lg:px-4 flex-col items-center justify-center">
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col gap-4 w-full"
        >
          <Input
            type="text"
            name="name"
            value={formData.name}
            className="border ring-0 ring-offset-0 focus-visible:ring-0 p-2"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            name="email"
            className="border ring-0 ring-offset-0 focus-visible:ring-0 p-2"
            value={formData.email}
            placeholder="Your Email"
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            value={formData.message}
            placeholder="Your Message"
            onChange={handleChange}
            className="border ring-0 ring-offset-0 focus-visible:ring-0 p-2"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="clarabutton w-[200px] lg:w-[300px] bg-red hover:bg-hoverRed text-white p-2"
          >
            {loading ? "Sending..." : "Submit"}
          </Button>
        </form>
      </div>
    </section>
  );
};

/**
 * @Main_Account
 * @returns Logic for Connecting Child and Parent Account
 */
// ConnectAccountForm.js
export const ConnectAccountForm = () => {
  const [parentEmail, setParentEmail] = useState("");
  const [childEmail, setChildEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages
    try {
      const response = await fetch("/api/connect-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parentEmail, childEmail }),
      });

      if (response.ok) {
        setMessage("Accounts connected successfully!");
        console.log("Accounts connected successfully");
      } else {
        setMessage(
          responseData.error || "Failed to connect accounts. Please try again."
        );
        console.error("Failed to connect accounts");
      }
    } catch (error) {
      console.error("Error connecting accounts:", error);
      alert("Error connecting accounts:", error);
      setMessage(
        "Error connecting accounts. Please check the emails and try again."
      );
    } finally {
      setLoading(false); // Hide connecting state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
      <Input
        type="email"
        placeholder="Parent Account Email"
        value={parentEmail}
        onChange={(e) => setParentEmail(e.target.value)}
        className=" bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00]  shadow border border-[#383838]"
      />
      <Input
        type="email"
        placeholder="Child Account Email"
        value={childEmail}
        onChange={(e) => setChildEmail(e.target.value)}
        className=" bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00]  shadow border border-[#383838]"
      />
      <button
        disabled={loading}
        type="submit"
        className="bg-red clarabutton text-white py-4"
      >
        {loading ? "Connecting..." : "Connect Accounts"}
      </button>
      {message && (
        <p
          className={`p-2 m-2 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default async function ProfileSection() {
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

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Profile - Kindilearning</title>
        <meta name="description" content="Your profile page on Kindilearning" />
        <meta property="og:title" content="Profile - Kindilearning" />
        <meta
          property="og:description"
          content="Your profile page on Kindilearning"
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://kindilearning.com/profile" />
        <meta property="og:site_name" content="Kindilearning" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Profile - Kindilearning" />
        <meta
          name="twitter:description"
          content="Your profile page on Kindilearning"
        />
        <meta name="twitter:image" content="/images/logo.png" />
      </Head>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        {/* Topbar */}
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Profile
          </div>
        </div>
        <div className="claracontainer bg-[#F5F5F5] md:bg-[#EAEAF5] -mt-4 rounded-t-[12px] z-2 lg:m-12 px-4 py-6 rounded-xl md:px-2 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
          <ConnectAccountForm />
          {/* Top Profile Card */}
          <div className="w-full flex bg-[white] rounded-[24px] p-2 md:p-4 justify-start items-start gap-[4px] lg:gap-[12px] lg:items-center">
            <div className="w-fit lg:max-w-[160px] lg:w-full items-center flex justify-start">
              {profileData ? (
                <>
                  <div className="relative w-20 h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                    <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
                      <Image
                        src={profileData.profilePicture?.url}
                        alt="User DP"
                        width={100}
                        height={100}
                        className="w-[72px] h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={ProfileDP}
                  alt="Logo"
                  className="rounded-full border-2 lg:w-full lg:h-full border-red w-[48px] h-[48px]"
                />
              )}
            </div>
            <div className="w-full gap-4 flex flex-col justify-center">
              <div className="flex flex-row justify-between items-start w-full">
                {profileData ? (
                  <div className="flex flex-col w-full justify-start items-start">
                    <div className="flex gap-1 items-center w-full justify-start">
                      <h2 className="text-[#029871] text-[20px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold font-fredoka leading-tight">
                        {profileData.name}
                      </h2>
                      {profileData.isVerified && (
                        <span
                          className="ml-2 text-[#255825]"
                          title="Verified User"
                        >
                          <Image
                            src={VerifiedIcon}
                            alt="VerifiedIcon"
                            className="w-[20px] h-[20px] lg:h-[30px] lg:w-[30px]"
                          />
                        </span>
                      )}
                    </div>
                    <p className="font-fredoka text-[12px] lg:text-[20px]">
                      Email: {profileData.email}
                    </p>
                  </div>
                ) : (
                  <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                    John Doe
                  </h2>
                )}
                {/* Trigger for the Edit Profile Popup */}
                <Link
                  href="/profile/update"
                  className="hidden lg:flex"
                  target="_blank"
                >
                  <Badge
                    className="text-[10px] md:text-[16px] cursor-pointer"
                    variant="outline"
                  >
                    Edit
                  </Badge>
                </Link>
              </div>
              <div className="flex flex-col w-full gap-1 items-start justify-start">
                <div className="flex flex-row w-full justify-start items-center gap-2">
                  <div className="text-[#3f3a64] clarabodyTwo">Level 1</div>
                  {/* Trigger for the Level Popup */}
                  <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
                    <DialogTrigger asChild>
                      <Badge
                        className="text-[10px] md:text-[16px] cursor-pointer"
                        variant="outline"
                      >
                        Check Now
                      </Badge>
                    </DialogTrigger>
                    <DialogContent className="bg-[#EAEAF5] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[28px] w-full claracontainer">
                      <DialogHeader className="p-4">
                        <div className="flex flex-row justify-center items-center w-full">
                          <DialogTitle>
                            <div className="text-center">
                              <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                My{" "}
                              </span>
                              <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                Level
                              </span>
                            </div>
                          </DialogTitle>
                        </div>
                      </DialogHeader>
                      <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                        <div className="flex flex-col justify-center items-center w-full claracontainer gap-4">
                          <LevelCard level="Level 1" activities="5" />
                          <LevelCard level="Level 2" activities="10" />
                          <LevelCard level="Level 3" activities="15" />
                          <LevelCard level="Level 4" activities="20" />
                          <LevelCard level="Level 5" activities="25" />
                        </div>
                      </DialogDescription>
                      <DialogFooter className="sticky  rounded-t-[16px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bottom-0 m-0 w-full px-4 bg-[#ffffff]">
                        <PopupFooter PrimaryText="Save and Continue" />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Link
                    href="/profile/update"
                    className="flex lg:hidden"
                    target="_blank"
                  >
                    <Badge
                      className="text-[10px] md:text-[16px] cursor-pointer"
                      variant="outline"
                    >
                      Edit
                    </Badge>
                  </Link>
                </div>
                <div className="w-full flex flex-row justify-between items-center clarabodyTwo gap-2">
                  <Slider
                    disabled
                    defaultValue={[33]}
                    max={100}
                    className="h-[8px] text-[#3a3a89]"
                    step={10}
                  />{" "}
                  Activities
                </div>
              </div>
            </div>
          </div>
          {/* Quick Navigation for the Page */}
          <div className="claracontainer px-0 w-full flex flex-row justify-start overflow-x-scroll scrollbar-hidden items-start overflow-hidden gap-2">
            <Link target="_blank" href="/profile/milestone">
              <BadgeSection
                icon={Milestone}
                backgroundColor="#3F3D91"
                borderColor="#9998c2"
                title="Milestone"
              />
            </Link>
            <Link target="_blank" href="/profile/progress">
              <BadgeSection
                icon={Progress}
                title="Progress"
                backgroundColor="#FF8E00"
                borderColor="#f2c99b"
              />
            </Link>
            <Link target="_blank" href="/profile/achievements">
              <BadgeSection
                icon={Achievement}
                title="Achievement"
                backgroundColor="#C42797"
                borderColor="#dc8dc5"
              />
            </Link>
          </div>

          {/* The individual Tabs for Profile Page */}
          <div className="flex w-full justify-center items-center gap-4 flex-col">
            {/* Kids Profile Model */}
            <Dialog className="bg-[#EAEAF5] w-full  claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Kid}
                  iconBackgroundColor="#029871"
                  title="Kids Profile"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-w-[96%] max-h-[70%] scrollbar-hidden overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                          My{" "}
                        </span>
                        <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                          Profile
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer gap-4 flex-col justify-start items-center">
                  <div className="flex justify-between w-full items-center">
                    <div className="text-black text-start text-[20px] md:text-[28px] font-semibold font-fredoka">
                      Profiles
                    </div>
                    <div className="text-black text-start  text-[20px] md:text-[28px] font-semibold font-fredoka ">
                      3/5
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full claracontainer gap-4">
                    <ProfileCard ProfilData={profilData} />
                    <ProfileCard ProfilData={profilData} />
                    <ProfileCard ProfilData={profilData} />
                    <ProfileCard ProfilData={profilData} />
                    <ProfileCard ProfilData={profilData} />
                  </div>
                </DialogDescription>
                <DialogFooter className="sticky rounded-t-[16px] bottom-0 m-0 w-full ">
                  <PopupFooter PrimaryText="Save and Continue" />
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Orders Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Bag}
                  iconBackgroundColor="#3F3A64"
                  title="Orders"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-w-[96%] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          My{" "}
                        </span>
                        <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          Order
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <div className="grid grid-cols-1 md:grid-cols-4 h-auto w-full claracontainer gap-4">
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                  </div>
                </DialogDescription>
                <DialogFooter className="sticky  rounded-t-[16px] bottom-0 m-0 w-full bg-[#ffffff]">
                  <PopupFooter PrimaryText="Save and Continue" />
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Connect a partner Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Partner}
                  iconBackgroundColor="#FF8E00"
                  title="Connect a Partner"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5]  scrollbar-hidden  max-w-[96%] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          Connect{" "}
                        </span>
                        <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          A Partner
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <div className="flex flex-col md:flex-row px-2 md:px-6 lg:px-24 max-w-[800px] justify-center items-start claracontainer gap-4">
                    <div className="flex w-full max-w-[20%]">
                      <Image
                        alt="Kindi"
                        src={ConnectPartner}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-start items-start gap-4">
                      <div className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                        Get $20
                      </div>{" "}
                      <div className="text-[#757575] text-[16px] md:text-2xl font-medium font-fredoka ">
                        Invite a Partner or friends, family, coworkers,
                        neighbours, and your favourite barista to Brushlink.
                        Every time someone books and visits a new dentist
                        through your link, you both get $20.
                      </div>
                      {/* Form to Invite the Partner */}
                      <ConnectAccountForm />
                      {/* <div className="flex w-full flex-col justify-start items-start gap-4">
                        <Input
                          type="text"
                          className=" bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00]  shadow border border-[#383838]"
                          placeholder="Partners Name"
                        />
                        <Input
                          type="email"
                          className=" bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00] shadow border border-[#383838]"
                          placeholder="Partners Email"
                        />
                      </div> 
                      <Button className="bg-[#3f3a64]  hover:bg-purple border-purple hover:border-4 hover:border-[#4d3d9738]  rounded-[27px] border-4 border-[#3f3a64]/40 justify-center items-center inline-flex text-white font-semibold">
                        Send an Invite
                      </Button> */}
                    </div>
                  </div>
                </DialogDescription>
                <DialogFooter className="sticky bottom-0 m-0 w-full ">
                  <PopupFooter PrimaryText="Save and Continue" />
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Payment Method Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Payments}
                  iconBackgroundColor="#019ACF"
                  title="Payment Method"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-w-[96%] max-h-[70%] scrollbar-hidden overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          Payment{" "}
                        </span>
                        <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          Methods
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-4 lg:px-6 py-6 w-full claracontainer gap-4">
                    <Image
                      alt="Kindi"
                      src={MasterCard}
                      className="w-full cursor-pointer hover:scale-[1.05] transition-transform duration-300 ease-in-out h-auto"
                    />
                    <Image
                      alt="Kindi"
                      src={MasterCard}
                      className="w-full cursor-pointer hover:scale-[1.05] transition-transform duration-300 ease-in-out h-auto"
                    />
                    <Image
                      alt="Kindi"
                      src={MasterCard}
                      className="w-full cursor-pointer hover:scale-[1.05] transition-transform duration-300 ease-in-out h-auto"
                    />
                    <Image
                      alt="Kindi"
                      src={MasterCard}
                      className="w-full cursor-pointer hover:scale-[1.05] transition-transform duration-300 ease-in-out h-auto"
                    />
                    <Image
                      alt="Kindi"
                      src={MasterCard}
                      className="w-full cursor-pointer hover:scale-[1.05] transition-transform duration-300 ease-in-out h-auto"
                    />
                  </div>
                </DialogDescription>
                <DialogFooter className="sticky bottom-0 m-0 w-full bg-[#ffffff]">
                  <PopupFooter PrimaryText="Save and Continue" />
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Settings Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={ProfileSettingIcon}
                  iconBackgroundColor="#C42797"
                  title="Settings"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] w-full lg:max-w-[1000px] lg:w-[1000px] max-h-[70%] scrollbar-hidden overflow-scroll p-0 overflow-x-hidden rounded-[16px] claracontainer">
                <DialogHeader className="flex pt-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <span className="text-center text-red text-4xl font-semibold font-fredoka capitalize  ">
                        My{" "}
                      </span>
                      <span className="text-center text-[#3f3a64] text-4xl font-semibold font-fredoka capitalize  ">
                        Settings
                      </span>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
                    <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
                      <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
                        {/* Profile Edit */}
                        {profileData ? (
                          <>
                            <Link href="/profile/edit">
                              <SettingCard
                                Value={profileData.name}
                                image={User}
                                title="Full Name"
                              />
                            </Link>
                            {/* Email Edit */}
                            <SettingCard
                              disabled
                              Value={profileData.email}
                              image={Email}
                              title="Email"
                            />
                            {/* <SettingCard
                              disabled
                              Value={profileData.isVerified}
                              image={Phone}
                              title="Phone Number"
                            /> */}
                            {/* Terms & Condition  */}
                            <Link href="/p/tnc">
                              <SettingCard
                                Value="Term & Condition"
                                image={TnC}
                                title="Kindi's Learning"
                              />
                            </Link>
                          </>
                        ) : (
                          <SettingCard
                            Value="No Name Provided"
                            image={User}
                            title="Full Name"
                          />
                        )}

                        {/* Language Edit */}
                        <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
                          <DialogTrigger>
                            <SettingCard
                              Value="English"
                              image={LanguageIcon}
                              title="Language"
                            />
                          </DialogTrigger>
                          <DialogContent className="bg-[#EAEAF5] max-w-[96%] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                            <DialogHeader className="p-4">
                              <div className="flex flex-row justify-center items-center w-full">
                                <DialogTitle>
                                  <div className="text-center">
                                    <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                      My{" "}
                                    </span>
                                    <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                      Activity
                                    </span>
                                  </div>
                                </DialogTitle>
                              </div>
                            </DialogHeader>
                            <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                              <div className="text-black  text-[20px] md:text-[28px]  font-semibold font-fredoka  ">
                                Coming Soon
                              </div>
                            </DialogDescription>
                            <DialogFooter className="sticky  rounded-t-[16px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bottom-0 m-0 w-full px-4 bg-[#ffffff]">
                              <PopupFooter PrimaryText="Save and Continue" />
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </section>
                </DialogDescription>
              </DialogContent>
            </Dialog>
            {/* Help Center Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Support}
                  iconBackgroundColor="#3F3D91"
                  title="Help Center"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] w-full lg:max-w-[1000px] lg:w-[1000px] overflow-y-scroll scrollbar-hidden p-0 overflow-x-hidden rounded-[16px] claracontainer">
                <DialogHeader>
                  <DialogTitle>
                    <div className="text-center pt-4">
                      <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                        Help{" "}
                      </span>
                      <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                        Center
                      </span>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <section className="w-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
                      <div className="flex flex-col gap-4 justify-center items-center w-full">
                        <ContactForm />
                        <Link
                          target="_blank"
                          href="/p/faq"
                          className="text-center px-4 w-full text-[#3f3a64] clarabodyTwo "
                        >
                          <MyProfileRoutes
                            image={Support}
                            iconBackgroundColor="#3F3D91"
                            title="Check FAQ's"
                          />
                        </Link>
                      </div>
                    </section>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <SignOutButton />
          </div>

          {/* Reffereal Card Section */}
          <div className="claracontainer px-0 w-full flex flex-col justify-start items-start overflow-hidden gap-8">
            <ReferralCard />
          </div>
        </div>
      </section>
    </>
  );
}
