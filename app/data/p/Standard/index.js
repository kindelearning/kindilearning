export async function fetchInvestmentOpportunity() {
  try {
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/investmentoppertunite?populate=*"
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Fetched Data:", data); // Debug: Log the response

    if (!data || !data.data || !data.data.Content) {
      throw new Error("No content available in the API response");
    }

    return data.data.Content; // Return the nested Content object
  } catch (error) {
    console.error("Error fetching Investment Opportunity:", error);
    return null;
  }
}

export async function fetchTnc() {
  try {
    const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/tnc?populate=*");
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Privacy Policy Data:", data); // Debug: Log the response

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
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/refundpolicy?populate=*"
    );
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

export async function fetchFaq() {
  try {
    const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/faqs?populate=*");
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.data) {
      throw new Error("No FAQ content available in the API response");
    }

    // Return the array of FAQ items
    return data.data;
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return null;
  }
}

export async function fetchPrivacyPolicy() {
  try {
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/privacypolicy?populate=*"
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Privacy Policy Data:", data); // Debug: Log the response

    if (!data || !data.data || !data.data.Content) {
      throw new Error("No content available in the API response");
    }

    return data.data.Content; // Return the nested Content object
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    return null;
  }
}

export async function fetchQualityControl() {
  try {
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/qualitycontrol?populate=*"
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Quality Control Data:", data);

    // Ensure data structure matches expectations
    if (!data || !data.data || !data.data.Content) {
      console.error("No data found in the API response.");
      throw new Error("No content available in the API response");
    }

    return data.data.Content; //
  } catch (error) {
    console.error("Error fetching QualityControl:", error.message);
    return null;
  }
}
