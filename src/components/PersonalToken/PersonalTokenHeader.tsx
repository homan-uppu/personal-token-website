"use client";

import { formatNumber, springTransition } from "@/util";
import { PersonalToken } from "@/util/models";
import { Geist_Mono } from "next/font/google";
import { motion } from "framer-motion";

const geistMono = Geist_Mono({ subsets: ["latin"] });
import Image from "next/image";

interface PersonalTokenHeaderProps {
  token: PersonalToken;
  isOpen: boolean;
  isHovered?: boolean;
}

export const PersonalTokenHeader = ({
  token,
  isOpen,
  isHovered = false,
}: PersonalTokenHeaderProps) => {
  return (
    <motion.div
      layout="position"
      style={{
        ...mainTokenContainerStyles,
        padding: isOpen ? "0rem" : "1.5rem",
        marginBottom: isOpen ? "1.65rem" : 0,
      }}
      transition={springTransition}
    >
      <motion.div
        layout
        style={picNameContainerStyles}
        transition={springTransition}
      >
        <Image
          src={token.profilePicSrc}
          alt={`${token.name}'s profile picture`}
          width={50}
          height={50}
          style={{
            ...profilePicStyles,
            filter: isHovered || isOpen ? "none" : "grayscale(100%)",
          }}
        />

        <motion.div
          layout
          style={nameContainerStyles}
          transition={springTransition}
        >
          <motion.span layout style={nameStyles} transition={springTransition}>
            {token.name}
          </motion.span>
          <motion.span
            layout="position"
            className={geistMono.className}
            style={usernameStyles}
            transition={springTransition}
          >
            {token.username}
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div
        layout="position"
        className={geistMono.className}
        style={valuationStyles}
        transition={springTransition}
      >
        <div
          style={{
            ...valuationBadgeStyle,
            backgroundColor:
              isHovered || isOpen ? valuationBadgeStyle.background : "#F4F4F4",
            color: isHovered || isOpen ? "var(--logo-color)" : "#727272",
          }}
        >
          ${formatNumber(token.valuation)}
        </div>
      </motion.div>
    </motion.div>
  );
};

const mainTokenContainerStyles = {
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",

  width: "100%",
  padding: "1.5rem",
  justifyContent: "space-between",
  flexWrap: "wrap" as const,
  borderRadius: 24,
};

const picNameContainerStyles = {
  display: "flex",
  flexDirection: "row" as const,
  gap: "1rem",
};

const profilePicStyles = {
  borderRadius: "2px",
  objectFit: "cover" as const,
  transition: "all 0.3s ease",
};

const nameContainerStyles = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "0px",
  flex: 1,
  justifyContent: "center",
};

const nameStyles = {
  fontSize: "16px",
  color: "#111111",
};

const usernameStyles = {
  fontSize: "15px",
  fontWeight: 500,
  color: "#b2b2b2",
  marginTop: "-3px",
};

const valuationStyles = {
  fontSize: "15px",
  fontWeight: 480,
  color: "#00bf4c",
};

const valuationBadgeStyle = {
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.25rem 0.75rem",
  background: "var(--badge-bg)",
  borderRadius: "8px",
  width: "fit-content",
  transition: "all 0.3s ease",
};
