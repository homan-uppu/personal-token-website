"use client";

import React, { useState } from "react";

import fileStyles from "./Footer.module.css";
import { CONSTANTS } from "@/util";

const FooterLink: React.FC<{
  url: string;
  label: string;
  external?: boolean;
}> = ({ url, label, external = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        ...styles.link,
        ...(isHovered && styles.linkHover),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className={fileStyles.footer}>
      <div style={styles.container}>
        <div style={styles.linksSection}>
          <FooterLink url="/how" label="How it works" />
          <FooterLink url="/why" label="Why" />
          <FooterLink url="/contribute" label="Contribute" />
          <FooterLink
            label="Join waitlist"
            url={CONSTANTS.waitlistUrl}
            external
          />
          <FooterLink url="https://x.com/homan_u" label="Contact" external />
        </div>
      </div>
    </footer>
  );
};

const styles = {
  container: {
    margin: "0 auto",
    padding: "0 0px",
    display: "flex",
    justifyContent: "flex-start",
    paddingBottom: "6rem",
    paddingTop: "3rem",
  },
  linksSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "1rem",
  },
  link: {
    color: "rgba(0, 0, 0,0.25)",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
    transition: "color 0.2s ease",
  },
  linkHover: {
    color: "rgba(0, 0, 0, 0.7)",
  },
};

export default Footer;
