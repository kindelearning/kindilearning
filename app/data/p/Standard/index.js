export async function fetchInvestmentOpportunity() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/investmentoppertunite?populate=*"
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched Data:", data); // Debug: Log the response

    if (!data || !data.data || !data.data.Content) {
      throw new Error("No content available in the API response");
    }

    return data.data.Content; // Return the nested Content object
  } catch (error) {
    console.error("Error fetching Investment Opportunity:", error);
    return null;
  }
}

export async function fetchPrivacyPolicy() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/privacypolicy?populate=*"
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Privacy Policy Data:", data); // Debug: Log the response

    if (!data || !data.data || !data.data.Content) {
      throw new Error("No content available in the API response");
    }

    return data.data.Content; // Return the nested Content object
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    return null;
  }
}

export async function fetchTnc() {
  try {
    const response = await fetch("http://localhost:1337/api/tnc?populate=*");
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Privacy Policy Data:", data); // Debug: Log the response

    if (!data || !data.data || !data.data.Content) {
      throw new Error("No content available in the API response");
    }

    return data.data.Content; // Return the nested Content object
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    return null;
  }
}
export async function fetchRefundPolicy() {
  try {
    const response = await fetch("http://localhost:1337/api/refundpolicy?populate=*");
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Refund Policy Data:", data); // Log the full API response

    if (!data || !data.data || !data.data.Content) {
      throw new Error("No content available in the API response");
    }

    return data.data.Content; // Return the nested Content object
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    return null;
  }
}
