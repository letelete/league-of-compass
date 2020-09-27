const { firstLetterCapital } = require('../../helpers/strings');

describe('strings', () => {
  describe('firstLetterCapital', () => {
    it('should transform one word with mixed case into string with first letter capital and rest lowercased', () => {
      const input = 'aBcDefgH';
      const expected = 'Abcdefgh';
      const actual = firstLetterCapital(input);
      expect(actual).toEqual(expected);
    });

    it('should remove whitespaces and capitalize the first letter', () => {
      const input = '     word        ';
      const expected = 'Word';
      const actual = firstLetterCapital(input);
      expect(actual).toEqual(expected);
    });

    it('should return an empty string on empty input', () => {
      const input = '';
      const expected = '';
      const actual = firstLetterCapital(input);
      expect(actual).toEqual(expected);
    });
  });
});
