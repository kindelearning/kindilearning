async function fetchPageContent() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/our-mission?populate=*"
    ); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching page content:", error);
    return null;
  }
}
