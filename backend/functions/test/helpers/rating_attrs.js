const { expect } = require('chai');
const { getRatingAttrsDelta } = require('../../app/helpers/rating_attrs');

describe('Rating attrs helpers', () => {
  it('Rating attrs delta', () => {
    const prevRating = {
      excitement: -80,
      difficulty: 32,
    };
    const newRating = {
      excitement: -24,
      difficulty: -68,
    };
    const expectedDelta = {
      excitement: 56,
      difficulty: -100,
    };
    const outputDelta = getRatingAttrsDelta(prevRating, newRating);
    expect(outputDelta).to.deep.equal(expectedDelta);
  });
});
