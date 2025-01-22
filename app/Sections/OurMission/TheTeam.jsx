"use client";

import { fetchOurMission } from "@/app/data/p/OurMission";
import { Team } from "@/app/Widgets";
import { Thomas } from "@/public/Images";
import { useEffect, useState } from "react";

export default function TheTeam() {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const data = await fetchOurMission();

  // if (!data) {
  //   return <div>No content available.</div>;
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://kindiadmin.up.railway.app/api/our-mission?populate[Hero][populate]=Media&populate[Parentwithkindi][populate]=Media&populate[OurStory][populate]=Media&populate[OurTeam][populate]=*"
        );
        const data = await response.json();
        // console.log("Fetched data:", data); // Log the response structure
        if (data?.data) {
          setContent(data.data); // Set the fetched data
        } else {
          setError("No data found.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  console.log("Content:", content); // Log content before rendering

  // Check if content is null or undefined
  if (!content) {
    return <div>No content available.</div>;
  }

  return (
    <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center pt-8 pb-16 flex flex-col gap-[20px]">
      <div className="claracontainer  md:px-0 lg:px-4 p-4 w-full flex flex-col gap-8">
        <div className="flex w-full justify-center heading items-center flex-col">
          <h2 className="text-center text-red clarascript">
            Life-Defining Early Learning Through Play
          </h2>
          <h1 className="w-full text-center">
            <span className="text-[#3f3a64] claraheading">Meet The </span>
            <span className="text-red claraheading">Team</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-[20px] justify-between items-start">
          {content.OurTeam?.slice(0, 1).map((member, index) => (
            <Team
              key={index}
              bgColor="#ff8e00"
              imageSrc={
                member?.MemberPic
                  ? `https://kindiadmin.up.railway.app${member?.MemberPic.url}`
                  : "/Images/Thomas.png"
              }
              title={member.Name || "Jannie"}
              degree={member.Degree || "BA (Hons) Childhood Studies (Level 16)"}
              description={
                <p
                  className="prose text-white"
                  dangerouslySetInnerHTML={{
                    __html:
                      member.About ||
                      "Jannie nickname is The Child Whisperer. Her ability to assess the developmental needs of children and deliver educational activities to satisfy them is legendary. Janine&apos;s time as an early learning expert has developed educational play approaches that deliver tangible results.", // Fallback message
                  }}
                />
              }
            />
          ))}
          {content.OurTeam?.slice(1, 2).map((member, index) => (
            <Team
              key={index}
              bgColor="#f15c57"
              title={member.Name || "Thomas"}
              degree={member.Degree || "BA (Hons) Childhood Studies (Level 16)"}
              imageSrc={
                member?.MemberPic
                  ? `https://kindiadmin.up.railway.app${member?.MemberPic.url}`
                  : "/Images/Thomas.png"
              }
              // imageSrc={Thomas}
              description={
                <p
                  className="prose text-white"
                  dangerouslySetInnerHTML={{
                    __html:
                      member.About ||
                      "With more than a decade of experience in preschool environments, his commitment to early years education has earned him two Outstanding Ofsted ratings. Working with early learners has given Tom unique insights into those crucial formative years.",
                  }}
                />
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
