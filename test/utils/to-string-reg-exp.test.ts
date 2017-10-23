import { toStringRegExp } from '../../src/utils/to-string-reg-exp';

describe('toStringRegExp()', function () {
  it('should convert regexp to string', () => {
    expect(toStringRegExp(/^\d+$/)).to.equal('^\\d+$');
  });
  it('should throw if regexp contains modifiers', () => {
    expect(() => toStringRegExp(/^\d+$/g)).throw(/modifiers/);
  });
});