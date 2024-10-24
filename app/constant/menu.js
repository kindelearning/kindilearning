import {
  BrainIcon,
  CommunityActive,
  CommunityIcon,
  HIWActive,
  HIWIcon,
  HomeActiveIcon,
  HomeIcon,
  MissionActive,
  MissionIcon,
  ScheduleActive,
  ScheduleIcon,
  ShopActive,
  ShopIcon,
} from "@/public/assets";
import {
  AchievementImage01,
  AchievementImage02,
  AchievementImage03,
  AchievementImage04,
  AchievementImage05,
  AchievementImage06,
  AchievementImage07,
  AchievementImage08,
  AchievementImage09,
  AchievementImage10,
  Bag,
  BrainActive,
  KindiHeart,
  PromotionalImage,
  ShopImage,
  SlideGrow,
  SlideLearn,
  SlideMain,
  SlidePlay,
  SlideThrive,
  ThemeDummy,
  Brain,
  CalendarActive,
  CalendarTwo,
  Earth,
  EarthActive,
  Home,
  HomeActive,
  ShopTwo,
  ShopTwoActive,
  UserTwo,
  UserActive,
  ConfidenceIndependence,
  SpeechLanguage,
  PhysicalAgility,
  ReadingWriting,
  DiscoveringWorld,
  CreativityImagination,
  Experiments,
} from "@/public/Images";
import Image from "next/image";

const { Confidence } = require("@/public/Icons");

export const filters = [
  {
    label: "Select Learning Area",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    label: "Select Skill Category",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    label: "Select Theme",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    label: "Select Age Focus",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    label: "Select Prep Time",
    options: ["Option 1", "Option 2", "Option 3"],
  },
];

export const NavMenu = [
  {
    title: "Home",
    link: "/",
    icon: HomeIcon,
    activeIcon: HomeActiveIcon,
  },
  {
    title: "Our Mission",
    link: "/p/our-mission",
    icon: MissionIcon,
    activeIcon: MissionActive,
  },
  {
    title: "How it works",
    link: "/p/how-it-works",
    icon: HIWIcon,
    activeIcon: HIWActive,
  },
  {
    title: "Schedule",
    link: "/p/activities/schedule",
    icon: ScheduleIcon,
    activeIcon: ScheduleActive,
  },
  {
    title: "Brain Activities",
    link: "/p/activities",
    icon: BrainIcon,
    activeIcon: BrainActive,
  },
  {
    title: "Shop",
    link: "/shop",
    icon: ShopIcon,
    activeIcon: ShopActive,
  },
  {
    title: "Community",
    link: "/p/community",
    icon: CommunityIcon,
    activeIcon: CommunityActive,
  },
];

