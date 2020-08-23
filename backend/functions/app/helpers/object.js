const filterObject = (obj, ...predicates) => {
  const traverse = (obj) => {
    if (isPrimitive(obj)) return obj;

    let product = {};
    for (const key in obj) {
      const isArray = Array.isArray(obj[key]);

      const value = traverse(obj[key]);
      if (!valuePassesPredicates(value)) continue;

      product = {
        ...product,
        [key]: isArray ? Object.values(value) : value,
      };
    }

    return product;
  };

  const isPrimitive = (obj) => obj !== Object(obj);

  const valuePassesPredicates = (value) => {
    for (const predicate of predicates) {
      const valid = predicate(value);
      if (!valid) return false;
    }
    return true;
  };

  return traverse(obj);
};

module.exports = filterObject;
