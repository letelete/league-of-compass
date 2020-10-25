// Prioritizes elements closest to the percentage center (50%);
export const sortInsideOutByPercentage = ({ data, getX, getY }) =>
  data.sort((a, b) => {
    const distanceFromCenter = (obj) => {
      const [x, y] = [getX(obj), getY(obj)];
      const centerPercentage = 50;
      return Math.hypot(x - centerPercentage, y - centerPercentage);
    };
    return distanceFromCenter(a) < distanceFromCenter(b) ? -1 : 1;
  });
