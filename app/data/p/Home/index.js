export async function fetchHeroSection() {
  try {
    const res = await fetch(`http://localhost:1337/api/homepage-hero-section`);

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    if (!data || !data.data) {
      throw new Error("No data found for Hero Section");
    }

    // Access media (image)
    const heroData = data.data[0].attributes;
    const heroImageUrl = heroData.image ? heroData.image.url : null;

    return { heroData, heroImageUrl }; // Return both content and media URL
  } catch (error) {
    console.error("Error fetching Hero Section data:", error.message);
    return null;
  }
}
