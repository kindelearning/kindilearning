import { DollarSign, ListOrdered, Users } from "lucide-react";
import ActivityFeed from "./Sections/ActivityFeed";
import OverviewCard from "./Sections/OverviewCards";
import StatisticsWidget from "./Sections/StatisticsWidget";
import { activityData, RecentActivityWidget } from "./Sections/ActivityItem";
import { statsData, UserStatsWidget } from "./Sections/StatCard";
import {
  notificationsData,
  NotificationsWidget,
} from "./Sections/NotificationsWidget";
import { blogPosts, RecentBlogsWidget } from "./Sections/RecentBlogsWidget";

export default function Cora() {
  return (
    <>
      <section className="w-full font-fredoka h-auto bg-[#EAEAF5] items-center pb-32 justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
          <OverviewCard />
          <UserStatsWidget stats={statsData} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
          <ActivityFeed />
          <RecentActivityWidget activities={activityData} />
          <NotificationsWidget notifications={notificationsData} />
          <RecentBlogsWidget posts={blogPosts} />
        </div>
      </section>
    </>
  );
}
