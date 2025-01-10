"use client";

import { useState, useRef, useEffect } from "react";
import { SectionHeader } from "../PersonalToken";
import { dummyPersonalToken, TokenType } from "../PersonalToken/models";
import { LineItem } from "../PersonalToken/LineItem";
import styles from "./SyncScene.module.css";

const SyncScene = () => {
  const [token] = useState(dummyPersonalToken);
  const onChainRef = useRef<HTMLDivElement>(null);
  const offChainRef = useRef<HTMLDivElement>(null);
  const [lineStyles, setLineStyles] = useState<React.CSSProperties>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  //   useEffect(() => {
  //     if (offChainRef.current) {
  //       const offChainRect = offChainRef.current.getBoundingClientRect();
  //       const onChainRect = onChainRef.current?.getBoundingClientRect();
  //       const containerRect =
  //         offChainRef.current.parentElement!.getBoundingClientRect();

  //       if (onChainRect) {
  //         const left = offChainRect.left;
  //         const top = offChainRect.top / 2;

  //         setLineStyles({
  //           width: "32px",
  //           top: `${top}px`,
  //           left: `${left - 32}px`,
  //           position: "absolute",
  //         });
  //       }
  //     }
  //   }, []);

  const companyAssets = token.portfolio
    ?.filter((asset: { type: TokenType }) => asset.type === TokenType.Company)
    .map(
      (
        asset: {
          company?: {
            profilePicSrc: string;
            name: string;
            valuation: number;
          };
          equity: number;
        },
        index: number
      ) => (
        <LineItem
          key={index}
          type={TokenType.Company}
          profilePic={asset.company?.profilePicSrc || ""}
          name={asset.company?.name || ""}
          value={(
            (asset.company?.valuation || 0) * (asset.equity || 0)
          ).toString()}
          isMinimal={isMobile}
        />
      )
    );

  return (
    <div className={styles.container}>
      <div className={styles.onChainContainer}>
        <SectionHeader>On chain</SectionHeader>
        <div>
          <div className={styles.personalTokenAssets}>
            {token.portfolio
              ?.filter(
                (asset: { type: TokenType }) =>
                  asset.type === TokenType.PersonalToken
              )
              .map(
                (
                  asset: {
                    personalToken?: {
                      profilePicSrc: string;
                      name: string;
                      valuation: number;
                    };
                    equity: number;
                  },
                  index: number
                ) => (
                  <LineItem
                    key={index}
                    type={TokenType.PersonalToken}
                    profilePic={asset.personalToken?.profilePicSrc || ""}
                    name={asset.personalToken?.name || ""}
                    value={(
                      (asset.personalToken?.valuation || 0) *
                      (asset.equity || 0)
                    ).toString()}
                    isMinimal={isMobile}
                  />
                )
              )}
          </div>
          <div ref={onChainRef} className={styles.companyAssetsOnChain}>
            {companyAssets}
          </div>
        </div>
      </div>

      <div className={styles.offChainContainer}>
        <SectionHeader>Off chain</SectionHeader>
        <div ref={offChainRef} className={styles.companyAssetsOffChain}>
          {companyAssets}
        </div>
      </div>
      <div className={styles.connectingLine} style={lineStyles} />
    </div>
  );
};

export default SyncScene;
