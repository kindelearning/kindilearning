import HomepageHeroSectionPage from "../../Sections/Home/HomepageHeroSectionPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, FilePenLine } from "lucide-react";
import HeroSectionForm from "../../Sections/Home/HomepageHeroSectionPageUpdate";
import ChildDevelopmentUnlock from "../../Sections/Home/ChilddevUnlockedSection";
import HowItWorksSection from "../../Sections/Home/HowItWorksSection";
import Monthlytheme from "../../Sections/Home/Monthlytheme";
import EarlyLearningExpert from "../../Sections/Home/EarlyLearningExpert";
import PopularActivities from "../../Sections/Home/PopularActivities";
import { SectionRow } from "../../Sections/SectionRow";



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
                ComponentForm={HeroSectionForm}
              />
              {/* Slider*/}
              <SectionRow
                serialNo={3}
                sectionName="Slider"
                ComponentPreview={HomepageHeroSectionPage}
                ComponentForm={HeroSectionForm}
              />
              {/* How It Works */}
              <SectionRow
                serialNo={4}
                sectionName="How It Works"
                ComponentPreview={HowItWorksSection}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
              {/* Monthlytheme */}
              <SectionRow
                serialNo={5}
                sectionName="Monthly Theme"
                ComponentPreview={Monthlytheme}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
              <SectionRow
                serialNo={6}
                sectionName="Popular Activities"
                ComponentPreview={PopularActivities}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
              {/* EarlyLearningExpert */}
              <SectionRow
                serialNo={7}
                sectionName="Early Learning Expert"
                ComponentPreview={EarlyLearningExpert}
                ComponentForm={HeroSectionForm} // Replace with an actual update form if necessary
              />
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
