import { firstLetterCapital } from '../../helpers/strings';

const regionSerializer = (region) => ({
  id: region.id,
  name: region.name,
  abbrv: firstLetterCapital(region.abbrv),
  image: region.image,
});

export default regionSerializer;