export const footerSections = [
  {
    title: "Navigation",
    links: [
      { label: "Our Mission", href: "/p/our-mission" },
      { label: "How It Works", href: "/p/how-it-works" },
      { label: "Schedule", href: "/p//schedule" },
      { label: "Activities ", href: "/p/activities" },
      { label: "Shop", href: "/shop" },
    ],
  },

  {
    title: "General",
    links: [
      { label: "Newsletter", href: "/newsletter" },
      { label: "Community", href: "/p/community" },
      { label: "Themes", href: "/p/our-themes" },
      { label: "Quality Control", href: "/p/quality-control" },
      { label: "Investing", href: "/p/investment" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Terms & Conditions", href: "/p/tnc" },
      { label: "Privacy Policy", href: "/p/privacy-policy" },
      { label: "Refund Policy", href: "/p/refund-policy" },
      { label: "FAQ's", href: "/p/faq" },
      { label: "Contact Us", href: "/p/contact-us" },
    ],
  },
];

export const AcheievemnetData = [
  {
    image: AchievementImage01,
    backgroundColor: "#F04C64", // Red
    title: "Five-day Stretch",
    level: 1,
  },
  {
    image: AchievementImage02,
    backgroundColor: "#8BC34A", // Green
    title: "Five-day Stretch",
    level: 2,
  },
  {
    image: AchievementImage03,
    backgroundColor: "#2196F3", // Blue
    title: "Witching Hour Hero",
    level: 3,
  },
  {
    image: AchievementImage04,
    backgroundColor: "#FFC107", // Yellow
    title: "Sleep Thief",
    level: 1,
  },
  {
    image: AchievementImage05,
    backgroundColor: "#9C27B0", // Purple
    title: "Warrior ",
    level: 2,
  },
  {
    image: AchievementImage06,
    backgroundColor: "#03A9F4", // Light Blue
    title: "Witching Hour Hero",
    level: 3,
  },
  {
    image: AchievementImage07,
    backgroundColor: "#E91E63", // Pink
    title: "Sleep Thief",
    level: 1,
  },
  {
    image: AchievementImage08,
    backgroundColor: "#4CAF50", // Teal
    title: "Bedtime Ninja ",
    level: 2,
  },
  {
    image: AchievementImage09,
    backgroundColor: "#FF9800", // Orange
    title: "Warrior ",
    level: 3,
  },
  {
    image: AchievementImage10,
    backgroundColor: "#3F51B5", // Indigo
    title: "Witching Hour Hero",
    level: 1,
  },
  {
    image: AchievementImage08,
    backgroundColor: "#CDDC39", // Lime
    title: "Bedtime Ninja ",
    level: 2,
  },
  {
    image: AchievementImage09,
    backgroundColor: "#795548", // Brown
    title: "Sleep Thief",
    level: 3,
  },
  {
    image: AchievementImage10,
    backgroundColor: "#9E9E9E", // Gray
    title: "Warrior  ",
    level: 1,
  },
];

export const options = [
  "Category A",
  "Category B",
  "Category C",
  "Category D",
  "Category E",
  "Category F",
  "Category G",
  "Category H",
  "Category I",
  "Category J",
];

export const data = {
  status: "In Progress",
  date: "Today",
  items: 5,

  price: 50.9,
  images: [UserActive, UserActive, UserActive, UserActive, UserActive],
};

export const profilData = {
  name: "Lily",
  age: "6 years old",
  image: ThemeDummy,
};

export const checkoutProduct = {
  image: ShopImage,
  title: "Product Title",
  description: "Product description",
  price: 19.99,
  quantity: 2,
};

export const questions = [
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

export const developmentAreas = [
  "Emotional & Social Strength",
  "Physical Agility",
  "Creativity & Imagination",
  "Confidence & Independence",
  "Reading & Writing",
  "Speech & Language",
  "Discovering our world",
  "Experiments & Math",
];

export const progressData = [
  {
    id: 1,
    icon: KindiHeart,
    title: "Emotional & Social Strength",
    backgroundColor: "f05c5c",
  },
  {
    id: 2,

    icon: ConfidenceIndependence,
    title: "Confidence & Independence",

    backgroundColor: "19262d",
  },
  {
    id: 3,
    icon: SpeechLanguage,
    title: "Speech & Language",

    backgroundColor: "036e9a",
  },
  {
    id: 4,
    icon: PhysicalAgility,
    title: "Physical Agility",
    backgroundColor: "b05282",
  },
  {
    id: 5,
    icon: ReadingWriting,
    title: "Reading & Writing",

    backgroundColor: "a7b568",
  },
  {
    id: 6,
    icon: DiscoveringWorld,
    title: "Discovering Our World",

    backgroundColor: "0aab84",
  },
  {
    id: 7,
    icon: CreativityImagination,
    title: "Creativity & Imagination",

    backgroundColor: "f0c84a",
  },
  {
    id: 8,
    icon: Experiments,
    title: "Experiments & Math",

    backgroundColor: "0f172a",
  },
];

export const cardData = [
  {
    icon: KindiHeart,
    title: "Emotional & Social Strength",
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Experience, regulate and express feelings</li>
        <li>Labelling emotions (emotional literacy)</li>
        <li>Understanding one’s self and others</li>
        <li>Making friends</li>
        <li>Building confidence and self-assurance</li>
      </ul>
    ),
    backgroundColor: "f05c5c",
  },
  {
    icon: ConfidenceIndependence,
    title: "Confidence & Independence",
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Managing self-care independently </li>
        <li>Learning about healthy living</li>
      </ul>
    ),
    backgroundColor: "19262d",
  },
  {
    icon: SpeechLanguage,
    title: "Speech & Language",
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Listening and paying attention</li>
        <li>Understanding spoken language </li>
        <li>Developing vocabulary</li>
        <li>Learning to speak </li>
        <li>BInteracting and communicating with others</li>
      </ul>
    ),
    backgroundColor: "036e9a",
  },
  {
    icon: PhysicalAgility,
    title: "Physical Agility",
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Moving, handling and using gross motor skills</li>
        <li> Developing fine motor skills in preparation for (pre)writing</li>
      </ul>
    ),
    backgroundColor: "b05282",
  },
  {
    icon: ReadingWriting,
    title: "Reading & Writing",
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Enjoying looking at books</li>
        <li>Reading books</li>
        <li>Comprehending language</li>
        <li>Enjoying rhymes, poems and songs Making marks</li>
        <li>Exploring letter sounds and phonics</li>
        <li>Learning to write</li>
      </ul>
    ),
    backgroundColor: "a7b568",
  },
  {
    icon: DiscoveringWorld,
    title: "Discovering Our World",
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Exploring nature and the world</li>
        <li>Talking about people and the local community</li>
        <li>UUnderstanding similarities and differences</li>
        <li>Learning to use technology</li>
        <li>Looking after the environment</li>
      </ul>
    ),
    backgroundColor: "0aab84",
  },
  {
    icon: CreativityImagination,
    title: "Creativity & Imagination",
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Enjoying being creative</li>
        <li>Expressing oneself through words, movement, art and books</li>
        <li>Making music, singing and dancing</li>
        <li>Playing imaginatively</li>
        <li>Using different medias and colours to express oneself</li>
      </ul>
    ),
    backgroundColor: "f0c84a",
  },
  {
    icon: Experiments,
    title: "Experiments & Math",
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Learning about numbers & counting</li>
        <li>Comparing quantities </li>
        <li>Recognising the passing of time </li>
        <li>Exploring measures, weight, capacity and space </li>
        <li>Understanding shapes and opposites </li>
        <li>Discovering science and math concepts</li>
      </ul>
    ),
    backgroundColor: "0f172a",
  },
];

