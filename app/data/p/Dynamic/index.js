export async function fetchDynamicPageContent() {
  try {
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/dynammic-page-content?populate=*"
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Dynamic Data:", data);

    // Ensure data structure matches expectations
    if (!data || !data.data) {
      console.error("No data found in the API response.");
      throw new Error("No content available in the API response");
    }

    return data.data; //
  } catch (error) {
    console.error("Error fetching QualityControl:", error.message);
    return null;
  }
}
