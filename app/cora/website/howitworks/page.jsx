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
import HowItWorksSection, {
  UpdateHowItWorks,
} from "../../Sections/Home/HowItWorksSection";
import Monthlytheme, {
  UpdateMonthlytheme,
} from "../../Sections/Home/Monthlytheme";
import PopularActivities, {
  UpdatePopularLearningForm,
} from "../../Sections/Home/PopularActivities";
import { SectionRow } from "../../Sections/SectionRow";
import HowItWorks, {
  UpdateHowItWorkSection,
} from "../../Sections/horItWorks/HowItWorkshero";
import AreaOfLearning, {
  UpdateAreaOfLearning,
} from "../../Sections/horItWorks/Areaoflearning";
import KindiSkillsCategoriesCards, {
  UpdateKindiSkillsCategoriesCards,
} from "../../Sections/horItWorks/KindiSkillsCategoriesCards";
import AgeGroupSection, {
  UpdateAgeGroupSection,
} from "../../Sections/horItWorks/AgeGroupSection";

export default function HomePage() {
  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        <head>
          <title>Update How it Works Page - Cora</title>
        </head>
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
                page="How It Works"
                sectionName="HERO"
                ComponentPreview={HowItWorks}
                ComponentForm={UpdateHowItWorkSection}
              />
              {/* How It Works */}
              <SectionRow
                serialNo={2}
                page="How It Works"
                sectionName="How It Works"
                ComponentPreview={HowItWorksSection}
                ComponentForm={UpdateHowItWorks} // Replace with an actual update form if necessary
              />
              {/* Area Of Learning */}
              <SectionRow
                serialNo={5}
                page="How It Works"
                sectionName="Area Of Learning"
                ComponentPreview={AreaOfLearning}
                ComponentForm={UpdateAreaOfLearning} // Replace with an actual update form if necessary
              />
              {/* Kindi Skills CategoriesCards */}
              <SectionRow
                serialNo={6}
                page="How It Works"
                sectionName="Kindi Skills Categories"
                ComponentPreview={KindiSkillsCategoriesCards}
                ComponentForm={UpdateKindiSkillsCategoriesCards} // Replace with an actual update form if necessary
              />
              {/* Monthlytheme */}
              <SectionRow
                page="How It Works"
                serialNo={7}
                sectionName="Monthly theme"
                ComponentPreview={Monthlytheme}
                ComponentForm={UpdateMonthlytheme} // Replace with an actual update form if necessary
              />
              {/* PopularActivities */}
              <SectionRow
                page="How It Works"
                serialNo={8}
                sectionName="Popular Activities"
                ComponentPreview={PopularActivities}
                ComponentForm={UpdatePopularLearningForm} // Replace with an actual update form if necessary
              />
              {/* AgeGroupSection */}
              <SectionRow
                serialNo={8}
                page="How It Works"
                sectionName="Age Group Section"
                ComponentPreview={AgeGroupSection}
                ComponentForm={UpdateAgeGroupSection} // Replace with an actual update form if necessary
              />
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
