import {
  BottomNavigation,
  DefaultReviews,
  Footer,
  Header,
  Hero,
  HowItWorks,
  MonthlyThemes,
  Newsletter,
  OurPricing,
  PopularActivity,
  PromotionalSection,
  PromotionalSectionTwo,
  Slider,
} from "./Sections";

export default async function Home() {
  return (
    <>
      <section className="w-full flex flex-col gap-0 justify-center items-center">
        <Header className="sticky" />
        <div className="w-full flex flex-col overflow-hidden gap-0">
          <Hero />
          {/* <HeroContainer /> */}
          <Slider />
          <PromotionalSection />
          <PromotionalSectionTwo />
          <HowItWorks />
          <MonthlyThemes />
          <PopularActivity />
          <DefaultReviews />
          <OurPricing />
        </div>
        <Newsletter />
        <BottomNavigation />
        <Footer />
      </section>
    </>
  );
}
