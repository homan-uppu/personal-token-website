"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

type NavbarProps = {
  currentPage?: string;
};

const links = [
  { label: "docs", href: "/docs" },
  { label: "meta", href: "/meta" },
];

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  // Handler for logo hover state
  const [logoHovered, setLogoHovered] = React.useState(false);

  return (
    <nav style={navbarWrapperStyle}>
      {/* Fade overlay for content under navbar */}
      <div style={fadeOverlayStyle} />
      {/* Actual navbar content */}
      <div style={navbarStyle}>
        <div style={leftStyle}>
          <Link
            href="/"
            style={{
              ...logoContainerStyle,
              ...(logoHovered ? logoContainerHoverStyle : {}),
            }}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <Image
              src="/images/network-logo.png"
              alt="Logo"
              width={128}
              height={128}
              style={logoImageStyle}
              priority
            />
          </Link>
        </div>
        <div style={rightStyle}>
          {links.map((link) => {
            const isActive = currentPage === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  ...linkStyle,
                  ...(isActive ? linkActiveStyle : {}),
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.9)";
                  (e.currentTarget as HTMLElement).style.fontWeight = "500";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLElement).style.fontWeight = "400";
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

// --- Styles ---

// Wrapper for navbar and fade overlay
const navbarWrapperStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 100,
  pointerEvents: "none", // allow fade overlay to not block interactions
  // The navbar content will set pointerEvents: "auto"
};

// The fade overlay sits behind the navbar content
const fadeOverlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: 56, // match navbar height (see navbarStyle)
  pointerEvents: "none",
  background:
    "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.0) 100%)",
  zIndex: 0,
};

// The actual navbar content
const navbarStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 24px",
  boxSizing: "border-box",
  height: 56,
  pointerEvents: "auto", // allow interaction with navbar
  background: "transparent", // let fade overlay show
  zIndex: 1,
};

const leftStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const rightStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const linkStyle: React.CSSProperties = {
  color: "rgba(0,0,0,0.3)",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 400,
  transition: "color 0.15s, font-weight 0.15s",
  cursor: "pointer",
  padding: "2px 0",
};

const linkActiveStyle: React.CSSProperties = {
  color: "rgba(0,0,0,0.9)",
  fontWeight: 500,
};

// --- Logo Container Styles ---

const logoContainerStyle: React.CSSProperties = {
  padding: "0.25rem 0.25rem",
  borderRadius: "16px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  display: "inline-flex",
  alignItems: "center",
};

const logoContainerHoverStyle: React.CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.02)",
};

const logoImageStyle: React.CSSProperties = {
  display: "block",
  width: 24,
  height: 24,
};

export default Navbar;
