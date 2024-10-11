import { BlogThumb, BlogThumbThree, BlogThumbTwo } from "@/public/Images";
import Image from "next/image";

const Content = () => {
  return (
    <div className="flex max-w-4xl w-full flex-col gap-4">
      <div className="w-full text-[#3f3a64] text-[44px] font-semibold font-fredoka leading-[48px]">
        The Importance of Black Play
      </div>{" "}
      <div className="w-full text-[#0a1932] text-2xl font-normal font-fredoka leading-[28px]">
        Discover the Crucial Role of Block Play in Nurturing Cognitive, Social,
        and Physical Development in Children
      </div>
      <div className="content py-4 flex flex-col gap-2 justify-center">
        <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
          Geometrical montessori puzzle of colors, a toy made with wood and
          sustainable and ecological colors. Beribus dite eum fugitio blandaest,
          intemporecto cumende rfercillorum estemol liatia num etur alitia
          voluptatur soluptas excerit aute velecabore quiae nos moloraes
          doluptatur mi, estiore dundit modigent.
        </div>{" "}
        <Image
          src={BlogThumb}
          alt="Article Image"
          className="w-full h-60 md:h-[400px] lg:h-[400px] object-cover"
        />
        <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
          Geometrical montessori puzzle of colors, a toy made with wood and
          sustainable and ecological colors. Beribus dite eum fugitio blandaest,
          intemporecto cumende rfercillorum estemol liatia num etur alitia
          voluptatur soluptas excerit aute velecabore quiae nos moloraes
          doluptatur mi, estiore dundit modigent.
        </div>{" "}
      </div>
    </div>
  );
};

export const blogData = [
  {
    id: 1,
    image: BlogThumb,
    likes: "123",
    comments: "456",
    views: "789",
    title: "The Importance of Black Play",
    content: <Content />,
    metsDesc:
      "Discover the Crucial Role of Block Play in Nurturing Cognitive, Social, and Physical Development in Children",
  },
  {
    id: 2,
    image: BlogThumbThree,
    likes: "123",
    comments: "456",
    views: "789",
    title: "The Power of Outdoor Play",
    content: <Content />,
    metsDesc:
      "Unlock the benefits of outdoor play: fostering health, social skills, and a lifelong connection with nature.",
  },
  {
    id: 3,
    image: BlogThumbTwo,
    likes: "123",
    comments: "456",
    views: "789",
    title: "Socializing: Dos and Don’ts",
    content: <Content />,
    metsDesc:
      "Navigating Socializing Etiquette: Guidelines for Positive Interaction and Conflict Avoidance Strategies",
  },
  {
    id: 4,
    likes: "123",
    comments: "456",
    views: "789",
    title: "The Importance of Black Play",
    content: <Content />,
    metsDesc:
      "Discover the Crucial Role of Block Play in Nurturing Cognitive, Social, and Physical Development in Children",
  },
  {
    id: 5,
    likes: "123",
    comments: "456",
    views: "789",
    image: BlogThumbThree,
    title: "The Power of Outdoor Play",
    content: <Content />,
    metsDesc:
      "Unlock the benefits of outdoor play: fostering health, social skills, and a lifelong connection with nature.",
  },
  {
    id: 6,
    likes: "123",
    comments: "456",
    views: "789",
    image: BlogThumbTwo,
    title: "Socializing: Dos and Don’ts",
    content: <Content />,
    metsDesc:
      "Navigating Socializing Etiquette: Guidelines for Positive Interaction and Conflict Avoidance Strategies",
  },
  {
    id: 7,
    likes: "123",
    comments: "456",
    views: "789",
    title: "The Importance of Black Play",
    content: <Content />,
    metsDesc:
      "Discover the Crucial Role of Block Play in Nurturing Cognitive, Social, and Physical Development in Children",
  },
  {
    id: 8,
    likes: "123",
    comments: "456",
    views: "789",
    image: BlogThumbThree,
    title: "The Power of Outdoor Play",
    content: <Content />,
    metsDesc:
      "Unlock the benefits of outdoor play: fostering health, social skills, and a lifelong connection with nature.",
  },
  {
    id: 9,
    likes: "123",
    comments: "456",
    views: "789",
    image: BlogThumbTwo,
    title: "Socializing: Dos and Don’ts",
    content: <Content />,
    metsDesc:
      "Navigating Socializing Etiquette: Guidelines for Positive Interaction and Conflict Avoidance Strategies",
  },
  // Add more blog data here...
];
