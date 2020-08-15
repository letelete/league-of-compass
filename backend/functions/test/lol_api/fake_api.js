const mockedVersion = '10.16.1';

/**
 * Mocks {@link allChampions} endpoint
 */
const getChampions = () => {
  const data = championsResponse();
  return new Promise((r) =>
    r({
      status: 200,
      data,
    })
  );
};

/**
 * Based on API Version {@link mockedVersion}
 * Returns the Vayne and Ahri champions data
 */
const championsResponse = () => ({
  type: 'champion',
  format: 'standAloneComplex',
  version: mockedVersion,
  data: {
    Vayne: {
      version: mockedVersion,
      id: 'Vayne',
      key: '67',
      name: 'Vayne',
      title: 'the Night Hunter',
      blurb:
        'Shauna Vayne is a deadly, remorseless Demacian monster hunter, who has dedicated her life to finding and destroying the demon that murdered her family. Armed with a wrist-mounted crossbow and a heart full of vengeance, she is only truly happy when...',
      info: { attack: 10, defense: 1, magic: 1, difficulty: 8 },
      image: {
        full: 'Vayne.png',
        sprite: 'champion4.png',
        group: 'champion',
        x: 432,
        y: 0,
        w: 48,
        h: 48,
      },
      tags: ['Marksman', 'Assassin'],
      partype: 'Mana',
      stats: {
        hp: 515,
        hpperlevel: 89,
        mp: 231.8,
        mpperlevel: 35,
        movespeed: 330,
        armor: 23,
        armorperlevel: 3.4,
        spellblock: 30,
        spellblockperlevel: 0.5,
        attackrange: 550,
        hpregen: 3.5,
        hpregenperlevel: 0.55,
        mpregen: 6.972,
        mpregenperlevel: 0.4,
        crit: 0,
        critperlevel: 0,
        attackdamage: 60,
        attackdamageperlevel: 2.36,
        attackspeedperlevel: 3.3,
        attackspeed: 0.658,
      },
    },
    Ahri: {
      version: mockedVersion,
      id: 'Ahri',
      key: '103',
      name: 'Ahri',
      title: 'the Nine-Tailed Fox',
      blurb:
        'Innately connected to the latent power of Runeterra, Ahri is a vastaya who can reshape magic into orbs of raw energy. She revels in toying with her prey by manipulating their emotions before devouring their life essence. Despite her predatory nature...',
      info: { attack: 3, defense: 4, magic: 8, difficulty: 5 },
      image: {
        full: 'Ahri.png',
        sprite: 'champion0.png',
        group: 'champion',
        x: 48,
        y: 0,
        w: 48,
        h: 48,
      },
      tags: ['Mage', 'Assassin'],
      partype: 'Mana',
      stats: {
        hp: 526,
        hpperlevel: 92,
        mp: 418,
        mpperlevel: 25,
        movespeed: 330,
        armor: 20.88,
        armorperlevel: 3.5,
        spellblock: 30,
        spellblockperlevel: 0.5,
        attackrange: 550,
        hpregen: 6.5,
        hpregenperlevel: 0.6,
        mpregen: 8,
        mpregenperlevel: 0.8,
        crit: 0,
        critperlevel: 0,
        attackdamage: 53.04,
        attackdamageperlevel: 3,
        attackspeedperlevel: 2,
        attackspeed: 0.668,
      },
    },
  },
});

module.exports = {
  getChampions,
  mockedVersion,
};
