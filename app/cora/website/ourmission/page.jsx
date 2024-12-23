import HomepageHeroSectionPage from "../../Sections/Home/HomepageHeroSectionPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SectionRow } from "../../Sections/SectionRow";
import OurMissionHero, {
  UpdateTeamSection,
} from "../../Sections/ourmission/TeamSection";
import TeamSection from "../../Sections/ourmission/TeamSection";
import HeroOueMission, {
  UpdateHeroSection,
} from "../../Sections/ourmission/HeroOueMission";
import ParentWithKindi, {
  UpdateParentWithKindiSection,
} from "../../Sections/ParentWithKindi";
import PopularActivities, {
  UpdatePopularLearningForm,
} from "../../Sections/Home/PopularActivities";
import OurStory, {
  UpdateOurStorySection,
} from "../../Sections/ourmission/OurStory";

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
                page="Our Mission"
                sectionName="TeamSection"
                ComponentPreview={TeamSection}
                ComponentForm={UpdateTeamSection}
              />
              {/* Child Development Unlocked*/}
              <SectionRow
                serialNo={2}
                page="Our Mission"
                sectionName="Hero "
                ComponentPreview={HeroOueMission}
                ComponentForm={UpdateHeroSection}
              />
              <SectionRow
                page="Our Mission"
                serialNo={3}
                sectionName="Parent With Kindi"
                ComponentPreview={ParentWithKindi}
                ComponentForm={UpdateParentWithKindiSection}
              />
              {/* How It Works */}
              <SectionRow
                serialNo={4}
                page="Our Mission"
                sectionName="Popular Activities"
                ComponentPreview={PopularActivities}
                ComponentForm={UpdatePopularLearningForm} // Replace with an actual update form if necessary
              />
              <SectionRow
                serialNo={5}
                page="Our Mission"
                sectionName="Our Story"
                ComponentPreview={OurStory}
                ComponentForm={UpdateOurStorySection} // Replace with an actual update form if necessary
              />
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
