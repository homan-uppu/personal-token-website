export const getIdFromHeader = (label: string): string => {
  if (!label) return "";
  return label
    .toLowerCase() // Convert to lowercase
    .replace(/[\s']/g, "-") // Replace spaces and apostrophes with hyphens
    .replace(/[^\w-]+/g, ""); // Remove all non-word chars except hyphens
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${Math.floor(num / 1000000)}M`;
  } else if (num >= 1000) {
    return `${Math.floor(num / 1000)}K`;
  }
  return num.toString();
};
