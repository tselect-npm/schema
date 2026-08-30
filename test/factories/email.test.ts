import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('email()', function () {
  it('should create an email schema with no options', () => {
    const schema = Schema.email();
    expect(schema).toEqual({
      type: 'string',
      format: 'email'
    });
  });
  it('should create a nullable email schema', () => {
    const schema = Schema.email({ nullable: true });
    expect(schema).toEqual({
      type: ['string', 'null'],
      format: 'email'
    });
  });
});
