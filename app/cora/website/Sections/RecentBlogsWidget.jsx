const BlogCard = ({ post }) => {
  return (
    <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
      {/* Thumbnail */}
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-16 h-16 object-cover rounded-lg"
      />
      {/* Content */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">{post.title}</h4>
        <p className="text-xs text-gray-600 line-clamp-2">{post.description}</p>
        <a
          href={post.link}
          className="text-indigo-500 text-xs font-medium mt-2 inline-block hover:underline"
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

export const RecentBlogsWidget = ({ posts }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Blogs</h3>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

// Example blog post data
export const blogPosts = [
  {
    title: "How to Build a Responsive Dashboard",
    description:
      "Learn the fundamentals of creating a responsive dashboard layout using TailwindCSS.",
    thumbnail: "https://via.placeholder.com/64", // Replace with real image URLs
    link: "/blog/responsive-dashboard",
  },
  {
    title: "10 Design Tips for Modern UIs",
    description:
      "Discover the best practices for crafting visually appealing and user-friendly interfaces.",
    thumbnail: "https://via.placeholder.com/64", // Replace with real image URLs
    link: "/blog/design-tips",
  },
  {
    title: "Next.js: The Future of Web Development",
    description:
      "Explore why Next.js is a popular choice for building scalable and fast web applications.",
    thumbnail: "https://via.placeholder.com/64", // Replace with real image URLs
    link: "/blog/nextjs-future",
  },
];
