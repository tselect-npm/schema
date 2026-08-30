import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('list()', () => {
  it('should create a list schema with no options', () => {
    const schema = Schema.list(Schema.string());
    expect(schema).toEqual({
      type: 'array',
      items: { type: 'string' },
      additionalItems: false,
    });
  });
  it('should create a nullable list schema', () => {
    const schema = Schema.list(Schema.string(), { nullable: true });
    expect(schema).toEqual({
      type: ['array', 'null'],
      items: { type: 'string' },
      additionalItems: false,
    });
  });
});
