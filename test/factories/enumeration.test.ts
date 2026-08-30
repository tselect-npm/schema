import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('enumeration()', function () {
  it('should create an enumeration schema from a string enum', () => {
    enum Foo { A = 'a', B = 'b' }
    const schema = Schema.enumeration(Foo);
    expect(schema).toEqual({
      type: ['string'],
      enum: ['a', 'b']
    });
  });
  it('should create an enumeration schema from a mixed array', () => {
    const schema = Schema.enumeration([1, 'two', null]);
    expect(schema).toEqual({
      type: ['number', 'string', 'null'],
      enum: [1, 'two', null]
    });
  });
  it('should throw for an unsupported type', () => {
    expect(() => Schema.enumeration([new Date()])).toThrow(/unsupported/i);
  });
  describe('nullable', function () {
    it('should add null to a nullable enumeration', () => {
      const schema = Schema.enumeration([1, 2], { nullable: true });
      expect(schema).toEqual({
        type: ['number', 'null'],
        enum: [1, 2, null],
        nullable: true
      });
    });
    it('should to add null to a not nullable enumeration', () => {
      const schema = Schema.enumeration([1, 2], { nullable: false });
      expect(schema).toEqual({
        type: ['number'],
        enum: [1, 2],
        nullable: false
      });
    });
  });
});
