// lib/hygraph.js
/**
 * @returns the Card Object of Community Page
 */
export const getPublishedPosts = async () => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

  const query = `
    query {
      blogs {
        id
        blogTitle
        metaDescription
        thumbnail {
          url
        }
        content {
          html  # Retrieve the HTML content
          markdown  # Retrieve as markdown
          raw  # Retrieve raw JSON
        }
        likeCount
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();

    // Log the entire response to inspect the structure
    console.log("Hygraph Response:", jsonData);

    // Extract blogs data from response
    const blogs = jsonData.data?.blogs || [];
    console.log("Blogs data:", blogs); // Log blogs data specifically

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
/**
 * @BlogDetail Content for detailed blogs dynamically
 */
export const getBlogById = async (id) => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

  const query = `
    query($id: ID!) {
      blog(where: { id: $id }) {
        id
        blogTitle
        metaDescription
        thumbnail {
          url
        }
        content {
          html
        }
        likeCount
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { id }, // Pass the blog id as variable
      }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching blog by ID: ${res.statusText}`);
    }

    const jsonData = await res.json();
    const blog = jsonData.data?.blog;
    return blog;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return null;
  }
};

/**
 * @LikeCountLogic
 */
export const incrementLikeCount = async (id, currentLikeCount) => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

  const mutation = `
    mutation($id: ID!, $likeCount: Int!) {
      updateBlog(
        where: { id: $id }
        data: { likeCount: $likeCount }
      ) {
        id
        likeCount
      }
      publishBlog(where: { id: $id }) {
        id
        likeCount
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables: { id, likeCount: currentLikeCount + 1 },
      }),
    });

    if (!res.ok) {
      throw new Error(`Error updating like count: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data;
  } catch (error) {
    console.error("Error updating like count:", error);
    return null;
  }
};

/**
 * @likeblogpost
 */
export const likeBlogPost = async (id, currentLikeCount) => {
  const mutation = `
    mutation($id: ID!, $likeCount: Int!) {
      updateBlog(where: { id: $id }, data: { likeCount: $likeCount }) {
        id
        likeCount
      }
      publishBlog(where: { id: $id }) {
        id
      }
    }
  `;

  const variables = {
    id,
    likeCount: currentLikeCount + 1, // Increment the like count
  };

  const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const json = await res.json();
  return json.data.updateBlog.likeCount;
};

/**
 * @returns The Themes Data for Our Theme Page
 */
export const getThemes = async () => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

  const query = `
    query {
      themes {
        id
        title
        metaDesc
        thumbnail {
          url
        }
        aboutContent {
          html  # Retrieve the HTML content
          markdown  # Retrieve as markdown
          raw  # Retrieve raw JSON
        }
        expectContent {
          html  # Retrieve the HTML content
          markdown  # Retrieve as markdown
          raw  # Retrieve raw JSON
        }
        launchTime
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();
    console.log("Hygraph Response for themes:", jsonData);

    // Extract themes data from response
    const themes = jsonData.data?.themes || [];
    console.log("Themes data:", themes); // Log themes data specifically

    return themes;
  } catch (error) {
    console.error("Error fetching themes:", error);
    return [];
  }
};

/**
 * @ThemeDetail_Page
 */
export const getThemeById = async (id) => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

  const query = `
    query getThemeById($id: ID!) {
      theme(where: { id: $id }) {
        id
        title
        metaDesc
        thumbnail {
          url
        }
        aboutContent {
          html
          markdown
          raw
        }
        expectContent {
          html
          markdown
          raw
        }
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query, variables: { id } }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching theme data: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.theme || null;
  } catch (error) {
    console.error("Error fetching theme by ID:", error);
    return null;
  }
};

/**
 * @all_activity_page
 */
export const getAllActivities = async () => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

  const query = `
    query {
      activities {
        id
        title
        skills
        content {
          html
          markdown
          raw
        }
        activityDate
        thumbnail {
          url
        }
        activityImages {
          url
        }
        setUpTime
        themeName
        focusAge
        eventTimeline
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.activities || [];
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
};

/**
 * @GetActivityByID
 */
export const getActivityById = async (id) => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

  const query = `
    query getActivityById($id: ID!) {
      activity(where: { id: $id }) {
        id
        title
        skills
        activityDate
        content {
          html
          markdown
          raw
        }
        thumbnail {
          url
        }
        activityImages {
          url
        }
        setUpTime
        themeName
        focusAge
        eventTimeline
        accordionOne
        bodyOne
        accordionTwo
        bodyTwo
        accordionThree
        bodyThree
        accordionFour
        bodyFour
        accordionFive
        bodyFive
        speechLanguage
        emotionalSocialStrength
        confidenceIndependence
        physicalAgility
        readingWriting
        discoveringOurWorld
        creativityImagination
        experimentsMath
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query, variables: { id } }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching activity: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.activity || null;
  } catch (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
};

/**
 * @ProductPage constructor
 */

export const getProducts = async () => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

  const query = `
    query {
      products {
        id
        title
        description {
          html  # Fetching HTML content of the description
          markdown
          raw
        }
        salePrice
        actualPrice
        thumbnail {
          url
        }
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      console.error("Response status:", res.status);
      console.error("Response error:", jsonData.errors);
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();

    return jsonData.data?.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

/**
 * @GetProductById
 */
// export const getProductById = async (id) => {
//   const HYGRAPH_ENDPOINT =
//     "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
//   const HYGRAPH_TOKEN =
//     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

//   const query = `
//     query GetProduct($id: ID!) {
//       products(where: { id: $id }) {
//         id
//         title
//         description {
//           html
//         }
//         salePrice
//         actualPrice
//         thumbnail {
//           url
//         }
//       }
//     }
//   `;

//   try {
//     const res = await fetch(HYGRAPH_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${HYGRAPH_TOKEN}`,
//       },
//       body: JSON.stringify({
//         query,
//         variables: { id },
//       }),
//     });

//     if (!res.ok) {
//       throw new Error(
//         `Error fetching product data from Hygraph: ${res.statusText}`
//       );
//     }

//     const jsonData = await res.json();
//     return jsonData.data?.product || null;
//   } catch (error) {
//     console.error("Error fetching product by ID:", error);
//     return null;
//   }
// };

export const getProductById = async (id) => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

  const query = `
    query {
      product(where: { id: "${id}" }) {
        id
        title
        description {
          html  
          markdown
          raw
        }
        salePrice
        actualPrice
        thumbnail {
          url
        }
        productImages {
          url
        }
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    const jsonData = await res.json();

    if (!res.ok) {
      console.error("Response status:", res.status);
      console.error("Response error:", jsonData.errors);
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    return jsonData.data?.product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

/**
 * @AccountTwo for managinmg the static Data over Kindi's Softwares
 */
export const getStandardPagesContent = async () => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1xqbluj0o3x07o6e5jsazrw/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjgyMjgwODYsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMXhxYmx1ajBvM3gwN282ZTVqc2F6cncvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI0OWJiOGMzOS0zY2NjLTQ5YmYtYTAwMi1hOGVkOGExMzVhNmIiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.t7bQOE5f3ArS3RVWH_22FHVJnHM32osQy-Jv7m3Z8l0dQ8FJT1lyXPgulhowCdJTDbjAqMtdTQ2FFg_BZycGwVUsM5-UqVC2uwBe8YSbedN4uD0jZ9QdSdNlDoH7jMtLVYr-WThhLmWBkpRyiVJxx0Wrrs2jL2JqHKXuakvAlfhdI09uri2HME5ANIF5nVCtrwexgym0PTCFC6oyJB4s7-_3NtfUxsc0NqU0F1epOnVi8iVWAQGyBaSjH2lXolzO-Gudg8z7_7n4zp7Kla1Wu2J-5c9_y_6NTIMQIzsPUOlmEUgXaBMcWCpXUBClCmSnIrwG6otvljlgsAmNrkS7pfgl6_DuQxUTZegJcvkso1GmOU6c46sYiIbIv5U_9g5_5PInd-4F88ab5606T8LuFXXYsiY9OwLLeEY3auxUF6CzOWUThq1HlJ34Tf2Ylz21DqL2lOSGeEQnrIGAdqQydwBtSSCBOQWyO0hEU_vE2-M6TOxkY4MbmDcou9FCF7EqphmBll3sMeGthWA8ZOM0tm_cMMCoX_QGaWLBoHUAoVfLnN0wOBfwdos_Dy0hLTKhSBxf3CfGtYCwAHBwfDA1J31a-XtXPAUtHqrklAnJi2L3XZHf6dXH8_VpPPDVOM4OIox-8Gbm5xZrbPSK0vLbZk8XPKOZzDypwV2p1fKAvmw";

  const query = `
    query {
      standardPages {
        id
        featuredVideo {  
          url 
        }
        updatedAt
        qualityControl {
          html  # Retrieve the HTML content
        }
        investing {
          html  # Retrieve the HTML content
        }
        termsConditions {
          html  # Retrieve the HTML content
        }
        privacyPolicy {
          html  # Retrieve the HTML content
        }
        refundPolicy {
          html  # Retrieve the HTML content
        }
      }
    }
  `;
  console.log("Fetching standard pages with query:", JSON.stringify({ query }));

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      console.error("Error fetching from Hygraph:", res.status, res.statusText);
      const errorResponse = await res.json();
      console.error("Response body:", errorResponse);
      return null;
    }

    const jsonData = await res.json();
    if (jsonData.errors) {
      console.error("GraphQL errors:", jsonData.errors);
      return null;
    }

    console.log("Fetched data:", jsonData);
    return jsonData.data?.standardPages[0] || null;
  } catch (error) {
    console.error("Error fetching standard pages:", error);
    return null;
  }
};

/**
 * @Static_Data_From_Second_Account
 */

export const getHomeData = async () => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1xqbluj0o3x07o6e5jsazrw/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjgyMjgwODYsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMXhxYmx1ajBvM3gwN282ZTVqc2F6cncvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI0OWJiOGMzOS0zY2NjLTQ5YmYtYTAwMi1hOGVkOGExMzVhNmIiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.t7bQOE5f3ArS3RVWH_22FHVJnHM32osQy-Jv7m3Z8l0dQ8FJT1lyXPgulhowCdJTDbjAqMtdTQ2FFg_BZycGwVUsM5-UqVC2uwBe8YSbedN4uD0jZ9QdSdNlDoH7jMtLVYr-WThhLmWBkpRyiVJxx0Wrrs2jL2JqHKXuakvAlfhdI09uri2HME5ANIF5nVCtrwexgym0PTCFC6oyJB4s7-_3NtfUxsc0NqU0F1epOnVi8iVWAQGyBaSjH2lXolzO-Gudg8z7_7n4zp7Kla1Wu2J-5c9_y_6NTIMQIzsPUOlmEUgXaBMcWCpXUBClCmSnIrwG6otvljlgsAmNrkS7pfgl6_DuQxUTZegJcvkso1GmOU6c46sYiIbIv5U_9g5_5PInd-4F88ab5606T8LuFXXYsiY9OwLLeEY3auxUF6CzOWUThq1HlJ34Tf2Ylz21DqL2lOSGeEQnrIGAdqQydwBtSSCBOQWyO0hEU_vE2-M6TOxkY4MbmDcou9FCF7EqphmBll3sMeGthWA8ZOM0tm_cMMCoX_QGaWLBoHUAoVfLnN0wOBfwdos_Dy0hLTKhSBxf3CfGtYCwAHBwfDA1J31a-XtXPAUtHqrklAnJi2L3XZHf6dXH8_VpPPDVOM4OIox-8Gbm5xZrbPSK0vLbZk8XPKOZzDypwV2p1fKAvmw";

  const query = `
    query {
      homePages {
        id
        hero
        childDevelopmentUnlocked
        earlyLearningExperts
        howItWorks
        howItWorksOne
        hiwOne{
          url
        }
        hiwTwo{
          url
        }
        hiwThree{
          url
        }
        howItWorksTwo
        howItWorksThree
        popularLearningActivities
        monthlyTheme
        ourPricing
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching home data: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.homePages || null; // Correctly accessing homePages here
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
};

export const getStoryData = async () => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1xqbluj0o3x07o6e5jsazrw/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjgyMjgwODYsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMXhxYmx1ajBvM3gwN282ZTVqc2F6cncvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI0OWJiOGMzOS0zY2NjLTQ5YmYtYTAwMi1hOGVkOGExMzVhNmIiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.t7bQOE5f3ArS3RVWH_22FHVJnHM32osQy-Jv7m3Z8l0dQ8FJT1lyXPgulhowCdJTDbjAqMtdTQ2FFg_BZycGwVUsM5-UqVC2uwBe8YSbedN4uD0jZ9QdSdNlDoH7jMtLVYr-WThhLmWBkpRyiVJxx0Wrrs2jL2JqHKXuakvAlfhdI09uri2HME5ANIF5nVCtrwexgym0PTCFC6oyJB4s7-_3NtfUxsc0NqU0F1epOnVi8iVWAQGyBaSjH2lXolzO-Gudg8z7_7n4zp7Kla1Wu2J-5c9_y_6NTIMQIzsPUOlmEUgXaBMcWCpXUBClCmSnIrwG6otvljlgsAmNrkS7pfgl6_DuQxUTZegJcvkso1GmOU6c46sYiIbIv5U_9g5_5PInd-4F88ab5606T8LuFXXYsiY9OwLLeEY3auxUF6CzOWUThq1HlJ34Tf2Ylz21DqL2lOSGeEQnrIGAdqQydwBtSSCBOQWyO0hEU_vE2-M6TOxkY4MbmDcou9FCF7EqphmBll3sMeGthWA8ZOM0tm_cMMCoX_QGaWLBoHUAoVfLnN0wOBfwdos_Dy0hLTKhSBxf3CfGtYCwAHBwfDA1J31a-XtXPAUtHqrklAnJi2L3XZHf6dXH8_VpPPDVOM4OIox-8Gbm5xZrbPSK0vLbZk8XPKOZzDypwV2p1fKAvmw";

  const query = `
    query {
      ourStories {
        id
        theKindiMission
        ourStory
        parentWithKindi
        aboutJanineHaenel
        aboutThomasDobinsom
        
      }
    }
  `;
  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching story data: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.ourStories || null; // Correctly accessing ourStories here
  } catch (error) {
    console.error("Error fetching story data:", error);
    return null;
  }
};

export const getHIWData = async () => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1xqbluj0o3x07o6e5jsazrw/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjgyMjgwODYsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMXhxYmx1ajBvM3gwN282ZTVqc2F6cncvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI0OWJiOGMzOS0zY2NjLTQ5YmYtYTAwMi1hOGVkOGExMzVhNmIiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.t7bQOE5f3ArS3RVWH_22FHVJnHM32osQy-Jv7m3Z8l0dQ8FJT1lyXPgulhowCdJTDbjAqMtdTQ2FFg_BZycGwVUsM5-UqVC2uwBe8YSbedN4uD0jZ9QdSdNlDoH7jMtLVYr-WThhLmWBkpRyiVJxx0Wrrs2jL2JqHKXuakvAlfhdI09uri2HME5ANIF5nVCtrwexgym0PTCFC6oyJB4s7-_3NtfUxsc0NqU0F1epOnVi8iVWAQGyBaSjH2lXolzO-Gudg8z7_7n4zp7Kla1Wu2J-5c9_y_6NTIMQIzsPUOlmEUgXaBMcWCpXUBClCmSnIrwG6otvljlgsAmNrkS7pfgl6_DuQxUTZegJcvkso1GmOU6c46sYiIbIv5U_9g5_5PInd-4F88ab5606T8LuFXXYsiY9OwLLeEY3auxUF6CzOWUThq1HlJ34Tf2Ylz21DqL2lOSGeEQnrIGAdqQydwBtSSCBOQWyO0hEU_vE2-M6TOxkY4MbmDcou9FCF7EqphmBll3sMeGthWA8ZOM0tm_cMMCoX_QGaWLBoHUAoVfLnN0wOBfwdos_Dy0hLTKhSBxf3CfGtYCwAHBwfDA1J31a-XtXPAUtHqrklAnJi2L3XZHf6dXH8_VpPPDVOM4OIox-8Gbm5xZrbPSK0vLbZk8XPKOZzDypwV2p1fKAvmw";

  const query = `
    query {
      howItWorks {
        id
        playForLife
        areasOfLearning
        skillsCategories
        ageRanges        
      }
    }
  `;
  try {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching story data: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.howItWorks || null; // Correctly accessing ourStories here
  } catch (error) {
    console.error("Error fetching story data:", error);
    return null;
  }
};

/**
 * @NextAuth_with_Hygraph
 */

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";
import { GraphQLClient, gql } from "graphql-request";

// Initialize GraphQL Client
export const hygraphClient = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    authorization: `Bearer ${HYGRAPH_TOKEN}`, // Add token if needed
  },
});

// Define GraphQL queries for account operations
export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($email: String!, $password: String!) {
    createAccount(data: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

export const GET_ACCOUNT_BY_EMAIL = gql`
  query GetAccount($email: String!) {
    account(where: { email: $email }) {
      id
      email
      password
    }
  }
`;
