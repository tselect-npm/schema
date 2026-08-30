import { describe, expect, it } from 'vitest';
import type { JSONSchemaType } from '../../src/constants/json-schema-type';
import * as Schema from '../../src/index';

describe('allOf()', () => {
  it('should return an untyped allOf', () => {
    expect(Schema.allOf([{ type: 'integer' as JSONSchemaType }, { type: 'string' as JSONSchemaType }])).toEqual({
      allOf: [
        {
          type: 'integer',
        },
        {
          type: 'string',
        },
      ],
    });
  });
});
