
export async function fetchPageContent() {
    try {
      const response = await fetch(
        "http://localhost:1337/api/our-mission?populate=*"
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Our mission Data:", data); // Log the full API response
  
      if (!data || !data.data || !data.data.Content) {
        throw new Error("No content available in the API response");
      }
  
      return data.data.Content; // Return the nested Content object
    } catch (error) {
      console.error("Error fetching Privacy Policy:", error);
      return null;
    }
  }