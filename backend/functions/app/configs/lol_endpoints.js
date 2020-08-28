const defaultLang = 'en_US';

const baseUrl = (version) =>
  `http://ddragon.leagueoflegends.com/cdn/${version}`;

/**
 * @param lang - A language of requested resource
 *
 * @param filename - A filename for the champion's avatar. Must contain file name and extension
 * @example Vayne.png
 */
const endpoints = (version) => ({
  allChampions: (lang = defaultLang) =>
    `${baseUrl(version)}/data/${lang}/champion.json`,
  championAvatar: (filename) => `${baseUrl(version)}/img/champion/${filename}`,
  championAvatarById: (championId) =>
    `${baseUrl(version)}/img/champion/${championId}.png`,
});

module.exports = { endpoints };
