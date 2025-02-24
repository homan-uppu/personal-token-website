import { FC } from "react";
import { PersonalToken } from "@/util/models";
import { ShareholderListItem } from "./ShareholderListItem";
import { AssetListItem } from "./AssetListItem";
import { InfoSectionHeader } from "./InfoSectionHeader";

interface TokenInfoProps {
  personalToken: PersonalToken;
}

import { Geist_Mono } from "next/font/google";
import { formatNumber } from "@/util";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export const TokenInfo: FC<TokenInfoProps> = ({ personalToken }) => {
  return (
    <div style={styles.container}>
      <div style={styles.column}>
        {personalToken.bio && (
          <div style={styles.section}>
            <InfoSectionHeader>Bio</InfoSectionHeader>
            <div style={styles.bio}>{personalToken.bio}</div>
          </div>
        )}

        {personalToken.shareholders &&
          personalToken.shareholders.length > 0 && (
            <div style={{ ...styles.section, gap: "0.25rem" }}>
              <InfoSectionHeader>Shareholders</InfoSectionHeader>
              <div style={styles.list}>
                {personalToken.shareholders.map((shareholder, i) => (
                  <ShareholderListItem
                    key={i}
                    profilePicSrc={shareholder.holder.profilePicSrc}
                    name={shareholder.holder.name}
                    username={shareholder.holder.username}
                    equityPercentage={shareholder.equity * 100}
                  />
                ))}
              </div>
            </div>
          )}

        <div style={styles.section}>
          <InfoSectionHeader>Latest valuation</InfoSectionHeader>
          <div className={geistMono.className}>
            ${formatNumber(personalToken.valuation)} (
            {personalToken.lastRoundDate?.toLocaleDateString()})
          </div>
        </div>
      </div>

      <div
        style={{
          width: "1px",
          background: "rgba(0, 0, 0, 0.03)",
          alignSelf: "stretch",
        }}
      />

      <div style={{ ...styles.column, gap: `calc(${spacing} - 0.5rem)` }}>
        {personalToken.portfolio && personalToken.portfolio.length > 0 && (
          <div style={{ ...styles.section, gap: "0.25rem" }}>
            <InfoSectionHeader>Assets</InfoSectionHeader>
            <div style={styles.list}>
              {personalToken.portfolio.map((asset, i) => (
                <AssetListItem key={i} asset={asset} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const spacing = "1.5rem";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as const,
    gap: spacing,
    width: "100%",
    padding: "3rem",
  },
  column: {
    display: "flex",
    flexDirection: "column" as const,
    flex: 1,
    width: "50%",
    gap: spacing,
  },
  bio: {
    color: "rgba(0, 0, 0, 0.8)",
  },
  list: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 0,
  },
  section: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
    width: "100%",
    height: "fit-content",
  },
};
