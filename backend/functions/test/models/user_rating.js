const UserRating = require('../../app/models/database/rating/user_rating');
const { expect } = require('chai');
const { BadRequestError } = require('../../app/errors/4xx');

describe('UserRating', () => {
  it('Should create a valid UserRating', () => {
    const output = UserRating.cast({
      ratings: { difficulty: 1, excitement: -1 },
    });
    const expected = {
      ratings: { difficulty: 1, excitement: -1 },
    };
    expect(output).to.deep.equal(expected);
  });

  it('Should throw an exception on invalid UserRating', () => {
    const createUserRating = () =>
      UserRating.cast({
        ratings: { difficulty: 15.25, excitement: -10 },
      });
    expect(createUserRating).to.throw(BadRequestError);
  });

  it('Should validate a properly formatted UserRating', () => {
    const input = {
      ratings: { difficulty: 10, excitement: -50 },
    };
    const validate = () => UserRating.cast(input);
    expect(validate).not.to.throw(BadRequestError);
  });

  it('Should invalidate 2 decimal places', () => {
    const input = {
      ratings: { difficulty: 0.12, excitement: 0 },
    };
    const validate = () => UserRating.cast(input);
    expect(validate).to.throw(BadRequestError);
  });

  it('Should not validate an exceeded score', () => {
    const input = {
      ratings: { difficulty: -101, excitement: 0 },
    };
    const validate = () => UserRating.cast(input);
    expect(validate).to.throw(BadRequestError);
  });

  it('Should validate numeric value converted to string', () => {
    const input = {
      ratings: { difficulty: '5', excitement: -1 },
    };
    const validate = () => UserRating.cast(input);
    expect(validate).not.to.throw(BadRequestError);
  });

  it('Should convert strings into numbers', () => {
    const input = {
      ratings: { difficulty: '12', excitement: '-1' },
    };
    const output = UserRating.cast(input);
    const expected = {
      ratings: { difficulty: 12, excitement: -1 },
    };
    expect(output).to.deep.equal(expected);
  });
});
