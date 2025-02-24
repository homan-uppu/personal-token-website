"use client";

import { PersonalToken } from "@/util/models";
import Image from "next/image";
import { Geist_Mono } from "next/font/google";
import { formatNumber } from "@/util";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TokenInfo } from "@/components/TokenInfo";

const geistMono = Geist_Mono({ subsets: ["latin"] });

interface PersonalTokenCompProps {
  token: PersonalToken;
}
const springTransition = {
  type: "spring",
  stiffness: 900,
  damping: 50,
};

export const PersonalTokenComp = ({ token }: PersonalTokenCompProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(-1);

  const isMobile = screenWidth < 640;

  useEffect(() => {
    // Set initial width after mount
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setIsHovered(false);
  };

  return (
    <>
      {isOpen && (
        <motion.div
          style={overlayStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleClose}
        />
      )}
      <motion.div
        style={{
          width: isOpen
            ? isMobile
              ? "calc(100vw - 2rem)"
              : 600
            : screenWidth < 500
            ? "100%"
            : 300,

          opacity: screenWidth < 0 ? 0 : 1,
          ...containerStyles,
          ...(isOpen && {
            ...(isMobile
              ? {
                  top: "1rem",
                  left: "1rem",
                }
              : {
                  top: "10vh",
                  left: "calc(50vw - 300px)",
                }),
            ...openStyles,
            padding: isMobile ? "1.5rem" : "3rem",
          }),
          ...(isHovered &&
            !isOpen && {
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.16)",
            }),
        }}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        layoutId="personalToken"
        initial={{
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
          opacity: 0,
        }}
        animate={{
          opacity: screenWidth < 0 ? 0 : 1,
        }}
        transition={springTransition}
      >
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
              style={profilePicStyles}
            />

            <motion.div
              layout
              style={nameContainerStyles}
              transition={springTransition}
            >
              <motion.span
                layout
                style={nameStyles}
                transition={springTransition}
              >
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
            <div style={valuationBadgeStyle}>
              ${formatNumber(token.valuation)}
            </div>
          </motion.div>
        </motion.div>

        {isOpen && (
          <motion.div
            layout="position"
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(0, 0, 0, 0.03)",
            }}
            transition={springTransition}
          />
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={tokenInfoContainerStyles}
            transition={{ duration: 0.15 }}
          >
            <TokenInfo personalToken={token} isMobile={screenWidth < 600} />
          </motion.div>
        )}
      </motion.div>
      {isOpen && isMobile && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          style={closeButtonStyles}
        >
          Close
        </motion.button>
      )}
    </>
  );
};

const containerStyles = {
  display: "flex",
  margin: "auto",
  flexDirection: "column" as const,
  zIndex: 10,
  borderRadius: "24px",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  backgroundColor: "rgba(255, 255, 255, 0.6)",

  border: "1px solid rgba(0, 0, 0, 0.05)",
  transition: "border 0.3s ease, border-radius 0.3s ease, box-shadow 0.3s ease",

  position: "relative" as const,
  justifyContent: "space-between",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  flexWrap: "wrap" as const,
  overflow: "hidden" as const,
  gap: 0,
  // transition: "border-radius 0.3s ease, box-shadow 0.3s ease",
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

const openStyles = {
  position: "fixed" as const,
  zIndex: 100,
  cursor: "default",
  border: "5px solid rgba(0, 0, 0, 0.025)",
  // boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
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
  fontSize: "15px",
  fontWeight: 500,
  color: "#b2b2b2",
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
  background: "rgba(0, 191, 76, 0.1)",
  borderRadius: "8px",
  width: "fit-content",
};

const tokenInfoContainerStyles = {
  width: "100%",
  paddingTop: "1.5rem",
};
const closeButtonStyles = {
  position: "fixed" as const,
  bottom: "1rem",
  right: "1rem",
  padding: "1rem 1.5rem",
  borderRadius: "16px",
  border: "none",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 500,
  color: "#111111",
  zIndex: 999999, // Ensure it's above everything
  transform: "translateY(0)", // Ensure it stays at bottom of viewport
  width: "calc(100% - 2rem)",
};
