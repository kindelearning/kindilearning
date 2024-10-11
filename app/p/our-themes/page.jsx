"use client";

import { CategoryCard } from "@/app/Widgets";
import { getThemes } from "@/lib/hygraph";
import Link from "next/link";

export default async function Page() {
  const themes = await getThemes();
  const { title, metaDesc, thumbnail, launchTime } = themes;
  const formattedLaunchTime = launchTime
    ? new Date(launchTime).toLocaleString()
    : "No launch date available";

  if (!themes || themes.length === 0) {
    console.log("No themes found");
    return <div>No blogs found!</div>;
  }

  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center pb-32 justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-4">
            <div className="text-[#0a1932] claraheading text-start capitalize">
              Upcoming Themes
            </div>
            <div className="grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full claracontainer">
              {themes.map((theme) => (
                <div key={theme.id}>
                  <Link
                    key={theme.id}
                    target="_blank"
                    // href={`/p/community/${slugify(blog.id)}`}
                    href={`/p/our-themes/${theme.id}`}
                    onClick={() => console.log("Clicked Blog:", CategoryCard)}
                  >
                    <article className="rounded-lg">
                      <CategoryCard
                        schedulesDate={formattedLaunchTime}
                        image={theme.thumbnail.url}
                        description={theme.metaDesc.slice(0, 100)}
                        header={theme.title}
                      />
                    </article>
                  </Link>
                  {/* <p>
                    Launch Time:{" "}
                    {launchTime
                      ? new Date(launchTime).toLocaleDateString()
                      : "Not specified"}
                  </p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
