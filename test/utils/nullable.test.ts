import { describe, expect, it } from 'vitest';
import type { JSONSchemaType } from '../../src/constants/json-schema-type';
import * as Schema from '../../src/index';

describe('nullable()', () => {
  it('should handle an anyOf JSONSchema', () => {
    const schema = Schema.anyOf([{ type: 'integer' as JSONSchemaType }, { type: 'string' as JSONSchemaType }]);

    const actual = Schema.nullable(schema);

    expect(actual).toEqual({
      anyOf: [
        {
          type: 'integer',
        },
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    });
  });

  it('should handle an oneOf JSONSchema', () => {
    const schema = Schema.oneOf([{ type: 'integer' as JSONSchemaType }, { type: 'string' as JSONSchemaType }]);

    const actual = Schema.nullable(schema);

    expect(actual).toEqual({
      oneOf: [
        {
          type: 'integer',
        },
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    });
  });

  it('should handle an enum JSONSchema', () => {
    const schema = Schema.enumeration(['foo', 'bar']);

    const actual = Schema.nullable(schema);

    expect(actual).toEqual({
      enum: ['foo', 'bar', null],
      type: ['string', 'null'],
    });
  });

  it('should remove null from an already nullable schema when passed false', () => {
    const schema = Schema.string({ nullable: true });

    expect(Schema.nullable(schema, false)).toEqual({ type: 'string' });
  });

  it('should throw for a schema with no type and no combinator', () => {
    expect(() => Schema.nullable({ title: 'untyped' })).toThrow(/non typed schema/);
  });

  // Pins current behaviour rather than endorsing it: with `value === false` the
  // enum branch strips 'null' from `type` but still appends `null` to `enum`,
  // so the two disagree. Published 1.0.0 does exactly the same thing. Left
  // as-is here because this is a tooling refresh, not a behaviour change.
  it('should narrow an enum schema back to a single type when passed false', () => {
    const schema = Schema.enumeration(['a', 'b'], { nullable: true });

    expect(Schema.nullable(schema, false)).toEqual({
      nullable: true,
      type: 'string',
      enum: ['a', 'b', null],
    });
  });
});
