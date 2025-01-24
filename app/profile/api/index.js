// Its INvalid -------    "https://lionfish-app-98urn.ondigitalocean.app/api/users/me?populate[profilepic]=true&populate[myKids][populate][activity_completeds]=true&populate[myKids][populate][badge_completeds]=true&populate[myKids][populate][milestone_completeds]=true&populate[myPartners]=true&populate[myPayment]=true&populate[partnerOf]=true",
// Its Valid ------   "https://lionfish-app-98urn.ondigitalocean.app/api/users/me?populate[profilepic]=true&populate[myKids]=*&populate[myPaymentMethods]=*&populate[myPartner]=*&populate[iAmPartnerOf]=*",
export const fetchUserDetails = async (token) => {
  try {
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/users/me?populate=*",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json();
    return data; // Return user data
  } catch (error) {
    console.error(error.message);
    throw error; // Rethrow error for handling in the component
  }
};

export const fetchKidDetails = async () => {
  try {
    const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/kids?populate=*", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json();
    return data; // Return user data
  } catch (error) {
    console.error(error.message);
    throw error; // Rethrow error for handling in the component
  }
};

export const fetchLevelDetails = async () => {
  try {
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/levels?populate=*",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json();
    return data; // Return user data
  } catch (error) {
    console.error(error.message);
    throw error; // Rethrow error for handling in the component
  }
};
