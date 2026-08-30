import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('tuple()', () => {
  it('should create a tuple schema with no options', () => {
    const schema = Schema.tuple([Schema.string(), Schema.integer()]);
    expect(schema).toEqual({
      type: 'array',
      items: [{ type: 'string' }, { type: 'integer' }],
      additionalItems: false,
    });
  });
  it('should create a nullable tuple schema', () => {
    const schema = Schema.tuple([Schema.string(), Schema.integer()], { nullable: true });
    expect(schema).toEqual({
      type: ['array', 'null'],
      items: [{ type: 'string' }, { type: 'integer' }],
      additionalItems: false,
    });
  });
});
