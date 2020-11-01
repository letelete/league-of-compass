import ratingSerializer from './rating_serializer';

const allRatingsSerializer = ({ data, length }) =>
  data.reduce((ratingsObj, payload) => {
    const rating = ratingSerializer(payload);
    return { ...ratingsObj, [rating.champion.id]: rating };
  }, {});

export default allRatingsSerializer;
