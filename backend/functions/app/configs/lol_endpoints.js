const version = '10.16.1';
const baseUrl = `http://ddragon.leagueoflegends.com/cdn/${version}`;

const defaultLang = 'en_US';

/**
 * @param lang - A language of requested resource
 *
 * @param filename - A filename for the champion's avatar. Must contain file name and extension
 * @example Vayne.png
 */
const endpoints = {
  allChampions: (lang = defaultLang) => `${baseUrl}/data/${lang}/champion.json`,
  championAvatar: (filename) => `${baseUrl}/img/champion/${filename}`,
};
