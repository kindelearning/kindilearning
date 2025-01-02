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
import ChildDevelopmentUnlock, {
  UpdateChildDevelopmentContent,
} from "../../Sections/Home/ChilddevUnlockedSection";
import HowItWorksSection, {
  UpdateHowItWorks,
} from "../../Sections/Home/HowItWorksSection";
import Monthlytheme, {
  UpdateMonthlytheme,
} from "../../Sections/Home/Monthlytheme";
import EarlyLearningExpert, {
  UpdateEarlyLearningExpert,
} from "../../Sections/Home/EarlyLearningExpert";
import PopularActivities, {
  UpdatePopularLearningForm,
} from "../../Sections/Home/PopularActivities";
import { SectionRow } from "../../Sections/SectionRow";
import Ourpricing, { UpdatePricingForm } from "../../Sections/Home/Ourpricing";
import SliderSection, { UpdateSliderSection } from "../../Sections/Home/Slider";

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
                ComponentPreview={HomepageHeroSectionPage}
                ComponentForm={HeroSectionForm}
              />
              {/* Child Development Unlocked*/}
              <SectionRow
                serialNo={2}
                sectionName="Child Development Unlocked"
                ComponentPreview={ChildDevelopmentUnlock}
                ComponentForm={UpdateChildDevelopmentContent}
              />
              {/* Slider*/}
              <SectionRow
                serialNo={3}
                sectionName="Slider Deprecated"
                ComponentPreview={SliderSection}
                ComponentForm={UpdateSliderSection}
              />
              {/* How It Works */}
              <SectionRow
                serialNo={4}
                sectionName="How It Works"
                ComponentPreview={HowItWorksSection}
                ComponentForm={UpdateHowItWorks} // Replace with an actual update form if necessary
              />
              {/* Monthlytheme */}
              <SectionRow
                serialNo={5}
                sectionName="Monthly Theme"
                ComponentPreview={Monthlytheme}
                ComponentForm={UpdateMonthlytheme} // Replace with an actual update form if necessary
              />
              {/* Our Pricing */}
              <SectionRow
                serialNo={6}
                sectionName="Our Pricing"
                ComponentPreview={Ourpricing}
                ComponentForm={UpdatePricingForm} // Replace with an actual update form if necessary
              />
              <SectionRow
                serialNo={7}
                sectionName="Popular Activities"
                ComponentPreview={PopularActivities}
                ComponentForm={UpdatePopularLearningForm} // Replace with an actual update form if necessary
              />
              {/* EarlyLearningExpert */}
              <SectionRow
                serialNo={8}
                sectionName="Early Learning Expert"
                ComponentPreview={EarlyLearningExpert}
                ComponentForm={UpdateEarlyLearningExpert} // Replace with an actual update form if necessary
              />
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
