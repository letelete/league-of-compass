export const firstLetterCapital = (str) => {
  const formatted = str.trim().toLowerCase();
  const firstPart = formatted.slice(0, 1).toUpperCase();
  const secondPart = formatted.slice(1, formatted.length);
  return `${firstPart}${secondPart}`;
};
