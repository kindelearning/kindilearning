export async function fetchHeroSection() {
  try {
    const res = await fetch(
      `https://proper-fun-404805c7d9.strapiapp.com/api/homepage-hero-section?populate=*`
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
    const heroMediaUrl = heroData.Image?.url ? `heroData.Image.url` : null;

    return { heroData, heroMediaUrl }; // Return the data and the media URL
  } catch (error) {
    console.error("Error fetching Hero Section data:", error.message);
    return null;
  }
}

export async function fetchChildDevelopmentUnlock() {
  try {
    const res = await fetch(
      "https://proper-fun-404805c7d9.strapiapp.com/api/childdevelopmentunlock?populate=Content.Media",
      { next: { revalidate: 60 } } // Optional revalidation for ISR
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!data?.data?.Content) {
      throw new Error("No content found for Child Development Unlock.");
    }

    const content = data.data.Content;

    const mediaUrl = content.Media?.[0]?.url
      ? content.Media[0].url
      : null;

    return {
      title: content.Title || "No Title",
      body: content.Body || "No Body",
      featuredText: content.featuredText || "No Featured Text",
      media: mediaUrl || null,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

export async function fetchEarlyLearningExpert() {
  try {
    const res = await fetch(
      `https://proper-fun-404805c7d9.strapiapp.com/api/early-learning-expert?populate=Content.Media`
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

    const mediaUrl = content.Media?.[0]?.url
      ? content.Media[0].url
      : null;

    return content; // Return the content data
  } catch (error) {
    console.error("Error fetching Early Learning Expert data:", error.message);
    return null;
  }
}

export async function fetchPopularLearning() {
  try {
    const response = await fetch(
      "https://proper-fun-404805c7d9.strapiapp.com/api/popularlearning?populate=*"
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching Popular Learning: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching Popular Learning:", error);
    return null;
  }
}

export async function fetchHowItWorksData() {
  try {
    const res = await fetch(
      `https://proper-fun-404805c7d9.strapiapp.com/api/howitwork?populate=HIWSection.Media`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch How It Works data");
    }
    const data = await res.json();
    if (!data || !data.data) {
      throw new Error("No data found for Popular Learning section");
    }
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchMonthlyTheme() {
  try {
    const res = await fetch(
      "https://proper-fun-404805c7d9.strapiapp.com/api/monthlytheme?populate=*"
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    if (!data || !data.data) {
      throw new Error("No data found for Monthly Theme section");
    }

    return data.data; // Return the entire content of Monthly Theme
  } catch (error) {
    console.error("Error fetching Monthly Theme data:", error.message);
    return null;
  }
}

export async function fetchDefaultReview() {
  try {
    const response = await fetch(
      "https://proper-fun-404805c7d9.strapiapp.com/api/defaultreview?populate=*"
    );

    if (!response.ok) {
      throw new Error(`Error fetching Default Review: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !data.data) {
      throw new Error("No data found for Monthly Theme section");
    }
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching Default Review:", error);
    return null;
  }
}

export async function fetchPricingData() {
  try {
    const response = await fetch(
      "https://proper-fun-404805c7d9.strapiapp.com/api/ourpricing?populate=*"
      // "https://proper-fun-404805c7d9.strapiapp.com/api/ourpricing?populate[AnnualPlans][populate]=Features&[MonthlyPlans][populate]=Features"
    );

    if (!response.ok) {
      throw new Error(`Error fetching Pricing Data: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !data.data) {
      throw new Error("No data found for Pricing section");
    }
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching Pricing Data:", error);
    return null;
  }
}
export async function fetchPricingDataFeatures() {
  try {
    const response = await fetch(
      // "https://proper-fun-404805c7d9.strapiapp.com/api/ourpricing?populate[AnnualPlans][populate]=Features&[MonthlyPlans][populate]=Features"
      "https://proper-fun-404805c7d9.strapiapp.com/api/ourpricing?populate[MonthlyPlans][populate][0]=Features&populate[MonthlyPlans][populate][1]=Thumbnail&populate[AnnualPlans][populate][0]=Features&populate[AnnualPlans][populate][1]=Thumbnail"
    );

    if (!response.ok) {
      throw new Error(`Error fetching Pricing Data: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !data.data) {
      throw new Error("No data found for Pricing section");
    }
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching Pricing Data:", error);
    return null;
  }
}

export async function fetchMonthlyPricingDataFeatures() {
  try {
    const response = await fetch(
      "https://proper-fun-404805c7d9.strapiapp.com/api/ourpricing?populate[MonthlyPlans][populate]=Features"
    );

    if (!response.ok) {
      throw new Error(`Error fetching Pricing Data: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !data.data) {
      throw new Error("No data found for Pricing section");
    }
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching Pricing Data:", error);
    return null;
  }
}
