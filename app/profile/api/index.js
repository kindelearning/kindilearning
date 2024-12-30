// "http://localhost:1337/api/users/me?populate[profilepic]=true&populate[myKids][populate][activity_completeds]=true&populate[myPartners]=true&populate[myPayment]=true",
export const fetchUserDetails = async (token) => {
  try { 
    const response = await fetch(
      "http://localhost:1337/api/users/me?populate[profilepic]=true&populate[myKids][populate][activity_completeds]=true&populate[myKids][populate][badge_completeds]=true&populate[myKids][populate][milestone_completeds]=true&populate[myPartners]=true&populate[myPayment]=true&populate[partnerOf]=true",
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
