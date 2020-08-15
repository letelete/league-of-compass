const createPrefixTable = (str) => {
  let prefixes = [];
  const createNextPrefix = (char) => {
    const next = prefixes.length
      ? `${prefixes[prefixes.length - 1]}${char}`
      : char;
    prefixes.push(next);
  };
  str.toString().trim().toLowerCase().split('').forEach(createNextPrefix);
  return prefixes;
};

module.exports = createPrefixTable;
