import { DollarSign, ListOrdered, Users } from "lucide-react";
import ActivityFeed from "./Sections/ActivityFeed";
import StatisticsWidget from "./Sections/StatisticsWidget";
import { activityData, RecentActivityWidget } from "./Sections/ActivityItem";
import { statsData, UserStatsWidget } from "./Sections/StatCard";
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
          <RecentBlogs />
          <RecentComment />
          <RecentActivities />
          <ActivityWidgets />

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatisticsWidget
              title="Total Revenue"
              value="$250,000"
              icon={<DollarSign size={24} />}
              change="+12%"
              trend="up"
            />
            <StatisticsWidget
              title="Active Users"
              value="1,200"
              icon={<Users size={24} />}
              change="-5%"
              trend="down"
            />
            <StatisticsWidget
              title="Orders Completed"
              value="3,000"
              icon={<ListOrdered size={24} />}
              change="+8%"
              trend="up"
            />
          </div> */}
        </div>
      </section>
    </>
  );
}
