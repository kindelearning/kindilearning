export const getPrefLangCookie = () => {
    // If this is running on the server, return 'en' as default
    if (typeof window === "undefined") return "en";
  
    const match = document.cookie.match(/(^|;)\s*googtrans=([^;]+)/);
    return match ? decodeURIComponent(match[2]) : "en"; // Decode the cookie value or return 'en'
  };
  