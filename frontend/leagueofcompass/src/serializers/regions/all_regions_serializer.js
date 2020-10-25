import regionSerializer from './region_serializer';

const allRegionsSerializer = (regions) => regions.map(regionSerializer);

export default allRegionsSerializer;
