import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';
import { JSONSchemaType } from '../../src/constants/json-schema-type';

describe('anyOf()', () => {
  it('should return an untyped anyOf', () => {
    expect(Schema.anyOf([
      { type: 'integer' as JSONSchemaType },
      { type: 'string' as JSONSchemaType },
    ])).toEqual({
      anyOf: [{
        type: 'integer',
      }, {
        type: 'string',
      }]
    });
  });
});
