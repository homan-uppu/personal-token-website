"use client";

import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalToken, TokenType } from "../models";
import { LineItem } from "../LineItem";
import styles from "./Shareholder.module.css";

import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });

interface ShareholderProps {
  personalToken: PersonalToken;
  equity: number;
}

export const Shareholder: FC<ShareholderProps> = ({
  personalToken,
  equity,
}) => {
  const [showWalletValue, setShowWalletValue] = useState(false);
  const [prevWalletValue, setPrevWalletValue] = useState(
    personalToken.walletValue
  );

  useEffect(() => {
    if (personalToken.walletValue !== prevWalletValue) {
      setShowWalletValue(true);
      const timer = setTimeout(() => {
        setShowWalletValue(false);
      }, 3000); // Hide after 3 seconds

      setPrevWalletValue(personalToken.walletValue);
      return () => clearTimeout(timer);
    }
  }, [personalToken.walletValue, prevWalletValue]);

  return (
    <div className={styles.container}>
      <LineItem
        type={TokenType.PersonalToken}
        profilePic={personalToken.profilePicSrc}
        name={personalToken.name}
        equity={`${equity}%`}
        isSelectable
      />

      <AnimatePresence>
        {showWalletValue && personalToken.walletValue && (
          <motion.div
            className={`${styles.walletValue} ${geistMono.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ${personalToken.walletValue.toLocaleString()}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
