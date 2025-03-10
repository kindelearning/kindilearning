import NotFound from "@/app/not-found";
import ThemeCard from "@/app/Widgets/Card/ThemeCard";
import { getHomeData, getThemes } from "@/lib/hygraph";
import Link from "next/link";

const MonthlyThemes = async () => {
  const homeData = await getHomeData();

  const themes = await getThemes();
  console.log("Home Page Data (in component):", themes);
  if (!themes || themes.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <section className="w-full h-auto bg-[#F3BD40] items-center justify-center py-12 flex transition-all animate-fade-in  duration-300 flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex-col justify-start items-center script inline-flex">
          <div className="w-full claracontainer animate-fade-in px-4 duration-150 text-start  md:text-center text-[#eaeaf5] clarascript">
            Enjoy every Precious Moment with your Children
          </div>
          <div className="w-auto  flex-col justify-center items-center px-4 heading inline-flex">
            <div className="w-full text-start md:text-center">
              <span className="text-[#3f3a64] claraheading animate-fade-in  duration-150">
                This Month&apos;s{" "}
              </span>
              <br />
              <span className="text-[#ffffff] claraheading animate-fade-in  duration-150">
                Early Learning Themes
              </span>
            </div>
            <div className="w-full md:w-[500px] xl:w-[800px] animate-fade-in  duration-150 text-start md:text-center text-purple clarabodyTwo">
              <p>{homeData[0].monthlyTheme}</p>
            </div>
          </div>

          <div className="lg:grid claracontainer w-full flex flex-row overflow-x-scroll scrollbar-hidden px-2 py-4 hover:px-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
            {themes.slice(0, 4).map((theme) => (
              <Link href={`/p/our-themes/${theme.id}`}  key={theme.id}>
                <ThemeCard
                  key={theme.id}
                  image={theme.thumbnail.url}
                  theTime={theme.launchTime}
                  metaDesc={theme.metaDesc}
                  title={theme.title}
                />
              </Link>
            ))}
          </div>
          {themes.length > 4 ? (
            <div className="w-full flex-col justify-center items-center px-4 heading inline-flex">
              <Link
                href="/p/our-themes"
                className="clarabutton text-white py-2 min-w-[200px] lg:w-[240px] text-center px-8 lg:px-4  bg-red hover:bg-purple"
              >
                View More
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default MonthlyThemes;
