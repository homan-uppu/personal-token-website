"use client";

import { CONSTANTS } from "@/util";
import { DottedGrid } from "./Backgrounds/DottedGrid/DottedGrid";
import { Primary, SubHeader, useScreenWidth } from "./Layout";

export const WaitlistBlock = () => {
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
      onClick={handleClick}
    >
      <div
        style={{
          ...contentContainerStyle,
          padding: isMobile ? "6rem 1.5rem" : "6rem 3rem",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.025)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.015)")
        }
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
  cursor: "pointer",
  borderRadius: "12px",
  position: "relative" as const,
  overflow: "hidden",
  padding: "3rem",
};

const contentContainerStyle = {
  width: "100%",
  display: "flex",
  backgroundColor: "rgba(0, 0, 0, 0.015)",
  border: "1px solid rgba(0, 0, 0, 0.025)",
  borderRadius: 16,
  justifyContent: "center",
  alignItems: "center",
  padding: "6rem 3rem",
  position: "relative" as const,
  zIndex: 2,
  transition: "background-color 0.3s ease",
};
