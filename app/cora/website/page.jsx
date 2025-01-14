import VisitorAnalytics from "../Sections/Dashboard/VisitorAnalytics";
import GeolocationAnalytics from "../Sections/Dashboard/GeoChart";
import DeviceAnalytics from "../Sections/Dashboard/DeviceChart";
import RealTimeVisitors from "../Sections/Dashboard/RealTimeVisitors";
import BlogWidgets, {
  RecentBlogs,
  RecentComment,
} from "../Sections/Dashboard/BlogWidgets";
import ActivityWidgets, {
  RecentActivities,
} from "../Sections/Dashboard/ActivityWidgets";
import ThemeWidgets, { RecentThemes } from "../Sections/Dashboard/ThemeWidgets";
import ProductWidgets, {
  LatestProducts,
} from "../Sections/Dashboard/ProductWidgets";
import UserAnalytics from "../Sections/Dashboard/UserWidgets";

export default function Cora() {
  return (
    <>
      <section className="w-full font-fredoka h-auto bg-[#EAEAF5] items-center pb-32 justify-center flex flex-col gap-[20px]">
        <head>
          <title> Kindi Learning - Admin Panel</title>
        </head>
        <div className="claracontainer py-6 w-full flex flex-col overflow-hidden gap-8">
          <UserAnalytics />
          <div className="flex w-full gap-4">
            <VisitorAnalytics />
            <DeviceAnalytics />
          </div>
          <div className="flex w-full gap-4">
            <RealTimeVisitors />
            <GeolocationAnalytics />
          </div>
          <BlogWidgets />
          <ThemeWidgets />
          <RecentThemes />
          <ProductWidgets />
          <LatestProducts />
          {/*
           <ProductWidgets />

           */}
          <RecentBlogs />
          <RecentComment />

          <RecentActivities /> 
          <ActivityWidgets />
        </div>
      </section>
    </>
  );
}
