import Image from "next/image";
import NotFound from "@/app/not-found";
import { getHomeData } from "@/lib/hygraph";

export default async function ActivityPage() {
  const home = await getHomeData();

  if (!home || home.length === 0) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <div className="w-full h-auto pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col gap-[20px]">
      <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
        <h1 className="text-4xl font-bold text-center">Shop product Title</h1>

        <div className="flex flex-col w-full gap-6">
          <section>
            <h2>Child Development Unlocked</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: homeData.hero.html,
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: homeData.childDevelopmentUnlocked.html,
              }}
            />
          </section>
          <section>
            <h2>Early Learning Experts</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: homeData.earlyLearningExperts.html,
              }}
            />
          </section>
          <section>
            <h2>How It Works</h2>
            <div dangerouslySetInnerHTML={{ __html: homeData.howItWorks.html }} />
          </section>
          <section>
            <h2>How It Works - Step One</h2>
            <div dangerouslySetInnerHTML={{ __html: homeData.howItWorksOne.html }} />
          </section>
          <section>
            <h2>How It Works - Step Two</h2>
            <div dangerouslySetInnerHTML={{ __html: homeData.howItWorksTwo.html }} />
          </section>
          <section>
            <h2>How It Works - Step Three</h2>
            <div
              dangerouslySetInnerHTML={{ __html: homeData.howItWorksThree.html }}
            />
          </section>
          <section>
            <h2>Our Pricing</h2>
            <div dangerouslySetInnerHTML={{ __html: homeData.ourPricing.html }} />
          </section>
          <section>
            <h2>Popular Learning Activities</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: homeData.popularLearningActivities.html,
              }}
            />
          </section>
          <section>
            <h2>Monthly Themes</h2>
            <div dangerouslySetInnerHTML={{ __html: homeData.monthlyThemes.html }} />
          </section>
        </div>
      </div>
    </div>
  );
}
