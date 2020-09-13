const { expect } = require('chai');
const { getProperty } = require('../../app/helpers/object');

describe('Object helpers', () => {
  describe('Get property', () => {
    it('should return a property value', () => {
      const obj = {
        a: {
          name: 'a',
          b: {
            name: 'b',
            c: {
              name: 'c',
            },
          },
        },
      };
      expect(getProperty(obj, 'a.b.c.name')).to.equal('c');
    });
    it('should return a null on invalid property', () => {
      const obj = {
        regions: {
          eun1: {
            tiers: {
              challenger: 'chall',
              diamond: 'dia',
            },
          },
          euw: {},
        },
      };
      expect(getProperty(obj, 'a.b.c')).to.equal(null);
    });
    it('should return null on null object', () => {
      const obj = null;
      expect(getProperty(obj, 'regions.eun1.tiers.iron')).to.equal(null);
    });
  });
});
