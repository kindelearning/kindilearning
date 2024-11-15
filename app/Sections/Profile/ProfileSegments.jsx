"use client";

import { useAuth } from "@/app/lib/useAuth";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getUserDataByEmail } from "@/lib/hygraph";
import { useRouter } from "next/navigation";
import { GraphQLClient, gql } from "graphql-request";
import { useEffect, useState } from "react";
import {
  Achievement,
  Bag,
  Email,
  Kid,
  LanguageIcon,
  Partner,
  Payments,
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
import Head from "next/head";
import Link from "next/link";
import BadgeSection from "./BadgeSection";
import ReferralForm from "./ReferralCard";
import ProductCard from "./ProductCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MyProfileRoutes from "./MyProfileRoutes";
import { DebitCard, PopupFooter } from "..";
import { data } from "@/app/constant/menu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SettingCard from "./SettingCard";
import { Plus } from "lucide-react";
import LevelCard from "./LevelCard";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { StockImages } from "@/app/constant/profile";
import { getAuth, signOut } from "firebase/auth";
import app from "@/app/firebase/firebaseConfig";
import LevelList from "./LevelList";

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

/**
 * @level_badge_popup_content
 */

const MyLevel = ({ userID }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivities = async () => {
    if (!userID) return; // Check if userID is valid

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
        setActivities(result.data.values.myActivity || []);
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

  // Function to determine the user level
  const getUserLevel = (activityCount) => {
    if (activityCount >= 0 && activityCount <= 5) return 1;
    if (activityCount > 5 && activityCount <= 10) return 2;
    if (activityCount > 10 && activityCount <= 15) return 3;
    if (activityCount > 15 && activityCount <= 20) return 4;
    if (activityCount > 20 && activityCount <= 25) return 5;
    return "Max Level"; // More than 25
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
                    <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                      My{" "}
                    </span>
                    <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                      Level
                    </span>
                  </div>
                </DialogTitle>
              </div>
            </DialogHeader>
            <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
              <div className="flex flex-col justify-center items-center w-full claracontainer gap-4">
                <LevelList />
              </div>
            </DialogDescription>
            <DialogFooter className="sticky rounded-t-[16px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bottom-0 m-0 w-full  bg-[#ffffff]">
              <DialogClose className="w-full">
                <PopupFooter PrimaryText="Save and Continue" />
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Link href="/profile/update" className="flex lg:hidden" target="_blank">
          <Badge
            className="text-[10px] md:text-[16px] cursor-pointer"
            variant="outline"
          >
            Edit
          </Badge>
        </Link>
      </div>

      <div className="flex w-full gap-1 items-center">
        <div
          className="progress-bar-container"
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
          }}
        >
          <div
            className="progress-bar"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: "#f15c57",
              height: "10px",
              borderRadius: "5px",
            }}
          ></div>
        </div>
        <p className="clarabodyTwo w-[max-content] min-w-[90px] lg:min-w-[120px]">
          Activities: {activities.length}
        </p>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    inquiryType: "",
    subject: "",
    phoneNumber: "", // Add phoneNumber here
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
  const inquiryOptions = [
    "Career Opportunities",
    "Partnership or Collaboration Opportunity",
    "Investment Opportunities",
    "Compliment or Praise",
    "Press or Media Inquiry",
    "Product Suggestions or Recommendations",
    "Custom Orders or Special Requests",
    "Wholesale or Bulk Order Inquiry",
    "Events",
    "Subscription or Service Questions",
    "Billing or Payment",
    "Website Bug or Technical Issue",
    "Technical Assistance",
    "Returns, Exchanges, or Refunds",
    "Order Status",
    "Product Information Request",
    "Account Login or Password Help",
    "Feedback or Complaint",
    "Developer Support (API, Integration)",
  ];

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
        setFormData({
          name: "",
          email: "",
          message: "",
          subject: "",
          inquiryType: "",
          phoneNumber: "",
        });
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
          className="flex justify-center items-center flex-col gap-2 lg:gap-4 w-full"
        >
          <div className="flex w-full flex-col lg:flex-row gap-2 lg:gap-1">
            <Input
              type="text"
              name="name"
              value={formData.name}
              className="border p-2"
              placeholder="Your Name"
              onChange={handleChange}
              required
            />

            <Input
              type="email"
              name="email"
              className="border p-2"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleChange}
              required
            />
          </div>

          <Input
            type="tel"
            name="phoneNumber"
            className="border p-2"
            value={formData.phoneNumber}
            required
            placeholder="Your Contact"
            onChange={handleChange}
          />
          <Input
            name="subject"
            value={formData.subject}
            placeholder="Enter Subject"
            onChange={handleChange}
            className="border p-2"
            required
          />
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
            className="border p-2 font-fredoka text-[#7f8896] rounded-[8px] w-full"
          >
            <option className="text-black" value="">
              Select Inquiry Type
            </option>
            {inquiryOptions.map((option, index) => (
              <option className="text-black" key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Textarea
            name="message"
            value={formData.message}
            placeholder="Your Message"
            onChange={handleChange}
            className="border p-2"
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

// GraphQL query to fetch partners for a specific account by ID

const FETCH_PARTNERS_QUERY = gql`
  query ($where: AccountWhereUniqueInput!) {
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

const getHygraphPartners = async (userId) => {
  try {
    const data = await client.request(FETCH_PARTNERS_QUERY, {
      where: { id: userId },
    });
    return data.account.partner || [];
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
};

const PartnerList = ({ userId }) => {
  const [partners, setPartners] = useState([]);
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);
  const [partnerLoading, setPartnerLoading] = useState(true); // Added loading state for partners

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/sign-up"); // Redirect to login if not authenticated
    }

    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }

    // Fetch partners data for the current user
    const fetchPartners = async () => {
      setPartnerLoading(true); // Set loading state
      const partnerData = await getHygraphPartners(userId);
      setPartners(partnerData);
      setPartnerLoading(false); // Reset loading state once data is fetched
    };

    if (userId) fetchPartners();
  }, [userId, user, loading, router]);

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

  return (
    <div className="flex w-full claracontainer gap-4 flex-col justify-start items-start">
      {/* Partner Popup header */}
      <div className="flex justify-between w-full items-center">
        <div className="text-black text-start text-[20px] md:text-[28px] font-semibold font-fredoka">
          Profiles
        </div>
        <div className="text-black text-start text-[20px] md:text-[28px] font-semibold font-fredoka">
          {partners.length}/5
        </div>
      </div>

      {/* Partners Popup Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full claracontainer gap-4">
        {partnerLoading ? ( // Added loading state for partners
          <p>Loading partners...</p>
        ) : partners.length > 0 ? (
          partners.map((partner) => (
            <div
              className="w-full flex flex-row justify-between items-center p-2 bg-white rounded-xl"
              key={partner.id}
            >
              <div className="flex flex-row gap-2 w-full justify-start items-center">
                <div className="w-16 h-16 overflow-clip flex justify-center items-center">
                  {partner.profilePicture ? (
                    <Image
                      src={partner.profilePicture?.url}
                      alt="Profile Image"
                      width={64}
                      height={64}
                      className="min-w-16 min-h-16 object-cover rounded-full"
                    />
                  ) : (
                    <Image
                      src={ProfilePlaceHolderOne} // Ensure this is correctly imported
                      alt="Profile Image"
                      width={64}
                      height={64}
                      className="min-w-16 min-h-16 object-cover rounded-full"
                    />
                  )}
                </div>
                <div className="w-full flex-col justify-start items-start inline-flex">
                  <div className="text-[#0a1932] w-full text-[28px] font-semibold font-fredoka leading-tight">
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
          ))
        ) : (
          <p>No partner information available.</p>
        )}
      </div>

      {/* New Profile Dialog */}
      <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
        <DialogTrigger className="w-full">
          <div
            className={`w-full min-h-[90px] flex flex-row justify-center items-center p-2 bg-white rounded-xl
              ${
                partners.length >= 5
                  ? "opacity-50 cursor-none pointer-events-none"
                  : "cursor-pointer text-red"
              }`}
            onClick={() => {
              if (partners.length < 5) {
                console.log("New Profile Clicked");
              }
            }}
          >
            <Plus className="text-red" /> New Profile
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[#EAEAF5] scrollbar-hidden max-w-[96%] lg:max-w-[800px] lg:pb-12 max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
          <DialogHeader className="p-4">
            <div className="flex flex-row justify-center items-center w-full">
              <DialogTitle>
                <div className="text-center">
                  <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    Connect{" "}
                  </span>
                  <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    A Partner
                  </span>
                </div>
              </DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
            <div className="flex flex-col md:flex-row px-2 md:px-6 max-w-[1000px] justify-center items-start claracontainer gap-4">
              <div className="flex w-full max-w-[20%]">
                <Image
                  alt="Kindi"
                  src={ConnectPartner}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex w-full flex-col justify-start items-start gap-4">
                <div className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                  Get $20
                </div>
                <div className="text-[#757575] text-[16px] md:text-2xl font-medium font-fredoka">
                  Invite a Partner or friends, family, coworkers, neighbors, and
                  your favorite barista to Brushlink. Every time someone books
                  and visits a new dentist through your link, you both get $20.
                </div>
                {user && hygraphUser ? (
                  <ConnectAccountForm userId={hygraphUser.id} />
                ) : (
                  <>id Not found</>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Remaining Profile Slots Info */}
      <div className="flex flex-row justify-center w-full items-center">
        <Image alt="Kindi" src={PartnerBulb} className="w-[24px] h-[24px]" />
        <div className="text-black text-start clarabodyTwo">
          You can add {5 - partners.length} more profiles
        </div>
      </div>
    </div>
  );
};

export const ConnectAccountForm = () => {
  const [partnerEmail, setPartnerEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user]);

  // Function to check if partner exists
  const checkPartnerExists = async (email) => {
    const query = `
      query GetAccountByEmail($email: String!) {
        account(where: { email: $email }) {
          id
          email
        }
      }
    `;
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query, variables: { email } }),
    });
    const result = await response.json();
    return result.data && result.data.account;
  };

  // Handles form submission
  const handleInvite = async (e) => {
    e.preventDefault();

    if (!user || !hygraphUser) {
      setMessage("You must be logged in to invite a partner.");
      return;
    }

    try {
      setIsLoading(true);

      // Check if the partner exists
      const partnerExists = await checkPartnerExists(partnerEmail.trim());
      if (!partnerExists) {
        setMessage("Partner does not exist. Please enter a valid email.");
        return;
      }

      // Define mutation query and variables
      const mutation = `
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
      const variables = {
        accountEmail: hygraphUser.email, // Current logged-in user's email
        partnerEmail: partnerEmail.trim(),
      };

      const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        setMessage(`Error: ${result.errors[0].message}`);
      } else {
        setMessage("Partner invited successfully!");
        setPartnerEmail(""); // Clear input field after success
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleInvite}
      className="flex w-full flex-col justify-start items-start gap-4"
    >
      <Input
        type="email"
        value={partnerEmail}
        onChange={(e) => setPartnerEmail(e.target.value)}
        placeholder="Enter partner's email"
        required
        className="bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00] shadow border border-[#383838]"
      />
      <Button
        type="submit"
        className="clarabutton bg-red hover:bg-hoverRed"
        disabled={isLoading}
      >
        {isLoading ? "Inviting..." : "Invite Partner"}
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
};

const ADD_PAYMENT_METHOD_MUTATION = `
  mutation AddPaymentMethod(
    $name: String!,
    $number: Int!,
    $expiryDate: Date!,
    $cvv: Int!
  ) {
    createPaymentMethod(data: {
      name: $name,
      number: $number,
      expiryDate: $expiryDate,
      cvv: $cvv
    }) {
      id
    }
  }
`;

const CONNECT_PAYMENT_METHOD_TO_USER_MUTATION = `
  mutation ConnectPaymentMethodToUser($userId: ID!, $paymentMethodId: ID!) {
  updateAccount(
    where: { id: $userId }
    data: {
      myPaymentMethod: {
        connect: { where: { id: $paymentMethodId } }
      }
    }
  ) {
    id
  }
}
`;

const GET_PAYMENT_METHODS_QUERY = `
  query GetPaymentMethods($userId: ID!) {
    account(where: { id: $userId }) {
      myPaymentMethod {
        id
        name
        number
        expiryDate
        cvv
      }
    }
  }
`;

// const PaymentMethodFormB = ({ userId }) => {
//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Step 1: Create a new Payment Method
//       const response = await fetch(HYGRAPH_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${HYGRAPH_TOKEN}`,
//         },
//         body: JSON.stringify({
//           query: ADD_PAYMENT_METHOD_MUTATION,
//           variables: {
//             name,
//             number: parseInt(number, 10),
//             expiryDate,
//             cvv: parseInt(cvv, 10),
//           },
//         }),
//       });

//       const { data, errors } = await response.json();

//       if (errors) {
//         setMessage("Error creating payment method: " + errors[0].message);
//         setIsLoading(false);
//         return;
//       }

//       const paymentMethodId = data.createPaymentMethod.id;

//   // Step 2: Connect the created Payment Method to the user's account
//   const connectResponse = await fetch(HYGRAPH_ENDPOINT, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${HYGRAPH_TOKEN}`,
//     },
//     body: JSON.stringify({
//       query: CONNECT_PAYMENT_METHOD_TO_USER_MUTATION,
//       variables: {
//         userId,
//         paymentMethodId,
//       },
//     }),
//   });

//   const connectResult = await connectResponse.json();

//       if (connectResult.errors) {
//         setMessage(
//           "Error connecting payment method: " + connectResult.errors[0].message
//         );
//       } else {
//         setMessage("Payment method added successfully!");
//         setName("");
//         setNumber("");
//         setExpiryDate("");
//         setCvv("");
//       }
//     } catch (error) {
//       setMessage("Error: " + error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name on Card"
//         required
//       />
//       <input
//         type="number"
//         value={number}
//         onChange={(e) => setNumber(e.target.value)}
//         placeholder="Card Number"
//       />
//       <input
//         type="date"
//         value={expiryDate}
//         onChange={(e) => setExpiryDate(e.target.value)}
//         placeholder="Expiry Date"
//       />
//       <input
//         type="number"
//         value={cvv}
//         onChange={(e) => setCvv(e.target.value)}
//         placeholder="CVV"
//       />
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? "Adding..." : "Add Payment Method"}
//       </button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// };

