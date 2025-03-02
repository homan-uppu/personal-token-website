"use client";

import { motion } from "framer-motion";
import { ProfileSection } from "@/white-paper/Assets/PersonalToken/LineItem";
import { dummyPersonalToken, TokenType } from "@/util/models";
import styles from "./NetworkTokenScene.module.css";
import { formatNumber } from "@/util";
import { useEffect, useState } from "react";

const generateDummyTokens = () => {
  // Generate additional dummy tokens
  const tokens = [
    { name: "Amy", profilePic: "/images/amy.png", valuation: 2340000 },
    { name: "Jane", profilePic: "/images/jane.png", valuation: 567000 },
    { name: "Maya", profilePic: "/images/maya.png", valuation: 789000 },
    { name: "Sam", profilePic: "/images/sam.png", valuation: 345000 },
    { name: "Alex", profilePic: "#FF6B6B", valuation: 23400 },
    { name: "Jordan", profilePic: "#4ECDC4", valuation: 567000 },
    { name: "Taylor", profilePic: "#45B7D1", valuation: 789000 },
    { name: "Morgan", profilePic: "#96CEB4", valuation: 345000 },
    { name: "Casey", profilePic: "#FFEEAD", valuation: 678000 },
    { name: "Riley", profilePic: "#D4A5A5", valuation: 432000 },
    { name: "Quinn", profilePic: "#9B59B6", valuation: 1876000 },
    { name: "Devon", profilePic: "#3498DB", valuation: 543000 },
    { name: "Avery", profilePic: "#E74C3C", valuation: 654000 },
    { name: "Jamie", profilePic: "#2ECC71", valuation: 789000 },
    { name: "Robin", profilePic: "#F1C40F", valuation: 34200 },
    { name: "Parker", profilePic: "#E67E22", valuation: 567000 },
    { name: "Drew", profilePic: "#1ABC9C", valuation: 345000 },
    { name: "Sage", profilePic: "#8E44AD", valuation: 678000 },
    { name: "Reese", profilePic: "#D35400", valuation: 1891000 },
    { name: "Blair", profilePic: "#27AE60", valuation: 432000 },
    { name: "Skylar", profilePic: "#2980B9", valuation: 567000 },
    { name: "Kai", profilePic: "#C0392B", valuation: 789000 },
    { name: "River", profilePic: "#16A085", valuation: 456000 },
    { name: "Eden", profilePic: "#8E44AD", valuation: 28400 },
    { name: "Storm", profilePic: "#7F8C8D", valuation: 543000 },
    { name: "Phoenix", profilePic: "#34495E", valuation: 1876000 },
    { name: "Winter", profilePic: "#95A5A6", valuation: 654000 },
    { name: "Ocean", profilePic: "#BDC3C7", valuation: 432000 },
    { name: "Sky", profilePic: "#7F8C8D", valuation: 789000 },
    { name: "Rain", profilePic: "#2C3E50", valuation: 19500 },
    { name: "Brook", profilePic: "#E74C3C", valuation: 345000 },
    { name: "Lake", profilePic: "#3498DB", valuation: 678000 },
    { name: "River", profilePic: "#2ECC71", valuation: 891000 },
    { name: "Wave", profilePic: "#F1C40F", valuation: 432000 },
    { name: "Cloud", profilePic: "#9B59B6", valuation: 567000 },
    { name: "Mist", profilePic: "#1ABC9C", valuation: 789000 },
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
  const [displayValue, setDisplayValue] = useState(0); // Initialize to 0 instead of value

  useEffect(() => {
    setDisplayValue(value); // Set initial value in useEffect
    let startValue = displayValue;
    const endValue = value;
    const duration = 1000;
    const steps = 60;
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
  const [mounted, setMounted] = useState(false);
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [networkTokenValuation, setNetworkTokenValuation] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const rows = 6;
  const tokensPerRow = 6;

  useEffect(() => {
    setMounted(true);
    setTokens(generateDummyTokens());
    setNetworkTokenValuation(120000000);
  }, []);

  useEffect(() => {
    if (!isInView || !mounted) return;

    const NUM_TO_UPDATE = 20;
    const DURATION_BETWEEN_UPDATES = 1500;

    const interval = setInterval(() => {
      const increments = Array(NUM_TO_UPDATE)
        .fill(0)
        .map(() => Math.floor(Math.random() * (700000 - 50000) + 50000));

      setTokens((prevTokens) => {
        const newTokens = [...prevTokens];
        const tokenIndices = Array(NUM_TO_UPDATE)
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

      setNetworkTokenValuation(
        (prev) => prev + increments.reduce((a, b) => a + b, 0)
      );
    }, DURATION_BETWEEN_UPDATES);

    return () => clearInterval(interval);
  }, [isInView, mounted]);

  const tokenRows = [...Array(rows)].map((_, i) =>
    tokens.slice(i * tokensPerRow, (i + 1) * tokensPerRow)
  );

  if (!mounted) return null;

  return (
    <motion.div
      className={styles.sceneContainer}
      onViewportEnter={(entry: any) => {
        if (entry.intersectionRatio === 1) {
          setIsInView(true);
        }
      }}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ amount: 1 }}
    >
      <div className={styles.networkTokenContainer}>
        <PersonalTokenPill
          profilePic="#000000"
          name="Network Token"
          valuation={networkTokenValuation}
        />
      </div>

      {tokenRows.map((rowTokens, rowIndex) => (
        <motion.div
          key={rowIndex}
          className={styles.tokenRow}
          animate={{
            x: [-900, -300],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            x: -300,
          }}
        >
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
