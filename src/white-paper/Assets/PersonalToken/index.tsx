import { FC } from "react";
import { LineItem, LineItemProps } from "./LineItem";
import { PersonalToken, TokenType, Asset, dummyPersonalToken } from "./models";
import styles from "./PersonalToken.module.css";

import { Geist_Mono } from "next/font/google";
import { Shareholder } from "./Shareholder";
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const SectionHeader: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <span className={styles.sectionHeader + " " + geistMono.className}>
      {children}
    </span>
  );
};

export const PersonalTokenComp = (props: { personalToken?: PersonalToken }) => {
  const token =
    props.personalToken && Object.keys(props.personalToken).length > 0
      ? props.personalToken
      : dummyPersonalToken;

  const personalTokens =
    token.portfolio?.filter(
      (item) => item.type === TokenType.PersonalToken && item.personalToken
    ) || [];
  const companies =
    token.portfolio?.filter((item) => item.type === TokenType.Company) || [];

  return (
    <div className={styles.container}>
      <div className={styles.bioSection}>
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
      </div>

      {token.shareholders && token.shareholders.length > 0 && (
        <div className={styles.shareholdersSection}>
          <SectionHeader>Shareholders</SectionHeader>
          <div className={styles.itemSection}>
            {token.shareholders.map((shareholder, index: number) => (
              <Shareholder
                key={index}
                personalToken={shareholder.holder}
                equity={shareholder.equity}
              />
            ))}
          </div>
        </div>
      )}

      {(personalTokens.length > 0 || companies.length > 0) && (
        <div className={styles.portfolioSection}>
          <SectionHeader>Portfolio</SectionHeader>
          {personalTokens.length > 0 && (
            <div className={styles.itemSection}>
              {personalTokens.map((asset, index) => (
                <LineItem
                  key={index}
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
              ))}
            </div>
          )}

          {/* {personalTokens.length > 0 && companies.length > 0 && (
            <div className={styles.divider} />
          )} */}

          {companies.length > 0 && (
            <div className={styles.itemSection}>
              {companies.map((asset, index) => (
                <LineItem
                  key={index}
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
