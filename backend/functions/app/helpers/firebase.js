/**
 * Converts Firebase docs into the key:value data structure,
 * where the key is a document ID and the value is a result of calling data() method on a document.
 * @param {QueryDocumentSnapshot[]} docs
 *
 * @returns Object
 */
const firebaseDocsToObject = (docs) =>
  docs.reduce(
    (ratings, ratingDoc) => ({
      ...ratings,
      [ratingDoc.id]: ratingDoc.data(),
    }),
    {}
  );

module.exports = { firebaseDocsToObject };
