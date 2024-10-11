import { Email, LanguageIcon, Phone, TnC, User, Bag, KindiHeart } from "@/public/Images";
import { ChevronRight } from "lucide-react";
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
import Activity from "@/app/Widgets/Card/Activity";
import { Confidence } from "@/public/Icons";
import { PopupFooter } from "@/app/Sections";

const activities = [
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    icons: [KindiHeart, Confidence, User, Bag],
  },
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    icons: [KindiHeart, Confidence, User, Bag],
  },
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    icons: [KindiHeart, Confidence, User, Bag],
  },
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    icons: [KindiHeart, Confidence, User, Bag],
  },
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    icons: [KindiHeart, Confidence, User, Bag, KindiHeart],
  },
];
const questions = [
  {
    title: "What is your return policy?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
  },
  {
    title: "How do I track my order?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
  },
  {
    title: "What is your refund policy?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
  },
];
const Accordion = ({ questions }) => {
  return (
    <div className="w-full claracontainer flex flex-col gap-4 py-4">
      {questions.map((question, index) => (
        <div key={index} className="rounded-lg bg-[white] ">
          <div
            className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-lg cursor-pointer"
            aria-expanded="false"
            aria-controls={`answer-${index}`}
          >
            <h2 className="text-lg font-semibold">{question.title}</h2>
            <svg
              id={`chevron-${index}`}
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 12H6"
              />
            </svg>
          </div>
          <div
            id={`answer-${index}`}
            className="hidden py-2 px-4 bg-gray-50 rounded-lg"
          >
            <p className="text-gray-600">{question.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const SettingCard = ({
  image,
  title = " Full name",
  Value = "Sarah Tom ",
  disabled = false,
}) => {
  return (
    <>
      <div className="w-full py-2 cursor-pointer hover:shadow-md hover:delay-100 bg-white rounded-xl flex flex-row px-4 justify-between items-center transition-shadow duration-300">
        <div className="claracontainer flex flex-row justify-start  items-center gap-4">
          <div className="w-6 h-6 px-[3px] flex-col justify-center items-center gap inline-flex">
            <Image  alt="Kindi" src={image || LanguageIcon} />
          </div>
          <div className="w-full flex-col justify-center items-start gap-1 inline-flex">
            <div
              className={`text-[${
                disabled ? "#757575" : "#000000"
              }] text-[12px] font-normal font-fredoka leading-none`}
            >
              {title}
            </div>
            <div
              className={`text-[${
                disabled ? "#757575" : "#000000"
              }] text-[20px] font-semibold font-fredoka leading-tight`}
            >
              {Value}
            </div>
          </div>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <ChevronRight className="w-[24px] h-[24px] text-[#0A1932]" />
        </div>
      </div>
    </>
  );
};

const page = () => {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
          <div className="text-center text-[#3f3a64] text-4xl font-semibold font-fredoka capitalize leading-10">
            Settings
          </div>
          <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-4">
            {/* Profile Edit */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger asChild>
                <SettingCard Value="Shravya" image={User} title="Full Name" />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[28px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[48px] font-semibold font-fredoka capitalize leading-10">
                          My{" "}
                        </span>
                        <span className="text-red text-[48px] font-semibold font-fredoka capitalize leading-10">
                          Activity
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <div className="text-black text-[32px] font-semibold font-fredoka leading-relaxed">
                    Completed
                  </div>
                  <div className="grid grid-cols-4 w-full claracontainer gap-4">
                    {activities.map((activity, index) => (
                      <Activity
                        key={index}
                        title={activity.title}
                        time={activity.time}
                        tags={activity.tags}
                        icons={activity.icons}
                      />
                    ))}
                  </div>
                </DialogDescription>
                <DialogFooter className="sticky  rounded-t-[16px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bottom-0 m-0 w-full px-4 bg-[#eaeaf5]">
                  <PopupFooter PrimaryText="Save and Continue" />
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Email Edit */}

            <SettingCard
              disabled
              Value="abc@gmail.com"
              image={Email}
              title="Email"
            />
            {/* Mobile Edit */}
            <SettingCard
              disabled
              Value="09876543"
              image={Phone}
              title="Phone Number"
            />
            {/* Language Edit */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger asChild>
                <SettingCard
                  Value="English"
                  image={LanguageIcon}
                  title="Language"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[28px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[48px] font-semibold font-fredoka capitalize leading-10">
                          My{" "}
                        </span>
                        <span className="text-red text-[48px] font-semibold font-fredoka capitalize leading-10">
                          Activity
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <div className="text-black text-[32px] font-semibold font-fredoka leading-relaxed">
                    Completed
                  </div>
                  <div className="grid grid-cols-4 w-full claracontainer gap-4">
                    {activities.map((activity, index) => (
                      <Activity
                        key={index}
                        title={activity.title}
                        time={activity.time}
                        tags={activity.tags}
                        icons={activity.icons}
                      />
                    ))}
                  </div>
                </DialogDescription>
                <DialogFooter className="sticky  rounded-t-[16px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bottom-0 m-0 w-full px-4 bg-[#eaeaf5]">
                  <PopupFooter PrimaryText="Save and Continue" />
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Terms & Condition  */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger asChild>
                <SettingCard
                  Value="Term & Condition"
                  image={TnC}
                  title="Kindi's Learning"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[28px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[48px] font-semibold font-fredoka capitalize leading-10">
                          My{" "}
                        </span>
                        <span className="text-red text-[48px] font-semibold font-fredoka capitalize leading-10">
                          Activity
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <div className="text-black text-[32px] font-semibold font-fredoka leading-relaxed">
                    Completed
                  </div>
                  <div className="grid grid-cols-4 w-full claracontainer gap-4">
                    {activities.map((activity, index) => (
                      <Activity
                        key={index}
                        title={activity.title}
                        time={activity.time}
                        tags={activity.tags}
                        icons={activity.icons}
                      />
                    ))}
                  </div>
                </DialogDescription>
                <DialogFooter className="sticky  rounded-t-[16px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bottom-0 m-0 w-full px-4 bg-[#eaeaf5]">
                  <PopupFooter PrimaryText="Save and Continue" />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-4">
            {/* <HelpCard />
            <HelpCard />
            <HelpCard /> */}
          </div>
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            <div className="text-center text-[#3f3a64] text-4xl font-semibold font-fredoka capitalize leading-10">
              FAQ `&apos;` s
            </div>
            <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-4">
              <Accordion questions={questions} />;
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
