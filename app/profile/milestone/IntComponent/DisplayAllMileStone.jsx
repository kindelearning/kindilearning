"use client";

import { useEffect, useState } from "react";
import { CurvePath, TrigSnakeCurve } from "./Milestonepath";
import { getPublishedMileStone } from "@/lib/hygraph";

export default function DisplayAllMileStone({ passThecurrentUserId }) {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const data = await getPublishedMileStone();
        console.log("Fetched milestones:", data);
        setMilestones(data);
      } catch (err) {
        setError("Error fetching milestones.");
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);
  console.log("Milestones state:", milestones);

  if (!Array.isArray(milestones)) {
    return <p>Error: Expected milestones to be an array.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <TrigSnakeCurve
        amplitude={7}
        mileStoneCustomData={milestones}
        currentUserId={passThecurrentUserId}
      />
      <CurvePath milestones={milestones} currentUserId={passThecurrentUserId} />
    </>
  );
}
