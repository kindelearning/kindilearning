import BadgeSection from "@/app/Sections/Profile/BadgeSection";
import { Achievement, Milestone, ProfileProgress } from "@/public/Images";
import Link from "next/link";

export default function QuickNavigation() {
  return (
    <>
      <div className="claracontainer px-0 w-full flex flex-row justify-start overflow-x-scroll scrollbar-hidden items-start overflow-hidden gap-2">
        <Link target="_blank" href="/profile/milestone">
          <BadgeSection
            icon={Milestone}
            backgroundColor="#3F3D91"
            borderColor="#9998c2"
            title="Milestone"
          />
        </Link>
        <Link target="_blank" href="/profile/progress">
          <BadgeSection
            icon={ProfileProgress}
            title="Progress"
            backgroundColor="#FF8E00"
            borderColor="#f2c99b"
          />
        </Link>
        <Link target="_blank" href="/profile/achievements">
          <BadgeSection
            icon={Achievement}
            title="Achievement"
            backgroundColor="#C42797"
            borderColor="#dc8dc5"
          />
        </Link>
      </div>
    </>
  );
}
