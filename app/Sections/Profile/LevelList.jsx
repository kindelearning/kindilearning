"use client ";

import { getLevelData } from "@/lib/hygraph";
import { useEffect, useState } from "react";
import LevelCard from "./LevelCard";

export default function LevelList() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getLevelData();
      setLevels(data);
    }
    fetchData();
  }, []);

  return (
    <>
      {levels.length > 0 ? (
        levels.map((levelData) => (
          <>
            {levelData.level.map((card) => (
              <LevelCard
                key={levelData.id}
                level={card.levelName}
                activities={card.numberOfActivities}
              />
            ))}
          </>
        ))
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}
