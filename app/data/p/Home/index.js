export async function fetchHeroSection() {
  try {
    const res = await fetch(
      `http://localhost:1337/api/homepage-hero-section?populate=*`
    );

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

export async function fetchChildDevelopmentUnlock() {
  try {
    const res = await fetch(
      `http://localhost:1337/api/childdevelopmentunlock?populate=*`
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);

    if (!data || !data.data || !data.data.Content) {
      throw new Error("No data found for Child Development section");
    }

    return data.data.Content; // Extra
  } catch (error) {
    console.error("Error fetching Child Development data:", error.message);
    return null;
  }
}

export async function fetchEarlyLearningExpert() {
  try {
    const res = await fetch(
      `http://localhost:1337/api/early-learning-expert?populate=*`
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    if (!data || !data.data) {
      throw new Error("No data found for Early Learning Expert section");
    }

    // Extracting content
    const content = data.data.Content;

    return content; // Return the content data
  } catch (error) {
    console.error("Error fetching Early Learning Expert data:", error.message);
    return null;
  }
}
