export default async function fetchBlogs() {
  const res = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/blogs?populate=*");
  const data = await res.json();
  return data.data;
}
