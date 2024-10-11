// components/ClaraFullWidth.jsx
import React from "react";

const ClaraFullWidth = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start  bg-light-white dark:bg-dark-grey-400 text-light-grey-100 dark:text-dark-grey-100">
      {children}
    </div>
  );
};

export default ClaraFullWidth;
