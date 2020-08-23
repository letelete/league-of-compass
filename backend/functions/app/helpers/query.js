const buildObjectFromQuery = (query, queryTree) => {
  const entries = Object.entries(query);

  const appendEntryToObject = (obj, [key, value]) => {
    if (!value) return obj;

    const queryTreeRef = queryTree(obj, value);
    const next = queryTreeRef[key];

    return { ...obj, ...next };
  };

  const data = entries.reduce(appendEntryToObject, {});

  return Object.keys(data).length ? data : null;
};

module.exports = { buildObjectFromQuery };
