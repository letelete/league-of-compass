const mapRatingToPercentage = (rating) => {
  if (isNaN(rating)) throw new Error('Given rating is not a number');
  const edge = -100;
  const scale = 0.5;
  return (parseInt(rating) - edge) * scale;
};

const ratingSerializer = ({ champion, rating }) => ({
  champion: {
    id: champion.id,
    image: champion.image,
  },
  rating: {
    ratings: {
      difficulty: mapRatingToPercentage(rating.ratings.difficulty),
      excitement: mapRatingToPercentage(rating.ratings.excitement),
    },
    count: rating.count,
  },
});

export default ratingSerializer;
