"use client";

import { FC, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalToken, TokenType } from "../models";
import { LineItem } from "../LineItem";
import styles from "./Shareholder.module.css";

import { Geist_Mono } from "next/font/google";
import { formatNumber } from "@/util";
const geistMono = Geist_Mono({ subsets: ["latin"] });

interface ShareholderProps {
  personalToken: PersonalToken;
  equity: number;
  showWallet?: boolean;
}

const DIFF_ANIMATION_DURATION = 1500;

export const Shareholder: FC<ShareholderProps> = ({
  personalToken,
  equity,
  showWallet,
}) => {
  return (
    <motion.div
      className={styles.container}
      layout // This enables layout animations for all children
    >
      <motion.div layout>
        <LineItem
          type={TokenType.PersonalToken}
          profilePic={personalToken.profilePicSrc}
          name={personalToken.name}
          equity={`${equity * 100}%`}
        />
      </motion.div>
      <AnimatePresence mode="popLayout">
        {showWallet && (
          <motion.div
            layout // Animate layout changes
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Wallet value={personalToken.walletValue} equity={equity} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
interface WalletProps {
  equity: number;
  value?: number;
}
const Wallet: FC<WalletProps> = ({ value, equity }) => {
  if (!value) return null;

  const [displayValue, setDisplayValue] = useState(value);
  const [showDiffLabel, setShowDiffLabel] = useState<{
    diff: string;
    calculation: string;
  } | null>(null);
  const prevValueRef = useRef(value);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const diffLabelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      const diff = value - prevValueRef.current;

      const duration = DIFF_ANIMATION_DURATION;
      const steps = 60;
      const increment = diff / steps;
      const stepDuration = duration / steps;

      // Clear any existing timeouts
      if (animationTimeoutRef.current) {
        clearInterval(animationTimeoutRef.current);
      }
      if (diffLabelTimeoutRef.current) {
        clearTimeout(diffLabelTimeoutRef.current);
      }

      // Set the diff label
      setShowDiffLabel({
        diff: `+$${formatNumber(diff)}`,
        calculation: `(${Math.round(equity * 100)}% of $${formatNumber(
          diff / equity,
          true
        )})`,
      });
      // Clear diff label after 1 second
      diffLabelTimeoutRef.current = setTimeout(() => {
        setShowDiffLabel(null);
      }, DIFF_ANIMATION_DURATION);

      let currentStep = 0;
      animationTimeoutRef.current = setInterval(() => {
        if (currentStep < steps) {
          setDisplayValue((prev) => prev + increment);
          currentStep++;
        } else {
          if (animationTimeoutRef.current) {
            clearInterval(animationTimeoutRef.current);
          }
          setDisplayValue(value);
        }
      }, stepDuration);

      prevValueRef.current = value;
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearInterval(animationTimeoutRef.current);
      }
      if (diffLabelTimeoutRef.current) {
        clearTimeout(diffLabelTimeoutRef.current);
      }
    };
  }, [value]);

  return (
    <div
      className={styles.wallet + " " + geistMono.className}
      style={{ position: "relative" }}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4 2.49429H11.7C12.418 2.49429 13 3.07632 13 3.79429V11.5943C13 12.3123 12.418 12.8943 11.7 12.8943H1.3C0.58203 12.8943 0 12.3123 0 11.5943H0.0173573C0.00581868 11.5244 0 11.4536 0 11.3826V3.63459C0 3.05416 0.38477 2.54406 0.942862 2.38461L8.74286 0.156036C9.43321 -0.0412057 10.1527 0.358534 10.35 1.04888C10.3832 1.16502 10.4 1.28523 10.4 1.40602V2.49429ZM10.4 3.79429V9.154C10.4 9.73442 10.0152 10.2445 9.45714 10.404L5.29104 11.5943H11.7V3.79429H10.4ZM1.3 3.63459V11.3826L9.1 9.154V1.40602L1.3 3.63459ZM10.4 6.39429V5.09429H11.7V6.39429H10.4ZM7.15 5.74429C6.79101 5.74429 6.5 5.45328 6.5 5.09429C6.5 4.73531 6.79101 4.44429 7.15 4.44429C7.50898 4.44429 7.8 4.73531 7.8 5.09429C7.8 5.45328 7.50898 5.74429 7.15 5.74429Z"
          fill="black"
          fillOpacity="0.3"
        />
      </svg>
      ${formatNumber(displayValue, true)}
      <AnimatePresence>
        {showDiffLabel && (
          <motion.div
            key={showDiffLabel.diff}
            style={{
              position: "absolute",
              left: "100%",
              top: "4px",
              transform: "translateY(-50%)",
              marginLeft: "16px",
              fontSize: 13,
              display: "flex",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
          >
            <span style={{ color: "var(--active-green)" }}>
              {showDiffLabel.diff}
            </span>
            <span style={{ color: "var(--text-color-light)" }}>
              {showDiffLabel.calculation}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
