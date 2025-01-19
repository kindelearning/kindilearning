export async function fetchAllActivities() {
  try {
    const response = await fetch(
      "https://kindiadmin.up.railway.app/api/activities?populate=*"
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    // Ensure data structure matches expectations
    if (!data || !data.data) {
      console.error("No data found in the API response.");
      throw new Error("No content available in the API response");
    }

    return data.data; // Return the data (or array of themes)
  } catch (error) {
    console.error("Error fetching Dynamic Page Content:", error.message);
    return null; // In case of error, return null
  }
}
