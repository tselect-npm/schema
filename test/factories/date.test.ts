import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('date()', function () {
  it('should create a date schema with no options', () => {
    const schema = Schema.date();
    expect(schema).toEqual({
      type: 'string',
      format: 'date'
    });
  });
  it('should create a nullable date schema', () => {
    const schema = Schema.date({ nullable: true });
    expect(schema).toEqual({
      type: ['string', 'null'],
      format: 'date'
    });
  });
});
