// components/Div.js
import React from "react";
import Container from "../KindiComponent/Container";

// Div component
const Div = ({
  width = "w-full",
  height = "h-auto",
  display = "flex",
  flexDirection = "flex-row",
  flexWrap = "flex-nowrap",
  gridColumns = "",
  gridRows = "",
  gap = "gap-0",
  backgroundColor = "bg-transparent",
  backgroundImage = "",
  gradientBackground = "",
  backgroundOverlay = "",
  borderStyle = "border-solid",
  borderColor = "border-transparent",
  borderWidth = "border-0",
  borderRadius = "rounded-none",
  padding = "p-0",
  margin = "m-0",
//   verticalAlign = 'items-center',  // Centering vertically
//   horizontalAlign = 'justify-center', // Centering horizontally
  alignItems = "items-center", // Center content vertically by default
  justifyContent = "justify-center", // Center content horizontally by default
  customCSS = "",
  cssID = "",
  cssClass = "",
  visibility = "visible",
  attributes = {},
  children
}) => {
  // Determine the display settings based on flex/grid
  const displaySettings =
    display === "grid"
      ? `grid ${gridColumns} ${gridRows}`
      : `flex ${flexDirection} ${flexWrap}`;

  // Combine all classes
  const classNames = [
    width,
    height,
    displaySettings,
    gap,
    backgroundColor,
    backgroundImage,
    gradientBackground,
    backgroundOverlay,
    borderStyle,
    borderColor,
    borderWidth,
    borderRadius,
    padding,
    margin,
    alignItems,
    justifyContent,
    customCSS,
    cssID,
    cssClass,
    visibility,
  ].join(" ");

  return (
    <Container
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      borderStyle={borderStyle}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      gradientBackground={gradientBackground}
      backgroundOverlay={backgroundOverlay}
      boxShadow="shadow-none" // Assuming no shadow for this example
      typography="" // Assuming no typography settings for this example
      customCSS={customCSS}
      cssID={cssID}
      cssClass={cssClass}
      visibility={visibility}
      {...attributes}
      className={classNames}
    >
      {children}
    </Container>
  );
};

export default Div;
