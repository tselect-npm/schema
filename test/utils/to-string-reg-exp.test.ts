import { describe, expect, it } from 'vitest';
import { toStringRegExp } from '../../src/utils/to-string-reg-exp';

describe('toStringRegExp()', function () {
  it('should convert regexp to string', () => {
    expect(toStringRegExp(/^\d+$/)).toBe('^\\d+$');
  });
  it('should throw if regexp contains modifiers', () => {
    expect(() => toStringRegExp(/^\d+$/g)).toThrow(/modifiers/);
  });
});
