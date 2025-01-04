export const getIdFromHeader = (label: string): string => {
  if (!label) return "";
  return label
    .toLowerCase() // Convert to lowercase
    .replace(/[\s']/g, "-") // Replace spaces and apostrophes with hyphens
    .replace(/[^\w-]+/g, ""); // Remove all non-word chars except hyphens
};
