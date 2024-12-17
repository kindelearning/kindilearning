export async function fetchHeroSection() {
  try {
    const res = await fetch(`http://localhost:1337/api/homepage-hero-section?populate=*`);

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    if (!data || !data.data) {
      throw new Error("No data found for Hero Section");
    }

    // Extracting hero section data
    const heroData = data.data;

    // Construct the full URL for the media (Image/Video)
    const heroMediaUrl = heroData.Image?.url
      ? `http://localhost:1337${heroData.Image.url}`
      : null;

    return { heroData, heroMediaUrl }; // Return the data and the media URL
  } catch (error) {
    console.error("Error fetching Hero Section data:", error.message);
    return null;
  }
}
