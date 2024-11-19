// CardGroup.js
import FilterCard from "./FilterCard";
import {
  Filters01,
  Filters02,
  Filters03,
  Filters04,
  Filters05,
  Filters06,
  Filters07,
  Filters08,
  Filters09,
  Filters10,
} from "@/public/Images";

const cardData = [
  { bgColor: "#FF8E00", icon: Filters01, title: "Language & Literacy" },
  { bgColor: "#019ACF", icon: Filters02, title: "Fine Motor Development" },
  { bgColor: "#EEBA00", icon: Filters03, title: "Creative Arts Supplies " },
  { bgColor: "#8D2F88", icon: Filters04, title: "Music & Movement" },
  { bgColor: "#2B313C", icon: Filters05, title: "Mathematics & Logic" },
  { bgColor: "#41AD49", icon: Filters06, title: "Multicultural & Diversity" },
  { bgColor: "#C13192", icon: Filters07, title: "Imaginative Play Sets" },
  { bgColor: "#056F9A", icon: Filters08, title: "Gross Motor Equipment" },
  { bgColor: "#17A99F", icon: Filters09, title: "Sensory Play Materials" },
  { bgColor: "#F04C64", icon: Filters10, title: "Social & Emotional" },
];

const CardGroup = () => {
  return (
    <section className="w-full h-auto bg-[#EAEAF5] pl-4 items-center justify-center flex flex-col md:flex-row gap-[20px]">
      <div className="flex claracontainer scrollbar-hidden bg-[#eaeaf5] scrollbar-none py-2 overflow-x-scroll overflow-y-hidden gap-2 pr-4 md:gap-3 lg:gap-4">
        {cardData.map((data, index) => (
          <FilterCard key={index} data={data} />
        ))}
      </div>
    </section>
  );
};

export default CardGroup;
