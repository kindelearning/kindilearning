export default async function fetchBlogs() {
  const res = await fetch("http://localhost:1337/api/blogs?populate=*");
  const data = await res.json();
  return data.data;
}
