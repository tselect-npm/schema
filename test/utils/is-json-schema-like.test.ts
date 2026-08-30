import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('isJSONSchemaLike()', () => {
  it('should return true for a simple object JSONSchema', () => {
    const schema = Schema.object(
      {
        foo: Schema.string(),
      },
      {
        required: ['foo'],
        additionalProperties: true,
      },
    );

    const actual = Schema.isJSONSchemaLike(schema);
    expect(actual).toEqual(true);
  });

  it('should return true for an allOf JSONSchema', () => {
    const schemaOne = Schema.object({ foo: Schema.string() });
    const schemaTwo = Schema.object({ bar: Schema.string() });
    const schema = Schema.allOf([schemaOne, schemaTwo]);

    const actual = Schema.isJSONSchemaLike(schema);
    expect(actual).toEqual(true);
  });

  it('should return true for an anyOf JSONSchema', () => {
    const schemaOne = Schema.object({ foo: Schema.string() });
    const schemaTwo = Schema.object({ bar: Schema.string() });
    const schema = Schema.anyOf([schemaOne, schemaTwo]);

    const actual = Schema.isJSONSchemaLike(schema);
    expect(actual).toEqual(true);
  });

  it('should return true for an oneOf JSONSchema', () => {
    const schemaOne = Schema.object({ foo: Schema.string() });
    const schemaTwo = Schema.object({ bar: Schema.string() });
    const schema = Schema.oneOf([schemaOne, schemaTwo]);

    const actual = Schema.isJSONSchemaLike(schema);
    expect(actual).toEqual(true);
  });

  it('should return false for a plain object with no schema keyword', () => {
    expect(Schema.isJSONSchemaLike({ foo: 'bar' })).toEqual(false);
  });

  it.each([
    ['an array', [{ type: 'string' }]],
    ['null', null],
    ['undefined', undefined],
    ['a string', 'string'],
    ['a number', 1],
    [
      'a class instance',
      new (class {
        public type = 'string';
      })(),
    ],
  ])('should return false for %s', (_label, value) => {
    expect(Schema.isJSONSchemaLike(value)).toEqual(false);
  });
});
