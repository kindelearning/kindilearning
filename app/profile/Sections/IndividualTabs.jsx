import { data } from "@/app/constant/menu";
import CreateContactFormPage, {
  CreateContactFormforProfilePage,
} from "@/app/p/contact-us/page";
import { PopupFooter } from "@/app/Sections";
import MyProfileRoutes from "@/app/Sections/Profile/MyProfileRoutes";
import ProductCard from "@/app/Sections/Profile/ProductCard";
import SettingCard from "@/app/Sections/Profile/SettingCard";
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
import {
  Bag,
  ConnectPartner,
  Email,
  Kid,
  Partner,
  Payments,
  ProfilePlaceholder01,
  ProfileSettingIcon,
  Support,
  TnC,
  User,
} from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import RemoveKidButton from "./RemoveKidButton";
import UpdateKidForm from "./UpdateKidForm";
import AddKidForm from "./AddKidForm";
import RemovePaymentMethodButton, {
  AddPaymentMethodForm,
  UpdatePaymentDataForm,
} from "./RemovePaymentMethodButton";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import UpdatePartnerForm, { MyPartners } from "./AddPartnerForm";
import { useEffect, useState } from "react";

const CustomDialog = ({
  image,
  iconBackgroundColor,
  title,
  dialogTitle,
  dialogSubtitle,
  children,
  footerText,
}) => {
  return (
    <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
      <DialogTrigger className="w-full">
        <MyProfileRoutes
          image={image}
          iconBackgroundColor={iconBackgroundColor}
          title={title}
        />
      </DialogTrigger>
      <DialogContent className="bg-[#EAEAF5] max-w-[1000px] flex flex-col justify-between max-h-[70%] lg:min-h-[600px] min-h-[400px] overflow-y-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
        <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
          <DialogHeader className="p-4">
            <div className="flex flex-row justify-center items-center w-full">
              <DialogTitle>
                <div className="text-center">
                  <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    {dialogTitle}{" "}
                  </span>
                  <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    {dialogSubtitle}
                  </span>
                </div>
              </DialogTitle>
            </div>
          </DialogHeader>
          {children}
        </DialogDescription>
        <DialogFooter className="sticky lg:max-h-[52px] flex items-center rounded-t-[16px] bottom-0 m-0 w-full bg-[#ffffff]">
          <DialogClose className="w-full">
            <PopupFooter PrimaryText={footerText} />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const subscriptionLimits = {
  Family: 5,
  "Family Plus": 10,
  Professional: 30,
};

export const SkeletonLoader = () => {
  return (
    <div
      className="w-64 h-64 rounded-full bg-gray-200 animate-pulse flex justify-center items-center overflow-hidden"
      aria-label="Loading"
    >
      <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animateskeleton"></div>
    </div>
  );
};

export const KidsDP = ({ kidId }) => {
  const [dp, setDP] = useState(null); // Store the selected media
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchKidData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}?populate=*`
        );
        const data = await response.json();

        if (response.ok) {
          const kid = data.data;
          setDP(kid || null); // Update based on Strapi's typical structure
        } else {
          setError("Failed to fetch kid data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false); // End loading
      }
    };

    if (kidId) fetchKidData(); // Ensure kidId exists before fetching
  }, [kidId]);

  return (
    <div className="w-16 h-16 overflow-clip flex justify-center items-center">
      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p> // Display error if it exists
      ) : dp ? (
        <img
          src={`https://lionfish-app-98urn.ondigitalocean.app${dp?.kidDP?.url}`}
          alt={`${kidId}'s Profile`}
          width={64}
          height={64}
          className="min-w-16 min-h-16 object-cover rounded-full"
        />
      ) : (
        <Image
          src={ProfilePlaceholder01}
          alt={`${kidId}'s Profile`}
          width={64}
          height={64}
          className="min-w-16 min-h-16 object-cover rounded-full"
        />
      )}
    </div>
  );
};

