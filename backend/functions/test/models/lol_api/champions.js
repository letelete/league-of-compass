const Champions = require('../../../app/models/lol_api/champions');
const Sinon = require('sinon');
const FakeApi = require('../../lol_api/fake_api');
const Axios = require('axios');
const Game = require('../../../app/models/database/game');
const { mockedVersion } = require('../../lol_api/fake_api');
const { endpoints } = require('../../../app/configs/lol_endpoints');
const { expect } = require('chai');
describe('Champions', () => {
  const versionedEndpoints = endpoints(mockedVersion);
  describe('Get champions', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = Sinon.createSandbox();
      const mockedGameData = new Promise((r) => r({ version: mockedVersion }));
      sandbox.stub(Game, 'doc').returns({
        getData: async () => mockedGameData,
      });
    });

    afterEach(() => sandbox.restore());

    it('Should serialize response', async () => {
      sandbox.stub(Axios, 'get').returns(FakeApi.getChampions());
      const output = await Champions.getChampions();
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