const PaymentMethodForm = ({ userId }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      number: parseInt(number), // Ensure the number is an integer
      expiryDate,
      cvv: parseInt(cvv), // Ensure CVV is an integer
    };

    await createAndPublishPaymentMethod(data);
  };

  const createAndPublishPaymentMethod = async (data) => {
    try {
      // Step 1: Create PaymentMethod
      const createResponse = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
              mutation CreatePaymentMethod($data: PaymentMethodCreateInput!) {
                createPaymentMethod(data: $data) {
                  id
                }
              }
            `,
          variables: { data },
        }),
      });
      const createResult = await createResponse.json();
      const paymentMethodId = createResult.data.createPaymentMethod.id;

      // Step 2: Publish PaymentMethod
      const publishResponse = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
              mutation PublishPaymentMethod($id: ID!) {
                publishPaymentMethod(where: { id: $id }, to: PUBLISHED) {
                  id
                }
              }
            `,
          variables: { id: paymentMethodId },
        }),
      });
      const publishResult = await publishResponse.json();

      // Step 3: Connect the created Payment Method to the user's account
      const connectResponse = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({
          query: CONNECT_PAYMENT_METHOD_TO_USER_MUTATION,
          variables: {
            userId,
            paymentMethodId,
          },
        }),
      });
      const connectResult = await connectResponse.json();

      if (publishResult.errors) {
        throw new Error("Error publishing payment method");
      }

      setMessage("Payment method added and published successfully!");
    } catch (error) {
      console.error("Error creating or publishing payment method:", error);
      setMessage("Error adding payment method.");
    }
  };

  return (
    <form
      className="flex flex-col gap-2 w-full justify-center items-start"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <Input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Card Number"
        required
      />
      <Input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
      />
      <Input
        type="text"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        placeholder="CVV"
        required
      />
      <button
        className="clarabutton py-2 bg-red hover:bg-hoverRed text-white"
        type="submit"
      >
        Submit Payment Method
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

const PaymentMethodsList = ({ userId }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(HYGRAPH_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({
            query: GET_PAYMENT_METHODS_QUERY,
            variables: { userId },
          }),
        });

        const { data, errors } = await response.json();

        if (errors) {
          setError("Error fetching payment methods: " + errors[0].message);
        } else {
          console.log("Fetched payment methods:", data.account.myPaymentMethod); // Debugging line
          setPaymentMethods(data.account.myPaymentMethod || []);
        }
      } catch (error) {
        setError("Error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [userId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {paymentMethods.length > 0 ? (
        <>
          {paymentMethods.map((method) => (
            <div
              className="w-full items-center justify-center flex"
              key={method.id}
            >
              <DebitCard
                cardName={method.name}
                cardNumber={method.number}
                expiary={method.expiryDate}
              />
            </div>
          ))}
        </>
      ) : (
        <p>No payment methods saved.</p>
      )}
    </>
  );
};

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * StockImages.length);
  return StockImages[randomIndex].url;
};

