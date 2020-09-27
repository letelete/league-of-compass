const {
  default: composeClassName,
} = require('../../helpers/compose_classname');

describe('compose classname', () => {
  it('should create a class name from only static strings', () => {
    const expected = '1 2 3';
    const actual = composeClassName('1', '2', '3');
    expect(actual).toEqual(expected);
  });

  it('should construct name from all truthy statements', () => {
    const expected = '1 2 3';
    const actual = composeClassName({ 1: true }, { 2: true }, { 3: true });
    expect(actual).toEqual(expected);
  });

  it('should append names with truthy statements to the static string', () => {
    const expected = 'a a--b a--c';
    const actual = composeClassName('a', { 'a--b': true }, { 'a--c': true });
    expect(actual).toEqual(expected);
  });

  it('should not append names with falsy statements', () => {
    const expected = 'abc xyz qwerty';
    const actual = composeClassName(
      { nope0: false },
      'abc',
      { nope1: false },
      'xyz',
      'qwerty',
      { nope2: false }
    );
    expect(actual).toEqual(expected);
  });

  it('should not leave multiple whitespaces on consecutive falsy statements', () => {
    const expected = 'abc xyz';
    const actual = composeClassName(
      { nope0: false },
      { nope1: false },
      'abc',
      { nope2: false },
      { nope3: false },
      { nope4: false },
      'xyz',
      { nope5: false },
      { nope6: false }
    );
    expect(actual).toEqual(expected);
  });

  it('should return empty string on all falsy statements', () => {
    const expected = '';
    const actual = composeClassName(
      { nope0: false },
      { nope1: false },
      { nope2: false }
    );
    expect(actual).toEqual(expected);
  });

  it('should return empty string on no input', () => {
    const expected = '';
    const actual = composeClassName();
    expect(actual).toEqual(expected);
  });
});
