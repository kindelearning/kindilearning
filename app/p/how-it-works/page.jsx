import { HowItWorks, MonthlyThemes, PopularActivity } from "@/app/Sections";
import {
  AgeRanges,
  AreasOfLearning,
  KindiSkillsCategories,
  PlayForLife,
} from "@/app/Sections/HowItWorks";

export default function HowItWorksPage() {
  return ( 
    <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
      <PlayForLife />
      <HowItWorks />
      <AreasOfLearning />
      <KindiSkillsCategories />
      <AgeRanges />
      <MonthlyThemes />
      <PopularActivity />
    </section>
  );
}
