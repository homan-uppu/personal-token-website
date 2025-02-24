"use client";

import { PersonalToken } from "@/util/models";
import Image from "next/image";
import { Geist_Mono } from "next/font/google";
import { formatNumber } from "@/util";
import { motion } from "framer-motion";
import { useState } from "react";
import { TokenInfo } from "@/components/TokenInfo";

const geistMono = Geist_Mono({ subsets: ["latin"] });

interface PersonalTokenCompProps {
  token: PersonalToken;
}
export const PersonalTokenComp = ({ token }: PersonalTokenCompProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {isOpen && (
        <motion.div
          style={overlayStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setIsOpen(false);
            setIsHovered(false);
          }}
        />
      )}
      <motion.div
        style={{
          ...containerStyles,
          ...(isOpen && openStyles),
          ...(isHovered &&
            !isOpen && {
              borderRadius: 16,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.16)",
            }),
        }}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        layoutId="personalToken"
        initial={{
          borderRadius: 24,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <motion.div
          layout="position"
          style={{
            ...mainTokenContainerStyles,
            padding: isOpen ? "3rem" : "1.5rem",
          }}
        >
          <motion.div layout="position" style={picNameContainerStyles}>
            <motion.div layout="position">
              <Image
                src={token.profilePicSrc}
                alt={`${token.name}'s profile picture`}
                width={50}
                height={50}
                style={profilePicStyles}
              />
            </motion.div>

            <motion.div layout="position" style={nameContainerStyles}>
              <motion.span layout="position" style={nameStyles}>
                {token.name}
              </motion.span>
              <motion.span
                layout="position"
                className={geistMono.className}
                style={usernameStyles}
              >
                {token.username}
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            layout="position"
            className={geistMono.className}
            style={valuationStyles}
          >
            ${formatNumber(token.valuation)}
          </motion.div>
        </motion.div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={tokenInfoContainerStyles}
          >
            <TokenInfo personalToken={token} />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

const containerStyles = {
  display: "flex",
  flexDirection: "column" as const,
  zIndex: 10,
  borderRadius: "24px",
  border: "var(--border)",
  background: "var(--layer1-bg-color)",
  position: "relative" as const,
  justifyContent: "space-between",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  flexWrap: "wrap" as const,
  overflow: "hidden" as const,
  gap: 0,
  transition: "border-radius 0.3s ease, box-shadow 0.3s ease",
};

const mainTokenContainerStyles = {
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",
  background: "white",
  width: "100%",
  padding: "24px",
  justifyContent: "space-between",
  flexWrap: "wrap" as const,
};
const openStyles = {
  position: "fixed" as const,
  top: "10vh",
  left: "calc(50vw - 300px)",
  zIndex: 100,
  width: 600,
  cursor: "default",
  boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
};

const overlayStyles = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(1.3px)",
  WebkitBackdropFilter: "blur(1.3px)",
  zIndex: 50,
};

const picNameContainerStyles = {
  display: "flex",
  flexDirection: "row" as const,
  gap: "1rem",
};

const profilePicStyles = {
  borderRadius: "2px",
  objectFit: "cover" as const,
};

const nameContainerStyles = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "0px",
  flex: 1,
};

const nameStyles = {
  fontSize: "16px",
  color: "#111111",
};

const usernameStyles = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#b2b2b2",
};

const valuationStyles = {
  fontSize: "16px",
  color: "#00bf4c",
};

const tokenInfoContainerStyles = {
  width: "100%",
};
