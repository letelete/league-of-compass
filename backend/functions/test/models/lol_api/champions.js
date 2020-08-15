const champions = require('../../../app/models/lol_api/champions');
const sinon = require('sinon');
const fakeApi = require('../../lol_api/fake_api');
const { endpoints } = require('../../../app/configs/lol_endpoints');
const axios = require('axios');
const functions = require('firebase-functions');
const { mockedVersion } = require('../../lol_api/fake_api');
const game = require('../../../app/models/database/game');
const { expect } = require('chai');
describe('Champions', () => {
  const versionedEndpoints = endpoints(mockedVersion);
  describe('Get champions', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      const mockedGameData = new Promise((r) => r({ version: mockedVersion }));
      sandbox.stub(game, 'getData').returns(mockedGameData);
    });

    afterEach(() => sandbox.restore());

    it('Should serialize response', async () => {
      sandbox.stub(axios, 'get').returns(fakeApi.getChampions());
      const output = await champions.getChampions();
      const expected = [
        {
          id: 'Vayne',
          name: 'Vayne',
          title: 'the Night Hunter',
          role: {
            main: 'Marksman',
            all: { Marksman: true, Assassin: true },
          },
          image: versionedEndpoints.championAvatar('Vayne.png'),
          difficulty: 8,
          prefixes: {
            name: ['v', 'va', 'vay', 'vayn', 'vayne'],
          },
        },
        {
          id: 'Ahri',
          name: 'Ahri',
          title: 'the Nine-Tailed Fox',
          role: {
            main: 'Mage',
            all: { Mage: true, Assassin: true },
          },
          image: versionedEndpoints.championAvatar('Ahri.png'),
          difficulty: 5,
          prefixes: {
            name: ['a', 'ah', 'ahr', 'ahri'],
          },
        },
      ];
      expect(output).to.deep.equal(expected);
    });
  });
});
