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

  useEffect(() => {
    if (inView && token.shareholders) {
      const updatedToken = {
        ...token,
        shareholders: token.shareholders.map((shareholder) => ({
          ...shareholder,
          holder: {
            ...shareholder.holder,
            walletValue: (shareholder.holder.walletValue || 0) + 100,
          },
        })),
      };
      setToken(updatedToken);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <PersonalTokenComp personalToken={token} />
    </div>
  );
};
