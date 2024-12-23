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
import PopularActivities from "../../Sections/Home/PopularActivities";
import { SectionRow } from "../../Sections/SectionRow";
import HowItWorks from "../../Sections/horItWorks/HowItWorkshero";
import AreaOfLearning from "../../Sections/horItWorks/Areaoflearning";
import KindiSkillsCategoriesCards from "../../Sections/horItWorks/KindiSkillsCategoriesCards";
import AgeGroupSection from "../../Sections/horItWorks/AgeGroupSection";

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
              {/* Hero Secton */}
              <SectionRow
                serialNo={1}
                sectionName="HERO"
                ComponentPreview={HowItWorks}
                ComponentForm={HeroSectionForm}
              />
              {/* How It Works */}
              <SectionRow
                serialNo={2}
                sectionName="How It Works"
                ComponentPreview={HowItWorksSection}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
              {/* Monthlytheme */}
              <SectionRow
                serialNo={5}
                sectionName="Area Of Learning"
                ComponentPreview={AreaOfLearning}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
              {/* Kindi Skills CategoriesCards */}
              <SectionRow
                serialNo={6}
                sectionName="Kindi Skills CategoriesCards"
                ComponentPreview={KindiSkillsCategoriesCards}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
              {/* Monthlytheme */}
              <SectionRow
                serialNo={7}
                sectionName="Monthly theme"
                ComponentPreview={Monthlytheme}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
              {/* PopularActivities */}
              <SectionRow
                serialNo={8}
                sectionName="Popular Activities"
                ComponentPreview={PopularActivities}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
              {/* AgeGroupSection */}
              <SectionRow
                serialNo={8}
                sectionName="Age Group Section"
                ComponentPreview={AgeGroupSection}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
