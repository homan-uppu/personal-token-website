import { FC } from "react";
import { LineItem, LineItemProps, LineItemType } from "./LineItem";
import styles from "./PersonalToken.module.css";

import { Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"] });

interface PersonalTokenProps {
  profilePicSrc: string;
  name: string;
  valuation: string;
  bio: string;
  linkInBio: string;
  shareholders: LineItemProps[];
  portfolio: LineItemProps[];
}

export const SectionHeader: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <span className={styles.sectionHeader + " " + geistMono.className}>
      {children}
    </span>
  );
};

export const PersonalToken: FC<PersonalTokenProps> = ({
  profilePicSrc,
  name,
  valuation,
  bio,
  linkInBio,
  shareholders,
  portfolio,
}) => {
  const personalTokens = portfolio.filter(
    (item) => item.type === LineItemType.PersonalToken
  );
  const companies = portfolio.filter(
    (item) => item.type === LineItemType.Company
  );

  return (
    <div className={styles.container}>
      <div className={styles.bioSection}>
        <LineItem
          type={LineItemType.PersonalToken}
          profilePic={profilePicSrc}
          name={name}
          value={valuation}
          isValueSpecial
        />
        <div className={styles.bio}>{bio}</div>
        <a
          href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {linkInBio}
        </a>
      </div>

      <div className={styles.shareholdersSection}>
        <SectionHeader>Shareholders</SectionHeader>
        <div className={styles.itemSection}>
          {shareholders.map((shareholder, index) => (
            <LineItem
              key={index}
              type={LineItemType.PersonalToken}
              profilePic={shareholder.profilePic}
              name={shareholder.name}
              equity={shareholder.equity}
              isSelectable
            />
          ))}
        </div>
      </div>

      <div className={styles.portfolioSection}>
        <SectionHeader>Portfolio</SectionHeader>
        {personalTokens.length > 0 && (
          <div className={styles.itemSection}>
            {personalTokens.map((token, index) => (
              <LineItem
                key={index}
                type={LineItemType.PersonalToken}
                profilePic={token.profilePic}
                name={token.name}
                value={token.value}
                equity={token.equity}
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
            {companies.map((company, index) => (
              <LineItem
                key={index}
                type={LineItemType.Company}
                profilePic={company.profilePic}
                name={company.name}
                value={company.value}
                equity={company.equity}
                isSelectable
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
