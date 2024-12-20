import React from "react";
import HomepageHeroSectionPage from "../../Sections/Home/HomepageHeroSectionPage";
import HomepageHeroSectionPageUpdate from "../../Sections/Home/HomepageHeroSectionPageUpdate";

export default function HomePage() {
  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
          <HomepageHeroSectionPage />
          <HomepageHeroSectionPageUpdate />
        </div>
      </section>
    </>
  );
}
