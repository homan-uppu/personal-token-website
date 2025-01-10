"use client";

import { motion } from "framer-motion";
import { ProfileSection } from "@/white-paper/Assets/PersonalToken/LineItem";
import {
  dummyPersonalToken,
  TokenType,
} from "@/white-paper/Assets/PersonalToken/models";
import styles from "./NetworkTokenScene.module.css";
import { formatNumber } from "@/util";
import { use, useEffect, useState } from "react";

const generateDummyTokens = () => {
  // Generate additional dummy tokens
  const tokens = [
    { name: "Amy", profilePic: "/images/amy.png", valuation: 2340000 },
    { name: "Jane", profilePic: "/images/jane.png", valuation: 567000 },
    { name: "Maya", profilePic: "/images/maya.png", valuation: 789000 },
    { name: "Sam", profilePic: "/images/sam.png", valuation: 345000 },
    { name: "Alex C", profilePic: "#FF6B6B", valuation: 23400 },
    { name: "Jordan S", profilePic: "#4ECDC4", valuation: 567000 },
    { name: "Taylor W", profilePic: "#45B7D1", valuation: 789000 },
    { name: "Morgan L", profilePic: "#96CEB4", valuation: 345000 },
    { name: "Casey B", profilePic: "#FFEEAD", valuation: 678000 },
    { name: "Riley P", profilePic: "#D4A5A5", valuation: 432000 },
    { name: "Quinn Z", profilePic: "#9B59B6", valuation: 1876000 },
    { name: "Devon P", profilePic: "#3498DB", valuation: 543000 },
    { name: "Avery S", profilePic: "#E74C3C", valuation: 654000 },
    { name: "Jamie L", profilePic: "#2ECC71", valuation: 789000 },
    { name: "Robin Z", profilePic: "#F1C40F", valuation: 34200 },
    { name: "Parker K", profilePic: "#E67E22", valuation: 567000 },
    { name: "Drew G", profilePic: "#1ABC9C", valuation: 345000 },
    { name: "Sage M", profilePic: "#8E44AD", valuation: 678000 },
    { name: "Reese J", profilePic: "#D35400", valuation: 1891000 },
    { name: "Blair W", profilePic: "#27AE60", valuation: 432000 },
    { name: "Skylar L", profilePic: "#2980B9", valuation: 567000 },
    { name: "Kai A", profilePic: "#C0392B", valuation: 789000 },
    { name: "River M", profilePic: "#16A085", valuation: 456000 },
    { name: "Eden T", profilePic: "#8E44AD", valuation: 28400 },
    { name: "Storm P", profilePic: "#7F8C8D", valuation: 543000 },
    { name: "Phoenix R", profilePic: "#34495E", valuation: 1876000 },
    { name: "Winter S", profilePic: "#95A5A6", valuation: 654000 },
    { name: "Ocean L", profilePic: "#BDC3C7", valuation: 432000 },
    { name: "Sky M", profilePic: "#7F8C8D", valuation: 789000 },
    { name: "Rain K", profilePic: "#2C3E50", valuation: 19500 },
    { name: "Brook T", profilePic: "#E74C3C", valuation: 345000 },
    { name: "Lake H", profilePic: "#3498DB", valuation: 678000 },
    { name: "River J", profilePic: "#2ECC71", valuation: 891000 },
    { name: "Wave M", profilePic: "#F1C40F", valuation: 432000 },
    { name: "Cloud P", profilePic: "#9B59B6", valuation: 567000 },
    { name: "Mist K", profilePic: "#1ABC9C", valuation: 789000 },
  ];

  // Shuffle array using Fisher-Yates algorithm
  for (let i = tokens.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
  }
  return tokens;
};

interface TokenData {
  name: string;
  profilePic: string;
  valuation: number;
}

interface PersonalTokenPillProps {
  profilePic: string;
  name: string;
  valuation: number;
}
const AnimatedValuation = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startValue = displayValue;
    const endValue = value;
    const duration = 1000; // 1 second animation
    const steps = 60; // 60 steps (for smooth 60fps animation)
    const stepDuration = duration / steps;
    const increment = (endValue - startValue) / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(endValue);
        clearInterval(timer);
      } else {
        setDisplayValue(startValue + increment * currentStep);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={styles.valuation}>
      ${formatNumber(Math.round(displayValue), true)}
    </span>
  );
};

const PersonalTokenPill = ({
  profilePic,
  name,
  valuation,
}: PersonalTokenPillProps) => {
  return (
    <div className={styles.personalTokenPill}>
      <ProfileSection
        profilePic={profilePic}
        name={name}
        type={TokenType.PersonalToken}
      />
      <AnimatedValuation value={valuation} />
    </div>
  );
};

const NetworkTokenScene = () => {
  const [tokens, setTokens] = useState<TokenData[]>(generateDummyTokens());
  const [networkTokenValuation, setNetworkTokenValuation] =
    useState<number>(120000000);
  const [isInView, setIsInView] = useState(false);

  const rows = 6;
  const tokensPerRow = 6;

  useEffect(() => {
    // Only run interval when scene is fully in view
    if (!isInView) return;

    const interval = setInterval(() => {
      // Generate 7 random increments between 50k and 700k
      const increments = Array(7)
        .fill(0)
        .map(() => Math.floor(Math.random() * (700000 - 50000) + 50000));

      // Update 7 random tokens with the increments
      setTokens((prevTokens) => {
        const newTokens = [...prevTokens];
        const tokenIndices = Array(7)
          .fill(0)
          .map(() => Math.floor(Math.random() * prevTokens.length));

        tokenIndices.forEach((index, i) => {
          newTokens[index] = {
            ...newTokens[index],
            valuation: newTokens[index].valuation + increments[i],
          };
        });

        return newTokens;
      });

      // Update network token with sum of increments
      setNetworkTokenValuation(
        (prev) => prev + increments.reduce((a, b) => a + b, 0)
      );
    }, 500);

    return () => clearInterval(interval);
  }, [isInView]);

  // Create array of tokens split into rows
  const tokenRows = [...Array(rows)].map((_, i) =>
    tokens.slice(i * tokensPerRow, (i + 1) * tokensPerRow)
  );

  return (
    <motion.div
      className={styles.sceneContainer}
      onViewportEnter={(entry: any) => {
        // Only set isInView to true if fully in viewport
        if (entry.intersectionRatio === 1) {
          setIsInView(true);
        }
      }}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ amount: 1 }} // Requires 100% visibility
    >
      {/* Fixed Network Token in center */}
      <div className={styles.networkTokenContainer}>
        <PersonalTokenPill
          profilePic="#000000"
          name="Network Token"
          valuation={networkTokenValuation}
        />
      </div>

      {/* Moving grid of personal tokens */}
      {tokenRows.map((rowTokens, rowIndex) => (
        <motion.div
          key={rowIndex}
          className={styles.tokenRow}
          animate={{
            x: [-900, -300], // Animate continuously to the left
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            x: -300, // Initial position
          }}
        >
          {/* Triple the row tokens for seamless loop */}
          {[...rowTokens, ...rowTokens, ...rowTokens].map(
            (token, tokenIndex) => (
              <PersonalTokenPill
                key={`${rowIndex}-${tokenIndex}`}
                profilePic={token.profilePic}
                name={token.name}
                valuation={token.valuation}
              />
            )
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NetworkTokenScene;
