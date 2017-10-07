import { Schema } from '../../';
import { toStringRegExp } from '../../src/utils/to-string-reg-exp';

describe('toStringRegExp()', function () {
  it('should convert regexp to string', () => {
    expect(Schema.toStringRegExp(/^\d+$/)).to.equal('^\\d+$');
  });
  it('should throw if regexp contains modifiers', () => {
    expect(() => toStringRegExp(/^\d+$/g)).throw(/modifiers/);
  });
});