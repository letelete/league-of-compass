const User = require('../../app/models/database/user');
const { expect } = require('chai');
const { BadRequestError } = require('../../app/errors/4xx');
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
          region: 'EUN1',
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
            region: 'EUN1',
          },
          summoner: {
            accountId: 'xyz123',
            puuid: 'qwerty321',
            name: 'A nickname',
            profileIconId: 12345,
            league: {
              tier: 'DIAMOND',
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
        const expectedMessage = "Unknown user's game region";
        expect(createUser).to.throw(expectedMessage);
      });
      it('should invalidate with multiple errors', () => {
        const invalidUser = {
          personal: {
            email: 'thisIsNotAnEmail#protonmail.com',
          },
          summoner: {
            name: 'Extremely long, out of range nickname',
            league: {
              tier: 'Master Of Puppets',
              rank: 1337,
            },
          },
        };
        const createUser = () => User.cast(invalidUser);
        const expectedError = [
          'personal.email must be a valid email',
          'summoner.name must be at most 16 characters',
          "Unknown user's league tier",
          'summoner.league.rank must be less than or equal to 4',
        ].reduce((msg, next) => `${msg},\n${next}`);
        expect(createUser).to.throw(expectedError);
      });
    });
  });
});
