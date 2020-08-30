const RatingAttrs = require('../models/database/rating/rating_attrs');

const getRatingAttrsDelta = (prevRating, newRating) =>
  RatingAttrs.attrs.reduce((ratings, attr) => {
    const prevValue = prevRating[attr];
    const newValue = newRating[attr];
    const delta = newValue - prevValue;
    return {
      ...ratings,
      [attr]: delta,
    };
  }, {});

module.exports = { getRatingAttrsDelta };
