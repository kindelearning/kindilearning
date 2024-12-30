"use client";

import { MyToggleCard } from "@/app/Widgets";
import { useEffect, useState } from "react";

export default function SkillToggleCardGrid() {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const handleCardClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://proper-fun-404805c7d9.strapiapp.com/api/how-it-work-page?populate=*"
      );
      const data = await response.json();
      setCards(data.data.KindiSkillsCategoriesCards);
    };
    fetchData();
  }, []);

  return (
    <div className="claracontainer px-4 md:pl-0  flex flex-row overflow-x-scroll scrollbar-hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 gap-4 justify-between">
      {cards.map((card) => (
        <MyToggleCard
          key={card.id}
          title={card.Title}
          description={<div dangerouslySetInnerHTML={{ __html: card.Body }} />}
          backgroundColor={card.bgcolor}
          isOpen={isOpen}
          setIsOpen={handleCardClick}
          color={card.color || "white"}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
