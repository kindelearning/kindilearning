export async function fetchOurMission() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/our-mission?populate=*"
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Our Mission Data:", data); // Log the full API response

    if (!data || !data.data) {
      console.error("No data found in the API response.");
      throw new Error("No content available in the API response");
    }

    // Return the components data
    return {
      Hero: data.data.Hero,
      OurStory: data.data.OurStory,
      Parentwithkindi: data.data.Parentwithkindi,
      OurTeam: data.data.OurTeam,
    };
  } catch (error) {
    console.error("Error fetching OurMission:", error.message);
    return null;
  }
}
