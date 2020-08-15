const createPrefixTable = require('../../app/helpers/string_prefix_table');
const { expect } = require('chai');

describe('String prefix table', () => {
  it('Should create single word prefix table', () => {
    const input = 'Test';
    const output = createPrefixTable(input);
    const expected = ['t', 'te', 'tes', 'test'];
    expect(output).to.deep.equal(expected);
  });
  it('Should create multiple words prefix table', () => {
    const input = 'Abc XYZ';
    const output = createPrefixTable(input);
    const expected = ['a', 'ab', 'abc', 'abc ', 'abc x', 'abc xy', 'abc xyz'];
    expect(output).to.deep.equal(expected);
  });
});
