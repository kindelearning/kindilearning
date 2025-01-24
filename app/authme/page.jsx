"use client";

import React from "react";

const Auth0LoginButton = () => {
  const handleAuth0Login = () => {
    window.location.href = `https://kindilearning.uk.auth0.com/authorize?client_id=vFOi1TfNm38IcEv2ahsdAkykbj4of8q4&response_type=code&redirect_uri=https://lionfish-app-98urn.ondigitalocean.app/api/connect/auth0/callback&scope=openid email profile`;
  };

  return (
    <button
      onClick={handleAuth0Login}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
    >
      Login with Auth0
    </button>
  );
};

export default Auth0LoginButton;
