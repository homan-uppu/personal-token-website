"use client";

import { Geist_Mono } from "next/font/google";
import { useState } from "react";

const geistMono = Geist_Mono({ subsets: ["latin"] });

interface ListItemProps {
  picSrc: string;
  labelMain: string;
  labelSecondary?: string;
  rightLabel: string;
}

// Dictionary for company-specific image scaling
const companyImageScaling: Record<string, number> = {
  microsoft: 0.8,
  apple: 0.9,
};

export const ListItem = ({
  picSrc,
  labelMain,
  labelSecondary,
  rightLabel,
}: ListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if we need to scale the image based on the picSrc
  const getImageScale = () => {
    for (const [company, scale] of Object.entries(companyImageScaling)) {
      if (picSrc.toLowerCase().includes(company)) {
        return scale;
      }
    }
    return 1; // Default scale if no match
  };

  const imageScale = getImageScale();

  // Determine if we need to add a green stroke (only if labelSecondary === "PT")
  const showGreenStroke = labelSecondary === "PT";

  return (
    <div
      style={{
        ...styles.container,
        ...(isHovered && styles.containerHovered),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.leftSide}>
        <div
          style={{
            ...styles.imageContainer,
            ...(showGreenStroke ? styles.greenStroke : {}),
          }}
        >
          <img
            src={picSrc}
            style={{
              ...styles.profilePic,
              transform: `scale(${imageScale})`,
              filter: isHovered ? "none" : "grayscale(100%)",
            }}
          />
        </div>
        <div style={styles.nameContainer}>
          <div style={styles.name}>{labelMain}</div>
          {/* No secondary label text anymore */}
        </div>
      </div>
      <div style={styles.line} />
      <div className={geistMono.className} style={styles.rightLabel}>
        {rightLabel}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    width: "calc(100% + 2rem)",
    marginLeft: "-1rem",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  containerHovered: {
    backgroundColor: "rgba(0, 0, 0, 0.025)",
  },
  leftSide: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  imageContainer: {
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box" as const,
  },
  greenStroke: {
    border: "1.5px solid var(--logo-green)",
    borderRadius: "50%",
  },
  profilePic: {
    width: "23px",
    height: "23px",
    borderRadius: "50%",
    objectFit: "cover" as const,
    filter: "grayscale(100%)",
    transition: "all 0.3s ease",
    display: "block",
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: "0.5rem",
  },
  name: {
    fontSize: "1rem",
    fontWeight: 420,
  },
  line: {
    flex: 1,
    height: "1px",
    background: "rgba(0, 0, 0, 0.03)",
  },
  rightLabel: {
    fontSize: "15px",
    color: "rgba(0, 0, 0, 0.45)",
  },
};
