/**
 * Composes a space-separated class name by reducing given names into one, full name
 *
 * If given name is a static string (does not depend on external events and should always be attached),
 * it should be passed as plain String <name>
 *
 * If given name is dynamic (optional) it must be specified as following:
 * {<name>: <statement, if true - name appends to the class name>}
 *
 * @example
 * // returns "abc xyz"
 * composeClassName('abc', {xyz: 1 === 1})
 *
 * @example
 * // returns "1 2 3"
 * composeClassName({qwerty: false}, '1', {'2': true}, '3')
 *
 * @returns {String} Returns the composed class name
 */
const composeClassName = (...names) => {
  const formatNextName = (nextName) => {
    const [name, statement] =
      typeof nextName === 'string'
        ? [nextName, true]
        : Object.entries(nextName)[0];
    const whitespacePrefix = (str) => ` ${str}`;
    return statement ? whitespacePrefix(name) : '';
  };
  return names
    .reduce(
      (className, nextName) => (className += formatNextName(nextName)),
      ''
    )
    .trim();
};

export default composeClassName;
