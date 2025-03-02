import { Asset, TokenType } from "@/util/models";
import { formatNumber } from "@/util";
import { ListItem } from "./ListItem";

interface AssetListItemProps {
  asset: Asset;
}

export const AssetListItem = ({ asset }: AssetListItemProps) => {
  const isPersonalToken = asset.type === TokenType.PersonalToken;
  const name = isPersonalToken
    ? asset.personalToken?.name
    : asset.company?.name;
  const profilePic = isPersonalToken
    ? asset.personalToken?.profilePicSrc
    : asset.company?.profilePicSrc;

  return (
    <ListItem
      picSrc={profilePic || ""}
      labelMain={name || ""}
      labelSecondary={isPersonalToken ? "PT" : "INC"}
      rightLabel={
        isPersonalToken
          ? `${asset.equity * 100}% = $${formatNumber(
              (asset.personalToken?.valuation || 0) * asset.equity,
              true
            )}`
          : `$${formatNumber(asset.company?.valuation || 0, true)}`
      }
    />
  );
};
