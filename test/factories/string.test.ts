import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('string()', function () {
  it('should create a string schema with no options', () => {
    const schema = Schema.string();
    expect(schema).toEqual({
      type: 'string'
    });
  });

  it('should create a nullable string schema', () => {
    const schema = Schema.string({ nullable: true });
    expect(schema).toEqual({
      type: ['string', 'null']
    });
  });

  it('should create a string schema with all options', () => {
    const schema = Schema.string({
      maxLength: 20,
      minLength: 10,
      pattern: '^\\d+$',
      format: Schema.JSONStringFormat.DATE_TIME
    });

    expect(schema).toEqual({
      type: 'string',
      maxLength: 20,
      minLength: 10,
      pattern: '^\\d+$',
      format: 'date-time'
    });
  });
});
