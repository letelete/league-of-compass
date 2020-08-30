const Axios = require('axios');
const Champion = require('../database/champion');
const Game = require('../database/game');
const createPrefixTable = require('../../helpers/string_prefix_table');
const LolEndpoints = require('../../configs/lol_endpoints');

const getChampions = async () => {
  const { version } = await Game.doc().getData();
  const versionedEndpoints = LolEndpoints.endpoints(version);
  return await Axios.get(versionedEndpoints.allChampions()).then((response) => {
    const { data: champions } = response.data;
    const deserializeChampion = (champion) =>
      deserialize(champion, versionedEndpoints);
    return Object.values(champions).map(deserializeChampion);
  });
};

const deserialize = (champion, versionedEndpoints) => {
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
  const allRolesAsMap = roles
    .map((role) => [role, true])
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  return Champion.cast({
    id,
    name,
    title,
    image,
    difficulty,
    role: { main: mainRole, all: allRolesAsMap },
    prefixes: { name: namePrefixes },
  });
};

module.exports = { getChampions };
