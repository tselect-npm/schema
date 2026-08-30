import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('pickProperties()', () => {
  it('should return a cloned object schema with filtered properties', () => {
    type TType = {
      foo: string;
      bar: string;
    };

    const schema = Schema.object<TType>(
      { foo: Schema.string(), bar: Schema.string() },
      {
        required: ['foo'],
        additionalProperties: true,
      },
    );

    const modified = Schema.pickProperties(schema, ['bar']);

    expect(modified).toEqual({
      type: 'object',
      required: [],
      additionalProperties: true,
      properties: {
        bar: { type: 'string' },
      },
    });
  });

  it('should allow for property types to include undefined', () => {
    type TType = {
      foo: string;
      bar: string | undefined;
    };

    const schema = Schema.object<TType>(
      { foo: Schema.string(), bar: Schema.string() },
      {
        required: ['foo'],
        additionalProperties: true,
      },
    );

    const modified = Schema.pickProperties(schema, ['bar']);

    expect(modified).toEqual({
      type: 'object',
      required: [],
      additionalProperties: true,
      properties: {
        bar: { type: 'string' },
      },
    });
  });

  it('should allow for types to have optional properties', () => {
    type TType = {
      foo: string;
      bar?: string | null;
    };

    const schema = Schema.object<TType>(
      { foo: Schema.string(), bar: Schema.string() },
      {
        required: ['foo'],
        additionalProperties: true,
      },
    );

    const modified = Schema.pickProperties(schema, ['bar']);

    expect(modified).toEqual({
      type: 'object',
      required: [],
      additionalProperties: true,
      properties: {
        bar: { type: 'string' },
      },
    });
  });

  it('should leave a schema without properties or required untouched', () => {
    const schema = Schema.object({}, { additionalProperties: true });
    delete schema.properties;

    expect(Schema.pickProperties(schema, ['foo'])).toEqual({
      type: 'object',
      additionalProperties: true,
    });
  });
});