export default function IndividualTabs({ userData }) {
  const currentKidsCount = userData.myKids.length / 2;
  const subscriptionLevel = userData.SubscriptionLevel;
  const maxKidsAllowed = subscriptionLimits[subscriptionLevel] || 0;

  return (
    <>
      <div className="flex w-full justify-center items-center gap-4 flex-col">
        {/* Kids Profile Model */}
        <CustomDialog
          image={Kid}
          iconBackgroundColor="#029871"
          title="Child Profile"
          dialogTitle="Child"
          dialogSubtitle="Profile"
          footerText="Save and Continue"
        >
          <>
            <p className="py-2 font-fredoka">
              You have added{" "}
              <span className="font-medium text-red">
                {currentKidsCount} out of {maxKidsAllowed}
              </span>{" "}
              Child allowed for your{" "}
              <span className="font-medium text-red">{subscriptionLevel}</span>{" "}
              subscription.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 w-full claracontainer gap-4">
              {userData?.myKids?.length > 0 ? (
                userData.myKids
                  .filter((_, index) => index % 2 === 0) // Use `index % 2 === 0` for even entries, or `index % 2 !== 0` for odd entries
                  .map((kid, index) => (
                    <div
                      className="w-full flex flex-row justify-between items-center p-2 bg-white rounded-xl"
                      key={index}
                    >
                      <div className="flex flex-row gap-2 w-full justify-start items-center">
                        <KidsDP kidId={kid.documentId} />
                        <div className="w-full flex-col justify-start items-start inline-flex">
                          <div className="text-[#0a1932] w-full text-[28px] font-semibold font-fredoka leading-tight">
                            {kid.Name}
                          </div>
                          <div className="text-[#757575] w-full clarabodyTwo">
                            {kid.dob
                              ? new Date(kid.dob).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "Date not available"}
                          </div>
                        </div>

                        <div className="flex w-fit items-center justify-between  gap-2">
                          <Dialog>
                            <DialogTrigger>
                              <Pencil className="w-[24px] h-[24px] text-red" />
                            </DialogTrigger>
                            <DialogContent className="max-w-[1000px] max-h-[600px] overflow-y-scroll">
                              <DialogHeader>
                                <DialogTitle>
                                  Update Profile for {kid.Name}
                                </DialogTitle>
                                <DialogDescription>
                                  <UpdateKidForm
                                    kidId={kid.documentId}
                                    parentId={userData.id}
                                  />
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>

                          <RemoveKidButton kidId={kid.documentId} />
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-[#757575]">No Child available to display.</p>
              )}
            </div>
            {currentKidsCount < maxKidsAllowed ? (
              <Dialog>
                <DialogTrigger>
                  <Button className="clarabutton my-4 bg-red hover:bg-hoverRed">
                    Add New Child
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      <AddKidForm parentId={userData.id} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ) : (
              <p className="text-red-500">
                You have reached the maximum limit of {maxKidsAllowed} Child for
                your {subscriptionLevel} subscription.
              </p>
            )}
          </>
        </CustomDialog>
        {/* Orders Model */}
        <CustomDialog
          image={Bag}
          iconBackgroundColor="#3F3A64"
          title="Orders"
          dialogTitle="My"
          dialogSubtitle="Order"
          footerText="Save and Continue"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 h-auto w-full claracontainer gap-4">
            {/* Replace with dynamic data */}
            {/* <ProductCard data={data} />
            <ProductCard data={data} />
            <ProductCard data={data} /> */}
            <ProductCard data={data} />
          </div>
        </CustomDialog>
        {/* Connect a partner Model */}
        <CustomDialog
          image={Partner}
          iconBackgroundColor="#FF8E00"
          title="Connect a Partner"
          dialogTitle="Connect"
          dialogSubtitle="A Partner"
          footerText="Save and Continue"
        >
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <Dialog>
              <DialogTrigger className="justify-end w-full flex">
              <Button className="px-4 md:mx-6" variant="outline" >

                My Partners</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[600px] max-h-[800px] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Your Current Partners </DialogTitle>
                  <DialogDescription>
                    <MyPartners userData={userData} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <div className="flex flex-col md:flex-row px-2 md:px-6 max-w-[1000px] justify-center items-start claracontainer gap-4">
              <div className="flex w-full max-w-[20%]">
                <Image
                  alt="Kindi"
                  src={ConnectPartner}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex w-full flex-col justify-start items-start gap-4">
                <div className="text-[#757575] text-[16px] leading-[18px] md:text-2xl md:leading-[26px] font-normal font-fredoka">
                  Securely grant access to your child&apos;s progress,
                  activities, and milestones, ensuring both parents stay
                  involved.
                </div>
                <UpdatePartnerForm userId={userData.id} />
              </div>
            </div>
          </div>
        </CustomDialog>
        {/* Payment Method Model */}
        <CustomDialog
          image={Payments}
          iconBackgroundColor="#019ACF"
          title="Payment Method"
          dialogTitle="Payment"
          dialogSubtitle="Method"
          footerText="Settings"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-4 lg:px-6 py-6 w-full claracontainer gap-4">
            {userData.myPaymentMethods &&
            userData.myPaymentMethods.length > 0 ? (
              userData.myPaymentMethods
                .filter((_, index) => index % 2 === 0)
                .map((kid, index) => (
                  <div
                    key={index}
                    className="p-4 h-[200px] flex flex-col  justify-between bg-gray-50 rounded-lg shadow-sm"
                    style={{
                      backgroundImage: `url('/Images/DebitCardBackground.svg')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex w-full justify-end items-center">
                      <RemovePaymentMethodButton paymentId={kid.documentId} />
                    </div>

                    <div className="flex w-full flex-col justify-start items-start">
                      <p>
                        <strong>Id:</strong> {kid.id}
                      </p>
                      <p>
                        <strong>Name:</strong> {kid.Name}
                      </p>
                      <p>
                        <strong>Number:</strong> {kid.Number}
                      </p>
                      <p>
                        <strong>ExpiryDate:</strong> {kid.ExpiryDate}
                      </p>
                      <p>
                        <strong>CVV:</strong> {kid.CVV}
                      </p>
                      <Dialog>
                        <DialogTrigger className="text-red font-fredoka">
                          Update Payment Method
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              <UpdatePaymentDataForm
                                paymentId={kid.documentId}
                                parentId={userData.id}
                              />
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))
            ) : (
              <p>No kids profiles available.</p>
            )}
          </div>
          <Dialog>
            <DialogTrigger className="font-fredoka text-red">
              <Button className="clarabutton my-4 bg-red hover:bg-hoverRed">
                Create Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <AddPaymentMethodForm parentId={userData.id} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CustomDialog>
        {/* Settings Model */}
        <CustomDialog
          image={ProfileSettingIcon}
          iconBackgroundColor="#C42797"
          title="Settings"
          dialogTitle="My "
          dialogSubtitle="Account"
          footerText="Settings"
        >
          <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
            <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
              <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
                {/* Profile Edit */}
                {userData ? (
                  <>
                    <Link href="/profile/edit">
                      <SettingCard
                        Value={userData.Name || "Name Not provided"}
                        image={User}
                        title="Full Name"
                      />
                    </Link>
                    {/* Email Edit */}
                    <SettingCard
                      disabled
                      Value={userData.email || "email Not provided"}
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
        </CustomDialog>
        {/* Help Center Model */}
        <CustomDialog
          image={Support}
          iconBackgroundColor="#3F3D91"
          title="Help Center"
          dialogTitle="Help"
          dialogSubtitle="Center"
          footerText="Settings"
        >
          <section className="w-full bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row gap-[20px]">
            <div className="flex flex-col gap-4 justify-center items-center w-full">
              <CreateContactFormforProfilePage />
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
        </CustomDialog>
      </div>
    </>
  );
}
