import Ajv from 'ajv';
import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

// ajv 8 turns on strict mode by default. Both relaxations are about draft-07
// constructs this package deliberately produces — union types for `nullable`
// schemas, and a `properties` key that also matches a `patternProperties`
// pattern — not about the schemas being invalid.
const ajv = new Ajv({ allowUnionTypes: true, allowMatchingProperties: true });

describe('object()', () => {
  it('should create an object schema with no options', () => {
    const schema = Schema.object({ foo: Schema.string() });
    expect(schema).toEqual({
      type: 'object',
      additionalProperties: false,
      properties: {
        foo: {
          type: 'string',
        },
      },
    });
  });
  it('should create a nullable object schema', () => {
    const schema = Schema.object<{ foo: string }>(
      { foo: Schema.string() },
      {
        nullable: true,
      },
    );
    expect(() => ajv.compile(schema)).not.toThrow();
    expect(schema).toEqual({
      type: ['object', 'null'],
      additionalProperties: false,
      properties: {
        foo: {
          type: 'string',
        },
      },
    });
  });
  it('should create an object schema with all options', () => {
    const schema = Schema.object(
      { foo: { $ref: '#/definitions/foo' } },
      {
        maxProperties: 1,
        minProperties: 2,
        required: ['foo'],
        additionalProperties: true,
        definitions: { foo: Schema.string() },
        patternProperties: { 'foo[a-z]*': Schema.string() },
      },
    );
    expect(() => ajv.compile(schema)).not.toThrow();
    expect(schema).toEqual({
      type: 'object',
      properties: {
        foo: { $ref: '#/definitions/foo' },
      },
      maxProperties: 1,
      minProperties: 2,
      required: ['foo'],
      additionalProperties: true,
      definitions: { foo: { type: 'string' } },
      patternProperties: { 'foo[a-z]*': { type: 'string' } },
    });
  });

  it('should let options.properties win over the properties argument', () => {
    // T has to name both keys: `properties` is typed against the same T as the
    // positional argument, so the override cannot introduce a key T lacks.
    const schema = Schema.object<{ foo: string; bar: number }>(
      { foo: Schema.string() },
      {
        properties: { bar: Schema.integer() },
      },
    );

    expect(schema).toEqual({
      type: 'object',
      additionalProperties: false,
      properties: {
        bar: { type: 'integer' },
      },
    });
  });
});
