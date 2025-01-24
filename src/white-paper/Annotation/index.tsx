"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Annotation.module.css";
import { springAnimTransition } from "../SideMenu";

interface AnnotationProps {
  children: ReactNode;
}

export default function Annotation({ children }: AnnotationProps) {
  const markerRef = useRef<HTMLSpanElement>(null);
  const [leftPosition, setLeftPosition] = useState(-1);
  const [isOffscreen, setIsOffscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      if (markerRef.current) {
        const rect =
          markerRef.current?.parentElement?.parentElement?.getBoundingClientRect();
        const rightPosition = (rect?.right || 0) + 224; // 200px width + 24px margin
        setIsOffscreen(rightPosition > window.innerWidth);
        setLeftPosition(rect?.right || 0);
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const AnnotationMarker = ({ onClick }: { onClick: () => void }) => (
    <motion.span
      ref={markerRef}
      className={styles.annotationMarker}
      onClick={onClick}
      layout
      transition={springAnimTransition}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      <span
        style={{
          lineHeight: 1,
          display: "inline-block",
          transform: "translateY(2px)",
        }}
      >
        *
      </span>
      {isVisible && <span style={{ fontSize: "0.75rem" }}>hide</span>}
    </motion.span>
  );

  const AnnotationContent = ({
    children,
    isInline,
    style,
    animate,
  }: {
    children: ReactNode;
    isInline?: boolean;
    style?: React.CSSProperties;
    animate?: any;
  }) => {
    return (
      <motion.span
        className={`${styles.annotationContent} ${
          isInline ? styles.annotationContentInline : ""
        }`}
        style={style}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          ...(animate || {}),
        }}
        transition={springAnimTransition}
      >
        * {children}
      </motion.span>
    );
  };

  return (
    <span>
      <AnnotationMarker
        onClick={() => isOffscreen && setIsVisible(!isVisible)}
      />
      {isOffscreen ? (
        isVisible && (
          <AnnotationContent
            isInline
            style={{ position: "relative", marginTop: "0.25rem" }}
          >
            {children}
          </AnnotationContent>
        )
      ) : (
        <AnnotationContent
          animate={{
            left: leftPosition > 0 ? `calc(${leftPosition}px + 24px)` : -1000,
          }}
        >
          {children}
        </AnnotationContent>
      )}
    </span>
  );
}
