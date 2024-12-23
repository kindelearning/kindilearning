import HomepageHeroSectionPage from "../../Sections/Home/HomepageHeroSectionPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import HeroSectionForm from "../../Sections/Home/HomepageHeroSectionPageUpdate";
import ChildDevelopmentUnlock from "../../Sections/Home/ChilddevUnlockedSection";
import HowItWorksSection from "../../Sections/Home/HowItWorksSection";
import Monthlytheme from "../../Sections/Home/Monthlytheme";
import EarlyLearningExpert from "../../Sections/Home/EarlyLearningExpert";
import { SectionRow } from "../../Sections/SectionRow";
import OurMissionHero from "../../Sections/ourmission/TeamSection";
import TeamSection from "../../Sections/ourmission/TeamSection";
import HeroOueMission from "../../Sections/ourmission/HeroOueMission";
import ParentWithKindi from "../../Sections/ParentWithKindi";
import PopularActivities from "../../Sections/Home/PopularActivities";
import OurStory from "../../Sections/ourmission/OurStory";

export default function HomePage() {
  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
          {/* Hero Section */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial No.</TableHead>
                <TableHead>Section Name</TableHead>
                <TableHead>Parent Page</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* TeamSection */}
              <SectionRow
                serialNo={1}
                sectionName="TeamSection"
                ComponentPreview={TeamSection}
                ComponentForm={HeroSectionForm}
              />
              {/* Child Development Unlocked*/}
              <SectionRow
                serialNo={2}
                sectionName="Hero "
                ComponentPreview={HeroOueMission}
                ComponentForm={HeroSectionForm}
              />
              {/* Slider*/}
              <SectionRow
                serialNo={3}
                sectionName="Parent With Kindi"
                ComponentPreview={ParentWithKindi}
                ComponentForm={HeroSectionForm}
              />
              {/* How It Works */}
              <SectionRow
                serialNo={4}
                sectionName="Popular Activities"
                ComponentPreview={PopularActivities}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
              <SectionRow
                serialNo={5}
                sectionName="Our Story"
                ComponentPreview={OurStory}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
