export default async function fetchBlogs() {
  const res = await fetch("https://proper-fun-404805c7d9.strapiapp.com/api/blogs?populate=*");
  const data = await res.json();
  return data.data;
}
