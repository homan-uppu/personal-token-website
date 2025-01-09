"use client";

import { FC, useEffect, useState } from "react";
import { PersonalTokenComp } from "../PersonalToken";
import { dummyPersonalToken, PersonalToken } from "../PersonalToken/models";
import { useInView } from "react-intersection-observer";

export const CapitalGainsAnimation: FC = ({}) => {
  const [token, setToken] = useState<PersonalToken>(dummyPersonalToken);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const animate = () => {
    // Remove the first portfolio item if it exists
    if (token.portfolio && token.portfolio.length > 0) {
      const updatedToken = {
        ...token,
        portfolio: token.portfolio.slice(1),
      };
      setToken(updatedToken);
      return;
    }

    // const updatedToken = {
    //   ...token,
    //   shareholders: token.shareholders!.map((shareholder) => ({
    //     ...shareholder,
    //     holder: {
    //       ...shareholder.holder,
    //       walletValue: (shareholder.holder.walletValue || 0) + 100,
    //     },
    //   })),
    // };
    // setToken(updatedToken);
  };

  useEffect(() => {
    // if (inView && token.shareholders) {
    //   animate();
    // }
  }, [inView]);

  return (
    <div ref={ref}>
      <PersonalTokenComp personalToken={token} showShareholderWallets />
      <button
        onClick={animate}
        style={{
          padding: "8px 16px",
          marginTop: "16px",
          borderRadius: "var(--border-radius-small)",
          border: "var(--border)",
          background: "white",
          cursor: "pointer",
        }}
      >
        Animate
      </button>
    </div>
  );
};
