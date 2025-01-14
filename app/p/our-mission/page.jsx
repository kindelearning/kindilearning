import { DefaultReviews, PopularActivity } from "@/app/Sections"; //-
import {
  //-
  Hero, //-
  OurStory, //-
  ParentWithKindi, //-
  TheTeam, //-
} from "@/app/Sections/OurMission"; //-

export default function OurMission() {
  return (
    <>
      <section className="w-full bg-[#ffffff] flex flex-col gap-0 justify-center items-center">
        <Hero />
        <OurStory />
        <ParentWithKindi />
        <TheTeam />
        <DefaultReviews /> 
        <PopularActivity />
      </section>
    </>
  );
}
