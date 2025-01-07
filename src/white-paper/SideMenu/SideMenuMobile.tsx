"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconButton from "@/components/IconButton";
import { springAnimTransition, useSticky, useActiveHeader } from "./";
import { TableOfContents } from "./TableOfContents";

type SideMenuMobileProps = {
  sections: string[][];
};

export default function SideMenuMobile({ sections }: SideMenuMobileProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSticky = useSticky();
  const activeId = useActiveHeader(sections);

  if (!isSticky) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 100,
        }}
      >
        {isExpanded && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.1)",
              zIndex: -1,
            }}
            onClick={() => setIsExpanded(false)}
          />
        )}
        <AnimatePresence>
          <motion.div
            animate={{ right: isExpanded ? "0px" : "-80vw" }}
            transition={springAnimTransition}
            onAnimationStart={() => {
              if (isExpanded && activeId) {
                const activeElement = document.getElementById(
                  `toc-${activeId}`
                );
                activeElement?.scrollIntoView({
                  block: "center",
                  behavior: "smooth",
                });
              }
            }}
            style={{
              position: "absolute",
              bottom: "100%",
              right: "-80vw",
              width: "70vw",
              marginBottom: "16px",
              background: "var(--layer1-bg-color)",
              borderRadius: "16px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TableOfContents
              sections={sections}
              activeId={activeId}
              onSelect={() => setIsExpanded(false)}
            />
          </motion.div>
        </AnimatePresence>

        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM4 16C3.44772 16 3 16.4477 3 17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H4Z"
                fill="currentColor"
              />
            </svg>
          )}
        </IconButton>
      </div>
    </AnimatePresence>
  );
}
