import { fetchOurMission } from "@/app/data/p/OurMission";
import { Team } from "@/app/Widgets";
import { Thomas } from "@/public/Images";

export default async function TheTeam() {
  const data = await fetchOurMission();

  if (!data) {
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
          {data.OurTeam?.slice(0, 1).map((member, index) => (
            <Team
              key={index}
              bgColor="#ff8e00"
              title={member.Name}
              degree={member.Degree}
              // description="Janine's nickname is &quot;The Child Whisperer&quot;. Her ability to assess the developmental needs of children and deliver educational activities to satisfy them is legendary. Janine's time as an early learning expert has developed educational play approaches that deliver tangible results."
              description={member.About}
            />
          ))}
          {data.OurTeam?.slice(1, 2).map((member, index) => (
            <Team
              key={index}
              bgColor="#f15c57"
              title={member.Name}
              degree={member.Degree}
              imageSrc={Thomas}
              // description="Janine's nickname is &quot;The Child Whisperer&quot;. Her ability to assess the developmental needs of children and deliver educational activities to satisfy them is legendary. Janine's time as an early learning expert has developed educational play approaches that deliver tangible results."
              description={member.About}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// export default TheTeam;
