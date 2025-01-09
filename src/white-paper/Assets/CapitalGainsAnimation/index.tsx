"use client";

import { FC, useEffect, useState } from "react";
import { PersonalTokenComp } from "../PersonalToken";
import { dummyPersonalToken, PersonalToken } from "../PersonalToken/models";
import { Card } from "../Card";
import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });
import styles from "./CapitalGains.module.css";

export const CapitalGainsAnimation: FC = ({}) => {
  const [token, setToken] = useState<PersonalToken>(dummyPersonalToken);

  const animate = () => {
    // Remove the first portfolio item if it exists
    if (token.portfolio && token.portfolio.length > 0) {
      const updatedToken = {
        ...token,
        portfolio: token.portfolio.slice(1),
      };
      setToken(updatedToken);
      return;
    } else {
      setToken(dummyPersonalToken);
    }
  };

  return (
    <Card
      caption={
        "When assets are sold, capital gains are distributed to shareholders proportional to the equity they hold."
      }
    >
      <PersonalTokenComp personalToken={token} showShareholderWallets />
      <button
        onClick={animate}
        className={`${styles.sellButton} ${geistMono.className}`}
      >
        {token.portfolio && token.portfolio.length > 0 ? "Sell asset" : "Reset"}
      </button>
    </Card>
  );
};
