import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('array()', () => {
  it('should create an array schema with no options', () => {
    const schema = Schema.array();
    expect(schema).toEqual({
      type: 'array',
      additionalItems: false,
    });
  });
  it('should create a nullable array schema', () => {
    const schema = Schema.array({ nullable: true });
    expect(schema).toEqual({
      type: ['array', 'null'],
      additionalItems: false,
    });
  });
  it('should create an array schema with all options', () => {
    const schema = Schema.array({
      additionalItems: true,
      items: Schema.string(),
      maxItems: 1,
      minItems: 1,
      uniqueItems: true,
    });
    expect(schema).toEqual({
      type: 'array',
      additionalItems: true,
      items: { type: 'string' },
      maxItems: 1,
      minItems: 1,
      uniqueItems: true,
    });
  });
});
