import { getHomeData } from "@/lib/hygraph";


// Importing hero page data
export const homeData = getHomeData();
console.log("Home Page Data (in component):", homeData);
