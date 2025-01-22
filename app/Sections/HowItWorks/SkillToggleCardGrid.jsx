"use client";

import { MyToggleCard } from "@/app/Widgets";
import { KindiHeart } from "@/public/Images";
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
        // "https://kindiadmin.up.railway.app/api/how-it-work-page?populate=*"
        "https://kindiadmin.up.railway.app/api/how-it-work-page?populate[KindiSkillsCategoriesCards][populate]=Icon"
      );
      const data = await response.json();
      setCards(data.data.KindiSkillsCategoriesCards);
    };
    fetchData();
  }, []);

  console.log("KindiSkillsCategoriesCards", cards);

  return (
    <div className="claracontainer px-4 md:pl-0  flex flex-row overflow-x-scroll scrollbar-hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 gap-4 justify-between">
      {cards.map((card) => (
        <MyToggleCard
          key={card.id}
          title={card?.Title || "Default Title"} // Fal
          description={
            <div
              dangerouslySetInnerHTML={{
                __html: card?.Body || "<em>No description available.</em>", // Fallback for card.Body
              }}
            />
          }
          backgroundColor={card?.bgcolor || "#f0f0f0"} // Fallback for card.bgcolor
          isOpen={isOpen}
          setIsOpen={handleCardClick}
          color={card?.color || "white"}
          icon={card?.Icon ? `https://kindiadmin.up.railway.app${card?.Icon?.url}` : "/Images/KindiHeart.svg"}
        />
      ))}
    </div>
  );
}
