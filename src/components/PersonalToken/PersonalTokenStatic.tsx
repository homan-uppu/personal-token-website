"use client";

import { PersonalToken } from "@/util/models";
import { dummyPersonalToken } from "@/util/models";
import { PersonalTokenHeader } from "./PersonalTokenHeader";
import { TokenInfo } from "@/components/TokenInfo";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const PersonalTokenStatic = () => {
  const token: PersonalToken = dummyPersonalToken;

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

  if (screenWidth < 0) {
    return <div style={{ height: "400px" }}></div>;
  }

  return (
    <motion.div
      style={containerStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PersonalTokenHeader token={token} isOpen={true} />

      <div style={dividerStyles} />

      {/* <div style={{ marginBottom: "0rem", marginTop: "1.5rem" }}>
        Independent nuclear fusion researcher focusing on small-scale tokamak
        reactor designs.
      </div> */}

      <div style={tokenInfoContainerStyles}>
        <TokenInfo personalToken={token} isMobile={isMobile} />
      </div>
    </motion.div>
  );
};

const containerStyles = {
  display: "flex",
  margin: "auto",
  flexDirection: "column" as const,
  width: "100%",
  borderRadius: "24px",
  //   backdropFilter: "blur(8px)",
  //   WebkitBackdropFilter: "blur(8px)",
  //   backgroundColor: "rgba(255, 255, 255, 0.6)",
  border: "1px solid rgba(0, 0, 0, 0.025)",
  padding: "3rem",
  position: "relative" as const,
  justifyContent: "space-between",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
  overflow: "hidden" as const,
  gap: 0,
};

const dividerStyles = {
  width: "100%",
  height: "1px",
  backgroundColor: "rgba(0, 0, 0, 0.03)",
};

const tokenInfoContainerStyles = {
  width: "100%",
  paddingTop: "1.45rem",
};
