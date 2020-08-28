const Vote = require('../../app/models/database/Vote');
const { expect } = require('chai');
const { BadRequestError } = require('../../app/errors/4xx');

describe('Vote', () => {
  it('Should create a valid Vote', () => {
    const output = Vote.cast({
      championId: 'abc',
      difficulty: 1.0,
      excitement: -1.0,
    });
    const expected = {
      championId: 'abc',
      difficulty: 1.0,
      excitement: -1.0,
    };
    expect(output).to.deep.equal(expected);
  });

  it('Should throw an exception on invalid Vote', () => {
    const createVote = () =>
      Vote.cast({
        championId: 'abc',
        difficulty: 1.5,
        excitement: -1.0,
      });
    expect(createVote).to.throw(BadRequestError);
  });

  it('Should validate a properly formatted Vote', () => {
    const input = {
      championId: '123XYZ',
      difficulty: 1.0,
      excitement: -0.5,
    };
    const validate = () => Vote.cast(input);
    expect(validate).not.to.throw(BadRequestError);
  });

  it('Should validate edge case max length with a hyphen (-)', () => {
    const input = {
      championId: '123XYZ',
      difficulty: -0.1234,
      excitement: 1.0,
    };
    const validate = () => Vote.cast(input);
    expect(validate).not.to.throw(BadRequestError);
  });

  it('Should validate integer', () => {
    const input = {
      championId: '123XYZ',
      difficulty: 1,
      excitement: 0,
    };
    const validate = () => Vote.cast(input);
    expect(validate).not.to.throw(BadRequestError);
  });

  it('Should validate 2 decimal places', () => {
    const input = {
      championId: '123XYZ',
      difficulty: 0.12,
      excitement: 0,
    };
    const validate = () => Vote.cast(input);
    expect(validate).not.to.throw(BadRequestError);
  });

  it('Should convert a dot with no decimal places into an integer', () => {
    const input = {
      championId: '123XYZ',
      difficulty: '1.',
      excitement: 0,
    };
    const expected = {
      championId: '123XYZ',
      difficulty: 1,
      excitement: 0,
    };
    const output = Vote.cast(input);
    expect(output).to.deep.equal(expected);
  });

  it('Should not validate an exceeded score', () => {
    const input = {
      championId: '123XYZ',
      difficulty: -1.5,
      excitement: 0,
    };
    const validate = () => Vote.cast(input);
    expect(validate).to.throw(BadRequestError);
  });

  it('Should not validate exceeded length ', () => {
    const input = {
      championId: '123XYZ',
      difficulty: -0.12345,
      excitement: 1.0,
    };
    const validate = () => Vote.cast(input);
    expect(validate).to.throw(BadRequestError);
  });

  it('Should validate numeric value converted to string', () => {
    const input = {
      championId: 'abc123',
      difficulty: '0.5',
      excitement: -0.1,
    };
    const validate = () => Vote.cast(input);
    expect(validate).not.to.throw(BadRequestError);
  });

  it('Should not validate empty championId', () => {
    const input = {
      championId: '',
      difficulty: 0.5,
      excitement: -0.1337,
    };
    const validate = () => Vote.cast(input);
    expect(validate).to.throw(BadRequestError);
  });

  it('Should trim id, convert strings into numbers', () => {
    const input = {
      championId: ' ab_cd_123 ',
      difficulty: '0.1234',
      excitement: '-1.0',
    };
    const output = Vote.cast(input);
    const expected = {
      championId: 'ab_cd_123',
      difficulty: 0.1234,
      excitement: -1.0,
    };
    expect(output).to.deep.equal(expected);
  });
});
