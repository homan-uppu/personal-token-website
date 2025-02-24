"use client";

import { FC, useEffect, useState } from "react";
import { LineItem, LineItemProps } from "./LineItem";
import {
  PersonalToken,
  TokenType,
  Asset,
  dummyPersonalToken,
} from "@/util/models";
import styles from "./PersonalToken.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Geist_Mono } from "next/font/google";
import { Shareholder } from "./Shareholder";
const geistMono = Geist_Mono({ subsets: ["latin"] });

const animationConfig = {
  initial: { scale: 1, opacity: 1, x: 0 },
  exit: {
    scale: 0.8,
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

const flingAnimation = {
  initial: { scale: 1, opacity: 1, x: 0 },
  animate: {
    scale: 0.8,
    opacity: 0,
    x: 500,
    transition: {
      duration: 0.25,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

export const SectionHeader: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.span
      layout="position"
      className={styles.sectionHeader + " " + geistMono.className}
    >
      {children}
    </motion.span>
  );
};

export const PersonalTokenComp = (props: {
  personalToken?: PersonalToken;
  showShareholderWallets?: boolean;
}) => {
  const [token, setToken] = useState<PersonalToken>(
    props.personalToken && Object.keys(props.personalToken).length > 0
      ? props.personalToken
      : dummyPersonalToken
  );

  useEffect(() => {
    if (props.personalToken?.portfolio) {
      setToken((prevToken) => ({
        ...prevToken,
        portfolio: props.personalToken!.portfolio,
      }));
    }
  }, [props.personalToken?.portfolio]);

  const [displayedPersonalTokens, setDisplayedPersonalTokens] = useState<
    Asset[]
  >(
    token.portfolio?.filter(
      (item) => item.type === TokenType.PersonalToken && item.personalToken
    ) || []
  );
  const [displayedCompanies, setDisplayedCompanies] = useState<Asset[]>(
    token.portfolio?.filter((item) => item.type === TokenType.Company) || []
  );
  const [flingedPersonalTokenIndex, setFlingedPersonalTokenIndex] = useState<
    number | null
  >(null);
  const [flingedCompanyIndex, setFlingedCompanyIndex] = useState<number | null>(
    null
  );

  const updateShareholderWalletValues = (
    token: PersonalToken,
    removedAsset: Asset
  ) => {
    if (!token.shareholders) return token;

    const valueToDistribute =
      removedAsset.type === TokenType.PersonalToken
        ? removedAsset.personalToken!.valuation * removedAsset.equity
        : removedAsset.company!.valuation * removedAsset.equity;

    return {
      ...token,
      shareholders: token.shareholders.map((shareholder) => ({
        ...shareholder,
        holder: {
          ...shareholder.holder,
          walletValue:
            (shareholder.holder.walletValue || 0) +
            valueToDistribute * shareholder.equity,
        },
      })),
    };
  };

  useEffect(() => {
    const newPersonalTokens =
      token.portfolio?.filter(
        (item) => item.type === TokenType.PersonalToken && item.personalToken
      ) || [];
    const newCompanies =
      token.portfolio?.filter((item) => item.type === TokenType.Company) || [];

    let updatedToken = token;

    if (displayedPersonalTokens.length > newPersonalTokens.length) {
      // An item was removed from personal tokens
      const removedIndex = displayedPersonalTokens.findIndex(
        (item) => !newPersonalTokens.includes(item)
      );
      const removedAsset = displayedPersonalTokens[removedIndex];
      updatedToken = updateShareholderWalletValues(token, removedAsset);
      setFlingedPersonalTokenIndex(removedIndex);
      setTimeout(() => setFlingedPersonalTokenIndex(null), 250);
    }

    if (displayedCompanies.length > newCompanies.length) {
      // An item was removed from companies
      const removedIndex = displayedCompanies.findIndex(
        (item) => !newCompanies.includes(item)
      );
      const removedAsset = displayedCompanies[removedIndex];
      updatedToken = updateShareholderWalletValues(token, removedAsset);
      setFlingedCompanyIndex(removedIndex);
      setTimeout(() => setFlingedCompanyIndex(null), 250);
    }

    // Update states after animation completes
    const timeout = setTimeout(() => {
      setDisplayedPersonalTokens(newPersonalTokens);
      setDisplayedCompanies(newCompanies);
      setToken(updatedToken);
    }, 250);

    return () => clearTimeout(timeout);
  }, [token.portfolio]);
  return (
    <div className={styles.container}>
      <motion.div layout className={styles.bioSection}>
        <LineItem
          type={TokenType.PersonalToken}
          profilePic={token.profilePicSrc}
          name={token.name}
          value={token.valuation.toString()}
          isValueSpecial
        />
        {token.bio && <div className={styles.bio}>{token.bio}</div>}
        {token.linkInBio && (
          <a
            href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {token.linkInBio}
          </a>
        )}
      </motion.div>

      {token.shareholders && token.shareholders.length > 0 && (
        <motion.div layout className={styles.shareholdersSection}>
          <SectionHeader>Shareholders</SectionHeader>
          <motion.div layout className={styles.itemSection}>
            {token.shareholders.map((shareholder, index: number) => (
              <motion.div layout key={index}>
                <Shareholder
                  personalToken={shareholder.holder}
                  equity={shareholder.equity}
                  showWallet={props.showShareholderWallets}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {(displayedPersonalTokens.length > 0 ||
        displayedCompanies.length > 0) && (
        <motion.div layout className={styles.portfolioSection}>
          <SectionHeader>Portfolio</SectionHeader>
          {displayedPersonalTokens.length > 0 && (
            <motion.div layout className={styles.itemSection}>
              <AnimatePresence mode="popLayout">
                {displayedPersonalTokens.map((asset, index) => (
                  <motion.div
                    key={asset.personalToken!.name}
                    layout
                    {...(index === flingedPersonalTokenIndex
                      ? flingAnimation
                      : animationConfig)}
                  >
                    <LineItem
                      type={TokenType.PersonalToken}
                      profilePic={asset.personalToken!.profilePicSrc}
                      name={asset.personalToken!.name}
                      value={
                        asset.personalToken!.valuation
                          ? (
                              asset.personalToken!.valuation * asset.equity
                            ).toString()
                          : undefined
                      }
                      equity={`${asset.equity * 100}%`}
                      isSelectable
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {displayedCompanies.length > 0 && (
            <motion.div layout className={styles.itemSection}>
              <AnimatePresence mode="popLayout">
                {displayedCompanies.map((asset, index) => (
                  <motion.div
                    key={asset.company?.name}
                    layout
                    {...(index === flingedCompanyIndex
                      ? flingAnimation
                      : animationConfig)}
                  >
                    <LineItem
                      type={TokenType.Company}
                      profilePic={asset.company?.profilePicSrc!}
                      name={asset.company?.name!}
                      value={
                        asset.company?.valuation
                          ? (asset.company.valuation * asset.equity).toString()
                          : undefined
                      }
                      isSelectable
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};
