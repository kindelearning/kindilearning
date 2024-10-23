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
  Support,
  TnC,
  User,
  MasterCard,
  ConnectPartner,
  Milestone,
  ProfileSettingIcon,
  VerifiedIcon,
  ProfileProgress,
  ProfilePlaceHolderOne,
  PartnerBulb,
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
import { Plus } from "lucide-react";

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
      id
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
export const ConnectAccountForm = ({ userId }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

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

  const handleConnect = async (e) => {
    e.preventDefault();

    if (!session || !session.user) {
      setMessage("Please log in to connect a partner.");
      return;
    }

    const accountEmail = session.user.email; // Get the logged-in user's email

    const query = `
    mutation AddPartner($accountEmail: String!, $partnerEmail: String!) {
      updateAccount(
        where: { email: $accountEmail },
        data: {
          partner: {
            connect: { where: { email: $partnerEmail } }
          }
        }
      ) {
        id
        email
        username
        partner {
          id
          email
          username
        }
      }
    }
  `;

    // Variables for the mutation
    const variables = {
      // accountEmail: "ac.dravya44409@gmail.com", // Replace with the actual account email
      accountEmail,
      partnerEmail: email.trim(), // Use the partner's email from the input
    };

    try {
      const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();
      console.log("Result Line", result);

      if (result.errors) {
        setIsLoading(true); // Set loading to true when the request starts
        setMessage("Error connecting partner: " + result.errors[0].message);
      } else {
        setMessage("Partner connected successfully!");
        setEmail(""); // Clear the input after success
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <form
      onSubmit={handleConnect}
      className="flex w-full flex-col justify-start items-start gap-4"
    >
      <Input
        type="email"
        className="bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00]  shadow border border-[#383838]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter partner's email"
        required
      />
      {/* <Button type="submit">Connect Partner</Button> */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Connect Partner"}
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
};

/**
 *
 * @param {List of Partner of the User} param0
 * @returns
 */
const PartnerList = ({ userId }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPartners = async () => {
    const query = `
      query($where: AccountWhereUniqueInput!) {
        account(where: $where) {
          id
          partner {
            id
            email
            username
             profilePicture {
                url
              }
            dateOfBirth
          }
        }
      }
    `;

    const variables = {
      where: { id: userId }, // User ID of the current user
    };

    try {
      const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      } else {
        setPartners(result.data.account.partner);
      }
    } catch (error) {
      setError("Error fetching partners: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    fetchPartners();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex w-full claracontainer gap-4 flex-col justify-start items-start">
        <div className="flex justify-between w-full items-center">
          <div className="text-black text-start text-[20px] md:text-[28px] font-semibold font-fredoka">
            Profiles
          </div>
          <div className="text-black text-start text-[20px] md:text-[28px] font-semibold font-fredoka ">
            {`${partners.length}/5`}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full claracontainer gap-4">
          {partners.map((partner) => (
            <>
              <div
                key={partner.id}
                className="w-full flex flex-row justify-between items-center p-2 bg-white rounded-xl"
              >
                <div className="flex flex-row gap-2 w-full justify-start items-center">
                  <div className="w-16 h-16 overflow-clip flex justify-center items-center">
                    <Image
                      src={partner.profilePicture?.url || ProfilePlaceHolderOne} // Default image if not available
                      alt="Profile Image"
                      width={64}
                      height={64}
                      className="min-w-16 min-h-16 object-cover rounded-full"
                    />
                  </div>
                  <div className="w-full flex-col justify-start items-start inline-flex">
                    <div className="text-[#0a1932] w-full text-[28px] font-semibold font-fredoka leading-tight">
                      {/* {partner.username} */}
                      {partner.username
                        ? partner.username
                        : partner.email.split("@")[0]}
                    </div>
                    <div className="text-[#757575] w-full clarabodyTwo">
                      {partner.dateOfBirth
                        ? `Age: ${calculateAge(partner.dateOfBirth)}`
                        : "DOB not provided"}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}

          <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
            <DialogTrigger className="w-full">
              <div
                className={`w-full min-h-[90px] flex flex-row justify-center items-center p-2 bg-white rounded-xl 
                ${
                  partners.length >= 5
                    ? "opacity-50 cursor-not-allowed text-black pointer-events-none"
                    : "cursor-pointer  text-red "
                }`}
              >
                <Plus className="text-red" /> New Profile
              </div>
            </DialogTrigger>
            <DialogContent className="bg-[#EAEAF5] min-h-[300px] pb-24 items-start scrollbar-hidden  max-w-[96%] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
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
                      neighbours, and your favourite barista to Brushlink. Every
                      time someone books and visits a new dentist through your
                      link, you both get $20.
                    </div>
                    <ConnectAccountForm />
                  </div>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-row justify-center w-full items-center">
          <Image alt="Kindi" src={PartnerBulb} className="w-[24px] h-[24px]" />
          <div className="text-black text-start clarabodyTwo">
            You can add {5 - partners.length} more profiles{" "}
          </div>
        </div>
      </div>
    </>
  );
};

/**
 *
 * @param {MyActivity completed by User} param0
 * @returns
 */
const MyLevel = ({ userID }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivities = async () => {
    const query = `
      query GetUserActivities($relationalFirst: Int, $where: AccountWhereUniqueInput!) {
        values: account(where: $where) {
          id
          username
          myActivity(first: $relationalFirst) {
            id
            title
            documentInStages(includeCurrent: true) {
              id
              stage
              updatedAt
              publishedAt
            }
          }
        }
      }
    `;

    const variables = {
      relationalFirst: 10,
      where: { id: userID },
    };

    try {
      const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      } else {
        setActivities(result.data.values.myActivity);
      }
    } catch (error) {
      setError("Error fetching activities: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [userID]);

  const getUserLevel = (activityCount) => {
    if (activityCount >= 0 && activityCount <= 5) {
      return 1; // Level 1
    } else if (activityCount > 5 && activityCount <= 10) {
      return 2; // Level 2
    } else if (activityCount > 10 && activityCount <= 15) {
      return 3; // Level 3
    } else if (activityCount > 15 && activityCount <= 20) {
      return 4; // Level 4
    } else if (activityCount > 20 && activityCount <= 25) {
      return 5; // Level 5
    } else {
      return "Max Level"; // More than 25
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const userLevel = getUserLevel(activities.length);
  const progressPercentage = (activities.length / 25) * 100;

  return (
    <div className="flex w-full flex-col justify-start items-center gap-2">
      <div className="w-full claracontainer flex flex-row gap-2 justify-start items-center">
        <div className="text-[#3f3a64] clarabodyTwo">
          User Level: {userLevel}
        </div>
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
      </div>
      <div className="flex w-full gap-1 items-center">
        <div
          className="progress-bar-container"
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
            // marginTop: "10px",
            // color:'#f15c57'
          }}
        >
          <div
            className="progress-bar"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: "#f15c57",
              height: "10px",
              borderRadius: "5px",
              // color:'#f15c57'
            }}
          ></div>
        </div>
        <p className="clarabodyTwo w-[max-content] min-w-[120px]">
          Activities: {activities.length}
        </p>
      </div>
      {/* <p style={{ marginTop: "5px", color: "#555" }}>
        {Math.round(progressPercentage)}% completed
      </p> */}
    </div>
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
                  {/* <div className="text-[#3f3a64] clarabodyTwo">User Level: {userLevel}</div> */}
                  {/* Trigger for the Level Popup */}
                  {profileData ? <MyLevel userID={profileData.id} /> : null}
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
                icon={ProfileProgress}
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
            <Dialog className="bg-[#EAEAF5] w-full items-start claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Kid}
                  iconBackgroundColor="#029871"
                  title="Kids Profile"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-w-[96%] items-start max-h-[70%] scrollbar-hidden overflow-scroll p-0 overflow-x-hidden  rounded-[16px] w-full claracontainer">
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
                <DialogDescription className="flex w-full min-h-[300px] pb-24 px-4 claracontainer gap-4 flex-col justify-center items-start">
                  {profileData ? (
                    <PartnerList userId={profileData.id} />
                  ) : (
                    <></>
                  )}
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
                      <ConnectAccountForm />
                    </div>
                  </div>
                </DialogDescription>
                {/* <DialogFooter className="sticky bottom-0 m-0 w-full ">
                  <PopupFooter PrimaryText="Save and Continue" />
                </DialogFooter> */}
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
