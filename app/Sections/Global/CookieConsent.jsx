// components/CookieConsent.js
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import CookieConsent from "react-cookie-consent";

// export default function CustomCookieConsent() {
//   return (
//     <CookieConsent
//       location="bottom"
//       buttonText="Accept"
//       declineButtonText="Decline"
//       cookieName="your-site-cookie-consent"
//       style={{
//         background: "#2B373B",
//         color: "#fff",
//         fontSize: "14px",
//         padding: "10px 20px",
//       }}
//       buttonStyle={{
//         color: "#4e503b",
//         fontSize: "14px",
//         backgroundColor: "#f0b90b",
//         borderRadius: "5px",
//         padding: "8px 16px",
//       }}
//       declineButtonStyle={{
//         color: "#fff",
//         backgroundColor: "#444",
//         borderRadius: "5px",
//         padding: "8px 16px",
//       }}
//       enableDeclineButton
//       onAccept={() => {
//         console.log("Cookies Accepted!");
//       }}
//       onDecline={() => {
//         console.log("Cookies Declined!");
//       }}
//     >
//       This website uses cookies to enhance the user experience. By continuing,
//       you agree to our cookie policy.
//     </CookieConsent>
//   );
// }

export default function CookieConsentDialog() {
  const [open, setOpen] = useState(false); // Controls the main Dialog's visibility
  const [managePreferences, setManagePreferences] = useState(false); // Controls Manage Preferences dialog visibility

  useEffect(() => {
    // Show dialog only if cookie consent has not already been accepted
    const consent = document.cookie.includes("CookieConsent=true");
    if (!consent) {
      setOpen(true); // Show dialog if no cookie is set
    }
  }, []);

  const handleAccept = () => {
    document.cookie = "CookieConsent=true; path=/; max-age=31536000"; // Consent granted
    setOpen(false);

    // Initialize essential and non-essential cookies (e.g., Google Analytics)
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    document.cookie = "CookieConsent=false; path=/; max-age=31536000"; // No consent
    setOpen(false);

    // Disable analytics/tracking cookies
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
      });
    }
  };

  const handleSavePreferences = (preferences) => {
    // Save user preferences for specific cookies
    document.cookie = `CookiePreferences=${JSON.stringify(
      preferences
    )}; path=/; max-age=31536000`;
    setManagePreferences(false); // Close preferences dialog
    setOpen(false); // Close main dialog

    // Update tracking preferences based on user selection
    if (window.gtag) {
      window.gtag("consent", "update", preferences);
    }
  };

  return (
    <>
      {/* Main Cookie Consent Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg font-fredoka">
          <DialogHeader>
            <DialogTitle className="text-[24px] text-purple">
              We Value Your Privacy
            </DialogTitle>
          </DialogHeader>
          <div className="text-[12px] text-muted-foreground">
            This website uses cookies to enhance your experience. By continuing
            to browse the site, you agree to our use of cookies.
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={handleAccept} variant="success">
              Accept All
            </Button>
            <Button onClick={handleDecline} variant="destructive">
              Decline All
            </Button>
            <Button
              onClick={() => setManagePreferences(true)}
              variant="secondary"
            >
              Manage Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Preferences Dialog */}
      <Dialog open={managePreferences} onOpenChange={setManagePreferences}>
        <DialogContent className="sm:max-w-lg font-fredoka">
          <DialogHeader>
            <DialogTitle className="text-[24px] text-purple">
              Manage Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          <div className="text-[12px] text-muted-foreground">
            Select which types of cookies you&apos;d like to allow:
          </div>
          <div className="mt-2 font-fredoka space-y-2">
            <label className="flex items-center space-x-2">
              <input disabled type="checkbox" defaultChecked />
              <span>Essential Cookies (Required)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Analytics Cookies</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Marketing Cookies</span>
            </label>
          </div>
          <DialogFooter className="mt-4">
            <Button
              onClick={() =>
                handleSavePreferences({
                  ad_storage: "granted",
                  analytics_storage: "granted",
                })
              }
              variant="success"
            >
              Save Preferences
            </Button>
            <Button
              onClick={() => setManagePreferences(false)}
              variant="secondary"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
