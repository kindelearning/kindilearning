"use client";


// components/PWAPrompt.js

import { useEffect, useState } from 'react';

const PWAPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the mini info bar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(event);
      // Show the prompt
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt(); // Show the install prompt
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
      setShowPrompt(false); // Hide the prompt after user interaction
    }
  };

  return (
    showPrompt && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Install Our App</h2>
          <p className="mb-4">For a better experience, install our app on your device.</p>
          <button
            onClick={handleInstallClick}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-500"
          >
            Install App
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="mt-2 text-gray-600 hover:text-gray-800"
          >
            Dismiss
          </button>
        </div>
      </div>
    )
  );
};

export default PWAPrompt;
