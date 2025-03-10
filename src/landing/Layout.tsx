"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const Row = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 800;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100%",
        borderTop: "1px solid rgba(0, 0, 0, 0.035)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(-1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Initial call to set the correct width
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth;
};
export const Block = ({
  children,
  width,
  height,
  borderRight,
  gap,
  style,
  centered,
  noPadding,
  background = "#FDFDFD",
  lighting,
  alignItemsMobile = "start",
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  borderRight?: boolean;
  gap?: string;
  centered?: boolean;
  noPadding?: boolean;
  background?: string;
  lighting?: boolean;
  alignItemsMobile?: "center" | "start";
  style?: React.CSSProperties;
}) => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 800;

  console.log("screenWidth: ", screenWidth);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: isMobile ? "100%" : width || "50%",
        height: height || (isMobile ? "400px" : "400px"),
        gap: gap || "0.5rem",
        borderRight:
          !isMobile && borderRight ? "1px dashed rgba(0, 0, 0, 0.035)" : "none",
        borderBottom:
          isMobile && borderRight ? "1px dashed rgba(0, 0, 0, 0.035)" : "none",
        alignItems: isMobile ? alignItemsMobile : centered ? "center" : "start",
        padding: noPadding ? "0rem" : isMobile ? "1.5rem" : "3rem",
        background,
        backgroundImage: lighting
          ? "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
          : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const LandingImage = ({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        maxWidth: "250px",
        overflow: "hidden",
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </div>
  );
};

export const SubHeader = ({
  children,
  isPrimary = false,
  style,
}: {
  children: React.ReactNode;
  isPrimary?: boolean;
  style?: React.CSSProperties;
}) => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 800;

  return (
    <div
      style={{
        fontWeight: 460,
        color: isPrimary ? "rgba(0, 0, 0, 0.9)" : "rgb(143, 153, 168)",
        fontSize: isMobile ? "20px" : "24px",
        lineHeight: isMobile ? "28px" : "32px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Primary = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <span
      style={{
        color: "rgba(0, 0, 0, 0.9)",
        fontWeight: 460,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export const GreenSpan = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <span
      style={{
        color: "var(--logo-green)",
        fontWeight: 460,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export const Body = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <span
      style={{
        fontSize: "1rem",
        color: "rgba(0, 0, 0, 0.5)",
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
