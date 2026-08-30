import { describe, expect, it } from 'vitest';
import type { JSONSchemaType } from '../../src/constants/json-schema-type';
import * as Schema from '../../src/index';

describe('oneOf()', () => {
  it('should return an untyped oneOf', () => {
    expect(Schema.oneOf([{ type: 'integer' as JSONSchemaType }, { type: 'string' as JSONSchemaType }])).toEqual({
      oneOf: [
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
