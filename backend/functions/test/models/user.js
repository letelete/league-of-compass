const User = require('../../app/models/database/user');
const { expect } = require('chai');
const { BadRequestError } = require('../../app/errors/4xx');
const { ValidationError } = require('yup');
describe('User', () => {
  describe('Create', () => {
    it('should not include empty objects and null fields', () => {
      const input = {
        personal: {
          id: 'abcXYZ123',
          name: 'John Doe',
          image: 'https://cdn2.thecatapi.com/images/ef1.jpg',
          email: 'john.doe@protonmail.com',
        },
      };
      const expected = {
        personal: {
          id: 'abcXYZ123',
          name: 'John Doe',
          image: 'https://cdn2.thecatapi.com/images/ef1.jpg',
          email: 'john.doe@protonmail.com',
        },
      };
      const output = User.cast(input);
      expect(output).to.deep.equal(expected);
    });

    it('should create a partial user data', () => {
      const input = {
        game: {
          region: 'eun1',
        },
      };
      const expected = {
        game: {
          region: 'eun1',
        },
      };
      const output = User.cast(input);
      expect(output).to.deep.equal(expected);
    });

    it('should create fields with nulls as a value', () => {
      const input = {
        game: {
          region: null,
        },
        summoner: {
          name: null,
          league: {
            tier: null,
            rank: 1,
          },
        },
      };
      const expected = {
        game: {
          region: null,
        },
        summoner: {
          name: null,
          league: {
            tier: null,
            rank: 1,
          },
        },
      };
      const output = User.cast(input);
      expect(output).to.deep.equal(expected);
    });
  });

  describe('Validatation & Sanitization', () => {
    describe('Valid', () => {
      it('should remove whitespaces, uppercase tier and region and convert strings to numbers', () => {
        const input = {
          personal: {
            id: ' abc123 ',
            name: `So many white spaces${' '.repeat(20)}`,
            image: 'https://cdn2.thecatapi.com/images/ef1.jpg',
            email: 'john.doe@protonmail.com',
          },
          game: {
            region: 'eun1',
          },
          summoner: {
            accountId: 'xyz123',
            puuid: 'qwerty321',
            name: 'A nickname',
            profileIconId: '12345',
            league: {
              tier: 'diamond',
              rank: '1',
            },
          },
        };
        const expected = {
          personal: {
            id: 'abc123',
            name: `So many white spaces`,
            image: 'https://cdn2.thecatapi.com/images/ef1.jpg',
            email: 'john.doe@protonmail.com',
          },
          game: {
            region: 'eun1',
          },
          summoner: {
            accountId: 'xyz123',
            puuid: 'qwerty321',
            name: 'A nickname',
            profileIconId: 12345,
            league: {
              tier: 'diamond',
              rank: 1,
            },
          },
        };
        const output = User.cast(input);
        expect(output).to.deep.equal(expected);
      });
    });
    describe('Invalid', () => {
      it('should invalidate on unknown league tier', () => {
        const createUser = () =>
          User.cast({
            summoner: {
              league: {
                tier: 'Master Of Puppets',
              },
            },
          });
        const expectedMessage = "Unknown user's league tier";
        expect(createUser).to.throw();
      });
      it("should invalidate on unknown user's region", () => {
        const createUser = () =>
          User.cast({
            game: {
              region: 'EUNE',
            },
          });
        expect(createUser).to.throw(ValidationError);
      });
      it('should invalidate email', () => {
        const invalidUser = {
          personal: {
            email: 'thisIsNotAnEmail#protonmail.com',
          },
        };
        const createUser = () => User.cast(invalidUser);
        expect(createUser).to.throw(ValidationError);
      });
      it('should invalidate name', () => {
        const invalidUser = {
          summoner: {
            name: 'Extremely long, out of range nickname',
          },
        };
        const createUser = () => User.cast(invalidUser);
        expect(createUser).to.throw(ValidationError);
      });
      it('should invalidate tier', () => {
        const invalidUser = {
          summoner: {
            league: {
              tier: 'Master Of Puppets',
            },
          },
        };
        const createUser = () => User.cast(invalidUser);
        expect(createUser).to.throw(ValidationError);
      });
      it('should invalidate rank', () => {
        const invalidUser = {
          summoner: {
            league: {
              rank: 1337,
            },
          },
        };
        const createUser = () => User.cast(invalidUser);
        expect(createUser).to.throw(ValidationError);
      });
    });
  });
});