export const navItems = [
  {
    id: "home",
    label: "Home",
    iconActive: <Image alt="Kindi"  src={HomeActive} className="h-6 w-6" />,
    iconInactive: <Image alt="Kindi"  src={Home} className="h-6 w-6" />,
    href: "/",
  },
  {
    id: "calendar",
    label: "Calendar",
    iconActive: <Image alt="Kindi"  src={CalendarActive} className="h-6 w-6" />,
    iconInactive: <Image alt="Kindi"  src={CalendarTwo} className="h-6 w-6" />,
    href: "/p/activities/schedule",
  },
  {
    id: "brain",
    label: "Brain",
    iconActive: <Image alt="Kindi"  src={BrainActive} className="h-6 w-6" />,
    iconInactive: <Image alt="Kindi"  src={Brain} className="h-6 w-6" />,
    href: "/p/activities",
  },
  {
    id: "earth",
    label: "Earth",
    iconActive: <Image alt="Kindi"  src={EarthActive} className="h-6 w-6" />,
    iconInactive: <Image alt="Kindi"  src={Earth} className="h-6 w-6" />,
    href: "/p/community",
  },
  {
    id: "shop",
    label: "Shop",
    iconActive: <Image alt="Kindi"  src={ShopTwoActive} className="h-6 w-6" />,
    iconInactive: <Image alt="Kindi"  src={ShopTwo} className="h-6 w-6" />,
    href: "/shop",
  },
  {
    id: "profile",
    label: "Profile",
    iconActive: <Image alt="Kindi"  src={UserActive} className="h-6 w-6" />,
    iconInactive: <Image alt="Kindi"  src={UserTwo} className="h-6 w-6" />,
    href: "/profile",
  },
];

export const slides = [
  {
    image: SlideThrive,
    title: "Thrive",
    description:
      "Increase the likelihood of achievement in higher education and the success and happiness of children in their later lives.",
    backgroundColor: "#C42797",
  },
  {
    image: SlideLearn,
    title: "Learn",
    description:
      "Each learning activity has several learning outcomes depending on age & stage. Carers are guided to target different learning outcomes for each child. ",
    backgroundColor: "#F05C5C",
  },
  {
    image: SlideGrow,
    title: "Grow",
    description:
      "Stay informed about your child’s development compared to the national average and track each child’s progress with our ‘Milestone Tracker’. This assists adults in recognizing and supporting areas where children excel or may need additional guidance.",
    backgroundColor: "#019ACF",
  },
  {
    image: SlideMain,
    title: "Brain Development Activities for 0 - 5 Year Old Kids  ",
    description:
      "The play-based approach to early leering that makes early years development easier and more joyful than ever.",
    backgroundColor: "#3F3D91",
  },
  {
    image: PromotionalImage,
    title: "Childhood Development Unlocked",
    description:
      "By age five, our brains are already 90% developed, influencing essential lifelong skills, abilities, and positive habits. However, creating crucial brain connections becomes more challenging as we age.",
    backgroundColor: "#029871",
  },
  {
    image: SlidePlay,
    title: "Play",
    description:
      "At Kindi, we provide adults with the necessary tools to teach toddlers effectively, maximising each day of early brain growth through guided play activities, ensuring that children stay on track with their development.",
    backgroundColor: "#FFAA00",
  },
];

export const accordions = [
  {
    title: "Accordion 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
  },
  {
    title: "Accordion 2",
    content:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
];

export const activities = [
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2"],
    icons: [KindiHeart, Confidence, UserActive, Bag, KindiHeart],
  },
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2"],
    icons: [KindiHeart, Confidence, UserActive, Bag, KindiHeart],
  },
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2"],
    icons: [KindiHeart, Confidence, UserActive, Bag, KindiHeart],
  },
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2"],
    icons: [KindiHeart, Confidence, UserActive, Bag, KindiHeart],
  },
  {
    title: "Custom Title",
    time: "10 minutes",
    tags: ["Tag 1", "Tag 2"],
    icons: [KindiHeart, Confidence, UserActive, Bag],
  },
];
