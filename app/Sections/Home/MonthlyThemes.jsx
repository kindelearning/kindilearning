import { fetchOurThemes } from "@/app/data/p/Dynamic/OurTheme";
import { fetchMonthlyTheme } from "@/app/data/p/Home";
import NotFound from "@/app/not-found";
import ThemeCard from "@/app/Widgets/Card/ThemeCard";
import { ThemeDummy } from "@/public/Images";
import Link from "next/link";
import ThemeGrid from "./ThemeGrid";

export default async function MonthlyThemes() {
  const content = await fetchMonthlyTheme();

  if (!content) {
    return <p>No data available</p>;
  }

  const themes = await fetchOurThemes();
  if (!themes || themes.length === 0) {
    return <NotFound />;
  }
  console.log("Themes for Home Page,", themes);

  const monthlyTheme = content?.Content;

  if (!monthlyTheme) {
    return <p>No theme content available</p>;
  }

  return (
    <>
      <section className="w-full h-auto bg-[#F3BD40] items-center justify-center py-12 flex transition-all animate-fade-in  duration-300 flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex-col justify-start items-center script inline-flex">
          {monthlyTheme.featuredText && (
            <div className="w-full claracontainer animate-fade-in px-4 duration-150 text-start  md:text-center text-[#eaeaf5] clarascript">
              {monthlyTheme.featuredText ||
                "Enjoy every Precious Moment with your Children"}
            </div>
          )}
          <div className="w-auto  flex-col justify-center items-center px-4 heading inline-flex">
            <div className="w-full text-start md:text-center">
              <span className="text-[#3f3a64] claraheading animate-fade-in  duration-150">
                {monthlyTheme.title
                  ? monthlyTheme.title.split(" ").slice(0, 2).join(" ")
                  : "This Months"}{" "}
              </span>
              <br />
              <span className="text-[#ffffff] claraheading animate-fade-in  duration-150">
                {monthlyTheme.title
                  ? monthlyTheme.title.split(" ").slice(3, 12).join(" ")
                  : "Learning Themes"}{" "}
              </span>
            </div>
            {monthlyTheme.BodyDescription ? (
              <p
                className="prose w-full md:w-[500px] xl:w-[800px] animate-fade-in  duration-150 text-start md:text-center text-purple clarabodyTwo"
                dangerouslySetInnerHTML={{
                  __html: monthlyTheme.BodyDescription,
                }}
              />
            ) : (
              <p>
                Providing themes for each activity is a powerful way to keep
                children engaged in learning; we use it to both maintain
                involvement and reinforce the previous day&apos;s learnings.
                That&apos;s why we release new themes every month.
              </p>
            )}
          </div>

          {/* <div className="lg:grid claracontainer w-full flex flex-row overflow-x-scroll scrollbar-hidden px-2 py-4 hover:px-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
            {themes.slice(0, 4).map((theme) => (
              <Link
                target="_blank"
                href={`/p/our-themes/${theme.documentId}`}
                key={theme.id}
              >
                <ThemeCard
                  key={theme.id}
                  image={
                    theme?.Thumbnail
                      ? `https://lionfish-app-98urn.ondigitalocean.app${theme?.Thumbnail?.url}`
                      : "/Images/ThemeDummy.png"
                  } // Fallback to default image if URL is missing
                  theTime={theme?.LaunchTime || "No launch time specified"} // Fallback if LaunchTime is missing
                  metaDesc={
                    theme?.metaDesc
                      ? theme.metaDesc.slice(0, 100)
                      : "No description available"
                  } // Fallback if metaDesc is missing
                  title={theme?.Title || "Untitled"} // Fallback if Title is missing
                />
              </Link>
            ))}
          </div> */}
          <ThemeGrid />
        </div>
      </section>
    </>
  );
}
