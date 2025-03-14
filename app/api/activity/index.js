import Image from "next/image";
import { getAllActivities } from "@/lib/hygraph";

export default async function ActivityPage() {
  const blogs = await getAllActivities();

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found!</div>;
  }

  return (
    <div className="w-full h-auto pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col gap-[20px]">
      <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
        <h1 className="text-4xl font-bold text-center">Blog Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white shadow-lg p-4 rounded-lg"
            >
              <Image
                src={blog.thumbnail.url}
                alt={blog.blogTitle}
                width={400}
                height={250}
                className="rounded-t-lg object-cover"
              />
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog.content.html }} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
