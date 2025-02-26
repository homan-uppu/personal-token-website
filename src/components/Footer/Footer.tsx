"use client";

import React, { useState } from "react";

import fileStyles from "./Footer.module.css";

const Footer: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className={fileStyles.footer}>
      <div style={styles.container}>
        <div style={styles.rightSection}>
          <a
            href="https://x.com/homan_u"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.link,
              ...(isHovered && styles.linkHover),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "rgba(0, 0, 0,0.25)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    transition: "color 0.2s ease",
  },
  linkHover: {
    color: "rgba(0, 0, 0, 0.7)",
  },
};

export default Footer;
