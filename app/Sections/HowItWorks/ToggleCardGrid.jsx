"use client";

import { MyToggleCard } from "@/app/Widgets";
import { KindiHeart } from "@/public/Images";
import { useEffect, useState } from "react";

export default function ToggleCardGrid() {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const handleCardClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate[AreaOflearningCards][populate]=Icon"
        // "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate=*"
      );
      const data = await response.json();
      setCards(data.data.AreaOflearningCards);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="claracontainer px-4 md:pl-0  flex flex-row overflow-x-scroll scrollbar-hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 gap-4 justify-between">
        {cards.map((card) => (
          <MyToggleCard
            key={card.id}
            title={card?.Title || "Default Title"} //
            description={
              <div
                dangerouslySetInnerHTML={{
                  __html: card.Body || "<em>No description available.</em>",
                }}
              />
            }
            // description={card.Body}
            backgroundColor={card?.bgcolor || "#f0f0f0"}
            isOpen={isOpen}
            setIsOpen={handleCardClick}
            color={card?.color || "white"} // F
            // icon={card?.Icon?.url}
            icon={
              card?.Icon
                ? `https://lionfish-app-98urn.ondigitalocean.app${card?.Icon?.url}`
                : "/Images/KindiHeart.svg"
            }
          />
        ))}
      </div>
    </>
  );
}
