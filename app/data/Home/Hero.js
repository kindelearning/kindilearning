import NotFound from "@/app/not-found";
import { Hero } from "@/app/Sections";
import { getHomeData } from "@/lib/hygraph";

export default async function HeroContainer() {
    const homeData = await getHomeData();
    console.log("Home Page Data (in server component):", homeData);
  
    if (!homeData || !homeData[0]?.hero) {
      return <NotFound />;
    }
  
    return <Hero homeData={homeData} />;
  }