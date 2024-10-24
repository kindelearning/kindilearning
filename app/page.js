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

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function Home() {
  return (
    <>
      <section className="w-full flex flex-col gap-0 justify-center items-center">
        <Header className="sticky" />
        <div className="w-full flex flex-col overflow-hidden gap-0">
          {/* <Hero /> */}
          <HeroContainer />
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
