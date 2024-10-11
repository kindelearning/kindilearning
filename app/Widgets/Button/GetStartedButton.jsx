import React from "react";

const GetStartedButton = ({
  bgColor = "bg-light-purple-200 dark:bg-dark-blue-100",
  textColor = "text-light-white dark:text-dark-blue-200",
  fontSize = "sm",
  fontWeight = "semibold",
  fontFamily = "montserrat",
  paddingX = "8",
  paddingY = "4",
  borderRadius = "full",
  borderColor = "light-blue-200 dark:border-dark-blue-200",
  link = "#",
  buttonText = "Get Started",
}) => {
  return (
    <a href={link}>
      <button
        className={`${bgColor} ${textColor} text-${fontSize} font-${fontWeight} font-${fontFamily} px-${paddingX} py-${paddingY} rounded-${borderRadius} border border-${borderColor}`}
      >
        {buttonText}
      </button>
    </a>
  );
};

export default GetStartedButton;
