import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('dateTime()', function () {
  it('should create a date time schema with no options', () => {
    const schema = Schema.dateTime();
    expect(schema).toEqual({
      type: 'string',
      format: 'date-time'
    });
  });
  it('should create a nullable date time schema', () => {
    const schema = Schema.dateTime({ nullable: true });
    expect(schema).toEqual({
      type: ['string', 'null'],
      format: 'date-time'
    });
  });
});
