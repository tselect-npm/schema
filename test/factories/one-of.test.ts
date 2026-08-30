import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';
import { JSONSchemaType } from '../../src/constants/json-schema-type';

describe('oneOf()', () => {
  it('should return an untyped oneOf', () => {
    expect(Schema.oneOf([
      { type: 'integer' as JSONSchemaType },
      { type: 'string' as JSONSchemaType },
    ])).toEqual({
      oneOf: [{
        type: 'integer',
      }, {
        type: 'string',
      }]
    });
  });
});
