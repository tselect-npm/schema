import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('omitProperties()', () => {
  it('should return a cloned object schema with filtered properties', () => {
    const schema = Schema.object(
      { foo: Schema.string(), bar: Schema.string() },
      {
        required: ['bar'],
        additionalProperties: true,
      },
    );
    const modified = Schema.omitProperties(schema, ['bar']);
    expect(modified).toEqual({
      type: 'object',
      additionalProperties: true,
      required: [],
      properties: {
        foo: { type: 'string' },
      },
    });
  });

  it('should leave a schema without properties or required untouched', () => {
    const schema = Schema.object({}, { additionalProperties: true });
    delete schema.properties;

    expect(Schema.omitProperties(schema, ['foo'])).toEqual({
      type: 'object',
      additionalProperties: true,
    });
  });
});
