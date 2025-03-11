"use client";

import { CONSTANTS } from "@/util";
import { Primary, SubHeader, useScreenWidth } from "./Layout";
import { useState } from "react";

export const WaitlistBlock = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(CONSTANTS.waitlistUrl, "_blank");
  };

  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 800;

  return (
    <div
      style={{
        ...waitlistBlockStyle,
        padding: isMobile ? "1.5rem" : "3rem",
      }}
    >
      <div
        style={{
          ...backgroundImageStyle,
          opacity: isHovered ? 0.4 : 0.2,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            ...gradientOverlayStyle,
            opacity: isHovered ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        ></div>
      </div>
      <div
        style={{
          ...contentContainerStyle,
          padding: isMobile ? "6rem 1.5rem" : "6rem 3rem",
          backgroundColor: isHovered
            ? "rgba(256, 256, 256, 0.45)"
            : "rgba(256, 256, 256, 0.25)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <SubHeader>
          <Primary>Join the waitlist.</Primary>
        </SubHeader>
      </div>
    </div>
  );
};

// Styles for waitlist block
const waitlistBlockStyle = {
  width: "100%",
  position: "relative" as const,
  overflow: "hidden",
  padding: "3rem",
  zIndex: 1,
};

const backgroundImageStyle = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/images/waitlist.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 0.2,
  zIndex: 1,
  transition: "opacity 0.3s ease",
};

const gradientOverlayStyle = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `
    linear-gradient(to top, rgba(253, 253, 253, 0.1) 0%, rgba(253, 253, 253, 0) 15%),
    linear-gradient(to bottom, rgba(253, 253, 253, 0.1) 0%, rgba(253, 253, 253, 0) 15%),
    linear-gradient(to left, rgba(253, 253, 253, 0.1) 0%, rgba(253, 253, 253, 0) 15%),
    linear-gradient(to right, rgba(253, 253, 253, 0.1) 0%, rgba(253, 253, 253, 0) 15%)
  `,
  zIndex: 2,
  transition: "opacity 0.3s ease",
};

const contentContainerStyle = {
  width: "100%",
  cursor: "pointer",
  display: "flex",
  backgroundColor: "rgba(256, 256, 256, 0.45)",
  border: "1px solid rgba(0, 0, 0, 0.025)",
  borderRadius: 0,
  justifyContent: "center",
  alignItems: "center",
  padding: "6rem 3rem",
  position: "relative" as const,
  zIndex: 2,
  transition: "background-color 0.3s ease",
};
