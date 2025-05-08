"use client";

import React, { useState } from "react";

import fileStyles from "./Footer.module.css";
import { CONSTANTS } from "@/util";
import { useScreenWidth } from "@/landing/Layout";

const FooterLink: React.FC<{
  url: string;
  label: string;
  external?: boolean;
}> = ({ url, label, external = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const screenWidth = useScreenWidth();

  return (
    <a
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${fileStyles.link} ${isHovered ? fileStyles.link : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </a>
  );
};
const Footer: React.FC<{
  marginTop?: string | number;
  marginBottom?: string | number;
  padding?: string | number;
  border?: string;
}> = ({ marginTop, marginBottom, padding, border }) => {
  return (
    <footer
      className={fileStyles.footer}
      style={{ marginTop, marginBottom, padding, border }}
    >
      <div className={fileStyles.container}>
        <div className={fileStyles.linksSection}>
          <FooterLink
            url="https://x.com/homanafterall"
            label="Contact"
            external
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