const RandomImageComponent = () => {
  const randomImage = getRandomImage();

  return (
    <div className="relative w-20  -mx-[32px] h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
      <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
        <Image
          src={randomImage}
          alt="Random Profile Placeholder"
          className="w-[72px] h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
        />
      </div>
    </div>
  );
};

export default function ProfileSegments() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );
  const auth = getAuth(app); // Use the initialized app here

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User successfully logged out");

      // Redirect to the home or login page after logging out
      router.push("/p");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
              {user && hygraphUser ? (
                <>
                  <div className="relative w-20 h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                    <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
                      <Image
                        src={
                          hygraphUser.profilePicture?.url ||
                          ProfilePlaceHolderOne
                        }
                        alt="User DP"
                        width={100}
                        height={100}
                        className="w-[72px] h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <RandomImageComponent />
              )}
            </div>

            <div className="w-full gap-4 flex flex-col justify-center">
              <div className="flex flex-row justify-between items-start w-full">
                {user && hygraphUser ? (
                  <div className="flex flex-col w-full justify-start items-start">
                    <div className="flex gap-1 items-center w-full justify-start">
                      <h2 className="text-[#029871] text-[20px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold font-fredoka leading-tight">
                        {hygraphUser.name || "Kindi Learner"}
                      </h2>
                      {hygraphUser.isVerified && (
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
                      Email: {hygraphUser.email}
                    </p>
                  </div>
                ) : (
                  <div className="flex w-full flex-col justify-start items-start gap-2">
                    <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                      Kindi Learner
                    </h2>
                    <p className="font-fredoka text-[12px] lg:text-[20px]">
                      <Link href="/auth/sign-in" className="text-red">
                        Login&nbsp;
                      </Link>
                      to use more feature
                    </p>
                  </div>
                )}
                {/* Trigger for the Edit Profile Popup for Larger screen */}
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
              {/* Trigger for the Level Popup and Edit on Mobile, hidden after mobile */}
              <div className="flex flex-col w-full gap-1 items-start justify-start">
                <div className="flex flex-row w-full justify-start items-center gap-2">
                  {user && hygraphUser ? (
                    <MyLevel userID={hygraphUser.id} />
                  ) : null}
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
                  {user && hygraphUser ? (
                    <PartnerList userId={hygraphUser.id} />
                  ) : (
                    <></>
                  )}
                </DialogDescription>
                <DialogFooter className="sticky rounded-t-[16px] bottom-0 m-0 w-full ">
                  <DialogClose className="w-full">
                    <PopupFooter PrimaryText="Save and Continue" />
                  </DialogClose>
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
              <DialogContent className="bg-[#EAEAF5] scrollbar-hidden max-w-[96%] lg:max-w-[800px] lg:pb-12 max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
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
                  <div className="flex flex-col md:flex-row px-2 md:px-6  max-w-[1000px] justify-center items-start claracontainer gap-4">
                    <div className="flex w-full max-w-[20%]">
                      <Image
                        alt="Kindi"
                        src={ConnectPartner}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-start items-start gap-4">
                      {/* <div className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                        Get $20
                      </div> */}
                      <div className="text-[#757575] text-[16px] leading-[18px] md:text-2xl md:leading-[26px] font-normal font-fredoka ">
                        Securely grant access to your child&apos;s progress,
                        activities, and milestones, ensuring that both parents
                        can stay up-to-date and involved in every step of their
                        learning. Simply invite your partner to join, and
                        they&apos;ll gain shared access to the Kindi
                        experience—helping you both support your little one
                        together.
                      </div>
                      {user && hygraphUser ? (
                        <ConnectAccountForm />
                      ) : (
                        <>id Not found</>
                      )}
                    </div>
                  </div>
                </DialogDescription>
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
                    {user && hygraphUser ? (
                      <PaymentMethodsList userId={hygraphUser.id} />
                    ) : (
                      <p>id not found</p>
                    )}
                  </div>

                  <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
                    <DialogTrigger className="w-full">
                      <Button className="bg-transparent text-black hover:bg-white hover:border-black ">
                        Add new Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#EAEAF5] max-w-[96%] lg:max-w-[800px] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                      <DialogHeader className="p-4">
                        <div className="flex flex-row justify-center items-center w-full">
                          <DialogTitle>
                            <div className="text-center">
                              <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                Add New{" "}
                              </span>
                              <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                Payment Method
                              </span>
                            </div>
                          </DialogTitle>
                        </div>
                      </DialogHeader>
                      <DialogDescription className="flex w-full px-4 pb-12 claracontainer flex-col justify-start items-center">
                        {user && hygraphUser ? (
                          <PaymentMethodForm userId={hygraphUser.id} />
                        ) : (
                          <p>id not found</p>
                        )}
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </DialogDescription>
                <DialogFooter className="sticky bottom-0 m-0 w-full bg-[#ffffff]">
                  <DialogClose className="w-full">
                    <PopupFooter PrimaryText="Save and Continue" />
                  </DialogClose>
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
                        {user && hygraphUser ? (
                          <>
                            <Link href="/profile/edit">
                              <SettingCard
                                Value={hygraphUser.name}
                                image={User}
                                title="Full Name"
                              />
                            </Link>
                            {/* Email Edit */}
                            <SettingCard
                              disabled
                              Value={hygraphUser.email}
                              image={Email}
                              title="Email"
                            />
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
          </div>
          <div className="w-full justify-start items-center flex">
            <Button
              className="clarabutton max-w-[300px] bg-red hover:bg-hoverRed"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {/* Reffereal Card Section */}
          <div className="claracontainer px-0 w-full flex flex-col justify-start items-start overflow-hidden gap-8">
            <ReferralForm />
          </div>
        </div>
      </section>
    </>
  );
}
