// utils/fetchUserDetails.js

// const response = await fetch('http://localhost:1337/api/users/me?populate=profilepic', {
export const fetchUserDetails = async (token) => {
  try {
    const response = await fetch(
      "http://localhost:1337/api/users/me?populate[profilepic]=true&populate[myKids]=true",
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

export const sendPartnerInvite = async (token, email) => {
  try {
    const response = await fetch(
      "http://localhost:1337/api/partner-invitation/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // JWT for user authentication
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send the partner invite");
    }

    const data = await response.json();
    return data; // Return success message or data from the server
  } catch (error) {
    console.error(error.message);
    throw error; // Rethrow error for handling in the component
  }
};
