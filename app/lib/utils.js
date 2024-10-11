// utils.js
// function slugify(title) {
//     return title
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, '') // remove non-word chars
//       .replace(/\s+/g, '-') // replace spaces with dashes
//       .replace(/-+/g, '-'); // remove duplicate dashes
//   }
function slugify(title) {
  if (!title) return ""; // add null check
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/\s+/g, "-"); // convert spaces to dashes
}

export default slugify;
