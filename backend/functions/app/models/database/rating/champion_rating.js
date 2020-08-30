const Yup = require('yup');
const RatingAttrs = require('./rating_attrs');
const { Database, FieldValue } = require('../../../configs/firebase');
const { BadRequestError } = require('../../../errors/4xx');
const { hasProperty } = require('../../../helpers/object');
const LolEndpoints = require('../../../configs/lol_endpoints');
const RatingPaths = require('./rating_paths');

require('../../../helpers/yup/cast_and_validate/sync');
require('../../../helpers/yup/round_to_n_decimals');

const newRatingSchema = Yup.object().shape({
  count: Yup.number().integer().min(0).required(),
  ratings: RatingAttrs.getAttrsAsSchema(),
});

const deltaRatingSchema = Yup.object().shape({
  ratings: Yup.object().shape(
    RatingAttrs.attrs.reduce(
      (obj, attr) => ({ ...obj, [attr]: Yup.number().integer().required() }),
      {}
    )
  ),
});

const responseSchema = Yup.object().shape({
  champion: Yup.object().shape({
    id: Yup.string().trim().required(),
    image: Yup.string().trim().required(),
  }),
  rating: Yup.object().shape({
    count: Yup.reach(newRatingSchema, 'count'),
    ratings: RatingAttrs.getAttrsAsSchema(),
  }),
});

const getRating = async (championId) => {
  return Database.collection('ratings')
    .doc(championId)
    .get()
    .then((doc) => (doc.exists ? doc.data() : null));
};

const getAllRatings = async ({ region, tier }) => {
  if (!region || !tier) throw new Error('Ratings attrs must be specified.');
  return Database.collection('ratings')
    .orderBy(`regions.${region}.tiers.${tier}`)
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      })
    );
};

const postRatings = async ({ championId, attrs, ratings, isAuthorUnique }) => {
  const dbEntrySchema = getDatabaseEntrySchema({ ratings, isAuthorUnique });
  const { tier, region } = RatingPaths.castAttrs(attrs);
  return Database.collection('ratings')
    .doc(championId)
    .set(
      {
        regions: {
          [RatingAttrs.paths.global.region]: {
            tiers: {
              [RatingAttrs.paths.global.tier]: dbEntrySchema,
              [tier]: dbEntrySchema,
            },
          },
          [region]: {
            tiers: {
              [RatingAttrs.paths.global.tier]: dbEntrySchema,
              [tier]: dbEntrySchema,
            },
          },
        },
      },
      { merge: true }
    );
};

const getDatabaseEntrySchema = ({ ratings, isAuthorUnique }) => {
  const incrementedCount = FieldValue.increment(isAuthorUnique ? 1 : 0);

  const castedRatings = Yup.reach(
    isAuthorUnique ? newRatingSchema : deltaRatingSchema,
    'ratings'
  ).castAndValidateSync(ratings);

  const incrementedRatings = Object.entries(castedRatings).reduce(
    (base, [key, value]) => ({
      ...base,
      [key]: FieldValue.increment(value),
    }),
    {}
  );

  return {
    count: incrementedCount,
    ratings: incrementedRatings,
  };
};

const filterWithAttrs = (data, { region, tier }) => {
  const path = `regions.${region}.tiers.${tier}`;
  return hasProperty(data, path)
    ? data['regions'][region]['tiers'][tier]
    : null;
};

const format = {
  to: {
    response: ({ championId, gameVersion, rating }) => {
      const champion = {
        id: championId,
        image: LolEndpoints.endpoints(gameVersion).championAvatarById(
          championId
        ),
      };
      rating = {
        ...rating,
        ratings: Object.entries(rating.ratings).reduce((obj, [key, value]) => {
          const score = RatingAttrs.calculateScore(rating.count, value);
          return {
            ...obj,
            [key]: score,
          };
        }, {}),
      };
      return responseSchema.castAndValidateSync({ champion, rating });
    },
  },
};

module.exports = {
  getRating,
  getAllRatings,
  postRatings,
  filterWithAttrs,
  format,
};
