const axios = require('axios');
const { endpoints } = require('../../configs/lol_endpoints');
const game = require('../database/game');
const createPrefixTable = require('../../helpers/string_prefix_table');

const getChampions = async () => {
  const { version } = await game.getData();
  const versionedEndpoints = endpoints(version);
  return await axios
    .get(versionedEndpoints.allChampions())
    .then((response) => deserialize(response, versionedEndpoints));
};

const deserialize = (response, versionedEndpoints) => {
  const deserializeChampion = (champion) => {
    const { id, name, title, tags: roles } = champion;
    const { difficulty } = champion.info;
    const namePrefixes = createPrefixTable(name);
    const mainRole = roles.length ? roles[0] : null;
    const image = versionedEndpoints.championAvatar(champion.image.full);

    // Map hack for firebase to let user filter multiple 'array-contains'-like queries
    //
    // Let's say, a user wants to retrieve all champions containing ALL roles: ['Fighter', 'Tank'].
    // Firebase array-contains-any keyword works similar to our needs, but it uses OR operator for each element in the array,
    // and since we need AND rather than OR, we need to use that extremely awful hack.
    const rolesMap = roles
      .map((role) => [role, true])
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    return Object.freeze({
      id,
      name,
      title,
      image,
      difficulty,
      role: {
        main: mainRole,
        all: rolesMap,
      },
      prefixes: {
        name: namePrefixes,
      },
    });
  };
  const { data: champions } = response.data;
  return Object.values(champions).map(deserializeChampion);
};

module.exports = { getChampions };
