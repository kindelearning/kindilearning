export async function fetchHowItWorks() {
  try {
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate=*"
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("How It Works Data:", data); // Log the full API response

    if (!data || !data.data) {
      throw new Error("No content available in the API response");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching How It Works data:", error.message);
    return null;
  }
}
