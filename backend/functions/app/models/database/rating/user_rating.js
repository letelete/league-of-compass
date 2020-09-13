const Yup = require('yup');
const RatingAttrs = require('./rating_attrs');
const { BadRequestError } = require('../../../errors/4xx');
const { Database } = require('../../../configs/firebase');
const { firebaseDocsToObject } = require('../../../helpers/firebase');

require('../../../helpers/yup/cast_and_validate/sync');

const schema = Yup.object().shape({
  ratings: RatingAttrs.getAttrsAsSchema(),
});

const cast = (data) => schema.castAndValidateSync(data);

const doc = (userId) => {
  const ratingsCollectionPath = `users/${userId}/ratings`;

  const postRating = async (championId, rating) => {
    const casted = await schema.validate(rating);
    return Database.collection(ratingsCollectionPath)
      .doc(championId)
      .set(casted, { merge: true });
  };

  const getRating = async (championId) => {
    return Database.collection(ratingsCollectionPath)
      .doc(championId)
      .get()
      .then((doc) => (doc.exists ? doc.data() : null));
  };

  const getAllRatings = async () => {
    return Database.collection(ratingsCollectionPath)
      .get()
      .then((snapshot) => firebaseDocsToObject(snapshot.docs));
  };

  return Object.freeze({
    postRating,
    getRating,
    getAllRatings,
  });
};

module.exports = { cast, doc };
