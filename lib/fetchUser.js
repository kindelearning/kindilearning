// lib/fetchUser.js
export async function fetchUser(email) {
    const response = await fetch(`/api/getAccountByEmail?email=${email}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  }
  