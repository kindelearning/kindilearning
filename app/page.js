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
      <head>
        <title> Kindi Learning</title>
        <meta
          name="description"
          content="Discover the best play activities for your child's early years development at Kindi Learning. Select your preferred activities and learn more about the benefits of engaging with them."
        />
      </head>
      <section className="w-full flex flex-col gap-0 justify-center items-center">
        <Header className="sticky" />
        <div className="w-full flex flex-col overflow-hidden gap-0">
          <Hero />
          <Slider />
          <PromotionalSection />
          <HowItWorks />
          <PromotionalSectionTwo />
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
