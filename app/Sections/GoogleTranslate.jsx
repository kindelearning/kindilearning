"use client"; // This directive is necessary for client components in Next.js


import { getPrefLangCookie } from "@/cookiee";
import Script from "next/script";
import React, { useEffect, useState } from "react";

// // Updated languages array with additional languages
// const languages = [
//   { label: "English ", value: "en", src: "https://flagcdn.com/h60/us.png" },
//   { label: "French", value: "fr", src: "https://flagcdn.com/h60/fr.png" },
//   { label: "German", value: "de", src: "https://flagcdn.com/h60/de.png" },
//   { label: "Italian", value: "it", src: "https://flagcdn.com/h60/it.png" },
//   { label: "Spanish", value: "es", src: "https://flagcdn.com/h60/es.png" },
// ];

// const includedLanguages = languages.map((lang) => lang.value).join(",");

// function googleTranslateElementInit() {
//   new window.google.translate.TranslateElement(
//     {
//       pageLanguage: "auto",
//       includedLanguages,
//     },
//     "google_translate_element"
//   );
// }

// function LanguageSelector({ onChange, value }) {
//   return (
//     <select
//       onChange={(e) => onChange(e.target.value)}
//       value={value}
//       className="border w-full rounded-full border-gray-300 flex justify-between  py-2 px-4 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple transition duration-200"
//     >
//       {languages.map((it) => (
//         <option value={it.value} key={it.value} className="mx-2">
//           {it.label}
//         </option>
//       ))}
//     </select>
//   );
// }

// export function GoogleTranslate() {
//   const [langCookie, setLangCookie] = useState(getPrefLangCookie());

//   useEffect(() => {
//     window.googleTranslateElementInit = googleTranslateElementInit;

//     // Move the iframe to the bottom after translation
//     const observer = new MutationObserver(() => {
//       const iframe = document.querySelector("iframe.skiptranslate");
//       if (iframe) {
//         // Style the iframe to move it to the bottom
//         iframe.style.position = "block"; // Fixed position
//         iframe.style.left = "0"; // Align to left
//         iframe.style.bottom = "0"; // Position at the bottom
//         iframe.style.width = "0"; // Full width
//         iframe.style.height = "0"; // Set height to 0
//         iframe.style.overflow = "flex"; // Hide overflow
//         iframe.style.zIndex = "-1"; // Send behind other elements
//       }
//     });

//     observer.observe(document.body, { childList: true, subtree: true });

//     return () => {
//       observer.disconnect(); // Clean up the observer
//     };
//   }, []);

//   const onChange = (value) => {
//     const element = document.querySelector(".goog-te-combo");
//     if (element) {
//       element.value = value;
//       element.dispatchEvent(new Event("change"));
//     }
//     setLangCookie(value); // Update the language state
//   };

//   return (
//     <div className="flex items-center space-x-0 w-full rounded-full font-fredoka clarabodyTwo">
//       <div
//         id="google_translate_element"
//         style={{ visibility: "hidden", width: "1px", height: "1px" }}
//       ></div>
//       <LanguageSelector onChange={onChange} value={langCookie} />
//       <Script
//         src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//         strategy="afterInteractive"
//       />
//     </div>
//   );
// }

// Updated languages array with additional languages




const languages = [
  { label: "English", value: "en", src: "https://flagcdn.com/h60/us.png" },
  { label: "French", value: "fr", src: "https://flagcdn.com/h60/fr.png" },
  { label: "German", value: "de", src: "https://flagcdn.com/h60/de.png" },
  { label: "Italian", value: "it", src: "https://flagcdn.com/h60/it.png" },
  { label: "Spanish", value: "es", src: "https://flagcdn.com/h60/es.png" },
];

const includedLanguages = languages.map((lang) => lang.value).join(",");

function googleTranslateElementInit() {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages,
      autoDisplay: false,
    },
    "google_translate_element"
  );
}

function LanguageSelector({ onChange, value }) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="border w-full rounded-full border-gray-300 flex justify-between py-2 lg:px-0 px-4 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple transition duration-200"
    >
      {languages.map((it) => (
        <option value={it.value} key={it.value}>
          {it.label}
        </option>
      ))}
    </select>
  );
}

export function GoogleTranslate() {
  const [langCookie, setLangCookie] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("preferredLanguage") || "en";
    }
    return "en";
  });

  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Mutation Observer to adjust iframe styling
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector("iframe.skiptranslate");
      const bannerFrame = document.querySelector(".goog-te-banner-frame");

      if (iframe) {
        iframe.style.position = "fixed";
        iframe.style.left = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0px";
        iframe.style.height = "0px";
        iframe.style.overflow = "hidden";
        iframe.style.zIndex = "-1";
      }

      // Move the Google Translate toolbar to the bottom
      if (bannerFrame) {
        bannerFrame.style.display = "none"; // Hide the default top bar
        const translateBar = document.querySelector(".goog-te-gadget");
        if (translateBar) {
          translateBar.style.position = "fixed";
          translateBar.style.bottom = "0";
          translateBar.style.left = "0";
          translateBar.style.width = "100%";
          translateBar.style.zIndex = "1000"; // Ensure it's on top of everything else
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const onChange = (value) => {
    const element = document.querySelector(".goog-te-combo");
    if (element) {
      element.value = value;
      element.dispatchEvent(new Event("change"));
    }
    localStorage.setItem("preferredLanguage", value);
    setLangCookie(value);
  };

  return (
    <div className="flex items-center  w-full rounded-full font-fredoka clarabodyTwo">
      <div
        id="google_translate_element"
        style={{ visibility: "hidden", width: "1px", height: "1px" }}
      />
      <LanguageSelector onChange={onChange} value={langCookie} />
      <script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}
