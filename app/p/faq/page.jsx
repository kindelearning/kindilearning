"use client";

import { useState } from "react";

const Accordion = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[white] px-4 rounded-[12px] claracontainer">
      <div
        className="flex bg-[white] py-[6px] duration-300 justify-between w-full items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-[#3f3a64] text-[18px] font-medium font-fredoka leading-[20px] ">
          {title}
        </h2>
        <span
          className={`text-lg text-red ${
            isOpen ? "rotate-90" : ""
          } transition-transform duration-300 transition-max-height `}
        >
          ❯
        </span>
      </div>
      {isOpen && (
        <div className="pb-4 transition-max-height duration-500">
          <p className="clarabodyTwo text-[#7d7d7d]">{description}</p>
          {/* text-base font-medium text-[#0A1932] */}
        </div>
      )}
    </div>
  );
};

const sections = [
  {
    title: "How does it work?",
    description: (
      <>
        It&apos;s super simple! Just create your personal account, choose a
        subscription that fits you, and dive right into Kindi <br /> We provide
        you with daily, expert-designed play activities that are easy to follow
        and tailored to your child&apos;s developmental needs. Each activity is
        aimed at maximizing brain growth, stimulating cognitive, social,
        emotional, and physical development in your toddler. You&apos;ll receive
        clear instructions and tools to make playtime fun, educational, and
        stress-free. Just follow the guided activities and watch your child
        thrive! Log in anytime, from anywhere, and discover new resources every
        week!
      </>
    ),
  },
  {
    title:
      "At what age can I start using the Kindi activities with my little one?",
    description: (
      <>
        If you want to get the most out of our subscription, we recommend
        starting when your baby can sit up on their own. Our activities are
        designed to support your child&apos;s development from this stage
        through the toddler years. Kindi provides activities that grow with your
        little one, ensuring that every moment counts in their brain
        development.
        <br /> <br /> However, there is much babies can learn as early as birth!
        In those first months, your baby will thrive on simple interactions like
        being held, talked to, and observing their surroundings. These early
        bonding moments help your baby feel safe, loved, and secure, and lays
        the foundation for their emotional and intellectual development later
        on.
      </>
    ),
  },
  {
    title: "How often are new activities added?",
    description:
      "We add over 20 fresh activities every month! New activities are regularly added to keep your little one engaged and progressing! Our team of experts constantly develops fresh, stimulating activities to match your child's developmental milestones. Youll receive new themes and play ideas frequently, ensuring theres always something exciting and enriching to explore",
  },
  {
    title: "Do I need to buy lots of materials for these activities?",
    description:
      "Nope! We believe playtime shouldn’t be expensive! You won’t need to buy lots of materials! Most of our activities use simple, everyday items you likely already have at home or things you can recycle and reuse. Kindi focuses on creative, practical play that doesn’t require expensive or complicated supplies, so you can enjoy learning and bonding with your child without the extra hassle. However, if you're looking to enhance the experience, we also offer a curated selection of educational toys and resources in our Kindi shop. These items are specifically designed to complement our activities and further support your child’s development",
  },
  {
    title: "Is there something for everyone?",
    description:
      "Absolutely! Kindi offers a wide range of activities expertly designed to appeal to different ages and developmental stages. Whether your little one is just beginning to explore the world or is mastering new skills, we have something to engage, challenge, and nurture their growth. Our diverse activities ensure that every child, regardless of their developmental pace, finds something exciting and beneficial. ",
  },
  {
    title: "My child goes to nursery, is Kindi worth joining?  ",
    description:
      "Definitely! Kindi is used in nurseries too! Kindi is founded on the idea that continued learning is seamless between every environment your child visits for best brain stimulation and growth. However, should your child’s nursery not subscribe to our platform, Kindi is still the perfect way to spend quality time with your child by completing small but mighty activities together while eliminating uncertainty and worry about maximising your child’s brain growth. You’ll find plenty of creative ideas that help all children learn and grow, all in the comfort of your own environment. ",
  },
  {
    title: "Am I tied into a contract?",
    description:
      "Not at all! You are not tied into a long-term contract with Kindi. We offer flexible subscription options, including monthly and annual plans, allowing you to choose what best fits your needs. Our aim is to provide valuable resources and activities for your child's development without the commitment of a rigid contract.",
  },
  {
    title: "How much do I save with Kindi’s yearly subscription?",
    description:
      "With Kindi’s yearly subscription, you can enjoy significant savings compared to our monthly plan. By opting for the annual subscription, you benefit from a reduced rate, giving you access to all our resources and activities at a lower cost per month. It’s a great way to maximize value while providing continuous support for your child’s development throughout the year.",
  },
  {
    title: "When will I be charged?",
    description:
      "If you choose the Monthly Plan, you’ll be charged the day you sign up, and then every month on that same date until you decide to cancel. For the Yearly Plan, charging happens on the day you sign up, and then once a year after that. This ensures you have uninterrupted access to all of Kindi’s resources and activities.",
  },
  {
    title: "What payment methods can I use?",
    description:
      "We accept a variety of payment methods for your convenience, including major credit and debit cards. You can also use online payment options such as PayPal.",
  },
  {
    title: "Oops, I forgot my password—what should I do next?  ",
    description:
      "No worries! If you’ve forgotten your password, simply click on the “Forgot Password” link on the login page. You’ll be prompted to enter your email address, and we’ll send you instructions to reset your password. Follow the steps provided in the email to create a new password and regain access to your account. ",
  },
  {
    title: "How do I cancel my subscription?",
    description:
      "To cancel your subscription, please log in to your account and navigate to the account settings section. There, you’ll find the option to cancel your subscription. Follow the prompts to complete the cancellation process.",
  },
  {
    title: "How can I get in touch with you? ",
    description:
      "We’re always happy to help! You can reach us anytime by clicking the ‘Contact Us’ button at the bottom of our website and use the contact form available for a quick and easy way to reach out. And we will get back to you as soon as we can.  ",
  },
];

const page = () => {
  return (
    <>
      <section className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-0 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="flex flex-col w-full gap-4 justify-center items-center">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                FAQ&apos;s
              </span>
            </div>
            <div className="w-full text-center text-[#3f3a64] text-[16px] font-fredoka font-medium">
              At Kindi, we&apos;re committed to continuous improvement in our
              pursuit of enjoyable and impactful learning experiences. Each
              month, we retire play activities to introduce enhanced learning
              for the upcoming month. Which one will you select to elevate your
              child&apos;s early-years development?
            </div>
          </div>
          <div className="items-center w-full justify-center flex flex-col gap-2">
            {sections.map((section, index) => (
              <div className="w-full" key={index}>
                <Accordion
                  description={section.description}
                  title={section.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
