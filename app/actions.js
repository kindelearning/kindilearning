// app/actions.js
"use server";

import webpush from "web-push";

webpush.setVapidDetails(
  "<mailto:hello@dravyafolio.me>",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

let subscription = null;

export async function subscribeUser(sub) {
  subscription = sub;
  // Store the subscription in a database in production
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // Remove the subscription from the database in production
  return { success: true };
}

export async function sendNotification(message) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
