export const getIdFromHeader = (label: string): string => {
  if (!label) return "";
  return label
    .toLowerCase() // Convert to lowercase
    .replace(/[\s']/g, "-") // Replace spaces and apostrophes with hyphens
    .replace(/[^\w-]+/g, ""); // Remove all non-word chars except hyphens
};
export const formatNumber = (
  num: number,
  alwaysShowDecimal?: boolean
): string => {
  if (num >= 1000000) {
    const millions = num / 1000000;
    return `${
      millions % 1 === 0 && !alwaysShowDecimal
        ? Math.floor(millions)
        : millions.toFixed(1)
    }M`;
  } else if (num >= 1000) {
    const thousands = num / 1000;
    return `${
      thousands % 1 === 0 && !alwaysShowDecimal
        ? Math.floor(thousands)
        : thousands.toFixed(1)
    }K`;
  }
  return num.toString();
};
