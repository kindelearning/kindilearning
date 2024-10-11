"use client";

import slugify from "@/app/lib/utils";
import { BlogCard } from "@/app/Widgets";
import { getPublishedPosts } from "@/lib/hygraph";
import Link from "next/link";

export default async function Page() {
  const blogs = await getPublishedPosts();

  if (!blogs || blogs.length === 0) {
    console.log("No blogs found");
    return <div>No blogs found!</div>;
  }

  return (
    <>
      <section className="w-full h-auto pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-2 md:gap-4">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] text-[32px] tracking-tight font-semibold font-fredoka uppercase leading-10">
                The Kindi{" "}
              </span>
              <span className="text-[#f05c5c] text-[32px] font-semibold font-fredoka uppercase leading-10">
                Connect
              </span>
            </div>
            <div className="w-full text-center px-0 md:px-12 lg:px-24 xl:px-28 text-[#3f3a64] clarabodyTwo">
              Here&apos;s where you&apos;ll discover your daily educational play
              activities. Utilize our drag-and-drop feature to rearrange
              learning, ensuring development seamlessly fits your schedule.
              Additionally, sync your schedule with your child&apos;s nursery
              for a smooth and integrated learning experience.
            </div>
          </div>
          <div className="claracontainer w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 overflow-hidden gap-4">
            {blogs.map((blog) => (
              <div key={blog.id}>
                <Link
                  key={blog.id}
                  target="_blank"
                  href={`/p/community/${blog.id}`}
                  onClick={() => console.log("Clicked Blog:", BlogCard)}
                >
                  <article className="bg-white rounded-lg">
                    <BlogCard
                      title={blog.blogTitle}
                      metsDesc={blog.metaDescription}
                      image={blog.thumbnail.url}
                    />
                  </article>
                </Link>
                {/* The Actual Content Field in the blog */}
                {/* <div dangerouslySetInnerHTML={{ __html: blog.content.html }} /> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
{
  /* <div key={blog.id}>
  {" "}
  <Link href={`/p/community/${slugify(blog.blogTitle)}`}>
    <BlogCard
      title={blog.blogTitle}
      metsDesc={blog.metaDescription}
      image={blog.thumbnail.url}
    />
  </Link>
</div>; */
}
