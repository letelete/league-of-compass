const { expect } = require('chai');
const { hasProperty } = require('../../app/helpers/object');

describe('Object helpers', () => {
  describe('Has property', () => {
    it('should confirm, that object has a property', () => {
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
      expect(hasProperty(obj, 'a.b.c.name')).to.be.true;
    });
    it('should deny, that object has a property', () => {
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
      expect(hasProperty(obj, 'a.b.c')).to.be.false;
    });
    it('should deny, that object has a property on null object', () => {
      const obj = null;
      expect(hasProperty(obj, 'regions.eun1.tiers.iron')).to.be.false;
    });
    it('should deny if given object is not an Object type', () => {
      const obj = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(hasProperty(obj, '0.id.1')).to.be.false;
    });
  });
});
