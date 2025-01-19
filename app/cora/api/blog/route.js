export default async function fetchBlogs() {
  const res = await fetch("https://kindiadmin.up.railway.app/api/blogs?populate=*");
  const data = await res.json();
  return data.data;
}
