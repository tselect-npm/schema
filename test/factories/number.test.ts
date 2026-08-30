import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('number()', function () {
  it('should create a number schema without options', () => {
    const schema = Schema.number();
    expect(schema).toEqual({ type: 'number' });
  });

  it('should create a nullable number schema', () => {
    const schema = Schema.number({ nullable: true });
    expect(schema).toEqual({ type: ['number', 'null'] });
  });

  it('should create a number schema will all options', () => {
    const schema = Schema.number({
      multipleOf: 1,
      minimum: 0,
      maximum: 2,
      exclusiveMinimum: true,
      exclusiveMaximum: true
    });
    expect(schema).toEqual({
      type: 'number',
      multipleOf: 1,
      minimum: 0,
      maximum: 2,
      exclusiveMinimum: true,
      exclusiveMaximum: true
    });
  });
});
