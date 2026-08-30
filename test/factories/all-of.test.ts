import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';
import { JSONSchemaType } from '../../src/constants/json-schema-type';

describe('allOf()', () => {
  it('should return an untyped allOf', () => {
    expect(Schema.allOf([
      { type: 'integer' as JSONSchemaType },
      { type: 'string' as JSONSchemaType },
    ])).toEqual({
      allOf: [{
        type: 'integer',
      }, {
        type: 'string',
      }]
    });
  });
});
