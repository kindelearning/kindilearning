import { data } from "@/app/constant/menu";
import CreateContactFormPage from "@/app/p/contact-us/page";
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
      <DialogContent className="bg-[#EAEAF5] max-w-[96%] flex flex-col justify-between max-h-[70%] lg:min-h-[600px] min-h-[400px] overflow-y-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
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
          title="Kids Profile"
          dialogTitle="My"
          dialogSubtitle="Profile"
          footerText="Save and Continue"
        >
          <>
            <p className="py-2 font-fredoka">
              You have added{" "}
              <span className="font-medium text-red">
                {currentKidsCount} out of {maxKidsAllowed}
              </span>{" "}
              kids allowed for your{" "}
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
                        <div className="w-16 h-16 overflow-clip flex justify-center items-center">
                          <Image
                            src={kid.profileImage || ProfilePlaceholder01} // Dynamic placeholder
                            alt={`${kid.Name}'s Profile`}
                            width={64}
                            height={64}
                            className="min-w-16 min-h-16 object-cover rounded-full"
                          />
                        </div>
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

                        <div className="flex flex-col w-fit items-center justify-between  gap-2">
                          <Dialog>
                            <DialogTrigger>
                              {/* <Penci className="w-[24px] h-[24px] text-red"/> */}
                            </DialogTrigger>
                            <DialogContent>
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
                <p className="text-[#757575]">No kids available to display.</p>
              )}
            </div>
            {currentKidsCount < maxKidsAllowed ? (
              <Dialog>
                <DialogTrigger>Add New Kid</DialogTrigger>
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
                You have reached the maximum limit of {maxKidsAllowed} kids for
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
            <ProductCard data={data} />
            <ProductCard data={data} />
            <ProductCard data={data} />
            <ProductCard data={data} />
            {/* Add more ProductCards as needed */}
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
                Securely grant access to your child&apos;s progress, activities,
                and milestones, ensuring both parents stay involved.
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
              userData.myPaymentMethods.map((kid, index) => (
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
            <DialogTrigger className="font-fredoka text-red">Create Payment Method</DialogTrigger>
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
          dialogTitle="Connect"
          dialogSubtitle="My"
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
                        Value={userData.Name}
                        image={User}
                        title="Full Name"
                      />
                    </Link>
                    {/* Email Edit */}
                    <SettingCard
                      disabled
                      Value={userData.email}
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
              <CreateContactFormPage />
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
