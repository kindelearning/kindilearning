export default async function fetchBlogs() {
  const res = await fetch("https://upbeat-life-04fe8098b1.strapiapp.com/api/blogs?populate=*");
  const data = await res.json();
  return data.data;
}
