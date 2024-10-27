"use client";

import { useState, useEffect } from "react";
import { subscribeUser, unsubscribeUser, sendNotification } from "./actions";

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
import HeroContainer from "./data/Home/Hero";


export default function Home() {
  return (
    <>
      <section className="w-full flex flex-col gap-0 justify-center items-center">
        <Header className="sticky" />
        <div className="w-full flex flex-col overflow-hidden gap-0">
          <Hero />
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
